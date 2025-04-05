import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";

import * as con from "../utils/naming";

// TOFIX; delete
export function createCodedeployRole(resourceNamePrefix: string[], regionalCdBucketArn: string,  stack: cdk.Stack) : iam.Role {
  const resourceName = con.roleName(resourceNamePrefix.concat("codedeploy"));

  const role = new iam.Role(stack, resourceName, {
    assumedBy: new iam.ServicePrincipal("codedeploy.amazonaws.com"),
    managedPolicies: [
      iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSCodeDeployRole"),
    ],
    roleName: resourceName,
  });
  const allowEc2UploadToEbRegionalCdBucket: iam.Policy = new iam.Policy(stack, "allowEc2UploadToEbRegionalCdBucket", {
    statements: [
      new iam.PolicyStatement({
        actions: ["s3:PutObject", "s3:ListBucket", "s3:ListBucketVersions", "s3:GetObject", "s3:GetObjectVersion"],
        resources: [regionalCdBucketArn, `${regionalCdBucketArn}/resources/*`],
      }),
    ],
  });
  allowEc2UploadToEbRegionalCdBucket.attachToRole(role);

  return role;
};
