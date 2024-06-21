---
title: Jq
description: Explains an overview of Jq
tags: [ "Tyk Streams", "Stream Processors", "Processors", "Jq" ]
---

Transforms and filters messages using jq queries.

## Common

```yml
# Common config fields, showing default values
label: ""
jq:
  query: "" # No default (required)
```

## Advanced

```yml
# All config fields, showing default values
label: ""
jq:
  query: "" # No default (required)
  raw: false
  output_raw: false
```

{{< note success >}}
**Note**

For better performance and improved capabilities try out native Tyk Streams mapping with the [mapping processor]({{< ref "/product-stack/tyk-streaming/configuration/processors/mapping" >}}).
{{< /note >}}

The provided query is executed on each message, targeting either the contents as a structured JSON value or as a raw string using the field `raw`, and the message is replaced with the query result.

Message metadata is also accessible within the query from the variable `$metadata`.

This processor uses the [gojq library](https://github.com/itchyny/gojq) and therefore does not require jq to be installed as a dependency. However, this also means there are some differences in how these queries are executed versus the [jq cli](https://github.com/itchyny/gojq#difference-to-jq).

If the query does not emit any value then the message is filtered, if the query returns multiple values then the resulting message will be an array containing all values.

The full query syntax is described in the [jq documentation](https://stedolan.github.io/jq/manual).

<!--

TODO: Add error handling after merging bloblang

## Error Handling

Queries can fail, in which case the message remains unchanged, errors are logged, and the message is flagged as having failed, allowing you to use [standard processor error handling patterns](/docs/configuration/error_handling). -->

## Fields

### query

The jq query to filter and transform messages with.


Type: `string`  

### raw

Whether to process the input as a raw string instead of as JSON.


Type: `bool`  
Default: `false`  

### output_raw

Whether to output raw text (unquoted) instead of JSON strings when the emitted values are string types.


Type: `bool`  
Default: `false`  

## Examples

### Mapping

When receiving JSON documents of the form:

```json
{
  "locations": [
    {"name": "Seattle", "state": "WA"},
    {"name": "New York", "state": "NY"},
    {"name": "Bellevue", "state": "WA"},
    {"name": "Olympia", "state": "WA"}
  ]
}
```

We could collapse the location names from the state of Washington into a field `Cities`:

```json
{"Cities": "Bellevue, Olympia, Seattle"}
```

With the following config:

```yaml
pipeline:
  processors:
    - jq:
        query: '{Cities: .locations | map(select(.state == "WA").name) | sort | join(", ") }'
```
