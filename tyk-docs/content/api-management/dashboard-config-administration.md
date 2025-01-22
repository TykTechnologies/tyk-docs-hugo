---
title: "Dashboard - System Administration"
date: 2025-01-10
tags: ["Dashboard", "User Management", "RBAC", "Role Based Access Control", "User Groups", "Teams", "Permissions", "API Ownership", "SSO", "Single Sing On", "Multi Tenancy"]
description: "How to manage users, teams, permissions, rbac in Tyk Dashboard"
keywords: ["Dashboard", "User Management", "RBAC", "Role Based Access Control", "User Groups", "Teams", "Permissions", "API Ownership", "SSO", "Single Sing On", "Multi Tenancy"]
aliases:
  - /basic-config-and-security/security/dashboard/dashboard-api-security
  - /basic-config-and-security/security/dashboard/dashboard-admin-api
  - /basic-config-and-security/security/dashboard/organisations
  - /product-stack/tyk-dashboard/advanced-configurations/analytics/audit-log
  - /tyk-dashboard/database-options
  - /product-stack/tyk-dashboard/advanced-configurations/data-storage-configuration
---

## Introduction

## System Administration - Dashboard Administration

The Tyk Dashboard Admin API provides the following administrator level functions:
 - managing [organizations]({{< ref "basic-config-and-security/security/dashboard/organisations" >}})
 - creating initial [users]({{< ref "tyk-apis/tyk-dashboard-admin-api/users" >}}) during boot-strapping of the system
 - forcing a [URL reload]({{< ref "tyk-apis/tyk-dashboard-api/dashboard-url-reload" >}})
 - [exporting]({{< ref "tyk-apis/tyk-dashboard-admin-api/export" >}}) and [importing]({{< ref "tyk-apis/tyk-dashboard-admin-api/import" >}}) Tyk assets (orgs, APIs, policies) for backup or when migrating between environments
 - setting up [SSO integration]({{< ref "tyk-apis/tyk-dashboard-admin-api/sso" >}})

### Accessing the Dashboard Admin API
The [Tyk Dashboard Admin API]({{< ref "dashboard-admin-api" >}}) is secured using a shared secret that is set in the `tyk_analytics.conf` file. Calls to the Admin API require the `admin-auth` header to be provided, to differentiate the call from a regular Dashboard API call.

## System Administration - Organizations

Many businesses have a complex structure, for example a lot of distinct departments where each department has its own teams. You might also need to deploy and manage multiple environments such as Production, Staging and QA for different stages in your product workflow. The Tyk Dashboard is multi-tenant capable which allows you to use a single Tyk Dashboard to host separate *organizations* for each team or environment.

An Organization is a completely isolated unit, and has its own:
 - API Definitions
 - API Keys
 - Users
 - Developers
 - Domain
 - Tyk Classic Portal 

When bootstrapping your Dashboard, the first thing the bootstrap script does is to create a new default Organization.

Additional organizations can be created and managed using the [Dashboard Admin API]({{< ref "dashboard-admin-api/organisations" >}}).

### Tyk Gateway and organizations
The concept of an organization does not exist within the Tyk Gateway. Gateways only proxy and validate the rules imposed on them by the definitions and keys that are being processed, however at their core there are some security checks within the Gateway that ensure organizational ownership of objects.

Tyk allows each organization to own its own set of Gateways, for example when you want to use different hosting providers you can segregate them in terms of resources, or just for security reasons.

Self-Managed users should use [API tagging]({{< ref "advanced-configuration/manage-multiple-environments/with-tyk-on-premises#api-tagging-with-on-premises" >}}) and enforce a tagging standard across all organizations.

All actions in a Self-Managed installation of Tyk must use a base Organization, and all actions should stem from a User owned by that organization.

{{< note success >}}
**Note**

A user that does not belong to an Organization is sometimes referred to as an *unbounded user*. These users have visibility across all Organizations, but should be granted read-only access.
{{< /note >}}

## System Administration - Dashboard Audit Logs

The audit log system captures detailed records of all requests made to endpoints under the `/api` route. These audit logs can be stored either in files (in JSON or text format) or in the database, providing flexible options for log management and retrieval.

