import * as cdk from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';

import SecurityGroupDirector from '../ec2/directors/security-group';
import SecurityGroupBuilder from '../ec2/security-group-builder';
import * as names from '../utils/naming';

// TOFIX; extract confguration
export function createNonprodDatabase(
  resourceNamePrefix: string[],
  stack: Stack,
  vpc: ec2.IVpc,
  version: rds.PostgresEngineVersion = rds.PostgresEngineVersion.VER_16_3
): [rds.DatabaseInstance, ec2.SecurityGroup] {
  const securityGroup = new SecurityGroupDirector(SecurityGroupBuilder).constructWebSecurityGroup(
    stack,
    'RdsSecurityGroup',
    vpc
  );

  const rdsInstance = new rds.DatabaseInstance(stack, names.rdsDatabaseName(resourceNamePrefix), {
    backupRetention: cdk.Duration.days(0),
    databaseName: names.rdsDatabaseName(resourceNamePrefix),
    engine: rds.DatabaseInstanceEngine.postgres({ version: version }),
    instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.MICRO),
    multiAz: false,
    publiclyAccessible: false,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
    securityGroups: [securityGroup],
    storageType: rds.StorageType.STANDARD,
    vpc: vpc,
    vpcSubnets: {
      subnetType: ec2.SubnetType.PUBLIC,
    },
  });

  return [rdsInstance, securityGroup];
}

export function createProdRdsDatabase(
  resourceNamePrefix: string[],
  stack: Stack,
  vpc: ec2.IVpc
): [rds.DatabaseInstance, ec2.SecurityGroup] {
  const securityGroup = new SecurityGroupDirector(SecurityGroupBuilder).constructWebSecurityGroup(
    stack,
    'RdsSecurityGroup',
    vpc
  );

  const rdsInstance: rds.DatabaseInstance = new rds.DatabaseInstance(stack, names.rdsDatabaseName(resourceNamePrefix), {
    allocatedStorage: 20,
    backupRetention: cdk.Duration.days(14),
    databaseName: names.rdsDatabaseName(resourceNamePrefix),
    deletionProtection: true,
    enablePerformanceInsights: true,
    engine: rds.DatabaseInstanceEngine.postgres({
      version: rds.PostgresEngineVersion.VER_16_6,
    }),
    instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.MEDIUM),
    maxAllocatedStorage: 1024,
    multiAz: true,
    publiclyAccessible: false,
    removalPolicy: cdk.RemovalPolicy.RETAIN,
    securityGroups: [securityGroup],
    storageEncrypted: true,
    storageType: rds.StorageType.GP3,
    vpc: vpc,
    vpcSubnets: {
      subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
    },
  });

  return [rdsInstance, securityGroup];
}

export function createRdsDatabase(
  resourceNamePrefix: string[],
  stack: Stack,
  vpc: ec2.IVpc
): [rds.DatabaseInstance, ec2.SecurityGroup] {
  const securityGroup = new SecurityGroupDirector(SecurityGroupBuilder).constructWebSecurityGroup(
    stack,
    'RdsSecurityGroup',
    vpc
  );

  const rdsInstance: rds.DatabaseInstance = new rds.DatabaseInstance(stack, names.rdsDatabaseName(resourceNamePrefix), {
    backupRetention: cdk.Duration.days(0),
    databaseName: names.rdsDatabaseName(resourceNamePrefix),
    engine: rds.DatabaseInstanceEngine.postgres({
      version: rds.PostgresEngineVersion.VER_16_6,
    }),
    instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.MICRO),
    multiAz: false,
    publiclyAccessible: false,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
    securityGroups: [securityGroup],
    storageType: rds.StorageType.STANDARD,
    vpc: vpc,
    vpcSubnets: {
      subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
    },
  });

  return [rdsInstance, securityGroup];
}
