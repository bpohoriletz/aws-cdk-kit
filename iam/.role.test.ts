import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";

import * as func from "./role";

describe("IAM .createGithubCliRole()", () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test("matches snapshot", () => {
    func.createGithubCliRole("account", stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
