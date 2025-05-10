import * as iam from 'aws-cdk-lib/aws-iam';
import { IPolicyStatementBuilder, IPolicyStatementBuilderConstructor } from '../products/policy-statement';

export default class PolicyStatementDirector {
  private builder: IPolicyStatementBuilder;

  constructor(builder: IPolicyStatementBuilderConstructor) {
    this.builder = new builder();
  }

  constructEmptyPolicyStatement(): iam.PolicyStatement {
    return new iam.PolicyStatement(this.builder.getResult());
  }

  constructFullAccess(resources: string[] = ['*']): iam.PolicyStatement {
    this.builder.setFullAccess!();
    resources.forEach((resource) => {
      this.builder.addResource!(resource);
    });

    return new iam.PolicyStatement(this.builder.getResult());
  }

  constructEbEC2StatsPolicyStatement(resources: string[] = ['*']): iam.PolicyStatement {
    this.builder.setUploadEC2Stats!();
    resources.forEach((resource) => {
      this.builder.addResource!(resource);
    });

    return new iam.PolicyStatement(this.builder.getResult());
  }

  constructLogsUploadPolicyStatement(resources: string[] = ['*']): iam.PolicyStatement {
    this.builder.setUpload!();
    resources.forEach((resource) => {
      this.builder.addResource!(resource);
    });

    return new iam.PolicyStatement(this.builder.getResult());
  }

  constructS3ReadWritePolicyStatement(resources: string[]): iam.PolicyStatement {
    this.builder.setRead!().setWrite!();
    resources.forEach((resource) => {
      this.builder.addResource!(resource);
    });

    return new iam.PolicyStatement(this.builder.getResult());
  }
}
