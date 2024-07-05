---
title: Sleep
description: Explains an overview of sleep processor
tags: [ "Tyk Streams", "Stream Processors", "Processors", "Sleep" ]
---

Sleep for a period of time specified as a duration string for each message. This processor will interpolate functions within the [duration](#duration) field, you can find a list of functions [here]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/interpolation#bloblang-queries" >}}).

```yml
# Config fields, showing default values
label: ""
sleep:
  duration: "" # No default (required)
```

## Fields

### duration

The duration of time to sleep for each execution.
This field supports [interpolation functions]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/interpolation#bloblang-queries" >}})


Type: `string`  
