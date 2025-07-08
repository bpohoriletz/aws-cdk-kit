package handler

import (
	"context"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

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
