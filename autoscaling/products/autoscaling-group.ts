import { AutoScalingGroupProps, HealthChecks, MixedInstancesPolicy } from 'aws-cdk-lib/aws-autoscaling';
import { IVpc, SubnetSelection } from 'aws-cdk-lib/aws-ec2';

export default class AutoscalingGroupProduct implements IAutoScalingGroupProduct {
  autoScalingGroupName?: string | undefined;
  desiredCapacity?: number | undefined;
  healthChecks?: HealthChecks | undefined;
  maxCapacity?: number | undefined;
  minCapacity?: number | undefined;
  mixedInstancesPolicy?: MixedInstancesPolicy | undefined;
  vpc: IVpc;
  vpcSubnets?: SubnetSelection | undefined;
}

interface IAutoScalingGroupProduct extends AutoScalingGroupProps {
  autoScalingGroupName?: string | undefined;
  desiredCapacity?: number | undefined;
  healthChecks?: HealthChecks | undefined;
  maxCapacity?: number | undefined;
  minCapacity?: number | undefined;
  mixedInstancesPolicy?: MixedInstancesPolicy | undefined;
  vpc: IVpc;
  vpcSubnets?: SubnetSelection | undefined;
}

export interface IAutoScalingGroupBullder {
  setName?(name: string | undefined): IAutoScalingGroupBullder;
  setDesiredCapacity?(desired: number | undefined): IAutoScalingGroupBullder;
  setHealthChecks?(checks: HealthChecks | undefined): IAutoScalingGroupBullder;
  setMaxCapacity?(max: number | undefined): IAutoScalingGroupBullder;
  setMinCapacity?(min: number | undefined): IAutoScalingGroupBullder;
  setMixedInstancesPolicy?(policy: MixedInstancesPolicy | undefined): IAutoScalingGroupBullder;
  setVpc(vpc: IVpc): IAutoScalingGroupBullder;
  setVpcSubnets?(subnets: SubnetSelection | undefined): IAutoScalingGroupBullder;
  getResult(): AutoScalingGroupProps;
}

export interface IAutoScalingGroupBullderConstructor {
  new (): IAutoScalingGroupBullder;
}
