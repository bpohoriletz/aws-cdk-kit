import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import * as func from './policy';

describe('IAM .createDeveloperPolicy()', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test('matches snapshot', () => {
    func.createDeveloperPolicy('ec2', ['pre', 'fix'], stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
