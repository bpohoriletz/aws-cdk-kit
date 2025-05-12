import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import RoleDirector from '../directors/role';
import GithubActionsRoleBuilder from './role-builders/github-actions-role-builder';

export function createGithubCliRole(githubAccount: string, stack: cdk.Stack): iam.Role {
  new iam.OpenIdConnectProvider(stack, 'GitHubOIDCProvider', {
    url: 'https://token.actions.githubusercontent.com',
    clientIds: ['sts.amazonaws.com'],
    thumbprints: ['6938fd4d98bab03faadb97b34396831e3780aea1'], // GitHub's current root CA thumbprint
  });
  const cliRole = new RoleDirector(GithubActionsRoleBuilder).constructGtihubRole(stack, githubAccount);

  new cdk.CfnOutput(stack, 'GitHub Actions Role ARN', {
    value: cliRole.roleArn,
    description: 'The ARN of the IAM Role that should be assumed in GitHub',
  });

  return cliRole;
}
