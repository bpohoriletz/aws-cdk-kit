import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import * as iam from 'aws-cdk-lib/aws-iam';

export class ServerDeploymentGroupProduct implements codedeploy.ServerDeploymentGroupProps {
  application?: codedeploy.IServerApplication;
  deploymentGroupName: string;
  deploymentConfig?: codedeploy.IServerDeploymentConfig;
  installAgent?: boolean;
  role?: iam.IRole;

  setApplication(application: codedeploy.IServerApplication) {
    this.application = application;
    return this;
  }

  setDeploymentGroupName(deploymentGroupName: string) {
    this.deploymentGroupName = deploymentGroupName;
    return this;
  }

  setDeploymentConfig(deploymentConfig: codedeploy.IServerDeploymentConfig) {
    this.deploymentConfig = deploymentConfig;
    return this;
  }

  setInstallAgent(installAgent: boolean) {
    this.installAgent = installAgent;
    return this;
  }

  setRole(role: iam.IRole) {
    this.role = role;
    return this;
  }
}

export interface IServerDeploymentGroupBuilder {
  setApplication(application?: codedeploy.IServerApplication): this;
  setDeploymentConfig(deploymentConfig?: codedeploy.IServerDeploymentConfig): this;
  setInstallAgent(installAgent?: boolean): this;
  setName(name?: string): this;
  setRole(role?: iam.IRole): this;
  getResult(): ServerDeploymentGroupProduct;
}

export interface IServerDeploymentGroupBuilderConstructor {
  new (): IServerDeploymentGroupBuilder;
}
