import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { stub } from '../stubs';

import * as func from '../../codedeploy/deployment-group';

describe('CodeDeploy .createDeploymentGroupToAsg()', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test('matches snapshot', () => {
    func.createDeploymentGroupToAsg(
      ['pre', 'fix'],
      [stub(stack, 'any')],
      stub(stack, 'cd.ServerApplication'),
      stub(stack, 'iam.InstanceProfile'),
      stub(stack, 'iam.Role'),
      stub(stack, 'ec2.Vpc'),
      stack
    );

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
