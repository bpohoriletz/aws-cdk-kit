import { Stack } from 'aws-cdk-lib';
import { Role } from 'aws-cdk-lib/aws-iam';
import { CfnApplication, CfnApplicationProps } from 'aws-cdk-lib/aws-elasticbeanstalk';
import * as con from '../utils/naming';

export function createApplication(
  resourceNamePrefix: string[],
  appRole: Role,
  stack: Stack,
  existingName?: string
): CfnApplication {
  const resourceName: string = existingName || con.ebApplicationName(resourceNamePrefix);
  const appConfig: CfnApplicationProps = {
    applicationName: resourceName,
    resourceLifecycleConfig: {
      serviceRole: appRole.roleArn,
      versionLifecycleConfig: {
        maxCountRule: {
          deleteSourceFromS3: true,
          enabled: true,
          maxCount: 30,
        },
      },
    },
  };

  const app = new CfnApplication(stack, resourceName, appConfig);

  return app;
}
