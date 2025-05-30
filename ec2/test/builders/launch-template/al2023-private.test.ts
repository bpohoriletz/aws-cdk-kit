import Al2023PrivateBuilder from '../../../launch-template-builders/al2023-private-builder';

describe('new Al2023PrivateBuilder()', () => {
  let instance: Al2023PrivateBuilder;

  beforeEach(() => {
    instance = new Al2023PrivateBuilder();
  });

  it('matches default', () => {
    instance.setPublic!().setUserData!().setMachineImage!();

    expect(instance.getResult()).toMatchSnapshot();
  });

  describe('#setName() ', () => {
    it('customizes name of LaunchTemplate', () => {
      instance.setName('LaunchTempaltePrivate');

      expect(instance.getResult()).toMatchSnapshot();
    });
  });
});
