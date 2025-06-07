import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import LambdaFunctionDirector from '../lambda-function-director';
import GoLambdaFunctionBuilder from '../../lambda-function-builders/go-lambda-function-builder';

describe('new LambdaFunctionDirector()', () => {
  let instance: LambdaFunctionDirector;
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  describe('constructSampleGoLambdaFunction ', () => {
    it('constructs sample Lambda function in Go', () => {
      instance = new LambdaFunctionDirector(GoLambdaFunctionBuilder);
      instance.constructSampleGoLambdaFunction(stack, '/go/main');

      expect(Template.fromStack(stack)).toMatchSnapshot();
    });
  });

  describe('constructHaproxyDynamicBackendGoLambdaFunction ', () => {
    it('constructs Lambda function that updates Haprohy backends via API in Go', () => {
      instance = new LambdaFunctionDirector(GoLambdaFunctionBuilder);
      instance.constructHaproxyDynamicBackendGoLambdaFunction(stack, 'HaproxyFunction');

      expect(Template.fromStack(stack)).toMatchSnapshot();
    });
  });
});
