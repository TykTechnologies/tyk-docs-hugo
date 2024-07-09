---
title: Bloblang Methods
description: Explains Bloblang Methods
tags: [ "Tyk Streams", "Bloblang", "Bloblang Methods", "Methods" ]
---

Methods provide most of the power in [Bloblang]({< ref "/product-stack/tyk-streaming/guides/bloblang/overview" >}) as they allow you to augment values and can be added to any expression (including other methods):

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

## General

### apply

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

### catch

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

### exists

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

### from

Modifies a target query such that certain functions are executed from the perspective of another message in the batch. This allows you to mutate events based on the contents of other messages. Functions that support this behavior are `content`, `json` and `meta`.

#### Parameters

**index** &lt;integer&gt; The message index to use as a perspective.  

#### Examples


For example, the following map extracts the contents of the JSON field `foo` specifically from message index `1` of a batch, effectively overriding the field `foo` for all messages of a batch to that of message 1:

```coffee
root = this
root.foo = json("foo").from(1)
```

### from_all

Modifies a target query such that certain functions are executed from the perspective of each message in the batch, and returns the set of results as an array. Functions that support this behavior are `content`, `json` and `meta`.

#### Examples

```coffee
root = this
root.foo_summed = json("foo").from_all().sum()
```

### or

If the result of the target query fails or resolves to `null`, returns the argument instead. This is an explicit method alternative to the coalesce pipe operator `|`.

#### Parameters

**fallback** &lt;query expression&gt; A value to yield, or query to execute, if the target query fails or resolves to `null`.  

#### Examples

```coffee
root.doc.id = this.thing.id.or(uuid_v4())
```








#### Examples


```coffee
root.foo_len = this.foo.length()

# In:  {"foo":["first","second"]}
# Out: {"foo_len":2}

# In:  {"foo":{"first":"bar","second":"baz"}}
# Out: {"foo_len":2}
```

### map_each

#### Parameters

**query** &lt;query expression&gt; A query that will be used to map each element.  

#### Examples

##### On arrays

Apply a mapping to each element of an array and replace the element with the result. Within the argument mapping the context is the value of the element being mapped.

```coffee
root.new_nums = this.nums.map_each(num -> if num < 10 {
  deleted()
} else {
  num - 10
})

# In:  {"nums":[3,11,4,17]}
# Out: {"new_nums":[1,7]}
```

##### On objects

Apply a mapping to each value of an object and replace the value with the result. Within the argument mapping the context is an object with a field `key` containing the value key, and a field `value`.

```coffee
root.new_dict = this.dict.map_each(item -> item.value.uppercase())

# In:  {"dict":{"foo":"hello","bar":"world"}}
# Out: {"new_dict":{"bar":"WORLD","foo":"HELLO"}}
```

### map_each_key

Apply a mapping to each key of an object, and replace the key with the result, which must be a string.

#### Parameters

**query** &lt;query expression&gt; A query that will be used to map each key.  

#### Examples


```coffee
root.new_dict = this.dict.map_each_key(key -> key.uppercase())

# In:  {"dict":{"keya":"hello","keyb":"world"}}
# Out: {"new_dict":{"KEYA":"hello","KEYB":"world"}}
```

```coffee
root = this.map_each_key(key -> if key.contains("kafka") { "_" + key })

# In:  {"amqp_key":"foo","kafka_key":"bar","kafka_topic":"baz"}
# Out: {"_kafka_key":"bar","_kafka_topic":"baz","amqp_key":"foo"}
```

### merge

