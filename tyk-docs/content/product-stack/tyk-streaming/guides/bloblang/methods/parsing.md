---
title: Parsing Methods
description: Explains Bloblang parsing methods
tags: [ "Tyk Streams", "Bloblang", "Bloblang Methods", "Methods", "Parsing" ]
---

This page provides a comprehensive overview of the various parsing methods available in Bloblang, the data transformation language used within Tyk Streams. Whether you're looking to transform JSON, XML, CSV, or other data formats, these methods will help you achieve dynamic mappings and efficient data processing. Each method includes detailed parameters and practical examples to guide you through their implementation. 

## bloblang

Executes an argument [Bloblang]({{< ref "/product-stack/tyk-streaming/guides/bloblang/overview" >}}) mapping on the target. This method can be used in order to execute dynamic mappings. Imports and functions that interact with the environment, such as `file` and `env`, or that access message information directly, such as `content` or `json`, are not enabled for dynamic [Bloblang]({{< ref "/product-stack/tyk-streaming/guides/bloblang/overview" >}}) mappings.

#### Parameters

**mapping** &lt;string&gt; The mapping to execute.  

#### Examples


```coffee
root.body = this.body.bloblang(this.mapping)

# In:  {"body":{"foo":"hello world"},"mapping":"root.foo = this.foo.uppercase()"}
# Out: {"body":{"foo":"HELLO WORLD"}}

# In:  {"body":{"foo":"hello world 2"},"mapping":"root.foo = this.foo.capitalize()"}
# Out: {"body":{"foo":"Hello World 2"}}
```

## format_json

Serializes a target value into a pretty-printed JSON byte array (with 4 space indentation by default).

#### Parameters

**indent** &lt;string, default `"    "`&gt; Indentation string. Each element in a JSON object or array will begin on a new, indented line followed by one or more copies of indent according to the indentation nesting.  
**no_indent** &lt;bool, default `false`&gt; Disable indentation.  

#### Examples


```coffee
root = this.doc.format_json()

# In:  {"doc":{"foo":"bar"}}
# Out: {
#          "foo": "bar"
#      }
```

Pass a string to the `indent` parameter in order to customise the indentation.

```coffee
root = this.format_json("  ")

# In:  {"doc":{"foo":"bar"}}
# Out: {
#        "doc": {
#          "foo": "bar"
#        }
#      }
```

Use the `.string()` method in order to coerce the result into a string.

```coffee
root.doc = this.doc.format_json().string()

# In:  {"doc":{"foo":"bar"}}
# Out: {"doc":"{\n    \"foo\": \"bar\"\n}"}
```

Set the `no_indent` parameter to true to disable indentation. The result is equivalent to calling `bytes()`.

```coffee
root = this.doc.format_json(no_indent: true)

# In:  {"doc":{"foo":"bar"}}
# Out: {"foo":"bar"}
```

## format_msgpack

