---
title: Tyk Dashboard v4.0
description: "Tyk Dashboard 4.1 release notes"
tags: ["release notes", "Tyk Dashboard", "v4.1", "4.0"]
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

## SQL database support
The other major capability in Tyk 4.0 is that the Tyk Dashboard can store its data in a SQL  relational database. 

Until now, Tyk Dashboard has used MongoDB for storing everything from data such as APIs, policies and users through to analytics and logs. MongoDB is still a great storage choice for most projects. However, not all users have MongoDB as part of their tech stack. Some are in heavily regulated industries which means adding it would be a pain. For others, the document storage type and lack of proper ACID transaction support may not be the best solution. These users can now choose a SQL database solution instead. 

From version 4.0, Tyk Dashboard and Tyk Pump will support four data storage layers, which can be configured separately, each with a different officially supported database solution (if needed). All data stored in SQL databases will provide the same information in the Dashboard that MongoDB did.

While SQL support for Tyk products does not depend on specific database features, with this release, we will provide official support for [PostgreSQL DB for production purposes]({{< ref "/content/planning-for-production/database-settings.md" >}}), and SQLite for development and PoC environments. Note that SQL support is available for self-managed setups only.

As part of SQL support we are also providing tooling to perform seamless migration of your Dashboard data from Mongo to SQL. However, at the moment migration of analytics data is not supported.
[MongoDB to SQL migration docs]({{< ref "/content/planning-for-production/database-settings/postgresql.md#migrating-from-an-existing-mongodb-instance" >}})

## Other minor changes
- Now it is possible to configure GraphQL upstream authentification, in order for Tyk to work with its schema
- JWT scopes now support arrray and comma delimeters
- Go plugins can be attached on per-endpoint level, similar to virtual endpoints

# Updated Versions
Tyk Dashboard 4.0
Tyk Pump 1.5

# Upgrade process

Follow the [standard upgrade guide]({{< ref "/content/upgrading-tyk.md" >}}), there are no breaking changes in this release.

If you want switch from MongoDB to SQL, you can [use our migration tool]({{< ref "/content/planning-for-production/database-settings/postgresql.md#migrating-from-an-existing-mongodb-instance" >}}), but keep in mind that it does not yet support the migration of your analytics data.
 
