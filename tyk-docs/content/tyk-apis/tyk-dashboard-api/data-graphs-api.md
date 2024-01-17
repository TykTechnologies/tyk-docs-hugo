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

Currently `/api/data-graphs/` has only one endpoint called `/data-sources` with only `POST` HTTP method.

## Import an AsyncAPI Document

The Dashboard exposes the `/api/data-graphs/data-sources/import` Dashboard API which allows you to import an [AsyncAPI](https://www.asyncapi.com/docs/reference/specification/v3.0.0) or [OpenAPI](https://swagger.io/specification/) document.

| **Property** | **Description**                                       |
|--------------|-------------------------------------------------------|
| Resource URL | `/api/data-graphs/data-sources/import`                |
| Method       | POST                                                  |
| Body         | `{`<br/>`  "type": "<openapi \| asyncapi>",`<br/>`  "data": "<THE-DOCUMENT>"`<br/>`}`|

As shown in the table above, you should provide a JSON payload ("body") with the following data:
* `type` - document type, valid document types are `asyncapi` and `openapi`.
* `data` - AsyncAPI or OpenAPI document. Note: This string of characters needs to be "[stringified](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)" (converting an object to its JSON (JavaScript Object Notation) string representation).

### Suggestion for "stringifying"
If you use *Postman*, you can write a little Javascript code in the "Pre-request Script" and stringify the document.
Example:
<img width="953" alt="image" src="https://github.com/TykTechnologies/tyk-docs/assets/3155222/b8f32d89-bcfb-4f6c-9fed-b39d2949eddb">

#### Code to copy
```javascript
pm.environment.set("asyncapi_document", JSON.stringify(
    `{ "apisync": "v3.0.0"}`
))
console.log(pm.environment.get("asyncapi_document"))
```

### Supported AsyncAPI versions
* 2.0.0
* 2.1.0
* 2.3.0
* 2.4.0

### Supported OpenAPI versions
* 3.0.0

### Sample Response

```json
{
    "Status": "OK",
    "Message": "Data source imported",
    "Meta": "64102568f2c734bd2c0b8f99"
}
```
