import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

import * as con from '../utils/naming';
import RoleDirector from '../iam/directors/role';
import CodedeployRoleBuilder from '../iam/role-builders/codedeploy-role-builder';

// TOFIX; delete
export function createCodedeployRole(
  resourceNamePrefix: string[],
  regionalCdBucketArn: string,
  stack: cdk.Stack
): iam.Role {
  const resourceName = con.roleName(resourceNamePrefix.concat('codedeploy'));
  const role = new RoleDirector(CodedeployRoleBuilder).constructCodedeployRole(
    stack,
    resourceName,
    regionalCdBucketArn
  );

  return role;
}
