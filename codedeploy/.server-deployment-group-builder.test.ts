import ServerDeploymentGroupBuilder from './server-deployment-group-builder';

describe('new ServerDeploymentGroupBuilder', () => {
  let instance: ServerDeploymentGroupBuilder;

  beforeAll(() => {
    instance = new ServerDeploymentGroupBuilder();
  });

  test('sets defaults', () => {
    const props = instance
      .setApplication()
      .setDeploymentConfig()
      .setName('test-dg')
      .setRole()
      .setInstallAgent()
      .getResult();

    expect(props).toMatchSnapshot();
  });
});
