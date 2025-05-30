import { InstanceType, LaunchTemplate, SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { ILaunchTemplateBuilder, ILaunchTemplateBuilderConstructor } from '../products/launch-template';
import { Construct } from 'constructs';
import { IInstanceProfile } from 'aws-cdk-lib/aws-iam';

export default class LaunchTemplateDirector {
  profile: IInstanceProfile;
  instanceType: InstanceType;
  securityGroup: SecurityGroup;

  private builder: ILaunchTemplateBuilder;

  constructor(builder: ILaunchTemplateBuilderConstructor) {
    this.builder = new builder();
  }

  constructLaunchTemplate(scope: Construct, id: string, name?: string) {
    this.builder
      .setName(name)
      .setInstanceProfile(this.profile)
      .setInstanceType(this.instanceType)
      .setSecurityGroup(this.securityGroup).setUserData!().setPublic!().setMachineImage!();

    return new LaunchTemplate(scope, id, this.builder.getResult());
  }
}
