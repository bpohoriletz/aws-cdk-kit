import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import * as iam from 'aws-cdk-lib/aws-iam';

export class ServerDeploymentGroupProduct implements codedeploy.ServerDeploymentGroupProps {
  application?: codedeploy.IServerApplication;
  deploymentGroupName: string;
  deploymentConfig?: codedeploy.IServerDeploymentConfig;
  installAgent?: boolean;
  role?: iam.IRole;
  ec2InstanceTags?: codedeploy.InstanceTagSet | undefined;

  setApplication(application: codedeploy.IServerApplication): void {
    this.application = application;
  }

  setDeploymentGroupName(deploymentGroupName: string): void {
    this.deploymentGroupName = deploymentGroupName;
  }

  setDeploymentConfig(deploymentConfig: codedeploy.IServerDeploymentConfig): void {
    this.deploymentConfig = deploymentConfig;
  }

  setInstallAgent(installAgent: boolean): void {
    this.installAgent = installAgent;
  }

  setRole(role: iam.IRole): void {
    this.role = role;
  }

  setTags(tags: codedeploy.InstanceTagSet): void {
    this.ec2InstanceTags = tags;
  }
}

export interface IServerDeploymentGroupBuilder {
  setApplication(application?: codedeploy.IServerApplication): IServerDeploymentGroupBuilder;
  setDeploymentConfig(deploymentConfig?: codedeploy.IServerDeploymentConfig): IServerDeploymentGroupBuilder;
  setInstallAgent(installAgent?: boolean): IServerDeploymentGroupBuilder;
  setName(name?: string): IServerDeploymentGroupBuilder;
  setRole(role?: iam.IRole): IServerDeploymentGroupBuilder;
  setEc2InstanceTags?(tags: codedeploy.InstanceTagSet): IServerDeploymentGroupBuilder;
  getResult(): ServerDeploymentGroupProduct;
}

export interface IServerDeploymentGroupBuilderConstructor {
  new (): IServerDeploymentGroupBuilder;
}
