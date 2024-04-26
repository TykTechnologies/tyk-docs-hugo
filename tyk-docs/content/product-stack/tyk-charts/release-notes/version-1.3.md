---
title: Tyk Charts 1.3 Release Notes
date: 2024-02-05T15:49:11Z
description: "Release notes documenting updates, enhancements and changes for Tyk Charts versions within the 1.3 series."
tags: ["Tyk Charts", "Release notes", "changelog", "v1.3" ]
---

****Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**


**This page contains all release notes for version 1.3.X displayed in a reverse chronological order**

### Support Lifetime
<!-- Required. replace X.Y with this release and set the correct quarter of the year -->
Our minor releases are supported until our next minor comes out. 

---

## 1.3.0 Release Notes

##### Release Date 05 Apr 2024

#### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
For MongoDB users: Tyk Charts 1.3.0 uses `mongo-go` as the default driver to connect to MongoDB. `mongo-go` driver is compatible with MongoDB 4.4.x and above. For MongoDB versions prior to 4.4, please set `global.mongo.driver` to `mgo`. We recommend reading [Choose a MongoDB driver]({{<ref "/planning-for-production/database-settings/mongodb#choose-a-mongodb-driver">}}) when you need to change driver setting.

<!-- The following "Changed error log messages" section is Optional!
Instructions: We should mention in the changelog section ALL changes in our application log messages. In case we made such changes, this section should also be added, to make sure the users don't miss this notice among other changelog lines. -->
<!-- #### Changed error log messages
Important for users who monitor Tyk components using the application logs (i.e. Tyk Gateway log, Tyk Dashboard log etc.).
We try to avoid making changes to our log messages, especially at error and critical levels. However, sometimes it's necessary. Please find the list of changes made to the application log in this release: -->

<!-- The following "|Planned Breaking Changes" section is optional!
Announce future scheduled breaking changes, e.g. Go version updates, DB driver updates etc.
#### Planned Breaking Changes
 -->

<!--
#### Dependencies
Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools 
-->

<!-- 
##### Compatibility Matrix For Tyk Components
Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
An illustrative example is shown below. 
| Gateway Version | Recommended Compatibility | Backwards Compatibility |
|----    |---- |---- |
| 5.3 LTS | Helm v2.2     | Helm vX - vY |
|         | MDCB v2.5     | MDCB v1.7 - v2.4 |
|         | Operator v1.8 | Operator vX - vY |
|         | Sync v2.4.1   | Sync vX - vY |
| | | EDP vX - vY |
| | | Pump vX - vY |
| | | TIB vX - vY |
-->

