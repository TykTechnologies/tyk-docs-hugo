---
title: Mutation
description: Mutation Processor
tags: ["Processors","Mapping","Parsing" ]
---

Executes a [Bloblang]({< ref "/product-stack/tyk-streaming/guides/bloblang/overview" >}) mapping and directly transforms the contents of messages, mutating (or deleting) them.



```yml
# Config fields, showing default values
label: ""
mutation: "" # No default (required)
```

[Bloblang]({< ref "/product-stack/tyk-streaming/guides/bloblang/overview" >}) is a powerful language that enables a wide range of mapping, transformation and filtering tasks.

If your mapping is large and you'd prefer for it to live in a separate file then you can execute a mapping directly from a file with the expression `from "<path>"`, where the path must be absolute, or relative from the location that Tyk Streams is executed from.

## Input Document Mutability

A mutation is a mapping that transforms input documents directly, this has the advantage of reducing the need to copy the data fed into the mapping. However, this also means that the referenced document is mutable and therefore changes throughout the mapping. For example, with the following Bloblang:

```coffee
root.rejected = this.invitees.filter(i -> i.mood < 0.5)
root.invitees = this.invitees.filter(i -> i.mood >= 0.5)
```

Notice that we create a field `rejected` by copying the array field `invitees` and filtering out objects with a high mood. We then overwrite the field `invitees` by filtering out objects with a low mood, resulting in two array fields that are each a subset of the original. If we were to reverse the ordering of these assignments like so:

```coffee
root.invitees = this.invitees.filter(i -> i.mood >= 0.5)
root.rejected = this.invitees.filter(i -> i.mood < 0.5)
```

Then the new field `rejected` would be empty as we have already mutated `invitees` to exclude the objects that it would be populated by. We can solve this problem either by carefully ordering our assignments or by capturing the original array using a variable (`let invitees = this.invitees`).

Mutations are advantageous over a standard mapping in situations where the result is a document with mostly the same shape as the input document, since we can avoid unnecessarily copying data from the referenced input document. However, in situations where we are creating an entirely new document shape it can be more convenient to use the traditional [mapping processor]({{< ref "/product-stack/tyk-streaming/configuration/processors/mapping" >}}) instead.

## Error Handling

[Bloblang]({< ref "/product-stack/tyk-streaming/guides/bloblang/overview" >}) mappings can fail, in which case the error is logged and the message is flagged as having failed, allowing you to use standard processor error handling patterns.

However, [Bloblang]({< ref "/product-stack/tyk-streaming/guides/bloblang/overview" >}) itself also provides powerful ways of ensuring your mappings do not fail by specifying desired fallback behavior.


## Examples

### Mapping

Given JSON documents containing an array of fans:

```json
{
  "id":"foo",
  "description":"a show about foo",
  "fans":[
    {"name":"bev","obsession":0.57},
    {"name":"grace","obsession":0.21},
    {"name":"ali","obsession":0.89},
    {"name":"vic","obsession":0.43}
  ]
}
```

We can reduce the documents down to just the ID and only those fans with an obsession score above 0.5, giving us:

```json
{
  "id":"foo",
  "fans":[
    {"name":"bev","obsession":0.57},
    {"name":"ali","obsession":0.89}
  ]
}
```

With the following config:

```yaml
pipeline:
  processors:
    - mutation: |
        root.description = deleted()
        root.fans = this.fans.filter(fan -> fan.obsession > 0.5)
```

## More Mapping

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
    - mutation: |
        root.Cities = this.locations.
                        filter(loc -> loc.state == "WA").
                        map_each(loc -> loc.name).
                        sort().join(", ")
```

