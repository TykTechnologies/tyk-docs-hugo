---
title: "Export an OAS API"
date: 2022-07-13
tags: ["Tyk Tutorials", "Getting Started", "First API", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source", "Export an OAS API"]
description: "Exporting an OAS API"
menu:
  main:
    parent: "Using OAS API Definitions"
weight: 5
---

{{< toc >}}

### Introduction

Tyk supports exporting the Tyk OAS API Definitions or just the extracted OAS API Definition using either the Gateway or Dashboard APIs. Below are the commands you can use to get Tyk to export the required format.

### Open Source

{{< note success >}}
**Note**  

For the following tutorials, use your Tyk Gateway API secret stored in your `tyk.conf` file, the property is called `secret`, you will need to use this as a header called `x-tyk-authorization` to make calls to the Gateway API.
{{< /note >}}

### Tutorial: Export a Tyk OAS API definition

| Property     | Description                   |
|--------------|-------------------------------|
| Resource URL | /tyk/apis/oas/{api-id}/export |
| Method       | GET                           |
| Type         | None                          |
| Body         | None                          |
| Param        | Path Param: api-id            |

The only thing you need to do in order to get the Tyk OAS API Definition for a specific API is to call the export Gateway endpoint.

{{< note success >}}
**Note**  

For the Tyk Gateway, the default`{port}` is `8080`.
{{< /note >}}

```
curl --location --request GET 'http://{your-tyk-host}:{port}/tyk/apis/oas/{api-id}/export' \
--header 'x-tyk-authorization: {your-secret}'
```
### Tutorial: Export an OAS API Definition out of a Tyk OAS API Definition

| Property     | Description                          |
|--------------|--------------------------------------|
| Resource URL | /tyk/apis/oas/{api-id}/export        |
| Method       | GET                                  |
| Type         | None                                 |
| Body         | None                                 |
| Param        | Path param: api-id Query param: mode |

To ease the integration with other applications, such as your Developer Portal, Tyk offers the possibility to export just the OAS API Definition by striping out the `x-tyk-api-gateway` configuration from the Tyk OAS API Definition. To achieve this just add the `mode=public` query parameter to the export API.

```
curl --location --request GET 'http://{your-tyk-host}:{port}/tyk/apis/oas/{api-id}/export?mode=public' \
--header 'x-tyk-authorization: {your-secret}'
```

