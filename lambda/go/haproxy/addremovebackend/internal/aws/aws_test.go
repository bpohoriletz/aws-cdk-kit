package aws

import (
	"context"
	"errors"
	"testing"

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
	client := stubEC2Client{privateIP: "192.168.0.100"}
	ip, err := GetPrivateIP(context.Background(), client, "i-test123")
	if err != nil {
		t.Fatalf("Unexpected error: %v", err)
	}
	if ip != "192.168.0.100" {
		t.Errorf("Expected 192.168.0.100, got %s", ip)
	}
}

func TestGetPrivateIP_Error(t *testing.T) {
	client := stubEC2Client{err: errors.New("fail")}
	_, err := GetPrivateIP(context.Background(), client, "i-test123")
	if err == nil {
		t.Fatalf("Expected error, got nil")
	}
}
