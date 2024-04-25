---
title: Tyk MDCB v2.5 Release Notes
description: "Tyk Multi Data-Centre v2.5 release notes. Focusing on compatibility with Tyk API Definitions from Tyk Gateway v5.3"
tags: ["release notes", "MDCB", "Tyk Multi Data-Centre", "Tyk Multi Data-Center", "v2.5", "2.5"]
aliases:
  - /release-notes/mdcb-2.5/
---

Licensed Protected Product

*This page contains all release notes for version 2.5 displayed in reverse chronological order*

## Support Lifetime
Our minor releases are supported until our next minor comes out.

## 2.5.1 Release Notes

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

## 2.5.0 Release Notes

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

## Further Information

### Upgrading Tyk

Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
