---
title: "Managing Classic API Definition"
date: 2025-02-10
tags: ["Tyk Classic API", "Create", "Update", "Import", "API Key", "Security Policy"]
description: "How to manage Tyk Classic API definition"
keywords: ["Tyk Classic API", "Create", "Update", "Import", "API Key", "Security Policy"]
aliases:
  - /getting-started/create-api
  - /getting-started/import-apis
  - /getting-started/create-security-policy
  - /getting-started/create-api-key

  - /get-started/with-tyk-on-premise/tutorials/tyk-on-premise-pro/create-api
  - /tyk-api-gateway-v1-9/tutorials/set-up-your-first-api
  - /get-started/with-tyk-multi-cloud/tutorials/create-api
  - /try-out-tyk/tutorials/create-api
  - /getting-started/tutorials/create-api
  - /tyk-configuration-reference/import-apis
  - /getting-started/installation/tutorials/create-security-policy
  - /try-out-tyk/tutorials/create-security-policy
  - /getting-started/tutorials/create-security-policy
  - /try-out-tyk/tutorials/create-security-policy
  - /with-tyk-community-edition/tutorials/create-api-token
  - /get-started/with-tyk-multi-cloud/tutorials/create-api-token
  - /get-started/with-tyk-on-premise/tutorials/tyk-on-premise-pro/create-api-token
  - /get-started/with-tyk-cloud/tutorials/create-api-token
  - /try-out-tyk/tutorials/create-api-key
  - /try-out-tyk/create-api-key
  - /getting-started/tutorials/create-api-key
---

## Create an API

### What does it mean to create an API in Tyk

