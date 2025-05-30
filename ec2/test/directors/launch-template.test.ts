import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import LaunchTemplateDirector from '../../directors/launch-template';
import Al2023PublicBuilder from '../../launch-template-builders/al2023-public-builder';

describe('new LaunchTemplateDirector()', () => {
  let instance: LaunchTemplateDirector;
  let stack: cdk.Stack;

  beforeEach(() => {
    instance = new LaunchTemplateDirector(Al2023PublicBuilder);
    stack = new cdk.Stack();
  });

  describe('#constructEc2Group', () => {
    beforeEach(() => {});

    it('uses defaults if only name is passed', () => {
      instance.constructPublicEc2LaunchTemplate(stack, 'Ec2LaunchTemplate');

      expect(Template.fromStack(stack).toJSON().Resources).toMatchSnapshot();
    });
  });
});
