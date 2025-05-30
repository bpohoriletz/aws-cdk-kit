import { Stack, CfnOutput } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { CfnApplication, CfnEnvironment } from 'aws-cdk-lib/aws-elasticbeanstalk';
import * as iam from 'aws-cdk-lib/aws-iam';

import SecurityGroupDirector from '../ec2/directors/security-group';
import SecurityGroupBuilder from '../ec2/security-group-builder';
import { envOptionSettings } from './setting';
import * as con from '../utils/naming';

export async function createEnvironment(
  application: CfnApplication,
  resourceNamePrefix: string[],
  instanceProfile: iam.IInstanceProfile,
  vpc: ec2.IVpc,
  stack: Stack,
  solutionStackName: string
): Promise<[CfnEnvironment, ec2.SecurityGroup]> {
  const environmentName = con.ebEnvironmentName(resourceNamePrefix);
  const securityGroups = createSecurityGroups(stack, vpc);

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
    value: env.attrEndpointUrl,
  });

  return [env, securityGroups[1]];
}

// Private
function createSecurityGroups(stack: Stack, vpc: ec2.IVpc): ec2.SecurityGroup[] {
  const lbSecurityGroup = new SecurityGroupDirector(SecurityGroupBuilder).constructWebSecurityGroup(
    stack,
    'LbSecurityGroup',
    vpc
  );
  const webSecurityGroup = new SecurityGroupDirector(SecurityGroupBuilder).constructWebSecurityGroup(
    stack,
    'WebSecurityGroup',
    vpc
  );
  webSecurityGroup.connections.allowFrom(new ec2.Connections({ securityGroups: [lbSecurityGroup] }), ec2.Port.tcp(80));

  return [lbSecurityGroup, webSecurityGroup];
}
