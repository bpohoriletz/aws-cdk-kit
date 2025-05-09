import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class SecurityGroupProduct implements ec2.SecurityGroupProps {
  vpc: ec2.IVpc;
  description: string;
  securityGroupName: string;

  setVpcs(vpc: ec2.IVpc): void {
    this.vpc = vpc;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setSecurityGroupName(name: string): void {
    this.securityGroupName = name;
  }
}

export interface ISecurityGroupBuilder {
  customizeVpc(vpc: ec2.IVpc): this;
  customizeDescription(description: string): this;
  customizeName(name: string): this;
  getResult(): SecurityGroupProduct;
}

export interface ISecurityGroupBuilderConstructor {
  new (): ISecurityGroupBuilder;
}
