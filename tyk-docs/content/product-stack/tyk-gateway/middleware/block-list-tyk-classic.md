---
title: Using the Block List middleware with Tyk Classic APIs
date: 2024-01-24
description: "Using the Block List middleware with Tyk Classic APIs"
tags: ["Block list", "middleware", "per-endpoint", "Tyk Classic"]
---

The [block list]({{< ref "product-stack/tyk-gateway/middleware/block-list-middleware" >}}) is a feature designed to block access to specific API endpoints. Tyk Gateway rejects all requests made to endpoints with the block list enabled, returning `HTTP 403 Forbidden`. 

When working with Tyk Classic APIs the middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/block-list-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the block list in Tyk Operator](#tyk-operator) section below.

## Configuring the block list in the Tyk Classic API Definition {#tyk-classic}

To enable and configure the block list you must add a new `black_list` object to the `extended_paths` section of your API definition.

{{< note success >}}
**Note**  

Historically, Tyk followed the out-dated whitelist/blacklist naming convention. We are working to remove this terminology from the product and documentation, however this configuration object currently retains the old name.
{{< /note >}}

The `black_list` object has the following configuration:
- `path`: the endpoint path
- `method`: this should be blank
- `ignore_case`: if set to `true` then the path matching will be case insensitive
- `method_actions`: a shared object used to configure the [mock response]({{< ref "product-stack/tyk-gateway/middleware/mock-response-middleware#when-is-it-useful" >}}) middleware

The `method_actions` object should be configured as follows, with an entry created for each blocked method on the path:
- `action`: this should be set to `no_action`
- `code`: this should be set to `200`
- `headers` : this should be blank

For example:
```json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "black_list": [
            {
                "disabled": false,
                "path": "/status/200",
                "method": "",
                "ignore_case": false,
                "method_actions": {
                    "GET": {
                        "action": "no_action",
                        "code": 200,
                        "headers": {}
                    }
                    "PUT": {
                        "action": "no_action",
                        "code": 200,
                        "headers": {}
                    }            
                }
            }
        ]
    }
}
```

In this example the block list middleware has been configured for HTTP `GET` and `PUT` requests to the `/status/200` endpoint. Requests to these endpoints will be rejected with `HTTP 403 Forbidden`.
Note that the block list has been configured to be case sensitive, so calls to `GET /Status/200` will not be rejected.
Note also that the endpoint path has not been terminated with `$`. Requests to, for example, `GET /status/200/foobar` will be rejected as the [regular expression pattern match]({{< ref "product-stack/tyk-gateway/middleware/block-list-middleware#endpoint-parsing" >}}) will recognize this as `GET /status/200`.

Consult section [configuring the Allow List in Tyk Operator](#tyk-operator) for details on how to configure allow lists for endpoints using Tyk Operator.

## Configuring the Block List in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the block list middleware for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer** add an endpoint that matches the path for which you want to prevent access. Select the **Blacklist** plugin.

#### Step 2: Configure the block list

Once you have selected the middleware for the endpoint, the only additional feature that you need to configure is whether to make the middleware case insensitive by selecting **Ignore Case**.

{{< img src="/img/2.10/blacklist.png" alt="Blocklist options" >}}

#### Step 3: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

## Configuring the block list in Tyk Operator {#tyk-operator}

Similar to the configuration of a [Tyk Classic API Definition](#tyk-classic) you must add a new `black_list` object to the `extended_paths` section of your API definition. Furthermore, the `use_extended_paths` configuration parameter should be set to `true`.

{{< note success >}}
**Note**

Historically, Tyk followed the out-dated whitelist/blacklist naming convention. We are working to remove this terminology from the product and documentation, however this configuration object currently retains the old name.
{{< /note >}}

```yaml {linenos=true, linenostart=1, hl_lines=["26-34"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-blacklist
spec:
  name: httpbin-blacklist
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org/
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
          black_list:
            - ignore_case: true
              method_actions:
                GET:
                  action: "no_action"
                  code: 200
                  data: ""
                  headers: {}
              path: "/get"
```

In this example the block list middleware has been configured for HTTP `GET` requests to the `/get` endpoint. Requests to this endpoint will be rejected with `HTTP 403 Forbidden`.
Note that the block list has been configured to be case insensitive, so calls to `GET /Get` will not be rejected.
Note also that the endpoint path has not been terminated with `$`. Requests to, for example, `GET /get/foobar` will be rejected as the [regular expression pattern match]({{< ref "product-stack/tyk-gateway/middleware/block-list-middleware#endpoint-parsing" >}}) will recognize this as `GET /get`.

