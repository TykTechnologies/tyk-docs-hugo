---
title: "Create a Tyk OAS API"
date: 2022-07-08
tags: ["Tyk Tutorials", "Getting Started", "First API", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source"]
description: "Creating a Tyk OAS API"
menu:
  main:
    parent: "Using OAS API Definitions"
weight: 2
---

These tutorials will take you through the process of creating a Tyk OAS API from scratch.

### Tutorial 1: Create a Tyk OAS API using the Tyk Gateway API

In this tutorial we show you how to create a minimal Tyk OAS API using the Tyk Gateway API, starting with a [Tyk OAS API Definition]({{< ref "/getting-started/using-oas-definitions/oas-glossary#tyk-oas-api-definition" >}}).

<details>
  <summary>
    Click to expand tutorial
  </summary>

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

#### Check request response

If the command succeeds, you will see the following response, where `key` contains the unique identifier (`id`) for the API you have just created:

```.json
{
    "key": {NEW-API-ID},
    "status": "ok",
    "action": "added"
}
```

What you have done is to send a Tyk OAS API definition to Tyk Gateway's `/apis/oas` endpoint resulting in the creation of the API in your Tyk Gateway. The Tyk OAS API definition object encapsulates all of the settings for a Tyk OAS API within your Tyk Gateway.

#### Restart or hot reload

Once you have created your API you will want it to be loaded into the Gateway so that it can serve traffic. To do this you simply restart the Tyk Gateway or issue a hot reload command:

```.curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group
```

You can go to the `/apps` folder of your Tyk Gateway installation (by default in `/var/tyk-gateway`) to see where Tyk has stored your Tyk OAS API Definition.
</details>

### Tutorial 2: Create a Tyk OAS API using the Tyk Dashboard API

You can also create APIs using the Tyk Dashboard API, starting with a [Tyk OAS API Definition]({{< ref "/getting-started/using-oas-definitions/oas-glossary#tyk-oas-api-definition" >}}).

In this tutorial we will also show you how to test and protect your new API by enforcing an authentication requirement when making calls to the API.

<details>
  <summary>
    Click to expand tutorial
  </summary>
  
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

#### Check which APIs are already loaded

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

#### Create your first Tyk OAS API

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

#### Test your new API

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

</details>

### Tutorial 3: Create a Tyk OAS API using the Tyk Dashboard GUI

Tyk Dashboard has a new and improved API Designer that you'll use when working with Tyk OAS APIs. In this tutorial we guide you through the steps to create a new Tyk OAS API using the GUI.

{{< youtube -LyJ14wuOrI >}}

<details>
  <summary>
    Click to expand tutorial
  </summary>
  
#### Select “APIs” from the “System Management” section

{{< img src="/img/oas/api-menu.png" alt="Add new API" >}}

#### Add new API

If you have a fresh Tyk installation with no other APIs added, click **Design new API**:

{{< img src="/img/oas/first-api.png" alt="First API screen" >}}

If you already have APIs in your Tyk installation, click **Add new API**:

{{< img src="/img/oas/add-new-api.png" alt="Add new API" >}}

#### Set up the Base Configuration for your API

1. From the **Overview** section, add your **API Name** and your **API Type** (for this tutorial, select **OAS HTTP**).
2. From the **Details** section, add your **Target URL**. This will set the upstream target that hosts the service you want to proxy to. For this tutorial you can use https://petstore3.swagger.io.
3. Click **Configure API** when you have finished.

{{< img src="/img/oas/api-overview.png" alt="API Base Configuration" >}}

#### Set the Gateway Status and Access

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

#### Set up the Authentication for your API

From the API page:

1. Click Edit
2. Scroll down to the **Authentication** section and enable it.
3. Select **Auth Token** from the drop-down list
4. Enter a **Authentication Configuration Name**
5. Select the **Authentication Token Location** to be picked up from the header
6. Note that the header default value will be **Authorization**
7. Save your API

#### Test your API

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

#### Add new endpoints to your Tyk OAS API using the Tyk Dashboard

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

</details>

### Tutorial 4: Create a Tyk OAS API using Tyk Operator

You can make use of Tyk Operator custom resources to configure [Tyk OAS API]({{<ref "getting-started/using-oas-definitions/oas-glossary#tyk-oas-api-definition">}}) in a Kubernetes environment.

In this [tutorial]({{<ref "/api-management/automations#set-up-oas-api">}}) we guide you through the steps to create a new Tyk OAS API using Tyk Operator.