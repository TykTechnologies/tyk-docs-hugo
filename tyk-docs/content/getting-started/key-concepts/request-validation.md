---
title: "Request Validation"
date: 2022-07-07
tags: ["API", "OAS", "OpenAPI Specification", "Servers"]
description: "The low level concepts around OpenAPI Specification support in Tyk"
menu:
  main:
    parent: "OpenAPI Low Level Concepts"
weight: 3
---

{{< toc >}}

### Introduction

Tyk can protect any Gateway incoming request by validating the request payload against the schema provided for the path's request body in the OAS API Definition.

### How it works

In order to enable request validation features, for a specific path, the following criteria needs to be met:

1. A schema needs to be defined for an `application/json` content type in the `requestBody` section of a path.

```.json
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

1. `validateRequest` middleware needs to be enabled for that specific path.

```.json
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
3. Your Tyk Gateway can validate an incoming request if the schema is defined within the OAS API Definition in the `requestBody` directly, or via a relative reference to the `components.schemas` section.

```.json
//GOOD
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

//GOOD
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
            "description":"Update an existent pet in the store",
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

4. If the schema reference points to an external resource, your Tyk Gateway will just ignore it and won’t validate the request.

```.json
//Gateway will ignore
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
                    $ref: "http://pet-schema.com"
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

While importing an OAS API Definition or updating a Tyk OAS API Definition, `validateRequest` middleware can be automatically configured by Tyk for all the paths that have a schema configured, by passing the `validateRequest=true` query parameter, together with the import API or with a PATCH request for updating the API.