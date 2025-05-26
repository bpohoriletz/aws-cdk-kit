package signal_up

import (
	"context"
	"log"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func ListS3Objects(bucket, region string) error {
	var err error
	var cfg aws.Config
	var output *s3.ListObjectsV2Output

	if cfg, err = config.LoadDefaultConfig(context.TODO(), config.WithRegion(region), config.WithSharedConfigProfile("my")); err != nil {
		log.Print(err)

		return err
	}

	// create an AWS S3 client
	client := s3.NewFromConfig(cfg)
	if output, err = client.ListObjectsV2(context.TODO(), &s3.ListObjectsV2Input{
		Bucket: aws.String(bucket),
	}); err != nil {
		log.Print(err)
		return err
	}
	log.Println("First page results")

	for _, object := range output.Contents {
		log.Printf("key=%s, size=%d", aws.ToString(object.Key), *object.Size)
	}

	return nil
}
