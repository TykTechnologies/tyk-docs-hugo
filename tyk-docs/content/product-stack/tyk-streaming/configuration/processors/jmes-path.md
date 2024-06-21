---
title: JMESPath
description: Explains an overview of JMESPath
tags: [ "Tyk Streams", "Stream Processors", "Processors", "JMESPath" ]
---

Executes a [JMESPath query](http://jmespath.org/) on JSON documents and replaces the message with the resulting document.

```yml
# Config fields, showing default values
label: ""
jmespath:
  query: "" # No default (required)
```

{{< note success >}}
**Note**

For better performance and improved capabilities try out native Tyk Streams mapping with the [mapping processor]({{< ref "/product-stack/tyk-streaming/configuration/processors/mapping" >}}).
{{< /note >}}

## Fields

### query

The JMESPath query to apply to messages.


Type: `string`  

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

We can achieve this using the following config:

```yaml
pipeline:
  processors:
    - jmespath:
        query: "locations[?state == 'WA'].name | sort(@) | {Cities: join(', ', @)}"
```

