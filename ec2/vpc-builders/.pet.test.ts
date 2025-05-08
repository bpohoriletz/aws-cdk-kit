import PetVpcBuilder from "./pet";

describe("new PetVpcBuilder()", () => {
  let instance: PetVpcBuilder;

  beforeEach(() => {
    instance = new PetVpcBuilder();
  });

  test("Matches snapshot", () => {
    instance.customizeAzs()
      .customizeCidr("Vpc")
      .customizeNatProvider()
      .customizeNatSubnets()
      .customizeSubnetConfiguration("Vpc");

    expect(instance.getResult()).toMatchSnapshot();
  });
});
