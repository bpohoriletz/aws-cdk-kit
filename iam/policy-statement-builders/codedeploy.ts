import { IPolicyStatementBuilder, PolicyStatementProduct } from '../../products/policy-statement';

export default class CodedeployPolicyStatementBuilder implements IPolicyStatementBuilder {
  private policyStatementProps: PolicyStatementProduct;

  constructor() {
    this.policyStatementProps = new PolicyStatementProduct();
  }

  setPermissions(): this {
    this.policyStatementProps.addAction('codedeploy:*');

    return this;
  }

  addResource(resource: string): this {
    this.policyStatementProps.addResource(resource);

    return this;
  }

  getResult(): PolicyStatementProduct {
    return this.policyStatementProps;
  }
}
