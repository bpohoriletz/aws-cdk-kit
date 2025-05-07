import * as ec2 from "aws-cdk-lib/aws-ec2";

export class VpcProduct implements ec2.VpcProps {
  ipAddressesSet: ec2.IIpAddresses;
  maxAzs: number;
  natGatewayProvider: ec2.NatProvider;
  natGatewaySubnets: ec2.SubnetSelection;
  subnetConfiguration: ec2.SubnetConfiguration[];

  setCidr(cidr: ec2.IIpAddresses): void {
    this.ipAddressesSet = cidr;
  }

  setMaxAzs(max: number): void {
    this.maxAzs = max;
  }

  setNatProvider(provider: ec2.NatProvider): void {
    this.natGatewayProvider = provider;
  }

  setNatSubnets(subnetSelection: ec2.SubnetSelection): void {
    this.natGatewaySubnets = subnetSelection;
  }

  setSubnetConfiguration(config: ec2.SubnetConfiguration[]): void {
    this.subnetConfiguration = config;
  }
}

export interface IVpcBuilder {
  customizeCidr(): this;
  customizeAzs(): this;
  customizeNatProvider(): this;
  customizeNatSubnets(): this;
  customizeSubnetConfiguration(): this;
  getResult(): VpcProduct;
}

export interface IVpcBuilderConstructor {
  new(resourceName: string): IVpcBuilder;
}
