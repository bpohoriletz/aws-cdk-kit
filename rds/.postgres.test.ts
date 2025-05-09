import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { stub } from '../test/stubs';

import * as func from './postgres';

describe('RDS .createNonprodDatabase()', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test('matches snapshot', () => {
    func.createNonprodDatabase(['pre', 'fix'], stack, stub(stack, 'ec2.Vpc'));

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});

describe('RDS .createProdRdsDatabase()', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test('matches snapshot', () => {
    func.createProdRdsDatabase(['pre', 'fix'], stack, stub(stack, 'ec2.Vpc'));

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});

describe('RDS .createRdsDatabase()', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test('matches snapshot', () => {
    func.createRdsDatabase(['pre', 'fix'], stack, stub(stack, 'ec2.Vpc'));

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
