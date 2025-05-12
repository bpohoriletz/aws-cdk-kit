import * as iam from 'aws-cdk-lib/aws-iam';
import { IRoleBuilderConstructor } from '../products/role';
import { Stack } from 'aws-cdk-lib';

export default class RoleDirector {
  private builder: IRoleBuilderConstructor;

  constructor(builder: IRoleBuilderConstructor) {
    this.builder = builder;
  }

  constructEc2Role(stack: Stack, roleId: string, bucketArn: string): iam.Role {
    return new this.builder(stack, roleId).setInlinePolicies([bucketArn]).setManagedPolicies().getResult();
  }
}
