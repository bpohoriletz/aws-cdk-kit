import VpcBuilder from "./vpc-builder";

describe("new VpcBuilder()", () => {
  let instance: VpcBuilder;

  beforeEach(() => {
    instance = new VpcBuilder("Vpc");
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
