import * as cdk from 'aws-cdk-lib';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';

import * as con from '../utils/naming';

export function createCdApplication(resourceNamePrefix: string[], stack: cdk.Stack): codedeploy.ServerApplication {
  const resourceName = con.codedeployApplicationName(resourceNamePrefix);

  const app = new codedeploy.ServerApplication(stack, resourceName, {
    applicationName: resourceName,
  });

  return app;
}
