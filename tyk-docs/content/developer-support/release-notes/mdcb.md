---
title: Tyk MDCB v2.7 Release Notes
description: "Tyk Multi Data-Center Bridge v2.7 release notes"
tags: ["release notes", "MDCB", "Tyk Multi Data-Center", "Tyk Multi Data-Center", "v2.7", "2.7"]
aliases:
  - tyk-docs/content/product-stack/tyk-enterprise-mdcb/release-notes/version-2.4
  - tyk-docs/content/product-stack/tyk-enterprise-mdcb/release-notes/version-2.5
  - tyk-docs/content/product-stack/tyk-enterprise-mdcb/release-notes/version-2.6
  - tyk-docs/content/product-stack/tyk-enterprise-mdcb/release-notes/version-2.7
---

Licensed Protected Product

*This page contains all release notes for version 2.7 displayed in reverse chronological order*

## Support Lifetime
Our minor releases are supported until our next minor comes out.

## 2.7.1 Release Notes

### Release date 10 October 2024

### Breaking Changes
This release has no breaking changes.

### 3rd Party Dependencies & Tools
| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by MDCB | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x | 4.4.x, 5.0.x, 6.0.x, 7.0.x | Used by MDCB | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 12.x - 16.x LTS        | 12.x - 16.x            | Used by MDCB | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Deprecations
There are no deprecations in this release.

### Release Highlights

#### Support GraphQL analytics records
MDCB (Multi-Data Center Bridge) has been enhanced to support the storage of GraphQL aggregate analytics directly. This allows for better tracking and analysis of GraphQL usage across distributed environments. This enhancement simplifies the storage and management of GraphQL analytics within MDCB, improving efficiency and ease of use.

