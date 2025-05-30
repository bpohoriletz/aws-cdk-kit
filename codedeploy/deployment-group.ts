import * as cdk from 'aws-cdk-lib';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

import SecurityGroupDirector from '../ec2/directors/security-group';
import SecurityGroupBuilder from '../ec2/security-group-builder';
import * as names from '../utils/naming';
import ServerDeploymentGroupDirector from '../codedeploy/directors/server-deployment-group';
import AsgDeploymentGroupBuilder from './server-deployment-group-builders/asg-deployment-group-builder';
import LaunchTemplateDirector from '../ec2/directors/launch-template';
import Al2023PublicBuilder from '../ec2/launch-template-builders/al2023-public-builder';
import Al2023PrivateBuilder from '../ec2/launch-template-builders/al2023-private-builder';

export function createPublicDeploymentGroup(
  resourceNamePrefix: string[],
  instanceTypes: ec2.InstanceType[],
  app: codedeploy.ServerApplication,
  instanceProfile: iam.InstanceProfile,
  codedeployRole: iam.Role,
  vpc: ec2.IVpc,
  stack: cdk.Stack
): [codedeploy.ServerDeploymentGroup, ec2.SecurityGroup, autoscaling.AutoScalingGroup] {
  let resourceName = names.ec2SecurityGroupName(resourceNamePrefix, 'asg');
  const ltDirector = new LaunchTemplateDirector(Al2023PublicBuilder);
  ltDirector.profile = instanceProfile;
  ltDirector.securityGroup = new SecurityGroupDirector(SecurityGroupBuilder).constructWebSecurityGroup(
    stack,
    'WebSecurityGroup',
    vpc
  );
  ltDirector.instanceType = instanceTypes[0];
  // Define the launch template for Spot instances
  resourceName = names.launchTemplateName(resourceNamePrefix);
  const launchTemplate = ltDirector.constructLaunchTemplate(stack, resourceName, resourceName);

  // Create an Auto Scaling Group with MixedInstancesPolicy (Spot + On-Demand)
  resourceName = names.autoscalingGroupName(resourceNamePrefix);
  const autoscalingGroup = new autoscaling.AutoScalingGroup(stack, resourceName, {
    autoScalingGroupName: resourceName,
    vpc: vpc,
    vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
    mixedInstancesPolicy: {
      instancesDistribution: {
        onDemandBaseCapacity: 0, // All instances are Spot
        onDemandPercentageAboveBaseCapacity: 0, // 100% Spot instances
      },
      launchTemplate: launchTemplate,
      launchTemplateOverrides: instanceTypes.map((instanceType) => ({
        instanceType: instanceType,
      })),
    },
    minCapacity: 1,
    maxCapacity: 1,
    desiredCapacity: 1,
    healthChecks: autoscaling.HealthChecks.ec2({
      gracePeriod: cdk.Duration.minutes(5),
    }),
  });

  // Create deployment group
  resourceName = names.codedeployDeploymentGroupName(resourceNamePrefix);
  const deplGroup = new codedeploy.ServerDeploymentGroup(stack, resourceName, {
    application: app,
    autoScalingGroups: [autoscalingGroup],
    deploymentGroupName: resourceName,
    deploymentConfig: codedeploy.ServerDeploymentConfig.ALL_AT_ONCE,
    installAgent: true,
    role: codedeployRole,
  });

  return [deplGroup, ltDirector.securityGroup, autoscalingGroup];
}
export function createDeploymentGroupToAsg(
  resourceNamePrefix: string[],
  instanceTypes: ec2.InstanceType[],
  app: codedeploy.ServerApplication,
  instanceProfile: iam.InstanceProfile,
  codedeployRole: iam.Role,
  vpc: ec2.IVpc,
  stack: cdk.Stack
): [codedeploy.ServerDeploymentGroup, ec2.SecurityGroup, autoscaling.AutoScalingGroup] {
  let resourceName = names.ec2SecurityGroupName(resourceNamePrefix, 'asg');
  const deplGroupDirector = new ServerDeploymentGroupDirector(AsgDeploymentGroupBuilder);
  deplGroupDirector.application = app;
  deplGroupDirector.role = codedeployRole;
  const ltDirector = new LaunchTemplateDirector(Al2023PrivateBuilder);
  ltDirector.profile = instanceProfile;
  ltDirector.securityGroup = new SecurityGroupDirector(SecurityGroupBuilder).constructWebSecurityGroup(
    stack,
    'WebSecurityGroup',
    vpc
  );
  ltDirector.instanceType = instanceTypes[0];
  // Define the launch template for Spot instances
  resourceName = names.launchTemplateName(resourceNamePrefix);
  const launchTemplate = ltDirector.constructLaunchTemplate(stack, resourceName, resourceName);

  // Create an Auto Scaling Group with MixedInstancesPolicy (Spot + On-Demand)
  resourceName = names.autoscalingGroupName(resourceNamePrefix);
  const autoscalingGroup = new autoscaling.AutoScalingGroup(stack, resourceName, {
    autoScalingGroupName: resourceName,
    vpc: vpc,
    vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
    mixedInstancesPolicy: {
      instancesDistribution: {
        onDemandBaseCapacity: 0, // All instances are Spot
        onDemandPercentageAboveBaseCapacity: 0, // 100% Spot instances
      },
      launchTemplate: launchTemplate,
      launchTemplateOverrides: instanceTypes.map((instanceType) => ({
        instanceType: instanceType,
      })),
    },
    minCapacity: 1,
    maxCapacity: 1,
    desiredCapacity: 1,
    healthChecks: autoscaling.HealthChecks.ec2({
      gracePeriod: cdk.Duration.minutes(5),
    }),
  });
  // Add lifecycle hooks
  autoscalingGroup.addLifecycleHook(names.autoscalingGroupHookName(resourceNamePrefix, 'term'), {
    defaultResult: autoscaling.DefaultResult.CONTINUE,
    heartbeatTimeout: cdk.Duration.minutes(1),
    lifecycleTransition: autoscaling.LifecycleTransition.INSTANCE_TERMINATING,
  });
  autoscalingGroup.addLifecycleHook(names.autoscalingGroupHookName(resourceNamePrefix, 'lnch'), {
    defaultResult: autoscaling.DefaultResult.CONTINUE,
    heartbeatTimeout: cdk.Duration.minutes(1),
    lifecycleTransition: autoscaling.LifecycleTransition.INSTANCE_LAUNCHING,
  });

  // Create deployment group
  resourceName = names.codedeployDeploymentGroupName(resourceNamePrefix);
  deplGroupDirector.autoScalingGroups = [autoscalingGroup];
  const deplGroup = deplGroupDirector.constructAsgGroup(stack, resourceName, resourceName);

  return [deplGroup, ltDirector.securityGroup, autoscalingGroup];
}
export function createDeploymentGroupToEc2(
  resourceNamePrefix: string[],
  server: ec2.Instance,
  app: codedeploy.ServerApplication,
  stackName: string,
  codedeployRole: iam.Role,
  stack: cdk.Stack
): codedeploy.ServerDeploymentGroup {
  const resourceName = names.codedeployDeploymentGroupName(resourceNamePrefix);
  // Tag instance and create tag set
  cdk.Tags.of(server).add('Environment', stackName);
  cdk.Tags.of(server).add('Application', app.applicationName);
  const tagSet = new codedeploy.InstanceTagSet(
    {
      Environment: [stackName],
    },
    {
      Application: [app.applicationName],
    }
  );
  // Create deployment group
  const deplGroup = new codedeploy.ServerDeploymentGroup(stack, resourceName, {
    application: app,
    deploymentGroupName: resourceName,
    deploymentConfig: codedeploy.ServerDeploymentConfig.ALL_AT_ONCE,
    ec2InstanceTags: tagSet,
    role: codedeployRole,
  });

  return deplGroup;
}
