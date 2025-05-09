import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

import * as dev from './developer/policy';

export function createDeveloperPolicy(kind: string, tags: string[], stack: cdk.Stack): iam.ManagedPolicy[] | [] {
  switch (kind.toLowerCase()) {
    case 'ec2':
      return [dev.ec2Access(tags, stack)];
    default:
      return [];
  }
}
