import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import * as func from './group';

describe('IAM .createAdminsGroup()', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test('matches snapshot', () => {
    func.createAdminsGroup(stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});

describe('IAM .createDevelopersGroup()', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test('matches snapshot', () => {
    func.createDevelopersGroup(stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
