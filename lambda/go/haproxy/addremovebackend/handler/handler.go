package handler

import (
	"context"
	"fmt"
	"net"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/ec2"
	ec2Types "github.com/aws/aws-sdk-go-v2/service/ec2/types"
)

func getInstancePrivateIP(ctx context.Context, instanceName string) (string, error) {
	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		return "", fmt.Errorf("unable to load SDK config: %v", err)
	}

	ec2Client := ec2.NewFromConfig(cfg)

	input := &ec2.DescribeInstancesInput{
		Filters: []ec2Types.Filter{
			{
				Name:   aws.String("tag:Name"),
				Values: []string{instanceName},
			},
			{
				Name:   aws.String("instance-state-name"),
				Values: []string{"running"},
			},
		},
	}

	result, err := ec2Client.DescribeInstances(ctx, input)
	if err != nil {
		return "", fmt.Errorf("failed to describe instances: %v", err)
	}

	for _, reservation := range result.Reservations {
		for _, instance := range reservation.Instances {
			return *instance.PrivateIpAddress, nil
		}
	}

	return "", fmt.Errorf("no running instance found with name: %s", instanceName)
}

func tcpPing(address string, port string, timeout time.Duration) bool {
	target := net.JoinHostPort(address, port)
	conn, err := net.DialTimeout("tcp", target, timeout)
	if err != nil {
		return false
	}
	defer conn.Close()
	return true
}

func Handler(ctx context.Context) (string, error) {
	instanceName := "Parser/NonprodParserVpc/PublicSubnet1/NatInstance" // Replace with your EC2 Name tag value
	port := "22"
	timeout := 3 * time.Second

	ip, err := getInstancePrivateIP(ctx, instanceName)
	if err != nil {
		return "", err
	}

	reachable := tcpPing(ip, port, timeout)
	if reachable {
		return fmt.Sprintf("Instance %s (%s) is reachable on port %s", instanceName, ip, port), nil
	}
	return fmt.Sprintf("Instance %s (%s) is NOT reachable on port %s", instanceName, ip, port), nil
}
