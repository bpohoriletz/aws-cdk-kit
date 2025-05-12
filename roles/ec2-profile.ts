import { Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

import * as con from '../utils/naming';
import RoleDirector from '../directors/role';
import EbEc2RoleBuilder from '../iam/role-builders/eb-ec2-role-builder';

export function createEc2InstanceProfile(
  resourceNamePrefix: string[],
  bucketArn: string,
  stack: Stack
): iam.InstanceProfile {
  // create role for EC2
  //const ec2Role = createEc2Role(resourceNamePrefix, bucketArns, stack);
  const profileId = con.iamInstanceProfileName(resourceNamePrefix);
  const ec2Role = new RoleDirector(EbEc2RoleBuilder).constructEc2Role(stack, 'Ec2Role', bucketArn);
  // embed role into instance profile
  const instanceProfile = new iam.InstanceProfile(stack, profileId, {
    instanceProfileName: profileId,
    role: ec2Role,
  });

  return instanceProfile;
}
