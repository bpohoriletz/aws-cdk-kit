import PolicyStatementBuilderBase from '../policy-statement-builder-base';

describe('new PolicyStatementBuilderBase()', () => {
  let instance: PolicyStatementBuilderBase;

  beforeEach(() => {
    instance = new PolicyStatementBuilderBase();
  });

  test('has defaults set', () => {
    expect(instance).toMatchSnapshot();
  });
});
