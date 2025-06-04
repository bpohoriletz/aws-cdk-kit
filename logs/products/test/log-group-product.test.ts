import { LogGroupProduct } from '../log-group-product';

describe('new LogGroupProduct', () => {
  it('has correct defaults', () => {
    expect(new LogGroupProduct()).toMatchSnapshot();
  });
});
