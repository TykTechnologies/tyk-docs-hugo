---
title: Scanners
description: Explains an overview of scanners in Tyk Streams
tags: [ "Tyk Streams", "Scanners" ]
---

For most Tyk Streams inputs the data consumed comes pre-partitioned into discrete messages which can be comfortably held and processed in memory. However, some inputs such as the socket don't have a concept of consuming the data "entirely".

For such inputs it's necessary to define a mechanism by which the stream of source bytes can be chopped into smaller logical messages, processed and outputted as a continuous process whilst the stream is being read, as this dramatically reduces the memory usage of Tyk Streams as a whole and results in a more fluid flow of data.

The way in which we define this chopping mechanism is through scanners, configured as a field on each input that requires one. For example, if we wished to consume files line-by-line, which each individual line being processed as a discrete message, we could use the [lines scanner]({{< ref "product-stack/tyk-streaming/configuration/scanners/lines" >}}) a file input:

## Common

```yaml
input:
  file:
    paths: [ "./*.txt" ]
    scanner:
      lines: {}
```

## Advanced

```yaml
# Instead of newlines, use a custom delimiter:
input:
  file:
    paths: [ "./*.txt" ]
    scanner:
      lines:
        custom_delimiter: "---END---"
        max_buffer_size: 100_000_000 # 100MB line buffer
```

A scanner is a plugin similar to any other core Tyk Streams component (inputs, processors, outputs, etc), which means it's possible to define your own scanners that can be utilised by inputs that need them.
