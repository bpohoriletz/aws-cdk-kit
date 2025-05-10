import CodedeployBPolicyStatementBuilder from './codedeploy';

describe('new CodedeployBPolicyStatementBuilder', () => {
  let instance: CodedeployBPolicyStatementBuilder;

  beforeEach(() => {
    instance = new CodedeployBPolicyStatementBuilder();
  });

  test('has correct defaults set', () => {
    expect(instance).toMatchSnapshot();
  });

  test('.setFullAccess allows full access to CodeDeploy', () => {
    instance.setFullAccess();

    expect(instance).toMatchSnapshot();
  });

  test('.addResource adds resource', () => {
    instance.addResource('*');

    expect(instance).toMatchSnapshot();
  });
});
