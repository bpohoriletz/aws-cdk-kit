import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import * as iam from 'aws-cdk-lib/aws-iam';
import { IConstruct, Construct, IDependable } from 'constructs';
import {IAutoScalingGroup} from 'aws-cdk-lib/aws-autoscaling';
import * as cdk from 'aws-cdk-lib';

export class ServerCodeDeployStack extends cdk.NestedStack implements IServerCodeDeployStack {
  application?: codedeploy.ServerApplication;
  role?: iam.Role;
  ec2InstanceTags?: codedeploy.InstanceTagSet;
  autoScalingGroups?: IAutoScalingGroup[];

  constructor(scope: Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);
  }
}

interface IServerCodeDeployStack extends IConstruct, IDependable {
  application?: codedeploy.ServerApplication;
  role?: iam.Role;
  ec2InstanceTags?: codedeploy.InstanceTagSet;
  autoScalingGroups?: IAutoScalingGroup[];
}
