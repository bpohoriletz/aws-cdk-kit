import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import * as func from '../user';

describe('create user for CodeDeploy deployments with GitHub()', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test('matches snapshot', () => {
    func.createGithubCdUser(stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
