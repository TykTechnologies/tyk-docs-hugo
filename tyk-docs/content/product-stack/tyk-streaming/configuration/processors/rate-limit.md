
---
title: Rate Limit
description: Explains an overview of rate limit processor
tags: [ "Tyk Streams", "Stream Processors", "Processors", "Rate Limit" ]
---

Throttles the throughput of a pipeline according to a specified [rate_limit]({{< ref "/product-stack/tyk-streaming/configuration/rate-limits/overview" >}}) resource. Rate limits are shared across components and therefore apply globally to all processing pipelines.

```yml
# Config fields, showing default values
label: ""
rate_limit:
  resource: "" # No default (required)
```

## Fields

### resource

The target [rate_limit resource]({{< ref "/product-stack/tyk-streaming/configuration/rate-limits/overview" >}}).


Type: `string`  
