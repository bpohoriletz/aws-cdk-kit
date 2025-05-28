import * as iam from 'aws-cdk-lib/aws-iam';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import { IServerDeploymentGroupBuilder, ServerDeploymentGroupProduct } from '../products/server-deployment-group';

export default class ServerDeploymentGroupBuilder implements IServerDeploymentGroupBuilder {
  protected deploymentGroupProps: ServerDeploymentGroupProduct;

  constructor() {
    this.deploymentGroupProps = new ServerDeploymentGroupProduct();
  }

  setApplication(application: codedeploy.IServerApplication): IServerDeploymentGroupBuilder {
    this.deploymentGroupProps.setApplication(application);

    return this;
  }

  setDeploymentConfig(): IServerDeploymentGroupBuilder {
    return this;
  }

  setName(name: string): IServerDeploymentGroupBuilder {
    this.deploymentGroupProps.setDeploymentGroupName(name);

    return this;
  }

  setRole(role: iam.IRole): IServerDeploymentGroupBuilder {
    this.deploymentGroupProps.setRole(role);

    return this;
  }

  setInstallAgent(): IServerDeploymentGroupBuilder {
    return this;
  }

  getResult(): ServerDeploymentGroupProduct {
    return this.deploymentGroupProps;
  }
}
