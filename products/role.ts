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
  getResult(): RoleProduct;
}

export interface IRoleBuilderConstructor {
  new (): IRoleBuilder;
}
