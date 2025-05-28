import { Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { RoleProduct } from '../products/role';

export default abstract class RoleBuilderBase {
  protected role: iam.Role;
  protected roleProps: RoleProduct;
  protected stack: Stack;

  constructor(stack: Stack) {
    this.stack = stack;
    this.roleProps = new RoleProduct();
  }

  getResult(): iam.Role {
    return this.role;
  }
}
