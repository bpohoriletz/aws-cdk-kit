import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import EventRuleDirector from '../event-rule-director';
import AutoscalingLaunchTerminateEventRuleBuilder from '../../event-rule-builders/autoscaling-launch-terminate-event-rule-builder'; // eslint-disable-line max-len

describe('new EventRuleDirector()', () => {
  let instance: EventRuleDirector;
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  it('constructs role for autoscaling group EC2 succesful terminate/launch', () => {
    instance = new EventRuleDirector(AutoscalingLaunchTerminateEventRuleBuilder);
    instance.constructAutoscalingGroupEvent(stack, 'EventID', 'test-asg');

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
