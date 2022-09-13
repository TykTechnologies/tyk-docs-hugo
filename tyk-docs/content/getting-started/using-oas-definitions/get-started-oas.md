---
title: "Get started with OAS and VS Code"
date: 2022-08-01
tags: ["Tyk Tutorials", "Getting Started", "First API", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source"]
description: "Creating an OAS API using Tyk and Visual Studio Code"
menu:
  main:
    parent: "Using OAS API Definitions"
weight: 1
---

{{< toc >}}

### Introduction
It is easy to get going with Tyk in your favourite editors. We will take you through the steps to get going with Visual Studio Code. This will include installing a plugin, importing an API and sending a request to that API. It should take about ten minutes, if that.

### Prerequisites

* A [Tyk Open Source Gateway]({{< ref "/content/tyk-stack/tyk-gateway/tyk-gateway-oss.md" >}}) installation.
* [Visual Studio](https://code.visualstudio.com/download) Code installed.

### Dashboard and Gateway API differences

The steps for using the Dashboard and Gateway APIs are very similar. The examples below have been written for the Gateway API. 

The only differences, when using the Dashboard API are:

* Use` api/apis/oas` and port `3000` instead of `tyk/apis/oas` and port `8080` when calling the Tyk Dashboard API Endpoints.

```
//Gateway Endpoint
/tyk/apis/oas

//Dashboard API Endpoint
/api/apis/oas
```
* Replace the `x-tyk-authorization` header with `authorization` and use the credentials key from your **User Profile > Edit Profile > Tyk Dashboard API Access Credentials**:

{{< img src="/img/oas/edit-profile.png" alt="User Edit Profile menu" >}}

{{< note success >}}
**Note**  

You will also need to ensure you have ‘admin’ or ‘api’ rights if RBAC is enabled.
{{< /note >}}

### Tyk Gateway API secret

Make sure you know your API secret: Your Tyk Gateway API secret is stored in your `tyk.conf` file, the property is called `secret`. You will need to use this as a header called `x-tyk-authorization` to make calls to the Gateway API.

```
{
    "hostname": "",
    "listen_address": "",
    "listen_port": 8080,
    "control_api_hostname": "",
    "control_api_port": 0,
    "secret": "YOUR_SECRET_HERE",
    "node_secret": "",
    "pid_file_location": "",
    "allow_insecure_configs": false,
    .
    .
    .
  }
  ```

### Install the REST client VS Code extension

1. From your Visual Studio Code menu, select **Extensions** from the left hand menu.
2. Search for the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) and install it. It is worth restarting Visual Studio Code after you install the plugin to make sure everything is set up correctly.

{{< img src="/img/oas/rest-client-vscode.png" alt="REST CLient VS Code" >}}

The REST client allows you to write clear REST calls easily

{{< img src="/img/oas/rest-client-demo.png" alt="REST CLient demo call" >}}

### Create an API definition file to import

1. In Visual Studio Code, create a directory
2. Create an OAS definition file called `simple_api.json`.
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
This is a simple OAS definition. You will notice that there is nothing Tyk specific in it. You will use the ‘import’ API to ask Tyk to add the Tyk bits for you.

### Create an Import API call

1. Create a file called `my_first_api.rest` in the same directory as your OAS definition file.
2. Copy the following into the file:

```
### Globals
@secret = YOUR_SECRET_HERE

### Using an existing OAS spec with Tyk (import)
POST http://tyk-gateway.localhost:8080/tyk/apis/oas/import
?listenPath=/simple_api/
x-tyk-authorization:{{secret}}
Content-Type: application/json

< ./simple_api.json

### Reload GW to load API
GET http://tyk-gateway.localhost:8080/tyk/reload/
x-tyk-authorization:{{secret}}

### Test ###
POST http://tyk-gateway.localhost:8080/simple_api/post

"Now that was easy, wasn't it?"

### /Test ###
```

#### Description

| Code                                                                                                                                                                   | Description                                                                                                                                                                                |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@secret = YOUR_SECRET_HERE`                                                                                                                                            | This is your Tyk Secret, setup as a variable.                                                                                                                                              |
| `POST http://tyk-gateway.localhost:8080/tyk/apis/oas/import ?listenPath=/simple_api/ x-tyk-authorization:{{secret}} Content-Type: application/json  < ./simple_api.json` | This section asks Tyk to create an API based on the `simple_api.json` OAS file and have it sit on the listen path `/simple_api/`.                                                          |
| `GET http://tyk-gateway.localhost:8080/tyk/reload/ x-tyk-authorization:{{secret}}`                                                                                      | These 2 lines asks Tyk to reload your Gateway to detect the new API. This is only needed on the open source version of Tyk. If you use the Dashboard APIs instead, you can skip this step. |
| `POST http://tyk-gateway.localhost:8080/simple_api/post  "Now that was easy, wasn't it?"`                                                                                | These 2 lines runs a call to your new API and checks that it works.                                                                                                                        |
 
### Now make an import API Request

Using the REST client, click `Send Request` above line 5 to create your API request.

{{< img src="/img/oas/send-request.png" alt="Send Request 1" >}}

You should see the following response that your API was added.

{{< img src="/img/oas/response.png" alt="Response 1" >}}

### Reload your Tyk Gateway

Click `Send Request` above line 13 to reload your Tyk Gateway.

{{< img src="/img/oas/send-request2.png" alt="Reload the Tyk Gateway" >}}

You will get the following response.

{{< img src="/img/oas/response2.png" alt="Gateway reload" >}}

### Now test your imported API

Click `Send Request` above line 17.

{{< img src="/img/oas/test-api-request.png" alt="Test API request" >}}

You will get the following response, returning the “Now that was easy, wasn’t it?” on line 25 from the httpbin test service with a POST request.

{{< img src="/img/oas/test-api-response.png" alt="Test API response" >}}

For more details, see the [OAS high level concepts page]({{< ref "/content/getting-started/key-concepts/high-level-concepts.md" >}})

### Now what?

The next thing you might want to do is add the Tyk configuration fields to an existing OAS API definition or create a [Tyk OAS API definition]({{< ref "/content/getting-started/using-oas-definitions/create-an-oas-api.md" >}}) from scratch.

When it comes to writing your own Tyk APIs in Visual Studio Code, the [Tyk extension](https://marketplace.visualstudio.com/items?itemName=TykTechnologiesLimited.tyk-schemas) is a real help. 