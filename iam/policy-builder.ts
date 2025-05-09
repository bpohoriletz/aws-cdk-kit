import { IPolicyBuilder, PolicyProduct } from '../products/policy';

export default class PolicyBuilder implements IPolicyBuilder {
  getResult(): PolicyProduct {
    return new PolicyProduct();
  }
}
