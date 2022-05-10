---
title: "Database Settings"
date: 2021-08-04
tags: ["Production", "Database", "MongoDB", "SQL", "PostgreSQL", "Redis"]
description: "Your database options and configuration when installing Tyk in a production environment"
weight: 0
menu:
  main:
    parent: "Planning for Production"
url: "/planning-for-production/database-settings"
---

## Introduction

Up to Tyk v3.2, we support the following database platforms for your Tyk Dashboard analytics:

* MongoDB 3.x to 4.4.x (the default)
* Amazon DocumentDB 

From v4.0, we have added SQL support. In a production environment, we support the following PostgreSQL versions:

13.3, 12.7, 11.12, 10.17, 9.6.22

This section provides details on the following:

* [Redis and MongoDB setup]({{< ref "/content/planning-for-production/redis-mongodb.md" >}})
* [Redis and MongoDB sizing]({{< ref "/content/planning-for-production/redis-mongodb-sizing.md" >}})
* [SQL configuration]({{< ref "/content/planning-for-production/database-settings/sql-configuration.md" >}})
