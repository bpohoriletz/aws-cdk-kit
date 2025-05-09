import * as cdk from "aws-cdk-lib";
import * as elasticache from "aws-cdk-lib/aws-elasticache";
import * as ec2 from "aws-cdk-lib/aws-ec2";

import SecurityGroupDirector from "../directors/security-group";
import SecurityGroupBuilder from "../ec2/security-group-builder";
import * as names from "../utils/naming";
import * as conf from "../../config/eca/redis";

export function createRedisInstance(resourceNamePrefix: string[], vpc: ec2.IVpc, stack: cdk.Stack): [elasticache.CfnCacheCluster, ec2.SecurityGroup] {
  const subnetGroupName = names.subnetGroupName(resourceNamePrefix.concat("redis"));
  const instanceName = names.redisInstanceName(resourceNamePrefix);

  const redisSecurityGroup = new SecurityGroupDirector(SecurityGroupBuilder).constructSecurityGroup(stack, "RedisSecurityGroup", vpc);
  const redisSubnetGroup = new elasticache.CfnSubnetGroup(stack, subnetGroupName, {
    description: `Subnet group for ${resourceNamePrefix.toString()} Redis instance`,
    subnetIds: vpc.privateSubnets.map((subnet) => subnet.subnetId),
    cacheSubnetGroupName: subnetGroupName,
  });
  const redisCluster = new elasticache.CfnCacheCluster(stack, instanceName, {
    cacheNodeType: conf.instanceConfig(resourceNamePrefix[0]).cacheNodeType,
    cacheSubnetGroupName: redisSubnetGroup.cacheSubnetGroupName,
    engine: "redis",
    numCacheNodes: 1,
    vpcSecurityGroupIds: [redisSecurityGroup.securityGroupId],
  });

  return [redisCluster, redisSecurityGroup];
}
