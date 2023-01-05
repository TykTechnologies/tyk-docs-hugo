---
title: "6. Header Forwarding"
date: 2020-09-14
menu:
  main:
    parent: "UDG Getting Started"
weight: 0
aliases:
    - /universal-data-graph/udg-getting-started/header-forwarding/
---

**Min Version: Tyk v3.2.0**

You’re able to configure upstream Headers dynamically, that is, you’re able to inject Headers from the client request into UDG upstream requests. For example, it can be used to access protected upstreams.

The syntax for this is straight forward:

```
{{.request.headers.someheader}}
```

  In your data sources, define your new Header name and then declare which request header's value to use:

  {{< img src="/img/dashboard/udg/getting-started/request-forward-syntax.png" alt="Forwarding Headers" >}}

  That's it!

  {{< note success >}}
**Note**

A JSON string has to be escaped before using as a header value. For example:
```
{\"hello\":\"world\"}
```

{{< /note >}}