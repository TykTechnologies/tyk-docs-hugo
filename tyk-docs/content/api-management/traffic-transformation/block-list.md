---
title: "Block List"
date: 2025-01-10
description: "How to configure Block List traffic transformation middleware in Tyk"
tags: ["Traffic Transformation", "Block List"]
keywords: ["Traffic Transformation", "Block List"]
aliases:
  - /product-stack/tyk-gateway/middleware/block-list-middleware
  - /product-stack/tyk-gateway/middleware/block-list-tyk-oas
  - /product-stack/tyk-gateway/middleware/block-list-tyk-classic
---

## Overview {#block-list-overview}

The Block List middleware is a feature designed to block access to specific API endpoints. Tyk Gateway rejects all requests made to endpoints with the block list enabled, returning `HTTP 403 Forbidden`.

Note that this is not the same as Tyk's [IP block list]({{< ref "api-management/gateway-config-tyk-classic#ip-access-control" >}}) feature, which is used to restrict access to APIs based upon the IP of the requestor.

### Use Cases

#### Prevent access to deprecated resources

If you are versioning your API and deprecating an endpoint then, instead of having to remove the functionality from your upstream service's API you can simply block access to it using the block list middleware.

### Working

Tyk Gateway does not actually maintain a list of blocked endpoints but rather works on the model whereby if the *block list* middleware is added to an endpoint then any request to that endpoint will be rejected, returning `HTTP 403 Forbidden`.

#### Case sensitivity

By default the block list is case-sensitive, so for example if you have defined the endpoint `GET /userID` in your API definition then only calls to `GET /userID` will be blocked: calls to `GET /UserID` or `GET /userid` will be allowed. You can configure the middleware to be case-insensitive at the endpoint level.

You can also set case sensitivity for the entire [gateway]({{< ref "tyk-oss-gateway/configuration#ignore_endpoint_case" >}}) in the Gateway configuration file `tyk.conf`. If case insensitivity is configured at the gateway level, this will override the endpoint-level setting.

#### Endpoint parsing

When using the block list middleware, we recommend that you familiarize yourself with Tyk's [URL matching]({{< ref "getting-started/key-concepts/url-matching" >}}) options.

<br>
{{< note success >}}
**Note**  

Tyk recommends that you use [exact]({{< ref "getting-started/key-concepts/url-matching#exact-match" >}}) matching for maximum security, though prefix and wildcard strategies might also apply for your particular deployment or use case.
{{< /note >}}

<hr>

<!-- proposed "summary box" to be shown graphically on each middleware page
 # Block List middleware summary
  - The Block List is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Block List can be configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->

## Using Tyk OAS {#block-list-using-tyk-oas}

The [block list]({{< ref "api-management/traffic-transformation/block-list" >}}) is a feature designed to block access to specific API endpoints. Tyk Gateway rejects all requests made to endpoints with the block list enabled, returning `HTTP 403 Forbidden`. 

When working with Tyk OAS APIs the middleware is configured in the [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "#block-list-using-classic" >}}) page.

### API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. The `path` can contain wildcards in the form of any string bracketed by curly braces, for example `{user_id}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The block list middleware (`block`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `block` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `ignoreCase`: if set to `true` then the path matching will be case insensitive

For example:
```json {hl_lines=["47-50", "53-56"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-block-list",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            },
            "put": {
                "operationId": "anythingput",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        }
    },
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-block-list",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-block-list/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "anythingget": {
                    "block": {
                        "enabled": true,
                        "ignoreCase": true
                    }                
                },
                "anythingput": {
                    "block": {
                        "enabled": true,
                        "ignoreCase": true
                    }                
                }
            }
        }
    }
}
```

