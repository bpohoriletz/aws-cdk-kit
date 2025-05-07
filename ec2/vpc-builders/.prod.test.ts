import ProdVpcBuilder from "./prod";

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
