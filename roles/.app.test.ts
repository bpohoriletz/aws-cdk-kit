import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";

import * as func from "./app";

describe("IAM .createAppRole()", () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test("matches snapshot", () => {
    func.createAppRole(["pre", "fix"], stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
