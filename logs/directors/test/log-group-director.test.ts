import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import LogGroupDirector from '../log-group-director';
import Ec2LogGroupBuilder from '../../log-group-builders/ec2-log-group-builder';

describe('new LogGroupDirector()', () => {
  let instance: LogGroupDirector;
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  it('constructs role for EC2 lifecycle events', () => {
    instance = new LogGroupDirector(Ec2LogGroupBuilder);
    instance.constructEvenlLogGroup(stack, '/aws/ec2/events');

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
