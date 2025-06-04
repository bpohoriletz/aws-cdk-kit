import GoLambdaFunctionBuilder from '../go-lambda-function-builder';

describe('new GoLambdaFunctionBuilder', () => {
  it('has correct defaults', () => {
    expect(new GoLambdaFunctionBuilder()).toMatchSnapshot();
  });
});
