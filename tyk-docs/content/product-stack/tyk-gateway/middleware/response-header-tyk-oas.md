---
title: Using the Response Header Transform with Tyk OAS APIs
date: 2024-01-24
description: "Using the Response Header Transform middleware with Tyk OAS APIs"
tags: ["Response Header Transform", "middleware", "per-endpoint", "Tyk OAS"]
---

Tyk's [response header transform]({{< ref "advanced-configuration/transform-traffic/response-headers" >}}) middleware enables you to append or delete headers on responses received from the upstream service before sending them to the client.

There are two options for this:
- API-level modification that is applied to all responses for the API
- endpoint-level modification that is applied only to responses from a specific endpoint

{{< note success >}}
**Note**  

If both API-level and endpoint-level middleware are configured, the endpoint-level transformation will be applied first.
{{< /note >}}

When working with Tyk OAS APIs the transformation is configured in the [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/response-header-tyk-classic" >}}) page.

## Configuring the Response Header Transform in the Tyk OAS API Definition

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
- `X-Request-ID` with a dynamic value taken from the `request_id` [context variable]({{< ref "context-variables" >}})
- `X-User-ID` with a dynamic value taken from the `uid` field in the [session metadata]({{< ref "getting-started/key-concepts/session-meta-data" >}})

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

If the example [API-level]({{< ref "product-stack/tyk-gateway/middleware/response-header-tyk-oas#api-level-transform" >}}) and [endpoint-level]({{< ref "product-stack/tyk-gateway/middleware/response-header-tyk-oas#endpoint-level-transform" >}}) transforms are applied to the same API, then the `X-Secret` header will be added (by the endpoint-level transform first) and then removed (by the API-level transform). Subsequently, the result of the two transforms for a call to `GET /status/200` would be to add four headers:
- `X-Request-ID`
- `X-User-ID`
- `X-Static`
- `X-New`

## Configuring the Response Method Transform in the API Designer

Adding and configuring the transforms to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

### Adding an API-level transform

From the **API Designer** on the **Settings** tab, after ensuring that you are in *edit* mode, toggle the switch to **Enable Transform response headers** in the **Middleware** section:
{{< img src="/img/dashboard/api-designer/tyk-oas-response-header-api-level.png" alt="Tyk OAS API Designer showing API-level Response Header Transform" >}}

Then select **NEW HEADER** as appropriate to add or remove a header from API responses. You can add or remove multiple headers by selecting **ADD HEADER** to add another to the list:
{{< img src="/img/dashboard/api-designer/tyk-oas-response-header-api-new-header.png" alt="Configuring the API-level Response Header Transform in Tyk OAS API Designer" >}}

### Adding an endpoint level transform

##### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.
{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

##### Step 2: Select the Response Header Transform middleware

Select **ADD MIDDLEWARE** and choose the **Response Header Transform** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-add-response-header.png" alt="Adding the URL Rewrite middleware" >}}

##### Step 3: Configure header transformation

Select **NEW HEADER** to configure a header to be added to or removed from the response, you can add multiple headers to either list by selecting **NEW HEADER** again.

{{< img src="/img/dashboard/api-designer/tyk-oas-response-header.png" alt="Configuring the rewrite rules for Advanced Triggers" >}}
{{< img src="/img/dashboard/api-designer/tyk-oas-response-header-new.png" alt="Configuring the Response Header Transform" >}}

##### Step 4: Save the API

Select **ADD MIDDLEWARE** to save the middleware configuration. Remember to select **SAVE API** to apply the changes.
