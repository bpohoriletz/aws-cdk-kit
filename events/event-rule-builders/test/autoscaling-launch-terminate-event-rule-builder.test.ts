import AutoscalingLaunchTerminateEventRuleBuilder from '../autoscaling-launch-terminate-event-rule-builder';

describe('new AutoscalingLaunchTerminateEventRuleBuilder()', () => {
  it('has correct defaults', () => {
    expect(new AutoscalingLaunchTerminateEventRuleBuilder()).toMatchSnapshot();
  });
});
