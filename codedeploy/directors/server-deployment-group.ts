import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { IAutoScalingGroup } from 'aws-cdk-lib/aws-autoscaling';
import {
  IServerDeploymentGroupBuilder,
  IServerDeploymentGroupBuilderConstructor,
} from '../products/server-deployment-group';

export default class ServerDeploymentGroupDirector {
  application?: codedeploy.ServerApplication;
  role?: iam.Role;
  ec2InstanceTags?: codedeploy.InstanceTagSet;
  autoScalingGroups?: IAutoScalingGroup[];
  private builder: IServerDeploymentGroupBuilder;

  constructor(builder: IServerDeploymentGroupBuilderConstructor) {
    this.builder = new builder();
  }

  constructEc2Group(scope: Construct, id: string, name?: string): codedeploy.ServerDeploymentGroup {
    this.builder.setApplication(this.application).setRole(this.role).setName(name).setEc2InstanceTags!(
      this.ec2InstanceTags
    ).setDeploymentConfig();

    return new codedeploy.ServerDeploymentGroup(scope, id, this.builder.getResult());
  }

  constructAsgGroup(scope: Construct, id: string, name?: string): codedeploy.ServerDeploymentGroup {
    this.builder.setApplication(this.application).setRole(this.role).setName(name).setAutoscalingGroups!(
      this.autoScalingGroups
    ).setDeploymentConfig();

    return new codedeploy.ServerDeploymentGroup(scope, id, this.builder.getResult());
  }
}
