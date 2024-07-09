---
title: Object and Array Methods
description: Explains Object and Array Methods
tags: [ "Tyk Streams", "Bloblang", "Bloblang Methods", "Objects", "Arrays" ]
---

Bloblang, the query and transformation language used within Tyk Streams, offers methods for manipulating objects and arrays. These methods provide efficient ways to filter, transform, and manipulate structured data, enabling streamlined data processing pipelines. Whether you're working with JSON objects or arrays of varying complexity, Bloblang's Object and Array Methods offer a range of use cases for data validation and transformations.

## all

Checks each element of an array against a query and returns true if all elements passed. An error occurs if the target is not an array, or if any element results in the provided query returning a non-boolean result. Returns false if the target array is empty.

#### Parameters

**test** &lt;query expression&gt; A test query to apply to each element.  

#### Examples


```coffee
root.all_over_21 = this.patrons.all(patron -> patron.age >= 21)

# In:  {"patrons":[{"id":"1","age":18},{"id":"2","age":23}]}
# Out: {"all_over_21":false}

# In:  {"patrons":[{"id":"1","age":45},{"id":"2","age":23}]}
# Out: {"all_over_21":true}
```

## any

Checks the elements of an array against a query and returns true if any element passes. An error occurs if the target is not an array, or if an element results in the provided query returning a non-boolean result. Returns false if the target array is empty.

#### Parameters

**test** &lt;query expression&gt; A test query to apply to each element.  

#### Examples


```coffee
root.any_over_21 = this.patrons.any(patron -> patron.age >= 21)

# In:  {"patrons":[{"id":"1","age":18},{"id":"2","age":23}]}
# Out: {"any_over_21":true}

# In:  {"patrons":[{"id":"1","age":10},{"id":"2","age":12}]}
# Out: {"any_over_21":false}
```

## append

Returns an array with new elements appended to the end.

#### Examples


```coffee
root.foo = this.foo.append("and", "this")

# In:  {"foo":["bar","baz"]}
# Out: {"foo":["bar","baz","and","this"]}
```

## assign

