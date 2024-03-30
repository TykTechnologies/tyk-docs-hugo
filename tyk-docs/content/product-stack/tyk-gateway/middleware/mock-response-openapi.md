---
title: "Mock Responses using OpenAPI metadata"
date: 2024-01-31
description: "Explains how the OpenAPI Specification can be used to generate mock responses"
tags: ["mock response", "mock", "middleware", "per-endpoint", "OpenAPI", "OAS"]
---

The [OpenAPI Specification](https://learn.openapis.org/specification/docs.html#adding-examples) includes metadata that can be used by automatic documentation generators to produce comprehensive reference guides for APIs. Most objects in the specification include a `description` field that can provide additional human-readable information that is fed into such documentation. Alongside the descriptions, some OpenAPI objects can have sample values listed in the OpenAPI Document that further enhance the generated documentation by giving representative content that the upstream service might provide in responses.

The specification provides two different ways for an API developer to provide sample responses for an endpoint:
- `example`: a sample value that could be returned in a specific field in a response (see [below](#using-example-to-generate-a-mock-response))
- `examples`: a list of key-value pairs comprising of `"exampleName":"value"` (see [below](#using-examples-to-generate-a-mock-response))

Tyk's mock response middleware can [automatically generate a response]({{< ref "product-stack/tyk-gateway/middleware/mock-response-tyk-oas#automatically-configuring-the-middleware-from-the-openapi-document" >}}) using the data provided in the OpenAPI description part of the Tyk OAS API Definition.

If neither `example` nor `examples` are defined, Tyk can automatically create a mock response if a `schema` is defined that describes the format of the response as shown [below](#using-schema-to-generate-a-mock-response).

{{< note success >}}
**Note**  

Note that `example` and `examples` are mutually exclusive within the OpenAPI Document for a field in the `responses` object: the developer cannot provide both for the same object.
<br>The content-type (e.g. `application/json`, `text/plain`) must be declared for each `example` or `examples` in the API description.
{{< /note >}}

### Using `example` to generate a mock response

``` json {hl_lines=["9-11"],linenos=true, linenostart=1}
{
  "paths": {
    "/get": {
      "get": {
        "operationId": "getget",
        "responses": {
          "200": {
            "content": {
                "text/plain": {
                    "example": "Furkan"
                }
            },
            "description": ""
          }
        }
      }
    }
  }
}
```
In this extract from an OpenAPI description, a single `example` has been declared for a request to `GET /get` - the API developer indicates that such a call could return `HTTP 200` and the body value `Furkan` in plain text format.

### Using `examples` to generate a mock response

``` json {hl_lines=["9-18"],linenos=true, linenostart=1}
{  
  "paths": {
    "/get": {
      "get": {
        "operationId": "getget",
        "responses": {
          "200": {
            "content": {
              "text/plain": {
                "examples": {
                    "first-example": {
                        "value": "Jeff"
                    },
                    "second-example": {
                        "value": "Laurentiu"
                    }
                }
              }
            },
            "description": ""
          }
        }
      }
    }
  }
}
```
In this extract, the API developer also indicates that a call to `GET /get` could return `HTTP 200` but here provides two example body values `Jeff` and `Laurentiu`, again in plain text format.

The `exampleNames` for these two values have been configured as `first-example` and `second-example` and can be used to [invoke the desired response]({{< ref "product-stack/tyk-gateway/middleware/mock-response-tyk-oas#working-with-multiple-mock-responses-for-an-endpoint" >}}) from a mocked endpoint.

### Using `schema` to generate a mock response

If there is no `example` or `examples` defined for an endpoint, Tyk will try to find a `schema` for the response. If there is a schema, it will be used to generate a mock response. Tyk can extract values from referenced or nested schema objects when creating the mock response.

Response headers do not have standalone `example` or `examples` attributes, however they can have a `schema` - the Mock Response middleware will include these in the mock response if provided in the OpenAPI description.

The schema properties may have an `example` field, in which case they will be used to build a mock response. If there is no `example` value in the schema then default values are used to build a response as follows:
- `string` > `"string"`
- `integer` > `0`
- `boolean` > `true`

For example:
``` json {hl_lines=["10-13", "18-33"],linenos=true, linenostart=1}
{
    "paths": {
        "/get": {
            "get": {
                "operationId": "getget",
                "responses": {
                    "200": {
                        "headers": {
                            "X-Status": {
                                "schema": {
                                    "type": "string",
                                    "example": "Maciej"
                                }
                            }
                        },
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "lastName": {
                                            "example": "Petric",
                                            "type": "string"
                                        },
                                        "name": {
                                            "example": "Andrei",
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
                    }
                }
            }
        }
    }
}
```

This partial OpenAPI description defines a schema for the `GET /get` endpoint that Tyk Gateway could use to generate this mock response:

``` bash
HTTP/1.1 200 OK
X-Status: Maciej
Content-Type: application/json
 
{
    "lastName": "Petric",
    "name": "Andrei",
    "id": 0
}
```