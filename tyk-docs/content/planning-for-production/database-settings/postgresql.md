---
title: "PostgreSQL"
date: 2021-08-04
tags: ["SQL", "PostgreSQL", "SQLite", "Configuration", "Dashboard", "Production", "Database"]
description: "How to configure the Tyk Dashboard with a SQL database"
weight: 3
menu:
  main:
    parent: "Database Settings"
aliases:
  - /planning-for-production/database-settings/sql
---

## Introduction

How you configure your PostgreSQL installation depends on whether you are installing Tyk from fresh using PostgreSQL, or are migrating from an existing MongoDB instance.

## Supported Versions

{{< include "sql-versions-include" >}}

## Migrating from an existing MongoDB instance

For v4.0 we have provided a migration command that will help you migrate all data from the main storage layer (APIs, Policies, Users, UserGroups, Webhooks, Certificates, Portal Settings, Portal Catalogs, Portal Pages, Portal CSS etc.).

{{< note success >}}
**Note**  

The migration tool will not migrate any Logs, Analytics or Uptime analytics data.
{{< /note >}}

1. Make sure your new SQL platform and the existing MongoDB instance are both running
2. Configure the `main` part of  `storage` section of your `tyk-analytics.conf`:

```yaml
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

```console
./tyk-analytics migrate-sql
```
You will see output listing the transfer of each database table. For example: `Migrating 'tyk_apis' collection. Records found: 7`.

4. You can now remove your `mongo_url` (or `TYK_DB_MONGOURL` environment variable) from your `tyk-analytics.conf`
5. Restart your Tyk Dashboard

## PostgreSQL sizing

The aggregate record size depends on the number of APIs and Keys you have. Each counter size ~50b, and every aggregated value has its own counter. 

So an hourly aggregate record is computed like this: 50 * active_apis + 50 * api_versions + 50 * active_api_keys  + 50 * oauth_keys, etc. 

The average aggregate record size (created hourly) on our cloud is about ~ 40KB (a single record includes all the aggregate stats mentioned above).

So for 1 million requests per day, it will generate 1KB * 1M request stats (1GB) + 24 * 40KB aggregate stats (~1MB).

Per month: 30GB request logs + 30MB aggregate logs

## Audit Log storage

From Tyk Dashboard v5.7+, audit log can be configured to be stored in the database. If you choose to store the audit logs in database, you need to account for additional storage for audit logs in the database setup. The size of this table will depend on the number of operations recorded, with each record averaging 1350 to 1450 bytes.

### Audit Log Considerations

- **Data Generation**: The total size of the audit log table will depend on the number of API operations, administrative actions, and system events that are being logged.
- **Daily Estimate**: For example, logging 100,000 operations per day results in 135MB to 145MB of additional data daily.
- **Storage Growth**: Over time, this can significantly impact your storage requirements, especially in high-traffic environments or systems with comprehensive logging enabled.

### Recommendations for Housekeeping the Audit Log Table

1. **Implement Data Retention Policies:**
  Define a clear retention period based on business and regulatory requirements, such as 30, 90, or 180 days. Remove older logs that exceed the retention policy to prevent excessive storage growth.

2. **Archive Older Logs:**
  For long-term storage or compliance purposes, move older logs to external systems such as a data lake, object storage (e.g., S3), or a data warehouse.

3. **Monitor Growth Trends:**
  Use monitoring tools to track the size and growth rate of the audit log table. Adjust retention policies or resources proactively based on observed trends.

4. **Plan for Resource Scaling:**
  Audit log storage can significantly impact overall database size, especially in high-traffic environments. Plan for storage and resource scaling based on daily log growth estimates.

**Example Calculation:**

- Daily Logs: 100,000 operations/day
- Average Record Size: 1400 bytes
- Storage Growth: 100,000 × 1400 bytes/day = 140MB/day 

For 90 days: 140MB × 90 = ~12.6GB

## PostgreSQL Database Storage Calculator
You can calculate your PostgreSQL storage requirements by entering your known values in the middle section of the calculator settings below:

{{< database-calculator >}}
