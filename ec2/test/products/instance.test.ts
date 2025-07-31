import { InstanceProduct } from '../../products/instance';

describe('new InstanceProduct', () => {
  let instance: InstanceProduct;

  beforeEach(() => {
    instance = new InstanceProduct();
  });

  test('has default properties set', () => {
    expect(instance).toMatchSnapshot();
  });
});
