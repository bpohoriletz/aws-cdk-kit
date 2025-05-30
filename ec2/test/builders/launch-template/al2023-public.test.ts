import Al2023PublicBuilder from '../../../launch-template-builders/al2023-public-builder';

describe('new Al2023PublicBuilder()', () => {
  let instance: Al2023PublicBuilder;

  beforeEach(() => {
    instance = new Al2023PublicBuilder();
  });

  it('matches default', () => {
    instance.setPublic!().setUserData!().setMachineImage!();

    expect(instance.getResult()).toMatchSnapshot();
  });

  describe('#setName() ', () => {
    it('customizes name of LaunchTemplate', () => {
      instance.setName('LaunchTempalte');

      expect(instance.getResult()).toMatchSnapshot();
    });
  });
});