Subsequently, if hosting Tyk Dashboard within a Kubernetes cluster, please ensure that the configured log file path is valid and writeable.

The Tyk Dashboard config section contains an audit section for configuring audit logging behavior. An example is listed below.

```yaml
  ...
  "audit": {
    "enabled": true,
    "format": "json",
    "path": "/tmp/audit.log",
    "detailed_recording": false
  },
  ...
```

### Configuration Parameters

| Parameter | Description                                                                                                                                                              | Default |
| ---- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| enabled | Enable audit logging. Setting `security.audit_log_path` also enables audit logging                                                                                       | true    |
| format | Specifies audit log file format. Valid values are `json` and `text`                                                                                                      | `text`  |
| path | Path to the audit log. Overwrites `security.audit_log_path` if it was set                                                                                                |         |
| detailed_recording | Enable detailed records in the audit log. If set to `true` then audit log records will contain the http-request (without body) and full http-response including the body | `false` |
| store_type | Specifies the storage in which audit logs will be written, valid values are `file` and `db`.                                                          | `file`  |

Please consult [Tyk Dashboard Configuration Options]({{< ref "tyk-dashboard/configuration#audit" >}}) for equivalent configuration with environment variables.

#### JSON File Format

Audit records the following fields for `json` format:

| Field | Description |
| ---- | ---- |
| req_id | Unique request ID |
| org_id | Organization ID |
| date   | Date in *RFC1123* format |
| timestamp | UNIX timestamp |
| ip | IP address the request originated from |
| user | Dashboard user who performed the request |
| action | Description of the action performed (e.g. Update User) |
| method | HTTP request method |
| url | URL of the request |
| status | HTTP response status of the request |
| diff | Provides a diff of changed fields (available only for PUT requests) |
| request_dump | HTTP request copy (available if `detailed_recording` is set to `true`) |
| response_dump | HTTP response copy (available if `detailed_recording` is set to `true`) |

#### Text File Format

The `text` format outputs all fields as plain text separated with a new line and provided in the same order as `json` format.

#### Database Storage Support

In addition to file storage, audit logs can be stored in the main database (MongoDB or Postgres), this feature has been available since Tyk 5.7.0. To enable database storage set `audit.store_type` to `db`:

```yaml
...
    "audit": {
      "enabled": true,
      "store_type": "db",
      "detailed_recording": false
    }
...
```

When `store_type` is set to `db`, audit logs will be stored in the main database storage instead of a file.

#### Retrieving Audit Logs via API

Since Tyk 5.7.0 a new API endpoint has been added to allow authorized users to retrieve audit logs from the database storage. To know more about the API specifications, check out the swagger [documentation]({{<ref "tyk-dashboard-api" >}}).
To access the audit logs through the API ensure that your user account or group has been granted the "Audit Logs" RBAC group. If you do not have the necessary permissions, please contact your system administrator.

## System Administration - Supported Database

Tyk Dashboard requires a persistent datastore for its operations. By default MongoDB is used. From Tyk v4.0, we also support PostgreSQL. 

### MongoDB Supported Versions and Drop-in Replacement

{{< include "mongodb-versions-include" >}}

#### Configuring MongoDB

Please check [here]({{< ref "tyk-self-managed#mongodb" >}}) for MongoDB driver and production configurations.

### PostgreSQL Supported Versions and Drop-in Replacement

{{< include "sql-versions-include" >}}

{{< note success >}}
**Note** 

SQLite support will be deprecated from Tyk 5.7.0. To avoid disrupution, please transition to PostgreSQL, MongoDB or one of the listed compatible alternatives.
{{< /note >}}

#### Configuring PostgreSQL

Please check [here]({{< ref "#configuring-postgresql" >}}) for production configurations.

See the following pages for configuring your SQL installation with Tyk:

* [Configuring Tyk Dashboard]({{< ref "#configuring-postgresql" >}})
* [Configuring Tyk Pumps]({{< ref "#configuring-postgresql" >}})

All data stored in SQL platforms will be identical to our existing MongoDB support.

### Which platform should you use?

{{< note success >}}
**Note** 

