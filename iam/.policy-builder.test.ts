import PolicyBuilder from './policy-builder';

describe('new PolicyBuilder()', () => {
  let instance: PolicyBuilder;

  beforeEach(() => {
    instance = new PolicyBuilder();
  });

  test('has defaults set', () => {
    expect(instance).toMatchSnapshot();
  });
});