Merge a source object into an existing destination object. When a collision is found within the merged structures (both a source and destination object contain the same non-object keys) the result will be an array containing both values, where values that are already arrays will be expanded into the resulting array. In order to simply override destination fields on collision use the [assign](#assign) method.

#### Parameters

**with** &lt;unknown&gt; A value to merge the target value with.  

#### Examples


```coffee
root = this.foo.merge(this.bar)

# In:  {"foo":{"first_name":"fooer","likes":"bars"},"bar":{"second_name":"barer","likes":"foos"}}
# Out: {"first_name":"fooer","likes":["bars","foos"],"second_name":"barer"}
```

### patch

Create a diff by comparing the current value with the given one. Wraps the *github.com/r3labs/diff/v3* package. See its [docs](https://pkg.go.dev/github.com/r3labs/diff/v3) for more information.

#### Parameters

**changelog** &lt;unknown&gt; The changelog to apply.  

### slice

Extract a slice from an array by specifying two indices, a low and high bound, which selects a half-open range that includes the first element, but excludes the last one. If the second index is omitted then it defaults to the length of the input sequence.

#### Parameters

**low** &lt;integer&gt; The low bound, which is the first element of the selection, or if negative selects from the end.  
**high** &lt;(optional) integer&gt; An optional high bound.  

#### Examples


```coffee
root.beginning = this.value.slice(0, 2)
root.end = this.value.slice(4)

# In:  {"value":["foo","bar","baz","buz","bev"]}
# Out: {"beginning":["foo","bar"],"end":["bev"]}
```

A negative low index can be used, indicating an offset from the end of the sequence. If the low index is greater than the length of the sequence then an empty result is returned.

```coffee
root.last_chunk = this.value.slice(-2)
root.the_rest = this.value.slice(0, -2)

# In:  {"value":["foo","bar","baz","buz","bev"]}
# Out: {"last_chunk":["buz","bev"],"the_rest":["foo","bar","baz"]}
```

### sort

Attempts to sort the values of an array in increasing order. The type of all values must match in order for the ordering to succeed. Supports string and number values.

#### Parameters

**compare** &lt;(optional) query expression&gt; An optional query that should explicitly compare elements `left` and `right` and provide a boolean result.  

#### Examples


```coffee
root.sorted = this.foo.sort()

# In:  {"foo":["bbb","ccc","aaa"]}
# Out: {"sorted":["aaa","bbb","ccc"]}
```

It's also possible to specify a mapping argument, which is provided an object context with fields `left` and `right`, the mapping must return a boolean indicating whether the `left` value is less than `right`. This allows you to sort arrays containing non-string or non-number values.

```coffee
root.sorted = this.foo.sort(item -> item.left.v < item.right.v)

# In:  {"foo":[{"id":"foo","v":"bbb"},{"id":"bar","v":"ccc"},{"id":"baz","v":"aaa"}]}
# Out: {"sorted":[{"id":"baz","v":"aaa"},{"id":"foo","v":"bbb"},{"id":"bar","v":"ccc"}]}
```

### sort_by

Attempts to sort the elements of an array, in increasing order, by a value emitted by an argument query applied to each element. The type of all values must match in order for the ordering to succeed. Supports string and number values.

#### Parameters

**query** &lt;query expression&gt; A query to apply to each element that yields a value used for sorting.  

#### Examples


```coffee
root.sorted = this.foo.sort_by(ele -> ele.id)

# In:  {"foo":[{"id":"bbb","message":"bar"},{"id":"aaa","message":"foo"},{"id":"ccc","message":"baz"}]}
# Out: {"sorted":[{"id":"aaa","message":"foo"},{"id":"bbb","message":"bar"},{"id":"ccc","message":"baz"}]}
```

### squash

Squashes an array of objects into a single object, where key collisions result in the values being merged (following similar rules as the `.merge()` method)

#### Examples


```coffee
root.locations = this.locations.map_each(loc -> {loc.state: [loc.name]}).squash()

# In:  {"locations":[{"name":"Seattle","state":"WA"},{"name":"New York","state":"NY"},{"name":"Bellevue","state":"WA"},{"name":"Olympia","state":"WA"}]}
# Out: {"locations":{"NY":["New York"],"WA":["Seattle","Bellevue","Olympia"]}}
```

### sum

Sum the numerical values of an array.

#### Examples


```coffee
root.sum = this.foo.sum()

# In:  {"foo":[3,8,4]}
# Out: {"sum":15}
```

### unique

Attempts to remove duplicate values from an array. The array may contain a combination of different value types, but numbers and strings are checked separately (`"5"` is a different element to `5`).

#### Parameters

**emit** &lt;(optional) query expression&gt; An optional query that can be used in order to yield a value for each element to determine uniqueness.  

#### Examples


```coffee
root.uniques = this.foo.unique()

# In:  {"foo":["a","b","a","c"]}
# Out: {"uniques":["a","b","c"]}
```

### values

Returns the values of an object as an array. The order of the resulting array will be random.

#### Examples


```coffee
root.foo_vals = this.foo.values().sort()

# In:  {"foo":{"bar":1,"baz":2}}
# Out: {"foo_vals":[1,2]}
```

### with

Returns an object where all but one or more [field path]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/field-paths" >}}) arguments are removed. Each path specifies a specific field to be retained from the input object, allowing for nested fields.

If a key within a nested path does not exist then it is ignored.

#### Examples


```coffee
root = this.with("inner.a","inner.c","d")

# In:  {"inner":{"a":"first","b":"second","c":"third"},"d":"fourth","e":"fifth"}
# Out: {"d":"fourth","inner":{"a":"first","c":"third"}}
```

### without

Returns an object where one or more [field path]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/field-paths" >}}) arguments are removed. Each path specifies a specific field to be deleted from the input object, allowing for nested fields.

If a key within a nested path does not exist or is not an object then it is not removed.

#### Examples


```coffee
root = this.without("inner.a","inner.c","d")

# In:  {"inner":{"a":"first","b":"second","c":"third"},"d":"fourth","e":"fifth"}
# Out: {"e":"fifth","inner":{"b":"second"}}
```

### zip

Zip an array value with one or more argument arrays. Each array must match in length.

#### Examples


```coffee
root.foo = this.foo.zip(this.bar, this.baz)

# In:  {"foo":["a","b","c"],"bar":[1,2,3],"baz":[4,5,6]}
# Out: {"foo":[["a",1,4],["b",2,5],["c",3,6]]}
```



## GeoIP

### geoip_anonymous_ip

Looks up an IP address against a [MaxMind database file](https://www.maxmind.com/en/home) and, if found, returns an object describing the anonymous IP associated with it.

#### Parameters

**path** &lt;string&gt; A path to an mmdb (maxmind) file.  

### geoip_asn

Looks up an IP address against a [MaxMind database file](https://www.maxmind.com/en/home) and, if found, returns an object describing the ASN associated with it.

#### Parameters

**path** &lt;string&gt; A path to an mmdb (maxmind) file.  

### geoip_city

Looks up an IP address against a [MaxMind database file](https://www.maxmind.com/en/home) and, if found, returns an object describing the city associated with it.

#### Parameters

**path** &lt;string&gt; A path to an mmdb (maxmind) file.  

### geoip_connection_type

Looks up an IP address against a [MaxMind database file](https://www.maxmind.com/en/home) and, if found, returns an object describing the connection type associated with it.

#### Parameters

**path** &lt;string&gt; A path to an mmdb (maxmind) file.  

### geoip_country

Looks up an IP address against a [MaxMind database file](https://www.maxmind.com/en/home) and, if found, returns an object describing the country associated with it.

#### Parameters

**path** &lt;string&gt; A path to an mmdb (maxmind) file.  

### geoip_domain

Looks up an IP address against a [MaxMind database file](https://www.maxmind.com/en/home) and, if found, returns an object describing the domain associated with it.

#### Parameters

**path** &lt;string&gt; A path to an mmdb (maxmind) file.  

### geoip_enterprise

Looks up an IP address against a [MaxMind database file](https://www.maxmind.com/en/home) and, if found, returns an object describing the enterprise associated with it.

#### Parameters

**path** &lt;string&gt; A path to an mmdb (maxmind) file.  

### geoip_isp

Looks up an IP address against a [MaxMind database file](https://www.maxmind.com/en/home) and, if found, returns an object describing the ISP associated with it.

#### Parameters

**path** &lt;string&gt; A path to an mmdb (maxmind) file.  
