import { IPolicyStatementBuilder, PolicyStatementProduct } from '../products/policy-statement';

export default class PolicyStatementBuilder implements IPolicyStatementBuilder {
  private policyStatementProps: PolicyStatementProduct;

  constructor() {
    this.policyStatementProps = new PolicyStatementProduct();
  }

  getResult(): PolicyStatementProduct {
    return this.policyStatementProps;
  }
}
