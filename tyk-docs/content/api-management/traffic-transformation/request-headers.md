---
title: "Request Headers"
date: 2025-01-10
description: "How to configure Request Headers traffic transformation middleware in Tyk"
tags: ["Traffic Transformation", "Request Headers"]
keywords: ["Traffic Transformation", "Request Headers"]
aliases:
  - /transform-traffic/request-headers
  - /product-stack/tyk-gateway/middleware/request-header-tyk-oas
  - /product-stack/tyk-gateway/middleware/request-header-tyk-classic
  - /advanced-configuration/transform-traffic/request-headers
---

## Overview

Tyk allows you to modify the headers of incoming requests to your API endpoints before they are passed to your upstream service.

There are two options for this:
- API-level modification that is applied to all requests to the API
- endpoint-level modification that is applied only to requests to a specific endpoint

With the header transform middleware you can append or delete any number of headers to ensure that the request contains the information required by your upstream service. You can enrich the request by adding contextual data that is held by Tyk but not included in the original request from the client.

This middleware changes only the headers and not the method or payload. You can, however, combine this with the [Request Method Transform]({{< ref "api-management/traffic-transformation/request-method" >}}) and [Request Body Tranform]({{< ref "api-management/traffic-transformation/request-body" >}}) to apply more complex transformation to requests.

There are related [Response Header Transform]({{< ref "api-management/traffic-transformation/response-headers" >}}) middleware (at API-level and endpoint-level) that provide the same functionality on the response from your upstream, prior to it being returned to the client.

### Use Cases

#### Adding Custom Headers

A common use of this feature is to add custom headers to requests, such as adding a secure header to all upstream requests (to verify that traffic is coming from the gateway), or adding a timestamp for tracking purposes.

#### Modifying Headers for Compatibility

You could use the request header transform middleware to modify headers for compatibility with a downstream system, such as changing the Content-Type header from "application/json" to "application/xml" for an API that only accepts XML requests while using the [Request Body Tranform]({{< ref "api-management/traffic-transformation/request-body" >}}) to transform the payload.

#### Prefixing or Suffixing Headers

Upstream systems or corporate policies might mandate that a prefix or suffix is added to header names, such as adding a "Bearer" prefix to all Authorization headers for easier identification internally, without modifying the externally published API consumed by the client applications.

#### Adding multi-user access to a service

You can add multi-user access to an upstream API that has a single authentication key and you want to add multi-user access to it without modifying it or adding clunky authentication methods to it to support new users.

### Working

The request header transform can be applied per-API or per-endpoint; each has a separate entry in the API definition so that you can configure both API-level and endpoint-level transforms for a single API.

The middleware is configured with a list of headers to delete from the request and a list of headers to add to the request. Each header to be added to the request is configured as a key:value pair.

The "delete header" functionality is intended to ensure that any header in the delete list is not present once the middleware completes - so if a header is not originally present in the request but is on the list to be deleted, the middleware will ignore its omission.

The "add header" functionality will capitalize any header name provided, for example if you configure the middleware to append `x-request-id` it will be added to the request as `X-Request-Id`.

In the request middleware chain, the API-level transform is applied before the endpoint-level transform so if both middleware are enabled, the endpoint-level transform will operate on the headers that have been added by the API-level transform (and will not receive those that have been deleted by it).

#### Injecting dynamic data into headers

You can enrich the request headers by injecting data from context variables or session objects into the headers.
- [context variables]({{< ref "api-management/traffic-transformation/request-context-variables" >}}) are extracted from the request at the start of the middleware chain and can be injected into added headers using the `$tyk_context.` namespace
- [session metadata]({{< ref "api-management/policies#what-is-a-session-metadata" >}}), from the Tyk Session Object linked to the request, can be injected into added headers using the `$tyk_meta.` namespace
- values from [key-value (KV) storage]({{< ref "tyk-configuration-reference/kv-store#transformation-middleware" >}}) can be injected into added headers using the notation appropriate to the location of the KV store

<hr>

<!-- proposed "summary box" to be shown graphically on each middleware page
 # Request Header Transform middleware summary
  - The Request Header Transform is an optional stage in Tyk's API Request processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Request Header Transform can be configured at the per-endpoint or per-API level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->

