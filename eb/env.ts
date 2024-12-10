import { readFileSync } from "fs";
import { Stack, CfnOutput } from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { CfnApplication, CfnEnvironment, CfnEnvironmentProps } from "aws-cdk-lib/aws-elasticbeanstalk";
import { CfnInstanceProfile } from "aws-cdk-lib/aws-iam";
import { DatabaseInstance } from "aws-cdk-lib/aws-rds";
import { CfnScheduledAction } from 'aws-cdk-lib/aws-autoscaling';
import * as sharedUiConfig from "../../config/eb/shared-ui.json"
import { convUiConfig } from "../../config/eb/conventional-ui"
import * as sharedApiConfig from "../../config/eb/shared-api.json"
import { convApiConfig } from "../../config/eb/conventional-api"
import { uniqApiConfig } from "../../config/eb/uniq-api"
import { uniqUiConfig } from "../../config/eb/uniq-ui"
import { excludesApiConfig } from "../../config/eb/excludes-api"
import { excludesUiConfig } from "../../config/eb/excludes-ui"
import * as con from "../naming/resources"

// TOFIX; Have single function for both environments and pass configuration inside
export function createSandboxApiEnvironment(application: CfnApplication,
  resourceNamePrefix: string[],
  vpc: ec2.IVpc,
  instanceProfile: CfnInstanceProfile,
  stack: Stack,
  solutionStackName: string) : CfnEnvironment {
    const environmentName: string = con.ebEnvironmentName(resourceNamePrefix);
    const shortEnvironmentName: string = con.shortEbEnvironmentName(resourceNamePrefix);

    const webSg: ec2.SecurityGroup = createWebSg(resourceNamePrefix, vpc, stack)
    webSg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), "Allow incoming traffic over port 80");
    webSg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), "Allow incoming traffic over port 443");
    const envOptions: CfnEnvironmentProps = {
      applicationName: application.applicationName!,
      environmentName: environmentName,
      solutionStackName: solutionStackName,
      optionSettings: [
        {
          namespace: "aws:elasticbeanstalk:environment",
          optionName: "EnvironmentType",
          value: "SingleInstance"
        },{
          namespace: "aws:ec2:vpc",
          optionName: "Subnets",
          value: vpc.publicSubnets.map(subnet => subnet.subnetId).join(",")
        },{
          namespace: "aws:autoscaling:launchconfiguration",
          optionName: "SecurityGroups",
          value: webSg.securityGroupId
        },{
          namespace: "aws:autoscaling:launchconfiguration",
          optionName: "IamInstanceProfile",
          value: instanceProfile.instanceProfileName!
        }
      ].concat(
        uniqApiConfig(shortEnvironmentName).concat(
          convApiConfig(shortEnvironmentName).filter( el => !excludesApiConfig(shortEnvironmentName).includes(el.optionName) ).concat(
            sharedApiConfig["options"].filter( el => !excludesApiConfig(shortEnvironmentName).includes(el.optionName) )
            // Deprecate
            //.concat(environmentDynamicConfig(resourceNamePrefix, instanceProfile, vpc, stack))
          ).filter( (setting, index, arr) => {
            if (0 == index) {
              return true
            }
            return !arr.slice(0, index - 1).some((dup) => ((setting.optionName == dup.optionName) && (setting.resourceName == dup.resourceName)))
          })
        )
      )
    };
    const env: CfnEnvironment = new CfnEnvironment(stack, environmentName, envOptions);
    env.addDependency(instanceProfile);
    env.addDependency(application);

    new CfnOutput(stack, `${environmentName}ApplicationUrl`, {
      exportName: `${environmentName.toLowerCase()}-application-url`,
      value: env.attrEndpointUrl
    });

    return env;
  }

