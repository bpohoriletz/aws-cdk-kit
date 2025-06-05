import EventRuleBuilderBase from '../event-rule-builder-base';
import { IEventRuleBuilder } from '../products/event-rule-product';

export default class AutoscalingLaunchTerminateEventRuleBuilder extends EventRuleBuilderBase {
  setEventPattern(autoscalingGroupName: string): IEventRuleBuilder {
    this.props.eventPattern = {
      source: ['aws.autoscaling'],
      detailType: ['EC2 Instance Launch Successful', 'EC2 Instance Terminate Successful'],
      detail: {
        AutoScalingGroupName: [autoscalingGroupName],
      },
    };

    return this;
  }
}
