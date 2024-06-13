---
title: Bounds Check
description: Explains an overview of Bounds Check processor
tags: [ "Tyk Streams", "Stream Processors", "Processors", "Bounds Check" ]
---

Removes messages (and batches) that do not fit within certain size boundaries.


## Common

```yml
# Common config fields, showing default values
label: ""
bounds_check:
  max_part_size: 1073741824
  min_part_size: 1
```

## Advanced

```yml
# All config fields, showing default values
label: ""
bounds_check:
  max_part_size: 1073741824
  min_part_size: 1
  max_parts: 100
  min_parts: 1
```

## Fields

### max_part_size

The maximum size of a message to allow (in bytes)


Type: `int`  
Default: `1073741824`  

### min_part_size

The minimum size of a message to allow (in bytes)


Type: `int`  
Default: `1`  

### max_parts

The maximum size of message batches to allow (in message count)


Type: `int`  
Default: `100`  

### min_parts

The minimum size of message batches to allow (in message count)


Type: `int`  
Default: `1`  
