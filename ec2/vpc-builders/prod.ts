import VpcBuilder from '../vpc-builder';

export default class ProdVpcBuilder extends VpcBuilder {
  customizeAzs(): this {
    return this;
  }
  customizeNatProvider(): this {
    return this;
  }
  customizeNatSubnets(): this {
    return this;
  }
}
