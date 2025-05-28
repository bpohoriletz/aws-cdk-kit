import { Construct } from 'constructs';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import {
  IServerDeploymentGroupBuilder,
  IServerDeploymentGroupBuilderConstructor,
} from '../products/server-deployment-group';

export default class ServerDeploymentGroupDirector {
  private builder: IServerDeploymentGroupBuilder;
  private resources: IDeploymentGroupResources;

  constructor(builder: IServerDeploymentGroupBuilderConstructor) {
    this.builder = new builder();
  }

  setResources(resources: IDeploymentGroupResources): this {
    this.resources = resources;

    return this;
  }

  constructEc2Group(scope: Construct, id: string): codedeploy.ServerDeploymentGroup {
    if (!this.resources) throw `Initialize resources first by invoking #withResources`;

    this.builder.setApplication(this.resources.application).setRole(this.resources.role).setName(this.resources.name)
      .setEc2InstanceTags!(this.resources.ec2InstanceTags!)
      .setDeploymentConfig()
      .setInstallAgent();

    return new codedeploy.ServerDeploymentGroup(scope, id, this.builder.getResult());
  }
}

interface IDeploymentGroupResources extends codedeploy.ServerDeploymentGroupProps {
  name: string;
}
