import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

export class LaunchTemplateProduct implements ILaunchTemplateProduct {
  associatePublicIpAddress?: boolean;
  instanceProfile?: iam.IInstanceProfile;
  instanceType?: ec2.InstanceType;
  launchTemplateName?: string;
  machineImage?: ec2.IMachineImage;
  securityGroup?: ec2.SecurityGroup;
  userData?: ec2.UserData;
}

interface ILaunchTemplateProduct extends ec2.LaunchTemplateProps {
  associatePublicIpAddress?: boolean;
  instanceProfile?: iam.IInstanceProfile;
  instanceType?: ec2.InstanceType;
  launchTemplateName?: string;
  machineImage?: ec2.IMachineImage;
  securityGroup?: ec2.SecurityGroup;
  userData?: ec2.UserData;
}

export interface ILaunchTemplateBuilder {
  setPublic?(): ILaunchTemplateBuilder;
  setInstanceProfile(profile?: iam.IInstanceProfile): ILaunchTemplateBuilder;
  setInstanceType(instanceType: ec2.InstanceType): ILaunchTemplateBuilder;
  setName(name?: string): ILaunchTemplateBuilder;
  setMachineImage?(image?: ec2.IMachineImage): ILaunchTemplateBuilder;
  setSecurityGroup(group: ec2.SecurityGroup): ILaunchTemplateBuilder;
  setUserData?(data?: ec2.UserData): ILaunchTemplateBuilder;
  getResult(): ec2.LaunchTemplateProps;
}

export interface ILaunchTemplateBuilderConstructor {
  new (): ILaunchTemplateBuilder;
}