#### 3rd Party Dependencies & Tools
<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [Kubernetes](https://kubernetes.io)                        | 1.26.x, 1.27.x, 1.28.x, 1.29.x | 1.19+          |          | 
| [Helm](https://helm.sh)                                    | 3.14.x                 | 3.x                    |          | 
| [Redis](https://redis.io)                                  | 6.2.x, 7.x    | 6.2.x, 7.x    | Used by Tyk Gateway and Dashboard | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x | 4.4.x, 5.0.x, 6.0.x, 7.0.x | Used by Tyk Dashboard | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 11.x - 15.x LTS        | 11.x - 15.x            | Used by Tyk Dashboard | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecations in this release.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
##### Future deprecations
- In `tyk-dashboard` chart, `dashboard.hashKeys` field will be deprecated in future and be replaced with `.global.hashKeys`. This is to ensure Dashboard, Gateway, and MDCB always get the same hashKeys configurations. It is recommended users do not set `dashboard.hashKeys` and only use `.global.hashKeys` field.

#### Upgrade instructions
<!-- Required. For patches release (Z>0) use this: -->
For users currently on v1.2.x, we strongly recommend promptly upgrading to the latest release. 
<br/>
<!-- Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.
-->
You can use helm upgrade to upgrade your release

```bash
helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update

helm upgrade [RELEASE_NAME] tyk-helm/[CHART_NAME]
```

#### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release: -->
This release primarily focuses on adding support for Tyk v5.3 configurations.

Tyk Charts 1.3 will install the following Tyk component versions by default.
- Tyk Gateway v5.3.0
- Tyk Dashboard v5.3.0
- Tyk Pump v1.9.0
- Tyk MDCB v2.5.0
- Tyk Developer Portal v1.8.3

For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v1.3.0">}}) below.

##### Support new features available from Tyk v5.3.0
Tyk Charts 1.3 adds support for a number of new Tyk features available from Tyk 5.3.0. These include: Support use of SSL certificates when connecting to Redis, Configurations for OAS Validate examples and OAS Validate Schema defaults.

##### Graph Pump
Tyk Charts 1.3 adds support for Graph MongoDB Pump, Graph SQL Pump and Graph SQL Aggregate Pump. see [Graph Pump setup]({{<ref "/tyk-stack/tyk-pump/tyk-pump-configuration/graph-pump">}}) to learn more about the GraphQL-specific metrics available.

##### Enable Tyk Identity Broker (TIB) in Tyk Dashboard
Tyk Charts 1.3 adds a field to enable Internal [Tyk Identity Broker (TIB)]({{<ref "tyk-identity-broker">}}) in Tyk Dashboard by field `tyk-dashboard.tib.enabled` to `true`.

#### Downloads
- [Source code](https://github.com/TykTechnologies/tyk-charts/archive/refs/tags/v1.3.0.tar.gz)
- [ArtifactHub - tyk-stack](https://artifacthub.io/packages/helm/tyk-helm/tyk-stack/1.3.0)
- [ArtifactHub - tyk-data-plane](https://artifacthub.io/packages/helm/tyk-helm/tyk-data-plane/1.3.0)
- [ArtifactHub - tyk-oss](https://artifacthub.io/packages/helm/tyk-helm/tyk-oss/1.3.0)

#### Changelog {#Changelog-v1.3.0}
<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.

Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

##### Added
<!-- This section should be a bullet point list of new features. Explain:

- The purpose of the new feature
- How does the new feature benefit users?
- Link to documentation of the new feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->

<ul>

<li>
<details>
<summary>Global config: Support use of SSL certificates when connecting to Redis</summary>

Added following fields in `global.redis` to support use of SSL certificates when connecting to Redis.

```yaml
    # Allows usage of self-signed certificates when connecting to an encrypted Redis database.
    # sslInsecureSkipVerify: false

    # Path to the CA file.
    # sslCAFile: ""

    # The Volume mount path
    # Default value: /etc/certs
    # certificatesMountPath: ""

    # Path to the cert file.
    # sslCertFile: ""

    # Path to the key file.
    # sslKeyFile: ""

    # Maximum supported TLS version. Valid values are TLS 1.0, 1.1, 1.2, 1.3.
    # Default value: 1.3
    # sslMaxVersion: "1.3"

    # Minimum supported TLS version. Valid values are TLS 1.0, 1.1, 1.2, 1.3.
    # Default value: 1.2
    # sslMinVersion: "1.2"

    # Name of the tls secret. A secret needs to be created for this manually using the name as specified here
    # secretName: ""

    # Name of the volume where the secret will be mounted
    # volumeName: ""
```
</details>
</li>

<li>
<details>
<summary>Global config: Added OAS Validate Examples</summary>

Added field `global.oasValidateExamples`. When set to true, it enables validation of examples in the OAS spec. 
It is used to set `TYK_DB_OAS_VALIDATE_EXAMPLES` and `TYK_GW_OAS_VALIDATE_EXAMPLES`.
</details>
</li>

<li>
<details>
<summary>Global config: Added OAS Validate Schema Defaults</summary>

Added field `global.oasValidateSchemaDefaults`. When set to true, it enables validation of schema defaults in the OAS spec. 
It is used to set `TYK_DB_OAS_VALIDATE_SCHEMA_DEFAULTS` and `TYK_GW_OAS_VALIDATE_SCHEMA_DEFAULTS`.
</details>
</li>

<li>
<details>
<summary>Global config: Enable/Disable key hashing</summary>

Added field `global.hashKeys`. When set to true, it enables key hashing in Gateway. Dashboard will
also operate in a mode that is compatible with key hashing. Please do not set `dashboard.hashKeys`
or make sure `dashboard.hashKeys` is set to the same value or else `dashboard.hashKeys` will take precedence.

Note: `dashboard.hashKeys` will be deprecated in future release.
</details>
</li>

<li>
<details>
<summary>Gateway: Added support for PodDisruptionBudget resource</summary>

Added built-in support for [PodDisruptionBudget](https://kubernetes.io/docs/tasks/run-application/configure-pdb/) resource for Tyk Gateway. This will enhance the reliability and availability of your applications, giving you some control over the disruption caused by scaling operations, updates or maintenance on your pods. 
To enable it, set `gateway.pdb.enabled` to `true` and configure `gateway.pdb.minAvailable` or `gateway.pdb.maxUnavailable`.
</details>
</li>

<li>
<details>
<summary>Gateway: Added Ingress template for gateway control service</summary>

When enabled at `gateway.control.ingress.enabled`, an Ingress resource will be created to allow external access to gateway's [control service]({{<ref "/planning-for-production#change-your-control-port">}}).
</details>
</li>

<li>
<details>
<summary>Gateway: Configure Gateway to work with MDCB synchroniser</summary>

Allow users to configure worker gateway to work with [Tyk MDCB synchroniser]({{<ref "product-stack/tyk-enterprise-mdcb/advanced-configurations/synchroniser">}}) easily by setting `global.mdcbSynchronizer.enabled` in `tyk-data-plane`.
The control plane should be deployed with same `global.mdcbSynchronizer.enabled` value too.
</details>
</li>

<li>
<details>
<summary>Gateway: Customise ServiceAccount to be used</summary>

Allow users to customise `serviceAccountName` for gateway, the name of the [Service Account](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) that is going to be used by the Pods.
</details>
</li>

<li>
<details>
<summary>Gateway: Make service port name configurable</summary>

Users can configure Tyk Gateway service port name and Tyk Gateway control service port name. Default is `http`.
</details>
</li>

<li>
<details>
<summary>Gateway: Make initContainer image configurable</summary>

Users can configure Tyk Gateway initContainer image so that it is possible to load busybox image from preferred registry.
</details>
</li>

<li>
<details>
<summary>Dashboard: Added option to enable Tyk Identity Broker (TIB) in Tyk Dashboard</summary>

You can enable Internal [Tyk Identity Broker (TIB)]({{<ref "tyk-identity-broker">}}) in Tyk Dashboard by field `tyk-dashboard.tib.enabled` to `true`.
</details>
</li>

<li>
<details>
<summary>Dashboard: Customise ServiceAccount to be used</summary>

Allow users to customise `serviceAccountName` for dashboard, the name of the [Service Account](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) that is going to be used by the Pods.
</details>
</li>

<li>
<details>
<summary>Dashboard: Make service port name configurable</summary>

Users can configure Tyk Dashboard service port name. Default is `http`.
</details>
</li>

<li>
<details>
<summary>Pump: Added Graph pump support</summary>

[Graph Pumps]({{<ref "tyk-stack/tyk-pump/tyk-pump-configuration/graph-pump">}}) will be added when the user adds `mongo` or `postgres` to `pump.backend`. When `mongo` is added to `pump.backend` the Graph MongoDB Pump will be enabled. When `postgres` is added to `pump.backend` the Graph SQL Pump and Graph SQL Aggregate Pump will be enabled.
</details>
</li>

<li>
<details>
<summary>Pump: Customise ServiceAccount to be used</summary>

Allow users to customise `serviceAccountName` for pump, the name of the [Service Account](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) that is going to be used by the Pods.
</details>
</li>

<li>
<details>
<summary>Pump: Make service port name configurable</summary>

Users can configure Tyk Pump service port name. Default is `http`.
</details>
</li>

<li>
<details>
<summary>Portal: Customise ServiceAccount to be used</summary>

Allow users to customise `serviceAccountName` for portal, the name of the [Service Account](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) that is going to be used by the Pods.
</details>
</li>

<li>
<details>
<summary>Portal: Make service port name configurable</summary>

Users can configure Tyk Developer Portal service port name. Default is `http`.
</details>
</li>

<li>
<details>
<summary>New component chart to deploy MDCB</summary>

A new [MDCB component chart](https://github.com/TykTechnologies/tyk-charts/tree/main/components/tyk-mdcb) has been added to deploy MDCB. 
It is currently in Beta. For installation instructions and configurations, please
read [Tyk Control Plane chart]({{<ref "product-stack/tyk-charts/tyk-control-plane-chart">}}).
</details>
</li>

<li>
<details>
<summary>New umbrella chart to deploy Tyk Control Plane</summary>

A new [Tyk Control Plane umbrella chart](https://github.com/TykTechnologies/tyk-charts/tree/main/tyk-control-plane) has been added to deploy Tyk Control Plane. 
It is currently in Beta. For installation instructions and configurations, please
read [Tyk Control Plane chart]({{<ref "product-stack/tyk-charts/tyk-control-plane-chart">}}).
</details>
</li>

</ul>

  
##### Changed
<!-- This should be a bullet-point list of updated features. Explain:

- Why was the update necessary?
- How does the update benefit users?
- Link to documentation of the updated feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->
<ul>
<li>
<details>
<summary>Global config: Update default MongoDB driver to `mongo-go`</summary>

Tyk Charts 1.3.0 uses `mongo-go` as the default driver to connect to MongoDB. `mongo-go` driver is compatible with MongoDB 4.4.x and above. For MongoDB versions prior to 4.4, please change `global.mongo.driver` to `mgo`. We recommend reading [Choose a MongoDB driver]({{<ref "planning-for-production/database-settings/mongodb#choose-a-mongodb-driver">}}) when you need to change driver setting.
</details>
</li>
</ul>

<!-- #### Security Fixes
This section should be a bullet point list that should be included when any security fixes have been made in the release, e.g. CVEs. For CVE fixes, consideration needs to be made as follows:
1. Dependency-tracked CVEs - External-tracked CVEs should be included on the release note.
2. Internal scanned CVEs - Refer to the relevant engineering and delivery policy.

For agreed CVE security fixes, provide a link to the corresponding entry on the NIST website. For example:

- Fixed the following CVEs:
    - [CVE-2022-33082](https://nvd.nist.gov/vuln/detail/CVE-2022-33082)
-->

<!-- Required. use 3 hyphens --- between release notes of every patch (minors will be on a separate page) -->
---

<!--
Repeat the release notes section above for every patch here
-->

<!-- The footer of the release notes page. It contains a further information section with details of how to upgrade Tyk,
links to API documentation and FAQs. You can copy it from the previous release. -->
## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance on the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
