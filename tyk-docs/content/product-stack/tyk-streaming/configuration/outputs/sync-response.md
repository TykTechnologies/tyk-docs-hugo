---
title: Sync Response
description: Explains an overview of configuring sync_response output
tags: [ "Tyk Streams", "Stream Outputs", "Outputs", "sync_response", "Sync Response" ]
---

Returns the final message payload back to the input origin of the message, where it is dealt with according to that specific input type.

```yml
# Config fields, showing default values
output:
  label: ""
  sync_response: {}
```

For most inputs this mechanism is ignored entirely, in which case the sync response is dropped without penalty. It is therefore safe to use this output even when combining input types that might not have support for sync responses. An example of an input able to utilise this is [http_server]({{< ref "/product-stack/tyk-streaming/configuration/inputs/http-server" >}}).

It is safe to combine this output with others using broker types. For example, with the [http_server]({{< ref "/product-stack/tyk-streaming/configuration/inputs/http-server" >}}) input we could send the payload to a Kafka topic and also send a modified payload back with:

```yaml
input:
  http_server:
    path: /post
output:
  broker:
    pattern: fan_out
    outputs:
      - kafka:
          addresses: [ TODO:9092 ]
          topic: foo_topic
      - sync_response: {}
        processors:
          - mapping: 'root = content().uppercase()'
```

Using the above example and POSTING the message *hello world* to the endpoint `/post` Tyk Streams would send it unchanged to the topic `foo_topic` and also respond with *HELLO WORLD*.

For more information please read the [Synchronous Responses]({{< ref "/product-stack/tyk-streaming/guides/sync-responses" >}}) guide.
