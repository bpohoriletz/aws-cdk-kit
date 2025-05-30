import { MachineImage, UserData } from 'aws-cdk-lib/aws-ec2';
import LaunchTemplateBuilderBase from '../launch-template-builder-base';
import { ILaunchTemplateBuilder } from '../products/launch-template';

export default class Al2023PrivateBuilder extends LaunchTemplateBuilderBase implements ILaunchTemplateBuilder {
  setPublic(): ILaunchTemplateBuilder {
    this.launchTemplateProps.associatePublicIpAddress = false;

    return this;
  }

  setUserData(): ILaunchTemplateBuilder {
    const userData = UserData.forLinux();
    userData.addCommands('echo Hello World');
    this.launchTemplateProps.userData = userData;

    return this;
  }

  setMachineImage(): ILaunchTemplateBuilder {
    this.launchTemplateProps.machineImage = MachineImage.latestAmazonLinux2023();

    return this;
  }
}
