import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as names from "../naming/resources";
import * as conf from "../../config/ec2/vpc";

export function createMinimalVpc(resourceNamePrefix: string[], stack: cdk.Stack): ec2.Vpc {
  const resourceName = names.ec2VpcName(resourceNamePrefix);
  const vpc = new ec2.Vpc(stack, resourceName, {
    ipAddresses: conf.vpcCidrConfig(resourceName),
    maxAzs: 1,
    subnetConfiguration: conf.vpcSubnetConfig(resourceName),
    natGatewayProvider: ec2.NatProvider.instanceV2({
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.NANO
      ),
    }),
    natGatewaySubnets: {
      subnetType: ec2.SubnetType.PUBLIC, // Make NAT instance reside in a public subnet
    },
  });

  return vpc;
}

export function createVpc(resourceNamePrefix: string[], stack: cdk.Stack): ec2.Vpc {
  const resourceName = names.ec2VpcName(resourceNamePrefix);
  const vpc = new ec2.Vpc(stack, resourceName, {
    ipAddresses: conf.vpcCidrConfig(resourceName),
    maxAzs: 2,             // Use 2 availability zones
    subnetConfiguration: conf.vpcSubnetConfig(resourceName),
    natGatewayProvider: ec2.NatProvider.instanceV2({
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
    }),
    natGatewaySubnets: {
      subnetType: ec2.SubnetType.PUBLIC, // Make NAT instance reside in a public subnet
    },
  });

  return vpc;
}

export function createProdVpc(resourceNamePrefix: string[], stack: cdk.Stack): ec2.Vpc {
  const resourceName = names.ec2VpcName(resourceNamePrefix);
  const vpc = new ec2.Vpc(stack, resourceName, {
    ipAddresses: conf.vpcCidrConfig(resourceName),
    subnetConfiguration: conf.vpcSubnetConfig(resourceName),
  });

  return vpc;
}
