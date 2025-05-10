import { IPolicyStatementBuilder, PolicyStatementProduct } from '../../products/policy-statement';

export default class ElasticBPolicyStatementBuilder implements IPolicyStatementBuilder {
  private policyStatementProps: PolicyStatementProduct;

  constructor() {
    this.policyStatementProps = new PolicyStatementProduct();
  }

  setUploadEC2Stats(): this {
   this.policyStatementProps
     .addAction('elasticbeanstalk:PutInstanceStatistics');

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
