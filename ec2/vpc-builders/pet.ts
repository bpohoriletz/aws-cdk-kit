import * as ec2 from 'aws-cdk-lib/aws-ec2';
import VpcBuilderBase from '../vpc-builder-base';

export default class PetVpcBuilder extends VpcBuilderBase {
  setAzs(): this {
    this.vpcProps.maxAzs = 1;

    return this;
  }

  setNatProvider(): this {
    const provider = ec2.NatProvider.instanceV2({
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.NANO),
    });
    this.vpcProps.natGatewayProvider = provider;

    return this;
  }

  setNatSubnets(): this {
    this.vpcProps.natGatewaySubnets = { subnetType: ec2.SubnetType.PUBLIC };

    return this;
  }
}