## Using Tyk OAS {#request-headers-using-tyk-oas}

Tyk's [request header transform]({{< ref "api-management/traffic-transformation/request-headers" >}}) middleware enables you to append or delete headers on requests to your API endpoints before they are passed to your upstream service.

There are two options for this:
- API-level modification that is applied to all requests to the API
- endpoint-level modification that is applied only to requests to a specific endpoint

{{< note success >}}
**Note**  

If both API-level and endpoint-level middleware are configured, the API-level transformation will be applied first.
{{< /note >}}

When working with Tyk OAS APIs the transformation is configured in the [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "#request-headers-using-classic" >}}) page.

### API Definition

The API-level and endpoint-level request header transforms are configured in different sections of the API definition, though have a common configuration.

### API-level transform

To append headers to, or delete headers from, all requests to your API (i.e. for all endpoints) you must add a new `transformRequestHeaders` object to the `middleware.global` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition.

You only need to enable the middleware (set `enabled:true`) and then configure the details of headers to `add` and those to `remove`.

For example:
```json {hl_lines=["38-56"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-request-header",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/status/200": {
            "get": {
                "operationId": "status/200get",
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
            "name": "example-request-header",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-request-header/",
                "strip": true
            }
        },
        "middleware": {
            "global": {
                "transformRequestHeaders": {
                    "enabled": true,
                    "remove": [
                        "Auth_Id"
                    ],
                    "add": [
                        {
                            "name": "X-Static",
                            "value": "foobar"
                        },
                        {
                            "name": "X-Request-ID",
                            "value": "$tyk_context.request_id"
                        },
                        {
                            "name": "X-User-ID",
                            "value": "$tyk_meta.uid"
                        }
                    ]
                }
            }
        }
    }
}
```

This configuration will add three new headers to each request:
- `X-Static` with the value `foobar`
- `X-Request-ID` with a dynamic value taken from the `request_id` [context variables]({{< ref "api-management/traffic-transformation/request-context-variables" >}})
- `X-User-ID` with a dynamic value taken from the `uid` field in the [session metadata]({{< ref "api-management/policies#what-is-a-session-metadata" >}})

It will also delete one header (if present) from each request:
- `Auth_Id`

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the API-level request header transform.

