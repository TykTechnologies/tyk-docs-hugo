---
title: Tyk MDCB v2.6 Release Notes
description: "Tyk Multi Data-Centre Bridge v2.6 release notes"
tags: ["release notes", "MDCB", "Tyk Multi Data-Centre", "Tyk Multi Data-Center", "v2.6", "2.6"]
aliases:
  - /release-notes/mdcb-2.6/
---

Licensed Protected Product

*This page contains all release notes for version 2.6 displayed in reverse chronological order*

## Support Lifetime
Our minor releases are supported until our next minor comes out.

## 2.6.0 Release Notes

##### Release date 1 July 2024

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

###### Changes in MDCB v2.6.0:
- **New Configuration**: `http_port` is the new parameter for defining the HTTP port, with a default value of `8181`.
- **Deprecation**: The `healthcheck_port` parameter is deprecated and will no longer be used in future MDCB versions.
- **Helm Chart Update**: The MDCB Helm chart now includes the option `mdcb.probes.httpPort`, which takes precedence over `mdcb.probes.healthcheckPort`. For consistency and future compatibility, it is recommended to use `mdcb.probes.httpPort`.

###### Backward compatibility:

The `http_port` parameter is backward compatible, meaning it will function correctly with all existing MDCB versions, ensuring a smooth transition.

###### Recommendations for users:

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

#### Security

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

## Further Information

### Upgrading Tyk

Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
