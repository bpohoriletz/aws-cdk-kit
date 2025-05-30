import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { ISecurityGroupBuilder, SecurityGroupProduct } from './products/security-group';

export default class SecurityGroupBuilder implements ISecurityGroupBuilder {
  protected securityGroupProps: SecurityGroupProduct;

  constructor() {
    this.securityGroupProps = new SecurityGroupProduct();
  }

  setVpc(vpc: ec2.IVpc): this {
    this.securityGroupProps.vpc = vpc;

    return this;
  }

  setName(name: string): this {
    this.securityGroupProps.securityGroupName = name;

    return this;
  }

  setDescription(description: string): this {
    this.securityGroupProps.description = description;

    return this;
  }

  getResult(): SecurityGroupProduct {
    return this.securityGroupProps;
  }
}
