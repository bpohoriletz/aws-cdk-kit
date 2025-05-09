import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { ISecurityGroupBuilder, ISecurityGroupBuilderConstructor } from "../products/security-group";

export default class SecurityGroupDirector {
  private builder: ISecurityGroupBuilder;

  constructor(builder: ISecurityGroupBuilderConstructor){
    this.builder = new builder();
  }

  constructSecurityGroup(scope: Construct, id: string, vpc: ec2.IVpc ): ec2.SecurityGroup {
    const params = this.builder
                     .customizeVpc(vpc)
                     .customizeDescription("Security group")
                     .getResult();

    return new ec2.SecurityGroup(scope, id, params);
  }

  constructWebSecurityGroup(scope: Construct, id: string, vpc: ec2.IVpc ): ec2.SecurityGroup {
    const params = this.builder
                     .customizeVpc(vpc)
                     .customizeDescription("Web security group")
                     .getResult();

    const group = new ec2.SecurityGroup(scope, id, params);
    // Allow web traffic
    group.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), "Allow incoming traffic over port 80");
    group.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), "Allow incoming traffic over port 443");

    return group;
  }
}
