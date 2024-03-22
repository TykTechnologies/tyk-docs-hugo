---
title: Using the Virtual Endpoint middleware with Tyk OAS APIs
tags:
    - virtual endpoint
    - middleware
    - per-endpoint
    - Tyk OAS
    - Tyk OAS API
description: Using the Virtual Endpoint middleware with Tyk OAS APIs
date: "2024-02-29"
---

The [virtual endpoint]({{< ref "advanced-configuration/compose-apis/virtual-endpoints" >}}) middleware provides a serverless compute function that allows for the execution of custom logic directly within the gateway itself, without the need to proxy the request to an upstream service. This functionality is particularly useful for a variety of use cases, including request transformation, aggregation of responses from multiple services, or implementing custom authentication mechanisms.

The middleware is configured in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). You can do this via the Tyk Dashboard API or in the API Designer.

If you're using the legacy Tyk Classic APIs, then check out the [Tyk Classic]({{< ref "product-stack/tyk-gateway/middleware/virtual-endpoint-tyk-classic" >}}) page.

## Configuring the middleware in the Tyk OAS API Definition

The design of the Tyk OAS API Definition takes advantage of the `operationID` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added.

The virtual endpoint middleware (`virtualEndpoint`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

The `virtualEndpoint` object has the following configuration:

- `enabled`: enable the middleware for the endpoint
- `functionName`: the name of the JavaScript function that will be executed when the virtual endpoint is triggered
- `body`: [optional] a `base64` encoded string containing the JavaScript code
- `path`: [optional] the relative path to the source file containing the JavaScript code
- `proxyOnError`: [optional] a boolean that determines the behaviour of the gateway if an error occurs during the execution of the virtual endpoint's function; if set to `true` the request will be proxied to upstream if the function errors, if set to `false` the request will not be proxied and Tyk will return an error response. Defaults to `false`
- `requireSession`: [optional] a boolean that indicates whether the virtual endpoint should have access to the session object; if `true` then the key session data will be provided to the function as the `session` variable. Defaults to `false`

{{< note success >}} **Note**

One of either `path` or `body` must be provided, depending on whether you are providing the JavaScript code in a file or inline within the API definition. If both are provided then `body` will take precedence. {{< /note >}}

For example:

```json {hl_lines=["39-50", "54-58"],linenos=true, linenostart=1}
{
    "components": {},
    "info": {
        "title": "example-virtual-endpoint",
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
            "name": "example-virtual-endpoint",
            "state": {
                "active": true,
                "internal": false
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },          
        "server": {
            "listenPath": {
                "value": "/example-virtual-endpoint/",                
                "strip": true
            }
        },      
        "middleware": {
            "global": {
                "pluginConfig": {
                    "data": {
                        "enabled": true,
                        "value": {
                            "map": {
                                " key": 3
                            },
                        "num": 4,
                        "string": "example"
                        }
                    }
                }
            },
            "operations": {
                "anythingget": {
                    "virtualEndpoint": {
                        "enabled": true,
                        "functionName": "myVirtualHandler",
                        "body": "ZnVuY3Rpb24gbXlWaXJ0dWFsSGFuZGxlciAocmVxdWVzdCwgc2Vzc2lvbiwgY29uZmlnKSB7ICAgICAgCiAgdmFyIHJlc3BvbnNlT2JqZWN0ID0gewogICAgQm9keTogIlZpcnR1YWwgRW5kcG9pbnQgIitjb25maWcuY29uZmlnX2RhdGEuc3RyaW5nLAogICAgSGVhZGVyczogewogICAgICAiZm9vLWhlYWRlciI6ICJiYXIiLAogICAgICAibWFwLWhlYWRlciI6IEpTT04uc3RyaW5naWZ5KGNvbmZpZy5jb25maWdfZGF0YS5tYXApLAogICAgICAic3RyaW5nLWhlYWRlciI6IGNvbmZpZy5jb25maWdfZGF0YS5zdHJpbmcsCiAgICAgICJudW0taGVhZGVyIjogSlNPTi5zdHJpbmdpZnkoY29uZmlnLmNvbmZpZ19kYXRhLm51bSkKICAgIH0sCiAgICBDb2RlOiAyMDAKICB9CiAgcmV0dXJuIFR5a0pzUmVzcG9uc2UocmVzcG9uc2VPYmplY3QsIHNlc3Npb24ubWV0YV9kYXRhKQp9"
                    }
                }
            }
        }
    }
}
```

In this example the virtual endpoint middleware has been configured for HTTP `GET` requests to the `/anything` endpoint. We have also configured the following custom attributes in the `pluginConfig` section of the API definition:

```json
{
    "map": {
        " key": 3
    },
    "num": 4,
    "string": "example"
}
```

The `body` field value is a `base64` encoded string containing this JavaScript code, which will be invoked by the virtual endpoint middleware:

```js
function myVirtualHandler (request, session, config) {      
  var responseObject = {
    Body: "Virtual Endpoint "+config.config_data.string,
    Headers: {
      "foo-header": "bar",
      "map-header": JSON.stringify(config.config_data.map),
      "string-header": config.config_data.string,
      "num-header": JSON.stringify(config.config_data.num)
    },
    Code: 200
  }
  return TykJsResponse(responseObject, session.meta_data)
}
```

A call to the `GET /anything` endpoint returns:

```http
HTTP/1.1 200 OK
Date: Fri, 01 Mar 2024 12:14:36 GMT
Foo-Header: bar
Map-Header: {" key":3}
Num-Header: 4
Server: tyk
String-Header: example
Content-Length: 24
Content-Type: text/plain; charset=utf-8
 
Virtual Endpoint example
```

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the virtual endpoint middleware.

## Configuring the middleware in the API Designer

Adding a Virtual Endpoint to your API endpoints is easy when using the API Designer in the Tyk Dashboard, simply follow the steps taken in this short video:

< placeholder for video >
