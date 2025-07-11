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

// HapBackendServerConfig represents config data for HAProxy backend server
type HapBackendServerConfig struct {
	Name    string `json:"name"`
	Address string `json:"address"`
	Port    int    `json:"port"`
	SSL     string `json:"ssl"`
	Verify  string `json:"verify"` // false disables cert check
}

type HapTransaction struct {
	ID     string `json:"id"`
	Status string `json:"status"`
}

var transaction HapTransaction

func AddServerToBackend(apiURL string, serverConfig HapBackendServerConfig) error {
	// 1. Get config file version
	confVersion, err := getConfFileVersion(apiURL)
	if err != nil {
		return err
	}
	log.Printf("Using configuration version %d.", confVersion)
	// 2. Start transaction
	transaction, err := createTransaction(apiURL, confVersion)
	if err != nil {
		return err
	}
	log.Printf("Using transaction: %s", transaction.ID)
	// 3. Update server within transaction
	resp, err := updateBackend(apiURL, serverConfig)
	if err != nil {
		return err
	}
	log.Printf("Updated server: %s", resp)
	// 4. Commit transaction
	err = commitTransaction(apiURL, transaction.ID)
	if err != nil {
		return err
	}
	log.Printf("Transaction complete: %s", transaction.ID)

	return nil
}

func commitTransaction(apiURL, transactionID string) error {
	path := "/transactions/" + transactionID
	apiResp, apiErr := makeAPIRequest(apiURL, http.MethodPut, path, http.NoBody)
	if apiErr != nil {
		return fmt.Errorf("Failed! Error: %w", apiErr)
	}
	defer apiResp.Body.Close()

	return nil
}

func updateBackend(apiURL string, serverConfig HapBackendServerConfig) (string, error) {
	// TODO: try other API
	path := fmt.Sprintf("/configuration/backends/%s/servers/parser1?transaction_id=%s", serverConfig.Name, transaction.ID)

	payload := map[string]any{
		"name":    serverConfig.Name,
		"port":    serverConfig.Port,
		"address": serverConfig.Address,
		"ssl":     serverConfig.SSL,
		"verify":  serverConfig.Verify,
	}

	reqBody, err := json.Marshal(payload)
	if err != nil {
		return "", fmt.Errorf("Failed! Error: %w", err)
	}

	apiResp, apiErr := makeAPIRequest(apiURL, http.MethodPut, path, bytes.NewBuffer(reqBody))
	if apiErr != nil {
		return "", fmt.Errorf("Failed! Error: %w", apiErr)
	}
	defer apiResp.Body.Close()
	if resp, err := io.ReadAll(apiResp.Body); err == nil {
		return string(resp), nil
	} else {
		return "", err
	}
}

func createTransaction(apiURL string, confVersion int) (*HapTransaction, error) {
	var transaction = &HapTransaction{}
	path := "/transactions?version=" + strconv.Itoa(confVersion)
	apiResp, apiErr := makeAPIRequest(apiURL, http.MethodPost, path, http.NoBody)
	if apiErr != nil {
		return transaction, fmt.Errorf("Failed! Error: %w", apiErr)
	}
	defer apiResp.Body.Close()
	if err := json.NewDecoder(apiResp.Body).Decode(&transaction); err != nil {
		return transaction, fmt.Errorf("failed to decode transaction response: %w", err)
	}

	return transaction, nil
}

func getConfFileVersion(apiURL string) (int, error) {
	path := "/configuration/version"
	apiResp, apiErr := makeAPIRequest(apiURL, "GET", path, http.NoBody)
	if apiErr != nil {
		return 0, fmt.Errorf("Failed! Error: %w", apiErr)
	}
	defer apiResp.Body.Close()
	rspBody, apiErr := io.ReadAll(apiResp.Body)
	if apiErr != nil {
		return 0, fmt.Errorf("Failed! Error: %w", apiErr)
	}
	bodyString := string(rspBody)
	// Convert body string to integer
	confVersion, err := strconv.Atoi(strings.TrimSpace(bodyString))
	if err != nil {
		return 0, fmt.Errorf("Failed! Error: %w", err)
	}
	apiResp.Body.Read(rspBody)

	return confVersion, nil
}

func makeAPIRequest(apiURL string, method string, path string, body io.Reader) (*http.Response, error) {
	username, password := readCreadentials()
	url := apiURL + "/services/haproxy" + path
	req, err := http.NewRequest(method, url, body)
	if err != nil {
		log.Fatal(err)
	}
	req.SetBasicAuth(username, password)
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Printf("failed to %s to DataplaneAPI '%s'. Error: %v", method, path, err)
	}
	if resp.StatusCode >= 300 {
		return resp, fmt.Errorf("Failed! Status: %s. Request: %v.", resp.Status, req)
	}

	return resp, err
}

func readCreadentials() (string, string) {
	username := os.Getenv("DATAPLANEAPI_USERNAME")
	password := os.Getenv("DATAPLANEAPI_PASSWORD")
	return username, password
}
