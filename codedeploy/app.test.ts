import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";

import * as app from "./app";

describe("CodeDeploy .createCdApplication()", () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test("matches snapshot", () => {
    app.createCdApplication(["pre", "fix"], stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });

  test("has proper name", () => {
    app.createCdApplication(["pre", "fix"], stack);

    Template.fromStack(stack).hasResourceProperties("AWS::CodeDeploy::Application", { "ApplicationName": "pre-fix-cd-app" });
  });
});
