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

Currently `/api/data-graphs/` has only one endpoint called `/data-sources` with only a `POST` HTTP method.

## Import AsyncAPI or OpenAPI Documents

The Dashboard exposes the `/api/data-graphs/data-sources/import` Dashboard API which allows you to import an [AsyncAPI](https://www.asyncapi.com/docs/reference/specification/v3.0.0) or [OpenAPI](https://swagger.io/specification/) document.

### Supported AsyncAPI versions
* 2.0.0
* 2.1.0
* 2.3.0
* 2.4.0

### Supported OpenAPI versions
* 3.0.0

### Request structure

| **Property** | **Description**                                       |
|--------------|-------------------------------------------------------|
| Resource URL | `/api/data-graphs/data-sources/import`                |
| Method       | POST                                                  |
| Body         | `{`<br/>`  "type": "<openapi \| asyncapi>",`<br/>`  "data": "<THE-DOCUMENT>"`<br/>`}`|

As shown in the table above, you should provide a JSON payload ("body") with the following data:
* `type` - document type, valid document types are `asyncapi` and `openapi`.
* `data` - AsyncAPI or OpenAPI document. **Note:** This string of characters needs to be [stringified](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) (i.e. converting an object to its JSON (JavaScript Object Notation) string representation).

#### Sample Request
```curl

curl 'http://tyk-dashboard.localhost:3000/api/data-graphs/data-sources/import' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: <API KAY>' \
--data '{
    "type": "asyncapi",
    "data": "{\"apisync\": \"v3.0.0\", \"info\": {} ...
    <TO SIMPLIFY, WE SHOW ONLY THE FIRST FEW LINES FROM THE ASYNC API DOCUMENT>}"
}'
```

### Response structure
The same as in other endpoints

| **Property** | **Description**                                       |
|--------------|-------------------------------------------------------|
| Status       | `Error` or `OK`                                       |
| Message      | Verbal explanation                                    |
| Meta         | API Id for success and `null` with error (not in use) |

#### Sample Response

```json
{
    "Status": "OK",
    "Message": "Data source imported",
    "Meta": "64102568f2c734bd2c0b8f99"
}
```

### Suggestion for "stringifying" with *Postman*
If you use *Postman*, you can write a little Javascript code in the *"Pre-request Script"* and stringify the document.

#### 1. The "Pre-request Script":
Screenshot from *Postman's* *"Pre-request Script"* tab:
<img width="953" alt="Screenshot from Postmans Pre-request Script tab" src="https://github.com/TykTechnologies/tyk-docs/assets/3155222/b8f32d89-bcfb-4f6c-9fed-b39d2949eddb">

##### "Pre-request Script" code to copy
In the sample code, we put only a small part of the AsyncAPI documents, so you can quickly see and copy the code  
```javascript
pm.environment.set("asyncapi_document", JSON.stringify(
    `{ 
        "apisync": "v3.0.0",
        "info": {}
     }`
))
console.log(pm.environment.get("asyncapi_document"))
```

#### 2. The Body
Screenshot from *Postman's* *"Body"* tab"
<img width="959" alt="Screenshot from Postmans Body tab" src="https://github.com/TykTechnologies/tyk-docs/assets/3155222/458ee994-cc95-4658-ab3d-0dc27712ba4a">

##### The "Body" code to copy
```yaml
{
    "type": "asyncapi",
    "data": {{asyncapi_document}}
}
```
#### 3. Make the API call
Hit *send*

#### 4. The log result as seen in Postman Console:

In the console log, you should see the output of your *"stringified"* document, to make sure it was stringified it as expected:
```json
"{ \n        \"apisync\": \"v3.0.0\",\n        \"info\": {}\n     }"
```
