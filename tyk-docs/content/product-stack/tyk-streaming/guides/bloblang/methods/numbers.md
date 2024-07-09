---
title: Number Manipulation Methods
description: Explains Number Manipulation Methods
tags: [ "Tyk Streams", "Bloblang", "Bloblang Methods", "Number", "Number Manipulation" ]
---

Number manipulation methods in Bloblang offer a robust suite of tools for performing various numerical transformations and calculations. These methods enable users to convert, round, and compute values with precision, catering to specific data type requirements.

## abs

Returns the absolute value of an int64 or float64 number. As a special case, when an integer is provided that is the minimum value it is converted to the maximum value.

#### Examples


```coffee

root.outs = this.ins.map_each(ele -> ele.abs())


# In:  {"ins":[9,-18,1.23,-4.56]}
# Out: {"outs":[9,18,1.23,4.56]}
```

## ceil

Returns the least integer value greater than or equal to a number. If the resulting value fits within a 64-bit integer then that is returned, otherwise a new floating point number is returned.

#### Examples


```coffee
root.new_value = this.value.ceil()

# In:  {"value":5.3}
# Out: {"new_value":6}

# In:  {"value":-5.9}
# Out: {"new_value":-5}
```

## float32

Converts a numerical type into a 32-bit floating point number, this is for advanced use cases where a specific data type is needed for a given component (such as the ClickHouse SQL driver).

