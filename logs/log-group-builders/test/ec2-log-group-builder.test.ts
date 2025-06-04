import Ec2LogGroupBuilder from '../ec2-log-group-builder';

describe('new Ec2LogGroupBuilder()', () => {
  it('has correct defaults', () => {
    expect(new Ec2LogGroupBuilder()).toMatchSnapshot();
  });
});
