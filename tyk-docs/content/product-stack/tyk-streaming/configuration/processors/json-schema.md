---
title: JSON Schema
description: Explains an overview of JSON Schema
tags: [ "Tyk Streams", "Stream Processors", "Processors", "JSON Schema", "JSON", "Schema" ]
---

Checks messages against a provided JSONSchema definition but does not change the payload under any circumstances.

```yml
# Config fields, showing default values
label: ""
json_schema:
  schema: "" # No default (optional)
  schema_path: "" # No default (optional)
```

Please refer to the [JSON Schema website](https://json-schema.org/) for information and tutorials regarding the syntax of the schema.

## Fields

### schema

A schema to apply. Use either this or the `schema_path` field.


Type: `string`  

### schema_path

The path of a schema document to apply. Use either this or the `schema` field.


Type: `string`  

## Examples

Assume the following JSONSchema document and Tyk Streams configuration shown in the sections below.

### JSONSchema document

```json
{
	"$id": "https://example.com/person.schema.json",
	"$schema": "http://json-schema.org/draft-07/schema#",
	"title": "Person",
	"type": "object",
	"properties": {
	  "firstName": {
		"type": "string",
		"description": "The person's first name."
	  },
	  "lastName": {
		"type": "string",
		"description": "The person's last name."
	  },
	  "age": {
		"description": "Age in years which must be equal to or greater than zero.",
		"type": "integer",
		"minimum": 0
	  }
	}
}
```

### Tyk Streams configuration

```yaml
pipeline:
  processors:
  - json_schema:
      schema_path: "file://path_to_schema.json"
  - catch:
    - log:
        level: ERROR
        message: "Schema validation failed due to: ${!error()}"
    - mapping: 'root = deleted()' # Drop messages that fail
```

If a payload being processed looked like:

```json
{"firstName":"John","lastName":"Doe","age":-21}
```

Then a log message would appear explaining the fault and the payload would be dropped.
