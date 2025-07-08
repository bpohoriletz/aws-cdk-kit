package main

import (
	"bpohoriletz.github.io/internaltool/internal/handler"
	"github.com/aws/aws-lambda-go/lambda"
)

func main() {
	lambda.Start(handler.Handler)
}
