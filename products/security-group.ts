import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class SecurityGroupProduct implements ISecurityGroupProduct {
  vpc: ec2.IVpc;
  description?: string;
  securityGroupName?: string;
}

interface ISecurityGroupProduct extends ec2.SecurityGroupProps {
  vpc: ec2.IVpc;
  description?: string;
  securityGroupName?: string;
}

export interface ISecurityGroupBuilder {
  setVpc(vpc: ec2.IVpc): this;
  setDescription(description: string): this;
  setName(name: string): this;
  getResult(): ec2.SecurityGroupProps;
}

export interface ISecurityGroupBuilderConstructor {
  new (): ISecurityGroupBuilder;
}
