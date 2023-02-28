---
title: "Update an API with OAS"
date: 2022-07-13
tags: ["Tyk Tutorials", "Getting Started", "First API", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source", "Updating an API with OAS"]
description: "Updating an API with OAS"
menu:
  main:
    parent: "Using OAS API Definitions"
weight: 6
---

{{< toc >}}

### Introduction

While developing APIs as developers, we often work with OAS definitions that are either generated from our codebase, or built ahead by the API designers. Tyk allows you to update/patch a Tyk API definition by providing only an OAS API definition.

{{< note success >}}
**Note**  

In order to use the Gateway API you will need an API key for your Gateway and one command to create the API and make it live.
{{< /note >}}

### Open Source

### Tutorial: Update an API using an OAS API definition

#### Make sure you know your API secret

Your Tyk Gateway API secret is stored in your `tyk.conf` file, the property is called `secret`. You will need to use this as a header called `x-tyk-authorization` to make calls to the Gateway API.

#### Create an API

Create a new API by sending a minimalistic Tyk OAS API Definition [https://bit.ly/39tnXgO](https://bit.ly/39tnXgO) to the Gateway API endpoint:

| Property     | Description            |
|--------------|------------------------|
| Resource URL | /tyk/apis/oas          |
| Method       | POST                   |
| Type         | None                   |
| Body         | Tyk OAS API Definition |
| Param        | None                   |

{{< note success >}}
**Note**  

For the Tyk Gateway, the default`{port}` is `8080`.
{{< /note >}}

```
curl --location --request POST 'http://{your-tyk-host}:{port}/tyk/apis/oas' \
--header 'x-tyk-authorization: {your-secret}' \
--header 'Content-Type: text/plain' \
--data-raw 
'{
  "info": {
    "title": "Petstore",
    "version": "1.0.0"
  },
  "openapi": "3.0.3",
  "components": {},
  "paths": {},
  "x-tyk-api-gateway": {
    "info": {
      "name": "Petstore",
      "state": {
        "active": true
      }
    },
    "upstream": {
      "url": "https://petstore.swagger.io/v2"
    },
    "server": {
      "listenPath": {
        "value": "/petstore-oas/",
        "strip": true
      }
    }
  }
}'
```
#### Check request response

If the command succeeds, you will see the following response, where the key value contains the newly created `api-id`:

```.json
{
    "key": {api-id},
    "status": "ok",
    "action": "added"
}
```

#### Restart or hot reload

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command with the following curl command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Update an API using just the OAS definition

Tyk allows you to update a Tyk OAS API definition by providing only an OAS API definition.

Let’s define a new path, `POST /pet`, with a schema that validates the payload it receives (`requestBody.content.application/json.schema`) and a new security scheme which updates your Tyk OAS API Definition with the new OAS API definition by sending a `PATCH` request to your Tyk Gateway.

| Property     | Description              |
|--------------|--------------------------|
| Resource URL | /tyk/apis/oas/{api-id}   |
| Method       | PATCH                    |
| Type         | None                     |
| Body         | OAS API Definition       |
| Param        | Path Parameter: {api-id} |

```
curl --location --request PATCH 'http://{your-tyk-host}:{port}/tyk/apis/oas/{api-id}' \
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

#### Check request response

If the command succeeds, you will see the following response, where key contains the newly created API ID:

```.json
{
    "key": {api-id},
    "status": "ok",
    "action": "modified"
}
```

#### Restart or hot reload your Gateway

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command with the following curl command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```
#### Protect your API based on the OAS definition

Previously you updated the Tyk OAS API Definition with a new OAS definition, which is describing a security mechanism. In order for your Tyk Gateway to pick that up, and start protecting API access, the authentication mechanism needs to be enabled within your Tyk configuration as well.

For that, together with the `PATCH` request you just performed, you’re going to add the authentication query parameter, that tells Tyk to automatically enable authentication, based on the settings in the OAS definition.

| Property     | Description                                          |
|--------------|------------------------------------------------------|
| Resource URL | /tyk/apis/oas/{api-id}                               |
| Method       | PATCH                                                |
| Type         | None                                                 |
| Body         | OAS API Definition                                   |
| Param        | Path Param: {api-id} Query Parameter: authentication |

```
curl --location --request PATCH 'http://{your-tyk-host}:{port}/tyk/apis/oas/{API_ID}?authentication=true' \
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
      "basic-config-and-security/securitySchemes": {
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

#### Check request response

If the command succeeds, you will see the following response, where key contains the newly created API ID:

```.json
{
    "key": {api-id},
    "status": "ok",
    "action": "modified"
}
```

#### Restart or hot reload your Gateway

Once you have updated your API, you will need to either restart the Tyk Gateway, or issue a hot reload command with the following curl command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Check your OAS API definition

Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) and check the newly modified Tyk OAS API Definition. You'll notice that the following configuration has been added under the` x-tyk-api-gateway` section, which now tells your Tyk Gateway to protect your API using an Authentication token.

```.json
{
  ...
  "x-tyk-api-gateway": {
    ...
    "server": {
      ...
      "authentication": {
        "enabled": true,
        "basic-config-and-security/securitySchemes": {
          "api_key": {
            "enabled": true,
            "header": {
              "enabled": true
            }
          }
        }
      }
    }
  }
}
```
#### Explicitly allow access to documented endpoints

While updating a Tyk API OAS Definition using just the OAS API Definition, you can also give instructions to the Gateway to explicitly allow access just to paths that are documented in the OAS API Definition. For that, we have to pass the `allowList` query parameter together with our payload.

| Property     | Description                                         |
|--------------|-----------------------------------------------------|
| Resource URL | /tyk/apis/oas/{api-id}                              |
| Method       | PATCH                                               |
| Type         | None                                                |
| Body         | OAS API Definition                                  |
| Param        | Path Parameter: {api-id} Query Parameter: allowList |

```
curl --location --request PATCH 'http://{your-tyk-host}:{port}/tyk/apis/oas/{api-id}?allowList=true' \
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
      "basic-config-and-security/securitySchemes": {
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

#### Check request response

If the command succeeds, you will see the following response, where key contains the newly created API ID:

```.json
{
    "key": {api-id},
    "status": "ok",
    "action": "modified"
}
```

#### Restart or hot reload your Gateway

Once you have updated your API, you will need to either restart the Tyk Gateway, or issue a hot reload command with the following curl command:

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
#### Validate API request payload

In the OAS API Definition that you updated at [Update an API using just the OAS definition](#update-an-api-using-just-the-oas-definition), you also defined a JSON schema that describes the payload format for any request that hits the `POST /pet` path.

You can now tell the Gateway to validate any incoming request agains the documented JSON schema. This is achieved by adding the `validateRequest` query parameter to the `PATCH` request, when updating the Tyk OAS API Definition.

| Property     | Description                                               |
|--------------|-----------------------------------------------------------|
| Resource URL | /tyk/apis/oas/{api-id}                                    |
| Method       | PATCH                                                     |
| Type         | None                                                      |
| Body         | OAS API Definition                                        |
| Param        | Path Parameter: {api-id} Query Parameter: validateRequest |

```
curl --location --request PATCH 'http://{your-tyk-host}:{port}/tyk/apis/oas/{API_ID}?validateRequest=true' \
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
#### Check request response

If the command succeeds, you will see the following response, where key contains the newly created API ID:

```.json
{
    "key": {api-id},
    "status": "ok",
    "action": "modified"
}
```

#### Restart or hot reload your Gateway

Once you have updated your API, you will need to either restart the Tyk Gateway, or issue a hot reload command with the following curl command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```
#### Check your OAS API definition

Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) and check the newly modified Tyk OAS API Definition. Notice that under the `middleware.operations.addPet` configuration has been added the `validateRequest` middleware configuration that ensures the payload validation from now on.

```.json
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

#### Mock response from OAS definition

In the OAS API Definition that you updated at [Update an API using just the OAS definition]({{< ref "#update-an-api-using-just-the-oas-definition" >}}) , you also defined a JSON schema that describes the response format for any request that hits the `GET /pet/{petId}` path.

You can now tell the Gateway to mock response of any incoming request against the documented JSON schema. This is achieved by adding the `mockResponse` query parameter to the `PATCH` request, when updating the Tyk OAS API Definition.

| Property     | Description                                               |
|--------------|-----------------------------------------------------------|
| Resource URL | `/tyk/apis/oas/{api-id}`                                    |
| Method       | PATCH                                                     |
| Type         | None                                                      |
| Body         | OAS API Definition                                        |
| Path Param |  `{api-id}`   |
|.Query Param | `mockResponse`    |

```
curl --location --request PATCH 'http://{your-tyk-host}:{port}/tyk/apis/oas/{API_ID}?mockResponse=true' \
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
#### Check request response

If the command succeeds, you will see the following response, where key contains the newly created API ID:

```.json
{
    "key": {api-id},
    "status": "ok",
    "action": "modified"
}
```

#### Restart or hot reload your Gateway

Once you have updated your API, you will need to either restart the Tyk Gateway, or issue a hot reload command with the following curl command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```
#### Check your OAS API definition

Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) and check the newly modified Tyk OAS API Definition. Notice that under the `middleware.operations.addPet` configuration has been added the `validateRequest` middleware configuration that ensures the payload validation from now on.

```.json
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
#### What did you just do?

You have demonstrated that by using the OAS API Definition, which can be either generated from your source code or created as part of design first approach, you can update or configure the Tyk OAS API Definition, with the `x-tyk-api-gateway` configuration.




