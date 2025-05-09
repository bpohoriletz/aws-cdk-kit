import * as iam from 'aws-cdk-lib/aws-iam';

export class PolicyProduct implements iam.PolicyProps {}

export interface IPolicyBuilder {
  getResult(): PolicyProduct;
}

export interface IPolicyBuilderConstructor {
  new (): IPolicyBuilder;
}
