import { Stack } from "aws-cdk-lib";
import { Group, Role } from "aws-cdk-lib/aws-iam";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import * as names from "../utils/naming";

export function createProdSecret(resourceNamePrefix : string[], stack: Stack, secretDetails: string): Secret {
  const resourceName = names.secretName(resourceNamePrefix, secretDetails);
  const secret = new Secret(stack, resourceName, { secretName: resourceName });
  grantAccessToUserGroup(stack, secret, "Administrators");

  return secret;
}

export function createSecret(resourceNamePrefix : string[], stack: Stack, secretDetails: string): Secret {
  const resourceName = names.secretName(resourceNamePrefix, secretDetails);
  // Create a secret
  const secret = new Secret(stack, resourceName, { secretName: resourceName });

  // Grant access to Administrators
  grantAccessToUserGroup(stack, secret, "Administrators");
  grantAccessToEc2Role(stack, secret, "aws-elasticbeanstalk-ec2-role");

  return secret;
}

function grantAccessToUserGroup(stack: Stack, secret: Secret, groupName: string): void {
  const group = Group.fromGroupName(stack, "${groupName}Group", groupName);

  secret.grantRead(group);
  secret.grantWrite(group);
}

function grantAccessToEc2Role(stack: Stack, secret: Secret, roleName: string): void {
  const role = Role.fromRoleName(stack, "${roleName}Role", roleName);

  secret.grantRead(role);
}
