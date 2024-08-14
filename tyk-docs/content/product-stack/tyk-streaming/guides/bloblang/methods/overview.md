---
title: Bloblang Methods
description: Explains Bloblang Methods
tags: [ "Tyk Streams", "Bloblang", "Bloblang Methods", "Methods" ]
aliases:
  - /product-stack/tyk-streaming/guides/bloblang/methods
---

Methods provide most of the power in [Bloblang]({{< ref "/product-stack/tyk-streaming/guides/bloblang/overview" >}}) as they allow you to augment values and can be added to any expression (including other methods):

```coffee
root.doc.id = this.thing.id.string().catch(uuid_v4())
root.doc.reduced_nums = this.thing.nums.map_each(num -> if num < 10 {
  deleted()
} else {
  num - 10
})
root.has_good_taste = ["pikachu","mewtwo","magmar"].contains(this.user.fav_pokemon)
```

Methods support both named and nameless style arguments:

```coffee
root.foo_one = this.(bar | baz).trim().replace_all(old: "dog", new: "cat")
root.foo_two = this.(bar | baz).trim().replace_all("dog", "cat")
```

Bloblang provides a range of methods that provide robust capabilities for processing and shaping data. These methods are essential tools for developers and data engineers looking to perform complex transformations, handle errors gracefully, and ensure data integrity throughout their pipelines. Tyk Streams supports the following Bloblang methods:

- [General methods]({{< ref "/product-stack/tyk-streaming/guides/bloblang/methods/general" >}})
- [Encoding and encryption]({{< ref "product-stack/tyk-streaming/guides/bloblang/methods/encoding-and-encryption" >}})
- [GeoIP]({{< ref "product-stack/tyk-streaming/guides/bloblang/methods/geoip" >}})
- [Number manipulation]({{< ref "product-stack/tyk-streaming/guides/bloblang/methods/numbers" >}})
- [String manipulation]({{< ref "product-stack/tyk-streaming/guides/bloblang/methods/strings" >}})
- [Object and array manipulation]({{< ref "product-stack/tyk-streaming/guides/bloblang/methods/object-and-arrays" >}})
- [Regular expressions]({{< ref "product-stack/tyk-streaming/guides/bloblang/methods/regular-expressions" >}})
- [Parsing]({{< ref "product-stack/tyk-streaming/guides/bloblang/methods/parsing" >}})
- [Timestamps]({{< ref "product-stack/tyk-streaming/guides/bloblang/methods/timestamps" >}})
- [Type coercion]({{< ref "product-stack/tyk-streaming/guides/bloblang/methods/type-coercion" >}})
