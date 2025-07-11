package aws_test

import (
	"context"
	"errors"
	"testing"

	"bpohoriletz.github.io/internaltool/internal/aws"
	"github.com/aws/aws-sdk-go-v2/service/ec2"
	ec2Types "github.com/aws/aws-sdk-go-v2/service/ec2/types"
)

// ------------------------------
// Stub EC2 client for GetPrivateIP
// ------------------------------
type stubEC2Client struct {
	privateIP string
	err       error
}

func (s stubEC2Client) DescribeInstances(ctx context.Context, input *ec2.DescribeInstancesInput, optFns ...func(*ec2.Options)) (*ec2.DescribeInstancesOutput, error) {
	if s.err != nil {
		return nil, s.err
	}
	return &ec2.DescribeInstancesOutput{
		Reservations: []ec2Types.Reservation{
			{
				Instances: []ec2Types.Instance{
					{
						InstanceId:       &input.InstanceIds[0],
						PrivateIpAddress: &s.privateIP,
					},
				},
			},
		},
	}, nil
}

// ------------------------------
// Test GetPrivateIP
// ------------------------------
func TestGetPrivateIP_Success(t *testing.T) {
	privateIP := "192.168.0.100"
	client := stubEC2Client{privateIP: privateIP}
	ip, err := aws.GetPrivateIPFunc(context.Background(), client, "i-test123", []ec2Types.Filter{})
	if err != nil {
		t.Fatalf("Unexpected error: %v", err)
	}

	if ip != privateIP {
		t.Errorf("Expected %s, got %s", privateIP, ip)
	}
}

func TestGetPrivateIP_Error(t *testing.T) {
	client := stubEC2Client{err: errors.New("fail")}
	_, err := aws.GetPrivateIPFunc(context.Background(), client, "i-test124", []ec2Types.Filter{})

	if err == nil {
		t.Fatalf("Expected error, got nil")
	}
}
