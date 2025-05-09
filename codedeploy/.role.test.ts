import * as cdk from 'aws-cdk-lib';
import { Template, Capture, Match } from 'aws-cdk-lib/assertions';

import * as func from './role';

describe('CodeDeploy .createCodedeployRole()', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test('matches snapshot', () => {
    func.createCodedeployRole(['pre', 'fix'], 'arn::role', stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });

  test('grants bucket access', () => {
    const resourceCapture = new Capture();
    const actionCapture = new Capture();
    func.createCodedeployRole(['pre', 'fix'], 'arn::', stack);

    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Policy', {
      PolicyDocument: {
        Statement: [
          Match.objectLike({
            Action: actionCapture,
            Resource: resourceCapture,
          }),
        ],
      },
    });
    expect(resourceCapture.asArray()).toEqual(['arn::', 'arn::/resources/*']);
    expect(actionCapture.asArray()).toEqual([
      's3:PutObject',
      's3:ListBucket',
      's3:ListBucketVersions',
      's3:GetObject',
      's3:GetObjectVersion',
    ]);
  });
});
