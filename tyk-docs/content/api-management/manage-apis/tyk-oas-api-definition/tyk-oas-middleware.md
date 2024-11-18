---
title: "Extending Tyk OAS APIs with Tyk Middleware"
date: 2023-10-03
tags: ["Tyk Tutorials OpenAPI", "Getting Started OpenAPI", "First API OpenAPI", "Tyk Cloud OpenAPI", "Tyk Self-Managed OpenAPI", "Tyk Open Source OpenAPI", "Updating API with OAS", "Update OpenAPI definition", "Middleware", "Mock Response"]
description: "Using middleware with Tyk OAS APIs"
---

### Introduction

Tyk OAS APIs have access to an increasing range of Tyk middleware that you can configure to customize the handling of API requests and responses. In this guide we will show you how to enable some of these features in your Tyk OAS APIs.

{{< note success >}}
**Note**  

Tyk OAS API support is currently in [Early Access]({{< ref "developer-support/special-releases-and-features/early-access-features" >}}) and some Tyk features are not yet supported. You can see the status of what is and isn't yet supported [here]({{< ref "/getting-started/using-oas-definitions/oas-reference.md" >}}).
{{< /note >}}

### allowList: permit access only to documented endpoints

Tyk Gateway's allow list function explicitly allows access just to paths that are documented in the Tyk OAS API definition. You can enable this when updating a Tyk API OAS definition using the `PATCH` method by passing the `allowList` query parameter with the payload.

| Property     | Description                                     |
|--------------|-------------------------------------------------|
| Resource URL | `/tyk/apis/oas/{API-ID}`                        |
| Method       | `PATCH`                                         |
| Type         | None                                            |
| Body         | OAS API Definition                              |
| Param        | Path param: `{API-ID}` Query param: `allowList` |

For example, given the base Tyk OAS API used [here]({{< ref "/getting-started/using-oas-definitions/update-an-oas-api#tutorial-3-update-tyk-oas-api-definition-with-an-updated-openapi-definition" >}}) we can enable the `allowList` middleware with this `PATCH` command:

```curl
curl --location --request PATCH 'http://{your-tyk-host}:{port}/tyk/apis/oas/{API-ID}?allowList=true' \
--header 'x-tyk-authorization: {your-secret}' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "info": {
        "title": "Petstore",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "basic-config-and-security/security": [
      {
        "api_key": []
      }
    ],
    "components": {
      "securitySchemes": {
        "api_key": {
          "type": "apiKey",
          "name": "api_key",
          "in": "header"
        }
      }
    },
    "paths": {
        "/pet": {
            "post": {
                "operationId": "addPet",
                "requestBody": {
                    "$ref": "#/components/requestBodies/Pet"
                },
                "responses": {
                    "405": {
                        "description": "Invalid input"
                    }
                },
                "summary": "Add a new pet to the store",
                "tags": [
                    "pet"
                ]
            }
        }
    }
}'
```

If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just updated:

```.json
{
    "key": {API-ID},
    "status": "ok",
    "action": "modified"
}
```

Once you have updated your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Check your OAS API definition

Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) and check the newly modified Tyk OAS API Definition. You'll notice that the `middleware.operations` configuration has been added under the `x-tyk-api-gateway` section, which now tells the Gateway that the only accessible path is the one with the `addPet` operationId.

```
{
  ...
  "x-tyk-api-gateway": {
    ...
    "middleware": {
    "operations": {
      "addPet": {
        "allow": {
          "enabled": true
        }
      }
    }
  }
}
```
### validateRequest: check that the API request payload meets a defined schema

In the OAS Document in this example, we define a JSON schema that describes the payload format for any request that hits the `POST /pet` path.

You can instruct the Gateway to validate any incoming request against the documented JSON schema. This is achieved by adding the `validateRequest` query parameter to the `PATCH` request, when updating the Tyk OAS API Definition.

| Property     | Description                                           |
|--------------|-------------------------------------------------------|
| Resource URL | `/tyk/apis/oas/{API-ID}`                              |
| Method       | `PATCH`                                               |
| Type         | None                                                  |
| Body         | OAS API Definition                                    |
| Param        | Path param: `{API-ID}` Query param: `validateRequest` |

