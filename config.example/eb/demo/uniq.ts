import { aws_elasticbeanstalk as eb } from "aws-cdk-lib";
import * as names from "../../../../aws-cdk-kit/utils/naming";

export function envConfig(resourceNamePrefix: string[], _scope: string): eb.CfnEnvironment.OptionSettingProperty[] {
  const name = names.shortEbEnvironmentName(resourceNamePrefix);
  const config = {
    "": [],
  };

  if (config.hasOwnProperty(name)) {
    console.log(`[DEBUG] "${name}" - Loaded uniq options.`);
    return config[name as keyof typeof config];
  } else {
    console.log(`[DEBUG] "${name}" - Uniq options not found.`);
    return [];
  }
}
