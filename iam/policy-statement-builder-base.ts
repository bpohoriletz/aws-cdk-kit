import * as iam from 'aws-cdk-lib/aws-iam';
import { PolicyStatementProduct } from '../products/policy-statement';

export default class PolicyStatementBuilderBase {
  protected policyStatementProps: PolicyStatementProduct;

  constructor() {
    this.policyStatementProps = new PolicyStatementProduct();
  }

  addResource(resource: string): this {
    this.policyStatementProps.addResource(resource);

    return this;
  }

  getResult(): iam.PolicyStatementProps {
    return this.policyStatementProps;
  }
}
