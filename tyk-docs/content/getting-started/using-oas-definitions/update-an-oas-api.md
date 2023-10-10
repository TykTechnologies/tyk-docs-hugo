---
title: "Update a Tyk OAS API"
date: 2022-07-08
tags: ["Tyk Tutorials", "Getting Started", "First API", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source", "Updating an OAS API"]
description: "Updating an OAS API"
menu:
  main:
    parent: "Using OAS API Definitions"
weight: 3
---

### Introduction

As developers working on API development, it can be necessary for us to regularly update our API definition as, for example, we add endpoints or support new methods. This definition is normally generated either from our codebase or created using API design tools (such as [Swagger Editor]({{< ref "https://editor.swagger.io/" >}}), [Postman]({{< ref "https://www.postman.com/" >}}) and [Stoplight]({{< ref "https://stoplight.io/" >}})).

One of the most powerful features of working with Tyk OAS is that you can make changes to your [Tyk OAS API Definition]({{< ref "/getting-started/using-oas-definitions/oas-glossary#tyk-oas-api-definition" >}}) or [OpenAPI Document]({{< ref "/getting-started/using-oas-definitions/oas-glossary#openapi-document" >}}) outside Tyk and then use this updated description to update the Tyk OAS API. You can simply update the configuration on Tyk without having to make any changes to the Tyk Gateway configuration (`x-tyk-api-gateway`).

In this section will walk you through different methods you can use to Update a Tyk OAS API using the Tyk Gateway API, Tyk Dashboard API and Tyk Dashboard GUI.

{{< note success >}}
**Note**  

Tyk OAS API support is currently in [Early Access]({{< ref "/frequently-asked-questions/using-early-access-features" >}}) and some Tyk features are not yet supported. You can see the status of what is and isn't yet supported [here]({{< ref "/getting-started/using-oas-definitions/oas-reference" >}}). 
{{< /note >}}

#### Differences between using the Tyk Dashboard API and Tyk Gateway API

The examples in these tutorials have been written assuming that you are using the Tyk Gateway API.

You can also run these steps using the Tyk Dashboard API, noting the differences summarised here:

| Interface             | Port     | Endpoint        | Authorization Header  | Authorization credentials        |
|-----------------------|----------|-----------------|-----------------------|----------------------------------|
| Tyk Gateway API       | 8080     | `tyk/apis/oas`  | `x-tyk-authorization` | `secret` value set in `tyk.conf` |
| Tyk Dashboard API     | 3000     | `api/apis/oas`  | `authorization`       | From Dashboard User Profile      |

* When using the Tyk Dashboard API, you can find your credentials key from your **User Profile > Edit Profile > Tyk Dashboard API Access Credentials**

{{< note success >}}
**Note**  

You will also need to have ‘admin’ or ‘api’ rights if [RBAC]({{< ref "/tyk-dashboard/rbac.md" >}}) is enabled.
{{< /note >}}

{{< tabs_start >}}
{{< tab_start "Updating with a new Tyk OAS API Definition" >}}

### Tutorial 1: Create and update a keyless Tyk OAS API

<details>
  <summary>
    Click to expand tutorial
  </summary>
  
#### Step 1: Create an initial API

Following the instructions to [create a Tyk OAS API]({{< ref "getting-started/using-oas-definitions/create-an-oas-api" >}}), create a new API by sending [this](https://bit.ly/39tnXgO) Tyk OAS API Definition to the Gateway API endpoint (this is an example that contains the very minimal required fields).

Remember to set the `x-tyk-authorization` value in your request header and curl the domain name and port to be the correct values for your environment. 

```curl
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
        "value": "/petstore/",
        "strip": true
      }
    }
  }
}'
```

If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

```.json
{
    "key": {NEW-API-ID},
    "status": "ok",
    "action": "added"
}
```

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Step 2: Update your API with a new endpoint

Let's say that you have updated your API definition by adding details of the `POST /pet` path of the Petstore API.

You simply update your Tyk OAS API Definition and send it to the Tyk Gateway using a `PUT` request to the `/apis/oas` endpoint.

| Property     | Description              |
|--------------|--------------------------|
| Resource URL | `/tyk/apis/oas/{API-ID}` |
| Method       | `PUT`                    |
| Type         | None                     |
| Body         | Tyk OAS API Definition   |
| Parameters   | Path: `{API-ID}`         |

To direct the update to the correct Tyk OAS API, you need to specify the API-ID value from the response you received from Tyk when creating the API. You can find this in the `x-tyk-api-gateway.info.id` field of the Tyk OAS API Definition that Tyk has stored in the /apps folder of your Tyk Gateway.

Remember to set the `x-tyk-authorization` value in your request header and the domain name and port to be the correct values for your environment as you use this command to update your API:

```.curl
curl --location --request PUT 'http://{your-tyk-host}:{port}/tyk/apis/oas/{API-ID}' \
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
    },
    "x-tyk-api-gateway": {
        "info": {
            "name": "Petstore",
            "id": {API-ID},
            "state": {
                "active": true
            }
        },
        "upstream": {
            "url": "https://petstore.swagger.io/v2"
        },
        "server": {
            "listenPath": {
                "value": "/petstore/",
                "strip": true
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

#### What did you just do?

You sent an updated Tyk OAS API Definition to the Tyk Gateway's `/apis/oas` endpoint.

For a next step, continue to tutorial 2, where we will protect the new API by enabling authentication.

</details>

### Tutorial 2: Update your API with authentication

You've now got an API deployed on your Tyk Gateway, but it is keyless - anyone can access it without authenticating themselves. Let's now add some security so that you can control who can access your service.

<details>
  <summary>
    Click to expand tutorial
  </summary>

#### Step 1: Modify your Tyk OAS API Definition

Update your Tyk OAS API Definition as follows, configuring the authentication method to require an API key to access your API:

```.json
...
"basic-config-and-security/security":[
  {
      "api_key":[
        
      ]
  }
],
...
"components": {
  "securitySchemes": {
    "api_key": {
        "in": "header",
        "name": "api_key",
        "type": "apiKey"
    }
  }
  ....
}
...
"x-tyk-api-gateway": {
  ...
  "server": {
    ...
    "authentication": {
      "enabled": true,
      "securitySchemes": {
        "api_key": {
          "enabled": true
        }
      }
    }
  }
}
```

You can check out an example of a full Tyk OAS API definition [here](https://bit.ly/3mHuBTY).

#### Step 2: Update the Tyk OAS API
You need to update the configuration of your API on your Tyk Gateway. As before, you do this by sending a `PUT` request passing the updated Tyk OAS API Definition. 

Remember to set the `x-tyk-authorization` value in your request header and the domain name and port to be the correct values for your environment. The path parameter is, again, the unique API Id that was assigned when you first created the API in Tyk Gateway.

Here's the command:

```.curl
curl --location --request PUT 'http://{your-tyk-host}:{port}/tyk/apis/oas/{API-ID}' \
--header 'x-tyk-authorization: {your-secret}' \
--header 'Content-Type: text/plain' \
--data-raw 
'{
    "info": {
        "title": "Petstore",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "basic-config-and-security/security":[
      {
          "api_key":[
            
          ]
      }
    ],   
    "components": {
      "securitySchemes": {
        "api_key": {
            "in": "header",
            "name": "api_key",
            "type": "apiKey"
        }
      },
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
    },
    "x-tyk-api-gateway": {
      "info": {
          "name": "Petstore",
          "id": {API-ID},
          "state": {
              "active": true
          }
      },
      "upstream": {
          "url": "https://petstore.swagger.io/v2"
      },
      "server": {
          "listenPath": {
              "value": "/petstore/",
              "strip": true
          }
        "authentication": {
          "enabled": true,
          "securitySchemes": {
            "api_key": {
              "enabled": true
            }
          }
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
    "action": "added"
}
```

Once you have updated your API, don't forget you need to either restart the Tyk Gateway, or issue a hot reload command to ensure it is loaded into the Gateway ready to handle traffic:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Step 3: Test your protected API

1. Send a request without any credentials

```
curl --location --request POST 'http://{your-tyk-host}:{port}/petstore/pet/' \
--header 'accept: */*' \
--header 'Content-Type: application/json'
--data-raw 
'{
    "category": {
        "id": 0,
        "name": "dogs"
    },
    "name": "labrador",
    "photoUrls": [],
    "tags": [
        {
            "id": 0,
            "name": "family_dogs"
        }
    ],
    "status": "available"
}'
```
You will see the following response:

```.json
{
  "error": "Authorization field missing"
}
```

2. Send a request with incorrect credentials

```
curl --location --request GET ''http://{your-tyk-host}:{port}/petstore/pet/123' \
--header 'accept: */*' \
--header 'Content-Type: application/json' \
--header 'api_key: 12345'
--data-raw 
'{
    "id": 0,
    "category": {
        "id": 0,
        "name": "dogs"
    },
    "name": "labrador",
    "photoUrls": [],
    "tags": [
        {
            "id": 0,
            "name": "family_dogs"
        }
    ],
    "status": "available"
}'
```
You will see the following response:

```.json
{
  "error": "Access to this API has been disallowed"
}
```

3. Send a request with correct credentials

Obtain an API key from your Tyk Gateway and provide this in your curl command in place of `$(API_KEY)` as follows:

```
curl --location --request GET '${GATEWAY_URL}/petstore-test/pet/123' \
--header 'accept: */*' \
--header 'Content-Type: application/json' \
--header 'api_key: ${API_KEY}'
--data-raw 
'{
    "id": 0,
    "category": {
        "id": 0,
        "name": "dogs"
    },
    "name": "labrador",
    "photoUrls": [],
    "tags": [
        {
            "id": 0,
            "name": "family_dogs"
        }
    ],
    "status": "available"
}'
```
If the command succeeds, you will receive an HTTP 200 response with the following payload:

```.json
{
    "id": {ALLOCATED_ID},
    "category": {
        "id": 0,
        "name": "dogs"
    },
    "name": "labrador",
    "photoUrls": [],
    "tags": [
        {
            "id": 0,
            "name": "family_dogs"
        }
    ],
    "status": "available"
}
```
Congratulations! You have just created your first keyless Tyk OAS API, then protected it using Tyk.

</details>

{{< tab_end >}}
{{< tab_start "Updating with a new OpenAPI Document" >}}
### Tutorial 3: Update Tyk OAS API definition with an updated OpenAPI definition

#### Step 1: Create an Initial API

Following the instructions to [create a Tyk OAS API]({{< ref "getting-started/using-oas-definitions/create-an-oas-api" >}}), create a new API by sending [this](https://bit.ly/39tnXgO) Tyk OAS API Definition to the Gateway API endpoint (this is an example that contains the very minimal required fields).

Remember to set the `x-tyk-authorization` value in your request header and curl the domain name and port to be the correct values for your environment. 

```curl
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
        "value": "/petstore/",
        "strip": true
      }
    }
  }
}'
```

If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

```.json
{
    "key": {NEW-API-ID},
    "status": "ok",
    "action": "added"
}
```

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Step 2: Update the OpenAPI Document

Now let's assume you made a change in your API definition (as mentioned above, from code or a tool, outside Tyk's domain). The change could be adding a new path, changing a description or anything that changes the definition of the API.

In this example we added a new endpoint, `POST /pet`, with a schema that validates the payload it receives (`requestBody.content.application/json.schema`) and a new security scheme.

You can see the updated OpenAPI Document in the next step.

#### Step 3: Update the Tyk OAS API using the OpenAPI Document

You can update your Tyk OAS API by providing just the OpenAPI Document, using the `PATCH` request.

Tyk will use the content of the OpenAPI Document to update just the OpenAPI section in the Tyk OAS API definition.

| Property     | Description                |
|--------------|----------------------------|
| Resource URL | `/tyk/apis/oas/{API-ID}`   |
| Method       | `PATCH`                    |
| Type         | None                       |
| Body         | OAS API Definition         |
| Parameters   | Path: `{API-ID}`           |

```curl
curl --location --request PATCH 'http://{your-tyk-host}:{port}/tyk/apis/oas/{API-ID}' \
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

