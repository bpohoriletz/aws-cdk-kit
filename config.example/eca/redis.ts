import * as eca from 'aws-cdk-lib/aws-elasticache';

export function instanceConfig(name: string): eca.CfnCacheClusterProps {
  const config = {
    defaultConfig: {
      cacheNodeType: 'cache.t2.micro',
      engine: 'redis',
      numCacheNodes: 1,
    },
  };

  if (config.hasOwnProperty(name)) {
    if (process.env.DEBUG) {
      console.log(`[DEBUG] Loading VPC CIDR config: ${name}`);
    }
    return config[name as keyof typeof config];
  } else {
    if (process.env.DEBUG) {
      console.log(`[DEBUG] Using default CIDR for: ${name}`);
    }
    return config['defaultConfig'];
  }
}
