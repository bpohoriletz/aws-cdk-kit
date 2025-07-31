import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

export class Ec2InstanceProduct implements ec2.InstanceProps {
  associatePublicIpAddress?: boolean | undefined;
  instanceName?: string | undefined;
  instanceProfile?: iam.IInstanceProfile | undefined;
  instanceType: ec2.InstanceType;
  machineImage: ec2.IMachineImage;
  securityGroup?: ec2.ISecurityGroup | undefined;
  userData?: ec2.UserData | undefined;
  vpc: ec2.IVpc;
  vpcSubnets?: ec2.SubnetSelection | undefined;
}

export interface IEc2InstanceBuilder {
  setAssociatePublicAddress(isPpublic: boolean): IEc2InstanceBuilder;
  setInstanceName(instanceName: string): IEc2InstanceBuilder;
  setInstanceProfile(instanceProfile: iam.IInstanceProfile): IEc2InstanceBuilder;
  setInstanceType(instanceType: ec2.InstanceType): IEc2InstanceBuilder;
  setMachineImage(machineImage: ec2.MachineImage): IEc2InstanceBuilder;
  setSecurityGroup(securityGroup: ec2.ISecurityGroup): IEc2InstanceBuilder;
  setUserData(userData: ec2.UserData): IEc2InstanceBuilder;
  setVpc(vpc: ec2.IVpc): IEc2InstanceBuilder;
  setVpcSubnets(vpcSubnets: ec2.SubnetSelection): IEc2InstanceBuilder;
  getResult(): ec2.InstanceProps;
}
