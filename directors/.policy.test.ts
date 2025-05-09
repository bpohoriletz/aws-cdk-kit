import PolicyDirector from './policy';
import PolicyBuilder from '../iam/policy-builder';

describe('new PolicyDirector()', () => {
  let instance: PolicyDirector;

  beforeEach(() => {
    instance = new PolicyDirector(PolicyBuilder);
  });

  test('creates empty policy', () => {
    expect(instance).toMatchSnapshot();
  });
});
