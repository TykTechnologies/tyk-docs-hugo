---
title: Using the Request Method Transform with Tyk Classic APIs
date: 2024-01-20
description: "Using the Request Method Transform middleware with Tyk Classic APIs"
tags: ["Request Method Transform", "middleware", "per-endpoint", "Tyk Classic"]
---

Tyk's [request method transform]({{< ref "advanced-configuration/transform-traffic/request-method-transform" >}}) middleware is configured at the endpoint level, where it modifies the HTTP method used in the request to a configured value.

When working with Tyk Classic APIs the transformation is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/request-method-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring a Request Method Transform in Tyk Operator](#tyk-operator) section below.

## Configuring a Request Method Transform in the Tyk Classic API Definition {#tyk-classic}

To configure a transformation of the request method you must add a new `method_transforms` object to the `extended_paths` section of your API definition.

It has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `to_method`: The new HTTP method to which the request should be transformed

All standard HTTP methods are supported: `GET`, `PUT`, `POST`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`.

For example:
```json
{
    "method_transforms": [
        {
            "path": "/status/200",
            "method": "GET",
            "to_method": "POST"
        }
    ]
}
```

In this example the Request Method Transform middleware has been configured for HTTP `GET` requests to the `/status/200` endpoint. Any request received to that endpoint will be modified to `POST /status/200`.

## Configuring a Request Method Transform in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the request method transform middleware for your Tyk Classic API by following these steps.

### Using the Dashboard

#### Step 1: Add an endpoint for the path and select the Method Transform plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to perform the transformation. Select the **Method Transform** plugin.

{{< img src="/img/2.10/method_transform.png" alt="Method Transform" >}}

#### Step 2: Configure the transform

Then select the HTTP method to which you wish to transform the request.

{{< img src="/img/2.10/method_transform2.png" alt="Method Path" >}}

#### Step 3: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

## Configuring a Request Method Transform in Tyk Operator {#tyk-operator}

The process for configuring a request method transform for an endpoint in Tyk Operator is similar to that defined in section [configuring a Request Method Transform in the Tyk Classic API Definition](#tyk-classic).

To configure a transformation of the request method you must add a new `method_transforms` object to the `extended_paths` section of your API definition:

```yaml {linenos=true, linenostart=1, hl_lines=["26-29"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.default.svc:8000
    listen_path: /transform
    strip_listen_path: true
  version_data:
    default_version: v1
    not_versioned: true
    versions:
      v1:
        name: v1
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          method_transforms:
            - path: /anything
              method: GET
              to_method: POST
```

The example API Definition above configures an API to listen on path `/transform` and forwards requests upstream to http://httpbin.org.

In this example the Request Method Transform middleware has been configured for `HTTP GET` requests to the `/anything` endpoint. Any request received to that endpoint will be modified to `POST /anything`.
