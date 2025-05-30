/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { LaunchTemplateProduct } from './products/launch-template';

export default abstract class LaunchTemplateBuilderBase {
  protected launchTemplateProps: LaunchTemplateProduct;

  constructor() {
    this.launchTemplateProps = new LaunchTemplateProduct();
  }

  setInstanceProfile(profile?: iam.IInstanceProfile): this {
    profile && (this.launchTemplateProps.instanceProfile = profile);

    return this;
  }

  setInstanceType(instanceType?: ec2.InstanceType): this {
    instanceType && (this.launchTemplateProps.instanceType = instanceType);

    return this;
  }

  setName(name?: string): this {
    name && (this.launchTemplateProps.launchTemplateName = name);

    return this;
  }

  setSecurityGroup(group?: ec2.SecurityGroup): this {
    group && (this.launchTemplateProps.securityGroup = group);

    return this;
  }

  getResult(): ec2.LaunchTemplateProps {
    return this.launchTemplateProps;
  }
}
