---
date: 2017-03-23T17:57:36Z
title: Request Body
menu:
  main:
    parent: "Transform Traffic"
weight: 3 
url: /transform-traffic/request-body/
aliases:
  - /advanced-configuration/transform-traffic/request-body/
---

Sometimes you may be exposing an older API, or one that uses a legacy structure for input data, or you are actually creating a new API schema and models that are cleaner which you want to apply to your existing API without modifying it (it may have many legacy clients that cannot be upgraded).

Our body transform middleware uses the Go template language. See [Godoc](https://golang.org/pkg/text/template/) to learn more and a useful [blogpost](https://blog.gopheracademy.com/advent-2017/using-go-templates/) on using Go templates.

You can modify requests in the following format:

* JSON
* XML

## Modification with API Definition

Setting up transforms in your API definition is easy:

```{.copyWrapper}
"extended_paths": {
  "ignored": [],
  "white_list": [],
  "black_list": [],
  "cache": ["get"],
  "transform": [
    {
      "path": "widgets/{id}",
      "method": "POST",
      "template_data": {
        "template_mode": "file",
        "template_source": "./templates/transform_test.tmpl",
        "input_type": "json",
        "enable_session": true,
      }
    }
  ]
}
```

Tyk will load and evaluate the template on start. If you modify the template, you will need to restart Tyk in order for the changes to take effect.

The field representations are:

*   `path`: The path to match.
*   `method` : The method to match.
*   `template_data.input_type`: Either `xml` or `json`, this represents the type of data the parser should expect.
*   `template_data.enable_session`: This makes session metadata available to the transform template (see the section on session data below).
*   `template_data.template_source`: Either a file path, or a `base64` encoded representation of your template.
*   `template_data.template_mode`: Set to `blob` for a base64 template and `file` for a file path in the template source.

## Modification with the Dashboard

Adding a body transformation using the Endpoint Designer is very straightforward. You can use the same example as above in the API Definition.

### Step 1: Create the Transform

Create a new Endpoint and select the **Body Transforms** plugin.

![Endpoint designer](/img/2.10/body_transforms.png)

### Step 2: Define the Transform

Select your input type, and then add the template you would like to use to the **Template** input box.

![Body transform](/img/dashboard/system-management/define_transform_2.5.png)

### Step 3: Test the Transform

If you have sample input data, you can use the input box to add it, and then test it using the **Test** button.

As you can see from the screenshot above, we've already done this and you can see the sample output of the transformation in the **Output** field.


## JSON Data

Tyk will unmarshal the data into a data structure, and then make that data available to the template in dot-notation. Here is an example to illustrate.

### JSON

Assume your inbound date structure is as follows:

```{.copyWrapper}
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

### Template

You could use a Golang template that looks like this to transform it into a different format:

```{.copyWrapper}
{
  "value1": "{{.value2}}",
  "value2": "{{.value1}}",
  "transformed_list": [
    {{range $index, $element := .value_list}}
        {{if $index}}
        , "{{$element}}"
        {{else}}
          "{{$element}}"
        {{end}}
    {{end}}
  ]
}
```

### Output

This example would produce the following output:

```
{
  "value1": "value-2",
  "value2": "value-1",
  "transformed_list": [
    "one",
    "two",
    "three"
  ]
}
```

### Automatic XML to JSON Transformation
> Available starting from Gateway 2.4

Using the `jsonMarshal` template helper you can perform JSON style character escaping, and for complex objects serialise them to a JSON string. 
 
Example:

```{.copyWrapper}
{{ .myField | jsonMarshal }} 
```

Since XML and JSON are not backward compatible formats, automatic JSON marshaling will try to do the best job, but in some cases it will be not enough. Your JSON output may not look native enough like this: 

```
{"foo": {"-type": "int", "#text": "bar"}}
```

In order to fix that you can enchance your transformation with a "replace" function.

```
{{ . | jsonMarshal | replace "\"-" "\"" | replace "#text" "1" }}
```

So your final JSON output will look much better:

```
{"foobar": {"type": "int", "value": "1"}`
```

Tyk also provides an `xmlMarshal` template to perform conversions in the opposite direction, from JSON to XML.

Example:

```{.copyWrapper}
{{ .myField | xmlMarshal }} 
```

To learn more about available template functions see [Go Template Functions](#go-template-functions).

## XML Data

We have a video that demonstrates how the XML to JSON transform works, using the sample Input and template below.

{{< youtube kLh_qAI3meE >}}

With an XML document it is a little different from JSON as XML cannot be as easily decoded into strict structures as JSON, so the syntax is a little different. Here is an example to illustrate.

### Input

For this XML:

```{.copyWrapper}
<?xml version="1.0" encoding="utf-8"?>
<servers version="1">
  <server>
    <serverName>Shanghai_VPN</serverName>
    <serverIP>127.0.0.1</serverIP>
  </server>
  <server>
    <serverName>Beijing_VPN</serverName>
    <serverIP>127.0.0.2</serverIP>
  </server>
</servers>
```

### Template

And this Template:

```{.copyWrapper}
{
{{if hasPrefix "[]" (printf "%T" .servers.server) }}
    {{range $x, $s := .servers.server}}    "{{$s.serverName}}": "{{$s.serverIP}}"{{if not $x}},{{end}}
    {{end}}
{{else}}
    "{{.servers.server.serverName}}": "{{.servers.server.serverIP}}"
{{end}}
}
```

### Output

You get this output:

```
{
  "Shanghai_VPN": "127.0.0.1",
  "Beijing_VPN": "127.0.0.2"
}
```
## Metadata

It is also possible to insert key metadata into a body transform, you can do this by calling the `._tyk_meta.KEYNAME` namespace, e.g.:

```{.copyWrapper}
{
  "value1": "value-1",
  "value2": "value-2",
  "transformed_list": [
    "one",
    "two",
    "three"
  ],
  "user-id": "{{._tyk_meta.uid}}"
}
```

This mechanism operates the same way as the header injection middleware.

## Context Data

Tyk also allows context variables to be injected into the body using the `._tyk_context.` namespace, unlike the context exposed to the URL rewriter and header injector, the body transform can fully iterate through list indices so, for example, calling `{{ index ._tyk_context.path_parts 0 }}` in a template will expose the first entry in the `path_parts` list.

Some of the context variables that are available are:

*   `request_data`: If the inbound request contained any query data or form data, it will be available in this object as a `key:[]value` map.
*   `path_parts`: The components of the path, split on `/`, it will be available in this object as a `[]string` array.
*   `token`: The inbound raw token (if bearer tokens are being used) of this user.
*   `path`: The path that is being requested.
*   `remote_addr`: The IP address of the connecting client.

As headers are also exposed to context data, you can access any header from context variables by using:

```{.copyWrapper}
{{$tyk_context.headers_HEADERNAME}}
```

Or (for body transforms):

```{.copyWrapper}
{{._tyk_context.headers_HEADERNAME}}
```
See [Context Variables](/concepts/context-variables/) for more details.

## Form Data

It is possible to work with inbound form data by making use of the Context Variable feature built into Tyk. If context variables are enabled in your API definition, then it is possible to iterate through form or querystring data in your template.

You do this by using the `._tyk_context.` namespace. Unlike the context exposed to the URL rewriter and header injector, the body transform can fully iterate through list indices, so for example calling `{{ index ._tyk_context.request_data.variablename 0 }}` in a template will expose the first entry in the `request_data.variablename` key/value array.

The `request_data` section is populated if the inbound request contained any query data or form data, it will be available in this object as a `key:[]value` map.

### Go Template Functions

For increasing the functions available to the built in Go templating, we have bundled the [Sprig Library (v3)](http://masterminds.github.io/sprig/) which provides over 70 additional functions for transformations.
