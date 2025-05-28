import VpcBuilderBase from '../vpc-builder-base';

describe('new VpcBuilderBase()', () => {
  let instance: VpcBuilderBase;

  beforeEach(() => {
    instance = new VpcBuilderBase();
  });

  test('Matches snapshot', () => {
    instance.setCidr('Vpc').setSubnetConfiguration('Vpc');

    expect(instance.getResult()).toMatchSnapshot();
  });
});
