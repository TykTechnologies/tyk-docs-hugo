---
title: Using the Ignore Authentication middleware with Tyk OAS APIs
date: 2024-01-24
description: "Using the Ignore Authentication middleware with Tyk OAS APIs"
tags: ["ignore authentication", "ignore", "ignore auth", "authentication", "middleware", "per-endpoint", "Tyk OAS", "Tyk OAS APIs"]
---

The [Ignore Authentication]({{< ref "product-stack/tyk-gateway/middleware/ignore-middleware" >}}) middleware instructs Tyk Gateway to skip the authentication step for calls to an endpoint, even if authentication is enabled for the API.

When working with Tyk OAS APIs the middleware is configured in the [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/ignore-tyk-classic" >}}) page.

## Configuring the middleware in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The ignore authentication middleware (`ignoreAuthentication`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `ignoreAuthentication` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `ignoreCase`: if set to `true` then the path matching will be case insensitive

For example:
```json {hl_lines=["65-69"],linenos=true, linenostart=1}
{
    "info": {
        "title": "example-ignore-authentication",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "servers": [
        {
            "url": "http://localhost:8181/example-ignore-authentication/"
        }
    ], 
    "security": [
        {
            "authToken": []
        }
    ],     
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        }
    },
    "components": {
        "securitySchemes": {
            "authToken": {
                "type": "apiKey",
                "in": "header",
                "name": "Authorization"
            }
        }        
    },    
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-ignore-authentication",
            "state": {
                "active": true,
                "internal": false
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "authentication": {
                "enabled": true,
                "securitySchemes": {
                    "authToken": {
                        "enabled": true
                    }
                }
            },
            "listenPath": {
                "strip": true,
                "value": "/example-ignore-authentication/"
            }        
        },
        "middleware": {
            "operations": {
                "anythingget": {
                    "ignoreAuthentication": {
                        "enabled": true
                    }
                }
            }
        }
    }
}
```

In this example the ignore authentication middleware has been configured for requests to the `GET /anything` endpoint. Any such calls will skip the authentication step in the Tyk Gateway's processing chain.
- the middleware has been configured to be case sensitive, so calls to `GET /Anything` will not skip authentication

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the Ignore Authentication middleware.

## Configuring the middleware in the API Designer

Adding and configuring the Ignore Authentication middleware to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Ignore Authentication middleware

Select **ADD MIDDLEWARE** and choose the **Ignore Authentication** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-ignore.png" alt="Adding the Ignore Authentication middleware" >}}

##### Step 3: Optionally configure case-insensitivity

If you want to disable case-sensitivity for the path that you wish to skip authentication, then you must select **EDIT** on the Ignore Authentication icon.

{{< img src="/img/dashboard/api-designer/tyk-oas-ignore-added.png" alt="Ignore Authentication middleware added to endpoint - click through to edit the config" >}}

This takes you to the middleware configuration screen where you can alter the case sensitivity setting.
{{< img src="/img/dashboard/api-designer/tyk-oas-ignore-config.png" alt="Configuring case sensitivity for the path for which to ignore authentication" >}}

Select **UPDATE MIDDLEWARE** to apply the change to the middleware configuration.

##### Step 4: Save the API

Select **SAVE API** to apply the changes to your API.
