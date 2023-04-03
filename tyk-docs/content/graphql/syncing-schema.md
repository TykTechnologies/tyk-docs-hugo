---
title: "Syncing GQL Schema"
date: 2020-07-27
menu:
  main:
    parent: "GraphQL"
weight: 4
aliases:
    - /graphql/sync-schema/
---

A GraphQL Proxy API keeps an own copy of the upstream GraphQL schema. This also means that when the upstream GraphQL schema changes, those changes need to be transfered to the proxy schema.

For that Tyk Dashboard always saves the timestamp of the last schema change when updating a GraphQL API. This information can be used to determine if the schema is out-dated and needs to be synced with upstream again. It can be found above the schema editor.

For syncing the schema just press the resync button.

{{< note success >}}
**Note**  

Syncing schemas is only available for proxy-only GraphQL APIs and **not** for UDG.
{{< /note >}}

 {{< img src="/img/dashboard/graphql/schema_sync_new.png" alt="Sync Schema Button" >}}

 If your upstream is protected then you need to make sure you provide Tyk with the authorization details to execute introspection query correctly. You can add those detail while [creating GQL API]({{< ref "/graphql/introspection#introspection-for-protected-upstreams">}}) or using [Introspection headers]({{< ref "/graphql/gql-headers#introspection-headers">}}) later on.