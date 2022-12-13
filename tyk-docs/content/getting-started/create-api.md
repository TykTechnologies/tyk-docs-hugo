---
date: 2017-03-09T11:10:21Z
Title: Create an API
tags: ["Tyk Tutorials", "Getting Started", "First API", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source"]
description: "Creating a first API using Tyk"
menu:
  main:
    parent: "Getting Started"
weight: 2
url: /getting-started/create-api/
aliases:
  - /get-started/with-tyk-on-premise/tutorials/tyk-on-premise-pro/create-api/
  - /tyk-api-gateway-v1-9/tutorials/set-up-your-first-api/
  - /get-started/with-tyk-multi-cloud/tutorials/create-api/
  - /try-out-tyk/tutorials/create-api/
  - /getting-started/tutorials/create-api/
---

{{< tabs_start >}}
{{< tab_start "Cloud" >}}

<br>

The Cloud is simply the SaaS version of the Self-Managed product, but there are a few differences.  Please make sure you follow the Cloud [Get Started](/tyk-cloud/getting-started-tyk-cloud/first-api/) guide instead.

Want to learn more from one of our team?

{{< button_left href="https://tyk.io/book-a-demo/" color="green" content="Book a demo" >}}

{{< tab_end >}}
{{< tab_start "Self-Managed" >}}

{{< include "create-api-include" >}}

If the command succeeds, you will see:
```
{
  "action": "added",
  "key": "xxxxxxxxx",
  "status": "ok"
}
```

**What did we just do?**

We just sent an API definition to the Tyk `/apis` endpoint. See [API definition objects](/tyk-gateway-api/api-definition-objects/) for details of all the available objects. These objects encapsulate all of the settings for an API within Tyk.

{{< note success >}}
**Note**

We have also introduced Open API Specification (OAS) support with Tyk v4.1. See [Using OAS Definitions]({{< ref "/content/getting-started/using-oas-definitions.md" >}}) for more details.
{{< /note >}}

Want to learn more from one of our team?

{{< button_left href="https://tyk.io/book-a-demo/" color="green" content="Book a demo" >}}
{{< tab_end >}}
{{< tab_start "Open Source" >}}
## Prerequisites

In order to complete this tutorial, you need to have the [Tyk Community Edition installed](/tyk-oss-gateway/).

{{< button_left href="https://tyk.io/sign-up/" color="green" content="Try it out" >}}
## Creation Methods

With Tyk Community Edition, it is possible to create APIs using Tyk's Gateway API or to generate a file with the same object and store it in the `/apps` folder of the Tyk Gateway installation folder. This is demonstrated [here](#with-file-based-mode).


## Tutorial: Create an API with the Tyk Gateway API

{{< note success >}}
**Note**

A generated API ID will be added to Tyk API definition if it's not provided while creating an API with Tyk Gateway API.
{{< /note >}}

See our video for adding an API to the Open Source Gateway via the Gateway API and Postman:

{{< youtube UWM2ZQoGhQA >}}

In order to use the Gateway API you will need an API key for your Gateway and one command to create the API and make it live.

### Step 1: Make sure you know your API secret

Your Tyk Gateway API secret is stored in your `tyk.conf` file, the property is called `secret`, you will need to use this as a header called `x-tyk-authorization` to make calls to the Gateway API.

### Step 2: Create an API

To create the API, lets send a definition to the `apis` endpoint, which will return the status and version of your Gateway. Change the `x-tyk-authorization` value and `curl` domain name and port to be the correct values for your environment.
```{.copyWrapper}
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
```
{
  "key": "Hello-World",
  "status": "ok",
  "action": "added"
}
```

**What did we just do?**

We just sent an API definition to the Tyk `/apis` endpoint. API definitions are discussed in detail in the API section of this documentation. These objects encapsulate all of the settings for an API within Tyk Gateway.

## Restart or hot reload

Once you have created the file, you will need to either restart the Tyk Gateway, or issue a hot reload command, lets do the latter:
```{.copyWrapper}
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
```{.copyWrapper}
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
```{.copyWrapper}
curl -H "x-tyk-authorization: {your-secret}" -s https://{your-tyk-host}:{port}/tyk/reload/group | python -mjson.tool
```

This command will hot-reload your API Gateway(s) and the new API will be loaded, if you take a look at the output of the Gateway (or the logs), you will see that it should have loaded Test API on `/test-api/`.

Your API is now ready to use via the Gateway.

{{< note success >}}
**Note**

We have also introduced Open API Specification (OAS) support with Tyk v4.1. See [Using OAS Definitions]({{< ref "/content/getting-started/using-oas-definitions/create-an-oas-api.md#tutorial-create-an-oas-api-in-file-based-mode" >}}) for more details.
{{< /note >}}

{{< tab_end >}}
{{< tabs_end >}}
