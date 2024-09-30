
---
title: Lines
description: Explains an overview of line scanner in Tyk Streams
tags: [ "Tyk Streams", "Scanners", "Line", "Line Scanner" ]
---

Split an input stream into a message per line of data.

```yml
# Config fields, showing default values
lines:
  custom_delimiter: "" # No default (optional)
  max_buffer_size: 65536
```

## Fields

### custom_delimiter

Use a provided custom delimiter for detecting the end of a line rather than a single line break.


Type: `string`  

### max_buffer_size

Set the maximum buffer size for storing line data, this limits the maximum size that a line can be without causing an error.


Type: `int`  
Default: `65536`  
