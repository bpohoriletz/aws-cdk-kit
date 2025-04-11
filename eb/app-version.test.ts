import * as cdk from "aws-cdk-lib";
import { Template, Capture, Match } from "aws-cdk-lib/assertions";
import { stub, arn } from "../test/stubs"

import * as func from "./app-version";

describe("CodeDeploy .createInitAppVersions()", () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test("matches snapshot", () => {
    func.createInitAppVersions([], stub(stack, "eb.CfnApplication"), arn(), stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
