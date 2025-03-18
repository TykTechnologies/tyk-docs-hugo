---
title: Tyk Multi Data Center Bridge Release Notes
description: "Tyk Multi Data-Center Bridge v2.7 release notes"
tags: ["release notes", "MDCB", "Tyk Multi Data-Center", "Tyk Multi Data-Center", "v2.7", "2.7"]
aliases:
  - /release-notes/mdcb/mdcb
  - /release-notes/mdcb/
  - /product-stack/tyk-enterprise-mdcb/release-notes/version-2.4
  - /product-stack/tyk-enterprise-mdcb/release-notes/version-2.5
  - /product-stack/tyk-enterprise-mdcb/release-notes/version-2.6
  - /product-stack/tyk-enterprise-mdcb/release-notes/version-2.7
  - /release-notes/mdcb-2.0
  - /release-notes/mdcb-2.1
  - /release-notes/mdcb-2.2
  - /release-notes/mdcb-2.3
  - /release-notes/mdcb-2.4
  - /release-notes/mdcb-2.5
  - /release-notes/mdcb-2.6
---

Licensed Protected Product

**This page contains all release notes for Multi Data Center Bridge displayed in reverse chronological order**

## Support Lifetime
Our minor releases are supported until our next minor comes out.

---

## 2.7 Release Notes
### 2.7.2 Release Notes

#### Release Date 03 December 2024

#### Release Highlights

##### Support Tyk 5.7
Tyk MDCB 2.7.2 has been updated to support API configurations from Tyk 5.7.0.

#### Breaking Changes
This release has no breaking changes.

#### Dependencies {#dependencies-X.Y.Z}

##### 3rd Party Dependencies & Tools
| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by MDCB | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x | 4.4.x, 5.0.x, 6.0.x, 7.0.x | Used by MDCB | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 12.x - 16.x LTS        | 12.x - 16.x            | Used by MDCB | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
For users currently on v2.7.1, we strongly recommend promptly upgrading to the latest release. If you are working with an older version (lower minor), it is advisable to bypass version 2.7.0 and proceed directly to this latest patch release.
<br/>
Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.

