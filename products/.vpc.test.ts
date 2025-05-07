import { VpcProduct } from "./vpc";

describe("new VpcProduct", () => {
  let instance: VpcProduct;

  beforeEach(() => {
    instance = new VpcProduct();
  });

  test("has default properties set", () => {
    expect(instance).toMatchSnapshot();
  });
});

