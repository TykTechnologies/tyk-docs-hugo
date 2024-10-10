---
title: Tyk Pump v1.9 Release Notes
date: 2024-02-02T26:33:11Z
description: "Release notes documenting updates, enhancements and changes for Tyk Pump versions within the 1.9.X series."
tags: ["Tyk Pump", "Release notes", "v1.9", "changelog"]
---

**Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))

**This page contains all release notes for version 1.9.X displayed in a reverse chronological order**

## Support Lifetime

Our minor releases are supported until our next minor comes out. This would be v1.9.1 scheduled in Q2 if this goes ahead as planned.

---

## 1.9 Release Notes

### Release Date 5 Apr 2024

### Breaking Changes

##### Attention: Please read this section carefully

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

## Further Information

### Upgrading Tyk

Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance on the upgrade strategy.

### FAQ

Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
