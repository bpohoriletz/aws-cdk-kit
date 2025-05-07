import VpcDirector from "./vpc"
import PetVpcBuilder from "../ec2/vpc-builders/pet"

describe("new VpcDirector()", () => {
  let instance: VpcDirector;

  beforeEach(() => {
    instance = new VpcDirector("Vpc", PetVpcBuilder);
  });

  test("construct vpc for pet projects", () => {
    expect(instance.constructVpc()).toMatchSnapshot();
  });
})
