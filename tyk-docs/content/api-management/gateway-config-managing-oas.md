---
title: "Managing Tyk OAS API Definition"
date: 2025-02-10
tags: ["Tyk OAS API", "Create", "Update", "Import", "Export", "Versioning", "API Key", "Security Policy"]
keywords: ["Tyk OAS API", "Create", "Update", "Import", "Export", "Versioning", "API Key", "Security Policy"]
description: "How to manage Tyk OAS API definition"
aliases:
  - /getting-started/key-concepts/high-level-concepts
  - /getting-started/using-oas-definitions/create-an-oas-api
  - /getting-started/using-oas-definitions/import-an-oas-api
  - /getting-started/using-oas-definitions/update-an-oas-api
  - /getting-started/using-oas-definitions/versioning-an-oas-api
  - /getting-started/using-oas-definitions/export-an-oas-api

  - /getting-started/using-oas-definitions/update-api-with-oas
  - /getting-started/using-oas-definitions
  - /getting-started/using-oas-definitions/moving-to-oas
  - /getting-started/using-oas-definitions/get-started-oas
---

## Overview

The [OpenAPI Specification (OAS)](https://www.openapis.org) is a ‘vendor neutral’ open standard specification for APIs supported by a large number of tools that will help you design and create APIs for your services. You can even generate OpenAPI descriptions from your source code. Tyk supports you to work with APIs that you've designed to the [OpenAPI Specification version 3.0.x](https://spec.openapis.org/oas/v3.0.3), making it even easier to get your API up and running.

Since one API Definition document now effectively describes all parts of your API flow a lot of the complexity of managing multiple documents and keeping them in sync goes away. This means that highly automated deployment patterns using CI/CD and GitOps just became a lot easier to implement.

### The right tool for the job

Tyk OAS support was designed to fit in with your existing workflows as seamlessly as possible, whether you have one of our paid offerings, or are using our free open-source Gateway. You should be able to do a huge amount in the editor of your choice. The Dashboard is of course there for you to use all the way through if you would like, or just to dip into if you want a bit of help with configuring a complex validation for example. 

An example of the sort of flow we envisage can be seen below. One of the great things about working with Tyk OAS is that you can have a single file that you deploy across your workflow. You then iterate on that one file until you are totally happy. At this point, you can publish the ‘public’ part of the API Definition to your developer portal (i.e. exactly what a Developer needs to use the API and nothing they don’t need to see like Tyk configuration details). You can also put the whole document into source control. Since you are using a single file for the whole flow, you can add in automation such as automatically trigger deploying an updated API when a new version is committed into your source control. This model is very popular in GitOps and CI/CD environments.

{{< img src="/img/oas/diagram_oas-flow-1.png" alt="Tyk workflow" >}}

The illustration below shows the same flow, highlighting that the API Definition includes the Tyk-specific information needed to configure Tyk Gateway, compared to when it is just the OpenAPI information describing your upstream service (required by an API Developer to create a service client).

{{< img src="/img/oas/diagram_oas-flow-2.png" alt="Tyk OAS API workflow" >}}

Moving to Tyk OAS can help you save time, reduce risks of error and streamline your workflows. Sounds great right? So should all of your HTTP APIs be OAS based now? 

**The answer is probably: yes!**

The key question is whether there is anything you currently use in your Tyk Classic APIs that isn’t yet supported by our Tyk OAS APIs. Whilst we have reached *feature maturity* for Tyk OAS, some Tyk Gateway features are not yet supported. You can see the status of what is and isn't yet supported [here]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-feature-status" >}}).

{{< warning success >}}

Warning

In Tyk Gateway release 5.3.0, Tyk OAS APIs gained feature maturity. Tyk Dashboard will automatically migrate any pre-5.3.0 Tyk OAS APIs to the feature mature standard when you upgrade to 5.3.0 or later. Tyk OAS APIs prior to v5.3.0 must be manually migrated if you are using Tyk OSS Gateway. Feature mature Tyk OAS APIs may not work with pre-5.3.0 versions of Tyk Gateway.

It is not possible to rollback to previous versions of Tyk components with Tyk OAS APIs created in 5.3.0.

For further details, please refer to the [release notes]({{< ref "developer-support/release-notes/gateway" >}}) for Tyk Gateway v5.3.0.
{{< /warning >}}

### Getting started with Tyk OAS

There are several ways to work with Tyk and OpenAPI described services. Which you choose is very much a question of what fits best with your learning and working style.
<!-- video removed, as it refers to Tyk Cloud "free forever"
We have a video that introduces how to use OpenAPI described APIs with Tyk.

{{< youtube lFxvpCSK9iA >}}
-->

#### Creating Tyk OAS APIs

You can [create Tyk OAS APIs]({{< ref "api-management/gateway-config-managing-oas#create-a-tyk-oas-api" >}}) using Tyk Gateway or Tyk Dashboard.

With the addition of OpenAPI support, we have added a new [API Designer]({{< ref "api-management/gateway-config-managing-oas#using-the-tyk-dashboard-gui" >}}) in the Tyk Dashboard. This includes syntax highlighting in the raw editor as well as a more intuitive approach to adding middleware to your APIs.

{{< note success >}}
**Note**  

Even if you plan to use an editor most of the time, the Tyk Dashboard is a great way to try out functions. You can also export anything you create in the Dashboard as a file or copy it straight out of the raw editor and load that into your editor to speed up creating subsequent APIs.
{{< /note >}}

##### Using your own code editor to create Tyk OAS APIs

To enjoy writing a *Tyk OAS API definition* as if it is [a native programming language](https://tyk.io/blog/get-productive-with-the-tyk-intellisense-extension/), you can add the [Tyk OAS API definition schema](https://raw.githubusercontent.com/TykTechnologies/tyk-schemas/main/JSON/draft-04/schema_TykOasApiDef_3.0.x.json) to your favorite IDE or editor. We have published a Tyk VS Code extension that provides Tyk API schema validation and auto-completion (both OAS and other schemas) in the [VS Code marketplace](https://marketplace.visualstudio.com/items?itemName=TykTechnologiesLimited.tyk-schemas). You can use it to create Tyk objects in your IDE (Tyk API definitions, Key and Tyk config file).

##### Importing your OpenAPI description to Tyk

If you already have a standard [OpenAPI document]({{< ref "api-management/gateway-config-tyk-oas#openapi-document" >}}) for your API, you can very easily [import it into Tyk]({{< ref "api-management/gateway-config-managing-oas#import-a-tyk-oas-api" >}}) and have it running in seconds. During the import Tyk will generate the required Tyk extension based on the OpenAPI description in the OpenAPI document and optional parameters you set in the import command. It will also try to establish the right place to send requests to and update the ‘public’ part of the API Definition to tell users how to send requests to the API gateway. It is also possible to [automatically configure some Tyk middleware]({{< ref "api-management/manage-apis/tyk-oas-api-definition/tyk-oas-middleware" >}}) from the OpenAPI description, configuring how Tyk will handle requests to the API. An import takes in an *OpenAPI document* file and turns it into a *Tyk OAS API Definition*.

{{< note success >}}
**Note**  

There are two types of import: one that creates a Tyk Classic API Definition and one that creates a Tyk OAS API Definition. It is the latter that we are covering here.
{{< /note >}}

#### Maintaining your APIs

Once a Tyk OAS API has been created in, or imported into, Tyk the Gateway will be able to manage and proxy traffic to the exposed endpoints as usual.

We provide a flexible way for you to [export a Tyk OAS API definition]({{< ref "api-management/gateway-config-managing-oas#export-a-tyk-oas-api" >}}) so that you can store it in source control for CI/CD or GitOps deployment patterns. You can also [export the OpenAPI description]({{< ref "api-management/gateway-config-managing-oas#export-just-the-openapi-document" >}}), with the Tyk extension removed, for example to upload to your Developer Portal. This is great because it strips out all the settings that your developers don’t need to know about.

Your OpenAPI description is a living document that describes your upstream service. When this is updated (for example, due to the addition of a new endpoint) instead of having to create a new Tyk OAS API to expose this, you can easily [update the OpenAPI]({{< ref "api-management/gateway-config-managing-oas#update-a-tyk-oas-api" >}}) part of your Tyk OAS API with the new OpenAPI document.

When you need to make breaking changes as your services and APIs evolve, it's easy to [use versioning with Tyk OAS APIs]({{< ref "api-management/gateway-config-managing-oas#versioning-a-tyk-oas-api" >}}).

### Community Feedback
 
We have a dedicated [Tyk OAS Category](https://community.tyk.io/c/oas/21) in our [Community Forum](https://community.tyk.io/). Please feel free to start conversations in there and we will help you out.

These tutorials will take you through the process of managing a Tyk OAS API from scratch.

## Create a Tyk OAS API

### Using the Tyk Gateway API

In this tutorial we show you how to create a minimal Tyk OAS API using the Tyk Gateway API, starting with a [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition" >}}).

When making calls to the Tyk Gateway API you'll need to set the domain name and port for your environment and, in the API request header, must provide credentials in the `x-tyk-authorization` field for Tyk to authorize your request, as follows:

| Interface             | Port     |  Authorization Header  | Authorization credentials        |
|-----------------------|----------|------------------------|----------------------------------|
| Tyk Gateway API       | 8080     |  `x-tyk-authorization` | `secret` value set in `tyk.conf` |

To create the API in Tyk, you simply send your Tyk OAS API Definition to the `apis/oas` endpoint of your Tyk Gateway API. 

| Property     | Description              |
|--------------|--------------------------|
| Resource URL | `/tyk/apis/oas`          |
| Method       | `POST`                   |
| Type         | None                     |
| Body         | Tyk OAS API Definition   |
| Parameters   | None                     |

Using [this](https://bit.ly/39tnXgO) minimal API definition it is possible to create a Tyk OAS API on your Tyk Gateway using only 30 lines:

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

**Check request response**

If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

```.json
{
    "key": {NEW-API-ID},
    "status": "ok",
    "action": "added"
}
```

What you have done is to send a Tyk OAS API definition to Tyk Gateway's `/apis/oas` endpoint resulting in the creation of the API in your Tyk Gateway. The Tyk OAS API definition object encapsulates all of the settings for a Tyk OAS API within your Tyk Gateway.

**Restart or hot reload**

Once you have created your API you will want it to be loaded into the Gateway so that it can serve traffic. To do this you simply restart the Tyk Gateway or issue a hot reload command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

You can go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) to see where Tyk has stored your Tyk OAS API Definition.

### Using the Tyk Dashboard API

You can also create APIs using the Tyk Dashboard API, starting with a [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition" >}}).

In this tutorial we will also show you how to test and protect your new API by enforcing an authentication requirement when making calls to the API.
  
When making calls to the Tyk Dashboard API you'll need to set the domain name and port for your environment and, in the API request header, must provide credentials in the `Authorization` field for Tyk to authorize your request, as follows:

| Interface             | Port     | Authorization Header  | Authorization credentials        |
|-----------------------|----------|-----------------------|----------------------------------|
| Tyk Dashboard API     | 3000     | `Authorization` | From Dashboard User Profile      |

From the Tyk Dashboard, select **Users** from the **System Management** section. Click **Edit** for your user, then scroll to the bottom of the page. Your Dashboard API Key is the first entry:

{{< img src="/img/oas/edit-profile.png" alt="User Edit Profile menu" >}}

We recommend that you store your Dashboard API Key, Dashboard URL & Gateway URL as environment variables so you don’t need to keep typing them in:

```
export DASH_KEY=db8adec7615d40db6419a2e4688678e0

# Locally installed dashboard
export DASH_URL=http://localhost:3000/api

# Tyk's Cloud Dashboard
export DASH_URL=https://admin.cloud.tyk.io/api

# Locally installed gateway
export GATEWAY_URL=http://localhost:8080

# Your Cloud Gateway
export GATEWAY_URL=https://YOUR_SUBDOMAIN.cloud.tyk.io
```

**Check which APIs are already loaded**

You can query the `/api/apis` endpoint to see what APIs are already loaded on your Tyk deployment.

| Property     | Description   |
|--------------|---------------|
| Resource URL | `/apis`       |
| Method       | `GET`         |
| Type         | None          |
| Body         | None          |
| Parameters   | None          |

```.terminal
curl -H "Authorization: ${DASH_KEY}" ${DASH_URL}/apis
{"apis":[],"pages":1}
```
{{< note success >}}
**Note**  

For a fresh install, you will see that no APIs currently exist
{{< /note >}}

**Create your first Tyk OAS API**

To create the API in Tyk, you simply send your Tyk OAS API Definition to the `apis/oas` endpoint of your Tyk Gateway API. 

| Property     | Description              |
|--------------|--------------------------|
| Resource URL | `/tyk/apis/oas`          |
| Method       | `POST`                   |
| Type         | None                     |
| Body         | Tyk OAS API Definition   |
| Parameters   | None                     |

Using [this](https://bit.ly/39jUnuq) API definition it is possible to create a Tyk OAS API on your Tyk Gateway that forwards requests to the [Swagger Petstore]({{< ref "https://petstore3.swagger.io" >}}) request/response service.

```
curl -H "Authorization: ${DASH_KEY}" -H "Content-Type: application/json" ${DASH_URL}/apis/oas -d "$(wget -qO- https://bit.ly/39jUnuq)"
```

If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

```
{
    "Status": "OK",
    "Message": "API created",
    "Meta": {NEW-API-ID}
}
```

**Test your new API**

The Swagger Petstore provides plenty of endpoints to allow you to test different REST methods and operations. In this tutorial we will first add (`POST`) a new pet to the store and then retrieve (`GET`) the details of that pet back. Note that, as an API client, there is no difference between calling a Tyk OAS API and a Tyk Classic API.

Create a new pet in the store using this `curl` command:

```
curl --location --request POST '${GATEWAY_URL}/petstore-test/pet' \
--header 'accept: */*' \
--header 'Content-Type: application/json' \
--data-raw '{
  "id": 123,
  "category": {
    "id": 0,
    "name": "dogs"
  },
  "name": "doggie",
  "tags": [
    {
      "id": 0,
      "name": "family_dogs"
    }
  ],
  "status": "available"
}'
```
Retrieve the pet that has just been created using this `curl` command:

```
curl --location --request GET '${GATEWAY_URL}/petstore-test/pet/123' \
--header 'accept: */*' \
--header 'Content-Type: application/json'
```

What you have done is send a request to the Tyk Gateway on the listen path `/petstore-test`. Using this path-based-routing, the Gateway is able to identify the API the client intended to target.

The Gateway stripped the listen path, and reverse proxied the request to https://petstore3.swagger.io

### Using the Tyk Dashboard GUI

Tyk Dashboard has a new and improved API Designer that you'll use when working with Tyk OAS APIs. In this tutorial we guide you through the steps to create a new Tyk OAS API using the GUI.

{{< youtube -LyJ14wuOrI >}}

**Steps for Configuration**

1. Select “APIs” from the “System Management” section

    {{< img src="/img/oas/api-menu.png" alt="Add new API" >}}

2. **Add new API**

    If you have a fresh Tyk installation with no other APIs added, click **Design new API**:

    {{< img src="/img/oas/first-api.png" alt="First API screen" >}}

    If you already have APIs in your Tyk installation, click **Add new API**:

    {{< img src="/img/oas/add-new-api.png" alt="Add new API" >}}

3. **Set up the Base Configuration for your API**

    1. From the **Overview** section, add your **API Name** and your **API Type** (for this tutorial, select **OAS HTTP**).
    2. From the **Details** section, add your **Target URL**. This will set the upstream target that hosts the service you want to proxy to. For this tutorial you can use https://petstore3.swagger.io.
    3. Click **Configure API** when you have finished.

    {{< img src="/img/oas/api-overview.png" alt="API Base Configuration" >}}

4. **Set the Gateway Status and Access**

    - You need to set the **Gateway status** to **Active**
    - You need to set the **Access** setting to **Internal** (within your installation only) or **External** (available to external sources)

    {{< img src="/img/oas/status.png" alt="Set API Status" >}}

    Click **Save Changes**.

    Once saved, you will be redirected to the newly created API screen.

    {{< note success >}}
**Note**  

To see the URL given to your API, check the Info section displayed at the top of the page:
    {{< /note >}}

    {{< img src="/img/oas/api-url.png" alt="Set API Status" >}}

5. **Set up the Authentication for your API**

    From the API page:

    1. Click Edit
    2. Scroll down to the **Authentication** section and enable it.
    3. Select **Auth Token** from the drop-down list
    4. Enter a **Authentication Configuration Name**
    5. Select the **Authentication Token Location** to be picked up from the header
    6. Note that the header default value will be **Authorization**
    7. Save your API

6. **Test your API**

    From the Settings tab of your API, copy the API URL and request the API without providing an authorization token:

    ```
    curl --location --request GET 'http://localhost:8181/petstore/' \
    --header 'Authorization: wrongkey'
    ```
    Note that the Gateway will respond with the following error message:

    ```.json
    {
        "error": "Access to this API has been disallowed"
    }
    ```

7. **Add new endpoints to your Tyk OAS API using the Tyk Dashboard**

    1. After creating your Tyk OAS API, select the Endpoints tab.
    2. Click **ADD NEW ENDPOINT**

    {{< img src="/img/dashboard/4.1-updates/add-new-endpoint.png" alt="Add new endpoint for an OAS API" >}}

    3. Add the following details for your new endpoint:

        1. Select a method from the drop-down list
        2. Add a path for your endpoint
        3. Add an optional summary and description
        4. Click **ADD ENDPOINT**

        {{< img src="/img/dashboard/4.1-updates/new-endpoint-info.png" alt="New Endpoint details" >}}

    4. Your new endpoint will now be listed in the Endpoints tab

    {{< img src="/img/dashboard/4.1-updates/endpoint-view.png" alt="OAS API Endpoints" >}}

    5. You can now add middleware to your endpoint. 

### Using Tyk Operator

You can make use of Tyk Operator custom resources to configure [Tyk OAS API]({{<ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition">}}) in a Kubernetes environment.

In this [tutorial]({{<ref "api-management/automations/operator#set-up-oas-api">}}) we guide you through the steps to create a new Tyk OAS API using Tyk Operator.

## Update a Tyk OAS API

As developers working on API development, it can be necessary for us to regularly update our API definition as, for example, we add endpoints or support new methods. This definition is normally generated either from our codebase or created using API design tools (such as [Swagger Editor]({{< ref "https://editor.swagger.io/" >}}), [Postman]({{< ref "https://www.postman.com/" >}}) and [Stoplight]({{< ref "https://stoplight.io/" >}})).

One of the most powerful features of working with Tyk OAS is that you can make changes to your [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition" >}}) or [OpenAPI Document]({{< ref "api-management/gateway-config-tyk-oas#openapi-document" >}}) outside Tyk and then use this updated description to update the Tyk OAS API. You can simply update the configuration on Tyk without having to make any changes to the Tyk Gateway configuration (`x-tyk-api-gateway`).

In this section will walk you through different methods you can use to Update a Tyk OAS API using the Tyk Gateway API, Tyk Dashboard API and Tyk Dashboard GUI.

### Differences between using the Tyk Dashboard API and Tyk Gateway API

The examples in these tutorials have been written assuming that you are using the Tyk Gateway API.

You can also run these steps using the Tyk Dashboard API, noting the differences summarised here:

| Interface             | Port     | Endpoint        | Authorization Header  | Authorization credentials        |
|-----------------------|----------|-----------------|-----------------------|----------------------------------|
| Tyk Gateway API       | 8080     | `tyk/apis/oas`  | `x-tyk-authorization` | `secret` value set in `tyk.conf` |
| Tyk Dashboard API     | 3000     | `api/apis/oas`  | `Authorization`       | From Dashboard User Profile      |

* When using the Tyk Dashboard API, you can find your credentials key from your **User Profile > Edit Profile > Tyk Dashboard API Access Credentials**

{{< note success >}}
**Note**  

You will also need to have ‘admin’ or ‘api’ rights if [RBAC]({{< ref "api-management/user-management" >}}) is enabled.
{{< /note >}}

### Create and update a keyless Tyk OAS API

**Steps for Configuration**

1. **Create an initial API**

    Following the instructions to [create a Tyk OAS API]({{< ref "api-management/gateway-config-managing-oas#create-a-tyk-oas-api" >}}), create a new API by sending [this](https://bit.ly/39tnXgO) Tyk OAS API Definition to the Gateway API endpoint (this is an example that contains the very minimal required fields).

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

2. **Update your API with a new endpoint**

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

**What did you just do?**

You sent an updated Tyk OAS API Definition to the Tyk Gateway's `/apis/oas` endpoint.

For a next step, continue to tutorial 2, where we will protect the new API by enabling authentication.

### Update your API with authentication

You've now got an API deployed on your Tyk Gateway, but it is keyless - anyone can access it without authenticating themselves. Let's now add some security so that you can control who can access your service.

1. **Modify your Tyk OAS API Definition**

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

2. **Update the Tyk OAS API**

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

3. **Test your protected API**

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

### Update Tyk OAS API definition with an updated OpenAPI definition

1. **Create an Initial API**

    Following the instructions to [create a Tyk OAS API]({{< ref "api-management/gateway-config-managing-oas#create-a-tyk-oas-api" >}}), create a new API by sending [this](https://bit.ly/39tnXgO) Tyk OAS API Definition to the Gateway API endpoint (this is an example that contains the very minimal required fields).

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

2. **Update the OpenAPI Document**

    Now let's assume you made a change in your API definition (as mentioned above, from code or a tool, outside Tyk's domain). The change could be adding a new path, changing a description or anything that changes the definition of the API.

    In this example we added a new endpoint, `POST /pet`, with a schema that validates the payload it receives (`requestBody.content.application/json.schema`) and a new security scheme.

    You can see the updated OpenAPI Document in the next step.

3. **Update the Tyk OAS API using the OpenAPI Document**

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

4. **Protect your API based on the OpenAPI definition**

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

5. **Check your OAS API definition**

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

**What did you just do?**

You sent an updated OpenAPI Document to the Tyk Gateway's `/apis/oas` endpoint using the `PATCH` method and automatically configured Tyk to use the security settings in that document by setting the query parameter `authentication=true`.

You have updated a Tyk OAS API, enabling authentication, using only the OpenAPI Document. You didn't have to work with the Tyk OAS API Definition, Tyk handled that for you.

## Versioning a Tyk OAS API

Tyk allows you to create versions of your APIs. When using Tyk OAS APIs versioning works slightly differently from with Tyk Classic APIs, to find out more please take a look at the dedicated [page]({{< ref "api-management/api-versioning#tyk-oas-api-versioning-1" >}}).

If you're ready to dive in, then this tutorial shows you how easy it is to create and manage versions of your Tyk OAS APIs using the open source Tyk Gateway API, Tyk Dashboard API and the Tyk Dashboard GUI.

### Create a versioned API using the Tyk Gateway API or Tyk Dashboard API

This tutorial takes you through the OAS API versioning process using the Tyk Gateway API.

You can perform the same steps using the Tyk Dashboard API.

#### Differences between using the Tyk Dashboard API and Tyk Gateway API

This tutorial has been written assuming that you are using the Tyk Gateway API.

You can also run these steps using the Tyk Dashboard API, noting the differences summarised here:

| Interface             | Port     | Endpoint        | Authorization Header  | Authorization credentials        |
|-----------------------|----------|-----------------|-----------------------|----------------------------------|
| Tyk Gateway API       | 8080     | `tyk/apis/oas`  | `x-tyk-authorization` | `secret` value set in `tyk.conf` |
| Tyk Dashboard API     | 3000     | `api/apis/oas`  | `Authorization`       | From Dashboard User Profile      |

As explained in the section on [Creating an OAS API]({{< ref "api-management/gateway-config-managing-oas#create-a-tyk-oas-api" >}}) remember that when using the Tyk Dashboard API you only need to issue one command to create the API and load it onto the Gateway; when using the Tyk Gateway API you must remember to restart or hot reload the Gateway after creating the API.

* When using the Tyk Dashboard API, you can find your credentials key from your **User Profile > Edit Profile > Tyk Dashboard API Access Credentials**

{{< note success >}}
**Note**

You will also need to have ‘admin’ or ‘api’ rights if [RBAC]({{< ref "api-management/user-management" >}}) is enabled.
{{< /note >}}

1. **Create your base API**

    You need to create a new API that will be the [Base API]({{< ref "api-management/api-versioning#tyk-oas-api-versioning-1" >}}) for the future versions. You do this by sending a Tyk OAS API Definition to the Tyk Gateway API's `apis/oas` endpoint. Note that there is no special command required to create this new API as a Base API - i.e. any Tyk OAS API can be used as a Base API.

    | Property     | Description            |
    |--------------|------------------------|
    | Resource URL | `/tyk/apis/oas`        |
    | Method       | `POST`                 |
    | Type         | None                   |
    | Body         | Tyk OAS API Definition |
    | Parameters   | None                   |

    We will use [this](https://bit.ly/39tnXgO) minimal API definition.

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
            "value": "/base-api/",
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

    ```curl
    curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
    ```

2. **Test your new API**

    Try out your newly created API to confirm that it hits the upstream Petstore service as intended.

    You could issue this command to request the details of the pet with id 123:

    ```curl
    curl --location --request GET 'http://{GATEWAY_URL}/base-api/pet/123'
    ```

    You should see the following response:

    ```.json
    {
        "code": 1,
        "type": "error",
        "message": "Pet not found"
    }
    ```
    The above response shows that, whilst the request successfully reached the upstream URL, there is no pet in the store with id 123. This is the expected result.

3. **Create a new version of your API**

    Now you will create a second API, this time using the [Httpbin](https://httpbin.org/) service as the upstream URL. We are going to register this as a new version of your Base API.

    The following call runs atomically: it creates a new API as a version of the Base API, updating the Base API accordingly.


    | Property     | Description                                                                    |
    |--------------|--------------------------------------------------------------------------------|
    | Resource URL | `/tyk/apis/oas`                                                                |
    | Method       | `POST`                                                                         |
    | Type         | None                                                                           |
    | Body         | Tyk OAS API Definition                                                         |
    | Parameters   | Query (options): <br>- `base_api_id`: The API ID of the Base API to which the new version will be linked.<br>- `base_api_version_name`: The version name of the base API while creating the first version. This doesn't have to be sent for the next versions but if it is set, it will override the base API version name.<br>- `new_version_name`: The version name of the created version.<br>- `set_default`: If true, the new version is set as default version.|

    ```curl
    curl --location --request POST 'http://{your-tyk-host}:{port}/tyk/apis/oas?
    base_api_id={BASE-API-ID}&base_api_version_name=v1&new_version_name=v2&set_default=false' \
    --header 'x-tyk-authorization: {your-secret}' \
    --header 'Content-Type: text/plain' \
    --data-raw '{
    "info": {
        "title": "Httpbin",
        "version": "1.0.0"
    },
    "openapi": "3.0.3",
    "components": {},
    "paths": {},
    "x-tyk-api-gateway": {
        "info": {
        "name": "Httpbin",
        "state": {
            "active": true
        }
        },
        "upstream": {
        "url": "http://httpbin.org"
        },
        "server": {
        "listenPath": {
            "value": "/second-api/",
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

    ```curl
    curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
    ```

4. **Confirm that your new API is a Version API**

    In Step 3 we created a new API and automatically linked it to the Base API. You can verify that this new API is a Version API and not a Base API by inspecting the headers returned when you request the details of your API from Tyk.

    Make a `GET` request to the `/apis/oas/` endpoint passing your new API's API-ID as a path parameter:

    ```curl
    curl -v --location --request GET 'http://{your-tyk-host}:{port}/apis/oas/{API-ID}' --header 'x-tyk-authorization: {your-secret}'
    ```

    You will see that the response includes a new header: `x-tyk-base-api-id`. This will be populated with the unique API-ID for the Base API:

    ```
    Content-Type: application/json
    x-tyk-base-api-id: {BASE-API-ID}
    ```

5. **Test your new API**

    Try out the newly created API by calling it directly and check that it hits the Httpbin service as intended:

    ```curl
    curl --location --request GET 'http://{GATEWAY_URL}/second-api/get'
    ```
    You should get the following response:

    ```.json
    {
        "args": {},
        "headers": {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Host": "httpbin.org",
            "Postman-Token": "ecaa7dff-fe6a-4511-852d-d24b7b4f16e4",
            "User-Agent": "PostmanRuntime/7.29.0",
            "X-Amzn-Trace-Id": "Root=1-62b03888-6f3cf17131ac9e0b12779c3d"
        },
        "origin": "::1, 82.77.245.53",
        "url": "http://httpbin.org/get"
    }
    ```

    This demonstrates that the request successfully reached the Httpbin upstream.

6. **Test your Version API**

    We confirmed in Step 4 that the new version is registered as a version of the original Base API. You can invoke a Version API by making a request to the Base API URL (`listen_path`) configuring the `x-tyk-version` header to select which version to address.

    So, if you issue this request:

    ```curl
    curl --location --request GET 'http://{GATEWAY_URL}/base-api/get' --header 'x-tyk-version: v2'
    ```

    You should receive this response:

    ```.json
    {
        "args": {},
        "headers": {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Host": "httpbin.org",
            "Postman-Token": "74eb591c-ea47-4ca2-9552-66b04460a5d3",
            "User-Agent": "PostmanRuntime/7.29.0",
            "X-Amzn-Trace-Id": "Root=1-62b03f06-670ed0ea44a1a48452d0238e",
            "X-Tyk-Version": "v2"
        },
        "origin": "::1, 82.77.245.53",
        "url": "http://httpbin.org/get"
    }
    ```
    You can see that you got the same response as in step 5: this response has come from the Httpbin service rather than the Petstore service.

**What did you just do?**

In this tutorial you created two separate APIs that were designed to describe two different versions of an API. You delegated the responsibility of routing the requests to one of them (the Base API), and configured the second one to act as a secondary version (Version API).

### Create a versioned API with the Tyk Dashboard GUI

This tutorial takes you through the OAS API versioning process using your Tyk Dashboard.

1. **Create your Base API**

    1. Select “APIs” from the “System Management” section


    {{< img src="/img/oas/api-menu.png" alt="Add new API" >}}


    2. Add a new API:

    - If you have a fresh Tyk installation with no other APIs added, click **Design new API**:

    {{< img src="/img/oas/first-api.png" alt="First API screen" >}}

    - If you already have APIs in your Tyk installation, click **Add new API**:

    {{< img src="/img/oas/add-new-api.png" alt="Add new API" >}}

    3. Configure the API:

    {{< img src="/img/oas/api-overview.png" alt="API Base Configuration" >}}

    - In the **Overview** section, provide a name for your API (**API Name**) and select the OAS HTTP type (**API Type**)
    - In the **Details** section, provide the URL for the upstream service your API should target (**Target URL**); for this tutorial you should use http://petstore.swagger.io/v2/
    - Click **Configure API** when you have finished

    We will use this as your Base API but note that up to now you've not had to do anything different compared to creating any other Tyk OAS API via the Tyk Dashboard GUI.

2. **Create a new Version API**

    1. Within the Tyk Dashboard, go to the `APIs` menu and select your new API. You will create the new Version API from the **Actions** drop-down menu: select **Create a new version**.

    {{< img src="/img/oas/create_new_version_action.png" alt="Create a new OAS API Version" >}}

    2. The **Create new API version** dialog box will be displayed:

    {{< img src="/img/oas/create_new_version_modal.png" alt="OAS Versioning settings dialog" >}}

    3. Give your newly created Base API an **Exsisting Version Name** (v1 in the above example)
    4. Enter a **New Version Name** for the new version you are creating (v2 in the above example)
    5. Decide which of your two versions you want to set as your **Default Version**
    6. Click **Create Version**

{{< note success >}}
**Note**  

After setting up a versioned API, when creating subsequent versions, the dialog box only asks you to add a new version name.
{{< /note >}}

3. **Additional step for Tyk Cloud and other Multi Gateway setups**

    For Tyk Cloud users, and other installations with multiple Gateways configured, the **Connect your Gateways** dialog box will be presented after you have completed Step 2.

    {{< img src="/img/oas/connect-gateways-dialog.png" alt="Connect your Edge Gateways dialog" >}}

    This step is where you can select to which Gateway(s) in your installation you want to deploy the versioned API. You can select one or more of your Gateways, or choose to deploy it later.

    {{< img src="/img/oas/connect-gateways-drop-down.png" alt="Select your Edge Gateways" >}}

    Click **Confirm** to continue.

3. **Save your APIs**

    Don't forget to click **Save** to confirm all the changes you've made to your Base API.

    You now have a versioned API and have set one of the versions to be the default that is used if no version is indicated in a future API request.

    {{< img src="/img/oas/created_new_version.png" alt="Versioned OAS API, set as Default" >}}

    You can inspect the other versions of your API from the drop-down next to the API name:

    {{< img src="/img/oas/version__dropdown.png" alt="Version drop-down" >}}

4. **Manage your Versions**

    After creating a version for your API, you are able to manage the versions.

    1. From any of the versions of your API from the **Actions** drop-down menu

    {{< img src="/img/oas/manage_versions_dropdown.png" alt="Manage versions Action menu" >}}

    2. You will be taken to a **Manage Versions** page.

    {{< img src="/img/oas/manage_versions_page.png" alt="Manage Versions page" >}}

    From this screen you can:

    - Visualise all the versions

    - Create new versions

    - Perform search by version name

    - Set a specific version to be the default

    - Access a quick link to visit the API details page of a specific version

## Export a Tyk OAS API

Tyk Gateway API and Tyk Dashboard API both support exporting the entire [Tyk OAS API Definition]({{< ref "api-management/gateway-config-tyk-oas#tyk-oas-api-definition" >}}) or just the [OpenAPI Document]({{< ref "api-management/gateway-config-tyk-oas#openapi-document" >}}) part so that you can manage or work on them outside Tyk.

#### Differences between using the Tyk Dashboard API and Tyk Gateway API

The examples in these tutorials have been written assuming that you are using the Tyk Gateway API.

You can also run these steps using the Tyk Dashboard API, noting the differences summarised here:

| Interface             | Port     | Endpoint        | Authorization Header  | Authorization credentials        |
|-----------------------|----------|-----------------|-----------------------|----------------------------------|
| Tyk Gateway API       | 8080     | `tyk/apis/oas`  | `x-tyk-authorization` | `secret` value set in `tyk.conf` |
| Tyk Dashboard API     | 3000     | `api/apis/oas`  | `Authorization`       | From Dashboard User Profile      |

* When using the Tyk Dashboard API, you can find your credentials key from your **User Profile > Edit Profile > Tyk Dashboard API Access Credentials**

{{< note success >}}
**Note**  

You will also need to have ‘admin’ or ‘api’ rights if [RBAC]({{< ref "api-management/user-management" >}}) is enabled.
{{< /note >}}

### Export the Tyk OAS API definition

| Property     | Description                     |
|--------------|---------------------------------|
| Resource URL | `/tyk/apis/oas/{API-ID}/export` |
| Method       | `GET`                           |
| Type         | None                            |
| Body         | None                            |
| Parameters   | Path: `API-ID`                  |

The only thing you need to do in order to get the Tyk OAS API Definition for a specific API is to call the Tyk Gateway API's `export` endpoint:

```
curl --location --request GET 'http://{your-tyk-host}:{port}/tyk/apis/oas/{API-ID}/export' \
--header 'x-tyk-authorization: {your-secret}'
```

### Export just the OpenAPI Document

| Property     | Description                              |
|--------------|------------------------------------------|
| Resource URL | `/tyk/apis/oas/{API-ID}/export`          |
| Method       | `GET`                                    |
| Type         | None                                     |
| Body         | None                                     |
| Parameters   | Path: `API-ID` Query: `mode`             |

Tyk eases the integration with other applications, such as your Developer Portal, by allowing you to export just the OpenAPI Document. It does this by stripping out the `x-tyk-api-gateway` configuration from the Tyk OAS API Definition.

To achieve this you simply add the `mode=public` query parameter to your call to the Tyk Gateway API's `export` endpoint:

```
curl --location --request GET 'http://{your-tyk-host}:{port}/tyk/apis/oas/{API-ID}/export?mode=public' \
--header 'x-tyk-authorization: {your-secret}'
```

## Import a Tyk OAS API

Tyk supports importing [OpenAPI Documents]({{< ref "api-management/gateway-config-tyk-oas#openapi-document" >}}) (in JSON format, OAS version 3.0.x) using the Tyk Gateway API, the Tyk Dashboard API or the [Tyk Dashboard GUI]({{< ref "#using-the-tyk-dashboard-ui" >}}).

In the following tutorials, we provide the flows and commands you can use to get Tyk to generate the respective Tyk OAS API definitions from your OpenAPI Documents.

### Differences between using the Tyk Dashboard API and Tyk Gateway API

Examples in the following tutorials have been written assuming that you are using the Tyk Gateway API.

You can also run these steps using the Tyk Dashboard API, noting the differences summarised here:

| Interface             | Port     | Endpoint        | Authorization Header  | Authorization credentials        |
|-----------------------|----------|-----------------|-----------------------|----------------------------------|
| Tyk Gateway API       | 8080     | `tyk/apis/oas`  | `x-tyk-authorization` | `secret` value set in `tyk.conf` |
| Tyk Dashboard API     | 3000     | `api/apis/oas`  | `Authorization`       | From Dashboard User Profile      |

As explained in the section on [Creating an OAS API]({{< ref "api-management/gateway-config-managing-oas#create-a-tyk-oas-api" >}}) remember that when using the Tyk Dashboard API you only need to issue one command to create the API and load it onto the Gateway; when using the Tyk Gateway API you must remember to restart or hot reload the Gateway after creating the API.

* When using the Tyk Dashboard API, you can find your credentials key from your **User Profile > Edit Profile > Tyk Dashboard API Access Credentials**

{{< note success >}}
**Note**

You will also need to have ‘admin’ or ‘api’ rights if [RBAC]({{< ref "api-management/user-management" >}}) is enabled.
{{< /note >}}

### Create a Tyk OAS API by importing an OpenAPI Document

| Property     | Description              |
|--------------|--------------------------|
| Resource URL | `/tyk/apis/oas/import`   |
| Method       | `POST`                   |
| Type         | None                     |
| Body         | OpenAPI Document         |
| Parameters   | None                     |

**Steps for Configuration**

1. **Import an OpenAPI Document**

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

2. **Check request response**

    If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

    ```.json
    {
        "key": {NEW-API-ID},
        "status": "ok",
        "action": "added"
    }
    ```

    What you have done is to send an OpenAPI Document to Tyk Gateway's `/apis/oas/import` endpoint resulting in the creation of the API in your Tyk Gateway. Tyk has created a Tyk OAS API definition object using the OpenAPI Document that you provided. This encapsulates all of the settings for a Tyk OAS API within your Tyk Gateway.

3. Restart or hot reload your Gateway

    Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

    ```.curl
    curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
    ```

4. Check your Tyk OAS API definition

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

**What did you just do?**

You created a fully functional Tyk OAS API Definition by importing an OpenAPI Document. Tyk worked out and added all the information it needed so you didn’t have to! Let’s see next how you can enable extra capabilities of the Gateway when importing an OpenAPI Document.

### Create a Tyk OAS API with a custom upstream URL and listen path

| Property     | Description                              |
|--------------|------------------------------------------|
| Resource URL | `/tyk/apis/oas/import`                   |
| Method       | `POST`                                   |
| Type         | None                                     |
| Body         | OpenAPI Document                         |
| Parameters   | Query: `upstreamURL`  `listenPath`       |

1. **Import an OpenAPI Document with custom `upstreamURL` and `listenPath`**

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

2. **Check request response**

    If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

    ```.json
    {
        "key": {NEW-API-ID},
        "status": "ok",
        "action": "added"
    }
    ```

3. **Restart or hot reload your Gateway**

    Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

    ```.curl
    curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
    ```

4. **Check your Tyk OAS API definition**

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

**What did you just do?**

You created a fully functional Tyk OAS API Definition by providing an OpenAPI Document and passing custom upstream URL and listen path.

### Create a secured API when importing an OpenAPI Document

| Property     | Description                    |
|--------------|--------------------------------|
| Resource URL | `/tyk/apis/oas/import`         |
| Method       | `POST`                         |
| Type         | None                           |
| Body         | OpenAPI Document               |
| Parameters   | Query: `authentication`        |

**Steps for Configuration**

1. **Import an OpenAPI Document with `authentication=true`**

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

2. **Check request response**

    If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

    ```.json
    {
        "key": {NEW-API-ID},
        "status": "ok",
        "action": "added"
    }
    ```

3. **Restart or hot reload your Gateway**

    Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

    ```.curl
    curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
    ```

4. **Check your Tyk OAS API definition**

    Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) and check the newly created Tyk OAS API Definition.

    You’ll see that Tyk has populated the `authentication` section within the `x-tyk-api-gateway` section according to the instructions you provided in the `import` request. The `api_key` security scheme has been enabled (which indicates that the [Authentication Token]({{< ref "api-management/gateway-config-tyk-oas#authentication-token" >}}) mechanism has been applied).

    For more information on how Tyk extracts data about security defined from the OpenAPI Document and what authentication mechanisms can be configured, see [Authentication with OAS]({{< ref "api-management/gateway-config-tyk-oas#authentication-with-tyk-oas" >}}).

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

**What did you just do?**

You created a fully protected Tyk OAS API by importing an OpenAPI Documnent that has security information included within it.

### Create an API and explicitly allow access to paths

| Property     | Description               |
|--------------|---------------------------|
| Resource URL | `/tyk/apis/oas/import`    |
| Method       | `POST`                    |
| Type         | None                      |
| Body         | Tyk OAS API Definition    |
| Parameters   | Query: `allowList`        |
  

1. **Import an OpenAPI Document with `allowList=true`**

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

2. **Check request response**

    If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

    ```.json
    {
        "key": {NEW-API-ID},
        "status": "ok",
        "action": "added"
    }
    ```

3. **Restart or hot reload your Gateway**

    Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

    ```.curl
    curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
    ```

4. **Check your Tyk OAS API definition**

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

**What did you just do?**

You created a Tyk OAS API that which tells your Tyk Gateway to allow access just on the paths that are defined in the OpenAPI Document.

### Create an API that validates the request payload

| Property     | Description                      |
|--------------|----------------------------------|
| Resource URL | `/tyk/apis/oas/import`           |
| Method       | `POST`                           |
| Type         | None                             |
| Body         | OpenAPI Document                 |
| Parameters   | Query: `validateRequest`         |
  

1. **Import an OpenAPI Document and enable middleware that will validate the request payload**

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

2. **Check request response**

    If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

    ```.json
    {
        "key": {NEW-API-ID},
        "status": "ok",
        "action": "added"
    }
    ```

3. **Restart or hot reload your Gateway**

    Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

    ```.curl
    curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
    ```

4. **Check your OAS API definition**

    Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) and check the newly created Tyk OAS API Definition.

    You’ll see that Tyk has populated the `middleware` section within the `x-tyk-api-gateway` section, configuring the `operations` section to enable the `mockResponse` middleware for each endpoint in the `operationId` list in the OpenAPI Document that you provided. The option `fromOASExamples` has been enabled, which means that Tyk will use the schema defined in the `examples` section of the OpenAPI Document to construct the mock response.

    For more information on how Tyk builds the `middleware.operations` structure to configure middleware, see [Paths]({{< ref "api-management/gateway-config-tyk-oas#paths" >}}).

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

**What did you just do?**

You created an API which tells your Tyk Gateway to validate any incoming request against the JSON schema defined in the Tyk OAS API Definition.

### Create an API with a Mock Response

| Property     | Description                  |
|--------------|------------------------------|
| Resource URL | `/tyk/apis/oas/import`       |
| Method       | `POST`                       |
| Type         | None                         |
| Body         | Tyk OAS API Definition       |
| Parameters   | Query: `mockResponse`        |

**Steps for Configuration**


1. **Import an OpenAPI Document and enable middleware that will provide a mock response**

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

2. **Check request response**

    If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

    ```.json
    {
        "key": {NEW-API-ID},
        "status": "ok",
        "action": "added"
    }
    ```

3. **Restart or hot reload your Gateway**

    Once you have created your API, you will need to either restart the Tyk Gateway, or issue a hot reload command:

    ```.curl
    curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
    ```

4. **Check your OAS API definition**

    Go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) and check the newly created Tyk OAS API Definition.

    You’ll see that Tyk has populated the `middleware` section within the `x-tyk-api-gateway` section, configuring the `operations` section to enable the `mockResponse` middleware for each endpoint in the `operationId` list in the OpenAPI Document that you provided. The option `fromOASExamples` has been enabled, which means that Tyk will use the schema defined in the `examples` section of the OpenAPI Document to construct the mock response.

    For more information on how Tyk builds the `middleware.operations` structure to configure middleware, see [Paths]({{< ref "api-management/gateway-config-tyk-oas#paths" >}}).

    For more information on mock responses, see the dedicated [page]({{< ref "api-management/traffic-transformation#mock-response-overview" >}}).

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

**What did you just do?**

You created an API which tells your Tyk Gateway to provide a mock response based on configured responses in the original OpenAPI Document.

### Using the Tyk Dashboard UI

In this tutorial we will show you how to use the Tyk Dashboard to create a new Tyk OAS API from an OpenAPI Document.

{{< youtube wFBtMV3ZlOc >}}

**Steps for Configuration**

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

    The process for importing from an existing Tyk API definition or SOAP WSDL definition is explained [here]({{< ref "api-management/gateway-config-managing-classic#import-apis-via-the-dashboard-api" >}}). The import function will now accept an existing Tyk OAS API definition, the process is the same as for a Tyk Classic API definition.

##### Importing an OpenAPI Document

Tyk supports import of version 2.0 and 3.0.x OpenAPI Documents to create a Tyk OAS API Definition.

When importing OpenAPI Documents using the Dashboard, Tyk detects the version of OpenAPI Specification used in the document and generates either a Tyk Classic API Definition (for OAS v2.0) or a Tyk OAS API Definition (for OAS v3.0.x). There is also an option to create a Tyk Classic API Definition from an OpenAPI 3.0.x document if you wish.

##### Import from an OpenAPI v3.0 Document

1. From the Import API screen, select OpenAPI.

    {{< img src="/img/oas/open-api-format.png" alt="Import OAS 3.0 API" >}}

2. Paste your OAS v3.0 compliant definition into the code editor.

    {{< img src="/img/oas/oas-3-code.png" alt="OAS 3.0 definition in Editor" >}}

3. Note that the Dashboard has detected that an OAS v3.0 definition has been imported and you can now select between various manual and automatic configuration options.

    {{< img src="/img/oas/oas-3-import-options.png" alt="OAS 3.0 configuration options" >}}

    **Manual Configuration options**

    - **Custom Listen Path**: A default listen path of of `/` is set if you don't configure this option
    - **Custom Upstream URL**: The first URL listed in your `servers` section is used if you don't configure this option

    **Automatic Configuration options**

    - **Generate Validate Request Middleware**: You can automatically validate paths that have the `requestBody` and `schema` fields configured. This allows your Tyk Gateway to validate your request payload against the schema provided in your definition. See [Request Validation]({{< ref "api-management/traffic-transformation#request-validation-overview" >}}) for more details.
    - **Apply Detected Authentication**: You can automatically apply the authentication specified in the `security` and `securitySchemes` sections of your definition. See [Authentication]({{< ref "api-management/gateway-config-tyk-oas#authentication-with-tyk-oas" >}}) for more details.
    - **Allow access only to defined paths**: You can restrict access to the paths documented in your definition. See [Paths]({{< ref "api-management/gateway-config-tyk-oas#paths" >}}) for more details.

4. Click **Import API**.

    {{< img src="/img/oas/import-api-button.png" alt="Import API" >}}

    Your API will be added to your list of APIs.

##### Import from an OpenAPI v2.0 Document

1. From the Import API screen, select OpenAPI.

    {{< img src="/img/oas/open-api-format.png" alt="Import OAS 2.0 API" >}}

2. Paste your OAS v2.0 compliant definition into the code editor.

    {{< img src="/img/oas/oas-2-code.png" alt="OAS 2.0 definition in Editor" >}}

3. Note that the Dashboard has detected that an OAS v2.0 definition has been imported and you need to specify an upstream URL field to proceed.

    {{< img src="/img/oas/upstream-url.png" alt="Upstream URL" >}}

4. Click **Import API**. 

    {{< img src="/img/oas/import-api-button.png" alt="Import API" >}}

    Your API will be added to your list of APIs.
