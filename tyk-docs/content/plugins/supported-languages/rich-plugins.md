---
date: 2017-03-24T13:02:17Z
title: Rich Plugins
menu:
  main:
    parent: "Supported Languages"
weight: 1
url: "/plugins/supported-languages/rich-plugins"
aliases:
  - /plugins/rich-plugins
---

Rich plugins make it possible to write powerful middleware for Tyk. Tyk supports: 

*   [Lua](/docs/plugins/rich-plugins/luajit/)
*   [Python](/docs/plugins/rich-plugins/python/)
*   [gRPC](/docs/plugins/rich-plugins/grpc/)

gRPC provides the ability to write plugins using many languages including C++, Java, Ruby and C#.

The dynamically built Tyk binaries can expose and call Foreign Function Interfaces in guest languages that extend the functionality of a gateway process.

The plugins are able to directly call some Tyk API functions from within their guest language. They can also be configured so that they hook into various points along the standard middleware chain.

{{< note success >}}
**Note**  

When using Python plugins, the middleware function names are set globally. So, if you include two or more plugins that implement the same function, the last declared plugin implementation of the function will be returned. We plan to add namespaces in the future.
{{< /note >}}

