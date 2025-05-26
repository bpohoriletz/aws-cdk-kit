import { Construct } from 'constructs';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import {
  IServerDeploymentGroupBuilder,
  IServerDeploymentGroupBuilderConstructor,
} from '../products/server-deployment-group';

export default class ServerDeploymentGroupDirector {
  private builder: IServerDeploymentGroupBuilder;

  constructor(builder: IServerDeploymentGroupBuilderConstructor) {
    this.builder = new builder();
  }

  constructEmptyGroup(scope: Construct, id: string, name: string): codedeploy.ServerDeploymentGroup {
    const props = this.builder
      .setApplication()
      .setDeploymentConfig()
      .setInstallAgent()
      .setName(name)
      .setRole()
      .getResult();

    return new codedeploy.ServerDeploymentGroup(scope, id, props);
  }
}
