import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { stub } from '../test/stubs';

import * as func from './app';

describe('ElasticBeanstalk .createApplication()', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test('matches snapshot', () => {
    func.createApplication(['pre', 'fix'], stub(stack, 'ec2.Role'), stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
