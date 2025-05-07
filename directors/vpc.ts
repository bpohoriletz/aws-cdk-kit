import { VpcProduct, IVpcBuilder, IVpcBuilderConstructor } from "../products/vpc";

export default class VpcDirector {
  private builder: IVpcBuilder;

  constructor(vpcName: string, builder: IVpcBuilderConstructor){
    this.builder = new builder(vpcName);
  }

  constructVpc(): VpcProduct {
    return this.builder
             .customizeAzs()
             .customizeCidr()
             .customizeNatProvider()
             .customizeNatSubnets()
             .customizeSubnetConfiguration()
             .getResult();
  }
}
