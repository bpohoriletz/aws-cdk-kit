import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { ISecurityGroupBuilder, SecurityGroupProduct } from '../products/security-group';

export default class SecurityGroupBuilder implements ISecurityGroupBuilder {
  protected securityGroupProps: SecurityGroupProduct;

  constructor() {
    this.securityGroupProps = new SecurityGroupProduct();
  }

  customizeVpc(vpc: ec2.IVpc): this {
    this.securityGroupProps.setVpcs(vpc);

    return this;
  }

  customizeName(name: string): this {
    this.securityGroupProps.setSecurityGroupName(name);

    return this;
  }

  customizeDescription(description: string): this {
    this.securityGroupProps.setDescription(description);

    return this;
  }

  getResult(): SecurityGroupProduct {
    return this.securityGroupProps;
  }
}
