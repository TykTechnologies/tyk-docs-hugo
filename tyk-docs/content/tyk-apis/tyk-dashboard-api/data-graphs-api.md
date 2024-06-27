---
date: 2023-03-14T08:00:12+01:00
title: Data Graphs API
description: Describe endpoints used to create data-graph APIs in Tyk Gateway
tags: ["asyncapi", "AsyncAPI", "OpenAPI", "Data Graphs", "GraphQL"]
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 1
---

Currently `/api/data-graphs/` has only one endpoint called `/data-sources` with only a `POST` HTTP method.

## Import AsyncAPI or OpenAPI Documents

The Dashboard exposes the `/api/data-graphs/data-sources/import` endpoint which allows you to import an [AsyncAPI](https://www.asyncapi.com/docs/reference/specification/v3.0.0) or [OpenAPI](https://swagger.io/specification/) document.

### Supported AsyncAPI versions
* 2.0.0
* 2.1.0
* 2.2.0
* 2.3.0
* 2.4.0

### Supported OpenAPI versions
* 3.0.0

### Import a document from a remote resource

| **Property** | **Description**                            |
|--------------|--------------------------------------------|
| Resource URL | `/api/data-graphs/data-sources/import`     |
| Method       | `POST`                                     |
| Content-Type  | `application/json`                        |
| Body         | `{`<br/>` "url": "resource URL" `<br/>`}`  |

The fetched document can be an OpenAPI or AsyncAPI document. The format will be detected automatically. The data source import API only checks the fetched data and tries to determine the document format, the status codes are ignored. 
It returns an error if it fails to determine the format and the document type. HTTP 500 is returned if a programming or network error occurs. If the fetched request body is malformed then HTTP 400 is returned.

### Import an OpenAPI document

The data source import API supports importing OpenAPI documents. The document can be used as a request body.

| **Property** | **Description**                           |
|--------------|-------------------------------------------|
| Resource URL | `/api/data-graphs/data-sources/import`    |
| Method       | `POST`                                    |
| Content-Type  | `application/vnd.tyk.udg.v2.openapi`     |
| Body         | `<OpenAPI Document>`                   |


The document can be in JSON or YAML format. The import API can determine the type and parse it.

### Import an AsyncAPI document

The data source import API supports importing AsyncAPI documents. The document can be used as a request body.

| **Property** | **Description**                        |
|--------------|----------------------------------------|
| Resource URL | `/api/data-graphs/data-sources/import` |
| Method       | `POST`                                 |
| Content-Type | `application/vnd.tyk.udg.v2.asyncapi`  |
| Body         | `<AsyncAPI Document>`                  |

The document can be in JSON or YAML format. The import API can determine the type and parse it.

### Response Structure

The response structure is consistent with other endpoints, as shown in the table below:

| **Property** | **Description**                                       |
|--------------|-------------------------------------------------------|
| Status       | `Error` or `OK`                                       |
| Message      | Verbal explanation                                    |
| Meta         | API ID for success and `null` with error (not in use) |

#### Sample Response

```json
{
    "Status": "OK",
    "Message": "Data source imported",
    "Meta": "64102568f2c734bd2c0b8f99"
}
```