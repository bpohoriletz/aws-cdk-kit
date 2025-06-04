import * as lambda from 'aws-cdk-lib/aws-lambda';

export class LambdaFunctionProduct implements lambda.FunctionProps {
  runtime: lambda.Runtime;
  code: lambda.Code;
  handler: string;
}

//interface ILambdaFunctionProduct extends lambda.FunctionProps {}

export interface ILambdaFunctionBuilder {
  setRuntime(runtime: lambda.Runtime): ILambdaFunctionBuilder;
  setCode(code: lambda.Code): ILambdaFunctionBuilder;
  setHandler(handler: string): ILambdaFunctionBuilder;
  getResult(): lambda.FunctionProps;
}

export interface ILambdaFunctionBuilderConstructor {
  new (): ILambdaFunctionBuilder;
}
