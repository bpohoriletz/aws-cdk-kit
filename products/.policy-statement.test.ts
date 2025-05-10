import { PolicyStatementProduct } from './policy-statement';

describe('new PolicyStatementProduct()', () => {
  let instance: PolicyStatementProduct;

  beforeEach(() => {
    instance = new PolicyStatementProduct();
  });

  test('has correct defaults', () => {
    expect(instance).toMatchSnapshot();
  });
});
