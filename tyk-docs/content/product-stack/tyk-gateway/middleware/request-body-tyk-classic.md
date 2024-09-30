---
title: Using the Request Body Transform middleware with Tyk Classic APIs
date: 2024-02-07
description: "Using the Request Body Transform middleware with Tyk Classic APIs"
tags: ["request transform", "body transform", "transform", "middleware", "per-endpoint", "Tyk Classic", "Tyk Classic API"]
---

The [request body transform]({{< ref "transform-traffic/request-body" >}}) middleware provides a way to modify the payload of API requests before they are proxied to the upstream.

This middleware is configured in the Tyk Classic API Definition at the endpoint level. You can do this via the Tyk Dashboard API or in the API Designer.

If you want to use dynamic data from context variables, you must [enable]({{< ref "context-variables#enabling-context-variables-for-use-with-tyk-classic-apis" >}}) context variables for the API to be able to access them from the request header transform middleware.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/request-body-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [Configuring the middleware in Tyk Operator](#tyk-operator) section below.

## Configuring the middleware in the Tyk Classic API Definition {#tyk-classic}

To enable the middleware you must add a new `transform` object to the `extended_paths` section of your API definition.

The `transform` object has the following configuration:
- `path`: the path to match on
- `method`: this method to match on
- `template_data`: details of the Go template to be applied for the transformation of the request body
 
The Go template is described in the `template_data` object by the following fields:
- `input_type`: the format of input data the parser should expect (either `xml` or `json`)
- `enable_session`: set this to `true` to make session metadata available to the transform template
- `template_mode`: instructs the middleware to look for the template either in a `file` or in a base64 encoded `blob`; the actual file location (or base64 encoded template) is provided in `template_source`
- `template_source`: if `template_mode` is set to `file`, this will be the path to the text file containing the template; if `template_mode` is set to `blob`, this will be a `base64` encoded representation of your template

For example:
```json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "transform": [
            {
                "path": "/anything",
                "method": "POST",
                "template_data": {
                    "template_mode": "file",
                    "template_source": "./templates/transform_test.tmpl",
                    "input_type": "json",
                    "enable_session": true
                }
            }
        ]
    }
}
```

In this example, the Request Body Transform middleware is directed to use the template located in the `file` at location `./templates/transform_test.tmpl`. The input (pre-transformation) request payload will be `json` format and session metadata will be available for use in the transformation.

{{< note success >}}

**Note**  

Tyk will load and evaluate the template file when the Gateway starts up. If you modify the template, you will need to restart Tyk in order for the changes to take effect.

{{< /note >}}

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the request body transform middleware for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to perform the transformation. Select the **Body Transforms** plugin.

{{< img src="/img/2.10/body_transforms.png" alt="Endpoint designer" >}}

#### Step 2: Configure the middleware

Ensure that you have selected the `REQUEST` tab, then select your input type, and then add the template you would like to use to the **Template** input box.

{{< img src="/img/dashboard/endpoint-designer/body-transform-request.png" alt="Setting the body request transform" >}}

#### Step 3: Test the Transform

If sample input data is available, you can use the Input box to add it, and then test it using the **Test** button. You will see the effect of the template on the sample input displayed in the Output box.

{{< img src="/img/dashboard/endpoint-designer/body-transform-test.png" alt="Testing the body transform function" >}}

#### Step 4: Save the API

Use the *save* or *create* buttons to save the changes and activate the Request Body Transform middleware.

## Configuring the middleware in Tyk Operator {#tyk-operator}

The process for configuring a request body transform is similar to that defined in section [Configuring the middleware in the Tyk Classic API Definition](#tyk-classic). Tyk Operator allows you to configure a request body transform by adding a `transform` object to the `extended_paths` section of your API definition.

In the example below the Request Body middleware (`transform`) has been configured for `HTTP POST` requests to the `/anything` endpoint. The Request Body Transform middleware is directed to use the template located in the blob included in the `template_source` field. The input (pre-transformation) request payload will be json format and session metadata will be available for use in the transformation.

```yaml {linenos=true, linenostart=1, hl_lines=["32-40"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-transform
spec:
  name: httpbin-transform
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-transform
    strip_listen_path: true
  response_processors:
    - name: response_body_transform
    - name: header_injector
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          transform:
            - method: POST
              path: /anything
              template_data:
                enable_session: false
                input_type: json
                template_mode: blob
                # base64 encoded template
                template_source: eyJiYXIiOiAie3suZm9vfX0ifQ==
          transform_headers:
            - delete_headers:
                - "remove_this"
              add_headers:
                foo: bar
              path: /anything
              method: POST
          transform_response:
            - method: GET
              path: /xml
              template_data:
                enable_session: false
                input_type: xml
                template_mode: blob
                # base64 encoded template
                template_source: e3sgLiB8IGpzb25NYXJzaGFsIH19
          transform_response_headers:
            - method: GET
              path: /xml
              add_headers:
                Content-Type: "application/json"
              act_on: false
              delete_headers: []
```
