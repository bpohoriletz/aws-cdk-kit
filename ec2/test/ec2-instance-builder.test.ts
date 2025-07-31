import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import Ec2InstanceBuilder from '../ec2-instance-builder-base';
import { stub } from '../../test/stubs';

describe('new Ec2InstanceBuilder()', () => {
  let instance: Ec2InstanceBuilder;
  let stack: cdk.Stack;

  beforeEach(() => {
    instance = new Ec2InstanceBuilder();
    stack = new cdk.Stack();
  });

  test('Matches snapshot', () => {
    instance
      .setVpc(stub(stack, 'ec2.Vpc'))
      .setAssociatePublicAddress(true)
      .setUserData(stub(stack, 'ec2.UserData'))
      .setVpcSubnets({ subnetType: ec2.SubnetType.PUBLIC })
      .setInstanceName('InstanceName')
      .setSecurityGroup(stub(stack, 'ec2.SecurityGroup'))
      .setInstanceProfile(stub(stack, 'ec2.InstanceProfile'))
      .setMachineImage(
        new ec2.GenericLinuxImage({
          'us-east-1': 'ami-05ffe3c48a9991133',
        })
      )
      .setInstanceType(new ec2.InstanceType('t2.micro'))
      .getResult();

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
