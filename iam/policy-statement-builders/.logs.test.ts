import LogsPolicyStatementBuilder from './logs';

describe('new LogsPolicyStatementBuilder', () => {
  let instance: LogsPolicyStatementBuilder;

  beforeEach(() => {
    instance = new LogsPolicyStatementBuilder();
  });

  test('has correct defaults set', () => {
    expect(instance).toMatchSnapshot();
  });

  test('.setUpload allows upload logs', () => {
    instance.setUpload();

    expect(instance).toMatchSnapshot();
  });

  test('.addResource adds resource', () => {
    instance.addResource('*');

    expect(instance).toMatchSnapshot();
  });
});
