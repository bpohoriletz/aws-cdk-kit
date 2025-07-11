package handler

import (
	"context"
	"encoding/json"
	"net/http/httptest"
	"strings"
	"testing"

	"bpohoriletz.github.io/internaltool/internal/aws"
	"bpohoriletz.github.io/internaltool/internal/dataplane"
	"bpohoriletz.github.io/internaltool/testutil"
	ec2Types "github.com/aws/aws-sdk-go-v2/service/ec2/types"
)

// ------------------------------
// Stub handler test
// ------------------------------
var dataplaneServer = dataplane.HapBackendServerConfig{
	Name:    backend,
	Address: "10.0.0.1",
	Port:    443,
	SSL:     "enabled",
	Verify:  "none",
}

func TestHandler_Success(t *testing.T) {
	// Stub server to simulate HAProxy API
	mockAPI := httptest.NewServer(testutil.PrepareBackend(t, dataplaneServer.Name))
	defer mockAPI.Close()
	// Set env for handler
	apiURL = mockAPI.URL
	backend = "test-backend"

	// Use stub EC2 client via function injection
	originalGetPrivateIP := getPrivateIP
	getPrivateIP = func(ctx context.Context, client aws.Ec2ApiClient, instanceID string, filters []ec2Types.Filter) (string, error) {
		return "10.10.10.10", nil
	}
	defer func() { getPrivateIP = originalGetPrivateIP }()

	t.Run("launch", func(t *testing.T) {
		var event = aws.EventBridgeEvent{}
		loadEvent(t, &event, "ec2_launch")

		msg, err := Handler(context.Background(), event)
		assertSuccess(t, err, msg)
	})

	t.Run("terminate", func(t *testing.T) {
		var event = aws.EventBridgeEvent{}
		loadEvent(t, &event, "ec2_terminate")

		msg, err := Handler(context.Background(), event)
		assertSuccess(t, err, msg)
	})
}

func TestHandler_Failure(t *testing.T) {
	event := aws.EventBridgeEvent{
		Detail: struct {
			InstanceID string "json:\"EC2InstanceId\""
		}{InstanceID: ""},
	}

	_, err := Handler(context.Background(), event)

	if err == nil {
		t.Fatalf("Expected error for missing instance ID")
	}
}

func assertSuccess(t *testing.T, err error, msg string) {
	if err != nil {
		t.Fatalf("Handler failed: %v", err)
	}
	if !strings.Contains(msg, "Successfully added instance") {
		t.Errorf("Unexpected message: %s", msg)
	}
}

func loadEvent(t *testing.T, event *aws.EventBridgeEvent, eventName string) {
	eventJson, err := testutil.StubAwsEvent(eventName)
	if err != nil {
		t.Fatalf("Event loading failed! %v", err)
	}
	err = json.Unmarshal(eventJson, &event)
	if err != nil {
		t.Fatalf("Event parsing failed! %v", err)
	}
}
