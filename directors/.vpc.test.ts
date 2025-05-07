import VpcDirector from "./vpc"
import SmallVpcBuilder from "../ec2/small-vpc-builder"

describe("new VpcDirector()", () => {
  let instance: VpcDirector;

  beforeEach(() => {
    instance = new VpcDirector(["stack"], SmallVpcBuilder);
  });

  test("construct vpc for pet projects", () => {
    expect(instance.constructVpc()).toMatchSnapshot();
  });
})
