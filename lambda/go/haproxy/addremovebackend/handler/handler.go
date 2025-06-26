package handler

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/ec2"
)

// HapBackendServer represents server data for HAProxy backend
type HapBackendServer struct {
	Name    string `json:"name"`
	Address string `json:"address"`
	Port    int    `json:"port"`
	SSL     bool   `json:"ssl"`
	Check   bool   `json:"check"` // false disables health check
}

// EventBridgeEvent is minimal structure for EC2 instance launch event
type EventBridgeEvent struct {
	Detail struct {
		InstanceID string `json:"EC2InstanceId"`
	} `json:"detail"`
}

var (
	// Configure your HAProxy Data Plane API URL, backend name and API token via env vars
	apiURL   = os.Getenv("HAPROXY_API_URL")   // e.g. http://localhost:5555/v2/services/haproxy/configuration
	backend  = os.Getenv("HAPROXY_BACKEND")   // e.g. mybackend
	apiToken = os.Getenv("HAPROXY_API_TOKEN") // optional
)

type ec2Client interface {
	DescribeInstances(ctx context.Context, input *ec2.DescribeInstancesInput, opts ...func(*ec2.Options)) (*ec2.DescribeInstancesOutput, error)
}

func getPrivateIPFunc(ctx context.Context, client ec2Client, instanceID string) (string, error) {
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

var getPrivateIP = getPrivateIPFunc

func AddServerToBackend(apiURL, backendName string, server HapBackendServer, apiToken string) error {
	url := fmt.Sprintf("%s/servers?backend=%s", apiURL, backendName)

	payload := map[string]interface{}{
		"name":    server.Name,
		"address": server.Address,
		"port":    server.Port,
	}

	if server.SSL {
		payload["ssl"] = true
	}

	// Disable health check by setting check = false
	if !server.Check {
		payload["check"] = false
	}

	body, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	req, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(body))
	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")
	if apiToken != "" {
		req.Header.Set("Authorization", "Bearer "+apiToken)
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 300 {
		return fmt.Errorf("haproxy API error: %s", resp.Status)
	}

	return nil
}

func Handler(ctx context.Context, event EventBridgeEvent) (string, error) {
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
		return "", fmt.Errorf("failed to get private IP: %w", err)
	}

	server := HapBackendServer{
		Name:    instanceID,
		Address: privateIP,
		Port:    443,
		SSL:     true,
		Check:   false,
	}

	err = AddServerToBackend(apiURL, backend, server, apiToken)
	if err != nil {
		return "", fmt.Errorf("failed to add server to HAProxy: %w", err)
	}

	return fmt.Sprintf("Successfully added instance %s with IP %s to backend %s", instanceID, privateIP, backend), nil
}
