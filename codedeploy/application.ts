import { Stack } from "aws-cdk-lib";
import { Role } from "aws-cdk-lib/aws-iam";
import { ServerApplication } from "aws-cdk-lib/aws-codedeploy";
import * as con from "../naming/resources"

export function createApplication(resourceNamePrefix: string[], appRole: Role, stack: Stack) : ServerApplication {
  const resourceName: string = con.applicationName(resourceNamePrefix);

  const app = new ServerApplication(stack, resourceName, {
    applicationName: resourceName
  });

  return app;
}