Formats data as a [MessagePack](https://msgpack.org/) message in bytes format.

#### Examples


```coffee
root = this.format_msgpack().encode("hex")

# In:  {"foo":"bar"}
# Out: 81a3666f6fa3626172
```

```coffee
root.encoded = this.format_msgpack().encode("base64")

# In:  {"foo":"bar"}
# Out: {"encoded":"gaNmb2+jYmFy"}
```

## format_xml

Serializes a target value into an XML byte array.


#### Parameters

**indent** &lt;string, default `"    "`&gt; Indentation string. Each element in an XML object or array will begin on a new, indented line followed by one or more copies of indent according to the indentation nesting.  
**no_indent** &lt;bool, default `false`&gt; Disable indentation.  

#### Examples


Serializes a target value into a pretty-printed XML byte array (with 4 space indentation by default).

```coffee
root = this.format_xml()

# In:  {"foo":{"bar":{"baz":"foo bar baz"}}}
# Out: <foo>
#          <bar>
#              <baz>foo bar baz</baz>
#          </bar>
#      </foo>
```

Pass a string to the `indent` parameter in order to customise the indentation.

```coffee
root = this.format_xml("  ")

# In:  {"foo":{"bar":{"baz":"foo bar baz"}}}
# Out: <foo>
#        <bar>
#          <baz>foo bar baz</baz>
#        </bar>
#      </foo>
```

Use the `.string()` method in order to coerce the result into a string.

```coffee
root.doc = this.format_xml("").string()

# In:  {"foo":{"bar":{"baz":"foo bar baz"}}}
# Out: {"doc":"<foo>\n<bar>\n<baz>foo bar baz</baz>\n</bar>\n</foo>"}
```

Set the `no_indent` parameter to true to disable indentation.

```coffee
root = this.format_xml(no_indent: true)

# In:  {"foo":{"bar":{"baz":"foo bar baz"}}}
# Out: <foo><bar><baz>foo bar baz</baz></bar></foo>
```

## format_yaml

Serializes a target value into a YAML byte array.

#### Examples


```coffee
root = this.doc.format_yaml()

# In:  {"doc":{"foo":"bar"}}
# Out: foo: bar
```

Use the `.string()` method in order to coerce the result into a string.

```coffee
root.doc = this.doc.format_yaml().string()

# In:  {"doc":{"foo":"bar"}}
# Out: {"doc":"foo: bar\n"}
```

## parse_csv

Attempts to parse a string into an array of objects by following the CSV format described in RFC 4180.

#### Parameters

**parse_header_row** &lt;bool, default `true`&gt; Whether to reference the first row as a header row. If set to true the output structure for messages will be an object where field keys are determined by the header row. Otherwise, the output will be an array of row arrays.  
**delimiter** &lt;string, default `","`&gt; The delimiter to use for splitting values in each record. It must be a single character.  
**lazy_quotes** &lt;bool, default `false`&gt; If set to `true`, a quote may appear in an unquoted field and a non-doubled quote may appear in a quoted field.  

#### Examples


Parses CSV data with a header row

```coffee
root.orders = this.orders.parse_csv()

# In:  {"orders":"foo,bar\nfoo 1,bar 1\nfoo 2,bar 2"}
# Out: {"orders":[{"bar":"bar 1","foo":"foo 1"},{"bar":"bar 2","foo":"foo 2"}]}
```

Parses CSV data without a header row

```coffee
root.orders = this.orders.parse_csv(false)

# In:  {"orders":"foo 1,bar 1\nfoo 2,bar 2"}
# Out: {"orders":[["foo 1","bar 1"],["foo 2","bar 2"]]}
```

Parses CSV data delimited by dots

```coffee
root.orders = this.orders.parse_csv(delimiter:".")

# In:  {"orders":"foo.bar\nfoo 1.bar 1\nfoo 2.bar 2"}
# Out: {"orders":[{"bar":"bar 1","foo":"foo 1"},{"bar":"bar 2","foo":"foo 2"}]}
```

Parses CSV data containing a quote in an unquoted field

```coffee
root.orders = this.orders.parse_csv(lazy_quotes:true)

# In:  {"orders":"foo,bar\nfoo 1,bar 1\nfoo\" \"2,bar\" \"2"}
# Out: {"orders":[{"bar":"bar 1","foo":"foo 1"},{"bar":"bar\" \"2","foo":"foo\" \"2"}]}
```

## parse_form_url_encoded

Attempts to parse a url-encoded query string (from an x-www-form-urlencoded request body) and returns a structured result.

#### Examples


```coffee
root.values = this.body.parse_form_url_encoded()

# In:  {"body":"noise=meow&animal=cat&fur=orange&fur=fluffy"}
# Out: {"values":{"animal":"cat","fur":["orange","fluffy"],"noise":"meow"}}
```

## parse_json

Attempts to parse a string as a JSON document and returns the result.

#### Parameters

**use_number** &lt;(optional) bool&gt; An optional flag that when set makes parsing numbers as json.Number instead of the default float64.  

#### Examples


```coffee
root.doc = this.doc.parse_json()

# In:  {"doc":"{\"foo\":\"bar\"}"}
# Out: {"doc":{"foo":"bar"}}
```

```coffee
root.doc = this.doc.parse_json(use_number: true)

# In:  {"doc":"{\"foo\":\"11380878173205700000000000000000000000000000000\"}"}
# Out: {"doc":{"foo":"11380878173205700000000000000000000000000000000"}}
```

## parse_msgpack

Parses a [MessagePack](https://msgpack.org/) message into a structured document.

#### Examples


```coffee
root = content().decode("hex").parse_msgpack()

# In:  81a3666f6fa3626172
# Out: {"foo":"bar"}
```

```coffee
root = this.encoded.decode("base64").parse_msgpack()

# In:  {"encoded":"gaNmb2+jYmFy"}
# Out: {"foo":"bar"}
```

## parse_parquet

Decodes a [Parquet file](https://parquet.apache.org/docs/) into an array of objects, one for each row within the file.

#### Parameters

**byte_array_as_string** &lt;bool, default `false`&gt; Deprecated: This parameter is no longer used.  

#### Examples


```coffee
root = content().parse_parquet()
```

## parse_url

Attempts to parse a URL from a string value, returning a structured result that describes the various facets of the URL. The fields returned within the structured result roughly follow https://pkg.go.dev/net/url#URL, and may be expanded in future in order to present more information.

#### Examples


```coffee
root.foo_url = this.foo_url.parse_url()

# In:  {"foo_url":"https://tyk.io/docs/product-stack/tyk-streaming/overview/"}
# Out: {"foo_url":{"fragment":"","host":"tyk.io","opaque":"","path":"/docs/product-stack/tyk-streaming/overview/","raw_fragment":"","raw_path":"","raw_query":"","scheme":"https"}}
```

```coffee
root.username = this.url.parse_url().user.name | "unknown"

# In:  {"url":"amqp://foo:bar@127.0.0.1:5672/"}
# Out: {"username":"foo"}

# In:  {"url":"redis://localhost:6379"}
# Out: {"username":"unknown"}
```

## parse_xml

Attempts to parse a string as an XML document and returns a structured result, where elements appear as keys of an object according to the following rules:

- If an element contains attributes they are parsed by prefixing a hyphen, `-`, to the attribute label.
- If the element is a simple element and has attributes, the element value is given the key `#text`.
- XML comments, directives, and process instructions are ignored.
- When elements are repeated the resulting JSON value is an array.
- If cast is true, try to cast values to numbers and booleans instead of returning strings.


#### Parameters

**cast** &lt;(optional) bool, default `false`&gt; whether to try to cast values that are numbers and booleans to the right type.  

#### Examples


```coffee
root.doc = this.doc.parse_xml()

# In:  {"doc":"<root><title>This is a title</title><content>This is some content</content></root>"}
# Out: {"doc":{"root":{"content":"This is some content","title":"This is a title"}}}
```

```coffee
root.doc = this.doc.parse_xml(cast: false)

# In:  {"doc":"<root><title>This is a title</title><number id=99>123</number><bool>True</bool></root>"}
# Out: {"doc":{"root":{"bool":"True","number":{"#text":"123","-id":"99"},"title":"This is a title"}}}
```

```coffee
root.doc = this.doc.parse_xml(cast: true)

# In:  {"doc":"<root><title>This is a title</title><number id=99>123</number><bool>True</bool></root>"}
# Out: {"doc":{"root":{"bool":true,"number":{"#text":123,"-id":99},"title":"This is a title"}}}
```

## parse_yaml

Attempts to parse a string as a single YAML document and returns the result.

#### Examples


```coffee
root.doc = this.doc.parse_yaml()

# In:  {"doc":"foo: bar"}
# Out: {"doc":{"foo":"bar"}}
```