package aws

import (
	"context"
	"errors"

	"github.com/aws/aws-sdk-go-v2/service/ec2"
)

// EventBridgeEvent is minimal structure for EC2 instance launch event
type EventBridgeEvent struct {
	Detail struct {
		InstanceID string `json:"EC2InstanceId"`
	} `json:"detail"`
}

type ec2Client interface {
	DescribeInstances(ctx context.Context, input *ec2.DescribeInstancesInput, opts ...func(*ec2.Options)) (*ec2.DescribeInstancesOutput, error)
}

func GetPrivateIPFunc(ctx context.Context, client ec2Client, instanceID string) (string, error) {
	resp, err := client.DescribeInstances(ctx, &ec2.DescribeInstancesInput{
		InstanceIds: []string{instanceID},
	})
	if err != nil {
		return "", err
	}
	for _, res := range resp.Reservations {
		for _, inst := range res.Instances {
			if inst.InstanceId != nil && *inst.InstanceId == instanceID {
				if inst.PrivateIpAddress != nil {
					return *inst.PrivateIpAddress, nil
				}
				return "", errors.New("private IP not found")
			}
		}
	}
	return "", errors.New("instance not found")
}
