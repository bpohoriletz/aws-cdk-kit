import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";

export function createAdminsGroup(stack: cdk.Stack) : iam.Group {
  const adminsGroup = new iam.Group(stack, "AdministratorsGroup", {
    groupName: "Administrators",
  });

  adminsGroup.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess"));

  return adminsGroup;
}

export function createDevelopersGroup(stack: cdk.Stack) : iam.Group {
  const devsGroup = new iam.Group(stack, "DevelopersGroup", {
    groupName: "Developers",
  });
  devsGroup.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonEC2ReadOnlyAccess"));
  devsGroup.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonSSMReadOnlyAccess"));

  const ssmPolicy = new iam.Policy(stack, 'DeveloperSsmPolicy', {
    statements: [
      new iam.PolicyStatement({
        actions: ['ssm:StartSession'],
        resources: ['*'],
      }),
    ],
  });
  devsGroup.attachInlinePolicy(ssmPolicy);

  return devsGroup;
}
