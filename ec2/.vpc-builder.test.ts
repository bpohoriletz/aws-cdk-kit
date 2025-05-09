import VpcBuilder from './vpc-builder';

describe('new VpcBuilder()', () => {
  let instance: VpcBuilder;

  beforeEach(() => {
    instance = new VpcBuilder();
  });

  test('Matches snapshot', () => {
    instance
      .customizeAzs()
      .customizeCidr('Vpc')
      .customizeNatProvider()
      .customizeNatSubnets()
      .customizeSubnetConfiguration('Vpc');

    expect(instance.getResult()).toMatchSnapshot();
  });
});