#### Downloads
- [Docker image v2.7.2](https://hub.docker.com/r/tykio/tyk-mdcb-docker/tags?page=&page_size=&ordering=&name=v2.7.2)
  - ```bash
    docker pull tykio/tyk-mdcb-docker:v2.7.2
    ```

#### Changelog {#Changelog-v2.7.2}

##### Updated
<ul>
 
 <li>
 <details>
 <summary>Update for compatibility with API definitions for Tyk v5.7</summary>

MDCB 2.7.2 supports Tyk API definitions up to Tyk Gateway v5.7.0. Please use MDCB 2.7.2+ with Tyk Gateway v5.7.0+.
 </details>
 </li>
 </ul>

##### Security Fixes
<ul>
 
 <li>
 <details>
 <summary>Fixed the following CVEs:</summary>
   
  - [GHSA-7jwh-3vrq-q3m8](https://github.com/jackc/pgproto3/security/advisories/GHSA-7jwh-3vrq-q3m8)
  - [GHSA-mrww-27vc-gghv](https://github.com/advisories/GHSA-mrww-27vc-gghv)
  - [GO-2024-2611](https://pkg.go.dev/vuln/GO-2024-2611)
 </details>
 </li>
 </ul>

---

### 2.7.1 Release Notes

#### Release date 10 October 2024

#### Breaking Changes
This release has no breaking changes.

#### 3rd Party Dependencies & Tools
| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by MDCB | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x | 4.4.x, 5.0.x, 6.0.x, 7.0.x | Used by MDCB | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 12.x - 16.x LTS        | 12.x - 16.x            | Used by MDCB | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
There are no deprecations in this release.

#### Release Highlights

##### Support GraphQL analytics records
MDCB (Multi-Data Center Bridge) has been enhanced to support the storage of GraphQL aggregate analytics directly. This allows for better tracking and analysis of GraphQL usage across distributed environments. This enhancement simplifies the storage and management of GraphQL analytics within MDCB, improving efficiency and ease of use.

#### Downloads
- [Docker image v2.7.1](https://hub.docker.com/r/tykio/tyk-mdcb-docker/tags?page=&page_size=&ordering=&name=v2.7.1)
- ```bash
  docker pull tykio/tyk-mdcb-docker:v2.7.1
  ```


#### Changelog {#Changelog-v2.7.1}

##### Added
<ul>
   <li>
 <details>
 <summary>Support the storage of GraphQL aggregate analytics </summary>
MDCB (Multi-Data Center Bridge) has been enhanced to support the storage of GraphQL aggregate analytics directly. This allows for better tracking and analysis of GraphQL usage across distributed environments when Gateway send analytics data directly to MDCB, which processes and sends the data to the analytics storage. This enhancement simplifies the storage and management of GraphQL analytics without Tyk Pump, improving efficiency and ease of use.
    </details>
  </li>
</ul>


##### Updated
<ul>
 
 <li>
 <details>
 <summary>Update for compatibility with API definitions for Tyk v5.6</summary>

MDCB 2.7.1 supports Tyk API definitions up to Tyk Gateway v5.6.0. Please use MDCB 2.7.1+ with Tyk Gateway v5.6.0+.
 </details>
 </li>
 </ul>
---

### 2.7.0 Release Notes

#### Release date 12 August 2024

#### Breaking Changes
This release has no breaking changes.

#### 3rd Party Dependencies & Tools
| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by MDCB | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x | 4.4.x, 5.0.x, 6.0.x, 7.0.x | Used by MDCB | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 12.x - 16.x LTS        | 12.x - 16.x            | Used by MDCB | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
There are no deprecations in this release, however with the introduction of new healthcheck endpoints we encourage customers to start using the new `/liveness` and `/readiness` endpoints and avoid using the old `/health` endpoint.

##### Recommendations for users:

- Migrate to new [health check]({{< ref "api-management/mdcb#health-check" >}}) endpoints in order to get more detailed information. For Kubernetes users, use Helm Charts v1.6 to upgrade MDCB to set liveness and readiness probes of MDCB deployment to the new health check endpoints.

#### Upgrade instructions
If you are using a 2.6.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 2.6.0 and upgrade directly to this release.

#### Release Highlights

##### New Health check probes
Two new [health check]({{< ref "api-management/mdcb#health-check" >}}) endpoints have been added to improve monitoring and diagnostics:

1. `/liveness`: This endpoint provides a quick check to determine if the MDCB application is alive and running.
2. `/readiness`: This endpoint offers a detailed status of components and dependencies required for MDCB to serve traffic. It includes status checks for:
    - Database connectivity
    - Redis connectivity
    - RPC server status

These new endpoints allow for more granular monitoring of MDCB's operational status, enabling quicker identification and resolution of potential issues.

##### New Configuration Access Endpoint
Two new `/config` and `/env` [endpoints]({{< ref "api-management/mdcb#check-mdcb-configurations" >}}) have been implemented, allowing developers to access the current configuration state of the MDCB instance in real-time. This feature provides:

- Secure access to configuration data
- Automatic redaction of sensitive information
- Up-to-date view of the running configuration

This addition enhances debugging capabilities and provides valuable insights into the MDCB instance's current settings.

Please refer to the [changelog]({{< ref "#Changelog-v2.7.0">}}) below.

#### Downloads
- [Docker image v2.7.0](https://hub.docker.com/r/tykio/tyk-mdcb-docker/tags?page=&page_size=&ordering=&name=v2.7.0)
- ```bash
  docker pull tykio/tyk-mdcb-docker:v2.7.0
  ``` 

#### Changelog {#Changelog-v2.7.0}

##### Added
<ul>
   <li>
 <details>
 <summary> Added `/liveness` endpoint for quick checks on MDCB application status </summary>
   Added `/liveness` endpoint that reports if MDCB is running. It returns status 200 if MDCB is alive. It returns status 503 if MDCB is not operational. In that case, a restart is recommended.
    </details>
  </li>
   <li>
  <details>
   <summary> Implemented `/readiness` endpoint to detail status of critical components and dependencies </summary>
   Added `/readiness` endpoint that reports if MDCB is ready to serve request. It returns status 200 if MDCB is ready. It returns status 503 if MDCB or one of the dependencies is not ready.
      </details>
  </li>
   <li>
  <details>
   <summary> Introduced `/config` endpoint for secure, real-time access to MDCB instance configuration </summary>
   Added `/config` endpoint that returns MDCB instance configuration in JSON format. It requires an administrative key provided in the `x-tyk-authorization` header for access, ensuring secure and controlled usage. Successful requests return MDCB JSON configurations with passwords and sensitive information redacted.
      </details>
  </li>
   <li>
  <details>
   <summary> Introduced `/env` endpoint for secure, real-time access to MDCB instance configuration </summary>
      Added `/env` endpoint that returns MDCB instance configuration as a list of environment variable keys and values. It requires an administrative key provided in the `x-tyk-authorization` header for access, ensuring secure and controlled usage. Successful requests returns a list of environment variable keys and values with passwords and sensitive information redacted.
      </details>
  </li>
 </details>
 </li>
 </ul>


##### Updated
<ul>
 
 <li>
 <details>
 <summary>Update for compatibility with API definitions for Tyk v5.5</summary>

MDCB 2.7.0 supports Tyk API definitions up to Tyk Gateway v5.5.0. Please use MDCB 2.7.x with Tyk Gateway v5.5.0+.
 </details>
 </li>
 </ul>
---

## 2.6 Release Notes
### 2.6.0 Release Notes

#### Release date 2 July 2024

#### Breaking Changes
This release has no breaking changes.

#### 3rd Party Dependencies & Tools
| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by MDCB | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x | 4.4.x, 5.0.x, 6.0.x, 7.0.x | Used by MDCB | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 12.x - 16.x LTS        | 12.x - 16.x            | Used by MDCB | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
Starting with MDCB v2.6.0, the configuration parameter `http_port` has been introduced to replace the original `healthcheck_port`. This new HTTP port is designed to expose various endpoints for monitoring and debugging MDCB.

##### Changes in MDCB v2.6.0:
- **New Configuration**: `http_port` is the new parameter for defining the HTTP port, with a default value of `8181`.
- **Deprecation**: The `healthcheck_port` parameter is deprecated and will no longer be used in future MDCB versions.
- **Helm Chart Update**: The MDCB Helm chart now includes the option `mdcb.probes.httpPort`, which takes precedence over `mdcb.probes.healthcheckPort`. For consistency and future compatibility, it is recommended to use `mdcb.probes.httpPort`.

##### Backward compatibility:

The `http_port` parameter is backward compatible, meaning it will function correctly with all existing MDCB versions, ensuring a smooth transition.

##### Recommendations for users:

- **Update Configurations**: Modify your MDCB configurations to use the new `http_port` parameter.

#### Upgrade instructions
If you are using a 2.5.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 2.5.0 and upgrade directly to this release.

#### Release Highlights

##### Tyk v5.4 Compatibility
MDCB 2.6.0 is an update for compatibility for synchronisation with Tyk v5.4 API Definitions.

##### Comprehensive Data Plane Node Information
MDCB 2.6 introduces a new `/dataplanes` endpoint that provides a comprehensive view of all data plane nodes connected to MDCB, including crucial metadata and status information for each node. The admin secret is required in the header to access these information.

Please refer to the [changelog]({{< ref "#Changelog-v2.6.0">}}) below.

#### Downloads
- [Docker image v2.6.0](https://hub.docker.com/r/tykio/tyk-mdcb-docker/tags?page=&page_size=&ordering=&name=v2.6.0)
- ```bash
  docker pull tykio/tyk-mdcb-docker:v2.6.0
  ``` 

#### Changelog {#Changelog-v2.6.0}

##### Security

The following CVEs have been resolved in this release:

- [PRISMA-2021-0108](https://github.com/influxdata/influxdb/issues/10292)
- [CVE-2024-27304](https://nvd.nist.gov/vuln/detail/CVE-2024-27304)
- [CVE-2023-45288](https://nvd.nist.gov/vuln/detail/CVE-2023-45288)

##### Fixed
<ul>
 <li>
 <details>
 <summary>Fixed MDCB failure when Tyk Dashboard is upgraded from v4 to v5</summary>
Fixed a bug where upgrading Tyk Dashboard from version 4 to version 5 caused an MDCB failure when using the default PostgreSQL protocol. Resolved the issue in MDCB by detecting cached plan errors, then reconnecting to the storage and rerunning the query to ensure proper functionality.
 </details>
 </li>
 
 </ul>

##### Added
<ul>
   <li>
 <details>
 <summary>Retrieve information of all the connected data plane nodes</summary>
   Adding a `/dataplanes` endpoint that offers a comprehensive view of all data plane nodes connected to MDCB. This endpoint provides crucial metadata and status information for each connected node, enabling efficient monitoring and troubleshooting. It requires an administrative key provided in the `x-tyk-authorization` header for access, ensuring secure and controlled usage. Successful requests return an array of node details, including node ID, API key, group ID, version, TTL, tags, health status, API statistics, and host details.
 </details>
 </li>
 </ul>


##### Updated
<ul>
 
 <li>
 <details>
 <summary>Update for compatibility with API definitions for Tyk v5.4</summary>

MDCB 2.6.0 supports Tyk API definitions up to Tyk Gateway v5.4.0. Please use MDCB 2.6.x with Tyk Gateway v5.4.0+.
 </details>
 </li>
 
 <li>
 <details>
 <summary>Updated to Go 1.22</summary>

   MDCB has been updated to use Go 1.22 to benefit from fixed security issues, linkers, compilers etc.
   
 </details>
 </li>
 </ul>

---

## 2.5 Release Notes
### 2.5.1 Release Notes

#### Release date 24 Apr 2024

#### Breaking Changes
This release has no breaking changes.

#### 3rd Party Dependencies & Tools
| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by MDCB | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x | 4.4.x, 5.0.x, 6.0.x, 7.0.x | Used by MDCB | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 11.x - 15.x LTS        | 11.x - 15.x            | Used by MDCB | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are using a 2.4.x or 2.5.0 version, we advise you to upgrade as soon as possible to this latest release. If you are on an older version, you should skip 2.5.0 and upgrade directly to this release.

#### Release Highlights
This release contains bug fixes as detailed in the [changelog]({{< ref "#Changelog-v2.5.1">}}) below.

#### Downloads
- [Docker image v2.5.1](https://hub.docker.com/r/tykio/tyk-mdcb-docker/tags?page=&page_size=&ordering=&name=v2.5.1)
- ```bash
  docker pull tykio/tyk-mdcb-docker:v2.5.1
  ``` 

#### Changelog {#Changelog-v2.5.1}

##### Fixed
<ul>
 <li>
 <details>
 <summary>Fixed a bug where the TYK_MDCB_HEALTHCHECKPORT was not used when MDCB was configured with TLS enabled</summary>
   
  When MDCB was configured with TLS enabled, traffic was served over HTTPS on the listen port that was configured. However, the healthcheck endpoint was exposed on the standard HTTPS port of 443 and TYK_MDCB_HEALTHCHECKPORT was not being respected.
 </details>
 </li>

 <li>
 <details>
 <summary>Fixed a bug where clearing the API cache from the Tyk Dashboard UI failed to invalidate the cache in distributed data plane gateways</summary>

  When clearing the API cache from the Tyk Dashboard UI, the cache in distributed data plane gateways was not being invalidated. *Please note that this fix requires Tyk Gateway version 5.3.1.*
 </details>
 </li>

<li>
 <details>
 <summary>Fixed a bug where PostgreSQL could not be used with MDCB 2.4.2/2.4.3 if APIs were created with version 4.0.X of the Dashboard</summary>

  MDCB v2.4.2/2.4.3 was unable to retrieve APIs when they were created using a 4.0.x Dashboard and PostgreSQL
 </details>
 </li>
 
 </ul>

---

### 2.5.0 Release Notes

##### Release date 5 Apr 2024

#### Breaking Changes
This release has no breaking changes.

#### 3rd Party Dependencies & Tools
| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by MDCB | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x | 4.4.x, 5.0.x, 6.0.x, 7.0.x | Used by MDCB | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 11.x - 15.x LTS        | 11.x - 15.x            | Used by MDCB | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are using a 2.4.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 2.4.0 and upgrade directly to this release.

#### Release Highlights

##### Tyk v5.3 Compatibility
MDCB 2.5.0 is an update for compatibility for synchronisation with Tyk v5.3 API Definitions.

##### Redis v7.x Compatibility
We have upgraded Redis driver [go-redis](https://github.com/redis/go-redis) to v9. Subsequently, Tyk 5.3 is compatible with Redis v7.x.

##### MongoDB v7.0.x Compatibility
We have upgraded mongo-go driver to [mongo-go v1.13.1](https://github.com/mongodb/mongo-go-driver/releases/tag/v1.13.1). It allows us to benefit from the bug fixes and enhancements released by MongoDB. We have also tested that both Tyk 5.0.x+ and Tyk 5.3 are compatible with MongoDB v7.0.x.

##### Security Fixes
We have fixed a security issue affecting MDCB v2.2.0 to v2.4.x, where certain per-API access rights from policies are not properly relayed to edge gateways. We strongly recommend upgrading to MDCB version 2.5.0 to ensure the proper enforcement of per-API access rights across all gateways in your deployment.

Please refer to the [changelog]({{< ref "#Changelog-v2.5.0">}}) below.

#### Downloads
- [Docker image v2.5.0](https://hub.docker.com/r/tykio/tyk-mdcb-docker/tags?page=&page_size=&ordering=&name=v2.5.0)
- ```bash
  docker pull tykio/tyk-mdcb-docker:v2.5.0
  ``` 

#### Changelog {#Changelog-v2.5.0}

##### Fixed
<ul>
 <li>
 <details>
 <summary>Fixed relaying per-API access rights to gateways for MongoDB deployments</summary>
   
Fixed a security issue affecting MDCB v2.2.0 to v2.4.x, where certain per-API access rights from policies are not properly relayed to edge gateways. This issue exists only when using MongoDB as storage engine.

It affected GraphQL's field-based permissions, query depth, per query depth limits, and disable introspection settings. Also it affected usage quota of both HTTP and GraphQL APIs. However, "Set per API limits and quotas" and global policy settings (e.g. query depth) are not affected by this issue.
 </details>
 </li>

  <li>
 <details>
 <summary>Fixed CVE-2023-3978 (NVD)</summary>

  Update embedded Tyk Pump to v1.9 to address [CVE-2023-3978](https://nvd.nist.gov/vuln/detail/CVE-2023-3978) (NVD)
 </details>
 </li>
  <li>
 <details>
 <summary>Fixed CVE-2023-39325 (NVD)</summary>

  Update embedded Tyk Pump to v1.9 to address [CVE-2023-39325](https://nvd.nist.gov/vuln/detail/CVE-2023-39325) (NVD)
 </details>
 </li>
  <li>
 <details>
 <summary>Fixed CVE-2020-26160 (NVD)</summary>
   
   Migrate MDCB JWT library to golang-jwt v4.5.0 to address [CVE-2020-26160](https://nvd.nist.gov/vuln/detail/CVE-2020-26160) (NVD)
 </details>
 </li>
 
   <li>
 <details>
 <summary>Fixed MDCB stuck in crash loop during startup if tyk_sink.config is missing</summary>
   
   Fix the sample MDCB configuration to stop a crash loop to allow MDCB to run without a tyk_sink.conf file
 </details>
 </li>
 </ul>

##### Added
<ul>
   <li>
 <details>
 <summary>Support Redis v7.0.x</summary>
   
   MDCB 2.5.0 refactors Redis connection logic by using [storage v1.2.2](https://github.com/TykTechnologies/storage/releases/tag/v1.2.2), 
   which integrates with [go-redis](https://github.com/redis/go-redis) v9. Subsequently, this fix adds support for 
   Redis v7.0.x.
 </details>
 </li>
 </ul>


##### Updated
<ul>
 
 <li>
 <details>
 <summary>Update for compatibility with API definitions for Tyk v5.3</summary>

MDCB 2.4.x supports Tyk API definitions up to Tyk Gateway v5.3.0. Please use MDCB 2.5.x with Tyk Gateway v5.3.0+.
 </details>
 </li>
 <li>
 <details>
 <summary>Set default MongoDB driver to mongo-go</summary>
   
MDCB uses `mongo-go` as the default MongoDB driver from v2.5.0. This provides support for MongoDB 4.4.x, 
5.0.x, 6.0.x, 7.0.x. If you are using older MongoDB versions e.g. 3.x, please set MongoDB driver to `mgo`. 
[MongoDB supported versions](https://tyk.io/docs/tyk-self-managed#supported-versions#supported-versions) 
page provides details on how to configure MongoDB drivers in Tyk.
 </details>
 </li>
 
 <li>
 <details>
 <summary>Support MongoDB v7.0.x</summary>
   
MDCB integrates with [storage v1.2.2](https://github.com/TykTechnologies/storage), which updated mongo-go 
driver we use from v1.11.2 to [mongo-go v1.13.1](https://github.com/mongodb/mongo-go-driver/releases/tag/v1.13.1). 
It allows us to benefit from the bug fixes and enhancements released by MongoDB. 
 </details>
 </li>

 
 <li>
 <details>
 <summary>Updated to Go 1.21</summary>

   MDCB updated to Go 1.21 to benefit from fixed security issues, linkers, compilers etc.
   
 </details>
 </li>
 </ul>

---

## 2.4 Release Notes
### 2.4.3 Release Notes

#### Release date 27 Feb 2024

#### Breaking Changes
This release has no breaking changes.

#### 3rd Party Dependencies & Tools
| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 4.4.x, 5.0.x, 6.0.x, 7.0.x | 4.4.x, 5.0.x, 6.0.x, 7.0.x | Used by MDCB | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 11.x - 15.x LTS        | 11.x - 15.x            | Used by MDCB | 
| [Redis](https://redis.io/download/)         | 6.0.x, 6.2.x        | 6.0.x, 6.2.x            | Used by MDCB | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are using a 2.4.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 2.4.0 and upgrade directly to this release.

#### Release Highlights
This release resolved an issue causing partial outages in Tyk Cloud Hybrid gateways due to a blocked stats channel, affecting login RPC calls and gateway operations.

#### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-mdcb-docker/v2.4.3/images/sha256-832f461782fbc6182382798a89025b0489f529427521f92683f33df1ebbd4218?context=explore)

#### Changelog {#Changelog-v2.4.3}

##### Fixed
<ul>
 <li>
 <details>
 <summary>Fixed a blockage in the stats channel which causes partial outages in Tyk Cloud Hybrid gateways</summary>
   
Fixed a blockage in the stats channel of Tyk Cloud Hybrid gateways, improving login RPC calls and gateway operations.
 </details>
 </li>
 </ul>

---

### 2.4.2 Release Notes

#### Release date 9 Jan 2024

#### Breaking Changes
This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are using a 2.4.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 2.4.0 and upgrade directly to this release.

#### Release Highlights
This release enhances compatibility as detailed in the [changelog]({{< ref "#Changelog-v2.4.2">}}) below.

#### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-mdcb-docker/v2.4.2/images/sha256-bdd708718153fdc25d13573d280fb5a715f11b1d2c97c6d59837d8dd83bf3c6c?context=explore)

#### Changelog {#Changelog-v2.4.2}

##### Fixed
<ul>
 <li>
 <details>
 <summary>Fix backward compatibility with Tyk v3.x and v4.x</summary>

Fixed an issue where MDCB cannot pickup APIs created on Dashboard v3.x and v4.x.
 </details>
 </li>
 </ul>

---

### 2.4.1 Release Notes

#### Release date 21 Nov 2023

#### Breaking Changes
This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are using a 2.4.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 2.4.0 and upgrade directly to this release.

#### Release Highlights
This release enhances compatibility as detailed in the [changelog]({{< ref "#Changelog-v2.4.1">}}) below.

#### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-mdcb-docker/v2.4.1/images/sha256-2debf08c95c46a4662a00b2193ee142998826ed7c5e2bb4a4633737c0a4de2e3?context=explore)

#### Changelog {#Changelog-v2.4.1}

##### Changed
- Update for compatibility with API definitions for Tyk v5.2.3

---

### 2.4.0 Release Notes

#### Release Date 14 November 2023

#### Breaking Changes
This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are using a 2.4.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 2.4.0 and upgrade directly to this release.

#### Release Highlights
MDCB 2.4.0 is an update for compatibility for synchronisation with Tyk v5.2 API Definitions. It also enables gateway information visualisation on Tyk Dashboard v5.2+. Please refer to the [changelog]({{< ref "#Changelog-v2.4.0">}}) below.

#### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-mdcb-docker/v2.4.0/images/sha256-b5fad5b4c1c8b912999816ab51ff51e62fdd733fc43256187f22e1218b287f26?context=explore)

#### Changelog {#Changelog-v2.4.0}

##### Added
- Track number of connected gateways and gateway info. The connection statistics can be queried from Tyk Dashboard v5.2+. This allow greater visibility for Operation teams on the number of gateways they are using.

##### Updated
- Update for compatibility with API definitions for Tyk v5.1

---

## 2.3 Release Notes
### 2.3.1 Release Notes

Release date: 2023-08-31

#### Fixed

- In MDCB 2.3, the embedded OAS API Definition introduced in 5.1 is not backward compatible. It causes Gateway panic when MDCB is connecting to Tyk 5.0.x or earlier releases. In this fix, MDCB will transform the old API Definition to new format to avoid panic.
- Users should use URL-encoded values in username and password of a MongoDB connection string if it contains following characters - "?", "@". The same connection string should always be accepted by both mgo and mongo-go drivers. (Note: Same fix for Dashboard will be available in upcoming release Tyk Dashboard v5.0.6 and v5.2.0)


### 2.3.0 Release Notes

Release date: 2023-06-28

MDCB 2.3.0 is an update for compatibility for synchronisation with Tyk v5.1 API Definitions.

#### Updated

- Update MDCB to Go 1.19
- Update for compatibility with API definitions for Tyk v5.1

## 2.2 Release Notes
### 2.2.0 Release Notes
Release date: 2023-05-26

MDCB 2.2.0 brings support for using the official [MongoDB go driver](https://www.mongodb.com/docs/drivers/go/current/?_ga=2.196564399.289488302.1688466439-526957880.1688466345#mongodb-go-driver), as well as some performance fixes.

From MDCB 2.2.0, we added support for MongoDB 5.0.x and 6.0.x. To enable this, you have to set the new *MDCB* config option driver to `mongo-go`.

The driver setting defines the driver type to use for MongoDB. It can be one of the following values:
* [mgo](https://github.com/go-mgo/mgo) (default): Uses the `mgo` driver which is the existing one Tyk has been using till now. This driver supports *MongoDB* versions up to v4 (lower or equal to v4, <=v4). You can get more information about this driver [here](https://github.com/go-mgo/mgo). This driver will stay the default till the next release, to allow users more time for migration. After that, the default driver will be `mongo-go`.
* [mongo-go](https://github.com/mongodb/mongo-go-driver): Uses the official *MongoDB driver*. This driver supports MongoDB v4 or newer (greater or equal to v4, >=v4).

Tyk 5.0.2 and Tyk Pump 1.8.0 also support the new driver option.

We have also worked on performance improvement and fixes like preventing successive frequent reloads, handling storage errors gracefully, retry connection to storage during startup. If ownership is enabled, gateways will also load APIs that are not associated with any user or group.

#### Added
- Support for `mongo-go` driver option
- Support for the `+srv` connection string with `mongo-go` driver option
- Support for SCRAM-SHA-256 with “mongo-go” driver option
- Performance Enhancement: MDCB enqueue APIs and Policies for reload to reduce multiple reloads
#### Fixed
- MDCB handles errors from storage gracefully and prevents sending an empty list of APIs to gateways which would cause an outage
- MDCB will retry the connection to storage to prevent startup failure
#### Updated
- If both mongo_url and connection_type + connection_string are set, Mongo will be loaded by default.
- When ownership is enabled, gateways should only load APIs that are associated with the user or group. Additionally, APIs with no association with any users or groups are also loaded.

## 2.1 Release Notes
### 2.1.1 Release Notes
Release date: 2023-03-29

#### Fixed
- Updated API Definition to support 5.0.0 Gateways. 
- Fixed one critical CVE issue with go.uuid package.


### 2.1.0 Release Notes
Release date: 2023-02-20

#### Added
- Added a new configuration option [enable_ownership]({{< ref "tyk-multi-data-centre/mdcb-configuration-options#enable_ownership" >}}) that allows MDCB filter APIs by API Ownership. 
- MDCB works without group id. This means that when an Edge Gateway doesn’t have a group, it will defaults to the `ungrouped` group. This has some fallbacks, as we can’t use the synchroniser for the ungrouped gateways.


#### Fixed
- Updated API Definition to support 4.3.3 Gateways. 

## 2.0 Release Notes
### 2.0.5 Release Notes
Release date: 2023-01-31

#### Added
- Added a new configuration option (`group_key_ttl`) that specifies the group key TTL in seconds. This key is used to prevent a group of gateways from re-syncing when is not required. On login (GroupLogin call), if the key doesn't exist then the sync process is triggered. If the key exists then the TTL just gets renewed. In case the cluster of gateways is down, the key will expire and get removed and if they connect again a sync process will be triggered. Default value: 180 seconds. Min value: 30 seconds.

#### Fixed
- Fixed an issue where gateways in the data plane couldn't re-sync with MDCB (in the control plane) after their Redis (in the data plane) has been reset. The only way was to change the `group_id`. The fix means that MDCB can overcome this situation independently and there's no need for the users to do anything (changing `group_id` or any other curing action). Check `group_key_ttl` for [more details](#added)

### 2.0.4 Release Notes
Release date: 2022-12-06

#### Added
- Changes in the API definition introduced in Tyk Gateway 4.3 
- Update to Go 1.16 
- Update the embedded Pump to the latest (v1.7.0)

#### Fixed
- Fixed a minor security issue when logging Mongo URL 

### 2.0.3 Release Notes
Release date: 2022-08-12

#### Fixed
- Fixed a bug when using MDCB with Tyk Gateway versions prior to 4.1 where an error could be reported when querying an API from a worker gateway.
- Fixed an incompatibility with MDCB logging format changes
- Fixed an issue where, with the MDCB Synchroniser disabled, all API resources were still pushed out to workers upon creation in the controller; the behavior should be as it was pre-synchroniser.

### 2.0.2 Release Notes
Release date: 2022-08-12

#### Fixed
- Fixed a bug when using MDCB with Tyk Gateway versions prior to 4.1 where an error could be reported when querying an API from a worker gateway.

### 2.0.1 Release Notes
Release date: 2022-07-20

#### Added
- Updated MDCB to support Tyk Gateway v4.1
- Added a new configuration option (`omit_analytics_index_creation`) that supresses the creation of indexes in Mongo pumps (to match Pump 1.6)
- Added the option to configure MDCB certificates using environment variables.

#### Fixed
- Fixed a bug when using MDCB to transfer analytics to MongoDB, where the indexes Tyk created in the MongoDB did not correctly include a time stamp.

#### Changed
- Updated the pump embedded in MDCB to the latest version (Pump v1.6)


### 2.0.0 Release Notes
Release date: 2022-05-17

#### Added

##### SQL support
Since Tyk v4.0, the dashboard supports SQL engine natively. This means that Tyk has support for an SQL relational database to be used instead of the default MongoDB and lets users decide which DB type is the best for their usage. MDCB 2.0 introduces support for SQL to the multi data center bridge, enabling MDCB orchestrated deployments using SQL databases.
MDCB now uses embedded Tyk Mongo and SQL pumps to write analytics. 

#### Fixed
- Fixed a security risk where API keys could be logged in plain text in MDCB logs.

#### Changed
- Improved the formatting of debug logs to align with the rest of the Tyk product suite.
- Hide innocent and unhelpful error messages related to the RPC connection that were spamming the logs


## Further Information

### Upgrading Tyk

Please refer to the [upgrading Tyk]({{< ref "developer-support/upgrading" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "developer-support/community" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
