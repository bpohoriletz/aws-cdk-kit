package handler

import (
	"context"
	"reflect"
	"testing"
)

func TestHandler(t *testing.T) {
	t.Run("Responds with 200", func(t *testing.T) {
		event := map[string]string{
			"key1": "value1",
			"key2": "value2",
			"key3": "value3",
		}
		got, _ := Handler(context.Background(), event)
		want := map[string]any{
			"statusCode": 200,
			"body":       "Sample function was run.",
		}

		if !reflect.DeepEqual(got, want) {
			t.Logf("Got %q, want %q", &got, want)
			t.Fail()
		}
	})
}
