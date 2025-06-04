/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as logs from 'aws-cdk-lib/aws-logs';
import { LogGroupProduct, ILogGroupBuilder } from './products/log-group-product';

export default abstract class LogGroupBuilderBase implements ILogGroupBuilder {
  protected props: LogGroupProduct;

  constructor() {
    this.props = new LogGroupProduct();
  }

  setName(name: string | undefined): ILogGroupBuilder {
    name && (this.props.logGroupName = name);

    return this;
  }

  setRetention(days?: logs.RetentionDays | undefined): ILogGroupBuilder {
    days && (this.props.retention = days);

    return this;
  }

  getResult(): logs.LogGroupProps {
    return this.props;
  }
}