```json
{
    "key": {API-ID},
    "status": "ok",
    "action": "modified"
}
```

Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

```curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Step 4: Protect your API based on the OpenAPI definition

You have now updated the Tyk OAS API definition with a new OpenAPI Document, that describes a new security mechanism. In order for Tyk Gateway to start protecting the API using this authentication mechanism, it needs to be *enabled* within the Tyk section of the Tyk OAS API definition.

To do this you would add the query parameter `authentication=true` to the `PATCH` request you just performed: this tells Tyk to automatically enable authentication, based on the settings in the OpenAPI definition.

| Property     | Description                                         |
|--------------|-----------------------------------------------------|
| Resource URL | `/tyk/apis/oas/{API-ID}`                            |
| Method       | `PATCH`                                             |
| Type         | None                                                |
| Body         | OAS API Definition                                  |
| Parameters   | Path: `{API-ID}` Query: `authentication`            |

You can do this now, passing in the same OpenAPI Document again:

```
curl --location --request PATCH 'http://{your-tyk-host}:{port}/tyk/apis/oas/{API-ID}?authentication=true' \
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

```json
{
    "key": {API-ID},
    "status": "ok",
    "action": "modified"
}
```

Once you have updated your API, don't forget that you need to either restart the Tyk Gateway, or issue a hot reload command:

```curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

#### Step 5: Check your OAS API definition

Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) and check the newly modified Tyk OAS API Definition. You'll notice that the following configuration has been added under the` x-tyk-api-gateway` section, which now tells your Tyk Gateway to protect your API using an Authentication token.

```json
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

You sent an updated OpenAPI Document to the Tyk Gateway's `/apis/oas` endpoint using the `PATCH` method and automatically configured Tyk to use the security settings in that document by setting the query parameter `authentication=true`.

You have updated a Tyk OAS API, enabling authentication, using only the OpenAPI Document. You didn't have to work with the Tyk OAS API Definition, Tyk handled that for you.

{{< tab_end >}}
{{< tabs_end >}}
