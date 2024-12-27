import * as cdk from "aws-cdk-lib/core";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";

import * as names from "../naming/resources";

export function createPublicInstance(
  resourceNamePrefix: string[],
  instanceProfile: iam.InstanceProfile,
  stack: cdk.Stack,
  vpc: ec2.IVpc,
  instanceType: ec2.InstanceType = new ec2.InstanceType("t2.micro")): ec2.Instance {

  const resourceName = names.ec2InstanceName(resourceNamePrefix);
  // Install CodeDeploy agent by default
  const userDataScript = ec2.UserData.forLinux();
  userDataScript.addCommands(
    "sudo yum update -y",
    "sudo yum install -y ruby wget",
    "cd /home/ec2-user",
    `wget https://aws-codedeploy-${stack.region}.s3.${stack.region}.amazonaws.com/latest/install`,
    "chmod +x ./install",
    "sudo ./install auto"
  );
  const instance = new ec2.Instance(stack, resourceName, {
    instanceType: instanceType,
    associatePublicIpAddress: true,
    instanceName: resourceName,
    instanceProfile: instanceProfile,
    machineImage: ec2.MachineImage.latestAmazonLinux2023(),
    securityGroup: createWebSecurityGroup(resourceNamePrefix, vpc, stack),
    userData: userDataScript,
    vpc: vpc,
    vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
  });

  return instance;
}

// TOFIX; Extract Private
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
