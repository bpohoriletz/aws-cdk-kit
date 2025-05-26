import { Stack } from 'aws-cdk-lib';
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from 'aws-cdk-lib/custom-resources';
import * as asc from 'aws-cdk-lib/aws-autoscaling';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import * as eb from 'aws-cdk-lib/aws-elasticbeanstalk';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sns from 'aws-cdk-lib/aws-sns';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function stub(stack: Stack, clazz: string, id?: string): any {
  if (process.env.DEBUG) {
    console.log(clazz);
  }

  switch (clazz) {
    case 'asc.AutoScalingGroup':
      return new asc.AutoScalingGroup(stack, id || 'AutoScalingGroupID', {
        vpc: stub(stack, 'ec2.Vpc'),
        instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
        machineImage: ec2.MachineImage.latestAmazonLinux2(),
      });
    case 'cd.ServerApplication':
      return new codedeploy.ServerApplication(stack, id || 'ServerApplicationID', {
        applicationName: 'cd.ServerApplication',
      });
    case 'iam.CfnInstanceProfile':
      return new iam.CfnInstanceProfile(stack, id || 'CfnInstanceProfileID', {
        roles: [],
      });
    case 'iam.InstanceProfile':
      return new iam.InstanceProfile(stack, id || 'InstanceProfileID');
    case 'iam.Role':
      return new iam.Role(stack, id || 'RoleID', {
        assumedBy: new iam.AnyPrincipal(),
      });
    case 'eb.CfnApplication':
      return new eb.CfnApplication(stack, id || 'CfnApplicationID', {
        applicationName: 'eb.CfnApplication',
      });
    case 'ec2.Vpc':
      return new ec2.Vpc(stack, 'VpcID', {
        subnetConfiguration: [
          {
            name: 'Public',
            subnetType: ec2.SubnetType.PUBLIC,
            cidrMask: 19,
          },
          {
            name: 'Isolated',
            subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
            cidrMask: 19,
          },
          {
            name: 'Private',
            subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
            cidrMask: 19,
          },
        ],
      });
    case 'sns.Topic':
      return new sns.Topic(stack, id || 'TopicID');
    default: {
      const stubId = `Stub-${clazz}`.replace('.', '-');
      return new AwsCustomResource(stack, id || stubId, {
        functionName: stubId,
        onCreate: {
          service: 'sts',
          action: 'GetCallerIdentity',
          physicalResourceId: PhysicalResourceId.of(id || 'CustomID'),
        },
        policy: AwsCustomResourcePolicy.fromSdkCalls({
          resources: AwsCustomResourcePolicy.ANY_RESOURCE,
        }),
      });
    }
  }
}

export function arn(): string {
  return 'arn:partition:service:region:account-id:resource';
}
