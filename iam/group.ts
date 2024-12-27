import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";

export function createAdminsGroup(stack: cdk.Stack) : iam.Group {
  const adminsGroup = new iam.Group(stack, "AdministratorsGroup", {
    groupName: "Administrators",
  });

  adminsGroup.addManagedPolicy(
    iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess")
  );

  return adminsGroup;
}
