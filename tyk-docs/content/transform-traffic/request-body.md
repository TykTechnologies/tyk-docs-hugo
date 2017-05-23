---
date: 2017-03-23T17:57:36Z
title: Request Body
menu:
  main:
    parent: "Transform Traffic"
weight: 3 
---

Sometimes you may be exposing an older API, or one that uses a legacy structure for input data, or you are actually creating a new API schema and models that are cleaner which you want to apply to your existing API without modifying it (it may have many legacy clients that cannot be upgraded).

As of Tyk 1.5 it is possible to modify inbound JSON requests and as of v2.2 XML requests using a golang template.

## <a name="with-api"></a> Request Body Modification with API Definition

Setting up transforms in your API definition is easy:

```
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
                    "template_source": "./templates/transform_test.tmpl"
                }
            }
        ]
    }
```

Tyk will load and evaluate the template on start, if you modify the template, you will need to restart Tyk in order for the changes to take effect.

The field representations are:

*   `path`: The path to match.
*   `method` : The method to match.
*   `template_data.input_type`: Either `xml` or `json`, this represents the type of data the parser should expect.
*   `enable_session`: This makes session metadata available to the transform template (see the section on session data below).
*   `template_source`: Either a file path, or a `base64` encoded representation of your template.
*   `template_mode`: Set to `blob` for a base64 template and `file` for a file path in the template source.

## <a name="with-dashboard"></a> Request Body Modification with the Dashboard

Adding a body transformation using the endpoint designer is very straightforward, you can use the same examples that are set out in the API Definition Object configuration transformation documentation with the dashboard.

### Step 1: Create the transform

Create a new Endpoint and select the **Body Transforms** plugin.

![Endpoint designer][1]

### Step 2: Define the transform

Select your input type, and then add the template you would like to use to the **Template** input box.

![Body transform][2]

### Step 3: Test the transform

If you have sample input data, you can use the input box to add it, and then test it using the **Test** button.

As you can see from the screenshot above, we've already done this and you can see the sample output of the transformation in the **Output** field.


## <a name="json-data"></a> Request Body JSON Data

Tyk will unmarshal the data into a data structure, and then make that data available to the template in dot-notation. Here is an example to illustrate.

### JSON

Assume your inbound date structure is as follows:

```
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

You could use a golang template that looks like this to transform it into a different format:

```
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
        "value1": "value-1",
        "value2": "value-2",
        "transformed_list": [
            "one",
            "two",
            "three"
        ]
    }
```

## <a name="xml-data"></a> Request Body XML Data

With an XML document it is a little different from JSON as XML cannot be as easily decoded into strict structures as JSON, so the syntax is a little different. Here is an example to illustrate.

### Input

For this XML:

```
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

```
    {
    {{range $x, $s := .servers.server}}    "{{$s.serverName}}": "{{$s.serverIP}}"{{if not $x}},{{end}}
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
## <a name="meta-data"></a> Request Body Meta Data

It is also possible to insert key meta data into a body transform, you can do this by calling the `._tyk_meta.KEYNAME` namespace, e.g.:

```
    {
        "value1": "value-1",
        "value2": "value-2",
        "transformed_list": [
            "one",
            "two",
            "three"
        ],
        "user-id": "._tyk_meta.uid"
    }
```

This mechanism operates the same way as the header injection middleware.

## <a name="request-body-context-data"></a> Request Body Context Data

As of version 2.2 Tyk also allows context variables to be injected into the body using the `._tyk_context.` namespace, unlike the context exposed to the URL rewriter and header injector, the body transform can fully iterate through list indices so, for example, calling `_tyk_context.path_parts[0]` in a template will expose the first entry in the `path_parts` list.

The context variables that are available are:

*   `request_data`: If the inbound request contained any query data or form data, it will be available in this object as a `key:[]value` map.
*   `path_parts`: The components of the path, split on `/`, it will be available in this object as a `key:[]value` map.
*   `token`: The inbound raw token (if bearer tokens are being used) of this user.
*   `path`: The path that is being requested.
*   `remote_addr`: The IP address of the connecting client.

## <a name="form-data"></a> Request Body Form Data

It is possible to work with inbound form data by making use of the Context Variable feature built into Tyk. If context variables are enabled in your API definition, then it is possible to iterate through form or querystring data in your template.

You do this by using the `._tyk_context.` namespace, unlike the context exposed to the URL rewriter and header injector, the body transform can fully iterate through list indices, so for example calling `_tyk_context.request_data.variablename[0]` in a template will expose the first entry in the `request_data.variablename` key/value pairing.

The `request_data` section is populated if the inbound request contained any query data or form data, it will be available in this object as a `key:[]value` map.


[1]: /docs/img/dashboard/system-management/bodyTransfEndpointDesigner.png
[2]: /docs/img/dashboard/system-management/defineTransformation.png

