import { Stack } from 'aws-cdk-lib';
import AsgDeploymentGroupBuilder from '../ec2-deployment-group-builder';
import { stub } from '../../../test/stubs';

describe('new AsgDeploymentGroupBuilder', () => {
  let instance: AsgDeploymentGroupBuilder;
  let stack: Stack;

  beforeEach(() => {
    instance = new AsgDeploymentGroupBuilder();
    stack = new Stack();
  });

  test('sets application', () => {
    const props = instance.setApplication(stub(stack, 'any')).getResult();

    expect(props.application?.node.id).toEqual('Stub-any');
  });

  test('sets deploymentConfig', () => {
    const props = instance.setDeploymentConfig().getResult();

    expect(props.deploymentConfig!.deploymentConfigName).toEqual('CodeDeployDefault.AllAtOnce');
  });
});
