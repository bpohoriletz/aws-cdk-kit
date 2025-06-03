import { AllSpotEc2AutoscalingGroupBuilder } from '../../autoscaling-group-builders/all-spot-ec2';

describe('new AllSpotEc2AutoscalingGroupBuilder()', () => {
  let instance: AllSpotEc2AutoscalingGroupBuilder;

  beforeEach(() => {
    instance = new AllSpotEc2AutoscalingGroupBuilder();
  });

  it('has correct defaults', () => {
    expect(instance).toMatchSnapshot();
  });
});
