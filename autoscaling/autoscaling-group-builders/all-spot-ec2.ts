import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import AutoScalingGroupBuilderBase from '../autoscaling-group-builder-base';
import { IAutoScalingGroupBullder } from '../products/autoscaling-group';

export class AllSpotEc2AutoscalingGroupBuilder extends AutoScalingGroupBuilderBase implements IAutoScalingGroupBullder {
  setMixedInstancesPolicy(
    launchTemplate: ec2.ILaunchTemplate | undefined,
    instanceTypes?: ec2.InstanceType[] | undefined,
    policy?: autoscaling.MixedInstancesPolicy | undefined
  ): IAutoScalingGroupBullder {
    instanceTypes ||= [new ec2.InstanceType('t2.micro')];
    this.props.mixedInstancesPolicy = policy || {
      instancesDistribution: {
        onDemandBaseCapacity: 0, // All instances are Spot
        onDemandPercentageAboveBaseCapacity: 0, // 100% Spot instances
      },
      launchTemplate: launchTemplate!,
      launchTemplateOverrides: instanceTypes.map((instanceType) => ({
        instanceType: instanceType,
      })),
    };

    return this;
  }
}
