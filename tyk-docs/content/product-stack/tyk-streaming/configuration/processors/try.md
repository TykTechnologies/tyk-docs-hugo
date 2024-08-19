---
title: Try
description: Explains an overview of try processor
tags: [ "Tyk Streams", "Stream Processors", "Processors", "Try" ]
---

Executes a list of child processors on messages only if no prior processors have failed (or the errors have been cleared).

```yml
# Config fields, showing default values
label: ""
try: []
```

This processor behaves similarly to the [for_each]({{< ref "/product-stack/tyk-streaming/configuration/processors/for-each" >}}) processor, where a list of child processors are applied to individual messages of a batch. However, if a message has failed any prior processor (before or during the try block) then that message will skip all following processors.

For example, with the following config:

```yaml
pipeline:
  processors:
    - resource: foo
    - try:
      - resource: bar
      - resource: baz
      - resource: buz
```

If the processor `bar` fails for a particular message, that message will skip the processors `baz` and `buz`. Similarly, if `bar` succeeds but `baz` does not then `buz` will be skipped. If the processor `foo` fails for a message then none of `bar`, `baz` or `buz` are executed on that message.

This processor is useful for when child processors depend on the successful output of previous processors. This processor can be followed with a [catch]({{< ref "/product-stack/tyk-streaming/configuration/processors/catch" >}}) processor for defining child processors to be applied only to failed messages.

More information about error handing can be found [here]({{< ref "/product-stack/tyk-streaming/configuration/common-configuration/error-handling" >}}).

### Nesting within a catch block

In some cases it might be useful to nest a try block within a catch block, since the [catch processor]({{< ref "/product-stack/tyk-streaming/configuration/processors/catch" >}}) only clears errors *after* executing its child processors. This means a nested try processor will not execute unless the errors are explicitly cleared beforehand.

This can be done by inserting an empty catch block before the try block like as follows:

```yaml
pipeline:
  processors:
    - resource: foo
    - catch:
      - log:
          level: ERROR
          message: "Foo failed due to: ${! error() }"
      - catch: [] # Clear prior error
      - try:
        - resource: bar
        - resource: baz
```
