import PetVpcBuilder from '../pet';

describe('new PetVpcBuilder()', () => {
  let instance: PetVpcBuilder;

  beforeEach(() => {
    instance = new PetVpcBuilder();
  });

  test('Matches snapshot', () => {
    instance
      .setAzs()
      .setCidr('Vpc')
      .setNatProvider()
      .setNatSubnets()
      .setSubnetConfiguration('Vpc');

    expect(instance.getResult()).toMatchSnapshot();
  });
});
