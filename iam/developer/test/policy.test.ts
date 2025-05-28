import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import * as func from '../policy';

describe('IAM .ec2Access()', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test('matches snapshot', () => {
    func.ec2Access(['pre', 'fix'], stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
