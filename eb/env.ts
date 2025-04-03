import { Stack, CfnOutput } from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { CfnApplication, CfnEnvironment } from "aws-cdk-lib/aws-elasticbeanstalk";
import * as iam from "aws-cdk-lib/aws-iam";

import { envOptionSettings } from "./setting";
import * as con from "../utils/naming";

export async function createEnvironment(
  application: CfnApplication,
  resourceNamePrefix: string[],
  instanceProfile: iam.IInstanceProfile,
  vpc: ec2.IVpc,
  stack: Stack,
  solutionStackName: string) : Promise<[CfnEnvironment, ec2.SecurityGroup]> {
    const environmentName = con.ebEnvironmentName(resourceNamePrefix);
    const securityGroups = createSecurityGroups(resourceNamePrefix, vpc, stack);

    const env = new CfnEnvironment(stack, environmentName, {
      applicationName: application.applicationName!,
      environmentName: environmentName,
      solutionStackName: solutionStackName,
      optionSettings: await envOptionSettings(resourceNamePrefix, instanceProfile, securityGroups, vpc),
    });
    const cfnInstanceProfile = instanceProfile.node.defaultChild as iam.CfnInstanceProfile;
    env.addDependency(cfnInstanceProfile);
    env.addDependency(application);

    new CfnOutput(stack, `${environmentName}ApplicationUrl`, {
      exportName: `${environmentName.toLowerCase()}-application-url`,
      value: env.attrEndpointUrl
    });

    return [env, securityGroups[1]];
  }

// Private
function createSecurityGroups(resourceNamePrefix: string[], vpc: ec2.IVpc, stack: Stack): ec2.SecurityGroup[] {
  // Create Security Group for load balancer
  const resourceName = con.ec2SecurityGroupName(resourceNamePrefix.slice(0,3), "lb");
  const lbSecurityGroup = new ec2.SecurityGroup(stack, resourceName , {
    vpc: vpc,
    description: "Security Group for the Load Balancer",
    securityGroupName: resourceName,
    allowAllOutbound: true
  });

  // Allow Security Group inbound traffic for load balancer
  lbSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), "Allow incoming traffic over port 80");
  lbSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), "Allow incoming traffic over port 443");

  // Create Security Group for web instances
  const webSecurityGroup = createWebSg(resourceNamePrefix, vpc, stack);
  // Allow Security Group inbound traffic over port 80 from the Load Balancer security group
  webSecurityGroup.connections.allowFrom( new ec2.Connections({securityGroups: [lbSecurityGroup]}), ec2.Port.tcp(80));

  return [lbSecurityGroup, webSecurityGroup];
}

function createWebSg(resourceNamePrefix: string[], vpc: ec2.IVpc, stack: Stack): ec2.SecurityGroup {
  // Create Security Group for web instances
  const resourceName = con.ec2SecurityGroupName(resourceNamePrefix.slice(0,3), "web");
  const webSecurityGroup = new ec2.SecurityGroup(stack, resourceName, {
    vpc: vpc,
    description: "Security Group for the Web instances",
    securityGroupName: resourceName,
    allowAllOutbound: true
  });

  return webSecurityGroup;
}
