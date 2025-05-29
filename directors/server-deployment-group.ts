import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import {
  IServerDeploymentGroupBuilder,
  IServerDeploymentGroupBuilderConstructor,
} from '../products/server-deployment-group';
import { ServerCodeDeployStack } from '../stacks/codedeploy-stack';

export default class ServerDeploymentGroupDirector {
  private builder: IServerDeploymentGroupBuilder;

  constructor(builder: IServerDeploymentGroupBuilderConstructor) {
    this.builder = new builder();
  }

  constructEc2Group(scope: ServerCodeDeployStack, id: string, name?: string): codedeploy.ServerDeploymentGroup {
    this.builder.setApplication(scope.application).setRole(scope.role).setName(name).setEc2InstanceTags!(
      scope.ec2InstanceTags
    ).setDeploymentConfig();

    return new codedeploy.ServerDeploymentGroup(scope, id, this.builder.getResult());
  }

  constructAsgGroup(scope: ServerCodeDeployStack, id: string, name?: string): codedeploy.ServerDeploymentGroup {
    this.builder
      .setApplication(scope.application)
      .setRole(scope.role)
      .setName(name)
      .setAutoscalingGroups!(scope.autoScalingGroups)
      .setDeploymentConfig();

    return new codedeploy.ServerDeploymentGroup(scope, id, this.builder.getResult());
  }
}
