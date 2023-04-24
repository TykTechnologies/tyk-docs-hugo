---
title: "Database Options"
date: 2021-08-04
tags: ["Database", "Options", "MongoDB", "SQL", "PostgreSQL", "Dashboard"]
description: "The database platforms Tyk supports for the Tyk Dashboard"
weight: 2
menu: 
    main:
        parent: "Tyk Dashboard"
---

## Introduction
Tyk Dashboard reuqires a persistent datastore for its operations. By default MongoDB is used. From Tyk v4.0, we also support PostgreSQL. 

### MongoDB Support Versions
MongoDB is our default storage option. We support following versions:
* MongoDB 4.4.x

You can also use the following as a drop-in replacement for MongoDB:
* Amazon DocumentDB (v3.6, 4.0)
* Azure CosmosDB for MongoDB (v3.6, 4.0)

### PostgreSQL Support Versions
We support the latest minor of following PostgreSQL versions:
* PostgreSQL version 11.x, 12.x, 13.x, 14.x, 15.x

In a production environment, we **only** support the PostgreSQL versions listed above.

For POC, you can also use the following as replacement:
* SQLite 3.x

## Other v4.0 Database features

As well as SQL platform support, we have introduced 4 separate data storage layers. You can configure each layer separately to use one of our supported database platforms, or use a single platform for all layers. The data storage layers are as follows:
1. `main` storage for APIs, Policies, Users, User Groups.
2. `analytics` used for displaying all charts and analytics screens.
3. `logs` log storage as used in the log browser page.
4. `uptime` storing uptime tests analytics.

All data stored in SQL platforms will be identical to our existing MongoDB support.

## Which platform should you use?

We recommend the following:

* For PoC installations, you can use any of the following platforms (SQLite, PostgreSQL or MongoDB).
* For production installations, we **only** support MongoDB or PostgreSQL

## Configuring SQL

See the following pages for configuring your SQL installation with Tyk:

* [Configuring Tyk Dashboard]({{< ref "/content/planning-for-production/database-settings/postgresql.md" >}})
* Configuring Tyk Pumps [Configuring Tyk Pumps]({{< ref "/content/planning-for-production/database-settings/postgresql.md" >}})
