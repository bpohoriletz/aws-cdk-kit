import { LaunchTemplateProduct } from '../../products/launch-template';

describe('new LaunchTemplateProduct()', () => {
  let instance: LaunchTemplateProduct;

  beforeEach(() => {
    instance = new LaunchTemplateProduct();
  });

  test('has correct defaults', () => {
    expect(instance).toMatchSnapshot();
  });
});
