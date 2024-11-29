---
title: Configuring and Using Tyk OAS Mock Response middleware
date: 2024-01-31
description: "Tutorial to configuring and using Tyk OAS  Mock Response middleware"
tags: ["mock response", "middleware", "per-endpoint", "Tyk OAS", "Tyk OAS API"]
---

This tutorial is for Tyk OAS API definition users. If you're using the legacy Tyk Classic APIs, please refer to the [Tyk Classic Mock Response tutorial]({{< ref "product-stack/tyk-gateway/middleware/mock-response-tyk-classic" >}}).

The [Mock Response]({{< ref "product-stack/tyk-gateway/middleware/mock-response-middleware" >}}) middleware allows you to configure Tyk to return a response for an API endpoint without requiring an upstream service. 

When working with Tyk OAS APIs, this middleware is executed at the **end** of the request processing chain immediately prior to the upstream proxy stage. Thus, any other request processing middleware - including authentication - will be run before the request reaches the mock response.

The middleware is defined in the [Tyk OAS API Definition]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#operation" >}}). To create this definition, you can use the Tyk Dashboard API or the API Designer in the Tyk Dashboard UI.

To configure or create a Mock Response middleware you have two modes, manual and automatic. Following please find detailed guidance for each mode.

## Manual configuration 

You can configure a mock response directly in the API definition, in the middleware object under the Tyk extension section, `x-tyk-api-gateway`. Once added, you need to update or import it to Tyk Dashboard using Tyk Dashboard API or via Tyk Dashboard UI. This is useful when you have already tested your API in dev environments and now you need to deploy it to staging or production in a declarative manner.

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added.

The mock response middleware (`mockResponse`) can be added to the `x-tyk-api-gateway.middleware.operations` section (Tyk OAS Extension) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

For basic operation, the `mockResponse` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `code`: the HTTP status code to be provided with the response (this defaults to `200` if not set)
- `body`: the payload to be returned as the body of the response
- `headers`: the headers to inject with the response

