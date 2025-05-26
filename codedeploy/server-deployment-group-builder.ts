import { IServerDeploymentGroupBuilder, ServerDeploymentGroupProduct } from '../products/server-deployment-group';

export default class ServerDeploymentGroupBuilder implements IServerDeploymentGroupBuilder {
  protected deploymentGroupProps: ServerDeploymentGroupProduct;

  constructor() {
    this.deploymentGroupProps = new ServerDeploymentGroupProduct();
  }

  setApplication(): this {
    return this;
  }

  setDeploymentConfig(): this {
    return this;
  }

  setName(name: string): this {
    this.deploymentGroupProps.setDeploymentGroupName(name);

    return this;
  }

  setRole(): this {
    return this;
  }

  setInstallAgent(): this {
    return this;
  }

  getResult(): ServerDeploymentGroupProduct {
    return this.deploymentGroupProps;
  }
}
