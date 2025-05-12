import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import GithubActionRoleBuilder from './github-actions-role-builder';

describe('new GithubActionRoleBuilder()', () => {
  let instance: GithubActionRoleBuilder;
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
    instance = new GithubActionRoleBuilder(stack, 'GithubActionsRole');
  });

  test('construct role for GithubActions to use', () => {
    instance.setManagedPolicies().setInlinePolicies(['*']);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
