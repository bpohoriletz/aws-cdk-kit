import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { arn } from '../../test/stubs';
import RoleDirector from '../role';
import EbEc2RoleBuilder from '../../iam/role-builders/eb-ec2-role-builder';

describe('new RoleDirector()', () => {
  let instance: RoleDirector;
  let stack: cdk.Stack;

  beforeEach(() => {
    instance = new RoleDirector(EbEc2RoleBuilder);
    stack = new cdk.Stack();
  });

  test('construct EC2 role for ElasticBeanstalk', () => {
    instance.constructEc2Role(stack, 'Ec2Role', arn());

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
