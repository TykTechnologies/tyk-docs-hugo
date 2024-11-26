---
title: Using the Endpoint Caching middleware with Tyk OAS APIs
date: 2024-01-24
description: "Using the Endpoint Caching middleware with Tyk OAS APIs"
tags: ["Caching", "Cache", "Endpoint Cache", "selective caching", "middleware", "per-endpoint", "Tyk OAS"]
---

The [Endpoint Caching]({{< ref "basic-config-and-security/reduce-latency/caching/advanced-cache" >}}) middleware allows you to perform selective caching for specific endpoints rather than for the entire API, giving you granular control over which paths are cached.

When working with Tyk OAS APIs the middleware is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/endpoint-cache-tyk-classic" >}}) page.

## Configuring the middleware in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. The `path` can contain wildcards in the form of any string bracketed by curly braces, for example `{user_id}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

Configuring the endpoint cache is performed in two parts:

#### 1. Enable Tyk's caching function

The caching function is enabled by adding the `cache` object to the `global` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API.

This object has the following configuration:
 - `enabled`: enable the cache for the API
 - `timeout`: set as the default cache refresh period for any endpoints for which you don't want to configure individual timeouts (in seconds) 

#### 2. Enable and configure the middleware for the specific endpoint

The endpoint caching middleware (`cache`) should then be added to the `operations` section of `x-tyk-api-gateway` for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `cache` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `timeout`: set to the refresh period for the cache (in seconds)
- `cacheResponseCodes`: HTTP responses codes to be cached (for example `200`)
- `cacheByRegex`: Pattern match for [selective caching by body value]({{< ref "basic-config-and-security/reduce-latency/caching/advanced-cache#request-selective-cache-control" >}})

For example:
```json {hl_lines=["37-40", "45-51"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-endpoint-cache",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/delay/5": {
            "post": {
                "operationId": "delay/5post",
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
            "name": "example-endpoint-cache",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-endpoint-cache/",
                "strip": true
            }
        },
        "global": {
            "cache": {
                "enabled": true,
                "timeout": 60
            }
        },
        "middleware": {
            "operations": {
                "delay/5post": {
                    "cache": {
                        "enabled": true,
                        "cacheResponseCodes": [
                            200
                        ],
                        "timeout": 5
                    }
                }
            }
        }
    }
}
```

In this example the endpoint cache middleware has been configured to cache `HTTP 200` responses to requests to the `POST /delay/5` endpoint. The cache will refresh after 5 seconds. Note that requests to other endpoints will also be cached, with a default cache timeout of 60 seconds according to the configuration in lines 37-40.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the endpoint caching.

## Configuring the middleware in the API Designer

Adding endpoint caching to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

##### Step 1: Add an endpoint

From the **API Designer** add an endpoint to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

##### Step 2: Select the Endpoint Cache middleware

Select **ADD MIDDLEWARE** and choose the **Cache** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-cache.png" alt="Adding the Endpoint Cache middleware" >}}

##### Step 3: Configure the middleware

Set the timeout and HTTP response codes for the endpoint. You can remove a response code from the list by clicking on the `x` next to it.

{{< img src="/img/dashboard/api-designer/tyk-oas-cache-config.png" alt="Configuring the endpoint cache middleware for a Tyk OAS API" >}}

{{< note success >}}
**Note**  

Body value match or [request selective]({{< ref "basic-config-and-security/reduce-latency/caching/advanced-cache#request-selective-cache-control" >}}) caching is not currently exposed in the Dashboard UI, so it must be enabled though either the raw API editor or the Dashboard API. 
{{< /note >}}

Select **UPDATE MIDDLEWARE** to apply the change to the middleware configuration.

##### Step 4: Save the API

Select **SAVE API** to apply the changes to your API.

