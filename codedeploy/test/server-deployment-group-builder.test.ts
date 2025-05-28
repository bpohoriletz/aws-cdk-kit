import { Stack } from 'aws-cdk-lib';
import ServerDeploymentGroupBuilder from '../server-deployment-group-builder';
import { stub } from '../../test/stubs';

describe('new ServerDeploymentGroupBuilder', () => {
  let instance: ServerDeploymentGroupBuilder;
  let stack: Stack;

  beforeAll(() => {
    instance = new ServerDeploymentGroupBuilder();
    stack = new Stack();
  });

  test('sets defaults', () => {
    const props = instance
      .setApplication(stub(stack, 'any'))
      .setDeploymentConfig()
      .setName('test-dg')
      .setRole()
      .setInstallAgent()
      .getResult();

    expect(props.application?.node.id).toEqual('Stub-any');
  });
});
