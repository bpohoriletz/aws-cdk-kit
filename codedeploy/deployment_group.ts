import * as cdk from "aws-cdk-lib";
import * as autoscaling from "aws-cdk-lib/aws-autoscaling";
import * as codedeploy from "aws-cdk-lib/aws-codedeploy";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";

import * as names from "../utils/naming";

export function createDeploymentGroupToAsg(
  resourceNamePrefix: string[],
  instanceTypes: ec2.InstanceType[],
  app: codedeploy.ServerApplication,
  stackName: string,
  instanceProfile: iam.InstanceProfile,
  codedeployRole: iam.Role,
  vpc: ec2.IVpc,
  stack: cdk.Stack): [codedeploy.ServerDeploymentGroup, ec2.SecurityGroup, autoscaling.AutoScalingGroup] {

    let resourceName = names.ec2SecurityGroupName(resourceNamePrefix, "asg");
    const securityGroup = createWebSecurityGroup(resourceNamePrefix, vpc, stack);
    // Define the launch template for Spot instances
    resourceName = names.launchTemplateName(resourceNamePrefix);
    const launchTemplate = new ec2.LaunchTemplate(stack, resourceName, {
      associatePublicIpAddress: false,
      instanceProfile: instanceProfile,
      instanceType: instanceTypes[0],
      launchTemplateName: resourceName,
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      securityGroup: securityGroup,
    });

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
      healthCheck: autoscaling.HealthCheck.ec2({
        grace: cdk.Duration.minutes(5),
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

    return [deplGroup, securityGroup, autoscalingGroup];
}
export function createDeploymentGroupToEc2(
  resourceNamePrefix: string[],
  server: ec2.Instance,
  app: codedeploy.ServerApplication,
  stackName: string,
  codedeployRole: iam.Role,
  stack: cdk.Stack): codedeploy.ServerDeploymentGroup {
    const resourceName = names.codedeployDeploymentGroupName(resourceNamePrefix);
    // Tag instance and create tag set
    cdk.Tags.of(server).add("Environment", stackName);
    cdk.Tags.of(server).add("Application", app.applicationName);
    const tagSet = new codedeploy.InstanceTagSet(
      {
        "Environment": [stackName],
      },
      {
        "Application": [app.applicationName],
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

// TOFIX; import
function createWebSecurityGroup(resourceNamePrefix: string[], vpc: ec2.IVpc, stack: cdk.Stack): ec2.SecurityGroup {
  const resourceName = names.ec2SecurityGroupName(resourceNamePrefix, "ec2");
  const securityGroup = new ec2.SecurityGroup(stack, resourceName , {
    vpc: vpc,
    description: "Security Group for the EC2",
    securityGroupName: resourceName,
    allowAllOutbound: true
  });

  // Allow Security Group inbound traffic for load balancer
  securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), "Allow incoming traffic over port 80");
  securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), "Allow incoming traffic over port 443");

  return securityGroup;
}
