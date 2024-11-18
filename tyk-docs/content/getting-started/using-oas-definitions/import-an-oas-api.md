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

Tyk supports importing [OpenAPI Documents]({{< ref "/getting-started/using-oas-definitions/oas-glossary#openapi-document" >}}) (in JSON format, OAS version 3.0.x) using the Tyk Gateway API, the Tyk Dashboard API or the [Tyk Dashboard GUI]({{< ref "#tutorial-7-using-the-tyk-dashboard-ui" >}}).

In the following tutorials, we provide the flows and commands you can use to get Tyk to generate the respective Tyk OAS API definitions from your OpenAPI Documents.

#### Differences between using the Tyk Dashboard API and Tyk Gateway API

Examples in the following tutorials have been written assuming that you are using the Tyk Gateway API.

You can also run these steps using the Tyk Dashboard API, noting the differences summarised here:

| Interface             | Port     | Endpoint        | Authorization Header  | Authorization credentials        |
|-----------------------|----------|-----------------|-----------------------|----------------------------------|
| Tyk Gateway API       | 8080     | `tyk/apis/oas`  | `x-tyk-authorization` | `secret` value set in `tyk.conf` |
| Tyk Dashboard API     | 3000     | `api/apis/oas`  | `Authorization`       | From Dashboard User Profile      |

As explained in the section on [Creating an OAS API]({{< ref "/getting-started/using-oas-definitions/create-an-oas-api" >}}) remember that when using the Tyk Dashboard API you only need to issue one command to create the API and load it onto the Gateway; when using the Tyk Gateway API you must remember to restart or hot reload the Gateway after creating the API.

* When using the Tyk Dashboard API, you can find your credentials key from your **User Profile > Edit Profile > Tyk Dashboard API Access Credentials**

{{< note success >}}
**Note**

You will also need to have ‘admin’ or ‘api’ rights if [RBAC]({{< ref "/tyk-dashboard/rbac.md" >}}) is enabled.
{{< /note >}}

### Tutorial 1: Create a Tyk OAS API by importing an OpenAPI Document

| Property     | Description              |
|--------------|--------------------------|
| Resource URL | `/tyk/apis/oas/import`   |
| Method       | `POST`                   |
| Type         | None                     |
| Body         | OpenAPI Document         |
| Parameters   | None                     |

<details>
  <summary>
    Click to expand tutorial
  </summary>

#### Import an OpenAPI Document

Firstly, call the Tyk Gateway API `import` endpoint, providing an OpenAPI Document in the request body:

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

If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

```.json
{
    "key": {NEW-API-ID},
    "status": "ok",
    "action": "added"
}
```

What you have done is to send an OpenAPI Document to Tyk Gateway's `/apis/oas/import` endpoint resulting in the creation of the API in your Tyk Gateway. Tyk has created a Tyk OAS API definition object using the OpenAPI Document that you provided. This encapsulates all of the settings for a Tyk OAS API within your Tyk Gateway.

