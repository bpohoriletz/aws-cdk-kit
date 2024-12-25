import { Stack } from "aws-cdk-lib";
import { InstanceProfile } from "aws-cdk-lib/aws-iam";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";
import { createPublicWebSg }  from "../ec2/security-group";
import * as con from "../naming/resources";

export function createPublicEc2(
  role: iam.Role,
  resourceNamePrefix: string[],
  stack: Stack,
  vpc: ec2.IVpc,
  instanceType: ec2.InstanceType = new ec2.InstanceType('t2.micro')) : [ec2.Instance, ec2.SecurityGroup] {

    const ec2Sg: ec2.SecurityGroup = createPublicWebSg(resourceNamePrefix, vpc, stack)

    const ec2Instance: ec2.Instance = new ec2.Instance(stack, con.ec2Name(resourceNamePrefix, 'public'), {
      associatePublicIpAddress: true,
      instanceType: instanceType,
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      role: role,
      securityGroup: ec2Sg,
      vpc: vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
    });

    return [ec2Instance, ec2Sg]
  }
