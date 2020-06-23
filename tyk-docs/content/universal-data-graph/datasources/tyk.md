---
title: "Tyk Datasource"
date: 2020-06-03
menu:
  main:
    parent: "UDG DataSources"
weight: 3
aliases:
    - /universal-data-graph/data-sources/tyk
---

Tyk DataSources are exactly the same as GraphQL or REST DataSources.

The only difference is that you can directly choose an endpoint from your existing APIs using a drop-down.
This makes it easier to set up and prevents typos compared to typing in the URL etc..

From a technical perspective there's another difference:

Tyk DataSources make it possible to call into existing APIs on a tyk gateway, even if those are marked as internal.
They also add a lot of flexibility as you can add custom middlewares, AuthZ as well as AuthN, rate limits, quotas etc. to these.

In general, it is advised to first add all APIs you'd wish to add to a data graph as a dedicated API to tyk.
Then in a second step you'd add these to your data graph.