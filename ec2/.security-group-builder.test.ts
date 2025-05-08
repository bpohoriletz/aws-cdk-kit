import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import SecurityGroupBuilder from "./security-group-builder";

describe("new SecurityGroupBuilder()", () => {
  let instance: SecurityGroupBuilder;
  let stack: cdk.Stack;

  beforeEach(() => {
    instance = new SecurityGroupBuilder();
    stack = new cdk.Stack();
  });

  test("Matches snapshot", () => {
    const vpc = new ec2.Vpc(stack, "Vpc")
    instance.customizeVpc(vpc)
      .customizeDescription("Description")
      .customizeName("Name");

    expect(instance.getResult()).toMatchSnapshot();
  })
})
