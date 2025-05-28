import { SecurityGroupProduct } from '../security-group';

describe('new SecurityGroupProduct()', () => {
  let instance: SecurityGroupProduct;

  beforeEach(() => {
    instance = new SecurityGroupProduct();
  });

  test('has correct defaults', () => {
    expect(instance).toMatchSnapshot();
  });
});
