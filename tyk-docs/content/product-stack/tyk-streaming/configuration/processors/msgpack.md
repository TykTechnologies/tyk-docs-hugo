---
title: Msgpack
description: Explains an overview of msgpack processor
tags: [ "Tyk Streams", "Stream Processors", "Processors", "msgpack", "MessagePack" ]
---

Converts messages to or from the [MessagePack](https://msgpack.org/) format.

```yml
# Config fields, showing default values
label: ""
msgpack:
  operator: "" # No default (required)
```

## Fields

### operator

The operation to perform on messages.


Type: `string`  

| Option | Summary |
|---|---|
| from_json | Convert JSON messages to MessagePack format |
| to_json | Convert MessagePack messages to JSON format |
