import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { IEc2InstanceBuilder, Ec2InstanceProduct } from './products/instance';

/* eslint-disable @typescript-eslint/no-unused-expressions */
export default class Ec2InstanceBuilder implements IEc2InstanceBuilder {
  private props: Ec2InstanceProduct;

  constructor() {
    this.props = new Ec2InstanceProduct();
  }

  setVpc(vpc: ec2.IVpc): IEc2InstanceBuilder {
    this.props.vpc = vpc;

    return this;
  }

  setInstanceType(instanceType: ec2.InstanceType): IEc2InstanceBuilder {
    this.props.instanceType = instanceType;

    return this;
  }

  // TODO:  <31-07-25, Me> Introduce mechanism to load images from config, per region, hardcoded for now //
  setMachineImage(machineImage: ec2.IMachineImage): IEc2InstanceBuilder {
    this.props.machineImage = machineImage;

    return this;
  }

  // Directors may use script files or command arrays
  setUserData(userData: ec2.UserData): IEc2InstanceBuilder {
    userData && (this.props.userData = userData);

    return this;
  }

  setInstanceName(instanceName: string): IEc2InstanceBuilder {
    instanceName && (this.props.instanceName = instanceName);

    return this;
  }

  setAssociatePublicAddress(isPpublic: boolean): IEc2InstanceBuilder {
    this.props.associatePublicIpAddress = isPpublic;

    return this;
  }

  setInstanceProfile(instanceProfile: iam.IInstanceProfile): IEc2InstanceBuilder {
    this.props.instanceProfile = instanceProfile;

    return this;
  }

  setSecurityGroup(securityGroup: ec2.SecurityGroup): IEc2InstanceBuilder {
    this.props.securityGroup = securityGroup;

    return this;
  }

  setVpcSubnets(subnetSelection: ec2.SubnetSelection): IEc2InstanceBuilder {
    this.props.vpcSubnets = subnetSelection;

    return this;
  }

  getResult(): ec2.InstanceProps {
    return this.props;
  }
}
