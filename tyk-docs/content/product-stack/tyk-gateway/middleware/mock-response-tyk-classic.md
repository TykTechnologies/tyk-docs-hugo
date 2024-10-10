---
title: Using the Mock Response middleware with Tyk Classic APIs
date: 2024-01-31
description: "Using the Mock Response middleware with Tyk Classic APIs"
tags: ["mock response", "middleware", "per-endpoint", "Tyk Classic", "Tyk Classic API"]
---

The [Mock Response]({{< ref "product-stack/tyk-gateway/middleware/mock-response-middleware" >}}) middleware allows you to configure Tyk to return a response for an API endpoint without requiring an upstream service. This can be useful when creating a new API or making a development API available to an external team.

When working with Tyk Classic APIs, this middleware is executed at the start of the request processing chain. Thus an endpoint with the mock response middleware will not be authenticated, will not process other middleware configured for the API (neither API nor endpoint level) and will have no analytics created. It will simply return the configured response for any request made to that endpoint.

The middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API, the API Designer or in [Tyk Operator](#tyk-operator).

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/mock-response-tyk-oas" >}}) page.

## Configuring the middleware in the Tyk Classic API Definition {#tyk-classic}

If you're using Tyk Operator then check out the [configuring the middleware in Tyk Operator](#tyk-operator) section below.

To enable mock response, you must first add the endpoint to a list - one of [allow list]({{< ref "product-stack/tyk-gateway/middleware/allow-list-middleware" >}}), [block list]({{< ref "product-stack/tyk-gateway/middleware/block-list-middleware" >}}) or [ignore authentication]({{< ref "product-stack/tyk-gateway/middleware/ignore-middleware" >}}). This will add a new object to the `extended_paths` section of your API definition - `white_list`, `black_list` or `ignored`. The mock response can then be configured within the `method_actions` element within the new object.

The `white_list`, `black_list` and `ignored` objects all have the same structure and configuration as follows:

- `path`: the endpoint path
- `method`: this should be blank
- `ignore_case`: if set to `true` then the path matching will be case insensitive
- `method_actions`: the configuration of the mock response

The `method_actions` object should be configured as follows, with an entry created for each method on the path for which you wish to configure the mock response:

- `action`: this should be set to `reply`
- `code`: the HTTP status code to be provided with the response
- `headers`: the headers to inject with the response
- `data`: the payload to be returned as the body of the response

For example:

```json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "white_list": [
            {
                "disabled": false,
                "path": "/anything",
                "method": "",
                "ignore_case": false,
                "method_actions": {
                    "GET": {
                        "action": "reply",
                        "code": 200,
                        "data": "This is the mock response body",
                        "headers": {
                            "X-Example-Header": "foobar"
                        }
                    }          
                }
            }
        ]
    }
}
```

In this example the mock response middleware has been configured for requests to the `GET /anything` endpoint. The [allow list]({{< ref "product-stack/tyk-gateway/middleware/allow-list-middleware" >}}) middleware has been enabled for this endpoint and is case sensitive, so calls to `GET /Anything` will not return the mock response.

A call to `GET /anything` would return:

```
HTTP/1.1 200 OK
X-Example-Header: foobar
Date: Wed, 31 Jan 2024 16:21:05 GMT
Content-Length: 30
Content-Type: text/plain; charset=utf-8

This is the mock response body
```

## Configuring the middleware in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the Mock Response middleware for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and configure a list plugin

For the mock response to be enabled, the endpoint must also be in a list. We recommend adding the path to an allow list by [selecting]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-classic#configuring-the-allow-list-in-the-api-designer" >}}) the **Whitelist** plugin.

#### Step 2: Add the mock response plugin

Now select the **Mock response** plugin.

{{< img src="/img/dashboard/endpoint-designer/mock-response.png" alt="Selecting the mock response middleware for a Tyk Classic API" >}}

#### Step 3: Configure the middleware

Once you have selected the Mock response middleware for the endpoint, you can configure the HTTP status code, headers and body to be included in the response. Remember to click **ADD**, to add each header to the response.

{{< img src="/img/dashboard/endpoint-designer/mock-response-config.png" alt="Configuring the mock response middleware for a Tyk Classic API" >}}

#### Step 4: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

{{< note success >}}
**Note**

For the mock response to be enabled, the endpoint must also be in a list. We recommend adding the path to an [allow list]({{< ref "advanced-configuration/transform-traffic/endpoint-designer#allowlist" >}}). If this isn't done, then the mock will not be saved when you save your API in the designer.
{{< /note >}}

## Configuring the middleware in Tyk Operator {#tyk-operator}

The process of configuring a mock response is similar to that defined in the [configuring the middleware in Tyk Classic API definition](#tyk-classic) section.

To configure a mock response, you must first add a mock response configuration object to the `extended_paths` section, e.g. one of allow list (`white_list`), block list (`black_list`) or ignore authentication (`ignore`). The mock response configuration object has the following properties:

- path: the path of the endpoint, e.g `/foo`.
- ignore_case: when set to true the path matching is case insensitive.
- method_actions: a configuration object that allows the mock response to be configured for a given method, including the response body, response headers and status code. This object should also contain an `action` field with a value set to `reply`.

In the example below we can see that a mock response is configured to ignore authentication (`ignore`) for the `GET /foo` endpoint. When a request is made to the endpoint then authentication will be ignored and a mock response is returned with status code `200` and a response body payload of `{"foo": "bar"}`. The middleware has been configured to be case sensitive, so calls to `GET /Foo` will not ignore authentication.

```yaml {linenos=true, linenostart=1, hl_lines=["26-34"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin
spec:
  name: httpbin
  protocol: http
  active: true
  use_keyless: true
  proxy: 
    target_url: http://httpbin.org
    listen_path: /httpbin
    strip_listen_path: true
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
            ignored:
              - ignore_case: false
                method_actions:
                  GET:
                    action: "reply"
                    code: 200
                    data: "{\"foo\": \"bar\"}"
                    headers: {}
                path: /foo
```
