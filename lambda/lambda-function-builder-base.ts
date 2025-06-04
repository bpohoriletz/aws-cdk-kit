/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { LambdaFunctionProduct, ILambdaFunctionBuilder } from './products/lambda-function-product';

export default abstract class LambdaFunctionBuilder implements ILambdaFunctionBuilder {
  protected props: LambdaFunctionProduct;

  constructor() {
    this.props = new LambdaFunctionProduct();
  }

  setCode(code: lambda.Code): ILambdaFunctionBuilder {
    this.props.code = code;

    return this;
  }

  setHandler(handler: string): ILambdaFunctionBuilder {
    this.props.handler = handler;

    return this;
  }

  setRuntime(): ILambdaFunctionBuilder {
    return this;
  }

  getResult(): lambda.FunctionProps {
    return this.props;
  }
}
