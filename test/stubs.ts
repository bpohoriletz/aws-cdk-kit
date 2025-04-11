import { Stack } from "aws-cdk-lib";
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from 'aws-cdk-lib/custom-resources';
import * as codedeploy from "aws-cdk-lib/aws-codedeploy";
import * as eb from "aws-cdk-lib/aws-elasticbeanstalk";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";

export function stub(stack: Stack, clazz: string, id?: string) : any {
  switch (clazz) {
    case "cd.ServerApplication":
      return new codedeploy.ServerApplication(stack, id || "ServerApplicationID");
    case "iam.CfnInstanceProfile":
      return new iam.CfnInstanceProfile(stack, id || "CfnInstanceProfileID", { roles: [] });
    case "iam.InstanceProfile":
      return new iam.InstanceProfile(stack, id || "InstanceProfileID");
    case "iam.Role":
      return new iam.Role(stack, id || "RoleID", { assumedBy: new iam.AnyPrincipal() });
    case "eb.CfnApplication":
      return new eb.CfnApplication(stack, id || "CfnApplicationId", { applicationName: "eb.CfnApplication"});
    case "ec2.Vpc":
      return new ec2.Vpc(stack, "VpcID");
    default:
      var stubId = `Stub-${clazz}`.replace(".", "-")
      return new AwsCustomResource(stack, id || stubId, {
      functionName: stubId,
      onCreate: {
        service: "sts",
        action: "GetCallerIdentity",
        physicalResourceId: PhysicalResourceId.of(id || "CustomID"),
      },
      policy:  AwsCustomResourcePolicy.fromSdkCalls({
        resources: AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    });
  }
}

export function arn() : string {
  return "arn:partition:service:region:account-id:resource"
}
