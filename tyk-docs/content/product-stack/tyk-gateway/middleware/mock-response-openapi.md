---
title: "Mock Responses using OpenAPI Metadata - Key Concepts"
date: 2024-01-31
description: "Explains how the OpenAPI Specification can be used to generate mock responses, or in other words, how Tyk can generate mock responses based on schemas and examples."
tags: ["mock response", "mock", "middleware", "per-endpoint", "OpenAPI", "OAS"]
---

The [OpenAPI Specification](https://learn.openapis.org/specification/docs.html#adding-examples) provides metadata that can be used by automatic documentation generators to create comprehensive reference guides for APIs. Most objects in the specification include a `description` field that offers additional human-readable information for documentation. Alongside descriptions, some OpenAPI objects can include sample values in the OpenAPI Document, enhancing the generated documentation by providing representative content that the upstream service might return in responses.

Tyk leverages examples from your API documentation (in OpenAPI Spec format) to generate mock responses for the API exposed via the gateway. Based on this data, Tyk adds a new middleware named "Mock Response" and returns various mock responses according to your spec. Refer to the [Mock configuration guide]({{< ref "product-stack/tyk-gateway/middleware/mock-response-tyk-oas#automatic-configuration-inferred-from-your-openapi-document" >}}) to learn how to do this.

The specification provides three methods for Tyk to deduce the mock response: `example`, `examples` and `schema`. 
1. `example`: A sample value that could be returned in a specific field in a response (see [below](#1-using-example-to-generate-a-mock-response))
2. `examples`: A map pairing an example name with an Example Object (see [below](#2-using-examples-to-generate-a-mock-response))
3. `schema`: JSON schema for the expected response body (see [below](#3-using-schema-to-generate-a-mock-response)

Note: 
- `example` and `examples` are mutually exclusive within the OpenAPI Document for a field in the `responses` object: the developer cannot provide both for the same object.
- The `content-type` (e.g. `application/json`, `text/plain`), per OpenAPI Specification, must be declared for each `example` or `examples` in the API description.

Let's see how to use each method:


### 1. Using `example` to generate a mock response

In the following extract from an OpenAPI description, a single `example` has been declared for a request to `GET /get` - the API developer indicates that such a call could return `HTTP 200` and the body value `Response body example` in plain text format.

```json {hl_lines=["9-11"],linenos=true, linenostart=1}
{
  "paths": {
    "/get": {
      "get": {
        "operationId": "getget",
        "responses": {
          "200": {
            "content": {
                "text/plain": {
                    "example": "Response body example"
                }
            },
            "description": "200 OK response for /get with a plain text"
          }
        }
      }
    }
  }
}
```

### 2. Using `examples` to generate a mock response

In this extract, the API developer also indicates that a call to `GET /get` could return `HTTP 200` but here provides two example body values `Response body from first-example` and `Response body from second-example`, again in plain text format.

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
                        "value": "Response body from first-example"
                    },
                    "second-example": {
                        "value": "Response body from second-example"
                    }
                }
              }
            },
            "description": "This is a mock response example with 200OK"
          }
        }
      }
    }
  }
}
```

The `exampleNames` for these two values have been configured as `first-example` and `second-example` and can be used to [invoke the desired response]({{< ref "product-stack/tyk-gateway/middleware/mock-response-tyk-oas#multiple-mock-responses-for-a-single-endpoint" >}}) from a mocked endpoint.

### 3. Using `schema` to generate a mock response

If there is no `example` or `examples` defined for an endpoint, Tyk will try to find a `schema` for the response. If there is a schema, it will be used to generate a mock response. Tyk can extract values from referenced or nested schema objects when creating the mock response.

#### Response headers schema
Response headers do not have standalone `example` or `examples` attributes, however, they can have a `schema` - the Mock Response middleware will include these in the mock response if provided in the OpenAPI description.

The schema properties may have an `example` field, in which case they will be used to build a mock response. If there is no `example` value in the schema then default values are used to build a response as follows:
- `string` > `"string"`
- `integer` > `0`
- `boolean` > `true`

For example, below is a partial OpenAPI description, that defines a schema for the `GET /get` endpoint

```json {hl_lines=["10-13", "18-33"],linenos=true, linenostart=1}
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
                                    "example": "status-example"
                                }
                            }
                        },
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "lastName": {
                                            "example": "Lastname-placeholder",
                                            "type": "string"
                                        },
                                        "firstname": {
                                            "type": "string"
                                        },
                                        "id": {
                                            "type": "integer"
                                        }
                                    }
                                }
                            }
                        },
                        "description": "This is a mock response example with 200OK"
                    }
                }
            }
        }
    }
}
```

Tyk Gateway could use the above to generate the following mock response:

```http
HTTP/1.1 200 OK
X-Status: status-example
Content-Type: application/json
 
{
    "lastName": "Lastname-placeholder",
    "firstname": "string",
    "id": 0
}
```
Notice that in the mock response above, `firstname` has the value `string` since there was no example for it in the OpenAP document so Tyk used the word `string` as the value for this field.
