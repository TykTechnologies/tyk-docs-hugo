---
date: 2017-03-09T11:10:21Z
Title: Create an API
tags: ["Tyk Tutorials", "Getting Started", "First API", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source"]
description: "Creating a first API using Tyk"
menu:
  main:
    parent: "Getting Started"
weight: 3
aliases:
  - /get-started/with-tyk-on-premise/tutorials/tyk-on-premise-pro/create-api/
  - /tyk-api-gateway-v1-9/tutorials/set-up-your-first-api/
  - /get-started/with-tyk-multi-cloud/tutorials/create-api/
  - /try-out-tyk/tutorials/create-api/
  - /getting-started/tutorials/create-api/
---

## What does it mean to create an API in Tyk
You have a running service with an API that you want your users to consume; you want to protect and manage access to that API using Tyk Gateway - how do you do that?
For Tyk Gateway to protect and [reverse proxy](https://en.wikipedia.org/wiki/Reverse_proxy) calls to your upstream service, you need to configure an API on Tyk Gateway. The minimum information that Tyk requires is the **listen path** (which is a path on the Tyk Gateway URL that you want your consumers to call) and your **API URL** (which is the URL of your service to which Tyk should forward requests).
This information and other configuration values are stored in an object called a *Tyk API definition*. Once you have created your Tyk API definition and deployed it in the Tyk Gateway, the Gateway can start serving your consumers, forwarding their requests to your upstream service's API.

Please choose the tab with the product you are using for a detailed guide to create Tyk API definition:

{{< tabs_start >}}

{{< tab_start "Cloud" >}}
<br>
<br>
Tyk Cloud is the SaaS version of the Self-Managed product, though there are a few differences. Please use the Tyk Cloud [Getting Started guide]({{< ref "tyk-cloud/getting-started-tyk-cloud/first-api" >}}) to create your first API.

Want to learn more from one of our team?

{{< button_left href="https://tyk.io/book-a-demo/" color="green" content="Book a demo" >}}

{{< tab_end >}}

{{< tab_start "Self-Managed" >}}
<br>
<br>
{{< include "create-api-include" >}}

If the command succeeds, you will see:
```json
{
  "action": "added",
  "key": "xxxxxxxxx",
  "status": "ok"
}
```

**What did we just do?**

We just sent an API definition to the Tyk `/apis` endpoint. See [API definition objects]({{< ref "tyk-gateway-api/api-definition-objects" >}}) for details of all the available objects. These objects encapsulate all of the settings for an API within Tyk.

Want to learn more from one of our team of engineers?

{{< button_left href="https://tyk.io/book-a-demo" color="green" content="Book a demo" >}}

{{< tab_end >}}

{{< tab_start "Open Source" >}}
<br>
<br>
{{< note success >}}
**Note**

**Integration with your Open API documentation**

In Tyk v4.1 we introduced an integration with [Open API Specification](https://swagger.io/specification/) (OAS) which is used as a new format for *Tyk API definition*. We call it object *Tyk OAS API Definitions*. You can import your own OpenAPI document and Tyk will know to interpret it. For a detailed tutorial, on how to use it check the guide to [creating a Tyk OAS API Definitions]({{< ref "getting-started/using-oas-definitions/create-an-oas-api#tutorial-create-an-oas-api-with-the-tyk-gateway-api" >}}).

{{< /note >}}

## Prerequisites
Before you continue this tutorial, you need a running [Tyk OSS gateway]({{< ref "tyk-oss-gateway" >}}). Click the button for installing Tyk Gateway in your preferred way:

{{< button_left href="https://tyk.io/sign-up/#oss" color="green" content="Install tyk gateway" >}}

## API definition Creation Methods
There are two ways to configure Tyk Gateway with an API definition:
1. [Create an API with the Tyk Gateway API]({{< ref "#tutorial-create-an-api-with-the-tyk-gateway-api" >}}) - Tyk Gateway offers APIs to provide various services among which are creating API definitions.
2. [Create an API in File-based Mode]({{< ref "#tutorial-create-an-api-in-file-based-mode" >}}) - By creating an API definiton file and load it to the gateway. This is demonstrated in the section.


## Tutorial: Create an API with the Tyk Gateway API
See our video for adding an API to the Open Source Gateway via the Gateway API and Postman:

{{< youtube UWM2ZQoGhQA >}}

In order to use the Gateway API you will need an API key for your Gateway APIs and one command to create the API and make it live.

### Step 1: Make sure you know your API secret
Your Tyk Gateway API secret is stored in your `tyk.conf` file, the property is called `secret`, you will need to use this as a header called `x-tyk-authorization` to make calls to the Gateway API.

### Step 2: Create an API
To create the API, lets send a definition to the `apis` endpoint, which will return the status and version of your Gateway. Change the `x-tyk-authorization` value and `curl` domain name and port to be the correct values for your environment.
```curl
curl -v -H "x-tyk-authorization: {your-secret}" \
  -s \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{
    "name": "Hello-World",
    "slug": "hello-world",
    "api_id": "Hello-World",
    "org_id": "1",
    "use_keyless": true,
    "auth": {
      "auth_header_name": "Authorization"
    },
    "definition": {
      "location": "header",
      "key": "x-api-version"
    },
    "version_data": {
      "not_versioned": true,
      "versions": {
        "Default": {
          "name": "Default",
          "use_extended_paths": true
        }
      }
    },
    "proxy": {
      "listen_path": "/hello-world/",
      "target_url": "http://echo.tyk-demo.com:8080/",
      "strip_listen_path": true
    },
    "active": true
}' http://{your-tyk-host}:{port}/tyk/apis | python -mjson.tool
```

If the command succeeds, you will see:
```json
{
  "key": "Hello-World",
  "status": "ok",
  "action": "added"
}
```

{{< note success >}}
**Note**

A generated API ID will be added to Tyk API definition if it's not provided while creating an API with Tyk Gateway API.
{{< /note >}}

**What did we just do?**

We just sent an API definition to the Tyk `/apis` endpoint. API definitions are discussed in detail in the API section of this documentation. These objects encapsulate all of the settings for an API within Tyk Gateway.

## Restart or hot reload

Once you have created the file, you will need to either restart the Tyk Gateway, or issue a hot reload command, lets do the latter:
```curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group | python -mjson.tool
```

This command will hot-reload your API Gateway(s) and the new API will be loaded, if you take a look at the output of the Gateway (or the logs), you will see that it should have loaded Hello-World API on `/hello-world/`.

## Tutorial: Create an API in File-based Mode

{{< note success >}}
**Note**

APIs created without API ID in file based mode are invalid.
{{< /note >}}


To create a file-based API definition is very easy.

Create a file called `api1.json` and place it in the `/apps` folder of your Tyk Gateway installation (usually in `/var/tyk-gateway`), then add the following:
```json
{
  "name": "Test API",
  "slug": "test-api",
  "api_id": "1",
  "org_id": "1",
  "auth_configs": {
    "authToken": {
      "auth_header_name": "Authorization"
    }
  },
  "definition": {
    "location": "header",
    "key": "x-api-version"
  },
  "version_data": {
    "not_versioned": true,
    "versions": {
      "Default": {
        "name": "Default",
        "use_extended_paths": true
    }
   }
  },
  "proxy": {
    "listen_path": "/test-api/",
    "target_url": "http://echo.tyk-demo.com:8080/",
    "strip_listen_path": true
  },
  "active": true
}
```

## Restart or hot reload

Once you have created the file, you will need to either restart the Tyk Gateway, or issue a hot reload command, lets do the latter:
```curl
curl -H "x-tyk-authorization: {your-secret}" -s https://{your-tyk-host}:{port}/tyk/reload/group | python -mjson.tool
```

This command will hot-reload your API Gateway(s) and the new API will be loaded, if you take a look at the output of the Gateway (or the logs), you will see that it should have loaded Test API on `/test-api/`.

Your API is now ready to use via the Gateway.

{{< tab_end >}}
{{< tabs_end >}}
