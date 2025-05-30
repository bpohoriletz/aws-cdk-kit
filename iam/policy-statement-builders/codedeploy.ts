import { IPolicyStatementBuilder } from '../products/policy-statement';
import PolicyStatementBuilderBase from '../policy-statement-builder-base';

export default class CodedeployPolicyStatementBuilder
  extends PolicyStatementBuilderBase
  implements IPolicyStatementBuilder
{
  setPermissions(): this {
    this.policyStatementProps.addAction('codedeploy:*');

    return this;
  }
}
