package dataplane

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

// ------------------------------
// Test AddServerToBackend
// ------------------------------
func TestAddServerToBackend_Success(t *testing.T) {
	expectedServer := HapBackendServer{
		Name:    "test-server",
		Address: "10.0.0.1",
		Port:    443,
		SSL:     "enabled",
		Verify:  "none",
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
		SSL:     "enabled",
		Verify:  "none",
	}, "")
	if err == nil || !strings.Contains(err.Error(), "500") {
		t.Errorf("Expected 500 error, got: %v", err)
	}
}
