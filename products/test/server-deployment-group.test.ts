import { ServerDeploymentGroupProduct } from '../server-deployment-group';

describe('new ServerDeploymentGroupProduct', () => {
  let instance: ServerDeploymentGroupProduct;

  beforeEach(() => {
    instance = new ServerDeploymentGroupProduct();
  });

  test('has defaults set', () => {
    expect(instance).toMatchSnapshot();
  });

  test('can set deploymentGroupName', () => {
    instance.deploymentGroupName = 'test';
    expect(instance.deploymentGroupName).toBe('test');
  });
});
