import { Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

export class RoleProduct implements iam.RoleProps {
  assumedBy: iam.IPrincipal;
  description: string;

  setAssumedBy(principal: iam.IPrincipal): void {
    this.assumedBy = principal;
  }

  setDescription(description: string): void {
    this.description = description;
  }
}

export interface IRoleBuilder {
  setInlinePolicies(resources: string[]): this;
  setManagedPolicies(): this;
  getResult(): iam.Role;
}

export interface IRoleBuilderConstructor {
  new (stack: Stack, id: string): IRoleBuilder;
}
