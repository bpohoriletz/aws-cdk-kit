import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { stub } from '../../test/stubs';

import * as func from '../env';

describe('ElasticBeanstalk .createEnvironment()', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test('matches snapshot', async () => {
    await func.createEnvironment(
      stub(stack, 'eb.CfnApplication'),
      ['pre', 'fix'],
      stub(stack, 'iam.InstanceProfile'),
      stub(stack, 'ec2.Vpc'),
      stack,
      'any'
    );

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
