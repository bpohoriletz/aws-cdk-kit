import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { arn } from '../../../test/stubs';
import RoleDirector from '../role';
import EbEc2RoleBuilder from '../../role-builders/eb-ec2-role-builder';
import CodedeployRoleBuilder from '../../role-builders/codedeploy-role-builder';
import GithubActionsRoleBuilder from '../../role-builders/github-actions-role-builder';

describe('new RoleDirector()', () => {
  let instance: RoleDirector;
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  it('constructs role for ElasticBeanstalk EC2 instances', () => {
    instance = new RoleDirector(EbEc2RoleBuilder);
    instance.constructEc2Role(stack, 'Ec2Role', arn());

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });

  it('constructs role for CodeDeploy', () => {
    instance = new RoleDirector(CodedeployRoleBuilder);
    instance.constructCodedeployRole(stack, 'CodeDeployRole', arn());

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });

  it('constructs role for GitHub Actions', () => {
    instance = new RoleDirector(GithubActionsRoleBuilder);
    instance.constructGtihubRole(stack, 'github_acc');

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
