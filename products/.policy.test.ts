import { PolicyProduct } from './policy';

describe('new PolicyProduct()', () => {
  let instance: PolicyProduct;

  beforeEach(() => {
    instance = new PolicyProduct();
  });

  test('has correct defaults', () => {
    expect(instance).toMatchSnapshot();
  });
});
