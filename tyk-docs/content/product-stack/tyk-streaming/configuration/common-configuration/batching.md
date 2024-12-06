---
title: Batching
description: Explains configuration settings required for batching, e,g batch size, time interval etc. in addition to how to optimize the performance and efficiency of how data is batched before being sent to the destination.
tags: [ "Tyk Streams", "Batching" ]
---

Tyk Streams is able to join sources and sinks with sometimes conflicting batching behaviours without sacrificing its strong delivery guarantees. Therefore, batching within Tyk Streams is a mechanism that serves multiple purposes:

1. [Performance (throughput)](#performance)
2. [Compatibility (mixing multi and single part message protocols)](#compatibility)

## Performance

For most users the only benefit of batching messages is improving throughput over your output protocol. For some protocols this can happen in the background and requires no configuration from you. However, if an output has a `batching` configuration block this means it benefits from batching and requires you to specify how you'd like your batches to be formed by configuring a [batching policy](#batch-policy):

```yaml
output:
  kafka:
    addresses: [ todo:9092 ]
    topic: tyk_stream

    # Either send batches when they reach 10 messages or when 100ms has passed
    # since the last batch.
    batching:
      count: 10
      period: 100ms
```

However, a small number of inputs such as [kafka]({{< ref "/product-stack/tyk-streaming/configuration/inputs/kafka" >}}) must be consumed sequentially (in this case by partition) and therefore benefit from specifying your batch policy at the input level instead:

```yaml
input:
  kafka:
    addresses: [ todo:9092 ]
    topics: [ tyk_input_stream ]
    batching:
      count: 10
      period: 100ms

output:
  kafka:
    addresses: [ todo:9092 ]
    topic: tyk_stream
```

Inputs that behave this way are documented as such and have a `batching` configuration block.

Sometimes you may prefer to create your batches before processing, in which case if your input doesn't already support [a batch policy](#batch-policy) you can instead use a [broker]({{< ref "/product-stack/tyk-streaming/configuration/inputs/broker" >}}), which also allows you to combine inputs with a single batch policy:

```yaml
input:
  broker:
    inputs:
      - resource: foo
      - resource: bar
    batching:
      count: 50
      period: 500ms
```

This also works the same with [output brokers]({{< ref "/product-stack/tyk-streaming/configuration/outputs/broker" >}}).

## Compatibility

Tyk Streams is able to read and write over protocols that support multiple part messages, and all payloads travelling through Tyk Streams are represented as a multiple part message. Therefore, all components within Tyk Streams are able to work with multiple parts in a message as standard.

When messages reach an output that *doesn't* support multiple parts the message is broken down into an individual message per part, and then one of two behaviours happen depending on the output. If the output supports batch sending messages then the collection of messages are sent as a single batch. Otherwise, Tyk Streams falls back to sending the messages sequentially in multiple, individual requests.

This behaviour means that not only can multiple part message protocols be easily matched with single part protocols, but also the concept of multiple part messages and message batches are interchangeable within Tyk Streams.

## Batch Policy

When an input or output component has a config field `batching` that means it supports a batch policy. This is a mechanism that allows you to configure exactly how your batching should work on messages before they are routed to the input or output it's associated with. Batches are considered complete and will be flushed downstream when either of the following conditions are met:


- The `byte_size` field is non-zero and the total size of the batch in bytes matches or exceeds it (disregarding metadata.)
- The `count` field is non-zero and the total number of messages in the batch matches or exceeds it.
- The `period` field is non-empty and the time since the last batch exceeds its value.

This allows you to combine conditions:

```yaml
output:
  kafka:
    addresses: [ todo:9092 ]
    topic: tyk_stream

    # Either send batches when they reach 10 messages or when 100ms has passed
    # since the last batch.
    batching:
      count: 10
      period: 100ms
```

{{< note >}}
**Note**
A batch policy has the capability to *create* batches, but not to break them down.

{{</ note>}}

If your configured pipeline is processing messages that are batched *before* they reach the batch policy then they may circumvent the conditions you've specified here, resulting in sizes you aren't expecting.
