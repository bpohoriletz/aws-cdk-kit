import * as logs from 'aws-cdk-lib/aws-logs';

export class LogGroupProduct implements LogGroupProduct {
  logGroupName?: string;
  retention?: logs.RetentionDays;
}

export interface ILogGroupBuilder {
  props: LogGroupProduct;
  setName?(name: string | undefined): ILogGroupBuilder;
  setRetention?(days: logs.RetentionDays | undefined): ILogGroupBuilder;
  getResult(): logs.LogGroupProps;
}

export interface ILogGroupBuilderConstructor {
  new (): ILogGroupBuilder;
}
