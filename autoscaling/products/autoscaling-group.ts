import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class AutoscalingGroupProduct implements IAutoScalingGroupProduct {
  autoScalingGroupName?: string | undefined;
  desiredCapacity?: number | undefined;
  healthChecks?: autoscaling.HealthChecks | undefined;
  maxCapacity?: number | undefined;
  minCapacity?: number | undefined;
  mixedInstancesPolicy?: autoscaling.MixedInstancesPolicy | undefined;
  vpc: ec2.IVpc;
  vpcSubnets?: ec2.SubnetSelection | undefined;
}

interface IAutoScalingGroupProduct extends autoscaling.AutoScalingGroupProps {
  autoScalingGroupName?: string | undefined;
  desiredCapacity?: number | undefined;
  healthChecks?: autoscaling.HealthChecks | undefined;
  maxCapacity?: number | undefined;
  minCapacity?: number | undefined;
  mixedInstancesPolicy?: autoscaling.MixedInstancesPolicy | undefined;
  vpc: ec2.IVpc;
  vpcSubnets?: ec2.SubnetSelection | undefined;
}

export interface IAutoScalingGroupBullder {
  setName(name: string | undefined): IAutoScalingGroupBullder;
  setDesiredCapacity?(desired: number | undefined): IAutoScalingGroupBullder;
  setHealthChecks?(checks: autoscaling.HealthChecks | undefined): IAutoScalingGroupBullder;
  setMaxCapacity?(max: number | undefined): IAutoScalingGroupBullder;
  setMinCapacity?(min: number | undefined): IAutoScalingGroupBullder;
  setMixedInstancesPolicy?(
    launchTemplate?: ec2.ILaunchTemplate | undefined,
    instanceTypes?: ec2.InstanceType | undefined,
    policy?: autoscaling.MixedInstancesPolicy | undefined
  ): IAutoScalingGroupBullder;
  setVpc(vpc: ec2.IVpc): IAutoScalingGroupBullder;
  setVpcSubnets?(subnets: ec2.SubnetSelection | undefined): IAutoScalingGroupBullder;
  getResult(): autoscaling.AutoScalingGroupProps;
}

export interface IAutoScalingGroupBullderConstructor {
  new (): IAutoScalingGroupBullder;
}