Please remember that this API definition needs to be updated in Tyk Dashboard. In the Dashboard UI it might be trivial but if you are doing it declaratively, you need to use the Tyk Dashboard API endpoint to update an existing API (PUT) or import as a new API (POST). Once updated, Tyk Gateway/s will return mock responses to all valid requests to the endpoint, depending on the [content of the request](#multiple-mock-responses-for-a-single-endpoint).

In the following example, we configure a mock response middleware for requests to the `GET /example-mock-response1/anything` endpoint:

```json {hl_lines=["39-49"],linenos=true, linenostart=1}
{
  "components": {},
  "info": {
    "title": "example-mock-response1",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "paths": {
    "/anything": {
      "get": {
        "operationId": "anythingget",
        "responses": {
          "200": {
            "description": "200OK for /anything using anythingget"
          }
        }
      }
    }
  },
  "x-tyk-api-gateway": {
    "info": {
      "name": "example-mock-response1",
      "state": {
        "active": true
      }
    },
    "upstream": {
      "url": "http://httpbin.org/"
    },
    "server": {
      "listenPath": {
        "value": "/example-mock-response1/",
        "strip": true
      }
    },
    "middleware": {
      "operations": {
        "anythingget": {
          "mockResponse": {
            "enabled": true,
            "code": 200,
            "body": "This is the mock response body",
            "headers": [
              {
                "name": "X-Mock-Example",
                "value": "mock-header-value"
              }
            ]
          }
        }
      }
    }
  }
}
```

Once this API definition is updated in Tyk Dashboard, a call to `GET /example-mock-response1/anything` would return:

```bash
HTTP/1.1 200 OK
X-Mock-Example: mock-header-value
Content-Type: text/plain; charset=utf-8
 
This is the mock response body
```

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the mock response middleware.

## Automatic configuration inferred from your OpenAPI Document

Tyk will parse the [examples and schema]({{< ref "product-stack/tyk-gateway/middleware/mock-response-openapi" >}}) in the OpenAPI document and use them to generate mock responses automatically.

The design of the Tyk OAS API Definition takes advantage of the `operationId` defined in the OpenAPI Document that declares both the path and method for which the middleware should be added. Endpoint `paths` entries (and the associated `operationId`) can contain wildcards in the form of any string bracketed by curly braces, for example `/status/{code}`. These wildcards are so they are human-readable and do not translate to variable names. Under the hood, a wildcard translates to the “match everything” regex of: `(.*)`.

The mock response middleware (`mockResponse`) can be added to the `operations` section of the Tyk OAS Extension (`x-tyk-api-gateway`) in your Tyk OAS API Definition for the appropriate `operationId` (as configured in the `paths` section of your OpenAPI Document).

For basic operation, the `mockResponse` object has the following configuration:
- `enabled`: enable the middleware for the endpoint
- `fromOASExamples`: an object used to instruct Tyk Gateway to return a response from the OpenAPI description

The `fromOASExamples` object has the following configuration:
- `enabled`: enable the automatic configuration of mock response
- `code`: [optional] identifies which HTTP status code to be provided with the response (defaults to `200` if not set)
- `contentType`: [optional] identifies which response body type to use (defaults to `application/json` if not set)
- `exampleName`: [optional] the sample response to be returned from an `examples` list

The three optional fields (`code`, `contentType`, `exampleName`) are used to identify which sample response should be returned by the mock if multiple sample responses are declared in the OpenAPI description.

In the following example, the OpenAPI description declares three possible responses: two for HTTP 200 and one for HTTP 300. We have configured the Mock Response middleware to return the value defined for HTTP 200 (code) with `exampleName` set to "second-example". The JSON below shows the updated Tyk OAS API definition, after Tyk has generated and added the mock response middleware:

```json {hl_lines=["15-24", "29-33", "59-67"],linenos=true, linenostart=1}
{  
    "components": {},
    "info": {
        "title": "example-mock-response2",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
                "responses": {
                    "200": {
                        "content": {
                            "text/plain": {
                                "examples": {
                                    "first-example": {
                                        "value": "My favorite is pasta"
                                    },
                                    "second-example": {
                                        "value": "My second favorite is pizza"
                                    }
                                }
                            }
                        },
                        "description": ""
                    },
                    "300": {
                        "content": {
                            "text/plain": {
                                "example": "There's too much choice"
                            }
                        },
                        "description": ""
                    }
                }
            }
        }
    },
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-mock-response2",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-mock-response2/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "anythingget": {
                    "mockResponse": {
                        "enabled": true,
                        "fromOASExamples": {
                            "enabled": true,
                            "code": 200,
                            "contentType": "text/plain",
                            "exampleName": "second-example"
                        }
                    }
                }
            }
        }
    }
}
```
Once this API definition is updated in Tyk Dashboard, a call to `GET /example-mock-response2/anything` would return:

```bash
HTTP/1.1 200 OK
Content-Type: text/plain
 
"My second favorite is pizza"
```

If you add `"code":300` in the `fromOASExamples` object, a call to `GET /example-mock-response2/anything` would instead respond as follows:

```bash
HTTP/1.1 300 Multiple Choices
Content-Type: text/plain
 
"There's too much choice"
```

{{< note success >}}
**Note**  

If multiple `examples` are defined in the OpenAPI description but no default `exampleName` is set in the middleware configuration `fromOASExamples` Tyk will select randomly from the multiple `examples`. Yes, that means the response may change with every request. You can [control which response](#multiple-mock-responses-for-a-single-endpoint) will be returned using special headers in the request.
{{< /note >}}

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the mock response middleware.

## Multiple mock responses for a single endpoint

When the mock response middleware in your Tyk OAS API is configured to return responses from the OpenAPI description within the API definition, you can invoke a specific response, overriding the defaults configured in the middleware, by providing specific headers in your request.

To invoke a non-default response from a mocked endpoint, you must add *one or more* special headers to the request:
- `Accept`: This standard HTTP header will override the response content type (e.g. `application/json`, `text/plain`)
- `X-Tyk-Accept-Example-Code`: This will select the HTTP response code for which to return the example response (e.g. `400`)
- `X-Tyk-Accept-Example-Name`: This identifies which example to select from an `examples` list

If an example response can’t be found for the configured `code`, `contentType` or `exampleName`, an HTTP 404 error will be returned to inform the client that there is no declared example for that configuration.

In the example below, the OpenAPI document declares two possible responses: one for HTTP 200 and one for HTTP 300. We have configured the Mock Response middleware to return the value defined for HTTP 200 for which the body (content) is in JSON format and a custom header `X-Status` which will take the default value of `true`.
```json {hl_lines=["15-19", "22-39", "45-50", "53-55", "82-89"],linenos=true, linenostart=1}
{  
    "components": {},
    "info": {
        "title": "example-mock-response3",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "paths": {
        "/anything": {
            "get": {
                "operationId": "anythingget",
                "responses": {
                    "200": {
                        "headers": {
                            "X-Status": {
                                "schema": {
                                    "type": "boolean"
                                }
                            }
                        },
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "lastName": {
                                            "example": "Bar",
                                            "type": "string"
                                        },
                                        "name": {
                                            "example": "Foo",
                                            "type": "string"
                                        },
                                        "id": {
                                            "type": "integer"
                                        }
                                    }
                                }
                            }
                        },
                        "description": ""
                    },
                    "300": {
                        "headers": {
                            "X-Status": {
                                "schema": {
                                    "type": "boolean",
                                    "example": false
                                }
                            }
                        },
                        "content": {
                            "text/plain": {
                                "example": "Baz"
                            }
                    },
                    "description": ""
                    } 
               }
            }
        }
    },
    "x-tyk-api-gateway": {
        "info": {
            "name": "example-mock-response3",
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "http://httpbin.org/"
        },
        "server": {
            "listenPath": {
                "value": "/example-mock-response3/",
                "strip": true
            }
        },
        "middleware": {
            "operations": {
                "anythingget": {
                    "mockResponse": {
                        "enabled": true,
                        "fromOASExamples": {
                            "enabled": true,
                            "code": 200,
                            "contentType": "application/json"
                        }
                    }
                }
            }
        }
    }
}
```

You can trigger the mock response for HTTP 300 by adding the following headers to your request:
- `X-Tyk-Accept-Example-Code`: 300
- `Accept`: text/plain

This would return a plain text body and the `X-Status` header set to `false`.

The configuration above is a complete and valid Tyk OAS API Definition that you can import into Tyk to try out the mock response middleware.

## Configuring mock response using Tyk Dashboard UI

Adding a mock response to your API endpoints is easy when using the API Designer in the Tyk Dashboard UI, simply follow the steps appropriate to the configuration method you wish to use:
- [manual configuration](#manual-configuration) of the middleware config
- [automatic configuration](#automatic-configuration) from the OpenAPI description

### Manual configuration

#### Step 1: Add an endpoint

From the **API Designer** add an endpoint that matches the path and method to which you want to apply the middleware.

{{< img src="/img/dashboard/api-designer/tyk-oas-no-endpoints.png" alt="Tyk OAS API Designer showing no endpoints created" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-add-endpoint.png" alt="Adding an endpoint to an API using the Tyk OAS API Designer" >}}

{{< img src="/img/dashboard/api-designer/tyk-oas-no-middleware.png" alt="Tyk OAS API Designer showing no middleware enabled on endpoint" >}}

#### Step 2: Select the Mock Response middleware

Select **ADD MIDDLEWARE** and choose **Mock Response** middleware from the *Add Middleware* screen.

{{< img src="/img/dashboard/api-designer/tyk-oas-mock.png" alt="Adding the Mock Response middleware" >}}

#### Step 3: Configure the middleware

Select **Manually configure mock response**

{{< img src="/img/dashboard/api-designer/tyk-oas-manual-mock-response.png" alt="Mock Response middleware added to endpoint - select the configuration method you require" >}}

This takes you to the middleware configuration screen where you can:
- choose the HTTP status code that you want Tyk Gateway to return
- select the content type
- add a description for your mock response
- define headers to be provided with the response
- define the body that will be returned in the response (note that this must be defined as a JSON schema)

{{< img src="/img/dashboard/api-designer/tyk-oas-manual-mock-response-config.png" alt="Configuring the mock response" >}}

Select **UPDATE MIDDLEWARE** to apply the change to the middleware configuration.

#### Step 4: Save the API

Select **SAVE API** to apply the changes to your API.

### Automatic configuration

#### Step 1: Import an OpenAPI Document containing sample responses or schema

Import your OpenAPI Document (from file, URL or by pasting the JSON into the text editor) configure the **upstream URL** and **listen path**, and select **Auto-generate middleware to deliver mock responses**.

Selecting this option will cause Tyk Dashboard to check for sample responses or schema in the OpenAPI description and will automatically add the Mock Response middleware for any endpoints that have suitable data.

{{< img src="/img/dashboard/api-designer/tyk-oas-mock-auto-options.png" alt="Configuring the OpenAPI document import to create Mock Responses" >}}

#### Step 2: Edit the Mock Response middleware

Select **EDIT** and then the **Mock Response** middleware from the **Endpoints** tab. This will take you to the Edit Middleware screen. Note that *Use mock response from Open API Specification* has been selected.

{{< img src="/img/dashboard/api-designer/tyk-oas-manual-step-2.png" alt="Editing the Mock Response middleware" >}}

#### Step 3: Configure the middleware

Tyk Dashboard will automatically select a valid HTTP response code from the drop-down. When you select a valid `content-type` for which a mock response is configured in the OpenAPI specification, the API Designer will display the associated response.

{{< img src="/img/dashboard/api-designer/tyk-oas-mock-auto-select.png" alt="Mock Response middleware automatically configured from OpenAPI description" >}}

Here you can edit the mock response:
- modify, add or delete Response Body examples (note that this must follow the selected `content-type`)
- choose a default Response Body example that will be provided (unless [overridden in the request]({{< ref "#multiple-mock-responses-for-a-single-endpoint" >}}))
- add a description for your mock response
- define headers to be provided with the response (note that these must be defined as a JSON schema)
- add a schema

You can create and edit mock responses for multiple HTTP status codes by choosing a different status code from the drop-down.

Select **UPDATE MIDDLEWARE** to apply the change to the middleware configuration.

#### Step 4: Save the API

Select **SAVE API** to apply the changes to your API.

{{< note success >}}
**Note**  

Modifying the automatically configured Mock Response middleware will update the OpenAPI description part of your Tyk OAS API definition, as the detail of the mock response is not set in the `x-tyk-api-gateway` extension but is automatically generated in response to the particular request received to the endpoint.
{{< /note >}}

