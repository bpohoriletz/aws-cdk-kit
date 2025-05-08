import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { stub } from "../test/stubs";

import * as func from "./instance";

describe("EC2 .createPublicInstance()", () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test("matches snapshot", () => {
    func.createPublicInstance(["pre", "fix"], stub(stack, "iam.InstanceProfile"), stack, stub(stack, "ec2.Vpc"));

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
