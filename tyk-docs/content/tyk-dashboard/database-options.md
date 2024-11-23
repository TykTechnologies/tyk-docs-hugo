---
title: "Database Options"
date: 2021-08-04
tags: ["Database", "Options", "Data storage", "MongoDB", "SQL", "PostgreSQL", "Dashboard"]
description: "The database platforms Tyk supports for the Tyk Dashboard"
weight: 2
menu: 
    main:
        parent: "Tyk Dashboard"
---

## Introduction
Tyk Dashboard requires a persistent datastore for its operations. By default MongoDB is used. From Tyk v4.0, we also support PostgreSQL. 

## MongoDB Supported Versions and Drop-in Replacement

{{< include "mongodb-versions-include" >}}

### Configuring MongoDB

Please check [here]({{< ref "migration-to-tyk#mongodb-sizing" >}}) for MongoDB driver and production configurations.

## PostgreSQL Supported Versions and Drop-in Replacement

{{< include "sql-versions-include" >}}

{{< note success >}}
**Note** 

SQLite support will be deprecated from Tyk 5.7.0. To avoid disrupution, please transition to PostgreSQL, MongoDB or one of the listed compatible alternatives.
{{< /note >}}

### Configuring PostgreSQL

Please check [here]({{< ref "migration-to-tyk#configuring-postgresql" >}}) for production configurations.

See the following pages for configuring your SQL installation with Tyk:

* [Configuring Tyk Dashboard]({{< ref "/migration-to-tyk#configuring-postgresql" >}})
* [Configuring Tyk Pumps]({{< ref "/migration-to-tyk#configuring-postgresql" >}})

All data stored in SQL platforms will be identical to our existing MongoDB support.

## Which platform should you use?

We recommend the following:

* For PoC installations, you can use any of the following platforms (SQLite, PostgreSQL or MongoDB).
* For production installations, we **only** support MongoDB or PostgreSQL

