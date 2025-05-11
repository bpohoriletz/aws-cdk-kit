import { IPolicyStatementBuilder, PolicyStatementProduct } from '../../products/policy-statement';

export default class LogsPolicyStatementBuilder implements IPolicyStatementBuilder {
  private policyStatementProps: PolicyStatementProduct;

  constructor() {
    this.policyStatementProps = new PolicyStatementProduct();
  }

  setUpload(): this {
    this.policyStatementProps.addAction('logs:CreateLogStream').addAction('logs:PutLogEvents');

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
