import * as ec2 from 'aws-cdk-lib/aws-ec2';
import LaunchTemplateBuilderBase from '../launch-template-builder-base';
import { ILaunchTemplateBuilder } from '../products/launch-template';

export default class Al2023PublicBuilder extends LaunchTemplateBuilderBase implements ILaunchTemplateBuilder {
  setPublic(): ILaunchTemplateBuilder {
    this.launchTemplateProps.associatePublicIpAddress = true;

    return this;
  }

  setUserData(): ILaunchTemplateBuilder {
    const userData = ec2.UserData.forLinux();
    userData.addCommands('echo Hello World');
    this.launchTemplateProps.userData = userData;

    return this;
  }

  setMachineImage(): ILaunchTemplateBuilder {
    this.launchTemplateProps.machineImage = new ec2.GenericLinuxImage({
      'us-east-1': 'ami-05ffe3c48a9991133',
    });

    return this;
  }
}
