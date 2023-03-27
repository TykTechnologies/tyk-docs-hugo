---
title: "Headers for GQL APIs"
date: 2023-03-27
tags: ["GraphQL", "headers"]
description: "How to setup headers for GraphQL APIs"
menu:
  main:
    parent: "GraphQL"
weight: 1
aliases:
    - /graphql/headers/
---

Users can set up two kinds of headers when configuring GraphQL APIs:

- Introspection headers
- Request headers

Both types of headers can be set in Advanced Options tab in Tyk Dashboard.

### Introspection headers

Tyk Dashboard can introspect any upstream GraphQL API and download a copy of the current schema. That schema will be displayed in Schema tab.

For protected upstreams, where authorization is required for introspection, Tyk allows to persist authorization headers in the GQL API configuration using **Introspection headers**.

{{< img src="/img/dashboard/graphql/introspection-headers.png" alt="Introspection headers" >}}


