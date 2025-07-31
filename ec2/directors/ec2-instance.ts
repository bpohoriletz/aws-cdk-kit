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
      .setInstanceProfile(this.instanceProfile)
      .setSecurityGroup(securityGroup)
      .setUserData(this.codeDeployUserScript())
      .setVpcSubnets({ subnetType: ec2.SubnetType.PUBLIC });

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
