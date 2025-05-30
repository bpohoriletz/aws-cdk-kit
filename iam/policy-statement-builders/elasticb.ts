import { IPolicyStatementBuilder } from '../products/policy-statement';
import PolicyStatementBuilderBase from '../policy-statement-builder-base';

export default class ElasticBPolicyStatementBuilder
  extends PolicyStatementBuilderBase
  implements IPolicyStatementBuilder
{
  setPermissions(): this {
    this.policyStatementProps.addAction('elasticbeanstalk:PutInstanceStatistics');

    return this;
  }
}
