import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import VpcDirector from "./vpc";
import PetVpcBuilder from "../ec2/vpc-builders/pet";

describe("new VpcDirector()", () => {
  let instance: VpcDirector;
  let stack: cdk.Stack;

  beforeEach(() => {
    instance = new VpcDirector(PetVpcBuilder);
    stack = new cdk.Stack();
  });

  test("construct vpc for pet projects", () => {
    instance.constructVpc(stack, "Vpc");

    expect(Template.fromStack(stack)).toMatchSnapshot();
  });
});
