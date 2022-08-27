---
title: "SQL Configuration"
date: 2021-08-04
tags: ["SQL", "PostgreSQL", "SQLite", "Configuration", "Dashboard"]
description: "How to configure the Tyk Dashboard with a SQL database"
weight: 3
menu:
  main:
    parent: "Database Settings"
url: "/planning-for-production/database-settings/sql"
---

## Introduction

How you configure your SQL platform depends on whether you are installing Tyk from fresh using our supported SQL platforms, or are migrating from an existing MongoDB instance.

## Prerequisites

In a production environment, Tyk only supports the following PostgreSQL versions in v4.0.0:

* PostgreSQL - versions 13.3, 12.7, 11.12, 10.17, 9.6.22


## Migrating from an existing MongoDB instance

For v4.0 we have provided a migration command that will help you migrate all data from the main storage layer (APIs, Policies, Users, UserGroups, Webhooks, Certificates, Portal Settings, Portal Catalogues, Portal Pages, Portal CSS etc.).

{{< note success >}}
**Note**  

The migration tool will not migrate any Logs, Analytics or Uptime analytics data.
{{< /note >}}

1. Make sure your new SQL platform and the existing MongoDB instance are both running
2. Configure the `main` part of  `storage` section of your `tyk-analytics.conf`:

```
{
...
  "storage": {
    ...
    "main": {
      "type": "postgres",
      "connection_string": "user=root password=admin database=tyk-demo-db host=tyk-db port=5432"
    }
  }
} 
```
3. Run the following command:

```{copy.Wrapper}
./tyk-analytics migrate-sql
```
You will see output listing the transfer of each database table. For example: `Migrating 'tyk_apis' collection. Records found: 7`.

4. You can now remove your `mongo_url` (or `TYK_DB_MONGOURL` environment variable) from your `tyk-analytics.conf`
5. Restart your Tyk Dashboard
