---
title: Processors
description: Explains an overview of processors
tags: [ "Tyk Streams", "Stream Processors", "Processors" ]
---

Tyk Streams processors are functions applied to messages passing through a pipeline. The function signature allows a processor to mutate or drop messages depending on the content of the message. There are many types on offer but the most powerful are the [mapping]({{< ref "/product-stack/tyk-streaming/configuration/processors/mapping" >}}) and [mutation]({{< ref "/product-stack/tyk-streaming/configuration/processors/mutation" >}}) processors.

Processors are set via config, and depending on where in the config they are placed they will be run either immediately after a specific input (set in the input section), on all messages (set in the pipeline section) or before a specific output (set in the output section). Most processors apply to all messages and can be placed in the pipeline section:

```yaml
pipeline:
  threads: 1
  processors:
    - label: my_mapping
      mapping: |
        root.message = this
        root.meta.link_count = this.links.length()
```

The `threads` field in the pipeline section determines how many parallel processing threads are created. You can read more about parallel processing in the [pipeline guide]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/processing-pipelines" >}}).

## Labels

<!-- 

TODO: Replace paragraph below in subsequent iteration when know if metrics supported from product

Processors have an optional field `label` that can uniquely identify them in observability data such as metrics and logs. This can be useful when running configs with multiple nested processors, otherwise their metrics labels will be generated based on their composition. For more information check out the [metrics documentation].

-->

Processors have an optional field `label` that can uniquely identify them in observability data such as metrics and logs.

## Error Handling

Some processors have conditions whereby they might fail. Rather than throw these messages into the abyss Tyk Streams still attempts to send these messages onwards, and has mechanisms for filtering, recovering or dead-letter queuing messages that have failed which can be read about in the [error handling]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/error-handling" >}}) section.

### Error Logs

Errors that occur during processing can be roughly separated into two groups; those that are unexpected intermittent errors such as connectivity problems and those that are logical errors such as bad input data or unmatched schemas.

All processing errors result in the messages being flagged as failed and debug level logs being emitted that describe the error. Only errors that are known to be intermittent are also logged at the error level.

<!-- 

TODO: Subsequent iteration when know if metrics supported from product

All processing errors result in the messages being flagged as failed, [error metrics][metrics.about] increasing for the given errored processor, and debug level logs being emitted that describe the error. Only errors that are known to be intermittent are also logged at the error level.

-->

The reason for this behavior is to prevent noisy logging in cases where logical errors are expected and will likely be [handled in config]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/error-handling" >}}). However, this can also sometimes make it easy to miss logical errors in your configs when they lack error handling. 

<!-- We cannot include this yet until CLI and config functionality is provided

If you suspect you are experiencing processing errors and do not wish to add error handling yet then a quick and easy way to expose those errors is to enable debug level logs with the cli flag `--log.level=debug` or by setting the level in config:

```yaml
logger:
  level: DEBUG
```
-->

## Using Processors as Outputs

It might be the case that a processor that results in a side effect, such as the [redis]({{< ref "/product-stack/tyk-streaming/configuration/processors/redis" >}}) processor, is the only side effect of a pipeline, and therefore could be considered the output.

In such cases it's possible to place these processors within a [reject]({{< ref "/product-stack/tyk-streaming/configuration/outputs/reject" >}}) output so that they behave the same as regular outputs, where success results in dropping the message with an acknowledgement and failure results in a nack (or retry):

```yaml
output:
  reject: 'failed to send data: ${! error() }'
  processors:
    - try:
        - redis:
            url: tcp://localhost:6379
            command: sadd
            args_mapping: 'root = [ this.key, this.value ]'
        - mapping: root = deleted()
```

The way this works is that if your processor with the side effect (`redis` in this case) succeeds then the final `mapping` processor deletes the message which results in an acknowledgement. If the processor fails then the `try` block exits early without executing the `mapping` processor and instead the message is routed to the `reject` output, which nacks the message with an error message containing the error obtained from the `redis` processor.

## Batching and Multiple Part Messages

All Tyk Streams processors support multiple part messages, which are synonymous with batches.

<!-- TODO: Add referring link to windowed_processing when determine from product if this feature is supported 

All Tyk Streams processors support multiple part messages, which are synonymous with batches. This enables some cool [windowed processing][windowed_processing] capabilities.

-->

Many processors are able to perform their behaviors on specific parts of a message batch, or on all parts, and have a field `parts` for specifying an array of part indexes they should apply to. If the list of target parts is empty these processors will be applied to all message parts.

Part indexes can be negative, and if so the part will be selected from the end counting backwards starting from -1. E.g. if part = -1 then the selected part will be the last part of the message, if part = -2 then the part before the last element will be selected, and so on.

Some processors such as [dedupe]({{< ref "/product-stack/tyk-streaming/configuration/processors/dedupe" >}}) act across an entire batch, when instead we might like to perform them on individual messages of a [batch]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/batching" >}}). In this case the [for_each]({{< ref "/product-stack/tyk-streaming/configuration/processors/for-each" >}}) processor can be used.
