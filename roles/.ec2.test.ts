import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { arn } from "../test/stubs";

import * as func from "./ec2";

describe("IAM .createEc2Role()", () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test("matches snapshot", () => {
    func.createEc2Role(["pre", "fix"], [arn()], stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
