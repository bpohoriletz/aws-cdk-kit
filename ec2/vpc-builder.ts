import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { IVpcBuilder, VpcProduct } from '../products/vpc';
import * as conf from '../../config/ec2/vpc';

export default class VpcBuilder implements IVpcBuilder {
  protected vpcProps: VpcProduct;

  constructor() {
    this.vpcProps = new VpcProduct();
  }

  customizeCidr(name: string): this {
    this.vpcProps.setCidr(conf.vpcCidrConfig(name));

    return this;
  }
  customizeAzs(): this {
    this.vpcProps.setMaxAzs(2);

    return this;
  }
  customizeNatProvider(): this {
    const provider = ec2.NatProvider.instanceV2({
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.NANO),
    });
    this.vpcProps.setNatProvider(provider);

    return this;
  }
  customizeNatSubnets(): this {
    this.vpcProps.setNatSubnets({ subnetType: ec2.SubnetType.PUBLIC });

    return this;
  }
  customizeSubnetConfiguration(name: string): this {
    const config = conf.vpcSubnetConfig(name);
    this.vpcProps.setSubnetConfiguration(config);

    return this;
  }

  getResult(): VpcProduct {
    return this.vpcProps;
  }
}
