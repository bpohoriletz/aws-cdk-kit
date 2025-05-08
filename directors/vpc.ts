import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { IVpcBuilder, IVpcBuilderConstructor } from "../products/vpc";

export default class VpcDirector {
  private builder: IVpcBuilder;

  constructor(builder: IVpcBuilderConstructor){
    this.builder = new builder();
  }

  constructVpc(scope: Construct, id: string): ec2.Vpc {
    const props =  this.builder
                     .customizeAzs()
                     .customizeCidr(scope.node.path + id)
                     .customizeNatProvider()
                     .customizeNatSubnets()
                     .customizeSubnetConfiguration(scope.node.path + id)
                     .getResult();

    return new ec2.Vpc(scope, id, props)
  }
}
