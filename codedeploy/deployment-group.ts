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
import AutoscalingGroupDirector from '../autoscaling/directors/autoscaling-group-director';
import { AllSpotEc2AutoscalingGroupBuilder } from '../autoscaling/autoscaling-group-builders/all-spot-ec2';
import Ec2DeploymentGroupBuilder from './server-deployment-group-builders/ec2-deployment-group-builder';

export function createPublicDeploymentGroup(
  resourceNamePrefix: string[],
  instanceTypes: ec2.InstanceType[],
  app: codedeploy.ServerApplication,
  instanceProfile: iam.InstanceProfile,
  codedeployRole: iam.Role,
  vpc: ec2.IVpc,
  stack: cdk.Stack
): [codedeploy.ServerDeploymentGroup, ec2.SecurityGroup, autoscaling.AutoScalingGroup] {
  const deplGroupDirector = new ServerDeploymentGroupDirector(AsgDeploymentGroupBuilder);
  deplGroupDirector.application = app;
  deplGroupDirector.role = codedeployRole;
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
  const asgDirector = new AutoscalingGroupDirector(AllSpotEc2AutoscalingGroupBuilder);
  asgDirector.vpc = vpc;
  asgDirector.launchTemplate = launchTemplate;
  asgDirector.instanceTypes = instanceTypes;
  asgDirector.vpcSubnets = { subnetType: ec2.SubnetType.PUBLIC };
  const autoscalingGroup = asgDirector.constructAutoscalingGroup(stack, resourceName, resourceName);
  // Create deployment group
  resourceName = names.codedeployDeploymentGroupName(resourceNamePrefix);
  deplGroupDirector.autoScalingGroups = [autoscalingGroup];
  const deplGroup = deplGroupDirector.constructAsgGroup(stack, resourceName, resourceName);

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
  const asgDirector = new AutoscalingGroupDirector(AllSpotEc2AutoscalingGroupBuilder);
  asgDirector.vpc = vpc;
  asgDirector.launchTemplate = launchTemplate;
  asgDirector.instanceTypes = instanceTypes;
  const autoscalingGroup = asgDirector.constructAutoscalingGroup(stack, resourceName, resourceName);
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
  const deplGroupDirector = new ServerDeploymentGroupDirector(Ec2DeploymentGroupBuilder);
  deplGroupDirector.application = app;
  deplGroupDirector.role = codedeployRole;
  deplGroupDirector.ec2InstanceTags = new codedeploy.InstanceTagSet(
    {
      Environment: [stackName],
    },
    {
      Application: [app.applicationName],
    }
  );
  // Tag instance
  cdk.Tags.of(server).add('Environment', stackName);
  cdk.Tags.of(server).add('Application', app.applicationName);
  // Create deployment group
  const resourceName = names.codedeployDeploymentGroupName(resourceNamePrefix);
  const deplGroup = deplGroupDirector.constructEc2Group(stack, resourceName, resourceName);

  return deplGroup;
}
