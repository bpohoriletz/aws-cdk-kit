import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class VpcProduct implements IVpcProduct {
  ipAddresses?: ec2.IIpAddresses;
  maxAzs?: number;
  natGatewayProvider?: ec2.NatProvider;
  natGatewaySubnets?: ec2.SubnetSelection;
  subnetConfiguration?: ec2.SubnetConfiguration[];
}

interface IVpcProduct extends ec2.VpcProps {
  ipAddresses?: ec2.IIpAddresses;
  maxAzs?: number;
  natGatewayProvider?: ec2.NatProvider;
  natGatewaySubnets?: ec2.SubnetSelection;
  subnetConfiguration?: ec2.SubnetConfiguration[];
}

export interface IVpcBuilder {
  setCidr?(name: string): this;
  setAzs?(): this;
  setNatProvider?(): this;
  setNatSubnets?(): this;
  setSubnetConfiguration?(name: string): this;
  getResult(): ec2.VpcProps;
}

export interface IVpcBuilderConstructor {
  new (): IVpcBuilder;
}