#### Restart or hot reload your Gateway

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Check your Tyk OAS API definition

Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`), and check your newly created Tyk OAS API Definition. You’ll notice that a `x-tyk-api-gateway` section has been added to the initial OpenAPI Document, containing the minimum amount of information in order to have a valid Tyk OAS API Definition.

One thing to notice is that Tyk took the value from the `servers` section of the OpenAPI Document and used as a value for the upstream URL.

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
      "id": {API-ID},
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

You created a fully functional Tyk OAS API Definition by importing an OpenAPI Document. Tyk worked out and added all the information it needed so you didn’t have to! Let’s see next how you can enable extra capabilities of the Gateway when importing an OpenAPI Document.
</details>

### Tutorial 2: Create a Tyk OAS API with a custom upstream URL and listen path

| Property     | Description                              |
|--------------|------------------------------------------|
| Resource URL | `/tyk/apis/oas/import`                   |
| Method       | `POST`                                   |
| Type         | None                                     |
| Body         | OpenAPI Document                         |
| Parameters   | Query: `upstreamURL`  `listenPath`       |

<details>
  <summary>
    Click to expand tutorial
  </summary>

#### Import an OpenAPI Document with custom `upstreamURL` and `listenPath`

When calling the import Gateway API, you can provide custom `upstreamURL` and `listenPath` values that will be added to your Tyk OAS API Definition.

Note that
- the listen path will default to `/` if `listenPath` is not provided
- if `upstreamURL` is not provided, the upstream URL defaults to the first URL in the `servers` section of the OpenAPI Document

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

If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

```.json
{
    "key": {NEW-API-ID},
    "status": "ok",
    "action": "added"
}
```

#### Restart or hot reload your Gateway

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Check your Tyk OAS API definition

Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) and check the newly created Tyk OAS API Definition.

You’ll see that Tyk has populated two fields within the `x-tyk-api-gateway` section with the values you passed in as query parameters:
 - `upstream.url` has the value http://tyk.io
 - `server.listenPath` has the value `/oas-api/`

Because you provided the custom upstream URL, Tyk has applied this value in the Tyk OAS API Definition, instead of the value in the `servers` section of the OpenAPI Document.

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
      "id": {API-ID},
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

You created a fully functional Tyk OAS API Definition by providing an OpenAPI Document and passing custom upstream URL and listen path.
</details>

### Tutorial 3: Create a secured API when importing an OpenAPI Document

| Property     | Description                    |
|--------------|--------------------------------|
| Resource URL | `/tyk/apis/oas/import`         |
| Method       | `POST`                         |
| Type         | None                           |
| Body         | OpenAPI Document               |
| Parameters   | Query: `authentication`        |

<details>
  <summary>
    Click to expand tutorial
  </summary>

#### Import an OpenAPI Document with `authentication=true`

You’re going to send an OpenAPI Document to the Tyk Gateway API's `import` endpoint again, but this time your OpenAPI Document will contain instructions on how this API should be protected. So that Tyk will read and apply the defined security policy you must pass the `authentication=true` query parameter when calling the import endpoint.

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
  "basic-config-and-security/security": [
    {
      "api_key": []
    }
  ]
}'
```
#### Check request response

If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

```.json
{
    "key": {NEW-API-ID},
    "status": "ok",
    "action": "added"
}
```

#### Restart or hot reload your Gateway

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Check your Tyk OAS API definition

Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) and check the newly created Tyk OAS API Definition.

You’ll see that Tyk has populated the `authentication` section within the `x-tyk-api-gateway` section according to the instructions you provided in the `import` request. The `api_key` security scheme has been enabled (which indicates that the [Authentication Token]({{< ref "/getting-started/key-concepts/authentication#authentication-token" >}}) mechanism has been applied).

For more information on how Tyk extracts data about security defined from the OpenAPI Document and what authentication mechanisms can be configured, see [Authentication with OAS]({{< ref "/content/getting-started/key-concepts/authentication.md" >}}).

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

You created a fully protected Tyk OAS API by importing an OpenAPI Documnent that has security information included within it.
</details>

### Tutorial 4: Create an API and explicitly allow access to paths

| Property     | Description               |
|--------------|---------------------------|
| Resource URL | `/tyk/apis/oas/import`    |
| Method       | `POST`                    |
| Type         | None                      |
| Body         | Tyk OAS API Definition    |
| Parameters   | Query: `allowList`        |

<details>
  <summary>
    Click to expand tutorial
  </summary>
  
#### Import an OpenAPI Document with `allowList=true`

You’re going to create a new Tyk OAS API by importing an OpenAPI Document to the Tyk Gateway API, but this time you want to explicitly allow access just to paths defined in the OpenAPI Document. For this you will need to pass the `allowList=true` query parameter with the request.

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

If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

```.json
{
    "key": {NEW-API-ID},
    "status": "ok",
    "action": "added"
}
```

