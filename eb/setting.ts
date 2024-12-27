import * as ec2 from "aws-cdk-lib/aws-ec2";
import { aws_elasticbeanstalk as eb } from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";

export async function envOptionSettings(resourceNamePrefix: string[], instanceProfile: iam.IInstanceProfile, securityGroups: ec2.SecurityGroup[], vpc: ec2.IVpc) : Promise<eb.CfnEnvironment.OptionSettingProperty[]> {
  const project = resourceNamePrefix.pop() || "";
  const uniqConf = await loadConfig(resourceNamePrefix, project, "uniq");
  const convConf = await loadConfig(resourceNamePrefix, project, "conventional");
  const sharConf = await loadConfig(resourceNamePrefix, project, "shared");
  const dynaConf = dynamicConfig(securityGroups, instanceProfile, vpc);
  const result = uniqConf.concat(convConf).concat(sharConf).concat(dynaConf).filter(
    (setting, index, arr) => {
      if (0 == index) {
        return true;
      }
      return !arr.slice(0, index - 1).some((dup) => ((setting.optionName == dup.optionName) && (setting.resourceName == dup.resourceName)));
    }
  );

  return result;
}

// Private
function dynamicConfig(securityGroups: ec2.SecurityGroup[], instanceProfile: iam.IInstanceProfile, vpc: ec2.IVpc): eb.CfnEnvironment.OptionSettingProperty[] {
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
      value: instanceProfile.instanceProfileName
    }
  ];
}

async function loadConfig(resourceNamePrefix: string[], scope: string, kind: string) : Promise<eb.CfnEnvironment.OptionSettingProperty[]> {
  try {
    const config = await import(`../../config/eb/${scope}/${kind}`);

    return config.envConfig(resourceNamePrefix, scope);
  }
  catch (_error) {
    console.log(_error);

    return [];
  }
}
