import { Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { IRoleBuilder } from '../products/role';
import RoleBuilderBase from '../role-builder-base';
import PolicyStatementDirector from '../directors/policy-statement';
import S3PolicyStatementBuilder from '../../iam/policy-statement-builders/s3';

export default class CodedeployRoleBuilder extends RoleBuilderBase implements IRoleBuilder {
  constructor(stack: Stack, roleId: string) {
    super(stack);
    this.setProps(roleId);
    this.role = new iam.Role(this.stack, roleId, this.roleProps);
  }

  setInlinePolicies(resources: string[]): this {
    const s3Resources = resources.flatMap((arn) => [arn, `${arn}/resources/*`]);
    new iam.Policy(this.stack, 'allowEc2UploadLogsToCodedeployRegionalBucket', {
      statements: [new PolicyStatementDirector(S3PolicyStatementBuilder).constructPolicyStatement(s3Resources)],
    }).attachToRole(this.role);

    return this;
  }

  setManagedPolicies(): this {
    this.role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSCodeDeployRole'));

    return this;
  }

  private setProps(name: string): void {
    this.roleProps.assumedBy =new iam.ServicePrincipal('codedeploy.amazonaws.com');
    this.roleProps.roleName = name;
  }
}
