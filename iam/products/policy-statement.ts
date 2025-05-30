import * as iam from 'aws-cdk-lib/aws-iam';

export class PolicyStatementProduct implements IPolicyStatementProduct {
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

interface IPolicyStatementProduct extends iam.PolicyDocumentProps {
  actions?: string[];
  resources?: string[];
}

export interface IPolicyStatementBuilder {
  setPermissions(): IPolicyStatementBuilder;
  addResource(resource: string): IPolicyStatementBuilder;
  getResult(): iam.PolicyStatementProps;
}

export interface IPolicyStatementBuilderConstructor {
  new (): IPolicyStatementBuilder;
}
