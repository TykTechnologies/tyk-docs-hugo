---
title: "MongoDB Sizing"
date: 2022-09-08
tags: ["MongoDB", "Sizing"]
description: "Sizing requirements for MongoDB with a Tyk installation"
menu:
  main:
    parent: "MongoDB"
weight: 1
---

## Overview

The aggregate record size depends on the number of APIs and Keys you have. Each counter size ~50b, and every aggregated value has its own counter. 

So an hourly aggregate record is computed like this: 50 * active_apis + 50 * api_versions + 50 * active_api_keys  + 50 * oauth_keys, etc. 

The average aggregate record size (created hourly) on our cloud is about ~ 40KB (a single record includes all the aggregate stats mentioned above).

So for 1 million requests per day, it will generate 1KB * 1M request stats (1GB) + 24 * 40KB aggregate stats (~1MB).

Per month: 30GB request logs + 30MB aggregate logs

## MongoDB Working Data

Working data in terms of MongoDB is the data you query most often. The graphs displayed on the Tyk Dashboard, except for the Log browser, use aggregated data. 

So if you rely only on this kind of analytic data, you will not experience issues with working data and memory issues. It is literally hundreds of MBs. 

Even if you use the Log browser, its usage access is usually quite random, and it is unlikely that you check requests for every request. So it can't be called working data. And it is ok to store it on disk, and allow MongoDB to do the disk lookups to fetch the data. 

Note, that in order to do fast queries, even from the disk, MongoDB uses indexes. MongoDB recommends that indexes should fit into memory, and be considered working data, but only the part of the index which is commonly used. For example the last month of data. 

For an aggregate collection, the average index size is 6% from the overall collection. For requests stats it is around 30%. 


## Example
If you serve 1 million requests per day, and require fast access to the last seven days of request logs (usually way less, and the performance of the log viewer is not a concern), with 3 months of aggregated logs, the memory requirements for MongoDB can be as follows:

Request_logs_index ( 30% * (1GB * 7) ) + aggregated(3month * 30MB) ~= 2.1GB + 90MB = ~ 2.2GB

In addition to storing working data in memory, MongoDB also requires space for some internal data structures. In general multiplying the resulting number by 2x should be enough. In the above example, your MongoDB server should have around 4.4GB of available memory.

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

## MongoDB Database Storage Calculator
You can calculate your MongoDB storage requirements by entering your known values in the middle section of the calculator settings below:

{{< database-calculator >}}