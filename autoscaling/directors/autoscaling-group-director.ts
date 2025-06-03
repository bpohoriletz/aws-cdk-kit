import { Construct } from 'constructs';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { IAutoScalingGroupBullder, IAutoScalingGroupBullderConstructor } from '../products/autoscaling-group';

export default class AutoscalingGroupDirector {
  checks: autoscaling.HealthChecks;
  instanceTypes: ec2.InstanceType[];
  launchTemplate: ec2.ILaunchTemplate;
  vpcSubnets: ec2.SubnetSelection;
  vpc: ec2.IVpc;

  private builder: IAutoScalingGroupBullder;

  constructor(builder: IAutoScalingGroupBullderConstructor) {
    this.builder = new builder();
  }

  constructAutoscalingGroup(scope: Construct, id: string, name?: string) {
    this.builder.setVpc(this.vpc).setName!(name).setVpcSubnets!(this.vpcSubnets).setMaxCapacity!(1).setMinCapacity!(1)
      .setDesiredCapacity!(1).setHealthChecks!(this.checks).setMixedInstancesPolicy!(
      this.launchTemplate,
      this.instanceTypes
    );

    return new autoscaling.AutoScalingGroup(scope, id, this.builder.getResult());
  }
}
