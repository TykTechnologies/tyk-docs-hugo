---
title: Cache
description: Cache Processor
tags: ["Cache","Processors","Integration" ]
---

<!-- TODO: add a link -->
Performs operations against a cache resource for each message, allowing you to store or retrieve data within message payloads.

## Common

```yml
# Common config fields, showing default values
label: ""
cache:
  resource: "" # No default (required)
  operator: "" # No default (required)
  key: "" # No default (required)
  value: "" # No default (optional)
```

## Advanced
```yml
# All config fields, showing default values
label: ""
cache:
  resource: "" # No default (required)
  operator: "" # No default (required)
  key: "" # No default (required)
  value: "" # No default (optional)
  ttl: 60s # No default (optional)
```

For use cases where you wish to cache the result of processors consider using the [cached processor]({{< ref "/product-stack/tyk-streaming/configuration/processors/cached" >}}) instead.

This processor will interpolate functions within the `key` and `value` fields individually for each message. This allows you to specify dynamic keys and values based on the contents of the message payloads and metadata.

## Examples

### Deduplication

Deduplication can be done using the add operator with a key extracted from the message payload, since it fails when a key already exists we can remove the duplicates using a [mapping processor]({{< ref "/product-stack/tyk-streaming/configuration/processors/mapping" >}}):

```yaml
pipeline:
  processors:
    - cache:
        resource: foocache
        operator: add
        key: '${! json("message.id") }'
        value: "storeme"
    - mapping: root = if errored() { deleted() }

cache_resources:
  - label: foocache
    redis:
      url: tcp://TODO:6379
```

### Deduplication Batch-Wide

Sometimes it's necessary to deduplicate a batch of messages (AKA a window) by a single identifying value. This can be done by introducing a [branch processor]({{< ref "/product-stack/tyk-streaming/configuration/processors/branch" >}}), which executes the cache only once on behalf of the batch, in this case with a value make from a field extracted from the first and last messages of the batch:

```yaml
pipeline:
  processors:
    # Try and add one message to a cache that identifies the whole batch
    - branch:
        request_map: |
          root = if batch_index() == 0 {
            json("id").from(0) + json("meta.tail_id").from(-1)
          } else { deleted() }
        processors:
          - cache:
              resource: foocache
              operator: add
              key: ${! content() }
              value: t
    # Delete all messages if we failed
    - mapping: |
        root = if errored().from(0) {
          deleted()
        }
```

### Hydration

It's possible to enrich payloads with content previously stored in a cache by using the [branch]({{< ref "/product-stack/tyk-streaming/configuration/processors/branch" >}}) processor:

```yaml
pipeline:
  processors:
    - branch:
        processors:
          - cache:
              resource: foocache
              operator: get
              key: '${! json("message.document_id") }'
        result_map: 'root.message.document = this'

        # NOTE: If the data stored in the cache is not valid JSON then use
        # something like this instead:
        # result_map: 'root.message.document = content().string()'

cache_resources:
  - label: foocache
    memcached:
      addresses: [ "TODO:11211" ]
```

## Fields

### resource
<!-- TODO: add a link -->
The cache resource to target with this processor.


Type: `string`

### operator

The [operation](#operators) to perform with the cache.


Type: `string`  
Options: `set`, `add`, `get`, `delete`.

### key

A key to use with the cache.
This field supports interpolation functions.


Type: `string`

### value

A value to use with the cache (when applicable).

This field supports [interpolation functions]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/interpolation#bloblang-queries" >}}).


Type: `string`

### ttl

The TTL of each individual item as a duration string. After this period an item will be eligible for removal during the next compaction. Not all caches support per-key TTLs, those that do will have a configuration field `default_ttl`, and those that do not will fall back to their generally configured TTL setting.

This field supports [interpolation functions]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/interpolation#bloblang-queries" >}}).


Type: `string`  

```yml
# Examples

ttl: 60s

ttl: 5m

ttl: 36h
```

## Operators

### set

Set a key in the cache to a value. If the key already exists the contents are
overridden.

### add

Set a key in the cache to a value. If the key already exists the action fails
with a 'key already exists' error, which can be detected with processor [error handling]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/error-handling" >}}).

### get

Retrieve the contents of a cached key and replace the original message payload
with the result. If the key does not exist the action fails with an error, which
can be detected with processor error handling.

### delete

Delete a key and its contents from the cache.  If the key does not exist the
action is a no-op and will not fail with an error.
