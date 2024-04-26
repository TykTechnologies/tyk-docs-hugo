---
title: Go Templates
date: 2024-02-07
description: "Introduction to Go Templates"
tags: ["go templates", "golang", "body transform", "transform"]
---

Tyk's [request]({{< ref "transform-traffic/request-body" >}}) and [response]({{< ref "advanced-configuration/transform-traffic/response-body" >}}) body transform middleware use the [Go template language](https://golang.org/pkg/text/template/) to parse and modify the provided input.

In this section of the documentation, we provide some guidance and a few examples on the use of Go templating within these middleware.

### Data format conversion using helper functions
Tyk provides two helper functions to assist with data format translation between JSON and XML:
- `jsonMarshal` performs JSON style character escaping on an XML field and, for complex objects, serialises them to a JSON string ([example]({{< ref "product-stack/tyk-gateway/references/go-templates#xml-to-json-conversion-using-jsonmarshal" >}}))
- `xmlMarshal` performs the equivalent conversion from JSON to XML ([example]({{< ref "product-stack/tyk-gateway/references/go-templates#json-to-xml-conversion-using-xmlmarshal" >}}))

When creating these functions within your Go templates, please note:
- the use of `.` in the template refers to the entire input, whereas something like `.myField` refers to just the `myField` field of the input
- the pipe `|` joins together the things either side of it, which is typically input data on the left and a receiving command to process the data on the right, such as `jsonMarshal`

Hence `{{ . | jsonMarshal }}` will pass the entire input to the `jsonMarshal` helper function.

### Using functions within Go templates
You can define and use functions in the Go templates that are used for body transforms in Tyk. Functions allow you to abstract common template logic for cleaner code and to aid reusability. Breaking the template into functions improves readability of more complex tenplates.

Here is an example where we define a function called `myFunction` that accepts one parameter:
```go
{{- define "myFunction" }}
  Hello {{.}}!
{{- end}}
```

We can call that function and pass "world" as the parameter:
```go
{
  "message": {{ call . "myFunction" "world"}}
}
```

The output would be:
```json
{
  "message": "Hello world!" 
}
```

