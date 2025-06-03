/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as cdk from 'aws-cdk-lib';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { AutoscalingGroupProduct, IAutoScalingGroupBullder } from './products/autoscaling-group';

export default abstract class AutoScalingGroupBuilderBase implements IAutoScalingGroupBullder {
  protected props: AutoscalingGroupProduct;

  constructor() {
    this.props = new AutoscalingGroupProduct();
  }

  setVpc(vpc: ec2.IVpc): IAutoScalingGroupBullder {
    this.props.vpc = vpc;

    return this;
  }

  setName(name: string | undefined): IAutoScalingGroupBullder {
    name && (this.props.autoScalingGroupName = name);

    return this;
  }

  setMinCapacity(min: number | undefined): IAutoScalingGroupBullder {
    this.props.minCapacity = min || 1;

    return this;
  }

  setDesiredCapacity(desired: number | undefined): IAutoScalingGroupBullder {
    this.props.desiredCapacity = desired || 1;

    return this;
  }

  setMaxCapacity(max: number | undefined): IAutoScalingGroupBullder {
    this.props.maxCapacity = max || 1;

    return this;
  }

  setVpcSubnets(subnets: ec2.SubnetSelection | undefined): IAutoScalingGroupBullder {
    subnets && (this.props.vpcSubnets = subnets);

    return this;
  }

  getResult(): autoscaling.AutoScalingGroupProps {
    return this.props;
  }

  setHealthChecks(checks: autoscaling.HealthChecks | undefined): IAutoScalingGroupBullder {
    this.props.healthChecks = checks || autoscaling.HealthChecks.ec2({ gracePeriod: cdk.Duration.minutes(5) });

    return this;
  }
}
