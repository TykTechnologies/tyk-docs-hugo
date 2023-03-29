---
date: 2023-03-26T16:30:12+01:00
title: Data Graphs API
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 1
---

### Import an AsyncAPI Document

The Dashboard exposes the `/api/data-graphs/data-sources/import` Dashboard API which allows you to import an AsyncAPI document.

You should provide JSON payload with the following data:

* `type` - document type (it should be `"asyncapi"` to import an AsyncAPI document).
* `data` - AsyncAPI document

| **Property** | **Description**                                     |
| ------------ |-----------------------------------------------------|
| Resource URL | `/api/data-graphs/data-sources/import`              |
| Method       | POST                                                |
| Body         | {"type": "asyncapi", "data": "<asyncapi_document>"} |

#### Sample Response

```
{
    "Status": "OK",
    "Message": "Data source imported",
    "Meta": "64102568f2c734bd2c0b8f99"
}
```