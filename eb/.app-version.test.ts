import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { stub, arn } from "../test/stubs";

import * as func from "./app-version";

describe("ElasticBeanstalk .createInitAppVersions()", () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test("matches snapshot", () => {
    func.createInitAppVersions(["pre", "fix"], stub(stack, "eb.CfnApplication"), arn(), stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
