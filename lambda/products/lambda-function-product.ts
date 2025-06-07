import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class LambdaFunctionProduct implements lambda.FunctionProps {
  code: lambda.Code;
  handler: string;
  role?: iam.IRole | undefined;
  runtime: lambda.Runtime;
  timeout?: cdk.Duration | undefined;
}

//interface ILambdaFunctionProduct extends lambda.FunctionProps {}

export interface ILambdaFunctionBuilder {
  setRuntime(runtime?: lambda.Runtime): ILambdaFunctionBuilder;
  setCode(code: lambda.Code): ILambdaFunctionBuilder;
  setHandler(handler: string): ILambdaFunctionBuilder;
  setRole(role?: iam.IRole | undefined): ILambdaFunctionBuilder;
  setTimeout(timeout?: cdk.Duration | undefined): ILambdaFunctionBuilder;
  getResult(): lambda.FunctionProps;
}

export interface ILambdaFunctionBuilderConstructor {
  new (): ILambdaFunctionBuilder;
}
