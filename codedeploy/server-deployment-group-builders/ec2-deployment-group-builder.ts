import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import { IServerDeploymentGroupBuilder } from '../../products/server-deployment-group';
import ServerDeploymentGroupBuilderBase from '../server-deployment-group-builder-base';

export default class Ec2DeploymentGroupBuilder
  extends ServerDeploymentGroupBuilderBase
  implements IServerDeploymentGroupBuilder
{
  setDeploymentConfig(): IServerDeploymentGroupBuilder {
    this.deploymentGroupProps.deploymentConfig = codedeploy.ServerDeploymentConfig.ALL_AT_ONCE;

    return this;
  }

  setEc2InstanceTags(tags: codedeploy.InstanceTagSet): IServerDeploymentGroupBuilder {
    this.deploymentGroupProps.ec2InstanceTags = tags;

    return this;
  }
}
