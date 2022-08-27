---
title: "Import an OAS API"
date: 2022-07-11
tags: ["Tyk Tutorials", "Getting Started", "First API", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source", "Import an OAS API"]
description: "Importing an OAS API"
menu:
  main:
    parent: "Using OAS API Definitions"
weight: 4
---

{{< toc >}}

### Introduction

Tyk supports importing OAS API Definitions (In JSON format, version 3.0.x) from either the Tyk Gateway or the Dashboard. Below are the commands you can use to get Tyk to generate the respective Tyk OAS API definitions for OAS API Defintions.

### Open Source

{{< note success >}}
**Note**  

For the following tutorials, use your Tyk Gateway API secret stored in your `tyk.conf` file, the property is called `secret`, you will need to use this as a header called `x-tyk-authorization` to make calls to the Gateway API
{{< /note >}} 


| Property     | Description            |
|--------------|------------------------|
| Resource URL | /tyk/apis/oas/import   |
| Method       | POST                   |
| Type         | None                   |
| Body         | Tyk OAS API Definition |
| Param        | None                   |

#### Import an OAS API definition

Firstly, call the Tyk Gateway import endpoint with an OAS API definition.

{{< note success >}}
**Note**  

For the Tyk Gateway, the default`{port}` is `8080`.
{{< /note >}}

```
curl --location --request POST 'http://{your-tyk-host}:{port}/tyk/apis/oas/import' \
--header 'x-tyk-authorization: {your-secret}' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "openapi": "3.0.3",
  "info": {
    "title": "Petstore",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://petstore.swagger.io/v2"
    }
  ],
  "components": {},
  "paths": {
    "/pet": {
      "post": {
        "operationId": "addPet",
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
    "action": "added"
}
```

What you have done is send a Tyk OAS API definition to the Tyk `/apis/oas` endpoint. Tyk OAS API definitions are discussed in detail in the OAS API section. These objects encapsulate all of the settings for an OAS API within your Tyk Gateway.

#### Restart or hot reload your Gateway

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command with the following curl command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Check your OAS API definition

Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`), and check your newly created Tyk OAS API Definition. You’ll notice that a `x-tyk-api-gateway` section has been added to the initial OAS API Definition, containing the minimum amount of information in order to have a valid Tyk OAS API Definition.

One thing to notice is that Tyk took the value from the `servers` section of the OAS API Definition and used as a value for the upstream URL.

```.json
{
  ...
  "servers": [
    {
      "url": "http://{your-tyk-host}:{port}/"
    },
    {
      "url": "https://petstore.swagger.io/v2"
    }
  ],
  ...
  "x-tyk-api-gateway": {
    "info": {
      "id": {api-id},
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
        "value": "/",
        "strip": true
      }
    }
  }
}
```
#### What did you just do?

You created a fully functional Tyk OAS API Definition by providing an OAS API Definition. Tyk worked out and added all the information it needed so you didn’t have to! Let’s see next how you can enable extra capabilities of the Gateway when importing an OAS API Definition.

### Tutorial: Create An OAS definition with an upstream URL and listen path

| Property     | Description             |
|--------------|-------------------------|
| Resource URL | /tyk/apis/oas/import    |
| Method       | POST                    |
| Type         | None                    |
| Body         | Tyk OAS API Definition  |
| Param        | upstreamURL  listenPath |

#### Import an OAS API definition

When calling the import Gateway API, you can provide a custom `upstreamURL` and `listenPath` values for your Tyk OAS API Definition:

- the listen path will default to `/` if `listenPath` is not provided
- If `upstreamURL` is not provided, the upstream URL defaults to the URL in the first `servers` section.

```
curl --location --request POST 'http://{your-tyk-host}:{port}/tyk/apis/oas/import?upstreamURL=http://tyk.io&listenPath=/oas-api' \
--header 'x-tyk-authorization: {your-secret}' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "openapi": "3.0.3",
  "info": {
    "title": "Petstore",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://petstore.swagger.io/v2"
    }
  ],
  "components": {},
  "paths": {
    "/pet": {
      "post": {
        "operationId": "addPet",
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
    "action": "added"
}
```

#### Restart or hot reload your Gateway

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command with the following curl command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Check your OAS API definition

Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) and check the newly created Tyk OAS API Definition. You’ll see that now Tyk doesn’t read the upstream URL from the server section of the OAS API Definition and that under the `x-tyk-api-gateway` section the `upstream.url` value points now to http://tyk.io and the `server.listenPath.` value has the `/oas-api/` value, which are the values that you passed as query parameters.

```.json
{
  ...
  "servers": [
    {
      "url": "http://127.0.0.1:8181/oas-api"
    },
    {
      "url": "https://petstore.swagger.io/v2"
    }
  ],
  "x-tyk-api-gateway": {
    "info": {
      "id": {api-id},
      "name": "Petstore",
      "state": {
        "active": true
      }
    },
    "upstream": {
      "url": "http://tyk.io"
    },
    "server": {
      "listenPath": {
        "value": "/oas-api",
        "strip": true
      }
    }
  }
}
```
#### What did you just do?

You created a fully functional Tyk OAS API Definition by providing an OAS API Definition and passed a custom upstream URL and listen path.

### Create a protected API when importing an OAS API definition

| Property     | Description            |
|--------------|------------------------|
| Resource URL | /tyk/apis/oas/import   |
| Method       | POST                   |
| Type         | None                   |
| Body         | Tyk OAS API Definition |
| Param        | authentication         |

#### Tutorial: Import OAS API Defintion with defined security scheme

You’re going to send an OAS API Definition to the Tyk Gateway import API, but this time, your OAS definition contains information about how this API should be protected. In order for Tyk to read and apply the security policies we need to pass the `authentication=true` query parameter when calling the import endpoint.

```
curl --location --request POST 'http://{your-tyk-host}:{port}/tyk/apis/oas/import?authentication=true' \
--header 'x-tyk-authorization: {your-secret}' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "openapi": "3.0.3",
  "info": {
    "title": "Petstore",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://petstore.swagger.io/v2"
    }
  ],
  "components": {
    "securitySchemes": {
      "api_key": {
        "in": "header",
        "name": "api_key",
        "type": "apiKey"
      }
    }
  },
  "paths": {
    "/pet": {
      "post": {
        "operationId": "addPet",
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
  },
  "security": [
    {
      "api_key": []
    }
  ]
}'
```
#### Check request response

If the command succeeds, you will see the following response, where key contains the newly created API ID:

```.json
{
    "key": {api-id},
    "status": "ok",
    "action": "added"
}
```

#### Restart or hot reload your Gateway

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command with the following curl command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Check your OAS API definition

Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) and check the newly created Tyk OAS API Definition. You’ll notice that within the `x-tyk-api-gateway.server` section, the `authentication` section has been configured, and for the `api_key securityScheme`, that was provided together with the OAS API Definition, the `Authentication Token` authentication mechanism has been applied.

For more information on how Tyk extracts data about security defined from the OAS API definition, and what authentication mechanisms can be configured, see [Authentication]({{< ref "/content/getting-started/key-concepts/authentication.md" >}}).

```.json
{
  ...
  "x-tyk-api-gateway": {
    ...
    "server": {
      ...
      "authentication": {
        "enabled": true,
        "securitySchemes": {
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

#### What did you just do?

You created a fully protected Tyk OAS API Definition by providing a OAS API Definition that has security information included within it.

### Tutorial: Create an API and explicitly allow access to paths

| Property     | Description            |
|--------------|------------------------|
| Resource URL | /tyk/apis/oas/import   |
| Method       | POST                   |
| Type         | None                   |
| Body         | Tyk OAS API Definition |
| Param        | allowList              |

#### Import OAS API Defintion with defined security scheme

You’re going to send an OAS API Definition to the Tyk Gateway import API, but this time you want to explicitly allow access just to paths defined in the OAS API Definition. For that we need to pass along with the request to the import API, the `allowList=true` query parameter.

```
curl --location --request POST 'http://{your-tyk-host}:{port}/tyk/apis/oas/import?allowList=true' \
--header 'x-tyk-authorization: {your-secret}' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "openapi": "3.0.3",
  "info": {
    "title": "Petstore",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://petstore.swagger.io/v2"
    }
  ],
  "components": {
    "schemas": {
      "Pet": {
        "properties": {
          "category": {
            "example": "dog",
            "type": "string"
          },
          "id": {
            "example": 10,
            "format": "int64",
            "type": "integer"
          },
          "name": {
            "example": "doggie",
            "type": "string"
          },
          "status": {
            "description": "pet status in the store",
            "enum": [
              "available",
              "pending",
              "sold"
            ],
            "type": "string"
          }
        },
        "required": [
          "name"
        ],
        "type": "object"
      }
    }
  },
  "paths": {
    "/pet": {
      "post": {
        "operationId": "addPet",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Pet"
              }
            }
          },
          "description": "Update an existent pet in the store",
          "required": true
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
    "action": "added"
}
```

#### Restart or hot reload your Gateway

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command with the following curl command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```
#### Check your OAS API definition

Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`),and check the newly created Tyk OAS API Definition. You’ll notice that within the  `x-tyk-api-gateway.middleware` section, the operations section has been configured, and that for each `operationId` of the path, the `allowList` middleware has been configured.

```.json
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
}
```
#### What did you just do?

You created an API that which tells your Tyk Gateway to allow access just on the paths that are defined in your OAS API Definition.

### Tutorial: Create an API that validates the request payload

| Property     | Description            |
|--------------|------------------------|
| Resource URL | /tyk/apis/oas/import   |
| Method       | POST                   |
| Type         | None                   |
| Body         | Tyk OAS API Definition |
| Param        | validateRequest        |

#### Import OAS API Defintion with defined security scheme

You’re going to send an OAS API Definition to the Tyk Gateway import API, which also contains describes the `/pet` and  POST how the payload should look like. In order for Tyk to read and validate any request agains the JSON schema provided, `validateRequest=true` query parameter is needed when calling the import endpoint.

```
curl --location --request POST 'http://{your-tyk-host}:{port}/tyk/apis/oas/import?validateRequest=true' \
--header 'x-tyk-authorization: {your-secret}' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "openapi": "3.0.3",
  "info": {
    "title": "Petstore",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://petstore.swagger.io/v2"
    }
  ],
  "components": {
    "schemas": {
      "Pet": {
        "properties": {
          "category": {
            "example": "dog",
            "type": "string"
          },
          "id": {
            "example": 10,
            "format": "int64",
            "type": "integer"
          },
          "name": {
            "example": "doggie",
            "type": "string"
          },
          "status": {
            "description": "pet status in the store",
            "enum": [
              "available",
              "pending",
              "sold"
            ],
            "type": "string"
          }
        },
        "required": [
          "name"
        ],
        "type": "object"
      }
    }
  },
  "paths": {
    "/pet": {
      "post": {
        "operationId": "addPet",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Pet"
              }
            }
          },
          "description": "Update an existent pet in the store",
          "required": true
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
    "action": "added"
}
```

#### Restart or hot reload your Gateway

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command with the following curl command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Check your OAS API definition

Go to /apps folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`),and check the newly created Tyk OAS API Definition. You’ll notice that within the  `x-tyk-api-gateway.middleware section`, the operations section has been configured, and that for each `operationId` of the path, the `validateRequest` middleware has been configured.

For more information on how Tyk builds the middleware operations structure in order to configure middleware,  see [Paths]({{< ref "/content/getting-started/key-concepts/paths.md" >}}).

```.json
{
  ...
  "x-tyk-api-gateway": {
    ...
    "middleware": {
      "operations": {
        "addPet": {
          "validateRequest": {
            "enabled": true,
            "errorResponseCode": 422
          }
        }
      }
    }
  }
}
```
#### What did you just do?

You created an API that which tells your Tyk Gateway to validate any incoming request, against the JSON schema defined in the OAS API Definition.