import { Ec2InstanceProduct } from '../../products/instance';

describe('new Ec2InstanceProduct', () => {
  let instance: Ec2InstanceProduct;

  beforeEach(() => {
    instance = new Ec2InstanceProduct();
  });

  test('has default properties set', () => {
    expect(instance).toMatchSnapshot();
  });
});
