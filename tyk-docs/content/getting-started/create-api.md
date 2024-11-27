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
<br>
For Tyk Gateway to protect and [reverse proxy](https://en.wikipedia.org/wiki/Reverse_proxy) calls to your upstream service, you need to configure an API on Tyk Gateway. The minimum information that Tyk requires is the **listen path** (which is a path on the Tyk Gateway URL that you want your consumers to call) and your **API URL** (which is the URL of your service to which Tyk should forward requests).  
<br>
This information and other configuration values are stored in an object called a *Tyk API Definition*. Once you have created your Tyk API Definition and deployed it in the Gateway, Tyk can start serving your consumers, forwarding their requests to your upstream service's API.

To reach a detailed guide to creating Tyk API Definitions, please choose the tab for the product you are using:

{{< tabs_start >}}

{{< tab_start "Cloud" >}}
<br>
<br>
Tyk Cloud is a fully managed service that makes it easy for API teams to create, secure, publish and maintain APIs at any scale, anywhere in the world. Tyk Cloud includes everything you need to manage your global API ecosystem: [Tyk Gateways]({{< ref "tyk-oss-gateway" >}}), [Tyk Dashboard]({{< ref "tyk-dashboard" >}}), [Tyk Developer Portal]({{< ref "tyk-developer-portal" >}}) and [Universal Data Graph]({{< ref "universal-data-graph" >}}). 
<br>  

To embark on your API journey with Tyk Cloud, we recommend going to our [Quick Start guide]({{< ref "/deployment-and-operations/tyk-cloud-platform/quick-start" >}}). This guide will walk you through the process of creating your very first API in Tyk Cloud.
For an advanced step by step guide we recommend visiting our [Getting Started guide]({{< ref "/tyk-cloud/getting-started" >}}). This will explain advanced configuration steps relating to how to distribute your API across nodes, in addition to adding and testing your API.

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
**Note: Integration with your OpenAPI documentation**

In Tyk v4.1 we introduced support for APIs defined according to the [OpenAPI Specification v3.0.3](https://spec.openapis.org/oas/v3.0.3) (OAS).  
This introduces a standard way to describe the vendor-agnostic elements of an API (the OpenAPI Definition, stored as an OpenAPI Document); we take this and add Tyk-specific configuration options to create the *Tyk OAS API Definition*. You can import your own OpenAPI document and Tyk will use this to generate the Tyk OAS API Definition.  
For a detailed tutorial on using OAS with Tyk Gateway, check out our guide to [creating a Tyk OAS API Definition]({{< ref "getting-started/using-oas-definitions/create-an-oas-api#tutorial-1-create-a-tyk-oas-api-using-the-tyk-gateway-api" >}}).

{{< /note >}}

## Prerequisites
Before you continue this tutorial, you will need a running [Tyk OSS gateway]({{< ref "tyk-oss-gateway" >}}). Click the button for instructions on how to install Tyk Gateway:

{{< button_left href="https://tyk.io/sign-up/#oss" color="green" content="Install Tyk Gateway" >}}

## Creating an API on Tyk Gateway
There are two ways to configure Tyk Gateway with an API definition:
1. [Create an API with the Tyk Gateway API]({{< ref "#tutorial-create-an-api-with-the-tyk-gateway-api" >}}) - Tyk Gateway has its own APIs which provides various services including the registering of Tyk API Definitions on the Gateway.
2. [Create an API in File-based Mode]({{< ref "#tutorial-create-an-api-in-file-based-mode" >}}) - alternatively you can create a Tyk API Definition in a file and then load it to the Gateway.


## Tutorial: Create an API with the Tyk Gateway API
Watch our video to learn how to add an API to Tyk's Open Source Gateway using [Postman](https://www.postman.com/downloads/).

{{< youtube UWM2ZQoGhQA >}}

In order to use the Gateway API to create a Tyk API Definition you will need the API key for your deployment's Gateway API and then issue just one command to create the API and make it live.

### Step 1: Make sure you know your API secret
The API key to access your Tyk Gateway API is stored in your `tyk.conf` file; the property is called `secret`. You will need to provide this value in a header called `x-tyk-authorization` when making calls to the Gateway API.

### Step 2: Create an API
To create the API, let's send a Tyk API definition to the `/apis` endpoint on your Tyk Gateway. Remember to change the `x-tyk-authorization` value (API key) in the header of your API call and set the domain name and port to target your Tyk Gateway in the `curl` command.
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

All APIs deployed on Tyk Gateway are given a unique `API ID`; if you don't provide one in the Tyk API Definition when creating the API, then an `API ID` will be generated automatically.
{{< /note >}}

**What did we just do?**

We just registered a new API on your Tyk Gateway by sending a Tyk API definition to your Gateway's `/apis` endpoint.  
Tyk API definitions encapsulate all of the settings for an API within Tyk Gateway and are discussed in detail in the [API section]({{< ref "/tyk-gateway-api/api-definition-objects" >}}) of this documentation.

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
