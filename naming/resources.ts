/* eslint-disable @typescript-eslint/no-unused-vars */

function partsToDashedName(parts: string[]) : string {
  return parts.filter((item): item is string => !!item).join("-").toLowerCase();
}

function partsToName(parts: string[]) : string {
  return parts.filter((item): item is string => !!item).map(chunk => chunk.charAt(0).toUpperCase() + chunk.substr(1)).join("");
}

// CodeDeploy
export function deploymentGroupName(resourceNamePrefix: string[]) : string {
  const name: string[] = resourceNamePrefix.slice(0,2).concat(["codedeploy","dg"]);

  return partsToName(name);
}
export function applicationName(resourceNamePrefix: string[]) : string {
  const name: string[] = resourceNamePrefix.slice(0,2).concat(["codedeploy","app"]);

  return partsToName(name);
}
// EC2
export function ec2Name(resourceNamePrefix: string[], resourceName: string) : string {
  const name: string[] = resourceNamePrefix.slice(0,3).concat(resourceName).concat("ec2");

  return partsToName(name);
}
// SNS
export function snsTopicName(resourceNamePrefix: string[], resourceName: string) : string {
  const name: string[] = resourceNamePrefix.slice(0,1).concat(resourceName).concat("topic");

  return partsToName(name);
}
// SQS
export function sqsQueueName(resourceNamePrefix: string[], resourceName: string) : string {
  const name: string[] = resourceNamePrefix.slice(0,1).concat(resourceName).concat("queue");

  return partsToName(name);
}
// SecretsManager
export function secretName(resourceNamePrefix: string[], resourceName: string) : string {
  const name: string[] = resourceNamePrefix.concat(resourceName).concat("secret");

  return partsToName(name);
}
// S3
export function s3BucketName(resourceNamePrefix: string[]) : string {
  const name: string[] = resourceNamePrefix.slice(0,3).concat("bct");

  return partsToDashedName(name);
}
export function s3BucketDeploymentName(resourceNamePrefix: string[]) : string {
  const name: string[] = resourceNamePrefix.slice(0,3).concat("bct", "deployment");

  return partsToName(name);
}
// ElasticBeanstalk
export function ebApplicationName(resourceNamePrefix: string[]) : string {
  const name: string[] = resourceNamePrefix.slice(0,2).concat("app");

  return partsToDashedName(name);
}

export function ebApplicationRoleName(resourceNamePrefix: string[]) : string {
  const name: string[] = resourceNamePrefix.slice(0,2).concat("app", "role");

  return partsToName(name);
}

export function ebEnvironmentName(resourceNamePrefix: string[]) : string {
  const name: string[] = resourceNamePrefix.slice(0,3).concat("env");

  return partsToDashedName(name);
}

export function shortEbEnvironmentName(resourceNamePrefix: string[]) : string {
  const name: string[] = resourceNamePrefix.slice(0,2);

  return partsToDashedName(name);
}
// EC2
export function ec2VpcName(resourceNamePrefix: string[]) : string {
  const name: string[] = ["vpc"];

  return partsToName(name);
}
export function ec2PublicSubnetName(resourceNamePrefix: string[]) : string {
  const name: string[] = ["public"];

  return partsToName(name);
}
export function ec2PrivateSubnetName(resourceNamePrefix: string[]) : string {
  const name: string[] = ["private"];

  return partsToName(name);
}
export function ec2IsolatedSubnetName(resourceNamePrefix: string[]) : string {
  const name: string[] = ["isolated"];

  return partsToName(name);
}
export function ec2SecurityGroupName(resourceNamePrefix: string[], kind: string) : string {
  const name: string[] = resourceNamePrefix.concat(kind, "sg");

  return partsToName(name);
}
// IAM
export function iamInstanceRoleName(resourceNamePrefix: string[]) : string {
  const name: string[] = resourceNamePrefix.slice(0,3).concat("ec2", "inst", "role");

  return partsToName(name);
}
export function iamInstanceProfileName(resourceNamePrefix: string[]) : string {
  const name: string[] = resourceNamePrefix.slice(0,3).concat("ec2", "inst", "prof");

  return partsToName(name);
}
// RDS
export function rdsEbEnvDatabaseName(resourceNamePrefix: string[]) : string {
  const name: string[] = resourceNamePrefix.slice(0,3).concat("db");

  return name.join("_").toLowerCase();
}
export function rdsStackName(resourceNamePrefix: string[]) : string {
  const name: string[] = ["rds"];

  return partsToName(name);
}
