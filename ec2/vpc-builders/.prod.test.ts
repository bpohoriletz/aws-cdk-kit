import ProdVpcBuilder from "./prod";

describe("new ProdVpcBuilder()", () => {
  let instance: ProdVpcBuilder;

  beforeEach(() => {
    instance = new ProdVpcBuilder();
  });

  test("Matches snapshot", () => {
    instance.customizeAzs()
      .customizeCidr("Vpc")
      .customizeNatProvider()
      .customizeNatSubnets()
      .customizeSubnetConfiguration("Vpc")

    expect(instance.getResult()).toMatchSnapshot();
  })
})
