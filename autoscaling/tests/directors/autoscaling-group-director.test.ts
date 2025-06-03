import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { stub } from '../../../test/stubs';
import AutoscalingGroupDirector from '../../directors/autoscaling-group-director';
import { AllSpotEc2AutoscalingGroupBuilder } from '../../autoscaling-group-builders/all-spot-ec2';
import { InstanceType } from 'aws-cdk-lib/aws-ec2';

describe('new AutoscalingGroupDirector()', () => {
  let instance: AutoscalingGroupDirector;
  let stack: cdk.Stack;

  beforeEach(() => {
    instance = new AutoscalingGroupDirector(AllSpotEc2AutoscalingGroupBuilder);
    stack = new cdk.Stack();
  });

  test('construct SecurityGroups', () => {
    instance.vpc = stub(stack, 'ec2.Vpc');
    instance.launchTemplate = stub(stack, 'ec2.LaunchTemplate');
    instance.instanceTypes = [new InstanceType('t2.micro')];
    instance.constructAutoscalingGroup(stack, 'AutoScalingGroup', 'test-asg');

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
