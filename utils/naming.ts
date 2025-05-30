/* eslint-disable @typescript-eslint/no-unused-vars */

export function partsToDashedName(parts: string[]): string {
  return parts
    .filter((item): item is string => !!item)
    .join('-')
    .toLowerCase();
}

export function partsToName(parts: string[]): string {
  return parts
    .filter((item): item is string => !!item)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.substring(1))
    .join('');
}
// Shared
export function subnetGroupName(resourceNamePrefix: string[]): string {
  const name: string[] = resourceNamePrefix.concat('subnet', 'group');

  return partsToName(name);
}
// Autoscaling
export function autoscalingGroupName(resourceNamePrefix: string[]): string {
  const name: string[] = resourceNamePrefix.concat('asg');

  return partsToDashedName(name);
}
export function autoscalingGroupHookName(resourceNamePrefix: string[], event: string): string {
  const name: string[] = resourceNamePrefix.concat('asg', event, 'hook');

  return partsToName(name);
}
// CodeDeploy
export function codedeployDeploymentGroupName(resourceNamePrefix: string[]): string {
  const name: string[] = resourceNamePrefix.concat('dg');

  return partsToDashedName(name);
}
export function codedeployApplicationName(resourceNamePrefix: string[]): string {
  const name: string[] = resourceNamePrefix.concat('cd', 'app');

  return partsToDashedName(name);
}
//ElastisCache
export function redisInstanceName(resourceNamePrefix: string[]): string {
  const name: string[] = resourceNamePrefix.concat('redis', 'server');

  return partsToName(name);
}
// SNS
export function snsTopicName(resourceNamePrefix: string[], resourceName: string): string {
  const name: string[] = resourceNamePrefix.slice(0, 1).concat(resourceName).concat('topic');

  return partsToName(name);
}
// SQS
export function sqsQueueName(resourceNamePrefix: string[], resourceName: string): string {
  const name: string[] = resourceNamePrefix.slice(0, 1).concat(resourceName).concat('queue');

  return partsToName(name);
}
// SecretsManager
export function secretName(resourceNamePrefix: string[], resourceName: string): string {
  const name: string[] = resourceNamePrefix.concat(resourceName).concat('secret');

  return partsToName(name);
}
// S3
export function s3BucketName(resourceNamePrefix: string[]): string {
  const name: string[] = resourceNamePrefix.concat('bct');

  return partsToDashedName(name);
}
export function s3BucketDeploymentName(resourceNamePrefix: string[]): string {
  const name: string[] = resourceNamePrefix.slice(0, 3).concat('bct', 'deployment');

  return partsToName(name);
}
// ElasticBeanstalk
export function ebApplicationName(resourceNamePrefix: string[]): string {
  const name: string[] = resourceNamePrefix
    .slice(0, 2)
    .filter((n) => n)
    .concat('app');

  return partsToDashedName(name);
}

export function ebApplicationRoleName(resourceNamePrefix: string[]): string {
  const name: string[] = resourceNamePrefix
    .slice(0, 2)
    .filter((n) => n)
    .concat('app', 'role');

  return partsToName(name);
}

export function ebEnvironmentName(resourceNamePrefix: string[]): string {
  const name: string[] = resourceNamePrefix
    .slice(0, 3)
    .filter((n) => n)
    .concat('env');

  return partsToDashedName(name);
}

export function shortEbEnvironmentName(resourceNamePrefix: string[]): string {
  const name: string[] = resourceNamePrefix.filter((n) => n);

  return partsToDashedName(name);
}
// EC2
export function launchTemplateName(resourceNamePrefix: string[]): string {
  const name: string[] = resourceNamePrefix.concat('lt');

  return partsToName(name);
}

export function ec2InstanceName(resourceNamePrefix: string[]): string {
  const name: string[] = resourceNamePrefix.concat('inst');

  return partsToName(name);
}

export function ec2VpcName(resourceNamePrefix: string[]): string {
  const name: string[] = resourceNamePrefix.concat('vpc');

  return partsToName(name);
}
export function ec2SubnetName(resourceNamePrefix: string[]): string {
  const name: string[] = resourceNamePrefix;

  return partsToName(name);
}
export function ec2SecurityGroupName(resourceNamePrefix: string[], kind: string): string {
  const name: string[] = resourceNamePrefix.concat(kind, 'sg');

  return partsToName(name);
}
// IAM
export function roleName(resourceNamePrefix: string[]): string {
  const name: string[] = resourceNamePrefix.concat('role');

  return partsToName(name);
}
export function iamInstanceRoleName(resourceNamePrefix: string[]): string {
  const name: string[] = resourceNamePrefix.slice(0, 3).concat('ec2', 'inst', 'role');

  return partsToName(name);
}
export function iamInstanceProfileName(resourceNamePrefix: string[]): string {
  const name: string[] = resourceNamePrefix.slice(0, 3).concat('ec2', 'inst', 'prof');

  return partsToName(name);
}
// RDS
export function rdsDatabaseName(resourceNamePrefix: string[]): string {
  const name: string[] = resourceNamePrefix.slice(0, 3).concat('db');

  return name.join('_').toLowerCase();
}
export function rdsStackName(resourceNamePrefix: string[]): string {
  const name: string[] = ['rds'];

  return partsToName(name);
}
