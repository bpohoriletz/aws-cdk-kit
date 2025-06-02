import AutoscalingGroupProduct from '../../products/autoscaling-group';

describe('new AutoscalingGroupProduct()', () => {
  let instance: AutoscalingGroupProduct;
  beforeEach(() => {
    instance = new AutoscalingGroupProduct();
  });

  it('matches snapshot', () => {
    expect(instance).toMatchSnapshot();
  });
});
