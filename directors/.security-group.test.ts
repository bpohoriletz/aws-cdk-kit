import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { stub } from '../test/stubs';
import SecurityGroupDirector from './security-group';
import SecurityGroupBuilder from '../ec2/security-group-builder';

describe('new SecurityGroupDirector()', () => {
  let instance: SecurityGroupDirector;
  let stack: cdk.Stack;

  beforeEach(() => {
    instance = new SecurityGroupDirector(SecurityGroupBuilder);
    stack = new cdk.Stack();
  });

  test('construct SecurityGroups', () => {
    instance.constructSecurityGroup(stack, 'SecurityGroup', stub(stack, 'ec2.Vpc'));

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });

  test('construct SecurityGroup with web access', () => {
    instance.constructWebSecurityGroup(stack, 'WebSG', stub(stack, 'ec2.Vpc'));

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
