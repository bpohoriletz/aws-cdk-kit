/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as events from 'aws-cdk-lib/aws-events';
import { EventRuleProduct, IEventRuleBuilder } from './products/event-rule-product';

export default abstract class EventRuleBuilderBase implements IEventRuleBuilder {
  protected props: EventRuleProduct;

  constructor() {
    this.props = new EventRuleProduct();
    this.props.targets = [];
  }

  addTarget(target: events.IRuleTarget | undefined): IEventRuleBuilder {
    target && this.props.targets!.push(target);

    return this;
  }

  getResult(): events.RuleProps {
    return this.props;
  }
}
