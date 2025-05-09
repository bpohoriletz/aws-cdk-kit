import { Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

import { createEc2Role } from './ec2';
import * as con from '../utils/naming';

export function createEc2InstanceProfile(
  resourceNamePrefix: string[],
  bucketArns: string[],
  stack: Stack
): iam.InstanceProfile {
  // create role for EC2
  const ec2Role = createEc2Role(resourceNamePrefix, bucketArns, stack);
  const resourceName = con.iamInstanceProfileName(resourceNamePrefix);
  // embed role into instance profile
  const instanceProfile = new iam.InstanceProfile(stack, resourceName, {
    instanceProfileName: resourceName,
    role: ec2Role,
  });

  return instanceProfile;
}