Merge a source object into an existing destination object. When a collision is found within the merged structures (both a source and destination object contain the same non-object keys) the value in the destination object will be overwritten by that of source object. In order to preserve both values on collision use the [merge](#merge) method.

#### Parameters

**with** &lt;unknown&gt; A value to merge the target value with.  

#### Examples


```coffee
root = this.foo.assign(this.bar)

# In:  {"foo":{"first_name":"fooer","likes":"bars"},"bar":{"second_name":"barer","likes":"foos"}}
# Out: {"first_name":"fooer","likes":"foos","second_name":"barer"}
```

## collapse

Collapse an array or object into an object of key/value pairs for each field, where the key is the full path of the structured field in dot path notation. Empty arrays an objects are ignored by default.

#### Parameters

**include_empty** &lt;bool, default `false`&gt; Whether to include empty objects and arrays in the resulting object.  

#### Examples


```coffee
root.result = this.collapse()

# In:  {"foo":[{"bar":"1"},{"bar":{}},{"bar":"2"},{"bar":[]}]}
# Out: {"result":{"foo.0.bar":"1","foo.2.bar":"2"}}
```

An optional boolean parameter can be set to true in order to include empty objects and arrays.

```coffee
root.result = this.collapse(include_empty: true)

# In:  {"foo":[{"bar":"1"},{"bar":{}},{"bar":"2"},{"bar":[]}]}
# Out: {"result":{"foo.0.bar":"1","foo.1.bar":{},"foo.2.bar":"2","foo.3.bar":[]}}
```

## concat

Concatenates an array value with one or more argument arrays.

#### Examples


```coffee
root.foo = this.foo.concat(this.bar, this.baz)

# In:  {"foo":["a","b"],"bar":["c"],"baz":["d","e","f"]}
# Out: {"foo":["a","b","c","d","e","f"]}
```

## contains

Checks whether an array contains an element matching the argument, or an object contains a value matching the argument, and returns a boolean result. Numerical comparisons are made irrespective of the representation type (float versus integer).

#### Parameters

**value** &lt;unknown&gt; A value to test against elements of the target.  

#### Examples


```coffee
root.has_foo = this.thing.contains("foo")

# In:  {"thing":["this","foo","that"]}
# Out: {"has_foo":true}

# In:  {"thing":["this","bar","that"]}
# Out: {"has_foo":false}
```

```coffee
root.has_bar = this.thing.contains(20)

# In:  {"thing":[10.3,20.0,"huh",3]}
# Out: {"has_bar":true}

# In:  {"thing":[2,3,40,67]}
# Out: {"has_bar":false}
```

## diff

Create a diff by comparing the current value with the given one. Wraps the github.com/r3labs/diff/v3 package. See its [docs](https://pkg.go.dev/github.com/r3labs/diff/v3) for more information.

#### Parameters

**other** &lt;unknown&gt; The value to compare against.  

## enumerated

Converts an array into a new array of objects, where each object has a field index containing the `index` of the element and a field `value` containing the original value of the element.

#### Examples


```coffee
root.foo = this.foo.enumerated()

# In:  {"foo":["bar","baz"]}
# Out: {"foo":[{"index":0,"value":"bar"},{"index":1,"value":"baz"}]}
```

## explode

Explodes an array or object at a [field path]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/field-paths" >}}).

#### Parameters

**path** &lt;string&gt; A [dot path]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/field-paths" >}}) to a field to explode.  

#### Examples


##### On arrays

Exploding arrays results in an array containing elements matching the original document, where the target field of each element is an element of the exploded array:

```coffee
root = this.explode("value")

# In:  {"id":1,"value":["foo","bar","baz"]}
# Out: [{"id":1,"value":"foo"},{"id":1,"value":"bar"},{"id":1,"value":"baz"}]
```

##### On objects

Exploding objects results in an object where the keys match the target object, and the values match the original document but with the target field replaced by the exploded value:

```coffee
root = this.explode("value")

# In:  {"id":1,"value":{"foo":2,"bar":[3,4],"baz":{"bev":5}}}
# Out: {"bar":{"id":1,"value":[3,4]},"baz":{"id":1,"value":{"bev":5}},"foo":{"id":1,"value":2}}
```

## filter

Executes a mapping query argument for each element of an array or key/value pair of an object. If the query returns `false` the item is removed from the resulting array or object. The item will also be removed if the query returns any non-boolean value.

#### Parameters

**test** &lt;query expression&gt; A query to apply to each element, if this query resolves to any value other than a boolean `true` the element will be removed from the result.  

#### Examples


```coffee
root.new_nums = this.nums.filter(num -> num > 10)

# In:  {"nums":[3,11,4,17]}
# Out: {"new_nums":[11,17]}
```

##### On objects

When filtering objects the mapping query argument is provided a context with a field `key` containing the value key, and a field `value` containing the value.

```coffee
root.new_dict = this.dict.filter(item -> item.value.contains("foo"))

# In:  {"dict":{"first":"hello foo","second":"world","third":"this foo is great"}}
# Out: {"new_dict":{"first":"hello foo","third":"this foo is great"}}
```

## find

Returns the index of the first occurrence of a value in an array. `-1` is returned if there are no matches. Numerical comparisons are made irrespective of the representation type (float versus integer).

#### Parameters

**value** &lt;unknown&gt; A value to find.  

#### Examples


```coffee
root.index = this.find("bar")

# In:  ["foo", "bar", "baz"]
# Out: {"index":1}
```

```coffee
root.index = this.things.find(this.goal)

# In:  {"goal":"bar","things":["foo", "bar", "baz"]}
# Out: {"index":1}
```

## find_all

Returns an array containing the indexes of all occurrences of a value in an array. An empty array is returned if there are no matches. Numerical comparisons are made irrespective of the representation type (float versus integer).

#### Parameters

**value** &lt;unknown&gt; A value to find.  

#### Examples

```coffee
root.index = this.find_all("bar")

# In:  ["foo", "bar", "baz", "bar"]
# Out: {"index":[1,3]}
```

```coffee
root.indexes = this.things.find_all(this.goal)

# In:  {"goal":"bar","things":["foo", "bar", "baz", "bar", "buz"]}
# Out: {"indexes":[1,3]}
```

## find_all_by

Returns an array containing the indexes of all occurrences of an array where the provided query resolves to a boolean `true`. An empty array is returned if there are no matches. Numerical comparisons are made irrespective of the representation type (float versus integer).

#### Parameters

**query** &lt;query expression&gt; A query to execute for each element.  

#### Examples


```coffee
root.index = this.find_all_by(v -> v != "bar")

# In:  ["foo", "bar", "baz"]
# Out: {"index":[0,2]}
```

## find_by

Returns the index of the first occurrence of an array where the provided query resolves to a boolean `true`. `-1` is returned if there are no matches.

#### Parameters

**query** &lt;query expression&gt; A query to execute for each element.  

#### Examples


```coffee
root.index = this.find_by(v -> v != "bar")

# In:  ["foo", "bar", "baz"]
# Out: {"index":0}
```

## flatten

Iterates an array and any element that is itself an array is removed and has its elements inserted directly in the resulting array.

#### Examples


```coffee
root.result = this.flatten()

# In:  ["foo",["bar","baz"],"buz"]
# Out: {"result":["foo","bar","baz","buz"]}
```

## fold

Takes two arguments: an initial value, and a mapping query. For each element of an array the mapping context is an object with two fields `tally` and `value`, where `tally` contains the current accumulated value and `value` is the value of the current element. The mapping must return the result of adding the value to the tally.

The first argument is the value that `tally` will have on the first call.

#### Parameters

**initial** &lt;unknown&gt; The initial value to start the fold with. For example, an empty object `{}`, a zero count `0`, or an empty string `""`.  
**query** &lt;query expression&gt; A query to apply for each element. The query is provided an object with two fields; `tally` containing the current tally, and `value` containing the value of the current element. The query should result in a new tally to be passed to the next element query.  

#### Examples


```coffee
root.sum = this.foo.fold(0, item -> item.tally + item.value)

# In:  {"foo":[3,8,11]}
# Out: {"sum":22}
```

```coffee
root.result = this.foo.fold("", item -> "%v%v".format(item.tally, item.value))

# In:  {"foo":["hello ", "world"]}
# Out: {"result":"hello world"}
```

You can use fold to merge an array of objects together:

```coffee
root.smoothie = this.fruits.fold({}, item -> item.tally.merge(item.value))

# In:  {"fruits":[{"apple":5},{"banana":3},{"orange":8}]}
# Out: {"smoothie":{"apple":5,"banana":3,"orange":8}}
```

## get

Extract a field value, identified via a [dot path]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/field-paths" >}}), from an object.

#### Parameters

**`path`** &lt;string&gt; A [dot path]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/field-paths" >}}) identifying a field to obtain.  

#### Examples


```coffee
root.result = this.foo.get(this.target)

# In:  {"foo":{"bar":"from bar","baz":"from baz"},"target":"bar"}
# Out: {"result":"from bar"}

# In:  {"foo":{"bar":"from bar","baz":"from baz"},"target":"baz"}
# Out: {"result":"from baz"}
```

## index

Extract an element from an array by an index. The index can be negative, and if so the element will be selected from the end counting backwards starting from -1. E.g. an index of -1 returns the last element, an index of -2 returns the element before the last, and so on.

#### Parameters

**index** &lt;integer&gt; The index to obtain from an array.  

#### Examples

```coffee
root.last_name = this.names.index(-1)

# In:  {"names":["rachel","stevens"]}
# Out: {"last_name":"stevens"}
```

It is also possible to use this method on byte arrays, in which case the selected element will be returned as an integer.

```coffee
root.last_byte = this.name.bytes().index(-1)

# In:  {"name":"foobar bazson"}
# Out: {"last_byte":110}
```

## join

Join an array of strings with an optional delimiter into a single string.

#### Parameters

**delimiter** &lt;(optional) string&gt; An optional delimiter to add between each string.  

#### Examples


```coffee
root.joined_words = this.words.join()
root.joined_numbers = this.numbers.map_each(this.string()).join(",")

# In:  {"words":["hello","world"],"numbers":[3,8,11]}
# Out: {"joined_numbers":"3,8,11","joined_words":"helloworld"}
```

## json_path

Executes the given [JSONPath expression](https://goessner.net/articles/JsonPath) on an object or array and returns the result. For more complex logic, you can use [Gval expressions](https://github.com/PaesslerAG/gval).

#### Parameters

**expression** &lt;string&gt; The JSONPath expression to execute.  

#### Examples


```coffee
root.all_names = this.json_path("$..name")

# In:  {"name":"alice","foo":{"name":"bob"}}
# Out: {"all_names":["alice","bob"]}

# In:  {"thing":["this","bar",{"name":"alice"}]}
# Out: {"all_names":["alice"]}
```

```coffee
root.text_objects = this.json_path("$.body[?(@.type=='text')]")

# In:  {"body":[{"type":"image","id":"foo"},{"type":"text","id":"bar"}]}
# Out: {"text_objects":[{"id":"bar","type":"text"}]}
```

## json_schema

Checks a [JSON schema](https://json-schema.org/) against a value and returns the value if it matches or throws and error if it does not.

#### Parameters

**schema** &lt;string&gt; The schema to check values against.  

#### Examples


```coffee
root = this.json_schema("""{
  "type":"object",
  "properties":{
    "foo":{
      "type":"string"
    }
  }
}""")

# In:  {"foo":"bar"}
# Out: {"foo":"bar"}

# In:  {"foo":5}
# Out: Error("failed assignment (line 1): field `this`: foo invalid type. expected: string, given: integer")
```

In order to load a schema from a file use the `file` function.

```coffee
root = this.json_schema(file(env("ENV_TEST_BLOBLANG_SCHEMA_FILE")))
```

## key_values

Returns the key/value pairs of an object as an array, where each element is an object with a `key` field and a `value` field. The order of the resulting array will be random.

#### Examples


```coffee
root.foo_key_values = this.foo.key_values().sort_by(pair -> pair.key)

# In:  {"foo":{"bar":1,"baz":2}}
# Out: {"foo_key_values":[{"key":"bar","value":1},{"key":"baz","value":2}]}
```

## keys

Returns the keys of an object as an array.

#### Examples

```coffee
root.foo_keys = this.foo.keys()

# In:  {"foo":{"bar":1,"baz":2}}
# Out: {"foo_keys":["bar","baz"]}
```

## length

Returns the length of an array or object (number of keys).

#### Examples


```coffee
root.foo_len = this.foo.length()

# In:  {"foo":["first","second"]}
# Out: {"foo_len":2}

# In:  {"foo":{"first":"bar","second":"baz"}}
# Out: {"foo_len":2}
```

## map_each

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

## map_each_key

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

## merge

Merge a source object into an existing destination object. When a collision is found within the merged structures (both a source and destination object contain the same non-object keys) the result will be an array containing both values, where values that are already arrays will be expanded into the resulting array. In order to simply override destination fields on collision use the [assign](#assign) method.

#### Parameters

**with** &lt;unknown&gt; A value to merge the target value with.  

#### Examples


```coffee
root = this.foo.merge(this.bar)

# In:  {"foo":{"first_name":"fooer","likes":"bars"},"bar":{"second_name":"barer","likes":"foos"}}
# Out: {"first_name":"fooer","likes":["bars","foos"],"second_name":"barer"}
```

## patch

Create a diff by comparing the current value with the given one. Wraps the *github.com/r3labs/diff/v3* package. See its [docs](https://pkg.go.dev/github.com/r3labs/diff/v3) for more information.

#### Parameters

**changelog** &lt;unknown&gt; The changelog to apply.  

## slice

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

## sort

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

## sort_by

Attempts to sort the elements of an array, in increasing order, by a value emitted by an argument query applied to each element. The type of all values must match in order for the ordering to succeed. Supports string and number values.

#### Parameters

**query** &lt;query expression&gt; A query to apply to each element that yields a value used for sorting.  

#### Examples


```coffee
root.sorted = this.foo.sort_by(ele -> ele.id)

# In:  {"foo":[{"id":"bbb","message":"bar"},{"id":"aaa","message":"foo"},{"id":"ccc","message":"baz"}]}
# Out: {"sorted":[{"id":"aaa","message":"foo"},{"id":"bbb","message":"bar"},{"id":"ccc","message":"baz"}]}
```

## squash

Squashes an array of objects into a single object, where key collisions result in the values being merged (following similar rules as the `.merge()` method)

#### Examples


```coffee
root.locations = this.locations.map_each(loc -> {loc.state: [loc.name]}).squash()

# In:  {"locations":[{"name":"Seattle","state":"WA"},{"name":"New York","state":"NY"},{"name":"Bellevue","state":"WA"},{"name":"Olympia","state":"WA"}]}
# Out: {"locations":{"NY":["New York"],"WA":["Seattle","Bellevue","Olympia"]}}
```

## sum

Sum the numerical values of an array.

#### Examples


```coffee
root.sum = this.foo.sum()

# In:  {"foo":[3,8,4]}
# Out: {"sum":15}
```

## unique

Attempts to remove duplicate values from an array. The array may contain a combination of different value types, but numbers and strings are checked separately (`"5"` is a different element to `5`).

#### Parameters

**emit** &lt;(optional) query expression&gt; An optional query that can be used in order to yield a value for each element to determine uniqueness.  

#### Examples


```coffee
root.uniques = this.foo.unique()

# In:  {"foo":["a","b","a","c"]}
# Out: {"uniques":["a","b","c"]}
```

## values

Returns the values of an object as an array. The order of the resulting array will be random.

#### Examples


```coffee
root.foo_vals = this.foo.values().sort()

# In:  {"foo":{"bar":1,"baz":2}}
# Out: {"foo_vals":[1,2]}
```

## with

Returns an object where all but one or more [field path]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/field-paths" >}}) arguments are removed. Each path specifies a specific field to be retained from the input object, allowing for nested fields.

If a key within a nested path does not exist then it is ignored.

#### Examples


```coffee
root = this.with("inner.a","inner.c","d")

# In:  {"inner":{"a":"first","b":"second","c":"third"},"d":"fourth","e":"fifth"}
# Out: {"d":"fourth","inner":{"a":"first","c":"third"}}
```

## without

Returns an object where one or more [field path]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/field-paths" >}}) arguments are removed. Each path specifies a specific field to be deleted from the input object, allowing for nested fields.

If a key within a nested path does not exist or is not an object then it is not removed.

#### Examples


```coffee
root = this.without("inner.a","inner.c","d")

# In:  {"inner":{"a":"first","b":"second","c":"third"},"d":"fourth","e":"fifth"}
# Out: {"e":"fifth","inner":{"b":"second"}}
```

## zip

Zip an array value with one or more argument arrays. Each array must match in length.

#### Examples


```coffee
root.foo = this.foo.zip(this.bar, this.baz)

# In:  {"foo":["a","b","c"],"bar":[1,2,3],"baz":[4,5,6]}
# Out: {"foo":[["a",1,4],["b",2,5],["c",3,6]]}
```