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

The middleware is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/endpoint-plugin-tyk-classic" >}}) page.

## Configuring the middleware in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationID` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added.

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

Adding a per-endpoint custom plugin to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow the steps taken in this short video:

< placeholder for video >

{{< note success >}}
**Note**  

You are only able to add one custom plugin to each endpoint when using the API Designer, however you can add more by editing the API definition directly in the Raw Definition editor.
{{< /note >}}
