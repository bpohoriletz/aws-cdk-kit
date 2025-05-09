import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import * as func from './secret';

describe('SecretsManager .createSecret()', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test('matches snapshot', () => {
    func.createSecret(['pre', 'fix'], stack, 'details');

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});

describe('SecretsManager .createProdSecret()', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test('matches snapshot', () => {
    func.createProdSecret(['pre', 'fix'], stack, 'details');

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
