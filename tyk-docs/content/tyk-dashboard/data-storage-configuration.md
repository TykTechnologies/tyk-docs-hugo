---
title: "Data Storage Configuration"
date: 2021-08-04
tags: ["Database", "Options", "MongoDB", "SQL", "PostgreSQL", "Dashboard"]
description: "How to configure Tyk data storage layers"
---

As well as SQL platform support, we have introduced 4 separate data storage layers. You can configure each layer separately to use one of our supported database platforms, or use a single platform for all layers. The data storage layers are as follows:
1. `main` storage for APIs, Policies, Users, User Groups.
2. `analytics` used for displaying all charts and analytics screens.
3. `logs` log storage as used in the log browser page.
4. `uptime` storing uptime tests analytics.

Being extensible, Tyk supports storing this data across different databases (MongoDB, MySQL and PostgreSQL). For example, Tyk can be configured to store analytics in PostgreSQL, logs in MongoDB and uptime data in MySQL.

As illustrated below it can be seen that Tyk Pump writes to one or more data storage layers. Subsequently, Tyk Dashboard reads from one or more data storage layers. 

Tyk Pump and Tyk Dashboard needs to be configured to identify the following:
- The type of data storage layer.
- The corresponding database engine.
- The database connection string.

The following sections explain how to configure Tyk Dashboard and Tyk Pump to read and write from one or more data storage layers, respectively.

## How To Configure Tyk Dashboard To Read From A Data Storage Layer

Tyk Dashboard has configuration environment variables for each data storage layer in the following format:

```console
TYK_DB_STORAGE_<LAYER>_TYPE
TYK_DB_STORAGE_<LAYER>_CONNECTIONSTRING
```

where *LAYER* can be *ANALYTICS*, *LOGS* or *UPTIME*.

For example to configure Tyk Dashboard to read logs from a mongo database the following environment variables are required:

```console
TYK_DB_STORAGE_LOGS_TYPE=mongo
TYK_DB_STORAGE_LOGS_CONNECTIONSTRING=mongodb://db_host_name:27017/tyk_analytics
```

The full set of environment variables are listed below:

```console
TYK_DB_STORAGE_LOGS_TYPE
TYK_DB_STORAGE_LOGS_CONNECTIONSTRING
TYK_DB_STORAGE_ANALYTICS_TYPE
TYK_DB_STORAGE_ANALYTICS_CONNECTIONSTRING
TYK_DB_STORAGE_UPTIME_TYPE
TYK_DB_STORAGE_UPTIME_CONNECTIONSTRING
```

## How To Configure Tyk Pump To Write To A Data Storage Layer?

Tyk Pump has configuration environment variables for writing to different data storage layers. This section provides an example for each of these data storage layers.

### How to configure writing uptime?

```console
```

### How to configure writing logs?


### How to configure writing uptime analytics?
