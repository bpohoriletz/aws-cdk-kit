import { Role, RoleProps, ServicePrincipal, ManagedPolicy, Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Stack } from 'aws-cdk-lib';
import PolicyStatementDirector from '../directors/policy-statement';
import S3PolicyStatementBuilder from '../iam/policy-statement-builders/s3';
import * as con from '../utils/naming';

export function createEc2Role(resourceNamePrefix: string[], bucketArns: string[], stack: Stack): Role {
  const roleProps: RoleProps = {
    assumedBy: new ServicePrincipal('ec2.amazonaws.com'),
    managedPolicies: [
      ManagedPolicy.fromManagedPolicyArn(stack, stack.stackId, 'arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore'),
    ],
  };
  const ec2Role = new Role(stack, con.iamInstanceRoleName(resourceNamePrefix), roleProps);
  const resources = bucketArns.flatMap((arn) => [arn, `${arn}/resources/*`]);
  const allowEc2UploadLogsToEbRegionalBucket: Policy = new Policy(stack, 'allowEc2UploadLogsToEbRegionalBucket', {
    statements: [new PolicyStatementDirector(S3PolicyStatementBuilder).constructS3ReadWritePolicyStatement(resources)],
  });

  allowEc2UploadLogsToEbRegionalBucket.attachToRole(ec2Role);

  const allowEc2PutStatistics: Policy = new Policy(stack, 'allowEc2PutStatistics', {
    statements: [
      new PolicyStatement({
        actions: ['elasticbeanstalk:PutInstanceStatistics'],
        resources: ['*'],
      }),
    ],
  });
  allowEc2PutStatistics.attachToRole(ec2Role);

  const allowEc2UploadLogs: Policy = new Policy(stack, 'allowEc2UploadLogs', {
    statements: [
      new PolicyStatement({
        actions: ['logs:CreateLogStream', 'logs:PutLogEvents'],
        resources: ['*'],
      }),
    ],
  });
  allowEc2UploadLogs.attachToRole(ec2Role);

  return ec2Role;
}