Tyk no longer supports SQLite as of Tyk 5.7.0. To avoid disruption, please transition to [PostgreSQL]({{< ref"tyk-self-managed#postgresql" >}}), [MongoDB]({{< ref "tyk-self-managed#mongodb" >}}), or one of the listed compatible alternatives.
{{< /note >}}

We recommend the following:

* For PoC installations, you can use PostgreSQL or MongoDB.
* For production installations, we **only** support MongoDB or PostgreSQL

## System Administration - Data Storage Configuration

Tyk stores a variety of data in 4 separate data storage layers. You can configure each layer separately to use one of our supported database platforms. Alternatively a single platform can be used for all layers. The 4 data storage layers are as follows:
1. **Main**: Stores configurations of: APIs, Policies, Users and User Groups.
2. **Aggregate Analytics**: Data used to display Dashboard charts and [analytics]({{< ref "tyk-dashboard-analytics" >}}).
3. **Logs**: When [detailed logging]({{< ref "api-management/troubleshooting-debugging#capturing-detailed-logs" >}}) is enabled, request and response data is logged to storage. These logs can previewed in the Dashboard [log browser]({{< ref "tyk-stack/tyk-manager/analytics/log-browser" >}}).
4. **Uptime**: Uptime test analytics.

Being extensible, Tyk supports storing this data across different databases (MongoDB, MySQL and PostgreSQL etc.). For example, Tyk can be configured to store analytics in PostgreSQL, logs in MongoDB and uptime data in MySQL.

As illustrated below it can be seen that Tyk Pump writes to one or more external data sources via a Redis store. Conversely, Tyk Dashboard reads this data from the external data sources. 

{{< img src="/img/diagrams/diagram_docs_pump-open-source@2x.png"  alt="Tyk Dashboard Pump Architecture" >}}

The following details are required to manage this configuration:
- Data storage layer type
- Database engine
- Database connection string

The remainder of this document explains how to configure Tyk Dashboard and Tyk Pump to read and write from one or more data storage layers, respectively.

# ## How To Configure Tyk Dashboard To Read From A Data Storage Layer

Tyk Dashboard has configuration environment variables for each data storage layer in the following format:

```console
TYK_DB_STORAGE_<LAYER>_TYPE
TYK_DB_STORAGE_<LAYER>_CONNECTIONSTRING
```

where *LAYER* can be *ANALYTICS*, *LOGS* or *UPTIME*.

For example, to configure Tyk Dashboard to read logs from a mongo database, the following environment variables are required:

```console
TYK_DB_STORAGE_LOGS_TYPE=mongo
TYK_DB_STORAGE_LOGS_CONNECTIONSTRING=mongodb://db_host_name:27017/tyk_analytics
```

The full set of environment variables are listed below:

```console
TYK_DB_STORAGE_MAIN_TYPE
TYK_DB_STORAGE_MAIN_CONNECTIONSTRING
TYK_DB_STORAGE_LOGS_TYPE
TYK_DB_STORAGE_LOGS_CONNECTIONSTRING
TYK_DB_STORAGE_ANALYTICS_TYPE
TYK_DB_STORAGE_ANALYTICS_CONNECTIONSTRING
TYK_DB_STORAGE_UPTIME_TYPE
TYK_DB_STORAGE_UPTIME_CONNECTIONSTRING
```

It should be noted that Tyk will attempt to use the configuration for the *main* data storage layer when no corresponding configuration is available for logs, uptime or analytics.

Please refer to the [storage configuration]({{< ref "tyk-dashboard/configuration#storage" >}}) section to explore the parameters for configuring Tyk Dashboard to read from different storage layers.


# ## How To Configure Tyk Pump To Write To Data Storage Layers?

Please consult the Pump configuration [guide]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-dashboard-config#3-sql-uptime-pump" >}}) for an explanation of how to configure Tyk Pump to write to different storage layers.

The remainder of this section explains the *environment variables* that can be used to configure Tyk Pump to write to the following data storage layers:
- Uptime
- Aggregated Analytics
- Logs

## ## How To Configure Tyk Pump To Write Uptime Data?

