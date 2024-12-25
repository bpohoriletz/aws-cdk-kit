import { Stack } from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as con from "../naming/resources"

// Create Security Group for web instances
export function createWebSg(resourceNamePrefix: string[], vpc: ec2.IVpc, stack: Stack): ec2.SecurityGroup {
  let resourceName: string = con.ec2SecurityGroupName(resourceNamePrefix.slice(0,3), "web")
  const webSecurityGroup = new ec2.SecurityGroup(stack, resourceName, {
    vpc: vpc,
    description: "Security Group for the Web instances",
    securityGroupName: resourceName,
    allowAllOutbound: true
  })

  return webSecurityGroup
}

export function createPublicWebSg(resourceNamePrefix: string[], vpc: ec2.IVpc, stack: Stack): ec2.SecurityGroup {
  let resourceName: string = con.ec2SecurityGroupName(resourceNamePrefix.slice(0,3), "web")
  const publicWebSecurityGroup = new ec2.SecurityGroup(stack, resourceName, {
    vpc: vpc,
    description: "Security Group for public EC2 Web instances",
    securityGroupName: resourceName,
    allowAllOutbound: true
  })
  publicWebSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), "Allow incoming traffic over port 80");
  publicWebSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), "Allow incoming traffic over port 443");

  return publicWebSecurityGroup
}
