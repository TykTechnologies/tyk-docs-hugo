---
title: Regular Express Match
description: Explains an overview of regular expression matching in Tyk Streams
tags: [ "Tyk Streams", "Scanners", "re_match" ]
---

Split an input stream into segments matching against a regular expression.

```yml
# Config fields, showing default values
re_match:
  pattern: (?m)^\d\d:\d\d:\d\d # No default (required)
  max_buffer_size: 65536
```

## Fields

### pattern

The pattern to match against.


Type: `string`  

```yml
# Examples

pattern: (?m)^\d\d:\d\d:\d\d
```

### max_buffer_size

Set the maximum buffer size for storing line data, this limits the maximum size that a message can be without causing an error.


Type: `int`  
Default: `65536`  
