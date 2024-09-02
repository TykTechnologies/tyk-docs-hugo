---
title: Resources
description: Explains resources
tags: [ "Tyk Streams", "Resources" ]
---

Resources are components within Tyk Streams that are declared with a unique label and can be referenced any number of times within a configuration. Only one instance of each named resource is created, but it is safe to use it in multiple places as they can be shared without consequence.

Some components such as caches and rate limits can *only* be created as a resource. However, for components where it's optional there are a few reasons why it might be advantageous to do so.

```yaml
input:
  resource: foo

pipeline:
  processors:
    - resource: bar
    - cache:
        operator: set
        resource: baz
        key: ${! json("id") }
        value: ${! content() }

output:
  resource: buz

input_resources:
  - label: foo
    file:
      paths: [ ./in.txt ]

processor_resources:
  - label: bar
    mapping: 'root = content.lowercase()'

cache_resources:
  - label: baz
    memory:
      default_ttl: 300s

output_resources:
  - label: buz
    file:
      path: ./out.txt
```

## Reusability

Sometimes it's necessary to use a rather large component multiple times. Instead of copy/pasting the configuration or using YAML anchors you can define your component as a resource.

In the following example we want to make an HTTP request with our payloads. Occasionally the payload might get rejected due to garbage within its contents, and so we catch these rejected requests, attempt to "cleanse" the contents and try to make the same HTTP request again. Since the HTTP request component is quite large (and likely to change over time) we make sure to avoid duplicating it by defining it as a resource `get_foo`:

```yaml
pipeline:
  processors:
    - resource: get_foo
    - catch:
      - mapping: |
          root = this
          root.content = this.content.strip_html()
      - resource: get_foo

processor_resources:
  - label: get_foo
    http:
      url: http://example.com/foo
      verb: POST
      headers:
        SomeThing: "set-to-this"
        SomeThingElse: "set-to-something-else"
```
