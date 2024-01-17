---
date: 2023-03-26T16:30:12+01:00
title: Data Graphs API
description: Describe endpoints used to create data-graph APIs in Tyk Gateway
tags: ["asyncapi", "AsyncAPI", "OpenAPI", "Data Graphs", "GraphQL"]
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 1
---

### Import an AsyncAPI Document

The Dashboard exposes the `/api/data-graphs/data-sources/import` Dashboard API which allows you to import an [AsyncAPI](https://www.asyncapi.com/docs/reference/specification/v3.0.0) or [OpenAPI](https://swagger.io/specification/) document.

You should provide a JSON payload with the following data:

* `type` - document type, valid document types are `asyncapi` and `openapi`.
* `data` - AsyncAPI or OpenAPI document

| **Property** | **Description**                                       |
|--------------|-------------------------------------------------------|
| Resource URL | `/api/data-graphs/data-sources/import`                |
| Method       | POST                                                  |
| Body         | `{`<br/>`  "type": "<openapi \| asyncapi>",`<br/>`  "data": "<THE-DOCUMENT>"`<br/>`}`|


#### Supported AsyncAPI versions
* 2.0.0
* 2.1.0
* 2.3.0
* 2.4.0

#### Supported OpenAPI versions
* 3.0.0

#### Sample Response

```json
{
    "Status": "OK",
    "Message": "Data source imported",
    "Meta": "64102568f2c734bd2c0b8f99"
}
```
