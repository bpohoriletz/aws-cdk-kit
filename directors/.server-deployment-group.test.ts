import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import ServerDeploymentGroupDirector from './server-deployment-group';
import ServerDeploymentGroupBuilder from '../codedeploy/server-deployment-group-builder';

describe('new ServerDeploymentGroupDirector()', () => {
  let instance: ServerDeploymentGroupDirector;
  let stack: cdk.Stack;

  beforeEach(() => {
    instance = new ServerDeploymentGroupDirector(ServerDeploymentGroupBuilder);
    stack = new cdk.Stack();
  });

  test('construct empty DeploymentGroup', () => {
    instance.constructEmptyGroup(stack, 'DeploymentGroup', 'dir-test-dg');

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
