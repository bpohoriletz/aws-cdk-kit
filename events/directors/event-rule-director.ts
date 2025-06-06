import { Construct } from 'constructs';
import { IEventRuleBuilder, IEventRuleBuilderConstructor } from '../products/event-rule-product';
import * as events from 'aws-cdk-lib/aws-events';

export default class EventRuleDirector {
  autoscalingGroupName: string;
  private builder: IEventRuleBuilder;

  constructor(builder: IEventRuleBuilderConstructor) {
    this.builder = new builder();
  }

  constructAutoscalingGroupEvent(scope: Construct, id: string) {
    this.builder.setEventPattern!(this.autoscalingGroupName!);

    return new events.Rule(scope, id, this.builder.getResult());
  }
}