In this example the block list middleware has been configured for requests to the `GET /anything` and `PUT /anything` endpoints. Requests to these endpoints will be rejected with `HTTP 403 Forbidden`.
Note that the block list has been configured to be case insensitive, so calls to `GET /Anything` will also be blocked.
Note also that the endpoint path has not been terminated with `$`. Requests to, for example, `GET /anything/foobar` will be rejected as the [regular expression pattern match]({{< ref "#endpoint-parsing" >}}) will recognize this as `GET /anything`.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the block list feature.

### API Designer

Adding the block list to your API endpoints is easy is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

1. **Add an endpoint**

    From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

    {{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

    {{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

    {{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

2. **Select the Block List middleware**

    Select **ADD MIDDLEWARE** and choose the **Block List** middleware from the *Add Middleware* screen.

    {{< img src="/img/dashboard/api-designer/tyk-oas-block.png" alt="Adding the Block List middleware" >}}

3. **Optionally configure case-insensitivity**

    If you want to disable case-sensitivity for the block list, then you must select **EDIT** on the Block List icon.

    {{< img src="/img/dashboard/api-designer/tyk-oas-block-added.png" alt="Block List middleware added to endpoint - click through to edit the config" >}}

    This takes you to the middleware configuration screen where you can alter the case sensitivity setting.
    {{< img src="/img/dashboard/api-designer/tyk-oas-block-config.png" alt="Configuring case sensitivity for the Block List" >}}

    Select **UPDATE MIDDLEWARE** to apply the change to the middleware configuration.

4. **Save the API**

    Select **SAVE API** to apply the changes to your API.

## Using Classic {#block-list-using-classic}

The [block list]({{< ref "api-management/traffic-transformation/block-list" >}}) is a feature designed to block access to specific API endpoints. Tyk Gateway rejects all requests made to endpoints with the block list enabled, returning `HTTP 403 Forbidden`. 

When working with Tyk Classic APIs the middleware is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "#block-list-using-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the block list in Tyk Operator](#tyk-operator) section below.

### API Definition

To enable and configure the block list you must add a new `black_list` object to the `extended_paths` section of your API definition.

{{< note success >}}
**Note**  

Historically, Tyk followed the out-dated whitelist/blacklist naming convention. We are working to remove this terminology from the product and documentation, however this configuration object currently retains the old name.
{{< /note >}}

The `black_list` object has the following configuration:
- `path`: the endpoint path
- `method`: this should be blank
- `ignore_case`: if set to `true` then the path matching will be case insensitive
- `method_actions`: a shared object used to configure the [mock response]({{< ref "api-management/traffic-transformation/mock-response#when-is-it-useful" >}}) middleware

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
Note also that the endpoint path has not been terminated with `$`. Requests to, for example, `GET /status/200/foobar` will be rejected as the [regular expression pattern match]({{< ref "#endpoint-parsing" >}}) will recognize this as `GET /status/200`.

Consult section [configuring the Allow List in Tyk Operator](#tyk-operator) for details on how to configure allow lists for endpoints using Tyk Operator.

### API Designer

You can use the API Designer in the Tyk Dashboard to configure the block list middleware for your Tyk Classic API by following these steps.

1. **Add an endpoint for the path and select the plugin**

    From the **Endpoint Designer** add an endpoint that matches the path for which you want to prevent access. Select the **Blacklist** plugin.

2. **Configure the block list**

    Once you have selected the middleware for the endpoint, the only additional feature that you need to configure is whether to make the middleware case insensitive by selecting **Ignore Case**.

    {{< img src="/img/2.10/blacklist.png" alt="Blocklist options" >}}

3. **Save the API**

    Use the *save* or *create* buttons to save the changes and activate the middleware.

### Tyk Operator

Similar to the configuration of a Tyk Classic API Definition you must add a new `black_list` object to the `extended_paths` section of your API definition. Furthermore, the `use_extended_paths` configuration parameter should be set to `true`.

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
Note also that the endpoint path has not been terminated with `$`. Requests to, for example, `GET /get/foobar` will be rejected as the [regular expression pattern match]({{< ref "#endpoint-parsing" >}}) will recognize this as `GET /get`.



