---
title: Log
description: Explains an overview of log processor
tags: [ "Tyk Streams", "Stream Processors", "Processors", "Log" ]
---

Prints a log event for each message. Messages always remain unchanged. The log message can be set using [function interpolations]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/interpolation#bloblang-queries" >}}) which allows you to log the contents and metadata of messages.

```yml
# Config fields, showing default values
label: ""
log:
  level: INFO
  fields_mapping: |- # No default (optional)
    root.reason = "cus I wana"
    root.id = this.id
    root.age = this.user.age.number()
    root.kafka_topic = meta("kafka_topic")
  message: ""
```

The `level` field determines the log level of the printed events and can be any of the following values: TRACE, DEBUG, INFO, WARN, ERROR.

### Structured Fields

It is also possible add custom fields to logs when the format is set to a structured form such as `json` or `logfmt` with the config field [fields_mapping](#fields_mapping):

```yaml
pipeline:
  processors:
    - log:
        level: DEBUG
        message: hello world
        fields_mapping: |
          root.reason = "to log"
          root.id = this.id
          root.age = this.user.age
          root.kafka_topic = meta("kafka_topic")
```


## Fields

### level

The log level to use.


Type: `string`  
Default: `"INFO"`  
Options: `FATAL`, `ERROR`, `WARN`, `INFO`, `DEBUG`, `TRACE`, `ALL`.

### fields_mapping

An optional [Bloblang mapping]({{< ref "/product-stack/tyk-streaming/guides/bloblang/overview" >}}) that can be used to specify extra fields to add to the log. If log fields are also added with `fields` then those values will override matching keys from this mapping.


Type: `string`  

```yml
# Examples

fields_mapping: |-
  root.reason = "to log"
  root.id = this.id
  root.age = this.user.age.number()
  root.kafka_topic = meta("kafka_topic")
```

### message

The message to print.

This field supports [interpolation functions]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/interpolation#bloblang-queries" >}}).


Type: `string`  
Default: `""`  
