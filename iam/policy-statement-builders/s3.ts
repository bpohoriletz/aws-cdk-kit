import { IPolicyStatementBuilder, PolicyStatementProduct } from '../../products/policy-statement';

export default class S3PolicyStatementBuilder implements IPolicyStatementBuilder {
  private policyStatementProps: PolicyStatementProduct;

  constructor() {
    this.policyStatementProps = new PolicyStatementProduct();
  }

  setRead(): this {
    this.policyStatementProps
      .addAction('s3:ListBucket')
      .addAction('s3:ListBucketVersions')
      .addAction('s3:GetObject')
      .addAction('s3:GetObjectVersion');

    return this;
  }

  setWrite(): this {
    this.policyStatementProps.addAction('s3:PutObject');

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
