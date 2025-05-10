import ElasticBPolicyStatementBuilder from './elasticb';

describe('new ElasticBPolicyStatementBuilder', () => {
  let instance: ElasticBPolicyStatementBuilder;

  beforeEach(() => {
    instance = new ElasticBPolicyStatementBuilder();
  });

  test('has correct defaults set', () => {
    expect(instance).toMatchSnapshot();
  });

  test('.setUploadEC2Stats allows sending EC2 stats', () => {
    instance.setUploadEC2Stats();

    expect(instance).toMatchSnapshot();
  });

  test('.addResource adds resource', () => {
    instance.addResource('*');

    expect(instance).toMatchSnapshot();
  });
});
