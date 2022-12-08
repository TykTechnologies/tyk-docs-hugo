---
title: Validate JSON
menu:
  main:
    parent: "Transform Traffic"
weight: 7 
---

From Tyk Gateway v2.6.0, you can verify user requests against a specified JSON schema and check that the data sent to your API by a consumer is in the right format. This means you can offload data validation from your application onto us.

If it's not in the right format, then the request will be rejected. And you can set a custom error code. The default is "422 Unprocessable Entity".

## Validate with an API Definition

JSON schema validation is implemented as the rest of plugins, and its configuration should be added to `extended_paths` in the following format:

```{.json}
"validate_json": [{
  "method": "POST",
  "path": "me",
  "schema": {..schema..}, // JSON object
  "error_response_code": 422 // 422 default however can override.
}]
```

The schema must be a draft v4 JSON Schema spec, see http://json-schema.org/specification-links.html#draft-4 for details. Example schema can look like this:

```{.json}
{
  "title": "Person",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "age": {
      "description": "Age in years",
      "type": "integer",
      "minimum": 0
    }
  },
  "required": ["firstName", "lastName"]
}
```

## Validate with the Dashboard

To add the Validate JSON plugin via the Dashboard:

1. Select your API from your list and select **Edit**.
2. From the **API Designer**, select the **Endpoint Designer** tab
3. Select an existing endpoint or create a new one.
4. From the Plugins drop-down list, select **VALIDATE JSON**
![validate json plugin](/docs/img/2.10/validate_json.png)
5. Click the **VALIDATE JSON** Plugin
6. Select an Error code from the drop-down list if you don't want to use the default `422 UNPROCESSABLE ENTITY`
7. Enter your JSON Schema in the JSON Schema editor.

{{< img src="/img/dashboard/system-management/validate-json-schema.png" alt="Validate JSON Schema" >}}

{{< note success >}}

**Note**  

JSON Schema `draft-04` is required. If you don't specify a schema, `draft-04` is used. Using another version will return an `unsupported schema error, unable to validate` error.

{{< /note >}}