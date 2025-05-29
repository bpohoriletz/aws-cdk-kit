import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import { Template } from 'aws-cdk-lib/assertions';
import ServerDeploymentGroupDirector from '../server-deployment-group';
import Ec2DeploymentGroupBuilder from '../../codedeploy/server-deployment-group-builders/ec2-deployment-group-builder';
import { stub } from '../../test/stubs';

describe('new ServerDeploymentGroupDirector()', () => {
  let instance: ServerDeploymentGroupDirector;
  let stack: StubStack;

  beforeEach(() => {
    instance = new ServerDeploymentGroupDirector(Ec2DeploymentGroupBuilder);
    stack = new StubStack(new cdk.App(), 'Stack');
  });

  describe('#constructEc2Group', () => {
    it('uses defaults if only name is passed', () => {
      instance.constructEc2Group(stack, 'DeploymentGroup', 'test-cd-dg');

      expect(Template.fromStack(stack).toJSON().Resources).toMatchSnapshot();
    });

    it('can create groups for the same application', () => {
      stack.application = stub(stack, 'cd.ServerApplication');
      instance.constructEc2Group(stack, 'DeploymentGroupStaging', 'test-cd-dg-stag');
      instance.constructEc2Group(stack, 'DeploymentGroupDevelop', 'test-cd-dg-devel');

      expect(Template.fromStack(stack).toJSON().Resources).toMatchSnapshot();
    });
  });
});

class StubStack extends cdk.Stack {
  application?: codedeploy.ServerApplication | undefined;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  }
}
