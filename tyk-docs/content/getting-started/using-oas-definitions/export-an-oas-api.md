---
title: "Export a Tyk OAS API"
date: 2022-07-13
tags: ["Tyk Tutorials", "Getting Started", "First API", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source", "Export an OAS API"]
description: "Exporting a Tyk OAS API"
menu:
  main:
    parent: "Using OAS API Definitions"
weight: 5
---

### Introduction

Tyk Gateway API and Tyk Dashboard API both support exporting the entire [Tyk OAS API Definition]({{< ref "/getting-started/using-oas-definitions/oas-glossary#tyk-oas-api-definition" >}}) or just the [OpenAPI Document]({{< ref "/getting-started/using-oas-definitions/oas-glossary#openapi-document" >}}) part so that you can manage or work on them outside Tyk.

{{< note success >}}
**Note**  

Tyk OAS API support is currently in [Early Access]({{< ref "/frequently-asked-questions/using-early-access-features" >}}) and some Tyk features are not yet supported. You can see the status of what is and isn't yet supported [here]({{< ref "/getting-started/using-oas-definitions/oas-reference.md" >}}).
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

### Tutorial 1: Export the Tyk OAS API definition

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

### Tutorial 2: Export just the OpenAPI Document

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

