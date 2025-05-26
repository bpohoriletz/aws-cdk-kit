package signal_up_test

import (
	signal_up "ec2"
	"testing"
)

func TestListS3(t *testing.T) {
	t.Run("Default bucket", func(t *testing.T) {
		err := signal_up.ListS3Objects("nonprod-parser", "us-east-1")

		if err != nil {
			t.Fail()
		}
	})
}
