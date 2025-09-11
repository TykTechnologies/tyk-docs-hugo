---
title: "Response Headers"
date: 2025-01-10
description: "How to configure Response Headers traffic transformation middleware in Tyk"
tags: ["Traffic Transformation", "Response Headers"]
keywords: ["Traffic Transformation", "Response Headers"]
aliases:
  - /advanced-configuration/transform-traffic/response-headers
  - /product-stack/tyk-gateway/middleware/response-header-tyk-oas
  - /product-stack/tyk-gateway/middleware/response-header-tyk-classic
---

## Overview {#response-headers-overview}

Tyk enables you to modify header information when a response is proxied back to the client. This can be very useful in cases where you have an upstream API that potentially exposes sensitive headers that you need to remove.

There are two options for this:
- API-level modification that is applied to responses for all requests to the API
- endpoint-level modification that is applied only to responses for requests to a specific endpoint

With the header transform middleware you can append or delete any number of headers to ensure that the response contains the information required by your client. You can enrich the response by adding contextual data that is held by Tyk but not included in the original response from the upstream.

This middleware changes only the headers and not the payload. You can, however, combine this with the [Response Body Transform]({{< ref "api-management/traffic-transformation/response-body" >}}) to apply more complex transformation to responses.

There are related [Request Header Transform]({{< ref "api-management/traffic-transformation/request-headers" >}}) middleware (at API-level and endpoint-level) that provide the same functionality on the request from a client, prior to it being proxied to the upstream.

### Use Cases

#### Customizing responses for specific clients

A frequent use case for response header transformation is when a client requires specific headers for their application to function correctly. For example, a client may require a specific header to indicate the status of a request or to provide additional information about the response.

#### Adding security headers

The response header transform allows you to add security headers to the response to protect against common attacks such as cross-site scripting (XSS) and cross-site request forgery (CSRF). Some security headers may be required for compliance with industry standards and, if not provided by the upstream, can be added by Tyk before forwarding the response to the client.

#### Adding metadata to response headers

Adding metadata to response headers can be useful for tracking and analyzing API usage, as well as for providing additional information to clients. For example, you may want to add a header that indicates the version of the API being used or the time taken to process the request.

#### Modifying response headers for dynamic performance optimization

You can use response header transformation to dynamically optimize the performance of the API. For example, you may want to indicate to the client the maximum number of requests that they can make in a given time period. By doing so through the response headers, you can perform dynamic optimization of the load on the upstream service without triggering the rate limiter and so avoiding errors being sent to the client.

### Working

The response header transform can be applied per-API or per-endpoint; each has a separate entry in the API definition so that you can configure both API-level and endpoint-level transforms for a single API.

The middleware is configured with a list of headers to delete from the response and a list of headers to add to the response. Each header to be added to the response is configured as a key:value pair.
- the "delete header" functionality is intended to ensure that any header in the delete list is not present once the middleware completes. If a header in the delete list is not present in the upstream response, the middleware will ignore the omission
- the "add header" functionality will capitalize any header name provided. For example, if you configure the middleware to append `x-request-id` it will be added to the response as `X-Request-Id`

In the response middleware chain, the endpoint-level transform is applied before the API-level transform. Subsequently, if both middleware are enabled, the API-level transform will operate on the headers that have been added by the endpoint-level transform (and will not have access to those that have been deleted by it).

#### Injecting dynamic data into headers

You can enrich the response headers by injecting data from context variables or session objects into the headers.
- [context variables]({{< ref "api-management/traffic-transformation/request-context-variables" >}}), extracted from the request at the start of the middleware chain, can be injected into added headers using the `$tyk_context.` namespace
- [session metadata]({{< ref "api-management/policies#what-is-a-session-metadata" >}}), from the Tyk Session Object linked to the request, can be injected into added headers using the `$tyk_meta.` namespace
- values from [key-value (KV) storage]({{< ref "tyk-configuration-reference/kv-store#transformation-middleware" >}}) can be injected into added headers using the notation appropriate to the location of the KV store

<hr>

<!-- proposed "summary box" to be shown graphically on each middleware page
 # Response Header Transform middleware summary
  - The Response Header Transform is an optional stage in Tyk's API Response processing chain, sitting between the [TBC]() and [TBC]() middleware.
  - The Response Header Transform can be configured at the per-endpoint or per-API level within the API Definition and is supported by the API Designer within the Tyk Dashboard. 
 -->

## Using Tyk OAS {#response-headers-using-tyk-oas}

Tyk's [response header transform]({{< ref "api-management/traffic-transformation/response-headers" >}}) middleware enables you to append or delete headers on responses received from the upstream service before sending them to the client.

There are two options for this:
- API-level modification that is applied to all responses for the API
- endpoint-level modification that is applied only to responses from a specific endpoint

