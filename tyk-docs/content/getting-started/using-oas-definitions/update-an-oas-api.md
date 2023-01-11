---
title: "Update an OAS API"
date: 2022-07-08
tags: ["Tyk Tutorials", "Getting Started", "First API", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source", "Updating an OAS API"]
description: "Updating an OAS API"
menu:
  main:
    parent: "Using OAS API Definitions"
weight: 3
---

{{< toc >}}

### Introduction

This section will walk you through updating an OAS API. We will cover the following methods:

- Using the Tyk Open Source Gateway API
- Using the file based method for the Open Source Gateway
- Using the Tyk Dashboard
- Using the Dashboard API

### Differences between the Dashboard and Gateway API method

The steps for using the Dashboard and Gateway APIs for updating APIs are very similar. The examples below are written for the Gateway API. 

The only differences when using the Dashboard API are:

1. Use `api/apis/oas` instead of `tyk/apis/oas` when calling the API Endpoints.

For example:

```bash
//Gateway API Endpoint
/tyk/apis/oas

//Dashboard API Endpoint
/api/apis/oas
```

2. Replace the `x-tyk-authorization` header with `authorization` and use the key (**Tyk Dashboard API Access Credentials**) from your user profile within the Tyk Dashboard.
3. For the Tyk Gateway API, the default`{port}` is `8080`.
4. For the Tyk Dashboard API, the default `{port}` is `3000`. 

### Tutorial: Create an OAS API with the Tyk Gateway API

#### Make sure you know your API secret

Your Tyk Gateway API secret is stored in your `tyk.conf` file, the property is called `secret`. You will need to use this as a header called `x-tyk-authorization` to make calls to the Gateway API.

#### Create an API

To [create the API]({{< ref "/content/getting-started/using-oas-definitions/create-an-oas-api.md" >}}), send a Tyk OAS API Definition [link to glossary] to the `apis` endpoint (http://{your-tyk-host}:{port}/tyk/apis/oas), which will return the status and version of your Tyk Gateway. Change the `x-tyk-authorization` value and curl the domain name and port to be the correct values for your environment.

| Property     | Description            |
|--------------|------------------------|
| Resource URL | /tyk/apis/oas          |
| Method       | POST                   |
| Type         | None                   |
| Body         | Tyk OAS API Definition |
| Param        | None                   |

It is possible to define a Tyk API definition with 30 lines.

```.curl
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

#### Update your API

Update your created Tyk OAS API Definition, by adding details of a path of the Petstore API. Then send a PUT request to the apis endpoint (http://{your-tyk-host}:{port}/tyk/apis/oas) with the updated definition.

Change the `x-tyk-authorization` value and curl your domain name and port to be the correct values for your environment. 

Pick the `api-id` value from the request response, or from the apps folder of your Tyk Gateway, pick up the API ID from the Tyk OAS API Definition filename, or go to the definition and copy the value from `x-tyk-api-gateway.info.id`.

| Property     | Description            |
|--------------|------------------------|
| Resource URL | /tyk/apis/oas          |
| Method       | PUT                    |
| Type         | None                   |
| Body         | Tyk OAS API Definition |
| Param        | None                   |

```.curl
curl --location --request PUT 'http://{your-tyk-host}:{port}/tyk/apis/oas/{api-id}' \
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
            "id": {api-id},
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

#### Check your response

If the command succeeds, you will see the following response, where the key valuecontains the newly updated API ID:

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

#### What did you just do?

You sent an updated Tyk OAS API Definition to the Tyk Gateway `/apis/oas` endpoint. These objects encapsulate all of the settings for an API within Tyk Gateway. You should also check out also how to [protect your API]({{< ref "/content/getting-started/using-oas-definitions/create-an-oas-api.md#protect-your-api" >}}).


### With the Tyk Dashboard

You can follow the steps for [Updating an API with the Tyk Gateway API](#tutorial-create-an-oas-api-with-the-tyk-gateway-api), replacing the following:

- Use `api/apis/oas` for calling the API endpoints instead of `tyk/apis/oas`.
- Use an `authorization` header with your **Tyk Dashboard API Acess Credentials** key (available from your User Profile) instead of using the `x-tyk-authorization` header.

### With the Tyk Dashboard API

It is possible to update APIs using your Tyk Dashboard REST API. You will need an API key for your organisation and one command to create the API and make it live.

For more details on how to use the Dashboard API, checkout this step (Create an API | Step-5:-Protect-your-API ) where we protected the API, by sending an updated Tyk OAS API Definition.
