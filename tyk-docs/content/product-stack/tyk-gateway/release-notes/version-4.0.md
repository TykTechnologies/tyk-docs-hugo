---
title: Tyk Gateway v4.0
description: "Tyk Gateway 4.0 release notes"
tags: ["release notes", "Tyk Gateway", "v4.0", "4.0"]
aliases:
    - /release-notes/version-4.0/
---

## GraphQL federation

As we know, ease-of-use is an important factor when adopting GraphQL. Modern enterprises have dozens of backend services and need a way to provide a unified interface for querying them. Building a single, monolithic GraphQL server is not the best option. It is hard to maintain and leads to a lot of dependencies and over-complication.

To remedy this, Tyk 4.0 offers GraphQL federation that allows the division of GraphQL implementation across multiple backend services, while still exposing them all as a single graph for the consumers. Subgraphs represent backend services and define a distinct GraphQL schema. A subgraph can be queried directly, as a separate service or federated in the Tyk Gateway into a larger schema of a supergraph – a composition of several subgraphs that allows execution of a query across multiple services in the backend.

[Federation docs]({{< ref "/content/getting-started/key-concepts/graphql-federation.md" >}})

[Subgraphs and Supergraphs docs]({{< ref "/content/getting-started/key-concepts/graphql-federation.md#subgraphs-and-supergraphs" >}})

## GraphQL subscriptions

Subscriptions are a way to push data from the server to the clients that choose to listen to real-time messages from the server, using the WebSocket protocol. There is no need to enable subscriptions separately; Tyk supports them alongside GraphQL as standard.

With release 4.0, users can federate GraphQL APIs that support subscriptions. Federating subscriptions means that events pushed to consumers can be enriched with information from other federated graphs.

[Subscriptions docs]({{< ref "/content/getting-started/key-concepts/graphql-subscriptions.md" >}})

## Other minor changes
- Now it is possible to configure GraphQL upstream authentification, in order for Tyk to work with its schema
- JWT scopes now support array and comma delimeters
- Go plugins can be attached on per-endpoint level, similar to virtual endpoints

# Updated Versions
Tyk Gateway 4.0
Tyk Pump 1.5

# Upgrade process

Follow the [standard upgrade guide]({{< ref "/content/upgrading-tyk.md" >}}), there are no breaking changes in this release.

If you want switch from MongoDB to SQL, you can [use our migration tool]({{< ref "/content/planning-for-production/database-settings/postgresql.md#migrating-from-an-existing-mongodb-instance" >}}), but keep in mind that it does not yet support the migration of your analytics data.
 
