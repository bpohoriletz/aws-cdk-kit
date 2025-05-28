import PolicyStatementBuilder from '../policy-statement-builder';

describe('new PolicyStatementBuilder()', () => {
  let instance: PolicyStatementBuilder;

  beforeEach(() => {
    instance = new PolicyStatementBuilder();
  });

  test('has defaults set', () => {
    expect(instance).toMatchSnapshot();
  });
});
