import { RoleProduct } from '../../products/role';

describe('new RoleProduct()', () => {
  let instance: RoleProduct;

  beforeEach(() => {
    instance = new RoleProduct();
  });

  test('has correct defaults', () => {
    expect(instance).toMatchSnapshot();
  });
});
