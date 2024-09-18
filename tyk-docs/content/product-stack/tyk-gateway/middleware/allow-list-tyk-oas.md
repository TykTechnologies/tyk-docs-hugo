---
title: Using the Allow List middleware with Tyk OAS APIs
date: 2024-01-24
description: "Using the Allow list middleware with Tyk OAS APIs"
tags: ["Allow list", "middleware", "per-endpoint", "Tyk OAS"]
---

The [allow list]({{< ref "product-stack/tyk-gateway/middleware/allow-list-middleware" >}}) is a feature designed to restrict access to only specific API endpoints. It rejects requests to endpoints not specifically "allowed", returning `HTTP 403 Forbidden`. This enhances the security of the API by preventing unauthorized access to endpoints that are not explicitly permitted.

When working with Tyk OAS APIs the middleware is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-classic" >}}) page.


## Configuring the allow list in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The allow list middleware (`allow`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `allow` object has the following configuration:

- `enabled`: enable the middleware for the endpoint
- `ignoreCase`: if set to `true` then the path matching will be case insensitive

For example:

```json {hl_lines=["47-50", "53-56"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-allow-list",
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
            "name": "example-allow-list",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-allow-list/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "anythingget": {
                    "allow": {
                        "enabled": true,
                        "ignoreCase": true
                    }                
                },
                "anythingput": {
                    "allow": {
                        "enabled": true,
                        "ignoreCase": true
                    }                
                }
            }
        }
    }
}
```

In this example the allow list middleware has been configured for requests to the `GET /anything` and `PUT /anything` endpoints. Requests to any other endpoints will be rejected with `HTTP 403 Forbidden`, unless they also have the allow list middleware enabled.
Note that the allow list has been configured to be case insensitive, so calls to `GET /Anything` will be allowed
Note also that the endpoint path has not been terminated with `$`. Requests to, for example, `GET /anything/foobar` will be allowed as the [regular expression pattern match]({{< ref "product-stack/tyk-gateway/middleware/allow-list-middleware#endpoint-parsing" >}}) will recognize this as `GET /anything`.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the allow list feature.

## Configuring the allow list in the API Designer

Adding the allow list to your API endpoints is easy is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Allow List middleware

Select **ADD MIDDLEWARE** and choose the **Allow List** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-allow.png" alt="Adding the Allow List middleware" >}}

#### Step 3: Optionally configure case-insensitivity

If you want to disable case-sensitivity for the allow list, then you must select **EDIT** on the Allow List icon.

{{< img src="/img/dashboard/api-designer/tyk-oas-allow-added.png" alt="Allow List middleware added to endpoint - click through to edit the config" >}}

This takes you to the middleware configuration screen where you can alter the case sensitivity setting.
{{< img src="/img/dashboard/api-designer/tyk-oas-allow-config.png" alt="Configuring case sensitivity for the Allow List" >}}

Select **UPDATE MIDDLEWARE** to apply the change to the middleware configuration.

#### Step 4: Save the API

Select **SAVE API** to apply the changes to your API.
