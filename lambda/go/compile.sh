GOOS=linux GOARCH=amd64 go build -o bootstrap main.go &&
  zip function.zip bootstrap
