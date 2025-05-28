import { IPolicyStatementBuilder } from '../../products/policy-statement';
import PolicyStatementBuilderBase from '../policy-statement-builder-base';

export default class LogsPolicyStatementBuilder extends PolicyStatementBuilderBase implements IPolicyStatementBuilder {
  setPermissions(): this {
    this.policyStatementProps.addAction('logs:CreateLogStream').addAction('logs:PutLogEvents');

    return this;
  }
}