You have a running service with an API that you want your users to consume; you want to protect and manage access to that API using Tyk Gateway - how do you do that?  
<br>
For Tyk Gateway to protect and [reverse proxy](https://en.wikipedia.org/wiki/Reverse_proxy) calls to your upstream service, you need to configure an API on Tyk Gateway. The minimum information that Tyk requires is the **listen path** (which is a path on the Tyk Gateway URL that you want your consumers to call) and your **API URL** (which is the URL of your service to which Tyk should forward requests).  
<br>
This information and other configuration values are stored in an object called a *Tyk API Definition*. Once you have created your Tyk API Definition and deployed it in the Gateway, Tyk can start serving your consumers, forwarding their requests to your upstream service's API.

To reach a detailed guide to creating Tyk API Definitions, please choose the tab for the product you are using:

### Tyk Cloud

<br>
<br>
Tyk Cloud is a fully managed service that makes it easy for API teams to create, secure, publish and maintain APIs at any scale, anywhere in the world. Tyk Cloud includes everything you need to manage your global API ecosystem: [Tyk Gateways]({{< ref "tyk-oss-gateway" >}}), [Tyk Dashboard]({{< ref "tyk-dashboard" >}}), [Tyk Developer Portal]({{< ref "tyk-developer-portal" >}}) and [Universal Data Graph]({{< ref "api-management/data-graph#overview" >}}). 
<br>  

To embark on your API journey with Tyk Cloud, we recommend going to our [Quick Start guide]({{< ref "tyk-cloud#quick-start-tyk-cloud" >}}). This guide will walk you through the process of creating your very first API in Tyk Cloud.
For an advanced step by step guide we recommend visiting our [Getting Started guide]({{< ref "tyk-cloud#comprehensive-tyk-cloud-setup" >}}). This will explain advanced configuration steps relating to how to distribute your API across nodes, in addition to adding and testing your API.

### Tyk Self-Managed

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

We just sent an API definition to the Tyk `/apis` endpoint. See [API definition objects]({{< ref "api-management/gateway-config-tyk-classic" >}}) for details of all the available objects. These objects encapsulate all of the settings for an API within Tyk.

Want to learn more from one of our team of engineers?

{{< button_left href="https://tyk.io/book-a-demo" color="green" content="Book a demo" >}}

### Tyk Open Source

{{< note success >}}
**Note: Integration with your OpenAPI documentation**

In Tyk v4.1 we introduced support for APIs defined according to the [OpenAPI Specification v3.0.3](https://spec.openapis.org/oas/v3.0.3) (OAS).  
This introduces a standard way to describe the vendor-agnostic elements of an API (the OpenAPI Definition, stored as an OpenAPI Document); we take this and add Tyk-specific configuration options to create the *Tyk OAS API Definition*. You can import your own OpenAPI document and Tyk will use this to generate the Tyk OAS API Definition.  
For a detailed tutorial on using OAS with Tyk Gateway, check out our guide to [creating a Tyk OAS API Definition]({{< ref "api-management/gateway-config-managing-oas#using-the-tyk-dashboard-api" >}}).

{{< /note >}}

**Prerequisites**

Before you continue this tutorial, you will need a running [Tyk OSS gateway]({{< ref "tyk-oss-gateway" >}}). Click the button for instructions on how to install Tyk Gateway:

{{< button_left href="https://tyk.io/sign-up/#oss" color="green" content="Install Tyk Gateway" >}}

#### Creating an API on Tyk Gateway

There are two ways to configure Tyk Gateway with an API definition:
1. [Create an API with the Tyk Gateway API]({{< ref "#using-tyk-gateway-api" >}}) - Tyk Gateway has its own APIs which provides various services including the registering of Tyk API Definitions on the Gateway.
2. [Create an API in File-based Mode]({{< ref "#create-an-api-in-file-based-mode" >}}) - alternatively you can create a Tyk API Definition in a file and then load it to the Gateway.


#### Using Tyk Gateway API

Watch our video to learn how to add an API to Tyk's Open Source Gateway using [Postman](https://www.postman.com/downloads/).

{{< youtube UWM2ZQoGhQA >}}

In order to use the Gateway API to create a Tyk API Definition you will need the API key for your deployment's Gateway API and then issue just one command to create the API and make it live.

1. **Make sure you know your API secret**

    The API key to access your Tyk Gateway API is stored in your `tyk.conf` file; the property is called `secret`. You will need to provide this value in a header called `x-tyk-authorization` when making calls to the Gateway API.

2. **Create an API**

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
Tyk API definitions encapsulate all of the settings for an API within Tyk Gateway and are discussed in detail in the [API section]({{< ref "api-management/gateway-config-tyk-classic" >}}) of this documentation.

**Restart or hot reload**

Once you have created the file, you will need to either restart the Tyk Gateway, or issue a hot reload command, lets do the latter:
```curl
curl -H "x-tyk-authorization: {your-secret}" -s http://{your-tyk-host}:{port}/tyk/reload/group | python -mjson.tool
```

This command will hot-reload your API Gateway(s) and the new API will be loaded, if you take a look at the output of the Gateway (or the logs), you will see that it should have loaded Hello-World API on `/hello-world/`.

#### Create an API in File-based Mode

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

**Restart or hot reload**

Once you have created the file, you will need to either restart the Tyk Gateway, or issue a hot reload command, lets do the latter:
```curl
curl -H "x-tyk-authorization: {your-secret}" -s https://{your-tyk-host}:{port}/tyk/reload/group | python -mjson.tool
```

This command will hot-reload your API Gateway(s) and the new API will be loaded, if you take a look at the output of the Gateway (or the logs), you will see that it should have loaded Test API on `/test-api/`.

Your API is now ready to use via the Gateway.

## Secure an API

A security policy encapsulates several options that can be applied to a key. It acts as a template that can override individual sections of an API key (or identity) in Tyk.

See [What is a Security Policy?]({{< ref "api-management/policies#what-is-a-security-policy" >}}) for more details.

### Tyk Cloud

<br>

{{< include "create-security-policy-include" >}}

### Tyk Self Manged
<br>

{{< include "create-security-policy-include" >}}

### Tyk Open Source

#### Create a Policy with the Gateway

Adding a policy to the Tyk Gateway is very easy. Polices are loaded into memory on load and so need to be specified in advanced in a file called `policies.json`. To add a policy, simply create or edit the `/policies/policies.json` file and add the policy object to the object array:

```json
{
  "POLICYID": {
    "access_rights": {
      "{API-ID}": {
        "allowed_urls": [],
        "api_id": "{API-ID}",
        "api_name": "{API-NAME}",
        "versions": [
            "Default"
        ]
      }
    },
    "active": true,
    "name": "POLICY NAME",
    "rate": 1000,
    "per": 1,
    "quota_max": 10000,
    "quota_renewal_rate": 3600,
    "tags": ["Startup Users"]
  }
}
```

The above creates a new policy with a policy ID that you can define, with the rate limits, and security profile that grants access to the APIs listed in the `access_rights` section.

- `{API-ID}`: The API ID you wish this policy to grant access to, there can be more than one of these entries.
- `{API-NAME}`: The name of the API that is being granted access to (this is not required, but helps when debugging or auditing).
- `POLICY NAME`: The name of this security policy.

The important elements:

- `access_rights`: A list of objects representing which APIs that you have configured to grant access to.
- `rate` and `per`: The number of requests to allow per period.
- `quota_max`: The maximum number of allowed requests over a quota period.
- `quota_renewal_rate`: how often the quota resets, in seconds. In this case we have set it to renew every hour.

## Access an API

### Tyk Cloud

{{< include "create-api-key-include" >}}

You will see a 200 response with your new key:

```yaml
{
  "api_model": {},
  "key_id": "59bf9159adbab8abcdefghijac9299a1271641b94fbaf9913e0e048c",
  "data": {...}
}
```

The value returned in the `key_id` parameter of the response is the access key you can now use to access the API that was specified in the `access_rights` section of the call.

### Tyk Self Managed

{{< include "create-api-key-include" >}}

You will see a response with your new key:

```json
{
  "action": "create",
  "key": "c2cb92a78f944e9a46de793fe28e847e",
  "status": "ok"
}
```

The value returned in the `key` parameter of the response is the access key you can now use to access the API that was specified in the `access_rights` section of the call.

### Tyk Open Source

To create an API Key, you will need the API ID that we wish to grant the key access to, then creating the key is an API call to the endpoint.

**Prerequisite**

- You will need your API secret, this is the `secret` property of the `tyk.conf` file.

Once you have this value, you can use them to access the Gateway API, the below `curl` command will generate a key for one of your APIs, remember to replace `{API-SECRET}`, `{API-ID}` and `{API-NAME}` with the real values as well as the `curl` domain name and port to be the correct values for your environment.

```curl
curl -X POST -H "x-tyk-authorization: {API-SECRET}" \
  -s \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{
    "allowance": 1000,
    "rate": 1000,
    "per": 1,
    "expires": -1,
    "quota_max": -1,
    "org_id": "1",
    "quota_renews": 1449051461,
    "quota_remaining": -1,
    "quota_renewal_rate": 60,
    "access_rights": {
      "{API-ID}": {
        "api_id": "{API-ID}",
        "api_name": "{API-NAME}",
        "versions": ["Default"]
      }
    },
    "meta_data": {}
  }' http://localhost:8080/tyk/keys/create | python -mjson.tool
```

The above creates a new key with the rate limits, and security profile that grants access to the APIs listed in the `access_rights` section.

- `{API-ID}`: The API ID you wish this policy to grant access to, there can be more than one of these entries.
- `{API-NAME}`: The name of the API being granted access to (this is not required, but helps when debugging or auditing).

The important elements:

- `access_rights`: A list of objects representing which APIs you have configured to grant access to.
- `rate` and `per`: The number of allowed requests per period.
- `quota_max`: The maximum number of allowed requests over a quota period.
- `quota_renewal_rate`: how often the quota resets, in seconds. In this case, we have set it to renew every hour.

You will see a response with your new key:

```json
{
  "action": "create",
  "key": "c2cb92a78f944e9a46de793fe28e847e",
  "status": "ok"
}
```

The value returned in the `key` parameter of the response is the access key you can now use to access the API that was specified in the `access_rights` section of the call.

## Import an API

Tyk supports importing both API Blueprint and Swagger (OpenAPI) JSON definitions from either the Gateway or the Dashboard. Tyk will output the converted file to to `stdout`. Below are the commands you can use to get Tyk to switch to command mode and generate the respective API definitions for both API Blueprint and Swagger files.

### API Blueprint is being deprecated

Our support for API Blueprint is being deprecated. We have been packaging [aglio](https://github.com/danielgtaylor/aglio) in our Docker images for the Dashboard which enables rendering API Blueprint Format in the portal. This module is no longer maintained and is not compatible with newer NodeJS. If you wish to continue using this feature, you can do so by installing the module yourself in your Dockerfile. The imapct of this change is that our Docker images will no longer contain this functionality.

As a work around, you can do the following:

* Create API Blueprint in JSON format using the Apiary [Drafter](https://github.com/apiaryio/drafter) tool
* Convert API Blueprint to OpenAPI (Swagger) using the Apiary [API Elements CLI](https://github.com/apiaryio/api-elements.js/tree/master/packages/cli) tool.

### Using API Blueprint

{{< note success >}}
**Note**  

See [note](#api-blueprint-is-being-deprecated) above regarding deprecation of support for API Blueprint.
{{< /note >}}

Tyk supports an easy way to import Apiary API Blueprints in JSON format using the command line.

Blueprints can be imported and turned into standalone API definitions (for new APIs) and also imported as versions into existing APIs.

It is possible to import APIs and generate mocks or to generate Allow Lists that pass-through to an upstream URL.

All imported Blueprints must be in the JSON representation of Blueprint's markdown documents. This can be created using Apiary's [Snow Crash tool](https://github.com/apiaryio/snowcrash).

Tyk outputs all new API definitions to `stdout`, so redirecting the output to a file is advised in order to generate new definitions to use in a real configuration.

#### Importing a Blueprint as a new API:

Create a new definition from the Blueprint:

```{.copyWrapper}
./tyk --import-blueprint=blueprint.json --create-api --org-id=<id> --upstream-target="http://widgets.com/api/"
```

#### Importing a definition as a version in an existing API:

Add a version to a definition:

```{.copyWrapper}
./tyk --import-blueprint=blueprint.json --for-api=<path> --as-version="version_number"
```

#### Creating your API versions as a mock

As the API Blueprint definition allows for example responses to be embedded, these examples can be imported as forced replies, in effect mocking out the API. To enable this mode, when generating a new API or importing as a version, simply add the `--as-mock` parameter.

### Using Swagger (OpenAPI)

Tyk supports importing Swagger documents to create API definitions and API versions. Swagger imports do not support mocking though, so sample data and replies will need to be added manually later.

#### Importing a Swagger document as a new API

Create a new definition from Swagger:

```{.copyWrapper}
./tyk --import-swagger=petstore.json --create-api --org-id=<id> --upstream-target="http://widgets.com/api/"
```
{{< note success >}}
**Note**  

When creating a new definition from an OAS 3.0 spec, you will have to manually add the listen path after the API is created.
{{< /note >}}


#### Importing a Swagger document as a version into an existing API

Add a version to a definition:

```{.copyWrapper}
./tyk --import-swagger=petstore.json --for-api=<path> --as-version="version_number"
```

#### Mocks

Tyk supports API mocking using our versioning `use_extended_paths` setup, adding mocked URL data to one of the three list types (white_list, black_list or ignored). In order to handle a mocked path, use an entry that has `action` set to `reply`:

```json
"ignored": [
  {
    "path": "/v1/ignored/with_id/{id}",
    "method_actions": {
      "GET": {
        "action": "reply",
        "code": 200,
        "data": "Hello World",
        "headers": {
          "x-tyk-override": "tyk-override"
        }
      }
    }
  }
],
```

See [Versioning]({{< ref "api-management/api-versioning#tyk-classic-api-versioning-1" >}}) for more details.

### Import APIs via the Dashboard API

{{% include "import-api-include" %}}

### Import APIs via the Dashboard UI

1. **Select "APIs" from the "System Management" section**

    {{< img src="/img/2.10/apis_menu.png" alt="API listing" >}}

2. **Click "IMPORT API"**

    {{< img src="/img/2.10/import_api_button.png" alt="Add API button location" >}}

    Tyk supports the following import options:

    1. From an Existing Tyk API definition
    2. From a Apiary Blueprint (JSON) file
    3. From a Swagger/OpenAPI (JSON only) file
    4. From a SOAP WSDL definition file (new from v1.9)

    To import a Tyk Definition, just copy and paste the definition into the code editor.

    For Apiary Blueprint and Swagger/OpenAPI, the process is the same. For example:

    Click the "From Swagger (JSON)" option from the pop-up

    {{< img src="/img/2.10/import_api_json.png" alt="Import popup" >}}

    For WSDL:

    {{< img src="/img/2.10/import_api_wsdl.png" alt="Import WSDL" >}}

3. **Enter API Information**

    You need to enter the following information:

    * Your **Upstream Target**
    * A **Version Name** (optional)
    * An optional **Service Name** and **Port** (WSDL only)
    * Copy code into the editor

4. **Click "Generate API"**

    Your API will appear in your APIs list. If you select **EDIT** from the **ACTIONS** drop-down list, you can see the endpoints (from the [Endpoint Designer](https://tyk.io/docs/transform-traffic/endpoint-designer/)) that have been created as part of the import process.

### Creating a new API Version by importing an API Definition using Tyk Dashboard

As well as importing new APIs, with Tyk, you can also use import to create a new version of an existing Tyk Classic API.

1. Open the API Designer page and select Import Version from the **Options** drop-down.

    {{< img src="/img/oas/import-api-version.png" alt="Import API Version Drop-Down" >}}

2. Select either OpenAPI (v2.0 or 3.0) or WSDL/XML as your source API

3. You need to add a new **API Version Name**. **Upstream URL** is optional.

    img src="/img/oas/import-api-version-config.png" alt="Import API Version Configuration" >}}

4. Click **Import API**.

    img src="/img/oas/import-api-button.png" alt="Import API" >}}

5. Select the **Versions** tab and your new version will be available.
6. Open the **Endpoint Designer** for your API and select your new version from **Edit Version**.
7. You will see all the endpoints are saved for your new version.

{{< img src="/img/oas/version-endpoints.png" alt="Version Endpoints" >}}
