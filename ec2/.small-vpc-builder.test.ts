import SmallVpcBuilder from "./small-vpc-builder";

describe("new SmallVpcBuilder()", () => {
  let instance: SmallVpcBuilder;

  beforeEach(() => {
    instance = new SmallVpcBuilder("Stack");
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
