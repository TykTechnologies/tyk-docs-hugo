---
title: "Request Validation"
date: 2023-02-13
tags: ["API", "OAS", "OpenAPI Specification", "Request Validation"]
description: "The low level concepts around OpenAPI Specification support in Tyk"
menu:
  main:
    parent: "OpenAPI Low Level Concepts"
weight: 3
---

{{< toc >}}

### Introduction

Tyk can protect any Gateway incoming request by validating the request
parameters and payload against a schema provided for that path's request
body in the OAS API Definition.

The clever part is that in this schema you can reference another schema defined elsewhere in the API Definition; this lets you write complex validations very efficiently since you don’t need to re-define the validation for a particular object every time you wish to refer to it.

{{< note success >}}
**Note**  

At this time Tyk only supports local references to schema within the same API Definition, but in future we aim to support schemas defined externally (via URL).
{{< /note >}}

### How it works

Request Validation works on operations. To enable request validations for
the parameters, you must declare at least one parameter on an Open API
operation:

```json
"/pet/{petId}": {
  "get": {
    "summary": "Find pet by ID",
    "operationId": "getPetById",
    "parameters": [
      {
        "name": "petId",
        "in": "path",
        "description": "ID of pet to return",
        "required": true,
        "schema": {
          "type": "integer",
          "format": "int64"
        }
      }
    ],
    ...
  }
}    
```

If there is at least one parameter, that parameter will enable validation
of parameters.

To configure Request Validation, which will check the body of each API request sent to the endpoint, follow these simple steps:

1. Define a schema for an `application/json` content type in the `requestBody` section of a path.

```json
{
  ...
  "paths":{
    "/pet":{
        "put":{
          ...
          "requestBody":{
            "description":"Update an existent pet in the store",
            "content":{
              "application/json":{
                  "schema":{
                    type: string
                  }
              }
            }
          }
        }
    }
  }
  ...
}
```

2. Enable `validateRequest` middleware within the `operations` section of the API definition, using the [operationId]({{< ref "getting-started/key-concepts/paths#operation-id" >}}) to identify the specific endpoint for which validation is to be applied.

```json
{
  ...
  "paths":{
    "/pet":{
        "put":{
          ...
          operationId: 'petput',
          "requestBody":{
            ...
            "content":{
              "application/json":{
                  "schema":{
                    type: string
                  }
              }
            }
          }
        }
    }
  }
  ...
  "x-tyk-api-gateway": {
    ...
    "middleware": {
      ...
      "operations": {
        ...
        "petput": {
          "validateRequest": {
            "enabled": true  
          }
        }
      }
    }
  }
}
```

#### Using references to access shared schemas

You can define the validation schema directly within the `requestBody` of the path's definition, or you can define it in the separate `components.schemas` section and include a relative reference within the `requestBody`. This allows you to re-use a schema across multiple paths.


```json
//SCHEMA DEFINED WITHIN PATH DEFINITION
{
  ...
  "paths":{
    "/pet":{
        "put":{
          ...
          "requestBody":{
            "description":"Update an existing pet in the store",
            "content":{
              "application/json":{
                  "schema":{
                    type: string
                  }
              }
            }
          }
        }
    }
  }
  ...
}

//SCHEMA DEFINED WITHIN COMPONENTS.SCHEMAS AND ACCESSED USING RELATIVE REFERENCE
{
  ...
  "components": {
    "schemas": {
      "Pet": {
        type: string
      }
    }
  },
  "paths":{
    "/pet":{
        "put":{
          ...
          "requestBody":{
            "description":"Update an existing pet in the store",
            "content":{
              "application/json":{
                  "schema":{
                    $ref: "#/components/Pet"
                  }
              }
            }
          }
        }
    }
  }
  ...
}
```

### Automatically enable request validation

When importing an OAS API Definition or updating an existing Tyk OAS API
Definition, `validateRequest` middleware can be automatically configured
by Tyk for all the paths that have a schema configured, by passing
`validateRequest=true` as a query parameter for the IMPORT or PATCH request respectively.
