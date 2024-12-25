import { Stack } from "aws-cdk-lib";
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';

import { ServerApplication, ServerDeploymentGroup, InstanceTagSet } from "aws-cdk-lib/aws-codedeploy";
import * as con from "../naming/resources"

export function createDeploymentGroup(
  resourceNamePrefix: string[],
  application: ServerApplication,
  stack: Stack) : ServerDeploymentGroup {
    const resourceName: string = con.deploymentGroupName(resourceNamePrefix);

    const dg = new ServerDeploymentGroup(stack, resourceName, {
      application: application,
      deploymentGroupName: resourceName,
      //autoScalingGroups: [asg],
      // adds User Data that installs the CodeDeploy agent on your auto-scaling groups hosts
      // default: true
      installAgent: true,
      // adds EC2 instances matching tags
      ec2InstanceTags: new InstanceTagSet(
        {
          // any instance with tags satisfying
          // key1=v1 or key1=v2 or key2 (any value) or value v3 (any key)
          // will match this group
          'DeploymentGroupName': [resourceName],
        },
      ),
      // CloudWatch alarms
      // alarms: [cloudwatch.Alarm],
      // whether to ignore failure to fetch the status of alarms from CloudWatch
      // default: false
      ignorePollAlarmsFailure: false,
      // whether to skip the step of checking CloudWatch alarms during the deployment process
      // default: false
      // ignoreAlarmConfiguration: false,
      // auto-rollback configuration
      autoRollback: {
        failedDeployment: true, // default: true
        stoppedDeployment: true, // default: false
        //deploymentInAlarm: true, // default: true if you provided any alarms, false otherwise
      },
      // whether the deployment group was configured to have CodeDeploy install a termination hook into an Auto Scaling group
      // default: false
      // terminationHook: true,
    });

    return dg;
  }
