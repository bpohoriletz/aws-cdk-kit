import { LambdaFunctionProduct } from '../lambda-function-product';

describe('new LambdaFunctionProduct()', () => {
  it('has correct defaults', () => {
    expect(new LambdaFunctionProduct()).toMatchSnapshot();
  });
});
