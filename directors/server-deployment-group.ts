import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import {
  IServerDeploymentGroupBuilder,
  IServerDeploymentGroupBuilderConstructor,
} from '../products/server-deployment-group';
import { ICodeDeployServerStack } from '../stacks/codedeploy-stack';

export default class ServerDeploymentGroupDirector {
  private builder: IServerDeploymentGroupBuilder;

  constructor(builder: IServerDeploymentGroupBuilderConstructor) {
    this.builder = new builder();
  }

  constructEc2Group(scope: ICodeDeployServerStack, id: string, name?: string): codedeploy.ServerDeploymentGroup {
    this.builder.setApplication(scope.application).setRole(scope.role).setName(name).setEc2InstanceTags!(
      scope.ec2InstanceTags!
    ).setDeploymentConfig();

    return new codedeploy.ServerDeploymentGroup(scope, id, this.builder.getResult());
  }
}
