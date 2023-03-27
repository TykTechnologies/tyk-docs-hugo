---
title: "GQL APIs headers"
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

## Introspection headers

Tyk Dashboard can introspect any upstream GraphQL API and download a copy of the GQL schema. That schema will be displayed in Schema tab.

For protected upstreams, where authorization is required for introspection, Tyk allows to persist authorization headers in the GQL API configuration using **Introspection headers**.

{{< img src="/img/dashboard/graphql/introspection-headers.png" alt="Introspection headers" >}}

Any header key/value pair defined in **Introspection headers** will only be used while making an introspection call from Tyk Dashboard to the upstream. Those headers will not be used while proxying requests from consumers to the upstream.

**Introspection headers** can also be configured in the raw API definition:

```{.shell}
...
"graphql": {
      "execution_mode": "proxyOnly",
      "proxy": {
        "auth_headers": {
          "admin-auth": "token-value"
        }
      }
```

## Request headers

It is possible to enrich any GQL request proxied through Tyk Gateway with additional information in the headers. For that purpose users should configure **Request headers** in Tyk Dashboard.

{{< img src="/img/dashboard/graphql/headers-gql-request.png" alt="Request headers" >}}

**Request headers** values can be defined as context variables. To know how to refer to request context variables check this [page]({{< ref "content/context-variables.md">}}).

Any header key/value pair defined in **Request headers** will only be used to inject headers into requests proxied through the Gateway. It will not be used to introspect the upstream schema from Tyk Dashboard.

**Request headers** can also be configured in the raw API definition:

```{.shell}
...
"graphql": {
      "execution_mode": "proxyOnly",
      "proxy": {
        "request_headers": {
          "context-vars-metadata": "$tyk_context.path",
          "static-metadata": "static-value"
        }
      }
```
