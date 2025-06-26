package handler

import (
	"context"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/aws/aws-sdk-go-v2/service/ec2"
	ec2Types "github.com/aws/aws-sdk-go-v2/service/ec2/types"
)

// ------------------------------
// Test AddServerToBackend
// ------------------------------
func TestAddServerToBackend_Success(t *testing.T) {
	expectedServer := HapBackendServer{
		Name:    "test-server",
		Address: "10.0.0.1",
		Port:    443,
		SSL:     true,
		Check:   false,
	}
	expectedBackend := "test-backend"
	expectedToken := "dummy-token"

	var receivedPayload map[string]any

	mockAPI := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			t.Errorf("Expected POST, got %s", r.Method)
		}
		if !strings.Contains(r.URL.RawQuery, "backend="+expectedBackend) {
			t.Errorf("Unexpected query: %s", r.URL.RawQuery)
		}
		if r.Header.Get("Authorization") != "Bearer "+expectedToken {
			t.Errorf("Authorization header mismatch")
		}
		body, _ := io.ReadAll(r.Body)
		_ = json.Unmarshal(body, &receivedPayload)
		w.WriteHeader(http.StatusCreated)
	}))
	defer mockAPI.Close()

	err := AddServerToBackend(mockAPI.URL, expectedBackend, expectedServer, expectedToken)
	if err != nil {
		t.Fatalf("Unexpected error: %v", err)
	}

	if receivedPayload["ssl"] != true {
		t.Errorf("Expected ssl=true")
	}
	if receivedPayload["check"] != false {
		t.Errorf("Expected check=false")
	}
}

// ------------------------------
// Test AddServerToBackend error
// ------------------------------
func TestAddServerToBackend_Failure(t *testing.T) {
	mockAPI := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.Error(w, "internal", http.StatusInternalServerError)
	}))
	defer mockAPI.Close()

	err := AddServerToBackend(mockAPI.URL, "any", HapBackendServer{
		Name:    "fail",
		Address: "1.2.3.4",
		Port:    443,
		SSL:     true,
		Check:   false,
	}, "")
	if err == nil || !strings.Contains(err.Error(), "500") {
		t.Errorf("Expected 500 error, got: %v", err)
	}
}

// ------------------------------
// Stub EC2 client for getPrivateIP
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
// Test getPrivateIP
// ------------------------------
func TestGetPrivateIP_Success(t *testing.T) {
	client := stubEC2Client{privateIP: "192.168.0.100"}
	ip, err := getPrivateIP(context.Background(), client, "i-test123")
	if err != nil {
		t.Fatalf("Unexpected error: %v", err)
	}
	if ip != "192.168.0.100" {
		t.Errorf("Expected 192.168.0.100, got %s", ip)
	}
}

func TestGetPrivateIP_Error(t *testing.T) {
	client := stubEC2Client{err: errors.New("fail")}
	_, err := getPrivateIP(context.Background(), client, "i-test123")
	if err == nil {
		t.Fatalf("Expected error, got nil")
	}
}

// ------------------------------
// Stub handler test
// ------------------------------
func TestHandler_Success(t *testing.T) {
	// Stub server to simulate HAProxy API
	mockAPI := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusCreated)
	}))
	defer mockAPI.Close()

	// Set env for handler
	apiURL = mockAPI.URL
	backend = "test-backend"
	apiToken = ""

	// Use stub EC2 client via function injection
	originalGetPrivateIP := getPrivateIP
	getPrivateIP = func(ctx context.Context, client ec2Client, instanceID string) (string, error) {
		return "10.10.10.10", nil
	}
	defer func() { getPrivateIP = originalGetPrivateIP }()

	event := EventBridgeEvent{
		Detail: struct {
			InstanceID string "json:\"EC2InstanceId\""
		}{InstanceID: "i-abcdef123"},
	}
	msg, err := Handler(context.Background(), event)
	if err != nil {
		t.Fatalf("Handler failed: %v", err)
	}
	if !strings.Contains(msg, "Successfully added instance") {
		t.Errorf("Unexpected message: %s", msg)
	}
}

func TestHandler_Failure(t *testing.T) {
	event := EventBridgeEvent{
		Detail: struct {
			InstanceID string "json:\"EC2InstanceId\""
		}{InstanceID: ""},
	}
	_, err := Handler(context.Background(), event)
	if err == nil {
		t.Fatalf("Expected error for missing instance ID")
	}
}
