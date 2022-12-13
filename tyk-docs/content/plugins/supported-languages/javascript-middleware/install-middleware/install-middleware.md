---
date: 2017-03-24T15:11:05Z
title: Install Middleware
menu:
  main:
    parent: "JavaScript Middleware"
weight: 4
aliases:
  - /plugins/javascript-middleware/install-middleware
---

Installing middleware is different for different releases of Tyk, for example, in Tyk Community Edition it is possible to directly specify a path to a file in the API Definition, while in Tyk Pro, we recommend using a directory-based loader.

{{< note success >}}
**Note**  

Tyk Cloud Classic does not support custom middleware loading. However, it is possible with a [Tyk Multi-Cloud deployment]({{< ref "plugins/javascript-middleware/install-middleware/tyk-hybrid/" >}}).
{{< /note >}}

