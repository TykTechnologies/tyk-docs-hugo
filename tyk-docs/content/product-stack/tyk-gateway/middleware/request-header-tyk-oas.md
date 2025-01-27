---
title: Using the Request Header Transform with Tyk OAS APIs
date: 2024-01-20
description: "Using the Request Header Transform middleware with Tyk OAS APIs"
tags: ["Request Header Transform", "middleware", "per-endpoint", "Tyk OAS"]
---

Tyk's [request header transform]({{< ref "transform-traffic/request-headers" >}}) middleware enables you to append or delete headers on requests to your API endpoints before they are passed to your upstream service.

There are two options for this:
- API-level modification that is applied to all requests to the API
- endpoint-level modification that is applied only to requests to a specific endpoint

{{< note success >}}
**Note**  

If both API-level and endpoint-level middleware are configured, the API-level transformation will be applied first.
{{< /note >}}

When working with Tyk OAS APIs the transformation is configured in the [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/request-header-tyk-classic" >}}) page.

## Configuring the Request Header Transform in the Tyk OAS API Definition

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
- `X-Request-ID` with a dynamic value taken from the `request_id` [context variables]({{< ref "context-variables" >}})
- `X-User-ID` with a dynamic value taken from the `uid` field in the [session metadata]({{< ref "getting-started/key-concepts/session-meta-data" >}})

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

If the API-level transform in the previous [example]({{< ref "product-stack/tyk-gateway/middleware/request-header-tyk-oas#api-level-transform" >}}) is applied to the same API, then because the API-level transformation is performed first, the `X-Static` header will be added (by the API-level transform) and then removed (by the endpoint-level transform) such that the overall effect of the two transforms for a call to `GET /status/200` would be to add three headers:
 - `X-Request-ID`
 - `X-User-ID`
 - `X-Secret`

and to remove one:
 - `Auth_Id` 

## Configuring the Request Header Transform in the API Designer

Adding and configuring the transforms to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

### Adding an API-level transform

From the **API Designer** on the **Settings** tab, after ensuring that you are in *edit* mode, toggle the switch to **Enable Transform request headers** in the **Middleware** section:
{{< img src="/img/dashboard/api-designer/tyk-oas-request-header-api-level.png" alt="Tyk OAS API Designer showing API-level Request Header Transform" >}}

Then select **NEW HEADER** as appropriate to add or remove a header from API requests. You can add or remove multiple headers by selecting **ADD HEADER** to add another to the list:
{{< img src="/img/dashboard/api-designer/tyk-oas-request-header-api-new-header.png" alt="Configuring the API-level Request Header Transform in Tyk OAS API Designer" >}}

### Adding an endpoint level transform

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

##### Step 2: Select the Request Header Transform middleware

Select **ADD MIDDLEWARE** and choose the **Request Header Transform** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-request-header.png" alt="Adding the Request Header Transform middleware" >}}

##### Step 3: Configure header transformation

Select **NEW HEADER** to configure a header to be added to or removed from the request.

{{< img src="/img/dashboard/api-designer/tyk-oas-request-header-added.png" alt="Configuring the Request Header transformation" >}}

You can add multiple headers to either list by selecting **NEW HEADER** again.

{{< img src="/img/dashboard/api-designer/tyk-oas-request-header-new.png" alt="Adding another header to the transformation" >}}

##### Step 4: Save the API

Select **ADD MIDDLEWARE** to save the middleware configuration. Remember to select **SAVE API** to apply the changes.