We have bundled the [Sprig Library (v3)](http://masterminds.github.io/sprig/) which provides over 70 pre-written functions for transformations to assist the creation of powerful Go templates to transform your API requests. 

### Additional resources
Here's a useful [blogpost](https://blog.gopheracademy.com/advent-2017/using-go-templates/) and [YouTube tutorial](https://www.youtube.com/watch?v=k5wJv4XO7a0) that can help you to learn about using Go templates. 

## Go templating examples
Here we provide worked examples for both [JSON]({{< ref "product-stack/tyk-gateway/references/go-templates#example-json-transformation-template" >}}) and [XML]({{< ref "product-stack/tyk-gateway/references/go-templates#example-xml-transformation-template" >}}) formatted inputs. We also explain examples using the [jsonMarshal]({{< ref "product-stack/tyk-gateway/references/go-templates#xml-to-json-conversion-using-jsonmarshal" >}}) and [xmlMarshal]({{< ref "product-stack/tyk-gateway/references/go-templates#json-to-xml-conversion-using-xmlmarshal" >}}) helper functions.

### Example JSON transformation template
Imagine you have a published API that accepts the request listed below, but your upstream service requires a few alterations, namely:
- swapping the values of parameters `value1` and `value2`
- renaming the `value_list` to `transformed_list`
- adding a `user-id` extracted from the session metadata
- adding a `client-ip` logging the client IP
- adding a `req-type` that logs the value provided in query parameter `type`

**Input**
- Session metadata `uid` = `user123`
- IP address of calling client = `192.0.0.1`
- Query parameter `type` = `strict`
```json
{
  "value1": "value-1",
  "value2": "value-2",
  "value_list": [
    "one",
    "two",
    "three"
  ]
}
```

**Template**
```go
{
  "value1": "{{.value2}}",
  "value2": "{{.value1}}",
  "transformed_list": [
    {{range $index, $element := index . "value_list"}}
    {{if $index}}, {{end}}
    "{{$element}}"
    {{end}}
  ],
  "user-id": "{{._tyk_meta.uid}}",
  "user-ip": "{{._tyk_context.remote_addr}}",
  "req-type": "{{ ._tyk_context.request_data.param.type }}" 
}
```
In this template:
- `.value1` accesses the "value1" field of the input JSON
- we swap value1 and value2
- we use the range function to loop through the "value_list" array
- `._tyk_meta.uid` injects the "uid" session metadata value
- `._tyk_context.remote_addr` injects the client IP address from the context
- `._tyk_context.request_data.param.type` injects query parameter "type"

**Output**
``` .json
{
  "value1": "value-2",
  "value2": "value-1",
  "transformed_list": [
    "one",
    "two",
    "three"
  ],
  "user-id": "user123"
  "user-ip": "192.0.0.1"
  "req-type": "strict"
}
```

### Example XML transformation template
XML cannot be as easily decoded into strict structures as JSON, so the syntax is a little different when working with an XML document. Here we are performing the reverse translation, starting with XML and converting to JSON.

**Input**
- Session metadata `uid` = `user123`
- IP address of calling client = `192.0.0.1`
- Query parameter `type` = `strict`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<data>
  <body>
    <value1>value-1</value1>
    <value2>value-2</value2>
    <valueList>
      <item>one</item>
      <item>two</item>
      <item>three</item>
    </valueList>
  </body>
</data>
```

**Template**
``` .xml
<?xml version="1.0" encoding="UTF-8"?>
<data>
  <body>
    <value1>{{ .data.body.value2 }}</value1>
    <value2>{{ .data.body.value1 }}</value2>
    <transformedList>
      {{range $index, $element := .data.body.valueList.item }}
      <item>{{$element}}</item>
      {{end}}
    </transformedList>
    <userId>{{ ._tyk_meta.uid }}</userId>
    <userIp>{{ ._tyk_context.remote_addr }}</userIp>
    <reqType>{{ ._tyk_context.request_data.param.type }}</reqType>
  </body>
</data>
```
In this template:
- `.data.body.value1` accesses the "value1" field of the input XML
- we swap value1 and value2
- we use the range function to loop through the "value_list" array
- `._tyk_meta.uid` injects the "uid" session metadata value
- `._tyk_context.remote_addr` injects the client IP address from the context
- `._tyk_context.request_data.param.type` injects query parameter "type"

**Output**
``` .xml
<?xml version="1.0" encoding="UTF-8"?>
<data>
  <body>
    <value1>value-2</value1>
    <value2>value-1</value2>
    <transformedList>
      <item>one</item>
      <item>two</item>
      <item>three</item>
    </transformedList>
    <userId>user123</userId>
    <userIp>192.0.0.1</userIp>
    <reqType>strict</reqType>
  </body>
</data>
```

### XML to JSON conversion using jsonMarshal
The `jsonMarshal` function converts XML formatted input into JSON, for example:

**Input**
```xml
<hello>world</hello>
```

**Template**
```go
{{ . | jsonMarshal }}
```

**Output**
```json
{"hello":"world"}
```

Note that in this example, Go will step through the entire data structure provided to the template. When used in the [Request]({{< ref "transform-traffic/request-body#data-accessible-to-the-middleware" >}}) or [Response]({{< ref "advanced-configuration/transform-traffic/response-body#data-accessible-to-the-middleware" >}}) Body Transform middleware, this would include Context Variables and Session Metadata if provided to the middleware.

### JSON to XML conversion using xmlMarshal
The `xmlMarshal` function converts JSON formatted input into XML, for example:

**Input**
```json
{"hello":"world"}
```
**Template**
``` .go
{{ . | xmlMarshal }}
```

**Output**
```xml
<hello>world</hello>
```

Note that in this example, Go will step through the entire data structure provided to the template. When used in the [Request]({{< ref "transform-traffic/request-body#data-accessible-to-the-middleware" >}}) or [Response]({{< ref "advanced-configuration/transform-traffic/response-body#data-accessible-to-the-middleware" >}}) Body Transform middleware, this would include Context Variables and Session Metadata if provided to the middleware.
