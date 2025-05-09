import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { stub } from '../test/stubs';

import * as func from './queue';

describe('SQS .createOrdersQueue()', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test('matches snapshot', () => {
    func.createOrdersQueue(['pre', 'fix'], stub(stack, 'sns.Topic'), stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
