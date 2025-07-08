package dataplane

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
)

// HapBackendServer represents server data for HAProxy backend
type HapBackendServer struct {
	Name    string `json:"name"`
	Address string `json:"address"`
	Port    int    `json:"port"`
	SSL     string `json:"ssl"`
	Verify  string `json:"verify"` // false disables cert check
}

var txn struct {
	ID string `json:"id"`
}

func AddServerToBackend(apiURL, backendName string, server HapBackendServer, apiToken string) error {
	// Read credentials from environment
	username := os.Getenv("DATAPLANEAPI_USERNAME")
	password := os.Getenv("DATAPLANEAPI_PASSWORD")
	// Version
	url := apiURL + "/services/haproxy/configuration/version"
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Fatal(err)
	}
	req.SetBasicAuth(username, password)
	client := &http.Client{}
	confResp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("failed to get current config version from HAProxy: %w", err)
	}
	defer confResp.Body.Close()
	bodyBytes, err := io.ReadAll(confResp.Body)
	if err != nil {
		return fmt.Errorf("failed to get current config version from response: %w", err)
	}
	bodyString := string(bodyBytes)
	// Convert body string to integer
	version, err := strconv.Atoi(strings.TrimSpace(bodyString))
	confVersion := strconv.Itoa(version)
	if err != nil {
		return fmt.Errorf("Failed to convert response to int: %v", err)
	} else {
		log.Printf("Using version: %d", version)
	}
	// Transtaction
	url = apiURL + "/services/haproxy/transactions?version=" + confVersion
	req, err = http.NewRequest(http.MethodPost, url, http.NoBody)
	req.SetBasicAuth(username, password)

	client = &http.Client{}
	txnResp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("failed to start transaction: %w", err)
	}
	defer txnResp.Body.Close()
	if txnResp.StatusCode >= 300 {
		return fmt.Errorf("haproxy API error: %s", txnResp.Status)
	}
	if err := json.NewDecoder(txnResp.Body).Decode(&txn); err != nil {
		return fmt.Errorf("failed to decode transaction response: %w", err)
	} else {
		log.Printf("Using transaction: %s", txn.ID)
	}
	// Server
	url = fmt.Sprintf("%s/services/haproxy/configuration/backends/%s/servers/parser1?transaction_id=%s", apiURL, backendName, txn.ID)

	payload := map[string]any{
		"name":    "parser1",
		"port":    server.Port,
		"address": server.Address,
		"ssl":     server.SSL,
		"verify":  server.Verify,
	}

	body, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	req, err = http.NewRequest(http.MethodPut, url, bytes.NewBuffer(body))
	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")
	if apiToken != "" {
		req.Header.Set("Authorization", "Bearer "+apiToken)
	} else {
		req.SetBasicAuth(username, password)
	}

	client = &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 300 {
		return fmt.Errorf("haproxy API error: %s", resp.Status)
	}

	// Commit
	url = fmt.Sprintf("%s/services/haproxy/transactions/%s", apiURL, txn.ID)
	req, err = http.NewRequest(http.MethodPut, url, http.NoBody)
	req.SetBasicAuth(username, password)

	client = &http.Client{}
	txnResp, err = client.Do(req)
	if err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}
	defer txnResp.Body.Close()
	if txnResp.StatusCode >= 300 {
		return fmt.Errorf("HAProxy API error: %s", txnResp.Status)
	}

	return nil
}
