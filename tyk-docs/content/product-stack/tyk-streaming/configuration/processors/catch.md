---
title: Catch
description: Explains an overview of the Catch processor
tags: [ "Tyk Streams", "Stream Processors", "Processors", "Catch" ]
---

Applies a list of child processors _only_ when a previous processing step has failed.

```yml
# Config fields, showing default values
label: ""
catch: []
```

Behaves similarly to the [for_each]({{< ref "/product-stack/tyk-streaming/configuration/processors/for-each" >}}) processor, where a list of child processors are applied to individual messages of a batch. However, processors are only applied to messages that failed a processing step prior to the catch.

For example, with the following config:

```yaml
pipeline:
  processors:
    - resource: foo
    - catch:
      - resource: bar
      - resource: baz
```

If the processor `foo` fails for a particular message, that message will be fed into the processors `bar` and `baz`. Messages that do not fail for the processor `foo` will skip these processors.

When messages leave the catch block their fail flags are cleared. This processor is useful for when it's possible to recover failed messages, or when special actions (such as logging/metrics) are required before dropping them.

Consult the [error handling]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/error-handling" >}}) guide for further information related to handling errors in Tyk Streams.

