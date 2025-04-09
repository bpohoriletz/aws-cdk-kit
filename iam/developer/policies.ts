import { Stack } from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as naming from "../../utils/naming";

export function ec2Access(tags: string[], stack: Stack) : iam.ManagedPolicy {
  const resourceName = naming.partsToName(tags.concat("ec2", "access", "policy"))
  return new iam.ManagedPolicy(stack, resourceName, {
    description: "Developer-level access to EC2 services",
    statements:[
      new iam.PolicyStatement({
        actions: ['ec2:*'],
        resources: ['*'],
      })
    ],
  })
}
