import PetVpcBuilder from "./pet";

describe("new PetVpcBuilder()", () => {
  let instance: PetVpcBuilder;

  beforeEach(() => {
    instance = new PetVpcBuilder("Vpc");
  });

  test("Matches snapshot", () => {
    instance.customizeAzs()
      .customizeCidr()
      .customizeNatProvider()
      .customizeNatSubnets()
      .customizeSubnetConfiguration()

    expect(instance.getResult()).toMatchSnapshot();
  })
})
