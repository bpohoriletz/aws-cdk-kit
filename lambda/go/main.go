package main

import (
	"context"
	"fmt"

	"github.com/aws/aws-lambda-go/lambda"
)

func handler(ctx context.Context, event any) (map[string]any, error) {
	fmt.Println("Received event:", event)

	return map[string]any{
		"statusCode": 200,
		"body":       "Sample function was run.",
	}, nil
}

func main() {
	lambda.Start(handler)
}
