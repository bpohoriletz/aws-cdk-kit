import { Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

export class RoleProduct implements IRoleProduct {
  assumedBy: iam.IPrincipal;
  description?: string;
}

interface IRoleProduct extends iam.RoleProps {
  assumedBy: iam.IPrincipal;
  description?: string;
}

export interface IRoleBuilder {
  setInlinePolicies(resources: string[]): this;
  setManagedPolicies(): this;
  getResult(): iam.Role;
}

export interface IRoleBuilderConstructor {
  new (stack: Stack, id: string): IRoleBuilder;
}
