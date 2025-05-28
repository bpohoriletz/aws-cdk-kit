import LogsPolicyStatementBuilder from '../logs';

describe('new LogsPolicyStatementBuilder', () => {
  let instance: LogsPolicyStatementBuilder;

  beforeEach(() => {
    instance = new LogsPolicyStatementBuilder();
  });

  test('has correct defaults set', () => {
    expect(instance).toMatchSnapshot();
  });

  test('.setPermissions allows upload logs', () => {
    instance.setPermissions();

    expect(instance).toMatchSnapshot();
  });

  test('.addResource adds resource', () => {
    instance.addResource('*');

    expect(instance).toMatchSnapshot();
  });
});
