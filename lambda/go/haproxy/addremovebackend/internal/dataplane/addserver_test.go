package dataplane_test

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"bpohoriletz.github.io/internaltool/internal/dataplane"
	"bpohoriletz.github.io/internaltool/testutil"
)

var dataplaneServer = dataplane.HapBackendServerConfig{
	Name:    "test-server",
	Address: "10.0.0.1",
	Port:    443,
	SSL:     "enabled",
	Verify:  "none",
}

func TestAddServerToBackend_Success(t *testing.T) {
	mockDataplaneServer := httptest.NewServer(testutil.PrepareBackend(t, dataplaneServer.Name))

	if err := dataplane.AddServerToBackend(mockDataplaneServer.URL, dataplaneServer); err != nil {
		t.Fatalf("Unexpected error: %v", err)
	}
}

func TestAddServerToBackend_Failure(t *testing.T) {
	mockAPI := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.Error(w, "1\n", http.StatusInternalServerError)
	}))
	defer mockAPI.Close()

	if err := dataplane.AddServerToBackend(mockAPI.URL, dataplaneServer); err == nil || !strings.Contains(err.Error(), "500") {
		t.Errorf("Expected 500 error, got: %v", err)
	}
}
