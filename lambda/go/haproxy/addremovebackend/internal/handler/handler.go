package handler

import (
	"context"
	"errors"
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/ec2"

	"bpohoriletz.github.io/internaltool/internal/aws"
	"bpohoriletz.github.io/internaltool/internal/dataplane"
)

var (
	// Configure your HAProxy Data Plane API URL, backend name and API token via env vars
	apiURL   = os.Getenv("HAPROXY_API_URL")   // e.g. http://localhost:5555/v2/services/haproxy/configuration
	backend  = os.Getenv("HAPROXY_BACKEND")   // e.g. mybackend
	apiToken = os.Getenv("HAPROXY_API_TOKEN") // optional
)

var getPrivateIP = aws.GetPrivateIPFunc

func Handler(ctx context.Context, event aws.EventBridgeEvent) (string, error) {
	instanceID := event.Detail.InstanceID
	if instanceID == "" {
		return "", errors.New("instance-id not found in event detail")
	}

	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		return "", fmt.Errorf("failed to load AWS config: %w", err)
	}

	ec2Client := ec2.NewFromConfig(cfg)

	privateIP, err := getPrivateIP(ctx, ec2Client, instanceID)
	if err != nil {
		return "", fmt.Errorf("failed to get private IP of %s: %w", instanceID, err)
	}

	server := dataplane.HapBackendServer{
		//Name:    instanceID,
		Address: privateIP,
		Port:    443,
		SSL:     "enabled",
		Verify:  "none",
	}

	err = dataplane.AddServerToBackend(apiURL, backend, server, apiToken)
	if err != nil {
		return "", fmt.Errorf("failed to add server to HAProxy: %w", err)
	}

	return fmt.Sprintf("Successfully added instance %s with IP %s to backend %s", instanceID, privateIP, backend), nil
}
