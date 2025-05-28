import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import * as func from '../bucket';

describe('S3 .createPrivateBucket()', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test('matches snapshot', () => {
    func.createPrivateBucket(['pre', 'fix'], stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});

describe('S3 .createEbBucket()', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test('matches snapshot', () => {
    func.createEbBucket('prefix', stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
