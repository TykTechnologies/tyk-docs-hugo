---
title: Pump v1.8
menu:
  main:
    parent: "Release Notes"
weight: 300
---
## 1.8.3

### Changelog

#### Fixed
- Corrected configuration for _pumps.kafka.meta.timeout_ to be interpreted as the number of seconds (_Type: int_) instead of a duration requiring a unit (_Type: Duration_).
- Fixed an issue where Graph SQL Pump couldn't restart correctly when analytics storage table name was changed in pump config. Some relations were not torn down and migrated correctly.

## 1.8.2

### Changelog

#### Fixed
- Resolved performance issue where SQL Aggregate analytics failed to load on the Dashboard during heavy traffic by introducing a new index on the sql_aggregate pump called idx_dimension.
- Fixed Prometheus Pump crashes on non UTF-8 URLs by updating to prometheus-client v1.16.
- Addressed MongoDB connection string issues related to certain characters ("?" and "@") by recommending URL-encoded values in usernames and passwords, ensuring compatibility with both mgo and mongo-go drivers.
- Applied fixes for security vulnerabilities: CVE-2022-36640, CVE-2022-21698, GO-2022-0322, GHSA-cg3q-j54f-5p7p.

#### Added
- Add `track_all_paths` configuration for Prometheus Pump. If enabled, all APIs will have path in the `tyk_http_status_per_path` metric. Otherwise, only endpoint that have "track" plugin set with have path shown in the metric. Endpoints without “track” plugin set will have “unknown” path shown in the metric.

#### Updated
- Improved security by obfuscating Mongo Pump credentials in log outputs.

## 1.8.1

{{< note >}}### Notes on MongoDB v5 and v6 compatibility

For MongoDB v5 and v6 users, please [set mongo driver type](https://github.com/TykTechnologies/tyk-pump#driver-type) to `mongo-go`.

From pump v1.8.1, the default MongoDB driver it uses is [mgo](https://github.com/go-mgo/mgo). This is to align with the default MongoDB driver of other Tyk components. This driver supports MongoDB versions up to v4. If you are using a later version of MongoDB v5 or MongoDB v6, please [follow this guide to update the driver type](https://github.com/TykTechnologies/tyk-pump#driver-type) to [mongo-go](https://github.com/mongodb/mongo-go-driver).
{{< /note >}}

### Changelog

#### Fixed
- GraphQL analytics records were being excluded from the _tyk_analytics_ collection for Mongo Pump. This has been fixed so that GraphQL analytic records are now included as expected.
- Fixed MongoDB connection issue when using a password with URL escape characters (with mongo-go driver)
- Fixed an issue in Prometheus pump when filtering fields , e.g. _API Name_, that contain `--` in their value. For example, `test--name`. Prometheus Pump filtered the field as two separate instances, e.g. `test` & `name`, instead of the expected `test--name`.
- When [`omit_configfile`]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables.md#omit_config_file" >}}) is set to `true`, Pump will not try to load the config file and spit out error logs

#### Updated
- Updated the default Hybrid Pump RPC pool size from 20 to 5 connections in order to reduce default CPU and memory footprint. See [Pump configurations]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables.md#pumpshybridmetarpcpoolsize" >}})
- Import and use latest [storage library v1.0.5](https://github.com/TykTechnologies/storage/releases/tag/v1.0.5)
- Updated default MongoDB driver to `mgo`. [Follow this guide to update the driver type](https://github.com/TykTechnologies/tyk-pump#driver-type)
- Pump name is now case-insensitive. It will override two or more pumps with the same name but in different cases (e.g. _Mongo_ / _mongo_)


## 1.8
Release date: 2023-05-04

### Major features
Pump 1.8 introduces two new pumps: The GraphQL SQL Aggregate Pump - which allows you to transfer GraphQL transaction logs to SQL; and Resurface Pump - which allows you to transfer data to [Resurface.io](http://resurface.io/) for context based security analysis. 

We have changed the default MongoDB driver from [mgo](https://github.com/go-mgo/mgo) to [mongo-go](https://github.com/mongodb/mongo-go-driver). The new driver supports MongoDB versions greater or equal to v4. If you are using older version of MongoDB v3.x, please [follow this guide to update the driver type](https://github.com/TykTechnologies/tyk-pump#driver-type).

We have also added a config option that allow you to decode the raw requests and responses for all pumps so you don't need to worry about processing them in your data pipeline. For demo mode, there is now an option to generate future data for your convenience.

In this release, we are using a new Tyk storage library to connect to Mongo DB. This would allow us to switch to use the official Mongo Driver very easily in the future.

{{< note >}}
### Notes on MongoDB v3.x compatibility

In 1.8.0, the default MongoDB driver it use is [mongo-go](https://github.com/mongodb/mongo-go-driver). This driver supports MongoDB versions greater or equal to v4. If you are using older version of MongoDB v3.x, please [follow this guide to update the driver type](https://github.com/TykTechnologies/tyk-pump#driver-type).
{{< /note >}}

### Changelog

#### Added
- Added GraphQL SQL Aggregate Pump.
- Added Resurface Pump - Resurface can provide context-based security analysis for attack and failure triage, root cause, threat and risk identification based on detailed API logs sent from Tyk Pump.
- Add config option raw_request_decoded and raw_response_decoded for decoding from base64 the raw requests/responses fields before writing to Pump. This is useful if you want to search for specific values in the raw request/response. Both are disabled by default. This setting is not available for Mongo and SQL pumps, since the dashboard will decode the raw request/response.
- Add the ability to generate future data in demo mode using --demo-future-data flag. 
- Remove critical CVE go.uuid vulnerability 
- Use the latest Tyk storage library to connect to Mongo 
- Hybrid Pump refactoring - we now have better RPC connection control, testability, and documentation 

#### Fixed
- Std pump does not log accurate time when set to json format 
- GraphPump doesn’t include names of queries/mutation and subscriptions called 
- Mongo Pump’s connection hangs forever if misconfigured 
