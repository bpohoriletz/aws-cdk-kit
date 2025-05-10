import { IPolicyStatementBuilder, PolicyStatementProduct } from '../products/policy-statement';

export default class PolicyStatementBuilder implements IPolicyStatementBuilder {
  private policyStatementProps: PolicyStatementProduct;

  constructor() {
    this.policyStatementProps = new PolicyStatementProduct();
  }

  addResource(resource: string): this {
    console.log(resource);

    return this;
  }

  getResult(): PolicyStatementProduct {
    return this.policyStatementProps;
  }
}
