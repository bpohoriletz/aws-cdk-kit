import ProdVpcBuilder from "./prod-vpc-builder";

describe("new ProdVpcBuilder()", () => {
  let instance: ProdVpcBuilder;

  beforeEach(() => {
    instance = new ProdVpcBuilder("Vpc");
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