Tyk Pump can be configured to write uptime data to SQL (Postgres and SQL Lite) and Mongo. The default behavior is to write to Mongo.

### ## How To Configure Tyk Pump To Write Uptime Data To A PostgreSQL Database?

Tyk Pump can be configured to write to a PostgreSQL database, using the following environment variables:

- *TYK_PMP_UPTIMEPUMPCONFIG_UPTIMETYPE*: Set to *sql* to configure Pump to store logs in a SQL based database.
- *TYK_PMP_UPTIMEPUMPCONFIG_TYPE*: Set to *postgres* to configure Pump to use a PostgreSQL database for uptime data.
- *TYK_PMP_UPTIMEPUMPCONFIG_CONNECTIONSTRING*: Set the connection string for the PostgreSQL database.

An example configuration is shown below:

```console
TYK_PMP_UPTIMEPUMPCONFIG_UPTIMETYPE=sql
TYK_PMP_UPTIMEPUMPCONFIG_TYPE=postgres
TYK_PMP_UPTIMEPUMPCONFIG_CONNECTIONSTRING=user=postgres password=topsecretpassword host=tyk-postgres port=5432 database=tyk_analytics
```

Further details for configuring an uptime SQL database are available [here]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables#uptime_pump_configuptime_type" >}})

### ## How To Configure Tyk Pump To Write Uptime Data To A Mongo Database?

Tyk Pump can be configured to write to a Mongo database, using the following environment variables:

- *TYK_PMP_UPTIMEPUMPCONFIG_UPTIMETYPE*: Set to *mongo* to configure Pump to store logs in a Mongo database.
- *TYK_PMP_UPTIMEPUMPCONFIG_MONGOURL*: Set to Mongo database connection string.
- *TYK_PMP_UPTIMEPUMPCONFIG_COLLECTIONNAME*: Set to the name of the collection used to store uptime analytics.

```console
TYK_PMP_UPTIMEPUMPCONFIG_UPTIMETYPE=mongo
TYK_PMP_UPTIMEPUMPCONFIG_MONGOURL=mongodb://db_host_name:27017/tyk_uptime_db
TYK_PMP_UPTIMEPUMPCONFIG_COLLECTIONNAME=umptime_analytics
```

Further details for configuring a Tyk Mongo Pump are available [here]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables#uptime_pump_config" >}})

## ## How to Configure Tyk Pump To Write Logs?

Tyk Pump can be configured to write logs to Mongo or SQL based databases.

### ## How To Configure Tyk Pump To Write Logs To A Mongo Database?

Tyk Pump can be configured to write to a Mongo database by setting the following environment variables:

- *TYK_PMP_PUMPS_LOGS_TYPE*: Set to *mongo* to configure Pump to store logs in a Mongo database.
- *TYK_PMP_PUMPS_LOGS_META_MONGOURL*: Set the connection string for the Mongo database.
- *TYK_PMP_PUMPS_LOGS_META_COLLECTION_NAME*: Set the name of the collection that will store logs in the Mongo database.

An example is listed below:

```console
TYK_PMP_PUMPS_LOGS_TYPE=mongo
TYK_PMP_PUMPS_LOGS_META_MONGOURL=mongodb://tyk-mongo:27017/tyk_analytics
TYK_PMP_PUMPS_LOGS_META_COLLECTIONNAME=tyk_logs
```

### ## How To Configure Tyk Pump To Write Logs To A SQL Database?

Tyk Pump can be configured to write logs to SQL based databases. This section provides examples for how to configure Tyk Pump to write to Postgres or MySQL databases.

#### ## How To Configure Tyk Pump To Write Logs To A PostgreSQL Database?

Tyk Pump can be configured to write to a PostgreSQL database by setting the following environment variables:

- *TYK_PMP_PUMPS_LOGS_TYPE*: Set to *SQL* to configure Pump to store logs in a SQL based database.
- *TYK_PMP_PUMPS_LOGS_META_TYPE*: Set to *postgres* to configure Pump to store logs in a PostgreSQL database.
- *TYK_PMP_PUMPS_LOGS_META_CONNECTIONSTRING*: Set the name of the connection string for the PostgreSQL database.

