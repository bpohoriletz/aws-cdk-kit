import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import { IServerDeploymentGroupBuilder } from '../../products/server-deployment-group';
import ServerDeploymentGroupBuilder from '../server-deployment-group-builder';

export default class Ec2DeploymentGroupBuilder
  extends ServerDeploymentGroupBuilder
  implements IServerDeploymentGroupBuilder
{
  setDeploymentConfig(): IServerDeploymentGroupBuilder {
    this.deploymentGroupProps.setDeploymentConfig(codedeploy.ServerDeploymentConfig.ALL_AT_ONCE);

    return this;
  }

  setEc2InstanceTags(tags: codedeploy.InstanceTagSet): IServerDeploymentGroupBuilder {
    this.deploymentGroupProps.setTags(tags);

    return this;
  }
}
