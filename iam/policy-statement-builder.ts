import { IPolicyStatementBuilder, PolicyStatementProduct } from '../products/policy-statement';

export default class PolicyStatementBuilder implements IPolicyStatementBuilder {
  private policyStatementProps: PolicyStatementProduct;

  constructor() {
    this.policyStatementProps = new PolicyStatementProduct();
  }

  addResource(_resource: string): this {
    return this;
  }

  setPermissions(): this {
    return this;
  }

  getResult(): PolicyStatementProduct {
    return this.policyStatementProps;
  }
}
