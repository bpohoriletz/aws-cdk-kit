import { Stack, CfnOutput } from "aws-cdk-lib";
import { Topic } from "aws-cdk-lib/aws-sns";
import * as cn from "../naming/resources";

export function createOrdersTopic(resourceNamePrefix: string[], stack: Stack) : Topic {
  const resourceName = cn.snsTopicName(resourceNamePrefix, "Orders");
  const topic = new Topic(stack, resourceName, {
    fifo: true
  });

  new CfnOutput(stack, "ordersTopicArn", { value: topic.topicArn });

  return topic;
}
