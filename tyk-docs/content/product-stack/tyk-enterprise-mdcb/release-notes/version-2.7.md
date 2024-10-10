---
title: Tyk MDCB v2.7 Release Notes
description: "Tyk Multi Data-Center Bridge v2.7 release notes"
tags: ["release notes", "MDCB", "Tyk Multi Data-Center", "Tyk Multi Data-Center", "v2.7", "2.7"]
---

Licensed Protected Product

*This page contains all release notes for version 2.7 displayed in reverse chronological order*

## Support Lifetime
Our minor releases are supported until our next minor comes out.

## 2.7.1 Release Notes

##### Release date 10 October 2024

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

#### Support GraphQL analytics records
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

## 2.7.0 Release Notes

##### Release date 12 August 2024

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

###### Recommendations for users:

- Migrate to new [health check]({{< ref "tyk-multi-data-centre/setup-controller-data-centre#health-check" >}}) endpoints in order to get more detailed information. For Kubernetes users, use Helm Charts v1.6 to upgrade MDCB to set liveness and readiness probes of MDCB deployment to the new health check endpoints.

#### Upgrade instructions
If you are using a 2.6.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 2.6.0 and upgrade directly to this release.

#### Release Highlights

#### New Health check probes
Two new [health check]({{< ref "tyk-multi-data-centre/setup-controller-data-centre#health-check" >}}) endpoints have been added to improve monitoring and diagnostics:

1. `/liveness`: This endpoint provides a quick check to determine if the MDCB application is alive and running.
2. `/readiness`: This endpoint offers a detailed status of components and dependencies required for MDCB to serve traffic. It includes status checks for:
    - Database connectivity
    - Redis connectivity
    - RPC server status

These new endpoints allow for more granular monitoring of MDCB's operational status, enabling quicker identification and resolution of potential issues.

##### New Configuration Access Endpoint
Two new `/config` and `/env` [endpoints]({{< ref "tyk-multi-data-centre/setup-controller-data-centre#check-mdcb-configurations" >}}) have been implemented, allowing developers to access the current configuration state of the MDCB instance in real-time. This feature provides:

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

## Further Information

### Upgrading Tyk

Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