#### Restart or hot reload your Gateway

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```
#### Check your Tyk OAS API definition

Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) and check the newly created Tyk OAS API Definition.

You’ll see that Tyk has populated the `middleware` section within the `x-tyk-api-gateway` section, configuring the `operations` section to enable the `allow` middleware for each endpoint in the `operationId` list in the OpenAPI Document that you provided.

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

You created a Tyk OAS API that which tells your Tyk Gateway to allow access just on the paths that are defined in the OpenAPI Document.
</details>

### Tutorial 5: Create an API that validates the request payload

| Property     | Description                      |
|--------------|----------------------------------|
| Resource URL | `/tyk/apis/oas/import`           |
| Method       | `POST`                           |
| Type         | None                             |
| Body         | OpenAPI Document                 |
| Parameters   | Query: `validateRequest`         |

<details>
  <summary>
    Click to expand tutorial
  </summary>
  
#### Import an OpenAPI Document and enable middleware that will validate the request payload

You’re going to create a new Tyk OAS API by importing an OpenAPI Document to the Tyk Gateway API, but this time you want to instruct Tyk to validate requests made to the API against a specific JSON schema. For this you will need to pass the `validateRequest=true` query parameter when creating the Tyk OAS API.

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

If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

```.json
{
    "key": {NEW-API-ID},
    "status": "ok",
    "action": "added"
}
```

#### Restart or hot reload your Gateway

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Check your OAS API definition

Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) and check the newly created Tyk OAS API Definition.

You’ll see that Tyk has populated the `middleware` section within the `x-tyk-api-gateway` section, configuring the `operations` section to enable the `mockResponse` middleware for each endpoint in the `operationId` list in the OpenAPI Document that you provided. The option `fromOASExamples` has been enabled, which means that Tyk will use the schema defined in the `examples` section of the OpenAPI Document to construct the mock response.

For more information on how Tyk builds the `middleware.operations` structure to configure middleware, see [Paths]({{< ref "/getting-started/key-concepts/paths" >}}).

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

You created an API which tells your Tyk Gateway to validate any incoming request against the JSON schema defined in the Tyk OAS API Definition.
</details>

### Tutorial 6: Create an API with a Mock Response

| Property     | Description                  |
|--------------|------------------------------|
| Resource URL | `/tyk/apis/oas/import`       |
| Method       | `POST`                       |
| Type         | None                         |
| Body         | Tyk OAS API Definition       |
| Parameters   | Query: `mockResponse`        |

<details>
  <summary>
    Click to expand tutorial
  </summary>

#### Import an OpenAPI Document and enable middleware that will provide a mock response

You’re going to create a new Tyk OAS API by importing an OpenAPI Document to the Tyk Gateway API, but this time you want to instruct Tyk to provide a pre-configured (mock) response to any calls made to `GET /pet/{petId}`. For this you will need to pass the `mockResponse=true` query parameter when creating the Tyk OAS API.

```.curl
curl --location --request POST 'http://{your-tyk-host}:{port}/tyk/apis/oas/import?mockResponse=true' \
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

If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

```.json
{
    "key": {NEW-API-ID},
    "status": "ok",
    "action": "added"
}
```

#### Restart or hot reload your Gateway

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Check your OAS API definition

Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) and check the newly created Tyk OAS API Definition.

You’ll see that Tyk has populated the `middleware` section within the `x-tyk-api-gateway` section, configuring the `operations` section to enable the `mockResponse` middleware for each endpoint in the `operationId` list in the OpenAPI Document that you provided. The option `fromOASExamples` has been enabled, which means that Tyk will use the schema defined in the `examples` section of the OpenAPI Document to construct the mock response.

For more information on how Tyk builds the `middleware.operations` structure to configure middleware, see [Paths]({{< ref "/content/getting-started/key-concepts/paths.md" >}}).

For more information on mock responses, see the dedicated [page]({{< ref "product-stack/tyk-gateway/middleware/mock-response-middleware" >}}).

