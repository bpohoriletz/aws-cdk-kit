import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { stub } from "../test/stubs"

import * as func from "./topic";

describe("SNS .createOrdersTopic()", () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test("matches snapshot", () => {
    func.createOrdersTopic(["pre", "fix"], stack)

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
