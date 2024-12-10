---
title: Tyk Pump Release Notes
date: 2024-02-02T26:33:11Z
description: "Release notes documenting updates, enhancements and changes for Tyk Pump versions within the 1.11.X series."
tags: ["Tyk Pump", "Release notes", "v1.11", "changelog"]
aliases:
  - /product-stack/tyk-pump/release-notes/pump-1.10
  - /product-stack/tyk-pump/release-notes/pump-1.11
  - /product-stack/tyk-pump/release-notes/pump-1.9
  - /release-notes/pump-1.8
---

**Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))

**This page contains all release notes for Pump displayed in a reverse chronological order**

## Support Lifetime

Our minor releases are supported until our next minor comes out.

---

## 1.11 Release Notes

### 1.11.1 Release Notes

#### Release Date 04 December 2024

#### Release Highlights

This patch release focuses on critical dependency updates to address security vulnerabilities and maintain compatibility with the latest tools. Users are encouraged to upgrade to benefit from enhanced security and improved stability.

#### Breaking Changes
This release has no breaking changes.

#### Dependencies

##### 3rd Party Dependencies & Tools

With PostgreSQL v11 reaching [EOL](https://www.postgresql.org/support/versioning/) in November 2023, we can no longer guarantee full compatibility with this version of the database. If you are [using PostgreSQL]({{< ref "planning-for-production/database-settings/postgresql" >}}) we recommend that you upgrade to a version that we have tested with, as indicated below.

| Third Party Dependency                                    | Tested Versions   | Compatible Versions      | Comments                   |
| --------------------------------------------------------- | ----------------- | ------------------------ | -------------------------- |
| [MongoDB](https://www.mongodb.com/try/download/community) | 5.x, 6.x, and 7.0 | 4.4.x, 5.x, 6.x, and 7.0 | Used by Tyk Dashboard      |
| [PostgreSQL](https://www.postgresql.org/download/)        | 12.x - 16.x    | 12.x - 16.x              | Used by Tyk Dashboard      |
| [Redis](https://redis.io/download/)                       | 6.x - 7.0         | 6.x - 7.x                | Used by all Tyk components |

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
For users currently on v1.11.0, we strongly recommend promptly upgrading to the latest release. If you are working with an older version (lower major), it is advisable to bypass version 1.11.0 and proceed directly to this latest patch release.
<br/>
Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.

#### Downloads
- [Docker Image v1.11.1](https://hub.docker.com/r/tykio/tyk-pump-docker-pub/tags?page=&page_size=&ordering=&name=v1.11.1)
  - ```bash
    docker pull tykio/tyk-pump-docker-pub:v1.11.1
    ```
- Source code tarball for OSS - [GH Tyk Pump Repo](https://github.com/TykTechnologies/tyk-pump/releases/tag/v1.11.1)

#### Changelog {#Changelog-v1.11.1}
  
##### Changed

<ul>
<li>
<details>
<summary>Upgraded Golang to v1.22.7</summary>

Updated to the [Go v1.22.7](https://go.dev/doc/devel/release#go1.22) to leverage its performance improvements, bug fixes, and security patches.  

</details>
</li>
</ul>

##### Security Fixes
- Fixed the following CVEs:
    - [GHSA-7jwh-3vrq-q3m8](https://github.com/jackc/pgproto3/security/advisories/GHSA-7jwh-3vrq-q3m8)
    - [GHSA-mrww-27vc-gghv](https://github.com/advisories/GHSA-mrww-27vc-gghv)
    - [GO-2024-2611](https://pkg.go.dev/vuln/GO-2024-2611)
 
---

### 1.11.0 Release Notes

#### Release Date 13 August 2024

#### Breaking Changes
This release has no breaking changes.

#### Dependencies

##### 3rd Party Dependencies & Tools

With PostgreSQL v11 reaching [EOL](https://www.postgresql.org/support/versioning/) in November 2023, we can no longer guarantee full compatibility with this version of the database. If you are [using PostgreSQL]({{< ref "planning-for-production/database-settings/postgresql" >}}) we recommend that you upgrade to a version that we have tested with, as indicated below.

| Third Party Dependency                                    | Tested Versions   | Compatible Versions      | Comments                   |
| --------------------------------------------------------- | ----------------- | ------------------------ | -------------------------- |
| [GoLang](https://go.dev/dl/)                              | 1.19, 1.20, 1.21  | 1.19, 1.20, 1.21         | All our binaries           |
| [MongoDB](https://www.mongodb.com/try/download/community) | 5.x, 6.x, and 7.0 | 4.4.x, 5.x, 6.x, and 7.0 | Used by Tyk Dashboard      |
| [PostgreSQL](https://www.postgresql.org/download/)        | 12.x - 16.x    | 12.x - 16.x              | Used by Tyk Dashboard      |
| [Redis](https://redis.io/download/)                       | 6.x - 7.0         | 6.x - 7.x                | Used by all Tyk components |

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations

There are no deprecations in this release.

#### Upgrade instructions

For users currently on v1.10.X, we strongly recommend promptly upgrading to the latest release. If you are working with an older version, it is advisable to bypass version 1.10 and proceed directly to this latest release.

#### Release Highlights

##### Security fixes
This release focuses on improving security and compliance, enhancing integration capabilities, and ensuring robust performance in secure environments.

#### Downloads
- [Docker Image v1.11.0](https://hub.docker.com/r/tykio/tyk-pump-docker-pub/tags?page=&page_size=&ordering=&name=v1.11)
- ```bash
  docker pull tykio/tyk-pump-docker-pub:v1.11.0
  ```
- Source code tarball for OSS - [GH Tyk Pump Repo](https://github.com/TykTechnologies/tyk-pump/releases/tag/v1.11.0)

#### Changelog {#Changelog-v1.11.0}


##### Added

<ul>
<li>
<details>
<summary>Add Kinesis backend support </summary>

Tyk Pump now supports Kinesis as a backend to push analytics to a data lake efficiently.

</details>
</li>

</ul>

---

## 1.10 Release Notes

### Release Date 3 July 2024

### Breaking Changes
This release has no breaking changes.

### Dependencies

#### 3rd Party Dependencies & Tools

With PostgreSQL v11 reaching [EOL](https://www.postgresql.org/support/versioning/) in November 2023, we can no longer guarantee full compatibility with this version of the database. If you are [using PostgreSQL]({{< ref "planning-for-production/database-settings/postgresql" >}}) we recommend that you upgrade to a version that we have tested with, as indicated below.

| Third Party Dependency                                    | Tested Versions   | Compatible Versions      | Comments                   |
| --------------------------------------------------------- | ----------------- | ------------------------ | -------------------------- |
| [GoLang](https://go.dev/dl/)                              | 1.19, 1.20, 1.21  | 1.19, 1.20, 1.21         | All our binaries           |
| [MongoDB](https://www.mongodb.com/try/download/community) | 5.x, 6.x, and 7.0 | 4.4.x, 5.x, 6.x, and 7.0 | Used by Tyk Dashboard      |
| [PostgreSQL](https://www.postgresql.org/download/)        | 12.x - 16.x    | 12.x - 16.x              | Used by Tyk Dashboard      |
| [Redis](https://redis.io/download/)                       | 6.x - 7.0         | 6.x - 7.x                | Used by all Tyk components |

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Deprecations

There are no deprecations in this release.

### Upgrade instructions

For users currently on v1.9.X, we strongly recommend promptly upgrading to the latest release. If you are working with an older version, it is advisable to bypass version 1.9 and proceed directly to this latest release.

### Release Highlights

#### FIPS Compliance

Tyk Pump now offers [FIPS 140-2](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.140-2.pdf) compliance. For further details please consult [Tyk API Management FIPS support]({{< ref "developer-support/release-notes/special-releases#fips-releases" >}})

#### Security fixes
This release focuses on improving security and compliance, enhancing integration capabilities, and ensuring robust performance in secure environments.

### Downloads
- [Docker Image v1.10.0](https://hub.docker.com/r/tykio/tyk-pump-docker-pub/tags?page=&page_size=&ordering=&name=v1.10)
- ```bash
  docker pull tykio/tyk-pump-docker-pub:v1.10.0
  ```
- Source code tarball for OSS - [GH Tyk Pump Repo](https://github.com/TykTechnologies/tyk-pump/releases/tag/v1.10.0)

### Changelog {#Changelog-v1.10.0}

#### Added

<ul>
<li>
<details>
<summary>Added FIPS compliance</summary>

Added [FIPS compliance]({{< ref "developer-support/release-notes/special-releases#fips-releases" >}}) for Tyk Pump.
</details>
</li>
</ul>


#### Fixed

<ul>
<li>
<details>
<summary>Fixed Tyk Pump Splunk Integration using http_proxy and https_proxy Environment Variables</summary>

Resolved an issue where `http_proxy` and `https_proxy` environment variables were not being respected in the Tyk Pump pod for Splunk connections.

</details>
</li>

</ul>

#### Security Fixes

<ul>
<li>
<details>
<summary>Fixed the following CVEs</summary>
<ul>
<li>PRISMA-2021-0108</li>
<li>PRISMA-2023-0056</li>
<li>[CVE-2024-27304](https://nvd.nist.gov/vuln/detail/CVE-2024-27304)</li>
<li>[CVE-2023-45288](https://nvd.nist.gov/vuln/detail/CVE-2023-45288)</li>
</ul>
</details>
</li>
</ul>

---

## 1.9 Release Notes

### Release Date 5 Apr 2024

### Breaking Changes

#### Attention: Please read this section carefully

MongoDB v4.4 will reach its [end of life support](https://www.mongodb.com/legal/support-policy/lifecycles) at the end of February 2024. In order to support newer versions of MongoDB and align with newer versions of Tyk, we have changed the default MongoDB driver from [mgo](https://github.com/go-mgo/mgo) to [mongo-go](https://github.com/mongodb/mongo-go-driver). The `mongo-go` driver supports MongoDB versions greater or equal to v4. **If you are using a version of MongoDB less than v4, please [follow this guide](https://github.com/TykTechnologies/tyk-pump#driver-type) to update the driver type to `mgo`.**

Users are strongly advised to follow the recommended [upgrade instructions](#upgrading-tyk) provided by Tyk before applying any updates.

### Dependencies

#### 3rd Party Dependencies & Tools

| Third Party Dependency                                    | Tested Versions   | Compatible Versions      | Comments                   |
| --------------------------------------------------------- | ----------------- | ------------------------ | -------------------------- |
| [GoLang](https://go.dev/dl/)                              | 1.19, 1.20, 1.21  | 1.19, 1.20, 1.21         | All our binaries           |
| [MongoDB](https://www.mongodb.com/try/download/community) | 5.x, 6.x, and 7.0 | 4.4.x, 5.x, 6.x, and 7.0 | Used by Tyk Dashboard      |
| [PostgreSQL](https://www.postgresql.org/download/)        | 11.x - 15.x LTS   | 11.x - 15.x              | Used by Tyk Dashboard      |
| [Redis](https://redis.io/download/)                       | 6.x - 7.0         | 6.x - 7.x                | Used by all Tyk components |

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Deprecations

There are no deprecations in this release.

### Upgrade instructions

For users currently on v1.8.X, we strongly recommend promptly upgrading to the latest release. If you are working with an older version, it is advisable to bypass version 1.8 and proceed directly to this latest release.

### Release Highlights

#### Redis 7 and storage library

Tyk Pump now supports Redis v7, utilizing our [storage library v1.2.0](https://github.com/TykTechnologies/storage).

#### MongoDB Driver

As of v1.9, the default MongoDB driver has been changed from `mgo` to `mongo-go`.

#### AWS Simple Queue Service Support

Thanks to a community contribution by [masoudhaghbin](https://github.com/masoudhaghbin), Tyk Pump can now pump logs to an AWS SQS instance.

#### Tyk Graph Pump

There has been a significant enhancement in Tyk Graph Pump with the removal of the dependency on the `enable_detailed_recording` setting. This change is designed to streamline operations, reduce storage requirements and enhance overall performance in production environments. By decoupling detailed recording from specific configuration options, Tyk Graph Pump now provides greater flexibility and control over data storage.


### Downloads
- [Docker Image v1.9.0](https://hub.docker.com/r/tykio/tyk-pump-docker-pub/tags?page=&page_size=&ordering=&name=v1.9.0)
- ```bash
  docker pull tykio/tyk-pump-docker-pub:v1.9.0
  ```
- Source code tarball for OSS - [GH Tyk Pump Repo](https://github.com/TykTechnologies/tyk-pump/releases/tag/v1.9.0)

### Changelog {#Changelog-v1.9.0}

#### Added

<ul>
<li>
<details>
<summary>Redis 7 Support</summary>

Tyk Pump now support Redis v7 utilizing our [storage library v1.2.0](https://github.com/TykTechnologies/storage).

</details>
</li>
<li>
<details>
<summary>Added AWS Simple Queue Service pump support</summary>

Pump can now send logs to an Amazon SQS instance. This was a [community contribution](https://github.com/TykTechnologies/tyk-pump/pull/740) co-authored by [masoudhaghbin](https://github.com/masoudhaghbin). Please follow [this guide](https://github.com/TykTechnologies/tyk-pump#SQS-config) to set up an SQS pump.

</details>

</li>
</ul>

#### Changed

<ul>
<li>
<details>
<summary>Updated Go version to v1.21</summary>

Tyk Pump now uses Go v1.21

</details>
</li>

<li>
<details>
<summary>Resurface Pump Updated</summary>

The Resurface Pump has been updated with the [following improvements](https://github.com/TykTechnologies/tyk-pump/pull/731).

- Upgrade `logger-go` dependency to version 3.3.1, which includes improvements in goroutine management, as well as a new `Stop` method for graceful shutdown.
- Add support for async data writing, by adding a bounded channel to buffer data records and process them concurrently in the background.
- Add `Shutdown` method for graceful shutdown of `ResurfacePump` backend.

Thanks to community member [Ramón Márquez](https://github.com/monrax) for updating this pump.

</details>
</li>
</ul>
 
#### Fixed

<ul>
<li>
<details>
<summary>Added backoff retry mechanism for Splunk Pump</summary>

Tyk Pump now has an expontential backoff retry mechanism for sending logs to Splunk. This mechanism mitigates the chance of losing logs if Pump should fail to send logs to Splunk. This fixes a bug where Splunk responses were not being checked correctly and fixes a bug where Pump was not closing connections after receiving responses.

</details>
</li><li>
<details>
<summary>Added a field so that GraphQL aggregated analytics will display correctly for SQL databases</summary>

For SQL databases, the GraphQL aggregated analytics record will now have a new `api_value` field so that analytics will be shown in the Dashboard correctly.

</details>
</li>
<li>
<details>
<summary>Environment variables TYK_PMP_PUMPS_AGGREGATE_* now correctly correspond to definitions in pump.conf</summary>

Fixed a bug where any `TYK_PMP_PUMPS_AGGREGATE_*` environment variables didn't correctly correspond to definitions in the pump.conf file.

</details>
</li><li>
<details>
<summary>Added an api_id field so that GraphQL aggregated analytics will display correctly</summary>

For SQL databases, the GraphQL aggregated analytics record will now have a new `api_id` field so that analytics will be shown in the Dashboard correctly.

</details>
</li>

<li>
<details>
<summary>Fixed a bug where Tyk Pump could not connect to Redis Sentinel when TLS is enabled</summary>

Fixed a bug causing Tyk Pump not to connect when Redis Sentinel was deployed using TLS.

</details>
</li>
</ul>

#### Security Fixes

<ul>
<li>
<details>
<summary>Fixed the following CVEs</summary>
<ul>
<li>
<a href="https://nvd.nist.gov/vuln/detail/CVE-2023-39325">CVE-2022-39325</a>
</li>
<li>
<a href="https://nvd.nist.gov/vuln/detail/CVE-2023-3978">CVE-2022-3978</a>
</li>
</ul>
</details>
</li>
</ul>

#### Community Contributions

Special thanks to the following members of the Tyk community for their contributions to this release:

<ul>
<li>
<details>
<summary>Added Simple Queue Service pump support</summary>

Pump can now [send logs](https://github.com/TykTechnologies/tyk-pump/pull/740) to an Amazon SQS instance.
Thanks to [masoudhaghbin](https://github.com/masoudhaghbin) for creating this pump. Please follow [this guide](https://github.com/asdf) to set up an SQS pump.

</details>

</li>

<li>
<details>
<summary>Resurface Pump Updated</summary>

The Resurface Pump has been updated with the [following improvements](https://github.com/TykTechnologies/tyk-pump/pull/731).

- Upgrade `logger-go` dependency to version 3.3.1, which includes improvements in goroutine management, as well as a new `Stop` method for graceful shutdown.
- Add support for async data writing, by adding a bounded channel to buffer data records and process them concurrently in the background.
- Add `Shutdown` method for graceful shutdown of `ResurfacePump` backend.

Thanks to community member [Ramón Márquez](https://github.com/monrax) for updating this pump.

</details>
</li>
</ul>

---

## 1.8 Release Notes

### 1.8.3 Release Notes

#### Changelog

##### Fixed
- Corrected configuration for _pumps.kafka.meta.timeout_ to be interpreted as the number of seconds (_Type: int_) instead of a duration requiring a unit (_Type: Duration_).
- Fixed an issue where _Graph SQL Pump_ couldn't restart correctly when analytics storage table name was changed in Pump config. Some relations were not torn down and migrated correctly.

### 1.8.2 Release Notes

#### Changelog

##### Fixed
- Resolved performance issue where _SQL Aggregate_ analytics failed to load on the _Dashboard_ during heavy traffic by introducing a new index on the _sql_aggregate_ Pump called _idx_dimension_.
- Fixed _Prometheus Pump_ crashes on non UTF-8 URLs by updating to _prometheus-client_ v1.16.
- Fixed _MongoDB_ connection string issues related to certain characters ("?" and "@"), recommending URL-encoded values in usernames and passwords. This ensures compatibility with both _mgo_ and _mongo-go_ drivers.
- Fixed security vulnerabilities: _CVE-2022-36640_, _CVE-2022-21698_, _GO-2022-0322_ and _GHSA-cg3q-j54f-5p7p_.

##### Added
- Add `track_all_paths` configuration for _Prometheus Pump_. If enabled, all APIs will have path in the `tyk_http_status_per_path` metric. Otherwise, only endpoint that have "track" plugin set with have path shown in the metric. Endpoints without “track” plugin set will have “unknown” path shown in the metric.

##### Updated
- Improved security by obfuscating _Mongo Pump_ credentials in log outputs.

### 1.8.1 Release Notes

{{< note >}}#### Notes on MongoDB v5 and v6 compatibility

For MongoDB v5 and v6 users, please [set mongo driver type](https://github.com/TykTechnologies/tyk-pump#driver-type) to `mongo-go`.

From pump v1.8.1, the default MongoDB driver it uses is [mgo](https://github.com/go-mgo/mgo). This is to align with the default MongoDB driver of other Tyk components. This driver supports MongoDB versions up to v4. If you are using a later version of MongoDB v5 or MongoDB v6, please [follow this guide to update the driver type](https://github.com/TykTechnologies/tyk-pump#driver-type) to [mongo-go](https://github.com/mongodb/mongo-go-driver).
{{< /note >}}

#### Changelog

##### Fixed
- GraphQL analytics records were being excluded from the _tyk_analytics_ collection for Mongo Pump. This has been fixed so that GraphQL analytic records are now included as expected.
- Fixed MongoDB connection issue when using a password with URL escape characters (with mongo-go driver)
- Fixed an issue in Prometheus pump when filtering fields , e.g. _API Name_, that contain `--` in their value. For example, `test--name`. Prometheus Pump filtered the field as two separate instances, e.g. `test` & `name`, instead of the expected `test--name`.
- When [`omit_configfile`]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables.md#omit_config_file" >}}) is set to `true`, Pump will not try to load the config file and spit out error logs

##### Updated
- Updated the default Hybrid Pump RPC pool size from 20 to 5 connections in order to reduce default CPU and memory footprint. See [Pump configurations]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables.md#pumpshybridmetarpcpoolsize" >}})
- Import and use latest [storage library v1.0.5](https://github.com/TykTechnologies/storage/releases/tag/v1.0.5)
- Updated default MongoDB driver to `mgo`. [Follow this guide to update the driver type](https://github.com/TykTechnologies/tyk-pump#driver-type)
- Pump name is now case-insensitive. It will override two or more pumps with the same name but in different cases (e.g. _Mongo_ / _mongo_)


### 1.8.0 Release Notes
Release date: 2023-05-04

#### Major features
Pump 1.8 introduces two new pumps: The GraphQL SQL Aggregate Pump - which allows you to transfer GraphQL transaction logs to SQL; and Resurface Pump - which allows you to transfer data to [Resurface.io](http://resurface.io/) for context based security analysis. 

We have changed the default MongoDB driver from [mgo](https://github.com/go-mgo/mgo) to [mongo-go](https://github.com/mongodb/mongo-go-driver). The new driver supports MongoDB versions greater or equal to v4. If you are using older version of MongoDB v3.x, please [follow this guide to update the driver type](https://github.com/TykTechnologies/tyk-pump#driver-type).

We have also added a config option that allow you to decode the raw requests and responses for all pumps so you don't need to worry about processing them in your data pipeline. For demo mode, there is now an option to generate future data for your convenience.

In this release, we are using a new Tyk storage library to connect to Mongo DB. This would allow us to switch to use the official Mongo Driver very easily in the future.

{{< note >}}
#### Notes on MongoDB v3.x compatibility

In 1.8.0, the default MongoDB driver it use is [mongo-go](https://github.com/mongodb/mongo-go-driver). This driver supports MongoDB versions greater or equal to v4. If you are using older version of MongoDB v3.x, please [follow this guide to update the driver type](https://github.com/TykTechnologies/tyk-pump#driver-type).
{{< /note >}}

#### Changelog

##### Added
- Added GraphQL SQL Aggregate Pump.
- Added Resurface Pump - Resurface can provide context-based security analysis for attack and failure triage, root cause, threat and risk identification based on detailed API logs sent from Tyk Pump.
- Add config option raw_request_decoded and raw_response_decoded for decoding from base64 the raw requests/responses fields before writing to Pump. This is useful if you want to search for specific values in the raw request/response. Both are disabled by default. This setting is not available for Mongo and SQL pumps, since the dashboard will decode the raw request/response.
- Add the ability to generate future data in demo mode using --demo-future-data flag. 
- Remove critical CVE go.uuid vulnerability 
- Use the latest Tyk storage library to connect to Mongo 
- Hybrid Pump refactoring - we now have better RPC connection control, testability, and documentation 

##### Fixed
- Std pump does not log accurate time when set to json format 
- GraphPump doesn’t include names of queries/mutation and subscriptions called 
- Mongo Pump’s connection hangs forever if misconfigured 

## Further Information

### Upgrading Tyk

Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance on the upgrade strategy.

### FAQ

Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
