import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { IPolicyBuilder, IPolicyBuilderConstructor } from '../products/policy';

export default class PolicyDirector {
  private builder: IPolicyBuilder;

  constructor(builder: IPolicyBuilderConstructor) {
    this.builder = new builder();
  }

  constructPolicy(construct: Construct, id: string): iam.Policy {
    return new iam.Policy(construct, id, this.builder.getResult());
  }
}