### Endpoint-level transform

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The request header transform middleware (`transformRequestHeaders`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `transformRequestHeaders` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `add`: a list of headers, in key:value pairs, to be appended to the request
- `remove`: a list of headers to be deleted from the request (if present) 

For example:
```json {hl_lines=["39-50"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-request-header",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/status/200": {
            "get": {
                "operationId": "status/200get",
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
            "name": "example-request-header",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-request-header/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "status/200get": {
                    "transformRequestHeaders": {
                        "enabled": true,
                        "remove": [
                            "X-Static"
                        ],
                        "add": [
                            {
                                "name": "X-Secret",
                                "value": "the-secret-key-is-secret"
                            }
                        ]
                    }
                }
            }
        }
    }
}
```

In this example the Request Header Transform middleware has been configured for requests to the `GET /status/200` endpoint. Any request received to that endpoint will have the `X-Static` header removed and the `X-Secret` header added, with the value set to `the-secret-key-is-secret`.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the endpoint-level request header transform.

### Combining API-level and Endpoint-level transforms

If the API-level transform in the previous [example]({{< ref "api-management/traffic-transformation/request-headers#api-level-transform" >}}) is applied to the same API, then because the API-level transformation is performed first, the `X-Static` header will be added (by the API-level transform) and then removed (by the endpoint-level transform) such that the overall effect of the two transforms for a call to `GET /status/200` would be to add three headers:
 - `X-Request-ID`
 - `X-User-ID`
 - `X-Secret`

and to remove one:
 - `Auth_Id` 

### API Designer

Adding and configuring the transforms to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

### Adding an API-level transform

From the **API Designer** on the **Settings** tab, after ensuring that you are in *edit* mode, toggle the switch to **Enable Transform request headers** in the **Middleware** section:
{{< img src="/img/dashboard/api-designer/tyk-oas-request-header-api-level.png" alt="Tyk OAS API Designer showing API-level Request Header Transform" >}}

Then select **NEW HEADER** as appropriate to add or remove a header from API requests. You can add or remove multiple headers by selecting **ADD HEADER** to add another to the list:
{{< img src="/img/dashboard/api-designer/tyk-oas-request-header-api-new-header.png" alt="Configuring the API-level Request Header Transform in Tyk OAS API Designer" >}}

### Adding an endpoint level transform

1. **Add an endpoint**

    From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

    {{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

    {{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

    {{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

2. **Select the Request Header Transform middleware**

    Select **ADD MIDDLEWARE** and choose the **Request Header Transform** middleware from the *Add Middleware* screen.

    {{< img src="/img/dashboard/api-designer/tyk-oas-request-header.png" alt="Adding the Request Header Transform middleware" >}}

3. **Configure header transformation**

    Select **NEW HEADER** to configure a header to be added to or removed from the request.

    {{< img src="/img/dashboard/api-designer/tyk-oas-request-header-added.png" alt="Configuring the Request Header transformation" >}}

    You can add multiple headers to either list by selecting **NEW HEADER** again.

    {{< img src="/img/dashboard/api-designer/tyk-oas-request-header-new.png" alt="Adding another header to the transformation" >}}

4. **Save the API**

    Select **ADD MIDDLEWARE** to save the middleware configuration. Remember to select **SAVE API** to apply the changes.

## Using Classic {#request-headers-using-classic}

Tyk's [request header transform]({{< ref "api-management/traffic-transformation/request-headers" >}}) middleware enables you to append or delete headers on requests to your API endpoints before they are passed to your upstream service.

There are two options for this:
- API-level modification that is applied to all requests to the API
- endpoint-level modification that is applied only to requests to a specific endpoint

{{< note success >}}
**Note**  

If both API-level and endpoint-level middleware are configured, the API-level transformation will be applied first.
{{< /note >}}

When working with Tyk Classic APIs the transformation is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you want to use dynamic data from context variables, you must [enable]({{< ref "api-management/traffic-transformation/request-context-variables#enabling-context-variables-for-use-with-tyk-classic-apis" >}}) context variables for the API to be able to access them from the request header transform middleware.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "#request-headers-using-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the Request Header Transform in Tyk Operator](#tyk-operator) section below.

### API Definition

The API-level and endpoint-level request header transforms have a common configuration but are configured in different sections of the API definition.

#### API-level transform {#tyk-classic-api}

To **append** headers to all requests to your API (i.e. for all endpoints) you must add a new `global_headers` object to the `versions` section of your API definition. This contains a list of key:value pairs, being the names and values of the headers to be added to requests.

To **delete** headers from all requests to your API, you must add a new `global_headers_remove` object to the `versions` section of the API definition. This contains a list of the names of existing headers to be removed from requests.

For example:
```json  {hl_lines=["39-45"],linenos=true, linenostart=1}
{
    "version_data": {
        "versions": {
            "Default": {
                "global_headers": {
                    "X-Static": "foobar",
                    "X-Request-ID":"$tyk_context.request_id",
                    "X-User-ID": "$tyk_meta.uid"
                },
                "global_headers_remove": [
                    "Auth_Id"
                ]
            }
        }
    },
}
```

This configuration will add three new headers to each request:
- `X-Static` with the value `foobar`
- `X-Request-ID` with a dynamic value taken from the `request_id` [context variables]({{< ref "api-management/traffic-transformation/request-context-variables" >}})
- `X-User-ID` with a dynamic value taken from the `uid` field in the [session metadata]({{< ref "api-management/policies#what-is-a-session-metadata" >}})

It will also delete one header (if present) from each request:
- `Auth_Id`

#### Endpoint-level transform {#tyk-classic-endpoint}

To configure a transformation of the request header for a specific endpoint you must add a new `transform_headers` object to the `extended_paths` section of your API definition.

It has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `delete_headers`: A list of the headers that should be deleted from the request
- `add_headers`: A list of headers, in key:value pairs, that should be added to the request

The `path` can contain wildcards in the form of any string bracketed by curly braces, for example `{user_id}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

For example:
```json
{
    "transform_headers": [
        {
            "path": "status/200",
            "method": "GET",
            "delete_headers": ["X-Static"],
            "add_headers": {"X-Secret": "the-secret-key-is-secret"}
        }
    ]
}
```

In this example the Request Header Transform middleware has been configured for HTTP `GET` requests to the `/status/200` endpoint. Any request received to that endpoint will have the `X-Static` header removed and the `X-Secret` header added, with the value set to `the-secret-key-is-secret`.

#### Combining API-level and Endpoint-level transforms

If the API-level transform in the previous [example]({{< ref "api-management/traffic-transformation/request-headers#api-level-transform" >}}) is applied to the same API, then because the API-level transformation is performed first, the `X-Static` header will be added (by the API-level transform) and then removed (by the endpoint-level transform) such that the overall effect of the two transforms for a call to `GET /status/200` would be to add three headers:
- `X-Request-ID`
- `X-User-ID`
- `X-Secret`

and to remove one:
- `Auth_Id` 

### API Designer

You can use the API Designer in the Tyk Dashboard to configure the request header transform middleware for your Tyk Classic API by following these steps.

#### API-level transform

Configuring the API-level request header transform middleware is very simple when using the Tyk Dashboard.

In the Endpoint Designer you should select the **Global Version Settings** and ensure that you have selected the **Request Headers** tab:

{{< img src="/img/2.10/global_settings_modify_headers.png" alt="Global version settings" >}}

Note that you must click **ADD** to add a header to the list (for appending or deletion).

#### Endpoint-level transform

1. **Add an endpoint for the path and select the Header Transform plugin**

    From the **Endpoint Designer** add an endpoint that matches the path for which you want to perform the transformation. Select the **Modify Headers** plugin.

    {{< img src="/img/2.10/modify_headers.png" alt="Endpoint designer" >}}

2. **Select the "Request" tab**

    This ensures that this will only be applied to inbound requests.

    {{< img src="/img/2.10/modify_headers1.png" alt="Request tab" >}}

3. **Declare the headers to be modified**

    Select the headers to delete and insert using the provided fields. You need to click **ADD** to ensure they are added to the list.

    {{< img src="/img/2.10/modify_headers2.png" alt="Header transforms" >}}

4. **Save the API**

    Use the *save* or *create* buttons to save the changes and activate the middleware.

### Tyk Operator

The process for configuring a request header transform is similar to that defined in section Configuring the Request Header Transform in the Tyk Classic API Definition. Tyk Operator allows you to configure a request size limit for [all endpoints of an API](#tyk-operator-api) or for a [specific API endpoint](#tyk-operator-endpoint).

#### API-level transform {#tyk-operator-api}

Request headers can be removed and inserted using the following fields within an `ApiDefinition`:

- `global_headers`: Mapping of key values corresponding to headers to add to API requests.
- `global_headers_remove`: List containing the name of headers to remove from API requests.

The example below shows an `ApiDefinition` custom resource that adds *foo-req* and *bar-req* headers to the request before it is sent upstream. The *foo-req* header has a value of *foo-val* and the *bar-req* header has a value of *bar-val*. Furthermore, the *hello* header is removed from the request before it is sent upstream.

```yaml {linenos=true, linenostart=1, hl_lines=["25-29"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-global-headers
spec:
  name: httpbin-global-headers
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-global-headers
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
        global_headers:
          foo-req: my-foo
          bar-req: my-bar
        global_headers_remove:
          - hello
```

#### Endpoint-level transform {#tyk-operator-endpoint}

The process of configuring a transformation of a request header for a specific endpoint is similar to that defined in section [Endpoint-level transform](#tyk-classic-endpoint). To configure a transformation of the request header for a specific endpoint you must add a new `transform_headers` object to the `extended_paths` section of your API definition.

In the example below the Request Header Transform middleware (`transform_headers`) has been configured for HTTP `POST` requests to the `/anything` endpoint. Any request received to that endpoint will have the `remove_this` header removed and the `foo` header added, with the value set to `bar`.

```yaml {linenos=true, linenostart=1, hl_lines=["41-47"]}
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

