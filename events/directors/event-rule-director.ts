import { Construct } from 'constructs';
import { IEventRuleBuilder, IEventRuleBuilderConstructor } from '../products/event-rule-product';
import * as events from 'aws-cdk-lib/aws-events';

export default class EventRuleDirector {
  private builder: IEventRuleBuilder;

  constructor(builder: IEventRuleBuilderConstructor) {
    this.builder = new builder();
  }

  constructAutoscalingGroupEvent(scope: Construct, id: string, autoscalingGroupName: string) {
    this.builder.setEventPattern!(autoscalingGroupName);

    return new events.Rule(scope, id, this.builder.getResult());
  }
}
