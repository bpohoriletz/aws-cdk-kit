import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import PolicyStatementDirector from '../directors/policy-statement';
import S3PolicyStatementBuilder from './policy-statement-builders/s3';
import CodedeployPolicyStatementBuilder from './policy-statement-builders/codedeploy';

export function createGithubCliRole(githubAccount: string, stack: cdk.Stack): iam.Role {
  const name = 'GitHubActionsRole';
  new iam.OpenIdConnectProvider(stack, 'GitHubOIDCProvider', {
    url: 'https://token.actions.githubusercontent.com',
    clientIds: ['sts.amazonaws.com'],
    thumbprints: ['6938fd4d98bab03faadb97b34396831e3780aea1'], // GitHub's current root CA thumbprint
  });
  const cliRole = new iam.Role(stack, name, {
    assumedBy: new iam.FederatedPrincipal(
      `arn:aws:iam::${stack.account}:oidc-provider/token.actions.githubusercontent.com`,
      {
        StringEquals: {
          'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
        },
        StringLike: {
          'token.actions.githubusercontent.com:sub': `repo:${githubAccount}/*`,
        },
      },
      'sts:AssumeRoleWithWebIdentity'
    ),
    roleName: name,
    description: 'Role for GitHub Actions to access AWS resources',
  });
  cliRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSElasticBeanstalkWebTier'));
  cliRole.addManagedPolicy(
    iam.ManagedPolicy.fromAwsManagedPolicyName('AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy')
  );
  cliRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('SecretsManagerReadWrite'));
  const resources = ['arn:aws:s3:::codedeploy-*', 'arn:aws:s3:::codedeploy-*/*'];
  new iam.Policy(stack, 'accessCodeDeployBucket', {
    statements: [new PolicyStatementDirector(S3PolicyStatementBuilder).constructS3ReadWritePolicyStatement(resources)],
  }).attachToRole(cliRole);
  new iam.Policy(stack, 'codeDeploy', {
    statements: [new PolicyStatementDirector(CodedeployPolicyStatementBuilder).constructFullAccess()],
  }).attachToRole(cliRole);

  new cdk.CfnOutput(stack, 'GitHub Actions Role ARN', {
    value: cliRole.roleArn,
    description: 'The ARN of the IAM Role that should be assumed in GitHub',
  });

  return cliRole;
}
