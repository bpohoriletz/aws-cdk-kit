import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { stub } from "../stubs";

import * as func from "../../codedeploy/deployment-group";

describe("CodeDeploy .createDeploymentGroupToEc2()", () => {
  let stack: cdk.Stack;

  beforeEach(() => { stack = new cdk.Stack(); });

  test("matches snapshot", () => {
    func.createDeploymentGroupToEc2([], stub(stack, "ec2.Instance"),
                                    stub(stack, "cd.ServerApplication"), "stack", stub(stack, "iam.Role"), stack);
    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
