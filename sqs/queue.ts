import { Stack, CfnOutput } from 'aws-cdk-lib';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { SqsSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import * as cn from '../utils/naming';

export function createOrdersQueue(resourceNamePrefix: string[], topic: Topic, stack: Stack): Queue {
  const resourceName = cn.sqsQueueName(resourceNamePrefix, 'Orders');
  const queue = new Queue(stack, resourceName, {
    fifo: true,
  });
  // Bind the SQS Queue to the SNS Topic.
  const subscription = new SqsSubscription(queue, {
    rawMessageDelivery: true,
  });
  topic.addSubscription(subscription);

  new CfnOutput(stack, 'ordersQueueArn', { value: queue.queueArn });

  return queue;
}
