import { IPolicyStatementBuilder } from '../products/policy-statement';
import PolicyStatementBuilderBase from '../policy-statement-builder-base';

export default class S3PolicyStatementBuilder extends PolicyStatementBuilderBase implements IPolicyStatementBuilder {
  setPermissions(): this {
    this.policyStatementProps
      .addAction('s3:ListBucket')
      .addAction('s3:ListBucketVersions')
      .addAction('s3:GetObject')
      .addAction('s3:GetObjectVersion')
      .addAction('s3:PutObject');

    return this;
  }
}