```.json
{
  ...
  "x-tyk-api-gateway": {
    ...
    "middleware": {
      "operations": {
        ...
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

You created an API which tells your Tyk Gateway to provide a mock response based on configured responses in the original OpenAPI Document.
</details>

### Tutorial 7: Using the Tyk Dashboard UI

In this tutorial we will show you how to use the Tyk Dashboard to create a new Tyk OAS API from an OpenAPI Document.

{{< youtube wFBtMV3ZlOc >}}

<details>
  <summary>
    Click to expand tutorial
  </summary>

1. Select “APIs” from the “System Management” section

{{< img src="/img/oas/api-menu.png" alt="API Menu" >}}

2. If you have a fresh Tyk installation with no other APIs added, click **Import API**:

{{< img src="/img/oas/first-api.png" alt="First API screen" >}}

3. If you already have APIs in your Tyk installation, click **Import API**:

{{< img src="/img/oas/add-new-api.png" alt="Import API" >}}

Tyk supports the following options when importing an API:

- From an OpenAPI Document (JSON format)
- From an existing Tyk API definition (Classic or OAS)
- From a SOAP WSDL definition

The process for importing from an existing Tyk API definition or SOAP WSDL definition is explained [here]({{< ref "/getting-started/import-apis#import-apis-via-the-dashboard-api" >}}). The import function will now accept an existing Tyk OAS API definition, the process is the same as for a Tyk Classic API definition.

#### Importing an OpenAPI Document

Tyk supports import of version 2.0 and 3.0.x OpenAPI Documents to create a Tyk OAS API Definition.

When importing OpenAPI Documents using the Dashboard, Tyk detects the version of OpenAPI Specification used in the document and generates either a Tyk Classic API Definition (for OAS v2.0) or a Tyk OAS API Definition (for OAS v3.0.x). There is also an option to create a Tyk Classic API Definition from an OpenAPI 3.0.x document if you wish.

{{< tabs_start >}}
{{< tab_start "Import from an OpenAPI v3.0 Document" >}}

1. From the Import API screen, select OpenAPI.

{{< img src="/img/oas/open-api-format.png" alt="Import OAS 3.0 API" >}}

2. Paste your OAS v3.0 compliant definition into the code editor.

{{< img src="/img/oas/oas-3-code.png" alt="OAS 3.0 definition in Editor" >}}

3. Note that the Dashboard has detected that an OAS v3.0 definition has been imported and you can now select between various manual and automatic configuration options.

{{< img src="/img/oas/oas-3-import-options.png" alt="OAS 3.0 configuration options" >}}

#### Manual Configuration options

- **Custom Listen Path**: A default listen path of of `/` is set if you don't configure this option
- **Custom Upstream URL**: The first URL listed in your `servers` section is used if you don't configure this option

#### Automatic Configuration options

- **Generate Validate Request Middleware**: You can automatically validate paths that have the `requestBody` and `schema` fields configured. This allows your Tyk Gateway to validate your request payload against the schema provided in your definition. See [Request Validation]({{< ref "product-stack/tyk-gateway/middleware/validate-request-middleware" >}}) for more details.
- **Apply Detected Authentication**: You can automatically apply the authentication specified in the `security` and `securitySchemes` sections of your definition. See [Authentication]({{< ref "/content/getting-started/key-concepts/authentication.md" >}}) for more details.
- **Allow access only to defined paths**: You can restrict access to the paths documented in your definition. See [Paths]({{< ref "/content/getting-started/key-concepts/paths.md" >}}) for more details.

4. Click **Import API**.

{{< img src="/img/oas/import-api-button.png" alt="Import API" >}}

Your API will be added to your list of APIs.
{{< tab_end >}}
{{< tab_start "Import from an OpenAPI v2.0 Document" >}}

1. From the Import API screen, select OpenAPI.

{{< img src="/img/oas/open-api-format.png" alt="Import OAS 2.0 API" >}}

2. Paste your OAS v2.0 compliant definition into the code editor.

{{< img src="/img/oas/oas-2-code.png" alt="OAS 2.0 definition in Editor" >}}

3. Note that the Dashboard has detected that an OAS v2.0 definition has been imported and you need to specify an upstream URL field to proceed.

{{< img src="/img/oas/upstream-url.png" alt="Upstream URL" >}}

4. Click **Import API**. 

{{< img src="/img/oas/import-api-button.png" alt="Import API" >}}

Your API will be added to your list of APIs.
{{< tab_end >}}
{{< tabs_end >}}
