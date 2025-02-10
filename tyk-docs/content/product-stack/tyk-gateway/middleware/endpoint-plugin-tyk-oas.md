---
title: Using the Per-Endpoint Plugin with Tyk OAS APIs
date: 2024-03-04
description: "Using the per-endpoint custom plugin with Tyk OAS APIs"
tags: ["custom plugin", "golang", "go plugin", "middleware", "per-endpoint", "Tyk OAS", "Tyk OAS API"]
---

The [per-endpoint custom plugin]({{< ref "product-stack/tyk-gateway/middleware/endpoint-plugin" >}}) provides the facility to attach a custom Go plugin at the end of the request processing chain.
This plugin allows you to add custom logic to the processing flow for the specific endpoint without adding to the processing complexity of other endpoints.
It can [terminate the request]({{< ref "product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins#terminating-the-request" >}}) if required,
and provides a [Virtual Endpoint]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}) style capability using the Go language, rather than JavaScript (as supported by the virtual endpoint middleware).

The middleware is configured in the [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/endpoint-plugin-tyk-classic" >}}) page.

## Configuring the middleware in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. The `path` can contain wildcards in the form of any string bracketed by curly braces, for example `{user_id}`. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The endpoint plugin middleware (`postPlugins`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `postPlugins` object has the following configuration:

- `enabled`: enable the middleware for the endpoint
- `functionName`: this is the name of the Go function that will be executed when the middleware is triggered
- `path`: the relative path to the source file containing the compiled Go code

You can chain multiple plugin functions in an array. Tyk will process them in the order they appear in the API definition.

For example:

```json {hl_lines=["39-45"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-endpoint-plugin",
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
            }
        }
    },
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-endpoint-plugin",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },          
        "server": {
            "listenPath": {
                "value": "/example-endpoint-plugin/",                
                "strip": true
            }
        },      
        "middleware": {
            "operations": {
                "anythingget": {
                    "postPlugins": [
                        {
                            "enabled": true,
                            "functionName": "myUniqueFunctionName",
                            "path": "/middleware/myPlugin.so"
                        }
                    ]
                }
            }
        }
    }
}
```

In this example the per-endpoint custom plugin middleware has been configured for HTTP `GET` requests to the `/anything` endpoint. For any call made to this endpoint, Tyk will invoke the function `myUniqueFunctionName` in the file located at `/middleware/myPlugin.so`.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the per-endpoint custom plugin middleware.

## Configuring the middleware in the API Designer

Adding a per-endpoint custom plugin to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow these steps:

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Go Post-Plugin middleware

Select **ADD MIDDLEWARE** and choose **Go Post-Plugin** from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-go-plugin.png" alt="Adding the Go Post-Plugin middleware" >}}

#### Step 3: Configure the middleware

You must provide the path to the compiled plugin and the name of the Go function that should be invoked by Tyk Gateway when the middleware is triggered.

{{< img src="/img/dashboard/api-designer/tyk-oas-go-plugin-config.png" alt="Configuring the per-endpoint custom plugin" >}}

#### Step 4: Save the API

Select **ADD MIDDLEWARE** to save the middleware configuration. Remember to select **SAVE API** to apply the changes.

{{< note success >}}
**Note**  

You are only able to add one custom plugin to each endpoint when using the API Designer, however you can add more by editing the API definition directly in the Raw Definition editor.
{{< /note >}}