### Downloads
- [Docker image v2.7.1](https://hub.docker.com/r/tykio/tyk-mdcb-docker/tags?page=&page_size=&ordering=&name=v2.7.1)
- ```bash
  docker pull tykio/tyk-mdcb-docker:v2.7.1
  ```


### Changelog {#Changelog-v2.7.1}

#### Added
<ul>
   <li>
 <details>
 <summary>Support the storage of GraphQL aggregate analytics </summary>
MDCB (Multi-Data Center Bridge) has been enhanced to support the storage of GraphQL aggregate analytics directly. This allows for better tracking and analysis of GraphQL usage across distributed environments when Gateway send analytics data directly to MDCB, which processes and sends the data to the analytics storage. This enhancement simplifies the storage and management of GraphQL analytics without Tyk Pump, improving efficiency and ease of use.
    </details>
  </li>
</ul>


#### Updated
<ul>
 
 <li>
 <details>
 <summary>Update for compatibility with API definitions for Tyk v5.6</summary>

MDCB 2.7.1 supports Tyk API definitions up to Tyk Gateway v5.6.0. Please use MDCB 2.7.1+ with Tyk Gateway v5.6.0+.
 </details>
 </li>
 </ul>
---

## 2.7.0 Release Notes

### Release date 12 August 2024

### Breaking Changes
This release has no breaking changes.

### 3rd Party Dependencies & Tools
| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by MDCB | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x | 4.4.x, 5.0.x, 6.0.x, 7.0.x | Used by MDCB | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 12.x - 16.x LTS        | 12.x - 16.x            | Used by MDCB | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Deprecations
There are no deprecations in this release, however with the introduction of new healthcheck endpoints we encourage customers to start using the new `/liveness` and `/readiness` endpoints and avoid using the old `/health` endpoint.

#### Recommendations for users:

- Migrate to new [health check]({{< ref "tyk-multi-data-centre/setup-controller-data-centre#health-check" >}}) endpoints in order to get more detailed information. For Kubernetes users, use Helm Charts v1.6 to upgrade MDCB to set liveness and readiness probes of MDCB deployment to the new health check endpoints.

### Upgrade instructions
If you are using a 2.6.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 2.6.0 and upgrade directly to this release.

### Release Highlights

#### New Health check probes
Two new [health check]({{< ref "tyk-multi-data-centre/setup-controller-data-centre#health-check" >}}) endpoints have been added to improve monitoring and diagnostics:

1. `/liveness`: This endpoint provides a quick check to determine if the MDCB application is alive and running.
2. `/readiness`: This endpoint offers a detailed status of components and dependencies required for MDCB to serve traffic. It includes status checks for:
    - Database connectivity
    - Redis connectivity
    - RPC server status

These new endpoints allow for more granular monitoring of MDCB's operational status, enabling quicker identification and resolution of potential issues.

#### New Configuration Access Endpoint
Two new `/config` and `/env` [endpoints]({{< ref "tyk-multi-data-centre/setup-controller-data-centre#check-mdcb-configurations" >}}) have been implemented, allowing developers to access the current configuration state of the MDCB instance in real-time. This feature provides:

- Secure access to configuration data
- Automatic redaction of sensitive information
- Up-to-date view of the running configuration

This addition enhances debugging capabilities and provides valuable insights into the MDCB instance's current settings.

Please refer to the [changelog]({{< ref "#Changelog-v2.7.0">}}) below.

### Downloads
- [Docker image v2.7.0](https://hub.docker.com/r/tykio/tyk-mdcb-docker/tags?page=&page_size=&ordering=&name=v2.7.0)
- ```bash
  docker pull tykio/tyk-mdcb-docker:v2.7.0
  ``` 

### Changelog {#Changelog-v2.7.0}

#### Added
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


#### Updated
<ul>
 
 <li>
 <details>
 <summary>Update for compatibility with API definitions for Tyk v5.5</summary>

MDCB 2.7.0 supports Tyk API definitions up to Tyk Gateway v5.5.0. Please use MDCB 2.7.x with Tyk Gateway v5.5.0+.
 </details>
 </li>
 </ul>
---

## 2.6.0 Release Notes

### Release date 2 July 2024

### Breaking Changes
This release has no breaking changes.

### 3rd Party Dependencies & Tools
| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by MDCB | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x | 4.4.x, 5.0.x, 6.0.x, 7.0.x | Used by MDCB | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 12.x - 16.x LTS        | 12.x - 16.x            | Used by MDCB | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Deprecations
Starting with MDCB v2.6.0, the configuration parameter `http_port` has been introduced to replace the original `healthcheck_port`. This new HTTP port is designed to expose various endpoints for monitoring and debugging MDCB.

#### Changes in MDCB v2.6.0:
- **New Configuration**: `http_port` is the new parameter for defining the HTTP port, with a default value of `8181`.
- **Deprecation**: The `healthcheck_port` parameter is deprecated and will no longer be used in future MDCB versions.
- **Helm Chart Update**: The MDCB Helm chart now includes the option `mdcb.probes.httpPort`, which takes precedence over `mdcb.probes.healthcheckPort`. For consistency and future compatibility, it is recommended to use `mdcb.probes.httpPort`.

#### Backward compatibility:

The `http_port` parameter is backward compatible, meaning it will function correctly with all existing MDCB versions, ensuring a smooth transition.

#### Recommendations for users:

- **Update Configurations**: Modify your MDCB configurations to use the new `http_port` parameter.

### Upgrade instructions
If you are using a 2.5.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 2.5.0 and upgrade directly to this release.

### Release Highlights

#### Tyk v5.4 Compatibility
MDCB 2.6.0 is an update for compatibility for synchronisation with Tyk v5.4 API Definitions.

#### Comprehensive Data Plane Node Information
MDCB 2.6 introduces a new `/dataplanes` endpoint that provides a comprehensive view of all data plane nodes connected to MDCB, including crucial metadata and status information for each node. The admin secret is required in the header to access these information.

Please refer to the [changelog]({{< ref "#Changelog-v2.6.0">}}) below.

### Downloads
- [Docker image v2.6.0](https://hub.docker.com/r/tykio/tyk-mdcb-docker/tags?page=&page_size=&ordering=&name=v2.6.0)
- ```bash
  docker pull tykio/tyk-mdcb-docker:v2.6.0
  ``` 

### Changelog {#Changelog-v2.6.0}

#### Security

The following CVEs have been resolved in this release:

- [PRISMA-2021-0108](https://github.com/influxdata/influxdb/issues/10292)
- [CVE-2024-27304](https://nvd.nist.gov/vuln/detail/CVE-2024-27304)
- [CVE-2023-45288](https://nvd.nist.gov/vuln/detail/CVE-2023-45288)

#### Fixed
<ul>
 <li>
 <details>
 <summary>Fixed MDCB failure when Tyk Dashboard is upgraded from v4 to v5</summary>
Fixed a bug where upgrading Tyk Dashboard from version 4 to version 5 caused an MDCB failure when using the default PostgreSQL protocol. Resolved the issue in MDCB by detecting cached plan errors, then reconnecting to the storage and rerunning the query to ensure proper functionality.
 </details>
 </li>
 
 </ul>

#### Added
<ul>
   <li>
 <details>
 <summary>Retrieve information of all the connected data plane nodes</summary>
   Adding a `/dataplanes` endpoint that offers a comprehensive view of all data plane nodes connected to MDCB. This endpoint provides crucial metadata and status information for each connected node, enabling efficient monitoring and troubleshooting. It requires an administrative key provided in the `x-tyk-authorization` header for access, ensuring secure and controlled usage. Successful requests return an array of node details, including node ID, API key, group ID, version, TTL, tags, health status, API statistics, and host details.
 </details>
 </li>
 </ul>


#### Updated
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

## 2.5.1 Release Notes

### Release date 24 Apr 2024

### Breaking Changes
This release has no breaking changes.

### 3rd Party Dependencies & Tools
| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by MDCB | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x | 4.4.x, 5.0.x, 6.0.x, 7.0.x | Used by MDCB | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 11.x - 15.x LTS        | 11.x - 15.x            | Used by MDCB | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Deprecations
There are no deprecations in this release.

### Upgrade instructions
If you are using a 2.4.x or 2.5.0 version, we advise you to upgrade as soon as possible to this latest release. If you are on an older version, you should skip 2.5.0 and upgrade directly to this release.

### Release Highlights
This release contains bug fixes as detailed in the [changelog]({{< ref "#Changelog-v2.5.1">}}) below.

### Downloads
- [Docker image v2.5.1](https://hub.docker.com/r/tykio/tyk-mdcb-docker/tags?page=&page_size=&ordering=&name=v2.5.1)
- ```bash
  docker pull tykio/tyk-mdcb-docker:v2.5.1
  ``` 

### Changelog {#Changelog-v2.5.1}

#### Fixed
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

## 2.5.0 Release Notes

#### Release date 5 Apr 2024

### Breaking Changes
This release has no breaking changes.

### 3rd Party Dependencies & Tools
| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [Redis](https://redis.io/download/)  | 6.2.x, 7.x  | 6.2.x, 7.x  | Used by MDCB | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x | 4.4.x, 5.0.x, 6.0.x, 7.0.x | Used by MDCB | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 11.x - 15.x LTS        | 11.x - 15.x            | Used by MDCB | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Deprecations
There are no deprecations in this release.

### Upgrade instructions
If you are using a 2.4.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 2.4.0 and upgrade directly to this release.

### Release Highlights

#### Tyk v5.3 Compatibility
MDCB 2.5.0 is an update for compatibility for synchronisation with Tyk v5.3 API Definitions.

#### Redis v7.x Compatibility
We have upgraded Redis driver [go-redis](https://github.com/redis/go-redis) to v9. Subsequently, Tyk 5.3 is compatible with Redis v7.x.

#### MongoDB v7.0.x Compatibility
We have upgraded mongo-go driver to [mongo-go v1.13.1](https://github.com/mongodb/mongo-go-driver/releases/tag/v1.13.1). It allows us to benefit from the bug fixes and enhancements released by MongoDB. We have also tested that both Tyk 5.0.x+ and Tyk 5.3 are compatible with MongoDB v7.0.x.

#### Security Fixes
We have fixed a security issue affecting MDCB v2.2.0 to v2.4.x, where certain per-API access rights from policies are not properly relayed to edge gateways. We strongly recommend upgrading to MDCB version 2.5.0 to ensure the proper enforcement of per-API access rights across all gateways in your deployment.

Please refer to the [changelog]({{< ref "#Changelog-v2.5.0">}}) below.

### Downloads
- [Docker image v2.5.0](https://hub.docker.com/r/tykio/tyk-mdcb-docker/tags?page=&page_size=&ordering=&name=v2.5.0)
- ```bash
  docker pull tykio/tyk-mdcb-docker:v2.5.0
  ``` 

### Changelog {#Changelog-v2.5.0}

#### Fixed
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

#### Added
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


#### Updated
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
[MongoDB supported versions](https://tyk.io/docs/planning-for-production/database-settings/mongodb/#supported-versions) 
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

## 2.4.3 Release Notes

### Release date 27 Feb 2024

### Breaking Changes
This release has no breaking changes.

### 3rd Party Dependencies & Tools
| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 4.4.x, 5.0.x, 6.0.x, 7.0.x | 4.4.x, 5.0.x, 6.0.x, 7.0.x | Used by MDCB | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 11.x - 15.x LTS        | 11.x - 15.x            | Used by MDCB | 
| [Redis](https://redis.io/download/)         | 6.0.x, 6.2.x        | 6.0.x, 6.2.x            | Used by MDCB | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Deprecations
There are no deprecations in this release.

### Upgrade instructions
If you are using a 2.4.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 2.4.0 and upgrade directly to this release.

### Release Highlights
This release resolved an issue causing partial outages in Tyk Cloud Hybrid gateways due to a blocked stats channel, affecting login RPC calls and gateway operations.

### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-mdcb-docker/v2.4.3/images/sha256-832f461782fbc6182382798a89025b0489f529427521f92683f33df1ebbd4218?context=explore)

### Changelog {#Changelog-v2.4.3}

#### Fixed
<ul>
 <li>
 <details>
 <summary>Fixed a blockage in the stats channel which causes partial outages in Tyk Cloud Hybrid gateways</summary>
   
Fixed a blockage in the stats channel of Tyk Cloud Hybrid gateways, improving login RPC calls and gateway operations.
 </details>
 </li>
 </ul>

---

## 2.4.2 Release Notes

### Release date 9 Jan 2024

### Breaking Changes
This release has no breaking changes.

### Deprecations
There are no deprecations in this release.

### Upgrade instructions
If you are using a 2.4.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 2.4.0 and upgrade directly to this release.

### Release Highlights
This release enhances compatibility as detailed in the [changelog]({{< ref "#Changelog-v2.4.2">}}) below.

### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-mdcb-docker/v2.4.2/images/sha256-bdd708718153fdc25d13573d280fb5a715f11b1d2c97c6d59837d8dd83bf3c6c?context=explore)

### Changelog {#Changelog-v2.4.2}

#### Fixed
<ul>
 <li>
 <details>
 <summary>Fix backward compatibility with Tyk v3.x and v4.x</summary>

Fixed an issue where MDCB cannot pickup APIs created on Dashboard v3.x and v4.x.
 </details>
 </li>
 </ul>

---

## 2.4.1 Release Notes

### Release date 21 Nov 2023

### Breaking Changes
This release has no breaking changes.

### Deprecations
There are no deprecations in this release.

### Upgrade instructions
If you are using a 2.4.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 2.4.0 and upgrade directly to this release.

### Release Highlights
This release enhances compatibility as detailed in the [changelog]({{< ref "#Changelog-v2.4.1">}}) below.

### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-mdcb-docker/v2.4.1/images/sha256-2debf08c95c46a4662a00b2193ee142998826ed7c5e2bb4a4633737c0a4de2e3?context=explore)

### Changelog {#Changelog-v2.4.1}

#### Changed
- Update for compatibility with API definitions for Tyk v5.2.3

---

## 2.4.0 Release Notes

### Release Date 14 November 2023

### Breaking Changes
This release has no breaking changes.

### Deprecations
There are no deprecations in this release.

### Upgrade instructions
If you are using a 2.4.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 2.4.0 and upgrade directly to this release.

### Release Highlights
MDCB 2.4.0 is an update for compatibility for synchronisation with Tyk v5.2 API Definitions. It also enables gateway information visualisation on Tyk Dashboard v5.2+. Please refer to the [changelog]({{< ref "#Changelog-v2.4.0">}}) below.

### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-mdcb-docker/v2.4.0/images/sha256-b5fad5b4c1c8b912999816ab51ff51e62fdd733fc43256187f22e1218b287f26?context=explore)

### Changelog {#Changelog-v2.4.0}

#### Added
- Track number of connected gateways and gateway info. The connection statistics can be queried from Tyk Dashboard v5.2+. This allow greater visibility for Operation teams on the number of gateways they are using.

#### Updated
- Update for compatibility with API definitions for Tyk v5.1

---

## Further Information

### Upgrading Tyk

Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