export function createSandboxUiEnvironment(application: CfnApplication,
  resourceNamePrefix: string[],
  vpc: ec2.IVpc,
  instanceProfile: CfnInstanceProfile,
  stack: Stack,
  solutionStackName: string) : CfnEnvironment {
    const environmentName: string = con.ebEnvironmentName(resourceNamePrefix);
    const shortEnvironmentName: string = con.shortEbEnvironmentName(resourceNamePrefix);

    const webSg: ec2.SecurityGroup = createWebSg(resourceNamePrefix, vpc, stack)
    webSg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), "Allow incoming traffic over port 80");
    webSg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), "Allow incoming traffic over port 443");
    const envOptions: CfnEnvironmentProps = {
      applicationName: application.applicationName!,
      environmentName: environmentName,
      solutionStackName: solutionStackName,
      optionSettings: [
        {
          namespace: "aws:elasticbeanstalk:environment",
          optionName: "EnvironmentType",
          value: "SingleInstance"
        },{
          namespace: "aws:ec2:vpc",
          optionName: "Subnets",
          value: vpc.publicSubnets.map(subnet => subnet.subnetId).join(",")
        },{
          namespace: "aws:autoscaling:launchconfiguration",
          optionName: "SecurityGroups",
          value: webSg.securityGroupId
        },{
          namespace: "aws:autoscaling:launchconfiguration",
          optionName: "IamInstanceProfile",
          value: instanceProfile.instanceProfileName!
        }
      ].concat(convUiConfig(shortEnvironmentName).concat(sharedUiConfig["options"]).filter(
        (setting, index, arr) => {
          if (0 == index) {
            return true
          }
          return !arr.slice(0, index - 1).some((dup) => ((setting.optionName == dup.optionName) && (setting.resourceName == dup.resourceName)))
        }
      )
      )
    };
    const env: CfnEnvironment = new CfnEnvironment(stack, environmentName, envOptions);
    env.addDependency(instanceProfile);
    env.addDependency(application);

    new CfnOutput(stack, `${environmentName}ApplicationUrl`, {
      exportName: `${environmentName.toLowerCase()}-application-url`,
      value: env.attrEndpointUrl
    });

    return env;
  }

export function createUiEnvironment(application: CfnApplication,
  resourceNamePrefix: string[],
  vpc: ec2.IVpc,
  instanceProfile: CfnInstanceProfile,
  stack: Stack,
  solutionStackName: string) : CfnEnvironment {
    const environmentName: string = con.ebEnvironmentName(resourceNamePrefix);
    const shortEnvironmentName: string = con.shortEbEnvironmentName(resourceNamePrefix);

    const envOptions: CfnEnvironmentProps = {
      applicationName: application.applicationName!,
      environmentName: environmentName,
      solutionStackName: solutionStackName,
      optionSettings: uniqUiConfig(shortEnvironmentName).concat(
        convUiConfig(shortEnvironmentName).filter( el => !excludesUiConfig(shortEnvironmentName).includes(el.optionName) )
        .concat(
          sharedUiConfig["options"].filter( el => !excludesUiConfig(shortEnvironmentName).includes(el.optionName) )
          .concat(
            environmentDynamicConfig(resourceNamePrefix, instanceProfile, vpc, stack)
          )
        )
      ).filter(
        (setting, index, arr) => {
          if (0 == index) {
            return true
          }
          return !arr.slice(0, index - 1).some((dup) => ((setting.optionName == dup.optionName) && (setting.resourceName == dup.resourceName)))
        }
      )

    };
    const env: CfnEnvironment = new CfnEnvironment(stack, environmentName, envOptions);
    env.addDependency(instanceProfile);
    env.addDependency(application);

    new CfnOutput(stack, `${environmentName}ApplicationUrl`, {
      exportName: `${environmentName.toLowerCase()}-application-url`,
      value: env.attrEndpointUrl
    });

    return env;
  }

