package handler

import (
	"context"
	"fmt"
)

func Handler(ctx context.Context, event any) (map[string]any, error) {
	fmt.Println("Received event:", event)

	return map[string]any{
		"statusCode": 200,
		"body":       "Sample function was run.",
	}, nil
}