```console
TYK_PMP_PUMPS_LOGS_TYPE=SQL
TYK_PMP_PUMPS_LOGS_META_TYPE=postgres
TYK_PMP_PUMPS_LOGS_META_CONNECTIONSTRING=user=postgres password=topsecretpassword host=tyk-postgres port=5432 database=tyk_analytics
```

#### ## How To Configure Tyk Pump To Write Logs To A MySQL Database?

Tyk Pump can be configured to write to a MySQL database by setting the following environment variables:

- *TYK_PMP_PUMPS_LOGS_TYPE*: Set to *SQL* to configure Pump to store logs in a SQL based database.
- *TYK_PMP_PUMPS_LOGS_META_TYPE*: Set to *mysql* to configure Pump to store logs in a MySQL database.
- *TYK_PMP_PUMPS_LOGS_META_CONNECTIONSTRING*: Set the name of the connection string for the MySQL database.

```console
TYK_PMP_PUMPS_LOGS_TYPE=SQL
TYK_PMP_PUMPS_LOGS_META_TYPE=mysql
TYK_PMP_PUMPS_LOGS_META_CONNECTIONSTRING=mysql://db_host_name:3306/tyk_logs_db
```

## ## How To Configure Tyk Pump To Write Aggregated Analytics Data?

Aggregated analytics corresponds to data that is used for the display of charts and graphs in [dashboard]({{< ref "tyk-dashboard-analytics" >}}). Tyk Pump can be configured to write aggregated analytics data to SQL based databases or MongoDB.

### ## How To Configure Tyk Pump To Write Aggregated Analytics To A SQL Database?

{{< note success >}}
**Note** 

Tyk no longer supports SQLite as of Tyk 5.7.0. To avoid disruption, please transition to [PostgreSQL]({{< ref"tyk-self-managed#postgresql" >}}), [MongoDB]({{< ref "tyk-self-managed#mongodb" >}}), or one of the listed compatible alternatives.
{{< /note >}}

Storage of aggregated analytics data has been tested with PostgreSQL and SqlLite databases. The following environment variables can be used to manage this configuration:

- *TYK_PMP_PUMPS_SQLAGGREGATE_TYPE*: Set to *sql_aggregate* to configure Pump to store aggregated analytics data for charts and graphs in dashboard to a SQL based database.
- *TYK_PMP_PUMPS_SQLAGGREGATE_META_TYPE*: The database engine used to store aggregate analytics. Tested values are *postgres* or *sqlite*.
- *TYK_PMP_PUMPS_SQLAGGREGATE_META_CONNECTIONSTRING*: The connection string for the database that will store the aggregated analytics.

The example below demonstrates how to configure Tyk Pump to write aggregated to a PostgreSQL database:

```console
TYK_PMP_PUMPS_SQLAGGREGATE_TYPE=SQL
TYK_PMP_PUMPS_SQLAGGREGATE_META_TYPE=postgres
TYK_PMP_PUMPS_SQLAGGREGATE_META_CONNECTIONSTRING=user=postgres password=topsecretpassword host=tyk-postgres port=5432 database=tyk_aggregated_analytics
```

### ## How To Configure Tyk Pump To Write Aggregated Analytics To A Mongo Database?

Tyk Pump can be configured to write aggregated analytics data to MongoDB. Aggregated analytics are written to a collection named *z_tyk_analyticz_aggregate_{ORG ID}*, where *ORG_ID* corresponds to the ID of your organization assigned by Tyk.

The following environment variables can be used as a minimum to manage this configuration:

- *TYK_PMP_PUMPS_MONGOAGGREGATE_TYPE*: Set to *mongo-pump-aggregate* to configure Pump to store aggregated analytics data in a MongoDB database.
- *TYK_PMP_PUMPS_MONGOAGGREGATE_META_MONGOURL*: Mongo database connection URL.

An example is given below:

```console
- TYK_PMP_PUMPS_MONGOAGGREGATE_TYPE=mongo-pump-aggregate
- TYK_PMP_PUMPS_MONGOAGGREGATE_META_MONGOURL=mongodb://db_host_name:27017/tyk_aggregated_analytics_db
```
