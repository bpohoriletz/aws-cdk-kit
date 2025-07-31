import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import Ec2InstanceBuilder from '../ec2-instance-builder-base';

export default class Ec2InstanceDirector {
  vpc: ec2.IVpc;
  machineImage: ec2.MachineImage;
  private builder: Ec2InstanceBuilder;

  constructor() {
    this.builder = new Ec2InstanceBuilder();
  }

  constructPublicEc2(scope: Construct, id: string, name: string, instanceType: ec2.InstanceType): ec2.Instance {
    this.builder
      .setVpc(this.vpc)
      .setMachineImage(this.machineImage)
      .setInstanceName(name)
      .setInstanceType(instanceType)
      .setVpcSubnets({ subnetType: ec2.SubnetType.PUBLIC });

    return new ec2.Instance(scope, id, this.builder.getResult());
  }
}
