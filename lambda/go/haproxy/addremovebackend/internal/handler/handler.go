package handler

import (
	"context"
	"errors"
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/ec2"
	ec2Types "github.com/aws/aws-sdk-go-v2/service/ec2/types"

	"bpohoriletz.github.io/internaltool/internal/aws"
	"bpohoriletz.github.io/internaltool/internal/dataplane"
)

var (
	apiURL  = os.Getenv("HAPROXY_API_URL") // e.g. http://localhost:5555/v3
	backend = os.Getenv("HAPROXY_BACKEND") // e.g. mybackend
)

var getPrivateIP = aws.GetPrivateIPFunc

func Handler(ctx context.Context, event aws.EventBridgeEvent) (string, error) {
	// TODO: Implement remove backend after on terminate after new API endpoint  <11-07-25, Me> //
	instanceID := event.Detail.InstanceID
	if instanceID == "" {
		return "", errors.New("instance-id not found in event detail")
	}
	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		return "", fmt.Errorf("Failed to load AWS config: %w", err)
	}

	ec2Client := ec2.NewFromConfig(cfg)
	// TODO: Handle Context inside  <11-07-25, Me> //
	privateIP, err := getPrivateIP(ctx, ec2Client, instanceID, []ec2Types.Filter{})
	if err != nil {
		return "", fmt.Errorf("Failed to get private IP of %s: %w", instanceID, err)
	}
	serverConfig := dataplane.HapBackendServerConfig{
		Name:    backend,
		Address: privateIP,
		Port:    443,
		SSL:     "enabled",
		Verify:  "none",
	}

	// TODO: Handle Context inside  <11-07-25, Me> //
	err = dataplane.AddServerToBackend(apiURL, serverConfig)
	if err != nil {
		return "", fmt.Errorf("Failed to add server to HAProxy: %w", err)
	}

	return fmt.Sprintf("Successfully added instance %s with IP %s to backend %s", instanceID, privateIP, backend), nil
}
