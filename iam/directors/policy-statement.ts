import * as iam from 'aws-cdk-lib/aws-iam';
import { IPolicyStatementBuilder, IPolicyStatementBuilderConstructor } from '../products/policy-statement';

export default class PolicyStatementDirector {
  private builder: IPolicyStatementBuilder;

  constructor(builder: IPolicyStatementBuilderConstructor) {
    this.builder = new builder();
  }

  constructPolicyStatement(resources: string[] = ['*']): iam.PolicyStatement {
    resources.forEach((resource) => {
      this.builder.addResource(resource);
    });
    this.builder.setPermissions();

    return new iam.PolicyStatement(this.builder.getResult());
  }
}
