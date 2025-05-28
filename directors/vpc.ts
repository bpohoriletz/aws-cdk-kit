import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import VpcBuilderBase from '../ec2/vpc-builder-base';
import PetVpcBuilder from '../ec2/vpc-builders/pet';

export default class VpcDirector {
  static constructPetProjectVpc(scope: Construct, id: string): ec2.Vpc {
    const builder = new PetVpcBuilder();
    builder
      .setAzs()
      .setCidr(scope.node.path + id)
      .setNatProvider()
      .setNatSubnets()
      .setSubnetConfiguration(scope.node.path + id);

    return new ec2.Vpc(scope, id, builder.getResult());
  }

  static constructProductionVpc(scope: Construct, id: string): ec2.Vpc {
    const builder = new VpcBuilderBase();
    builder.setCidr(scope.node.path + id).setSubnetConfiguration(scope.node.path + id);

    return new ec2.Vpc(scope, id, builder.getResult());
  }
}
