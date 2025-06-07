import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { ILambdaFunctionBuilder, ILambdaFunctionBuilderConstructor } from '../products/lambda-function-product';

export default class LambdaFunctionDirector {
  handler: string;
  private builder: ILambdaFunctionBuilder;

  constructor(builder: ILambdaFunctionBuilderConstructor) {
    this.builder = new builder();
  }

  constructSampleGoLambdaFunction(scope: Construct, id: string): lambda.Function {
    this.builder
      .setRuntime()
      .setHandler(this.handler)
      .setCode(lambda.Code.fromAsset(path.join(__dirname, '../go/sample/function.zip')));

    return new lambda.Function(scope, id, this.builder.getResult());
  }

  constructHaproxyDynamicBackendGoLambdaFunction(scope: Construct, id: string): lambda.Function {
    this.builder
      .setRuntime()
      .setHandler(this.handler)
      .setCode(lambda.Code.fromAsset(path.join(__dirname, '../go/haproxy/addremovebackend/function.zip')));

    return new lambda.Function(scope, id, this.builder.getResult());
  }
}
