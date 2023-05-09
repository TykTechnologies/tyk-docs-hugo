---
date: 2023-03-26T16:30:12+01:00
title: Data Graphs API
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 1
---

### Import an AsyncAPI Document

The Dashboard exposes the `/api/data-graphs/data-sources/import` Dashboard API which allows you to import an AsyncAPI or OpenAPI document.

You should provide JSON payload with the following data:

* `type` - document type, valid document types are `asyncapi` and `openapi`.
* `data` - AsyncAPI or OpenAPI document

| **Property** | **Description**                                       |
|--------------|-------------------------------------------------------|
| Resource URL | `/api/data-graphs/data-sources/import`                |
| Method       | POST                                                  |
| Body         | {"type": "<document-type>", "data": "<the-document>"} |


Supported AsyncAPI versions:
* 2.0.0
* 2.1.0
* 2.3.0
* 2.4.0

Supported OpenAPI versions:
* 3.0.0

#### Sample Response

```
{
    "Status": "OK",
    "Message": "Data source imported",
    "Meta": "64102568f2c734bd2c0b8f99"
}
```