import { Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { IRoleBuilder } from '../products/role';
import RoleBuilderBase from '../role-builder-base';
import PolicyStatementDirector from '../directors/policy-statement';
import S3PolicyStatementBuilder from '../../iam/policy-statement-builders/s3';
import LogsPolicyStatementBuilder from '../../iam/policy-statement-builders/logs';
import ElasticBPolicyStatementBuilder from '../../iam/policy-statement-builders/elasticb';

export default class EbEc2RoleBuilder extends RoleBuilderBase implements IRoleBuilder {
  constructor(stack: Stack, roleId: string) {
    super(stack);
    this.setProps();
    this.role = new iam.Role(this.stack, roleId, this.roleProps);
  }

  setInlinePolicies(resources: string[]): this {
    const s3Resources = resources.flatMap((arn) => [arn, `${arn}/resources/*`]);
    new iam.Policy(this.stack, 'allowEc2UploadLogsToEbRegionalBucket', {
      statements: [new PolicyStatementDirector(S3PolicyStatementBuilder).constructPolicyStatement(s3Resources)],
    }).attachToRole(this.role);

    new iam.Policy(this.stack, 'allowEc2PutStatistics', {
      statements: [new PolicyStatementDirector(ElasticBPolicyStatementBuilder).constructPolicyStatement()],
    }).attachToRole(this.role);

    new iam.Policy(this.stack, 'allowEc2UploadLogs', {
      statements: [new PolicyStatementDirector(LogsPolicyStatementBuilder).constructPolicyStatement()],
    }).attachToRole(this.role);

    return this;
  }

  setManagedPolicies(): this {
    this.role.addManagedPolicy(
      iam.ManagedPolicy.fromManagedPolicyArn(
        this.stack,
        this.stack.stackId,
        'arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore'
      )
    );
    return this;
  }

  private setProps(): void {
    this.roleProps.assumedBy = new iam.ServicePrincipal('ec2.amazonaws.com');
  }
}
