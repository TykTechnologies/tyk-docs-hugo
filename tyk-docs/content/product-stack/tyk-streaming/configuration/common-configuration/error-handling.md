---
title: Error handling
description: Explains error handling
tags: [ "Tyk Streams", "Error Handling" ]
---

Tyk Streams supports a range of processors such as `aws_lambda` that have the potential to fail if their retry attempts are exhausted. When this happens the data is not dropped but instead continues through the pipeline mostly unchanged, but a metadata flag is added allowing you to handle the errors in a way that suits your needs.

This document outlines common patterns for dealing with errors, such as dropping them, recovering them with more processing, routing them to a dead-letter queue, or any combination thereof.

## Abandon on Failure

It's possible to define a list of processors which should be skipped for messages that failed a previous stage using the try processor:

```yaml
pipeline:
  processors:
    - try:
      - resource: foo
      - resource: bar # Skipped if foo failed
      - resource: baz # Skipped if foo or bar failed
```

## Recover Failed Messages

Failed messages can be fed into their own processor steps with a catch:

```yaml
pipeline:
  processors:
    - resource: foo # Processor that might fail
    - catch:
      - resource: bar # Recover here
```

Once messages finish the catch block they will have their failure flags removed and are treated like regular messages. If this behavior is not desired then it is possible to simulate a catch block with a switch processor:

```yaml
pipeline:
  processors:
    - resource: foo # Processor that might fail
    - switch:
      - check: errored()
        processors:
          - resource: bar # Recover here
```

## Logging Errors

<!-- TODO Need to add link to error when complete -->
When an error occurs there will occasionally be useful information stored within the error flag that can be exposed with the interpolation function `error`. This allows you to expose the information with processors.

<!-- TODO need to add link to log when complete -->
For example, when catching failed processors you can `log` the messages:

```yaml
pipeline:
  processors:
    - resource: foo # Processor that might fail
    - catch:
      - log:
          message: "Processing failed due to: ${!error()}"
```

Or perhaps augment the message payload with the error message:

```yaml
pipeline:
  processors:
    - resource: foo # Processor that might fail
    - catch:
      - mapping: |
          root = this
          root.meta.error = error()
```

## Attempt Until Success

<!-- TODO Need to add link to error when complete -->
It's possible to reattempt a processor for a particular message until it is successful with a `retry` processor:

```yaml
pipeline:
  processors:
    - retry:
        backoff:
          initial_interval: 1s
          max_interval: 5s
          max_elapsed_time: 30s
        processors:
          # Attempt this processor until success, or the maximum elapsed time is reached.
          - resource: foo
```

## Drop Failed Messages

In order to filter out any failed messages from your pipeline you can use a [mapping]({{< ref "/product-stack/tyk-streaming/configuration/processors/mapping" >}}) processor:

```yaml
pipeline:
  processors:
    - mapping: root = if errored() { deleted() }
```

This will remove any failed messages from a batch. Furthermore, dropping a message will propagate an acknowledgement (also known as "ack") upstream to the pipeline's input.

## Reject Messages

<!-- TODO: add reject_errored link when complete -->
Some inputs such as NATS, GCP Pub/Sub and AMQP support nacking (rejecting) messages. We can perform a nack (or rejection) on data that has failed to process rather than delivering it to our output with a `reject_errored` output:

```yaml
output:
  reject_errored:
    resource: foo # Only non-errored messages go here
```

## Route to a Dead-Letter Queue

<!-- TODO: add fallback link when complete -->
And by placing the above within a `fallback` output we can instead route the failed messages to a different output:

```yaml
output:
  fallback:
    - reject_errored:
        resource: foo # Only non-errored messages go here

    - resource: bar # Only errored messages, or those that failed to be delivered to foo, go here
```

And, finally, in cases where we wish to route data differently depending on the error message itself we can use a `switch`:

```yaml
output:
  switch:
    cases:
      # Capture specifically cat related errors
      - check: errored() && error().contains("meow")
        output:
          resource: foo

      # Capture all other errors
      - check: errored()
        output:
          resource: bar

      # Finally, route messages that haven't errored
      - output:
          resource: baz
```
