import { Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import RoleBuilderBase from '../role-builder-base';
import { IRoleBuilder } from '../../iam/products/role';
import PolicyStatementDirector from '../../iam/directors/policy-statement';
import S3PolicyStatementBuilder from '../../iam/policy-statement-builders/s3';
import CodedeployPolicyStatementBuilder from '../policy-statement-builders/codedeploy';

export default class GithubActionsRoleBuilder extends RoleBuilderBase implements IRoleBuilder {
  constructor(stack: Stack, githubAccountName: string) {
    super(stack);
    this.setProps(githubAccountName);
    this.role = new iam.Role(this.stack, 'GithubActionsRole', this.roleProps);
  }

  setInlinePolicies(_resources: string[] = []): this {
    new iam.Policy(this.stack, 'accessCodeDeployBucket', {
      statements: [
        new PolicyStatementDirector(S3PolicyStatementBuilder).constructPolicyStatement([
          'arn:aws:s3:::codedeploy-*',
          'arn:aws:s3:::codedeploy-*/*',
        ]),
      ],
    }).attachToRole(this.role);
    new iam.Policy(this.stack, 'codeDeploy', {
      statements: [new PolicyStatementDirector(CodedeployPolicyStatementBuilder).constructPolicyStatement()],
    }).attachToRole(this.role);

    return this;
  }

  setManagedPolicies(): this {
    this.role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSElasticBeanstalkWebTier'));
    this.role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('SecretsManagerReadWrite'));
    this.role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy')
    );

    return this;
  }

  private setProps(githubAccountName: string): void {
    this.roleProps.assumedBy = new iam.FederatedPrincipal(
      `arn:aws:iam::${this.stack.account}:oidc-provider/token.actions.githubusercontent.com`,
      {
        StringEquals: {
          'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
        },
        StringLike: {
          'token.actions.githubusercontent.com:sub': `repo:${githubAccountName}/*`,
        },
      },
      'sts:AssumeRoleWithWebIdentity'
    );
    this.roleProps.description = 'Role for GitHub Actions to access AWS resources';
  }
}
