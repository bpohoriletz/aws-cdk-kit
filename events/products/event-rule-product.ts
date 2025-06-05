import * as events from 'aws-cdk-lib/aws-events';

export class EventRuleProduct implements IEventRuleProduct {
  eventPattern?: events.EventPattern | undefined;
  targets?: events.IRuleTarget[] | undefined;
}

interface IEventRuleProduct extends events.RuleProps {
  eventPattern?: events.EventPattern | undefined;
  targets?: events.IRuleTarget[] | undefined;
}

export interface IEventRuleBuilder {
  setEventPattern?(pattern: events.EventPattern | undefined): IEventRuleBuilder;
  // maybe have on director
  addTarget?(target: events.IRuleTarget | undefined): IEventRuleBuilder;
  getResult(): events.RuleProps;
}

export interface IEventRuleBuilderConstructor {
  new (): IEventRuleBuilder;
}