If the value is a string then an attempt will be made to parse it as a 32-bit floating point number. Please refer to the [strconv.ParseFloat documentation](https://pkg.go.dev/strconv#ParseFloat) for details regarding the supported formats.

#### Examples

```coffee

root.out = this.in.float32()


# In:  {"in":"6.674282313423543523453425345e-11"}
# Out: {"out":6.674283e-11}
```

## float64

Converts a numerical type into a 64-bit floating point number, this is for advanced use cases where a specific data type is needed for a given component (such as the ClickHouse SQL driver).

If the value is a string then an attempt will be made to parse it as a 64-bit floating point number. Please refer to the [strconv.ParseFloat documentation](https://pkg.go.dev/strconv#ParseFloat) for details regarding the supported formats.

#### Examples

```coffee

root.out = this.in.float64()


# In:  {"in":"6.674282313423543523453425345e-11"}
# Out: {"out":6.674282313423544e-11}
```

## floor

Returns the greatest integer value less than or equal to the target number. If the resulting value fits within a 64-bit integer then that is returned, otherwise a new floating point number is returned.

#### Examples


```coffee
root.new_value = this.value.floor()

# In:  {"value":5.7}
# Out: {"new_value":5}
```

## int16

Converts a numerical type into a 16-bit signed integer, this is for advanced use cases where a specific data type is needed for a given component (such as the ClickHouse SQL driver).

If the value is a string then an attempt will be made to parse it as a 16-bit signed integer. If the target value exceeds the capacity of an integer or contains decimal values then this method will throw an error. In order to convert a floating point number containing decimals first use [.round()](#round) on the value. Please refer to the [strconv.ParseInt documentation](https://pkg.go.dev/strconv#ParseInt) for details regarding the supported formats.

#### Examples

```coffee

root.a = this.a.int16()
root.b = this.b.round().int16()
root.c = this.c.int16()
root.d = this.d.int16().catch(0)


# In:  {"a":12,"b":12.34,"c":"12","d":-12}
# Out: {"a":12,"b":12,"c":12,"d":-12}
```

```coffee

root = this.int16()


# In:  "0xDE"
# Out: 222
```

## int32

Converts a numerical type into a 32-bit signed integer, this is for advanced use cases where a specific data type is needed for a given component (such as the ClickHouse SQL driver).

If the value is a string then an attempt will be made to parse it as a 32-bit signed integer. If the target value exceeds the capacity of an integer or contains decimal values then this method will throw an error. In order to convert a floating point number containing decimals first use [.round()](#round) on the value. Please refer to the [strconv.ParseInt documentation](https://pkg.go.dev/strconv#ParseInt) for details regarding the supported formats.

#### Examples


```coffee

root.a = this.a.int32()
root.b = this.b.round().int32()
root.c = this.c.int32()
root.d = this.d.int32().catch(0)


# In:  {"a":12,"b":12.34,"c":"12","d":-12}
# Out: {"a":12,"b":12,"c":12,"d":-12}
```

```coffee

root = this.int32()


# In:  "0xDEAD"
# Out: 57005
```

## int64


Converts a numerical type into a 64-bit signed integer, this is for advanced use cases where a specific data type is needed for a given component (such as the ClickHouse SQL driver).

If the value is a string then an attempt will be made to parse it as a 64-bit signed integer. If the target value exceeds the capacity of an integer or contains decimal values then this method will throw an error. In order to convert a floating point number containing decimals first use [.round()](#round) on the value. Please refer to the [strconv.ParseInt documentation](https://pkg.go.dev/strconv#ParseInt) for details regarding the supported formats.

#### Examples


```coffee

root.a = this.a.int64()
root.b = this.b.round().int64()
root.c = this.c.int64()
root.d = this.d.int64().catch(0)


# In:  {"a":12,"b":12.34,"c":"12","d":-12}
# Out: {"a":12,"b":12,"c":12,"d":-12}
```

```coffee

root = this.int64()


# In:  "0xDEADBEEF"
# Out: 3735928559
```

## int8

Converts a numerical type into a 8-bit signed integer, this is for advanced use cases where a specific data type is needed for a given component (such as the ClickHouse SQL driver).

If the value is a string then an attempt will be made to parse it as a 8-bit signed integer. If the target value exceeds the capacity of an integer or contains decimal values then this method will throw an error. In order to convert a floating point number containing decimals first use [.round()](#round) on the value. Please refer to the [strconv.ParseInt documentation](https://pkg.go.dev/strconv#ParseInt) for details regarding the supported formats.

#### Examples

```coffee

root.a = this.a.int8()
root.b = this.b.round().int8()
root.c = this.c.int8()
root.d = this.d.int8().catch(0)


# In:  {"a":12,"b":12.34,"c":"12","d":-12}
# Out: {"a":12,"b":12,"c":12,"d":-12}
```

```coffee

root = this.int8()


# In:  "0xD"
# Out: 13
```

## log

Returns the natural logarithm of a number.

#### Examples

```coffee
root.new_value = this.value.log().round()

# In:  {"value":1}
# Out: {"new_value":0}

# In:  {"value":2.7183}
# Out: {"new_value":1}
```

## log10

Returns the decimal logarithm of a number.

#### Examples


```coffee
root.new_value = this.value.log10()

# In:  {"value":100}
# Out: {"new_value":2}

# In:  {"value":1000}
# Out: {"new_value":3}
```

## max

Returns the largest numerical value found within an array. All values must be numerical and the array must not be empty, otherwise an error is returned.

#### Examples


```coffee
root.biggest = this.values.max()

# In:  {"values":[0,3,2.5,7,5]}
# Out: {"biggest":7}
```

```coffee
root.new_value = [0,this.value].max()

# In:  {"value":-1}
# Out: {"new_value":0}

# In:  {"value":7}
# Out: {"new_value":7}
```

## min

Returns the smallest numerical value found within an array. All values must be numerical and the array must not be empty, otherwise an error is returned.

#### Examples


```coffee
root.smallest = this.values.min()

# In:  {"values":[0,3,-2.5,7,5]}
# Out: {"smallest":-2.5}
```

```coffee
root.new_value = [10,this.value].min()

# In:  {"value":2}
# Out: {"new_value":2}

# In:  {"value":23}
# Out: {"new_value":10}
```

## round

Rounds numbers to the nearest integer, rounding half away from zero. If the resulting value fits within a 64-bit integer then that is returned, otherwise a new floating point number is returned.

#### Examples


```coffee
root.new_value = this.value.round()

# In:  {"value":5.3}
# Out: {"new_value":5}

# In:  {"value":5.9}
# Out: {"new_value":6}
```

## uint16

Converts a numerical type into a 16-bit unsigned integer, this is for advanced use cases where a specific data type is needed for a given component (such as the ClickHouse SQL driver).

If the value is a string then an attempt will be made to parse it as a 16-bit unsigned integer. If the target value exceeds the capacity of an integer or contains decimal values then this method will throw an error. In order to convert a floating point number containing decimals first use [.round()](#round) on the value. Please refer to the [strconv.ParseInt documentation](https://pkg.go.dev/strconv#ParseInt) for details regarding the supported formats.

#### Examples


```coffee

root.a = this.a.uint16()
root.b = this.b.round().uint16()
root.c = this.c.uint16()
root.d = this.d.uint16().catch(0)


# In:  {"a":12,"b":12.34,"c":"12","d":-12}
# Out: {"a":12,"b":12,"c":12,"d":0}
```

```coffee

root = this.uint16()


# In:  "0xDE"
# Out: 222
```

## uint32

Converts a numerical type into a 32-bit unsigned integer, this is for advanced use cases where a specific data type is needed for a given component (such as the ClickHouse SQL driver).

If the value is a string then an attempt will be made to parse it as a 32-bit unsigned integer. If the target value exceeds the capacity of an integer or contains decimal values then this method will throw an error. In order to convert a floating point number containing decimals first use [.round()](#round) on the value. Please refer to the [strconv.ParseInt documentation](https://pkg.go.dev/strconv#ParseInt) for details regarding the supported formats.

#### Examples


```coffee

root.a = this.a.uint32()
root.b = this.b.round().uint32()
root.c = this.c.uint32()
root.d = this.d.uint32().catch(0)


# In:  {"a":12,"b":12.34,"c":"12","d":-12}
# Out: {"a":12,"b":12,"c":12,"d":0}
```

```coffee

root = this.uint32()


# In:  "0xDEAD"
# Out: 57005
```

## uint64

Converts a numerical type into a 64-bit unsigned integer, this is for advanced use cases where a specific data type is needed for a given component (such as the ClickHouse SQL driver).

If the value is a string then an attempt will be made to parse it as a 64-bit unsigned integer. If the target value exceeds the capacity of an integer or contains decimal values then this method will throw an error. In order to convert a floating point number containing decimals first use [.round()](#round) on the value. Please refer to the [strconv.ParseInt documentation](https://pkg.go.dev/strconv#ParseInt) for details regarding the supported formats.

#### Examples

```coffee

root.a = this.a.uint64()
root.b = this.b.round().uint64()
root.c = this.c.uint64()
root.d = this.d.uint64().catch(0)


# In:  {"a":12,"b":12.34,"c":"12","d":-12}
# Out: {"a":12,"b":12,"c":12,"d":0}
```

```coffee

root = this.uint64()


# In:  "0xDEADBEEF"
# Out: 3735928559
```

## uint8

Converts a numerical type into a 8-bit unsigned integer, this is for advanced use cases where a specific data type is needed for a given component (such as the ClickHouse SQL driver).

If the value is a string then an attempt will be made to parse it as a 8-bit unsigned integer. If the target value exceeds the capacity of an integer or contains decimal values then this method will throw an error. In order to convert a floating point number containing decimals first use [.round()](#round) on the value. Please refer to the [strconv.ParseInt documentation](https://pkg.go.dev/strconv#ParseInt) for details regarding the supported formats.

#### Examples

```coffee

root.a = this.a.uint8()
root.b = this.b.round().uint8()
root.c = this.c.uint8()
root.d = this.d.uint8().catch(0)


# In:  {"a":12,"b":12.34,"c":"12","d":-12}
# Out: {"a":12,"b":12,"c":12,"d":0}
```

```coffee

root = this.uint8()


# In:  "0xD"
# Out: 13
```