import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import * as iam from 'aws-cdk-lib/aws-iam';
import { IConstruct, IDependable } from 'constructs';

export interface ICodeDeployServerStack extends IConstruct, IDependable {
  application?: codedeploy.ServerApplication;
  role?: iam.Role;
  ec2InstanceTags?: codedeploy.InstanceTagSet;
}
