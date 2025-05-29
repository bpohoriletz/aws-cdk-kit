import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import * as iam from 'aws-cdk-lib/aws-iam';

export class ServerDeploymentGroupProduct implements IServerDeploymentGroupProduct {
  application?: codedeploy.IServerApplication;
  deploymentGroupName?: string;
  deploymentConfig?: codedeploy.IServerDeploymentConfig;
  installAgent?: boolean;
  role?: iam.IRole;
  ec2InstanceTags?: codedeploy.InstanceTagSet | undefined;
}

interface IServerDeploymentGroupProduct extends codedeploy.ServerDeploymentGroupProps {
  application?: codedeploy.IServerApplication;
  deploymentGroupName?: string;
  deploymentConfig?: codedeploy.IServerDeploymentConfig;
  installAgent?: boolean;
  role?: iam.IRole;
  ec2InstanceTags?: codedeploy.InstanceTagSet | undefined;
}

export interface IServerDeploymentGroupBuilder {
  setApplication(application?: codedeploy.IServerApplication): IServerDeploymentGroupBuilder;
  setDeploymentConfig(deploymentConfig?: codedeploy.IServerDeploymentConfig): IServerDeploymentGroupBuilder;
  setName(name?: string): IServerDeploymentGroupBuilder;
  setRole(role?: iam.IRole): IServerDeploymentGroupBuilder;
  setEc2InstanceTags?(tags: codedeploy.InstanceTagSet): IServerDeploymentGroupBuilder;
  getResult(): codedeploy.ServerDeploymentGroupProps;
}

export interface IServerDeploymentGroupBuilderConstructor {
  new (): IServerDeploymentGroupBuilder;
}
