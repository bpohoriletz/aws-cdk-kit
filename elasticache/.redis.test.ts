import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { stub } from '../test/stubs';

import * as func from './redis';

describe('Elasticache .createRedisInstance()', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test('matches snapshot', () => {
    func.createRedisInstance(['pre', 'fix'], stub(stack, 'ec2.Vpc'), stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
