import { Stack, RemovalPolicy } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as naming from '../utils/naming';

export function createPrivateBucket(resourceNamePrefix: string[], stack: Stack): s3.Bucket {
  const resourceName = naming.s3BucketName(resourceNamePrefix);
  const bucket = new s3.Bucket(stack, resourceName, {
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    bucketName: resourceName,
    versioned: false,
    removalPolicy: RemovalPolicy.RETAIN,
  });

  return bucket;
}

export function createEbBucket(name: string, stack: Stack): s3.Bucket {
  const bucket = new s3.Bucket(stack, name, {
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    bucketName: name,
    objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_PREFERRED,
    versioned: false,
    removalPolicy: RemovalPolicy.DESTROY,
  });

  return bucket;
}
