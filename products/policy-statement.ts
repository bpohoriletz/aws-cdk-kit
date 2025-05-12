import * as iam from 'aws-cdk-lib/aws-iam';

export class PolicyStatementProduct implements iam.PolicyStatementProps {
  actions: string[];
  resources: string[];

  constructor() {
    this.actions = [];
    this.resources = [];
  }

  addAction(action: string): this {
    this.actions.push(action);

    return this;
  }

  addResource(resource: string): this {
    this.resources.push(resource);

    return this;
  }
}

export interface IPolicyStatementBuilder {
  setPermissions(): this;
  addResource(resource: string): this;
  getResult(): PolicyStatementProduct;
}

export interface IPolicyStatementBuilderConstructor {
  new (): IPolicyStatementBuilder;
}
