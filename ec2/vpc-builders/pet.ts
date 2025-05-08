import VpcBuilder from "../vpc-builder";

export default class PetVpcBuilder extends VpcBuilder {
  customizeAzs(): this {
    this.vpcProps.setMaxAzs(1);

    return this;
  }
}