```curl
curl --location --request PATCH 'http://{your-tyk-host}:{port}/tyk/apis/oas/{API-ID}?validateRequest=true' \
--header 'x-tyk-authorization: {your-secret}' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "info":{
     "title":"Petstore",
     "version":"1.0.0"
  },
  "openapi":"3.0.3",
  "basic-config-and-security/security":[
     {
        "api_key":[
           
        ]
     }
  ],
  "components":{
     "securitySchemes":{
        "api_key":{
           "type":"apiKey",
           "name":"api_key",
           "in":"header"
        }
     },
     "schemas":{
        "Pet":{
           "required":[
              "name"
           ],
           "type":"object",
           "properties":{
              "id":{
                 "type":"integer",
                 "format":"int64",
                 "example":10
              },
              "name":{
                 "type":"string",
                 "example":"doggie"
              },
              "category":{
                 "type":"string",
                 "example":"dog"
              },
              "status":{
                 "type":"string",
                 "description":"pet status in the store",
                 "enum":[
                    "available",
                    "pending",
                    "sold"
                 ]
              }
           }
        }
     }
  },
  "paths":{
     "/pet":{
        "post":{
           "operationId":"addPet",
           "requestBody":{
              "description":"Update an existent pet in the store",
              "content":{
                 "application/json":{
                    "schema":{
                       "$ref":"#/components/schemas/Pet"
                    }
                 }
              },
              "required":true
           },
           "responses":{
              "405":{
                 "description":"Invalid input"
              }
           },
           "summary":"Add a new pet to the store",
           "tags":[
              "pet"
           ]
        }
     }
  }
}'
```

If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just updated:

```.json
{
    "key": {API-ID},
    "status": "ok",
    "action": "modified"
}
```

Once you have updated your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Check your OAS API definition

Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) and check the newly modified Tyk OAS API Definition. Notice that under the `middleware.operations.addPet` configuration has been added the `validateRequest` middleware configuration that ensures the payload validation from now on.

```json
{
  ...
  "x-tyk-api-gateway": {
    ...
    "middleware": {
    "operations": {
      "addPet": {
        ...
        "validateRequest": {
          "enabled": true,
          "errorResponseCode": 422
        }
      }
    }
  }
}
```

### mockResponse: invoke an automatic response from the Gateway without accessing upstream service

The OpenAPI Document that you used in the example [above]({{< ref "#validaterequest-check-that-the-api-request-payload-meets-a-defined-schema" >}}), we also defined a JSON schema that describes the response format for any request that hits the `GET /pet/{petId}` path.

Tyk Gateway can "understand" and use this schema to create a mock response for any incoming requests.
This is achieved by adding the `mockResponse` query parameter to the `PATCH` request, when updating the Tyk OAS API Definition.

| Property     | Description                               |
|--------------|-------------------------------------------|
| Resource URL | `/tyk/apis/oas/{API-ID}`                  |
| Method       | `PATCH`                                   |
| Type         | None                                      |
| Body         | OAS API Definition                        |
| Path Param   |  `{API-ID}`                               |
| Query Param  | Query param: `mockResponse`               |

```curl
curl --location --request PATCH 'http://{your-tyk-host}:{port}/tyk/apis/oas/{API-ID}?mockResponse=true' \
--header 'x-tyk-authorization: {your-secret}' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "info":{
     "title":"Petstore",
     "version":"1.0.0"
  },
  "openapi":"3.0.3",
  "basic-config-and-security/security":[
     {
        "api_key":[
           
        ]
     }
  ],
  "components":{
     "basic-config-and-security/securitySchemes":{
        "api_key":{
           "type":"apiKey",
           "name":"api_key",
           "in":"header"
        }
     },
     "schemas":{
        "Pet":{
           "required":[
              "name"
           ],
           "type":"object",
           "properties":{
              "id":{
                 "type":"integer",
                 "format":"int64",
                 "example":10
              },
              "name":{
                 "type":"string",
                 "example":"doggie"
              },
              "category":{
                 "type":"string",
                 "example":"dog"
              },
              "status":{
                 "type":"string",
                 "description":"pet status in the store",
                 "enum":[
                    "available",
                    "pending",
                    "sold"
                 ]
              }
           }
        }
     }
  },
  "paths":{
     "/pet/{petId}": {
         "get": {
            "tags": [
                  "pet"
            ],
            "summary": "Find pet by ID",
            "description": "Returns a single pet",
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
            "responses": {
                  "200": {
                     "description": "successful operation",
                     "content": {
                        "application/json": {
                              "schema": {
                                 "$ref": "#/components/schemas/Pet"
                              }
                        }
                     }
                  },
                  "400": {
                     "description": "Invalid ID supplied"
                  },
                  "404": {
                     "description": "Pet not found"
                  }
            },
            "security": [
                  {
                     "api_key": []
                  }
            ]
         }
      }  
   }
}'
```

If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just updated:

```.json
{
    "key": {API-ID},
    "status": "ok",
    "action": "modified"
}
```

Once you have updated your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```
#### Check your Tyk OAS API definition

Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) and check the newly modified Tyk OAS API Definition. Notice that under the `middleware.operations.addPet` configuration has been added the `validateRequest` middleware configuration that ensures the payload validation from now on.

```json
{
    ...
    "x-tyk-api-gateway": {
      ...
      "middleware": {
            "operations": {
           ..
           "getPetById": {
              ...
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
