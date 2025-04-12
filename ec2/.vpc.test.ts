import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";

import * as func from "./vpc";

describe("EC2 .createMinimalVpc()", () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test("matches snapshot", async () => {
    func.createMinimalVpc(["pre", "fix"], stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});

describe("EC2 .createVpc()", () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test("matches snapshot", async () => {
    func.createVpc(["pre", "fix"], stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});

describe("EC2 .createProdVpc()", () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    stack = new cdk.Stack();
  });

  test("matches snapshot", async () => {
    func.createProdVpc(["pre", "fix"], stack);

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
