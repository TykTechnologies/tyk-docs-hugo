---
title: Switch
description: Explains an overview of switch processor
tags: [ "Tyk Streams", "Stream Processors", "Processors", "Switch" ]
---

Conditionally processes messages based on their contents.

```yml
# Config fields, showing default values
label: ""
switch: [] # No default (required)
```

For each switch case a [Bloblang query]({{< ref "/product-stack/tyk-streaming/guides/bloblang/overview" >}}) is checked and, if the result is true (or the check is empty) the child processors are executed on the message.

## Fields

### [].check

A [Bloblang query]({{< ref "/product-stack/tyk-streaming/guides/bloblang/overview" >}}) that should return a boolean value indicating whether a message should have the processors of this case executed on it. If left empty the case always passes. If the check mapping throws an error the message will be flagged [as having failed]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/error-handling" >}}) and will not be tested against any other cases.


Type: `string`  
Default: `""`  

```yml
# Examples

check: this.type == "foo"

check: this.contents.urls.contains("https://tyk.io/")
```

### [].processors

A list of processors to execute on a message.


Type: `array`  
Default: `[]`  

### [].fallthrough

Indicates whether, if this case passes for a message, the next case should also be executed.


Type: `bool`  
Default: `false`  

## Examples

### User Group Filter

We have a system where we're counting a metric for all messages that pass through our system. 
The example below increments a counter named *AdminMessages* for users that are in the admin group. For all other message we increment a counter named *OtherMessages*.

```yaml
pipeline:
  processors:
    - switch:
        - check: this.user.group == "admin"
          processors:
            - metric:
                type: counter
                name: AdminMessages

        - processors:
            - metric:
                type: counter
                name: OtherMessages
```

## Batching

When a switch processor executes on a [batch of messages]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/batching" >}}) they are checked individually and can be matched independently against cases. During processing the messages matched against a case are processed as a batch, although the ordering of messages during case processing cannot be guaranteed to match the order as received.

At the end of switch processing the resulting batch will follow the same ordering as the batch was received. If any child processors have split or otherwise grouped messages this grouping will be lost as the result of a switch is always a single batch. In order to perform conditional grouping and/or splitting use the [group_by]({{< ref "/product-stack/tyk-streaming/configuration/processors/group-by" >}}) processor.