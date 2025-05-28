import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import ServerDeploymentGroupDirector from '../server-deployment-group';
import Ec2DeploymentGroupBuilder from '../../codedeploy/server-deployment-group-builders/ec2-deployment-group-builder';
import { stub } from '../../test/stubs';

describe('new ServerDeploymentGroupDirector()', () => {
  let instance: ServerDeploymentGroupDirector;
  let stack: cdk.Stack;

  beforeEach(() => {
    instance = new ServerDeploymentGroupDirector(Ec2DeploymentGroupBuilder);
    stack = new cdk.Stack();
  });

  describe('#constructEc2Group', () => {
    it('uses defaults if only name is passed', () => {
      instance.setResources({ name: 'test-cd-dg' }).constructEc2Group(stack, 'DeploymentGroup');

      expect(Template.fromStack(stack).toJSON().Resources).toMatchSnapshot();
    });

    it('can create groups for the same application', () => {
      instance.setResources({ name: 'test-cd-dg', application: stub(stack, 'cd.ServerApplication') });
      instance.constructEc2Group(stack, 'DeploymentGroupStaging');
      instance.constructEc2Group(stack, 'DeploymentGroupDevelop');

      expect(Template.fromStack(stack).toJSON().Resources).toMatchSnapshot();
    });
  });
});
