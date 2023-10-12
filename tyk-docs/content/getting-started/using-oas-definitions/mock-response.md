---
title: "Tyk OAS Mock Response"
date: 2022-10-18
tags: ["Tyk Tutorials", "Getting Started", "First API", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source", "Mock Response with an OAS API"]
description: "Using mock response middleware with Tyk OAS APIs"
menu:
  main:
    parent: "OpenAPI Low Level Concepts"
weight: 6
---

### Introduction

The mock response middleware allows you to configure Tyk to return a response for an API endpoint without requiring an upstream service. This can be useful when creating a new API or making a development API available to an external team.

Tyk Classic APIs can be configured with a basic [mock response middleware]({{< ref "/advanced-configuration/transform-traffic/endpoint-designer#mock-response" >}}). Tyk OAS APIs can be configured with a much more flexible mock response which has extended capabilities that respect authentication and other middleware configured for the endpoint.

There are two methods by which you can add a mock response to an endpoint:
 - manual configuration of the mock response middleware
 - automatic configuration from the OAS description of the API

### Manual configuration of mock response middleware

The mock response middleware can be added to the `operations` section of your Tyk OAS API Definition. You can configure the HTTP status code, headers and body/payload that will be returned in response to a request to the endpoint.

For example:

```.json
"operations": {
  "my-operation-id": {
    "mockResponse": {
      "enabled": true,
      "code": 200,
      "body": "mock-response-body",
      "headers": {
        "mock-header-1": "mock-header-value-1",
        "mock-header-2": "mock-header-value-2"
      }
    }
  }
}
```
{{< note success >}}
**Note**  

If `code` is not set, `200` is the default response.
{{< /note >}}

### Automatic configuration from the OAS description of the API

This is a second and cool way of defining a mock response for an endpoint. The OpenAPI Specification [documents](https://learn.openapis.org/specification/docs.html#the-example-object) response details for an endpoint according to response code and content type. Each response type may have `example`, `examples` or `schema` defined. These can be used as a mock response with Tyk. To enable it, just set `fromOASExamples` to `true`.

For example:

```.json
"operations": {
  "my-operation-id": {
    "mockResponse": {
      "enabled": true,
      "fromOASExamples": {
        "enabled": true
      }
    }
  }
}
```
`fromOASExamples` has more fields to select as a mock response; `code`, `contentType`, and `exampleName`. For example:

```.json
"fromOASExamples": {
  "enabled": true,
  "code": 200,
  "contentType": "application/json",
  "exampleName": "first-example"
}
```
{{< note success >}}
**Note**  

If `code` is not set, `200` is the default response. If `contentType` is not set, `application/json` is the default.
{{< /note >}}

`exampleName` is only valid where there are examples defined in the response documentation. See below.

With a request, you can override the configured `code`, `contentType`, and `exampleName`. Here are the special headers for it:

- `Accept`: Overrides the response content type i.e. `application/json`, `text/plain`. This is a standard HTTP header.
- `X-Tyk-Accept-Example-Code`: Overrides the deafult response code i.e. `400`.
- `X-Tyk-Accept-Example-Name`: Overrides the selected example among multiple examples i.e. `second-example`.

If an example response can’t be found in the configured code, `contentType` or `exampleName`, an error will be returned with `404`. For example:

```.bash
curl --request GET --header 'X-Tyk-Accept-Example-Code: 512'
 'http://tyk-gateway:8181/my-api/get'
 
{
  "error": "mock: there is no example response for the code: 512"
} 
```
#### Extract response code and body

A HTTP response has three main parts; `code`, `body`, and `headers`. Here's how to extract code and body from an OAS response definition.

In an OAS response definition, there is an `example` field showing a possible response when calling this endpoint. Tyk can extract it to use it as a response when `fromOASExamples` is set to `true`. For example:

```.json
{
  ...  
  "paths": {
    "/get": {
      "get": {
        "operationId": "getget",
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "example": "Foo"
              }
            },
            "description": ""
          }
        }
      }
    }
  },
  "x-tyk-api-gateway": {
    ...
    "middleware": {
      ...
      "operations": {
        "getget": {
          "mockResponse": {
            "enabled": true,
            "fromOASExamples": {
              "enabled": true
            }
          }
        }
      }
    }
  }
}
```
#### Sample Request

```.curl
curl --request GET 'http://tyk-gateway:8181/my-api/get'

"Foo"
```
### Examples

In an OAS response definition, `examples` is used to define multiple examples for the same response. It is mutually exclusive with `example`. Only one can be selected, example or examples. Both can’t be set at the same time. 

Let’s assume that `examples` exist. However, if there are multiple `examples` added, which one does Tyk select and return? That’s where `exampleName` comes in. In the `fromOASExamples`, the default `exampleName` can be selected. Or you can set it via the request header `X-Tyk-Accept-Example-Name`.

{{< note success >}}
**Note**  

The `example` name set in the request header overrides the configured one. If the request header and the configuration don’t have it, Tyk will select randomly from the multiple `examples`. And, yes, that means the response may change with every request.
{{< /note >}}

```.json
{
  ...  
  "paths": {
    "/get": {
      "get": {
        "operationId": "getget",
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "examples": {
                  "first-example": {
                    "value": "Foo"
                  },
                  "second-example": {
                    "value": "Bar"
                  }
                }
              }
            },
            "description": ""
          }
        }
      }
    }
  },
  "x-tyk-api-gateway": {
    ...
    "middleware": {
      ...
      "operations": {
        "getget": {
          "mockResponse": {
            "enabled": true,
            "fromOASExamples": {
              "enabled": true
            }
          }
        }
      }
    }
  }
}
```
#### Sample Requests

```.curl
curl --request GET --header 'X-Tyk-Accept-Example-Name: first-example'
 'http://tyk-gateway:8181/my-api/get'

"Foo"
```

```.curl
curl --request GET --header 'X-Tyk-Accept-Example-Name: second-example'
 'http://tyk-gateway:8181/my-api/get'

"Bar"
```

### Schema

If there is no `example` or `examples` defined, Tyk will try to find a schema for the response. If there is a schema, it will be used to generate a mock response. Each schema field may have an example field and they can be used to build a mock response.

```.json
{
  ...  
  "paths": {
    "/get": {
      "get": {
        "operationId": "getget",
        "responses": {
          "200": {
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
  },
  "x-tyk-api-gateway": {
    ...
    "middleware": {
      ...
      "operations": {
        "getget": {
          "mockResponse": {
            "enabled": true,
            "fromOASExamples": {
              "enabled": true
            }
          }
        }
      }
    }
  }
}
```
#### Sample Request

```.curl
curl --request GET 'http://tyk-gateway:8181/my-api/get'

{
  "name": "Foo",
  "lastName": "Bar"
}
```

The schema properties may not have `example` values. In that situation, the default values are used to build a response. See the following examples for each type:

- `string` > `string`
- `integer` > `0`
- `boolean` > `true`

### Using $ref and nested schema

In the above example, the schema was inline. However, Tyk is smart enough to extract values from a referenced or a nested schema object as well. For example:

```.json
{
  "components": {
    "schemas": {
      "Engineer": {
        "type": "object",
        "properties": {
          "lastName": {
            "example": "Senharputlu",
            "type": "string"
          },
          "name": {
            "example": "Furkan",
            "type": "string"
          }
        }
      }
    }
  },
  "paths": {
    "/get": {
      "get": {
        "operationId": "getget",
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Engineer"
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### Extract response headers

In the OAS response definition, `headers` is used to document the returned headers from that endpoint. Tyk can build the mock response headers with them. `headers` don’t have any standalone `example` or `examples` attributes, it just has `schema`. Tyk uses that `schema` as in the response body. For example:

```.json
{
  ...  
  "paths": {
    "/get": {
      "get": {
        "operationId": "getget",
        "responses": {
          "200": {
            "headers": {
              "X-Mock-Header": {
                "schema": {
                  "type": "string",
                  "example": "Foo"
                }
              }
            },
            "content": {...},
            "description": ""
          }
        }
      }
    }
  },
  "x-tyk-api-gateway": {
    ...
    "middleware": {
      ...
      "operations": {
        "getget": {
          "mockResponse": {
            "enabled": true,
            "fromOASExamples": {
              "enabled": true
            }
          }
        }
      }
    }
  }
}
```
#### Sample Request

```..curl
curl -I --request GET 'http://tyk-gateway:8181/my-api/get'

HTTP/1.1 200 OK
Content-Type: application/json
X-Mock-Header: Foo <-------- the extracted mock header
X-Ratelimit-Limit: 0
X-Ratelimit-Remaining: 0
X-Ratelimit-Reset: 0
Date: Fri, 07 Oct 2022 12:11:00 GMT
Content-Length: 42
Connection: close
```
