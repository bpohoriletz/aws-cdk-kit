import { Role, RoleProps, ServicePrincipal, ManagedPolicy, Policy } from 'aws-cdk-lib/aws-iam';
import { Stack } from 'aws-cdk-lib';
import PolicyStatementDirector from '../directors/policy-statement';
import S3PolicyStatementBuilder from '../iam/policy-statement-builders/s3';
import LogsPolicyStatementBuilder from '../iam/policy-statement-builders/logs';
import ElasticBPolicyStatementBuilder from '../iam/policy-statement-builders/elasticb';
import * as con from '../utils/naming';

export function createEc2Role(resourceNamePrefix: string[], bucketArns: string[], stack: Stack): Role {
  const roleProps: RoleProps = {
    assumedBy: new ServicePrincipal('ec2.amazonaws.com'),
  };
  const ec2Role = new Role(stack, con.iamInstanceRoleName(resourceNamePrefix), roleProps);
  ec2Role.addManagedPolicy(
    ManagedPolicy.fromManagedPolicyArn(stack, stack.stackId, 'arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore')
  );

  const resources = bucketArns.flatMap((arn) => [arn, `${arn}/resources/*`]);
  new Policy(stack, 'allowEc2UploadLogsToEbRegionalBucket', {
    statements: [new PolicyStatementDirector(S3PolicyStatementBuilder).constructS3ReadWritePolicyStatement(resources)],
  }).attachToRole(ec2Role);

  new Policy(stack, 'allowEc2PutStatistics', {
    statements: [new PolicyStatementDirector(ElasticBPolicyStatementBuilder).constructEbEC2StatsPolicyStatement()],
  }).attachToRole(ec2Role);

  new Policy(stack, 'allowEc2UploadLogs', {
    statements: [new PolicyStatementDirector(LogsPolicyStatementBuilder).constructLogsUploadPolicyStatement()],
  }).attachToRole(ec2Role);

  return ec2Role;
}
