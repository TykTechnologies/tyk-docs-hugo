---
title: Avro
description: Explains an overview of avro processor
tags: [ "Tyk Streams", "Stream Processors", "Processors", "Avro" ]
---

```yml
# Config fields, with default values
label: ""
avro:
  operator: "" # No default (required)
  encoding: textual
  schema: ""
  schema_path: ""
```

{{< warning success >}}
**Note**

If you are consuming or generating messages using a schema registry service then it is likely this processor will fail as those services require messages to be prefixed with the identifier of the schema version being used.

{{< /warning >}}

## Operators

### to_json

Converts Avro documents into a JSON structure. This makes it easier to
manipulate the contents of the document within Tyk Streams. The encoding field
specifies how the source documents are encoded.


### from_json

Attempts to convert JSON documents into Avro documents according to the
specified encoding.

## Fields

### operator

The [operator](#operators) to execute


Type: `string`  
Options: `to_json`, `from_json`.

### encoding

An Avro encoding format to use for conversions to and from a schema.


Type: `string`  
Default: `"textual"`  
Options: `textual`, `binary`, `single`.

### schema

A full Avro schema to use.


Type: `string`  
Default: `""`  

### schema_path

The path of a schema document to apply. Use either this or the `schema` field.


Type: `string`  
Default: `""`  

```yml
# Examples

schema_path: file://path/to/spec.avsc

schema_path: http://localhost:8081/path/to/spec/versions/1
```

