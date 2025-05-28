import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import VpcDirector from '../vpc';

describe('VpcDirector', () => {
  const described_class = VpcDirector;
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  describe('.constructPetProjectVpc', () => {
    test('builds minimal VPC', () => {
      described_class.constructPetProjectVpc(stack, 'Vpc');

      expect(Template.fromStack(stack)).toMatchSnapshot();
    });
  });

  describe('.constructProductionVpc', () => {
    test('builds production-grade VPC', () => {
      described_class.constructProductionVpc(stack, 'Vpc');

      expect(Template.fromStack(stack)).toMatchSnapshot();
    });
  });
});
