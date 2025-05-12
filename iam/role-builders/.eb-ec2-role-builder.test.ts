import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import EbEc2RoleBuilder from './eb-ec2-role-builder';

describe('new EbEc2RoleBuilder()', () => {
  let instance: EbEc2RoleBuilder;
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
    instance = new EbEc2RoleBuilder(stack, 'EbEc2Role');
  });

  test('construct EC2 role for ElasticBeanstalk', () => {
    instance.setManagedPolicies().setInlinePolicies(['*']);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
