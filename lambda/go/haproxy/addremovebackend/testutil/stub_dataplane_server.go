package testutil

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"slices"
	"strings"
	"testing"

	"bpohoriletz.github.io/internaltool/internal/dataplane"
)

func PrepareBackend(t *testing.T, backendName string) *http.ServeMux {
	os.Setenv("DATAPLANEAPI_USERNAME", "admin")
	os.Setenv("DATAPLANEAPI_PASSWORD", "adminpwd")
	mux := http.NewServeMux()
	mux.HandleFunc("/services/haproxy/configuration/version", func(w http.ResponseWriter, r *http.Request) {
		verifyRequest(t, r)
		w.Write([]byte("2\n"))
	})
	mux.HandleFunc("/services/haproxy/transactions/", func(w http.ResponseWriter, r *http.Request) {
		verifyRequest(t, r)
		responsePayload := dataplane.HapTransaction{
			ID:     "273e3385-2d0c-4fb1-aa27-93cbb31ff203",
			Status: "in_progress",
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(responsePayload)
	})
	mux.HandleFunc("/services/haproxy/configuration/backends/"+backendName+"/servers/parser1", func(w http.ResponseWriter, r *http.Request) {
		verifyRequest(t, r)
		responsePayload := map[string]any{
			"address": "10.1.1.1",
			"name":    "www",
			"port":    8080,
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(responsePayload)
	})

	return mux
}

func verifyRequest(t *testing.T, r *http.Request) {
	allowedMethods := []string{http.MethodGet, http.MethodPost, http.MethodPut}
	expectedToken := "YWRtaW46YWRtaW5wd2Q="

	if !slices.Contains(allowedMethods, r.Method) {
		t.Errorf("Expected one of %v, got [%v]", allowedMethods, r.Method)
	}
	if !strings.Contains(r.URL.Path, "/services/haproxy") {
		t.Errorf("Unexpected URL: %s", r.URL)
	}
	if r.Header.Get("Authorization") != "Basic "+expectedToken {
		t.Errorf("Authorization header mismatch")
	}
	fmt.Printf("Processing %s %s \n", r.Method, r.URL)
}
