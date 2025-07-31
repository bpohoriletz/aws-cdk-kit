import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import Ec2InstanceDirector from '../../directors/ec2-instance';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { stub } from '../../../test/stubs';

describe('Ec2InstanceDirector', () => {
  let instance: Ec2InstanceDirector;
  let stack: cdk.Stack;

  beforeEach(() => {
    instance = new Ec2InstanceDirector();
    stack = new cdk.Stack();
  });

  describe('.constructPublicEc2', () => {
    test('provisions public EC2', () => {
      instance.vpc = stub(stack, 'ec2.Vpc');
      instance.machineImage = new ec2.GenericLinuxImage({ 'us-east-1': 'ami-05ffe3c48a9991133' });
      instance.constructPublicEc2(stack, 'PublicEc2', 'PublicEc2', new ec2.InstanceType('t2.micro'));

      expect(Template.fromStack(stack)).toMatchSnapshot();
    });
  });
});
