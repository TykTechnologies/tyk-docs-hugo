---
title: Processors
description: Explains an overview of processors
tags: [ "Tyk Streams", "Stream Processors", "Processors" ]
---

Tyk Streams processors are functions applied to messages passing through a pipeline.

Processors are set via config, and depending on where in the config they are placed they will be run either immediately after a specific input (set in the input section), on all messages (set in the pipeline section) or before a specific output (set in the output section). Most processors apply to all messages and can be placed in the pipeline section:

```yaml
pipeline:
  threads: 1
  processors:
    - label: my_avro
      avro:
        operator: "to_json"
        encoding: textual
```

The `threads` field in the pipeline section determines how many parallel processing threads are created. You can read more about parallel processing in the [pipeline guide]({{< ref "product-stack/tyk-streaming/configuration/common-configuration/processing-pipelines" >}}).

## Labels

<!-- 

TODO: Replace paragraph below in subsequent iteration when know if metrics supported from product

Processors have an optional field `label` that can uniquely identify them in observability data such as metrics and logs. This can be useful when running configs with multiple nested processors, otherwise their metrics labels will be generated based on their composition. For more information check out the [metrics documentation].

-->

Processors have an optional field `label` that can uniquely identify them in observability data such as metrics and logs.