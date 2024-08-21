---
title: Parallel
description: Explains an overview of parallel processor
tags: [ "Tyk Streams", "Stream Processors", "Processors", "parallel" ]
---

A processor that applies a list of child processors to messages of a batch as though they were each a batch of one message (similar to the [for_each]({{< ref "/product-stack/tyk-streaming/configuration/processors/for-each" >}}) processor), but where each message is processed in parallel.

```yml
# Config fields, showing default values
label: ""
parallel:
  cap: 0
  processors: [] # No default (required)
```

The [cap](#cap) field, if greater than zero, caps the maximum number of parallel processing threads.

The functionality of this processor depends on being applied across messages that are [batched]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/batching" >}}).

## Fields

### cap

The maximum number of messages to have processing at a given time.


Type: `int`  
Default: `0`  

### processors

A list of child processors to apply.


Type: `array`  
