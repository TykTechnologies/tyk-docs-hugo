---
title: Processors
description: Explains an overview of processors processor
tags: [ "Tyk Streams", "Stream Processors", "Processors" ]
---

A processor grouping several sub-processors.

```yml
# Config fields, showing default values
label: ""
processors: []
```

This processor is useful in situations where you want to collect several processors under a single resource identifier, whether it is for making your configuration easier to read and navigate, or for improving the testability of your configuration. The behavior of child processors will match exactly the behavior they would have under any other processors block.

## Examples

### Grouped Processing

Imagine we have a collection of processors that cover a specific functionality. We could use this processor to group them together and make it easier to read and mock during testing by giving the whole block a label:

```yaml
pipeline:
  processors:
    - label: my_feature
      processors:
        - log:
            message: "My feature message"
        - archive:
            format: json_array
        - mapping: root.items = this
```
