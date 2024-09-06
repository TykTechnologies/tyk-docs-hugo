---
title: Sync Response
description: Explains an overview of sync response processor
tags: [ "Tyk Streams", "Stream Processors", "Processors", "Sync Response", "sync_response" ]
---

Adds the payload in its current state as a synchronous response to the input source, where it is dealt with according to that specific input type.

```yml
# Config fields, showing default values
label: ""
sync_response: {}
```

For most inputs this mechanism is ignored entirely, in which case the sync response is dropped without penalty. It is therefore safe to use this processor even when combining input types that might not have support for sync responses. An example of an input able to utilise this is [http_server]({{< ref "/product-stack/tyk-streaming/configuration/inputs/http-server" >}}).

Further information is available in the [Synchronous Responses]({{< ref "/product-stack/tyk-streaming/guides/sync-responses" >}}) guide.
