package testutil

import (
	"errors"
	"os"
	"path/filepath"
	"runtime"
)

func StubAwsEvent(eventName string) ([]byte, error) {
	_, file, _, ok := runtime.Caller(0)
	if !ok {
		return []byte{}, errors.New("Failed to get caller info")
	}
	dir := filepath.Dir(file)        // folder containing this source file
	absDir, err := filepath.Abs(dir) // absolute path
	if err != nil {
		return []byte{}, err
	}
	path := filepath.Join(absDir, "events", eventName+".json")

	return os.ReadFile(path)
}
