import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

export function createGithubCdUser(stack: cdk.Stack): iam.User {
  const name = 'GitHub-CD';
  const user = new iam.User(stack, name, {
    userName: name,
  });

  user.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSElasticBeanstalkWebTier'));
  user.addManagedPolicy(
    iam.ManagedPolicy.fromAwsManagedPolicyName('AWSElasticBeanstalkManagedUpdatesCustomerRolePolicy')
  );

  return user;
}
