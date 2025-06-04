import * as lambda from 'aws-cdk-lib/aws-lambda';
import LambdaFunctionBuilder from '../lambda-function-builder-base';
import { ILambdaFunctionBuilder } from '../products/lambda-function-product';

export default class GoLambdaFunctionBuilder extends LambdaFunctionBuilder {
  setRuntime(): ILambdaFunctionBuilder {
    this.props.runtime = lambda.Runtime.PROVIDED_AL2023;

    return this;
  }

  setHandler(handler: string | undefined): ILambdaFunctionBuilder {
    this.props.handler = handler || 'main';

    return this;
  }
}
