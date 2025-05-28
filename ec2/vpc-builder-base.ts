import { IVpcBuilder, VpcProduct } from '../products/vpc';
import * as conf from '../../config/ec2/vpc';

export default class VpcBuilder implements IVpcBuilder {
  protected vpcProps: VpcProduct;

  constructor() {
    this.vpcProps = new VpcProduct();
  }

  customizeCidr(name: string): this {
    this.vpcProps.ipAddresses = conf.vpcCidrConfig(name);

    return this;
  }

  customizeSubnetConfiguration(name: string): this {
    this.vpcProps.subnetConfiguration = conf.vpcSubnetConfig(name);

    return this;
  }

  getResult(): VpcProduct {
    return this.vpcProps;
  }
}
