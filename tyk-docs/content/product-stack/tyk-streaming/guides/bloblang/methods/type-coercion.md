---
title: Type Coercion Methods
description: Explains Type Coercion Methods
tags: [ "Tyk Streams", "Bloblang", "Bloblang Methods", "Type Coercion" ]
---

Bloblang provides a robust set of type coercion methods designed to facilitate seamless transformation and manipulation of data across various types. This includes converting values into booleans, numbers, strings or byte arrays.

## bool

Attempt to parse a value into a boolean. An optional argument can be provided, in which case if the value cannot be parsed the argument will be returned instead. If the value is a number then any non-zero value will resolve to `true`, if the value is a string then any of the following values are considered valid: `1, t, T, TRUE, true, True, 0, f, F, FALSE`.

#### Parameters

**default** &lt;(optional) bool&gt; An optional value to yield if the target cannot be parsed as a boolean.  

#### Examples

```coffee
root.foo = this.thing.bool()
root.bar = this.thing.bool(true)
```

## bytes

Marshal a value into a byte array. If the value is already a byte array it is unchanged.

#### Examples


```coffee
root.first_byte = this.name.bytes().index(0)

# In:  {"name":"foobar bazson"}
# Out: {"first_byte":102}
```

## not_empty

Ensures that the given string, array or object value is not empty, and if so returns it, otherwise an error is returned.

#### Examples


```coffee
root.a = this.a.not_empty()

# In:  {"a":"foo"}
# Out: {"a":"foo"}

# In:  {"a":""}
# Out: Error("failed assignment (line 1): field `this.a`: string value is empty")

# In:  {"a":["foo","bar"]}
# Out: {"a":["foo","bar"]}

# In:  {"a":[]}
# Out: Error("failed assignment (line 1): field `this.a`: array value is empty")

# In:  {"a":{"b":"foo","c":"bar"}}
# Out: {"a":{"b":"foo","c":"bar"}}

# In:  {"a":{}}
# Out: Error("failed assignment (line 1): field `this.a`: object value is empty")
```

## not_null

Ensures that the given value is not `null`, and if so returns it, otherwise an error is returned.

#### Examples


```coffee
root.a = this.a.not_null()

# In:  {"a":"foobar","b":"barbaz"}
# Out: {"a":"foobar"}

# In:  {"b":"barbaz"}
# Out: Error("failed assignment (line 1): field `this.a`: value is null")
```

## number

Attempt to parse a value into a number. An optional argument can be provided, in which case if the value cannot be parsed into a number the argument will be returned instead.

#### Parameters

**default** &lt;(optional) float&gt; An optional value to yield if the target cannot be parsed as a number.  

#### Examples


```coffee
root.foo = this.thing.number() + 10
root.bar = this.thing.number(5) * 10
```

## string

Marshal a value into a string. If the value is already a string it is unchanged.

#### Examples


```coffee
root.nested_json = this.string()

# In:  {"foo":"bar"}
# Out: {"nested_json":"{\"foo\":\"bar\"}"}
```

```coffee
root.id = this.id.string()

# In:  {"id":228930314431312345}
# Out: {"id":"228930314431312345"}
```

## type

Returns the type of a value as a string, providing one of the following values: `string`, `bytes`, `number`, `bool`, `timestamp`, `array`, `object` or `null`.

#### Examples


```coffee
root.bar_type = this.bar.type()
root.foo_type = this.foo.type()

# In:  {"bar":10,"foo":"is a string"}
# Out: {"bar_type":"number","foo_type":"string"}
```

```coffee
root.type = this.type()

# In:  "foobar"
# Out: {"type":"string"}

# In:  666
# Out: {"type":"number"}

# In:  false
# Out: {"type":"bool"}

# In:  ["foo", "bar"]
# Out: {"type":"array"}

# In:  {"foo": "bar"}
# Out: {"type":"object"}

# In:  null
# Out: {"type":"null"}
```

```coffee
root.type = content().type()

# In:  foobar
# Out: {"type":"bytes"}
```

```coffee
root.type = this.ts_parse("2006-01-02").type()

# In:  "2022-06-06"
# Out: {"type":"timestamp"}
```