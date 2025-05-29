/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as iam from 'aws-cdk-lib/aws-iam';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import { ServerDeploymentGroupProduct } from '../products/server-deployment-group';

export default abstract class ServerDeploymentGroupBuilderBase {
  protected deploymentGroupProps: ServerDeploymentGroupProduct;

  constructor() {
    this.deploymentGroupProps = new ServerDeploymentGroupProduct();
  }

  setApplication(application?: codedeploy.IServerApplication): this {
    application && (this.deploymentGroupProps.application = application!);

    return this;
  }

  setName(name?: string): this {
    name && (this.deploymentGroupProps.deploymentGroupName = name!);

    return this;
  }

  setRole(role?: iam.IRole): this {
    role && (this.deploymentGroupProps.role = role!);

    return this;
  }

  getResult(): ServerDeploymentGroupProduct {
    return this.deploymentGroupProps;
  }
}
