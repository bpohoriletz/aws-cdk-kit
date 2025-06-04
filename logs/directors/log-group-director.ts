import { Construct } from 'constructs';
import * as logs from 'aws-cdk-lib/aws-logs';
import { ILogGroupBuilder, ILogGroupBuilderConstructor } from '../products/log-group-product';

export default class LogGroupDirector {
  private builder: ILogGroupBuilder;

  constructor(builder: ILogGroupBuilderConstructor) {
    this.builder = new builder();
  }

  constructEvenlLogGroup(scope: Construct, id: string) {
    this.builder.setName!(id).setRetention!(logs.RetentionDays.TWO_WEEKS);

    return new logs.LogGroup(scope, id, this.builder.getResult());
  }
}
