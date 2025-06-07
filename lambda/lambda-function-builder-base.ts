/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
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

  setRole(role?: iam.IRole | undefined): ILambdaFunctionBuilder {
    role && (this.props.role = role);

    return this;
  }

  setRuntime(): ILambdaFunctionBuilder {
    return this;
  }

  setTimeout(timeout?: cdk.Duration | undefined): ILambdaFunctionBuilder {
    timeout && (this.props.timeout = timeout);

    return this;
  }

  getResult(): lambda.FunctionProps {
    return this.props;
  }
}
