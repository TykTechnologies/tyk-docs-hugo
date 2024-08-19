---
title: Group By
description: Explains an overview of group by processor
tags: [ "Tyk Streams", "Stream Processors", "Processors", "Group_By" ]
---

Splits a [batch of messages]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/batching" >}}) into N batches, where each resulting batch contains a group of messages determined by a [Bloblang query]({{< ref "/product-stack/tyk-streaming/guides/bloblang/overview" >}}).

```yml
# Config fields, showing default values
label: ""
group_by: [] # No default (required)
```

Once the groups are established a list of processors are applied to their respective grouped batch, which can be used to label the batch as per their grouping. Messages that do not pass the check of any specified group are placed in their own group.

The functionality of this processor depends on being applied across messages that are [batched]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/batching" >}}).

## Fields

### [].check

A [Bloblang query]({{< ref "/product-stack/tyk-streaming/guides/bloblang/overview" >}}) that should return a boolean value indicating whether a message belongs to a given group.


Type: `string`  

```yml
# Examples

check: this.type == "foo"

check: this.contents.urls.contains("https://tyk.io/")

check: "true"
```

### [].processors

A list of processors to execute on the newly formed group.


Type: `array`  
Default: `[]`  

## Examples

### Grouped Processing

Imagine we have a batch of messages that we wish to split into a group of foos and everything else, which should be sent to different output destinations based on those groupings. We also need to send the foos as a tar gzip archive. For this purpose we can use the `group_by` processor with a [switch]({{< ref "/product-stack/tyk-streaming/configuration/processors/switch" >}}) output:

```yaml
pipeline:
  processors:
    - group_by:
      - check: content().contains("this is a foo")
        processors:
          - archive:
              format: tar
          - compress:
              algorithm: gzip
          - mapping: 'meta grouping = "foo"'

output:
  switch:
    cases:
      - check: meta("grouping") == "foo"
        output:
          gcp_pubsub:
            project: foo_prod
            topic: only_the_foos
      - output:
          gcp_pubsub:
            project: somewhere_else
            topic: no_foos_here
```
