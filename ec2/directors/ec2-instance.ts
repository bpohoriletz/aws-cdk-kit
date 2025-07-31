import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { Stack } from 'aws-cdk-lib';
import Ec2InstanceBuilder from '../ec2-instance-builder-base';
import SecurityGroupDirector from './security-group';
import SecurityGroupBuilder from '../security-group-builder';

export default class Ec2InstanceDirector {
  instanceProfile: iam.InstanceProfile;
  machineImage: ec2.MachineImage;
  stack: Stack;
  vpc: ec2.IVpc;

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

  constructK8sMasterNode(scope: Construct, id: string, name: string): ec2.Instance {
    // TODO:  <31-07-25, Me> Refactor security group builder with new logic layout //
    this.builder
      .setVpc(this.vpc)
      .setMachineImage(new ec2.GenericLinuxImage({ 'us-east-1': 'ami-020cba7c55df1f615' }))
      .setInstanceName(name)
      .setInstanceType(new ec2.InstanceType('t2.medium'))
      .setVpcSubnets({ subnetType: ec2.SubnetType.PUBLIC });
    //.setUserData(new ec2.UserData.forLinux());

    return new ec2.Instance(scope, id, this.builder.getResult());
  }

  constructPublicEc2ForCodedeploy(
    scope: Construct,
    id: string,
    name: string,
    instanceType: ec2.InstanceType
  ): ec2.Instance {
    const securityGroup = new SecurityGroupDirector(SecurityGroupBuilder).constructWebSecurityGroup(
      this.stack,
      `${name}/SecurityGroup`,
      this.vpc
    );

    this.builder
      .setVpc(this.vpc)
      .setMachineImage(this.machineImage)
      .setInstanceName(name)
      .setInstanceType(instanceType)
      .setVpcSubnets({ subnetType: ec2.SubnetType.PUBLIC })
      .setInstanceProfile(this.instanceProfile)
      .setSecurityGroup(securityGroup)
      .setUserData(this.codeDeployUserScript());

    return new ec2.Instance(scope, id, this.builder.getResult());
  }

  private codeDeployUserScript(): ec2.UserData {
    const userDataScript = ec2.UserData.forLinux();
    userDataScript.addCommands(
      'sudo yum update -y',
      'sudo yum install -y ruby wget',
      'cd /home/ec2-user',
      `wget https://aws-codedeploy-${this.stack.region}.s3.${this.stack.region}.amazonaws.com/latest/install`,
      'chmod +x ./install',
      'sudo ./install auto'
    );

    return userDataScript;
  }
}
