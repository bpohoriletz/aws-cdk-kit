import ElasticBPolicyStatementBuilder from '../elasticb';

describe('new ElasticBPolicyStatementBuilder', () => {
  let instance: ElasticBPolicyStatementBuilder;

  beforeEach(() => {
    instance = new ElasticBPolicyStatementBuilder();
  });

  test('has correct defaults set', () => {
    expect(instance).toMatchSnapshot();
  });

  test('.setPermissions allows sending EC2 stats', () => {
    instance.setPermissions();

    expect(instance).toMatchSnapshot();
  });

  test('.addResource adds resource', () => {
    instance.addResource('*');

    expect(instance).toMatchSnapshot();
  });
});
