import * as ec2 from "aws-cdk-lib/aws-ec2";
import { IVpcBuilder, VpcProduct } from "../products/vpc";
import * as conf from "../../config/ec2/vpc";

export default class SmallVpcBuilder implements IVpcBuilder {
  private resourceName: string;
  private vpcProps: VpcProduct;

  constructor(resourceName: string) {
    this.resourceName = resourceName;
    this.vpcProps = new VpcProduct();
  }

  customizeCidr(): this {
    this.vpcProps.setCidr(conf.vpcCidrConfig(this.resourceName));

    return this;
  }
  customizeAzs(): this {
    this.vpcProps.setMaxAzs(1);

    return this;
  }
  customizeNatProvider(): this {
    const provider = ec2.NatProvider.instanceV2({
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.NANO
      ),
    });
    this.vpcProps.setNatProvider(provider);

    return this;
  }
  customizeNatSubnets(): this {
    this.vpcProps.setNatSubnets({ subnetType: ec2.SubnetType.PUBLIC });

    return this;
  }
  customizeSubnetConfiguration(): this {
    const config = conf.vpcSubnetConfig(this.resourceName);
    this.vpcProps.setSubnetConfiguration(config)

    return this;
  }

  getResult(): VpcProduct {
    return this.vpcProps;
  };
}
