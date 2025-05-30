/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import { IServerDeploymentGroupBuilder } from '../products/server-deployment-group';
import ServerDeploymentGroupBuilderBase from '../server-deployment-group-builder-base';
import { IAutoScalingGroup } from 'aws-cdk-lib/aws-autoscaling';

export default class AsgDeploymentGroupBuilder
  extends ServerDeploymentGroupBuilderBase
  implements IServerDeploymentGroupBuilder
{
  setAutoscalingGroups(groups?: IAutoScalingGroup[]): IServerDeploymentGroupBuilder {
    groups && (this.deploymentGroupProps.autoScalingGroups = groups);

    return this;
  }

  setDeploymentConfig(): IServerDeploymentGroupBuilder {
    this.deploymentGroupProps.deploymentConfig = codedeploy.ServerDeploymentConfig.ALL_AT_ONCE;

    return this;
  }
}
