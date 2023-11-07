---
title: "Get started with Tyk OAS and VS Code"
date: 2022-08-01
tags: ["Tyk Tutorials", "Getting Started", "First API", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source"]
description: "Creating an OAS API using Tyk and Visual Studio Code"
menu:
  main:
    parent: "Using OAS API Definitions"
weight: 1
---

### Introduction
It is easy to get going with Tyk in your favourite editors. We will take you through the steps to get going with Visual Studio Code. This will include installing a plugin, importing an API and sending a request to that API. It should take about ten minutes, if that.

### Prerequisites

* A [Tyk Open Source Gateway]({{< ref "/content/tyk-oss-gateway.md" >}}) installation.
* [Visual Studio](https://code.visualstudio.com/download) Code installed.

### Tyk Dashboard API or Tyk Gateway API?

The examples in this tutorial have been written assuming that you are using the Tyk Gateway API.

You can also run these steps using the Tyk Dashboard API, noting the differences summarised here:

| Interface             | Port     | Endpoint        | Authorization Header  | Authorization credentials        |
|-----------------------|----------|-----------------|-----------------------|----------------------------------|
| Tyk Gateway API       | 8080     | `tyk/apis/oas`  | `x-tyk-authorization` | `secret` value set in `tyk.conf` |
| Tyk Dashboard API     | 3000     | `api/apis/oas`  | `Authorization`       | From Dashboard User Profile      |

* When using the Tyk Dashboard API, you can find your credentials key from your **User Profile > Edit Profile > Tyk Dashboard API Access Credentials**:

{{< img src="/img/oas/edit-profile.png" alt="User Edit Profile menu" >}}

{{< note success >}}
**Note**  

You will also need to have ‘admin’ or ‘api’ rights if [RBAC]({{< ref "/tyk-dashboard/rbac.md" >}}) is enabled.
{{< /note >}}


### Install the REST client VS Code extension

1. From your Visual Studio Code menu, select **Extensions** from the left hand menu.
2. Search for the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) and install it. It is worth restarting Visual Studio Code after you install the plugin to make sure everything is set up correctly.

{{< img src="/img/oas/rest-client-vscode.png" alt="REST Client VS Code" >}}

The REST client allows you to write clear REST calls easily

{{< img src="/img/oas/rest-client-demo.png" alt="REST Client demo call" >}}

### Create an OpenAPI Document to import to Tyk

1. In Visual Studio Code, create a directory
2. Create a blank file called `simple_api.json` to store your OpenAPI Document
3. Copy the code below to the file you just created:

```.json
{
  "components": {
  },
  "info": {
    "title": "simple_api",
    "version": "1.0"
  },
  "openapi": "3.0.3",
  "paths": {},

  "servers": [
    {
      "url": "http://httpbin.org/"
    }
  ]
}
```
This is a very simple OAS compliant description of an API. You will notice that there is nothing Tyk specific in it. You will use the ‘import’ API to ask Tyk to add the Tyk bits for you.

### Create a script in VS Code to import and test your API

1. Create a file called `my_first_api.rest` in the same directory as your OpenAPI Document (`simple_api.json`).
2. Copy the following into the new file:

```
### Globals
@secret = YOUR_SECRET_HERE

### Using an existing OpenAPI Document with Tyk (import)
POST http://tyk-gateway.localhost:8080/tyk/apis/oas/import
?listenPath=/simple_api/
x-tyk-authorization:{{secret}}
Content-Type: application/json

< ./simple_api.json

### Reload GW to load the API
GET http://tyk-gateway.localhost:8080/tyk/reload/
x-tyk-authorization:{{secret}}

### Test ###
POST http://tyk-gateway.localhost:8080/simple_api/post

"Now that was easy, wasn't it?"

### /Test ###
```

#### Explanation

| Code                         | Description                                    |
|------------------------------|------------------------------------------------|
| `@secret = YOUR_SECRET_HERE` | This is your Tyk Secret, setup as a variable.  |
| `POST http://tyk-gateway.localhost:8080/tyk/apis/oas/import ?listenPath=/simple_api/ x-tyk-authorization:{{secret}} Content-Type: application/json  < ./simple_api.json` | This section asks Tyk to create a Tyk OAS API based on the `simple_api.json` file and have it sit on the listen path `/simple_api/`.  |
| `GET http://tyk-gateway.localhost:8080/tyk/reload/ x-tyk-authorization:{{secret}}` | These 2 lines ask Tyk to reload your Gateway to detect the new API. This is only needed on the open source version of Tyk (when accessing the Tyk Gateway API). If you use the Tyk Dashboard API, you can skip this step. |
| `POST http://tyk-gateway.localhost:8080/simple_api/post  "Now that was easy, wasn't it?"` | These 2 lines run a call to your new API and check that it works. |
 
### Import your API

Using the REST client, click `Send Request` above line 5 to create your API request.

{{< img src="/img/oas/send-request.png" alt="Send Request 1" >}}

You should see the following response that your API was added.

{{< img src="/img/oas/response.png" alt="Response 1" >}}

### Reload your Tyk Gateway

Click `Send Request` above line 13 to reload your Tyk Gateway.

{{< img src="/img/oas/send-request2.png" alt="Reload the Tyk Gateway" >}}

You will get the following response.

{{< img src="/img/oas/response2.png" alt="Gateway reload" >}}

### Test your API

Click `Send Request` above line 17.

{{< img src="/img/oas/test-api-request.png" alt="Test API request" >}}

You will get the following response from the httpbin test service, returning the message “Now that was easy, wasn’t it?”.

{{< img src="/img/oas/test-api-response.png" alt="Test API response" >}}

For more details, see the [OAS high level concepts page]({{< ref "/content/getting-started/key-concepts/high-level-concepts.md" >}})

### What next?

The next thing you might want to do is add the Tyk configuration fields to an existing OpenAPI Document or create a [Tyk OAS API definition]({{< ref "/content/getting-started/using-oas-definitions/create-an-oas-api.md" >}}) from scratch.

When it comes to writing your own Tyk APIs in Visual Studio Code, the [Tyk extension](https://marketplace.visualstudio.com/items?itemName=TykTechnologiesLimited.tyk-schemas) is a real help. 