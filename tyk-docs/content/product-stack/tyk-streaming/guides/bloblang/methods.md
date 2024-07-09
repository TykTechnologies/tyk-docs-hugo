---
title: Bloblang Methods
description: Explains Bloblang Methods
tags: [ "Tyk Streams", "Bloblang", "Bloblang Methods", "Methods" ]
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

Bloblang provides a range of methods that provide robust capabilities for processing and shaping data. These methods are essential tools for developers and data engineers looking to perform complex transformations, handle errors gracefully and ensure data integrity throughout their pipelines.

The remainder of this guide explains essential general Bloblang methods for comprehensive data processing. Tyk Streams also supports Bloblang methods relating to [encoding and encryption]({{< ref "/product-stack/tyk-streaming/guides/bloblang/methods/encoding-and-encryption" >}}), [geoIP]({{< ref "/product-stack/tyk-streaming/guides/bloblang/methods/geoip" >}}), [number manipulation]({{< ref "/product-stack/tyk-streaming/guides/bloblang/methods/numbers" >}}), [string manipulation]({{< ref "/product-stack/tyk-streaming/guides/bloblang/methods/strings" >}}), [object and array manipulation]({{< ref "/product-stack/tyk-streaming/guides/bloblang/methods/object-and-arrays" >}}), [parsing]({{< ref "/product-stack/tyk-streaming/guides/bloblang/methods/parsing.md" >}}), [timestamps]({{< ref "/product-stack/tyk-streaming/guides/bloblang/methods/timestamps" >}}) and [type coercion]({{< ref "/product-stack/tyk-streaming/guides/bloblang/methods/type-coercion" >}}).

## apply

Apply a declared mapping to a target value.

#### Parameters

**mapping** &lt;string&gt; The mapping to apply.  

#### Examples


```coffee
map thing {
  root.inner = this.first
}

root.foo = this.doc.apply("thing")

# In:  {"doc":{"first":"hello world"}}
# Out: {"foo":{"inner":"hello world"}}
```

```coffee
map create_foo {
  root.name = "a foo"
  root.purpose = "to be a foo"
}

root = this
root.foo = null.apply("create_foo")

# In:  {"id":"1234"}
# Out: {"foo":{"name":"a foo","purpose":"to be a foo"},"id":"1234"}
```

## catch

If the result of a target query fails (due to incorrect types, failed parsing, etc) the argument is returned instead.

#### Parameters

**fallback** &lt;query expression&gt; A value to yield, or query to execute, if the target query fails.  

#### Examples


```coffee
root.doc.id = this.thing.id.string().catch(uuid_v4())
```

The fallback argument can be a mapping, allowing you to capture the error string and yield structured data back.

```coffee
root.url = this.url.parse_url().catch(err -> {"error":err,"input":this.url})

# In:  {"url":"invalid %&# url"}
# Out: {"url":{"error":"field `this.url`: parse \"invalid %&\": invalid URL escape \"%&\"","input":"invalid %&# url"}}
```

When the input document is not structured attempting to reference structured fields with `this` will result in an error. Therefore, a convenient way to delete non-structured data is with a catch.

```coffee
root = this.catch(deleted())

# In:  {"doc":{"foo":"bar"}}
# Out: {"doc":{"foo":"bar"}}

# In:  not structured data
# Out: <Message deleted>
```

## exists

Checks that a field, identified via a [dot path]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/field-paths" >}}), exists in an object.

#### Parameters

**path** &lt;string&gt; A [dot path]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/field-paths" >}}) to a field.  

#### Examples

```coffee
root.result = this.foo.exists("bar.baz")

# In:  {"foo":{"bar":{"baz":"yep, I exist"}}}
# Out: {"result":true}

# In:  {"foo":{"bar":{}}}
# Out: {"result":false}

# In:  {"foo":{}}
# Out: {"result":false}
```

## from

Modifies a target query such that certain functions are executed from the perspective of another message in the batch. This allows you to mutate events based on the contents of other messages. Functions that support this behavior are `content`, `json` and `meta`.

#### Parameters

**index** &lt;integer&gt; The message index to use as a perspective.  

#### Examples


For example, the following map extracts the contents of the JSON field `foo` specifically from message index `1` of a batch, effectively overriding the field `foo` for all messages of a batch to that of message 1:

```coffee
root = this
root.foo = json("foo").from(1)
```

## from_all

Modifies a target query such that certain functions are executed from the perspective of each message in the batch, and returns the set of results as an array. Functions that support this behavior are `content`, `json` and `meta`.

#### Examples

```coffee
root = this
root.foo_summed = json("foo").from_all().sum()
```

## or

If the result of the target query fails or resolves to `null`, returns the argument instead. This is an explicit method alternative to the coalesce pipe operator `|`.

#### Parameters

**fallback** &lt;query expression&gt; A value to yield, or query to execute, if the target query fails or resolves to `null`.  

#### Examples

```coffee
root.doc.id = this.thing.id.or(uuid_v4())
```
