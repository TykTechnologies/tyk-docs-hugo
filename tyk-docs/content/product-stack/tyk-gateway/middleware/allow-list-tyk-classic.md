---
title: Using the Allow List middleware with Tyk Classic APIs
date: 2024-01-24
description: "Using the Allow List middleware with Tyk Classic APIs"
tags: ["Allow list", "middleware", "per-endpoint", "Tyk Classic"]
---

The [allow list]({{< ref "product-stack/tyk-gateway/middleware/allow-list-middleware" >}}) is a feature designed to restrict access to only specific API endpoints. It rejects requests to endpoints not specifically "allowed", returning `HTTP 403 Forbidden`. This enhances the security of the API by preventing unauthorized access to endpoints that are not explicitly permitted.

When working with Tyk Classic APIs the middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-oas" >}}) page.

## Configuring the allow list in the Tyk Classic API Definition

To enable and configure the allow list you must add a new `white_list` object to the `extended_paths` section of your API definition.

{{< note success >}}
**Note**

Historically, Tyk followed the out-dated whitelist/blacklist naming convention. We are working to remove this terminology from the product and documentation, however this configuration object currently retains the old name.
{{< /note >}}

The `white_list` object has the following configuration:

- `path`: the endpoint path
- `method`: this should be blank
- `ignore_case`: if set to `true` then the path matching will be case insensitive
- `method_actions`: a shared object used to configure the [mock response]({{< ref "advanced-configuration/transform-traffic/endpoint-designer#mock-response" >}}) middleware

The `method_actions` object should be configured as follows, with an entry created for each allowed method on the path:

- `action`: this should be set to `no_action`
- `code`: this should be set to `200`
- `headers` : this should be blank

For example:

```json  {linenos=true, linenostart=1}
{
    "extended_paths": {
        "white_list": [
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

In this example the allow list middleware has been configured for HTTP `GET` and `PUT` requests to the `/status/200` endpoint. Requests to any other endpoints will be rejected with `HTTP 403 Forbidden`, unless they also have the allow list middleware enabled.
Note that the allow list has been configured to be case sensitive, so calls to `GET /Status/200` will also be rejected.
Note also that the endpoint path has not been terminated with `$`. Requests to, for example, `GET /status/200/foobar` will be allowed as the [regular expression pattern match]({{< ref "product-stack/tyk-gateway/middleware/allow-list-middleware#endpoint-parsing" >}}) will recognize this as `GET /status/200`.

Consult section [configuring the Allow List in Tyk Operator](#tyk-operator) for details on how to configure allow lists for endpoints using Tyk Operator.

## Configuring the Allow List in the API Designer

You can use the API Designer in the Tyk Dashboard to configure the allow list middleware for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the plugin

From the **Endpoint Designer**, add an endpoint that matches the path for which you want to allow access. Select the **Whitelist** plugin.

#### Step 2: Configure the allow list

Once you have selected the middleware for the endpoint, the only additional feature that you need to configure is whether to make the middleware case insensitive by selecting **Ignore Case**.

{{< img src="/img/2.10/whitelist.png" alt="Allowlist options" >}}

#### Step 3: Save the API

Use the *save* or *create* buttons to save the changes and activate the allow list middleware.

## Configuring the Allow List in Tyk Operator {#tyk-operator}

Similar to the configuration of a [Tyk Classic API Definition](#tyk-classic) you must add a new `white_list` object to the `extended_paths` section of your API definition. Furthermore, the `use_extended_paths` configuration parameter should be set to `true`.

{{< note success >}}
**Note**

Historically, Tyk followed the out-dated whitelist/blacklist naming convention. We are working to remove this terminology from the product and documentation, however this configuration object currently retains the old name.
{{< /note >}}

```yaml {linenos=true,linenostart=1,hl_lines=["26-34"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-whitelist
spec:
  name: httpbin-whitelist
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
          white_list:
            - ignore_case: true
              method_actions:
                GET:
                  action: "no_action"
                  code: 200
                  data: ""
                  headers: {}
              path: "/get"
```

In this example the allow list middleware has been configured for `HTTP GET` requests to the `/get` endpoint. Requests to any other endpoints will be rejected with `HTTP 403 Forbidden`, unless they also have the allow list middleware enabled. Note that the allow list has been configured to case insensitive, so calls to `GET /Get` will also be accepted. Note also that the endpoint path has not been terminated with `$`. Requests to, for example, `GET /get/foobar` will be allowed as the [regular expression pattern match]({{< ref "product-stack/tyk-gateway/middleware/allow-list-middleware#endpoint-parsing" >}}) will recognize this as `GET /get`.
