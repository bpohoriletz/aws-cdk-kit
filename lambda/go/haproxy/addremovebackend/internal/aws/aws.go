package aws

import (
	"context"
	"errors"

	"github.com/aws/aws-sdk-go-v2/service/ec2"
	ec2Types "github.com/aws/aws-sdk-go-v2/service/ec2/types"
)

// EventBridgeEvent is minimal structure for EC2 instance launch event
// Sample events are within ./test folder
type EventBridgeEvent struct {
	Detail struct {
		InstanceID string `json:"EC2InstanceId"`
	} `json:"detail"`
}

// Introduced in order to use mock client in tests
// method name and signature from AWS SDK
// only one method of the class is used
type Ec2ApiClient interface {
	DescribeInstances(ctx context.Context, input *ec2.DescribeInstancesInput, opts ...func(*ec2.Options)) (*ec2.DescribeInstancesOutput, error)
}

func GetPrivateIPFunc(ctx context.Context, client Ec2ApiClient, instanceID string, filters []ec2Types.Filter) (string, error) {
	resp, err := client.DescribeInstances(ctx, &ec2.DescribeInstancesInput{
		InstanceIds: []string{instanceID},
		Filters:     filters,
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