{{< note success >}}
**Note**  

If both API-level and endpoint-level middleware are configured, the endpoint-level transformation will be applied first.
{{< /note >}}

When working with Tyk OAS APIs the transformation is configured in the [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "#response-headers-using-classic" >}}) page.

### API Definition

The API-level and endpoint-level response header transforms have a common configuration but are configured in different sections of the API definition.

#### API-level transform

To append headers to, or delete headers from, responses from all endpoints defined for your API you must add a new `transformResponseHeaders` object to the `middleware.global` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition.

You only need to enable the middleware (set `enabled:true`) and then configure the details of headers to `add` and those to `remove`.

For example:
```json {hl_lines=["38-57"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-response-header",
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
            "name": "example-response-header",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-response-header/",
                "strip": true
            }
        },
        "middleware": {
            "global": {
                "transformResponseHeaders": {
                    "enabled": true,
                    "remove": [
                        "X-Secret"
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

This configuration will add three new headers to each response:
- `X-Static` with the value `foobar`
- `X-Request-ID` with a dynamic value taken from the `request_id` [context variable]({{< ref "api-management/traffic-transformation/request-context-variables" >}})
- `X-User-ID` with a dynamic value taken from the `uid` field in the [session metadata]({{< ref "api-management/policies#what-is-a-session-metadata" >}})

It will also delete one header (if present) from each response:
- `X-Secret`

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the API-level response header transform.

#### Endpoint-level transform

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The response header transform middleware (`transformResponseMethod`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

You only need to enable the middleware (set `enabled:true`) and then configure the details of headers to `add` and those to `remove`.

For example:
```json {hl_lines=["39-50"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-response-method",
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
            "name": "example-response-method",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-response-method/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "status/200get": {
                    "transformResponseHeaders": {
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

In this example the Response Header Transform middleware has been configured for HTTP `GET` requests to the `/status/200` endpoint. Any response received from the upstream service following a request to that endpoint will have the `X-Static` header removed and the `X-Secret` and `X-New` headers added (with values set to `the-secret-key-is-secret` and `another-header`).

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the endpoint-level response header transform.

#### Combining API-level and Endpoint-level transforms

If the example [API-level]({{< ref "#api-level-transform" >}}) and [endpoint-level]({{< ref "#endpoint-level-transform" >}}) transforms are applied to the same API, then the `X-Secret` header will be added (by the endpoint-level transform first) and then removed (by the API-level transform). Subsequently, the result of the two transforms for a call to `GET /status/200` would be to add four headers:
- `X-Request-ID`
- `X-User-ID`
- `X-Static`
- `X-New`

### API Designer

Adding and configuring the transforms to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

#### Adding an API-level transform

From the **API Designer** on the **Settings** tab, after ensuring that you are in *edit* mode, toggle the switch to **Enable Transform response headers** in the **Middleware** section:
{{< img src="/img/dashboard/api-designer/tyk-oas-response-header-api-level.png" alt="Tyk OAS API Designer showing API-level Response Header Transform" >}}

Then select **NEW HEADER** as appropriate to add or remove a header from API responses. You can add or remove multiple headers by selecting **ADD HEADER** to add another to the list:
{{< img src="/img/dashboard/api-designer/tyk-oas-response-header-api-new-header.png" alt="Configuring the API-level Response Header Transform in Tyk OAS API Designer" >}}

#### Adding an endpoint level transform

1. **Add an endpoint**

    From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.
    {{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

    {{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

    {{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

2. **Select the Response Header Transform middleware**

    Select **ADD MIDDLEWARE** and choose the **Response Header Transform** middleware from the *Add Middleware* screen.

    {{< img src="/img/dashboard/api-designer/tyk-oas-add-response-header.png" alt="Adding the URL Rewrite middleware" >}}

3. **Configure header transformation**

    Select **NEW HEADER** to configure a header to be added to or removed from the response, you can add multiple headers to either list by selecting **NEW HEADER** again.

    {{< img src="/img/dashboard/api-designer/tyk-oas-response-header.png" alt="Configuring the rewrite rules for Advanced Triggers" >}}
    {{< img src="/img/dashboard/api-designer/tyk-oas-response-header-new.png" alt="Configuring the Response Header Transform" >}}

4. **Save the API**

    Select **ADD MIDDLEWARE** to save the middleware configuration. Remember to select **SAVE API** to apply the changes.

## Using Classic {#response-headers-using-classic}

Tyk's [response header transform]({{< ref "api-management/traffic-transformation/response-headers" >}}) middleware enables you to append or delete headers on responses received from the upstream service before sending them to the client.

There are two options for this:
- API-level modification that is applied to all responses for the API
- endpoint-level modification that is applied only to responses from a specific endpoint

{{< note success >}}
**Note**  

If both API-level and endpoint-level middleware are configured, the endpoint-level transformation will be applied first.
{{< /note >}}

When working with Tyk Classic APIs the transformation is configured in the Tyk Classic API Definition. You can do this via the Tyk Dashboard API or in the API Designer.

If you want to use dynamic data from context variables, you must [enable]({{< ref "api-management/traffic-transformation/request-context-variables#enabling-context-variables-for-use-with-tyk-classic-apis" >}}) context variables for the API to be able to access them from the response header transform middleware.

If you're using the newer Tyk OAS APIs, then check out the [Tyk OAS]({{< ref "#response-headers-using-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the Response Header Transform in Tyk Operator](#tyk-operator) section below.

### API Definition

The API-level and endpoint-level response header transforms have a common configuration but are configured in different sections of the API definition.
{{< note success >}}

**Note**  
Prior to Tyk 5.3.0, there was an additional step to enable response header transforms (both API-level and endpoint-level). You would need to add the following to the Tyk Classic API definition:

```json
{
    "response_processors":[
        {"name": "header_injector"}
    ]
}
```

If using the Endpoint Designer in the Tyk Dashboard, this would be added automatically.

We removed the need to configure the `response_processors` element in Tyk 5.3.0.
{{< /note >}}

#### API-level transform {#tyk-classic-api}

To **append** headers to all responses from your API (i.e. for all endpoints) you must add a new `global_response_headers` object to the `versions` section of your API definition. This contains a list of key:value pairs, being the names and values of the headers to be added to responses.

To **delete** headers from all responses from your API (i.e. for all endpoints), you must add a new `global_response_headers_remove` object to the `versions` section of the API definition. This contains a list of the names of existing headers to be removed from responses.

For example:
```json  {linenos=true, linenostart=1}
{
    "version_data": {
        "versions": {
            "Default": {
                "global_response_headers": {
                    "X-Static": "foobar",
                    "X-Request-ID":"$tyk_context.request_id",
                    "X-User-ID": "$tyk_meta.uid"
                },
                "global_response_headers_remove": [
                    "X-Secret"
                ]
            }
        }
    },
}
```

This configuration will add three new headers to each response:
- `X-Static` with the value `foobar`
- `X-Request-ID` with a dynamic value taken from the `request_id` [context variable]({{< ref "api-management/traffic-transformation/request-context-variables" >}})
- `X-User-ID` with a dynamic value taken from the `uid` field in the [session metadata]({{< ref "api-management/policies#what-is-a-session-metadata" >}})

It will also delete one header (if present) from each response:
 - `X-Secret`

#### Endpoint-level transform {#tyk-classic-endpoint}

To configure response header transformation for a specific endpoint you must add a new `transform_response_headers` object to the `extended_paths` section of your API definition.

It has the following configuration:
- `path`: the endpoint path
- `method`: the endpoint HTTP method
- `delete_headers`: a list of the headers that should be deleted from the response
- `add_headers`: a list of headers, in key:value pairs, that should be added to the response

For example:
```json  {linenos=true, linenostart=1}
{
    "transform_response_headers": [
        {
            "path": "status/200",
            "method": "GET",
            "delete_headers": ["X-Static"],
            "add_headers": [
                {"X-Secret": "the-secret-key-is-secret"},
                {"X-New": "another-header"}
            ],
        }
    ]
}
```

In this example the Response Header Transform middleware has been configured for HTTP `GET` requests to the `/status/200` endpoint. Any response received from the upstream service following a request to that endpoint will have the `X-Static` header removed and the `X-Secret` and `X-New` headers added (with values set to `the-secret-key-is-secret` and `another-header`).

#### Combining API-level and Endpoint-level transforms

If the example [API-level]({{< ref "#api-level-transform" >}}) and [endpoint-level]({{< ref "#endpoint-level-transform" >}}) transforms are applied to the same API, then the `X-Secret` header will be added (by the endpoint-level transform first) and then removed (by the API-level transform). Subsequently, the result of the two transforms for a call to `GET /status/200` would be to add four headers:
- `X-Request-ID`
- `X-User-ID`
- `X-Static`
- `X-New`

#### Fixing response headers that leak upstream server data

A middleware called `header_transform` was added in Tyk 2.1 specfically to allow you to ensure that headers such as `Location` and `Link` reflect the outward facade of your API Gateway and also align with the expected response location to be terminated at the gateway, not the hidden upstream proxy.

This is configured by adding a new `rev_proxy_header_cleanup` object to the `response_processors` section of your API definition.

It has the following configuration:
- `headers`: a list of headers in the response that should be modified
- `target_host`: the value to which the listed headers should be updated
 
For example:
```json
{
    "response_processors": [
        {
            "name": "header_transform",
            "options": {
                "rev_proxy_header_cleanup": {
                    "headers": ["Link", "Location"],
                    "target_host": "http://TykHost:TykPort"
                }
            }
        }
    ]
}
```

In this example, the `Link` and `Location` headers will be modified from the server-generated response, with the protocol, domain and port of the value set in `target_host`.

This feature is rarely used and has not been implemented in the Tyk Dashboard UI, nor in the [Tyk OAS API]({{< ref "#response-headers-using-tyk-oas" >}}).

### API Designer

You can use the API Designer in the Tyk Dashboard to configure the response header transform middleware for your Tyk Classic API by following these steps.

#### API-level transform

Configuring the API-level response header transform middleware is very simple when using the Tyk Dashboard.

In the Endpoint Designer you should select the **Global Version Settings** and ensure that you have selected the **Response Headers** tab:

{{< img src="/img/dashboard/endpoint-designer/response-header-global.png" alt="Configuring the API-level response header transform" >}}

Note that you must click **ADD** to add a header to the list (for appending or deletion).

#### Endpoint-level transform

1. **Add an endpoint for the path and select the Header Transform plugin**

    From the **Endpoint Designer** add an endpoint that matches the path for which you want to perform the transformation. Select the **Modify Headers** plugin.

    {{< img src="/img/dashboard/endpoint-designer/modify-headers-plugin.png" alt="Adding the Modify Headers plugin to an endpoint" >}}

2. **Select the "Response" tab**

    This ensures that the transform will be applied to responses prior to them being sent to the client.

    {{< img src="/img/dashboard/endpoint-designer/response-header-added.png" alt="Selecting the response header transform" >}}

3. **Declare the headers to be modified**

    Select the headers to delete and insert using the provided fields. You need to click **ADD** to ensure they are added to the list.

    {{< img src="/img/dashboard/endpoint-designer/response-header-details.png" alt="Configuring the response header transform" >}}

4. **Save the API**

    Use the *save* or *create* buttons to save the changes and activate the middleware.

### Tyk Operator

The process for configuring a response header transform in Tyk Operator is similar to that defined in section configuring the Response Header Transform in the Tyk Classic API Definition. Tyk Operator allows you to configure a response header transformation for [all endpoints of an API](#tyk-operator-endpoint) or for a [specific API endpoint](#tyk-operator-api).

#### API-level transform {#tyk-operator-api}

The process of configuring transformation of response headers for a specific API in Tyk Operator is similar to that defined in section [API-level transform](#tyk-classic-api) for the Tyk Classic API definition. 

To **append** headers to all responses from your API (i.e. for all endpoints) you must add a new `global_response_headers` object to the `versions` section of your API definition. This contains a list of key:value pairs, being the names and values of the headers to be added to responses.

To **delete** headers from all responses from your API (i.e. for all endpoints), you must add a new `global_response_headers_remove` object to the `versions` section of the API definition. This contains a list of the names of existing headers to be removed from responses.

An example is listed below:

```yaml {linenos=true, linenostart=1, hl_lines=["25-30"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: httpbin-global-header
spec:
  name: httpbin-global-header
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /httpbin-global-header
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
        global_response_headers:
          X-Static: foobar
          X-Request-ID: "$tyk_context.request_id"
          X-User-ID: "$tyk_meta.uid"
        global_response_headers_remove:
          - X-Secret
```

The example API Definition above configures an API to listen on path `/httpbin-global-header` and forwards requests upstream to http://httpbin.org.

This configuration will add three new headers to each response:

- `X-Static` with the value `foobar`
- `X-Request-ID` with a dynamic value taken from the `request_id` [context variable]({{< ref "api-management/traffic-transformation/request-context-variables" >}})
- `X-User-ID` with a dynamic value taken from the `uid` field in the [session metadata]({{< ref "api-management/policies#what-is-a-session-metadata" >}})

It will also delete one header (if present) from each response:

- `X-Secret`


#### Endpoint-level transform {#tyk-operator-endpoint}

The process of configuring a transformation of a response header for a specific endpoint in Tyk Operator is similar to that defined in section [endpoint-level transform](#tyk-classic-endpoint) for the Tyk Classic API definition. To configure a transformation of the response headers for a specific endpoint you must add a new `transform_response_headers` object to the `extended_paths` section of your API definition.

In this example the Response Header Transform middleware (`transform_response_headers`) has been configured for HTTP `GET` requests to the `/xml` endpoint. Any response received from the upstream service following a request to that endpoint will have the `Content-Type` header added with a value set to `application/json`.

#### Example

```yaml {linenos=true, linenostart=1, hl_lines=["54-60"]}
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

#### Tyk Gateway < 5.3.0 Example

If using Tyk Gateway < v5.3.0 then a `response_processor` object must be added to the API definition containing a `header_injector` item, as highlighted below:

```yaml  {linenos=true, linenostart=1, hl_lines=["17", "19", "57-63"]}
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