export function createApiEnvironment(application: CfnApplication,
  resourceNamePrefix: string[],
  vpc: ec2.IVpc,
  instanceProfile: CfnInstanceProfile,
  stack: Stack,
  solutionStackName: string) : CfnEnvironment {
    const environmentName: string = con.ebEnvironmentName(resourceNamePrefix);
    const shortEnvironmentName: string = con.shortEbEnvironmentName(resourceNamePrefix);

    const envOptions: CfnEnvironmentProps = {
      applicationName: application.applicationName!,
      environmentName: environmentName,
      solutionStackName: solutionStackName,
      optionSettings: uniqApiConfig(shortEnvironmentName).concat(
        convApiConfig(shortEnvironmentName).filter( el => !excludesApiConfig(shortEnvironmentName).includes(el.optionName) )
        .concat(
          sharedApiConfig["options"].filter( el => !excludesApiConfig(shortEnvironmentName).includes(el.optionName) )
          .concat(
            environmentDynamicConfig(resourceNamePrefix, instanceProfile, vpc, stack)
          )
        )
      ).filter(
        (setting, index, arr) => {
          if (0 == index) {
            return true
          }
          return !arr.slice(0, index - 1).some((dup) => ((setting.optionName == dup.optionName) && (setting.resourceName == dup.resourceName)))
        }
      )

    };
    const env: CfnEnvironment = new CfnEnvironment(stack, environmentName, envOptions);
    env.addDependency(instanceProfile);
    env.addDependency(application);

    new CfnOutput(stack, `${environmentName}ApplicationUrl`, {
      exportName: `${environmentName.toLowerCase()}-application-url`,
      value: env.attrEndpointUrl
    });

    return env;
  }

// Deprecate
function environmentDynamicConfig(resourceNamePrefix: string[], instanceProfile: CfnInstanceProfile, vpc: ec2.IVpc, stack: Stack): Array<any> {
  const securityGroups: ec2.SecurityGroup[] = createSecurityGroups(resourceNamePrefix, vpc, stack);

  // Documentation - https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options-general.html
  // Load in EC2   - export $(/opt/elasticbeanstalk/bin/get-config --output YAML environment | sed -r 's/: /=/' | xargs)
  return [
    {
      namespace: "aws:autoscaling:launchconfiguration",
      optionName: "SecurityGroups",
      value: securityGroups[1].securityGroupId
    },{
      namespace: "aws:elbv2:loadbalancer",
      optionName: "SecurityGroups",
      value: securityGroups[0].securityGroupId
    },{
      namespace: "aws:ec2:vpc",
      optionName: "ELBSubnets",
      value: vpc.publicSubnets.map(subnet => subnet.subnetId).join(",")
    },{
      namespace: "aws:ec2:vpc",
      optionName: "Subnets",
      value: vpc.privateSubnets.map(subnet => subnet.subnetId).join(",")
    },{
      namespace: "aws:autoscaling:launchconfiguration",
      optionName: "IamInstanceProfile",
      value: instanceProfile.instanceProfileName!
    }
  ]
}

function createSecurityGroups(resourceNamePrefix: string[], vpc: ec2.IVpc, stack: Stack): ec2.SecurityGroup[] {
  let resourceName: string;
  // Create Security Group for load balancer
  resourceName = con.ec2SecurityGroupName(resourceNamePrefix.slice(0,3), "lb")
  const lbSecurityGroup = new ec2.SecurityGroup(stack, resourceName , {
    vpc: vpc,
    description: "Security Group for the Load Balancer",
    securityGroupName: resourceName,
    allowAllOutbound: true
  })

  // Allow Security Group inbound traffic for load balancer
  lbSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), "Allow incoming traffic over port 80");
  lbSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), "Allow incoming traffic over port 443");

  // Create Security Group for web instances
  const webSecurityGroup = createWebSg(resourceNamePrefix, vpc, stack)
  // Allow Security Group inbound traffic over port 80 from the Load Balancer security group
  webSecurityGroup.connections.allowFrom( new ec2.Connections({securityGroups: [lbSecurityGroup]}), ec2.Port.tcp(80))

  return [lbSecurityGroup, webSecurityGroup]
}

function createWebSg(resourceNamePrefix: string[], vpc: ec2.IVpc, stack: Stack): ec2.SecurityGroup {
  let resourceName: string;
  // Create Security Group for web instances
  resourceName = con.ec2SecurityGroupName(resourceNamePrefix.slice(0,3), "web")
  const webSecurityGroup = new ec2.SecurityGroup(stack, resourceName, {
    vpc: vpc,
    description: "Security Group for the Web instances",
    securityGroupName: resourceName,
    allowAllOutbound: true
  })

  return webSecurityGroup
}
