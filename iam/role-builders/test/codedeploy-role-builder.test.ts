import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import CodedeployRoleBuilder from '../codedeploy-role-builder';

describe('new CodedeployRoleBuilder()', () => {
  let instance: CodedeployRoleBuilder;
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
    instance = new CodedeployRoleBuilder(stack, 'CodeDeployRole');
  });

  test('construct role for CodeDeploy', () => {
    instance.setManagedPolicies().setInlinePolicies(['*']);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
