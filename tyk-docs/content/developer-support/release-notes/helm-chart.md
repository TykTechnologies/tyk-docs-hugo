---
title: Tyk Charts Release Notes
description: "Release notes documenting updates, enhancements and changes for Tyk Charts versions within the 2.1 series."
tags: ["Tyk Charts", "Release notes", "changelog", "v2.1", "v2.1.0", "v2.0.0", "v1.6.0", "v1.5.0", "v1.4.0", "v1.3.0" ]
aliases:
  - /product-stack/tyk-charts/release-notes/version-1.3
  - /product-stack/tyk-charts/release-notes/version-1.4
  - /product-stack/tyk-charts/release-notes/version-1.5
  - /product-stack/tyk-charts/release-notes/version-1.6
  - /product-stack/tyk-charts/release-notes/version-2.0
  - /product-stack/tyk-charts/release-notes/version-2.1
  - /product-stack/tyk-charts/release-notes/version-2.2
---

****Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**


**This page contains all release notes for Tyk Charts displayed in a reverse chronological order**

## Support Lifetime
<!-- Required. replace X.Y with this release and set the correct quarter of the year -->
Our minor releases are supported until our next minor comes out. 

---
## 2.2 Release Notes

### 2.2.0 Release Notes

#### Release Date 09 December 2024

#### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release: -->

The Tyk Helm Charts v2.2.0 release brings exciting new features, improvements, and crucial fixes to enhance deployment flexibility, customization, and reliability. Here are the highlights:
* Sidecar containers support
* Dashboard enhancements: Configurable audit log storage, Open Policy Agent (OPA) settings
* Gateway enhancements: Custom liveness and readiness probes, enhanced logging configuration, customizable HPA behavior
* Operator updates: Custom deployment annotations, 

For a comprehensive list of changes, please refer to the detailed [changelog](#Changelog-v2.2.0) below.

#### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
This release has no breaking changes.

<!-- The following "Changed error log messages" section is Optional!
Instructions: We should mention in the changelog section ALL changes in our application log messages. In case we made such changes, this section should also be added, to make sure the users don't miss this notice among other changelog lines. -->
<!-- ##### Changed error log messages
Important for users who monitor Tyk components using the application logs (i.e. Tyk Gateway log, Tyk Dashboard log etc.).
We try to avoid making changes to our log messages, especially at error and critical levels. However, sometimes it's necessary. Please find the list of changes made to the application log in this release: -->

<!-- The following "|Planned Breaking Changes" section is optional!
Announce future scheduled breaking changes, e.g. Go version updates, DB driver updates etc.
##### Planned Breaking Changes
 -->

<!--
##### Dependencies
Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools 
-->

<!-- 
###### Compatibility Matrix For Tyk Components
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

#### Dependencies {#dependencies-2.2}

##### 3rd Party Dependencies & Tools
<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [Kubernetes](https://kubernetes.io)                        | 1.26.x, 1.27.x, 1.28.x, 1.29.x, 1.30.x | 1.19+          |          | 
| [Helm](https://helm.sh)                                    | 3.14.x                 | 3.x                    |          | 
| [Redis](https://redis.io)                                  | 6.2.x, 7.x    | 6.2.x, 7.x    | Used by Tyk Gateway and Dashboard | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x | 5.0.x, 6.0.x, 7.0.x | Used by Tyk Dashboard, Pump, and MDCB | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 12.x - 16.x        | 12.x - 16.x            | Used by Tyk Dashboard, Pump, and MDCB | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecation in this release.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens
###### Future deprecations. -->

#### Upgrade instructions
<!-- Required. For patches release (Z>0) use this: 
For users currently on v2.1.x, we strongly recommend promptly upgrading to the latest release. 
<br/>-->
<!-- Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.
-->
You can use helm upgrade to upgrade your release

```bash
helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update

helm upgrade [RELEASE_NAME] tyk-helm/[CHART_NAME]
```

#### Downloads
- [Source code](https://github.com/TykTechnologies/tyk-charts/archive/refs/tags/v2.2.0.tar.gz)
- [ArtifactHub - tyk-stack](https://artifacthub.io/packages/helm/tyk-helm/tyk-stack/2.2.0)
- [ArtifactHub - tyk-control-plane](https://artifacthub.io/packages/helm/tyk-helm/tyk-control-plane/2.2.0)
- [ArtifactHub - tyk-data-plane](https://artifacthub.io/packages/helm/tyk-helm/tyk-data-plane/2.2.0)
- [ArtifactHub - tyk-oss](https://artifacthub.io/packages/helm/tyk-helm/tyk-oss/2.2.0)

#### Changelog {#Changelog-v2.2.0}

##### Added

<ul>

<li>
<details>
<summary>Global: Configurable Tyk streams setting</summary>

User can enable or disable Tyk Streams feature via `global.streaming.enabled`. This option is enabled by default.
</details>
</li>

<li>
<details>
<summary>Dashboard: Configurable audit log storage</summary>

Introduced new configuration options to manage audit logging for the Tyk Dashboard. This enhancement allows users to enable, customize, and specify how audit logs are stored and formatted.

To configure, see [Tyk Stack]({{<ref "product-stack/tyk-charts/tyk-stack-chart#audit-log-configurations">}}) documentation.
</details>
</li>

<li>
<details>
<summary>Dashboard: Configurable Open Policy Agent (OPA) settings</summary>

Introduced new options to enable and manage Open Policy Agent (OPA) support directly from the Helm chart. This feature simplifies the configuration process, guiding users to use the correct settings without relying on extraEnvs.

To configure, see [Tyk Stack]({{<ref "product-stack/tyk-charts/tyk-stack-chart#opa-configurations">}}) documentation.
</details>
</li>

<li>
<details>
<summary>Gateway: Configurable liveness and readiness probes</summary>

Support for configuring liveness and readiness probes for the Tyk Gateway via Helm charts.

Users can now define custom configurations for these probes, providing more flexibility and control over health checks in Kubernetes deployments. Defaults are provided if custom configurations are not specified.

This enhancement improves deployment reliability and ensures better integration with Kubernetes health monitoring systems.

To configure, see [Tyk Stack]({{<ref "product-stack/tyk-charts/tyk-stack-chart#gateway-probes">}}) documentation.
</details>
</li>

<li>
<details>
<summary>Gateway: Enhanced log configuration</summary>

Support for configuring the Tyk Gateway logging level and format through new fields under `.Values.gateway.log` in the Helm chart values.yaml.

This enhancement enables fine-tuned control over logging behavior directly from the Helm chart, simplifying deployment customization.
</details>
</li>

<li>
<details>
<summary>Gateway: Customizable HPA behavior</summary>

Users can now define custom HPA behavior settings directly in the Helm values file via a new field a new field: `.Values.gateway.autoscaling.behavior`.

This enhancement provides more flexibility in configuring HPA scaling behavior, allowing tailored performance tuning for Gateway deployments.
</details>
</li>

<li>
<details>
<summary>Operator: Support for adding custom annotations to the Tyk Operator deployment</summary>

Users can now specify annotations directly in the Helm values field `.Values.annotations`, enabling better integration with external tools and systems that rely on metadata annotations.
</details>
</li>

<li>
<details>
<summary>Configurable sidecar containers</summary>

Support for adding sidecar containers for Tyk components, enhancing flexibility and integration capabilities. This feature allows for the addition of auxiliary containers through `extraContainers` field to the following components:

- Tyk Gateway
- Tyk Dashboard
- Tyk MDCB
- Tyk Pump
- Tyk Enterprise Developer Portal

</details>
</li>

</ul>

##### Changed

<ul>

<li>
<details>
<summary>Updated default versions of Tyk components</summary>

 Tyk Charts 2.2 will install the following Tyk component versions by default.

  - Tyk Gateway v5.3.8
  - Tyk Dashboard v5.3.8
  - Tyk Pump v1.11.1
  - Tyk MDCB v2.7.2
  - Tyk Developer Portal v1.12.0
  - Tyk Operator v1.1.0

</details>
</li>

</ul>

##### Fixed

<ul>

<li>
<details>
<summary>Gateway: Corrected template name for OpenTelemetry caFilePath</summary>

Corrected the template name for the OpenTelemetry caFilePath in the Gateway configuration.
Updated template reference from `otel-CAPath` to `otel-tlsCAPath` to ensure proper functionality.
This fix addresses misconfigurations related to the OpenTelemetry TLS CA path and ensures accurate rendering of Gateway templates.
</details>
</li>

<li>
<details>
<summary>MDCB: Fixed MDCB service configuration when using LoadBalancer as the service type</summary>

The `externalTrafficPolicy` field is now correctly set under the spec section instead of selectors.
This fix ensures proper functionality and alignment with Kubernetes service configuration requirements.
</details>
</li>

<li>
<details>
<summary>Tyk Operator license key handling in tyk-oss chart</summary>

Resolved an issue where the Tyk OSS chart did not set the Operator license key in the secret created for the Operator. This fix ensures seamless configuration of the license key when deploying Tyk Operator. 
</details>
</li>

</ul>

<!-- ##### Security Fixes
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

## 2.1 Release Notes
### 2.1.0 Release Notes

#### Release Date 10 Oct 2024

#### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release: -->

Added the ability to specify a static IP for Kubernetes LoadBalancer services, giving users more control over network configurations for the Tyk Gateway and Dashboard. Added an option to configure the Dashboard container port, addressing issues with restricted port permissions. Updated the default versions of Tyk components.

For a comprehensive list of changes, please refer to the detailed [changelog](#Changelog-v2.1.0) below.

#### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
This release has no breaking changes.

However, if you are upgrading to [Tyk Operator v1.0]({{<ref "developer-support/release-notes/operator#100-release-notes">}}) using the Helm Chart, please read the [license requirement]({{<ref "developer-support/release-notes/operator#breaking-changesv1.0.0">}}) and Tyk Operator [installation and upgrade instructions]({{<ref "api-management/automations/operator#install-and-configure-tyk-operator">}}) carefully.

<!-- The following "Changed error log messages" section is Optional!
Instructions: We should mention in the changelog section ALL changes in our application log messages. In case we made such changes, this section should also be added, to make sure the users don't miss this notice among other changelog lines. -->
<!-- ##### Changed error log messages
Important for users who monitor Tyk components using the application logs (i.e. Tyk Gateway log, Tyk Dashboard log etc.).
We try to avoid making changes to our log messages, especially at error and critical levels. However, sometimes it's necessary. Please find the list of changes made to the application log in this release: -->

<!-- The following "|Planned Breaking Changes" section is optional!
Announce future scheduled breaking changes, e.g. Go version updates, DB driver updates etc.
##### Planned Breaking Changes
 -->

<!--
##### Dependencies
Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools 
-->

<!-- 
###### Compatibility Matrix For Tyk Components
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

#### Dependencies {#dependencies-2.1}

##### 3rd Party Dependencies & Tools
<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [Kubernetes](https://kubernetes.io)                        | 1.26.x, 1.27.x, 1.28.x, 1.29.x, 1.30.x | 1.19+          |          | 
| [Helm](https://helm.sh)                                    | 3.14.x                 | 3.x                    |          | 
| [Redis](https://redis.io)                                  | 6.2.x, 7.x    | 6.2.x, 7.x    | Used by Tyk Gateway and Dashboard | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x | 5.0.x, 6.0.x, 7.0.x | Used by Tyk Dashboard, Pump, and MDCB | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 12.x - 16.x        | 12.x - 16.x            | Used by Tyk Dashboard, Pump, and MDCB | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecation in this release.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens
###### Future deprecations. -->

#### Upgrade instructions
<!-- Required. For patches release (Z>0) use this: -->
For users currently on v2.0.x, we strongly recommend promptly upgrading to the latest release. 
<br/>
<!-- Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.
-->
You can use helm upgrade to upgrade your release

```bash
helm repo add tyk-helm https://helm.tyk.io/public/helm/charts/
helm repo update

helm upgrade [RELEASE_NAME] tyk-helm/[CHART_NAME]
```

#### Downloads
- [Source code](https://github.com/TykTechnologies/tyk-charts/archive/refs/tags/v2.1.0.tar.gz)
- [ArtifactHub - tyk-stack](https://artifacthub.io/packages/helm/tyk-helm/tyk-stack/2.1.0)
- [ArtifactHub - tyk-control-plane](https://artifacthub.io/packages/helm/tyk-helm/tyk-control-plane/2.1.0)
- [ArtifactHub - tyk-data-plane](https://artifacthub.io/packages/helm/tyk-helm/tyk-data-plane/2.1.0)
- [ArtifactHub - tyk-oss](https://artifacthub.io/packages/helm/tyk-helm/tyk-oss/2.1.0)

#### Changelog {#Changelog-v2.1.0}

##### Added

<ul>

<li>
<details>
<summary>Ability to specify static IP for Kubernetes LoadBalancer service</summary>

Added an optional `loadBalancerIP` parameter in the chart that allows users to set a static IP for Tyk Gateway and Dashboard services when using the `LoadBalancer` service type. This update provides enhanced control over IP configuration, useful for network stability in environments with multiple load balancers.

Tyk gateway service configuration:
- `tyk-gateway.gateway.service.loadBalancerIP` (default to "")

Tyk Dashboard service configuration:
- `tyk-dashboard.dashboard.service.loadBalancerIP` (default to "")

</details>
</li>

<li>
<details>
<summary>Ability to configure Dashboard container port</summary>

Enables specifying an alternate port for the container while using standard ports in the service. This option resolves permission issues associated with restricted ports, such as port 443, within containers.

</details>
</li>

<li>
<details>
<summary>From v1.0 Tyk Operator Requires License Key</summary>

Starting from Tyk Operator v1.0, a license key is required to use the Tyk Operator. You can provide it while installing Tyk Stack, Tyk Control Plane, or Tyk OSS helm chart by setting `global.license.operator` field. You can also set license key via a Kubernetes secret using `global.secrets.useSecretName` field. The secret should contain a key called `OperatorLicense`.

</details>
</li>

</ul>

##### Changed

<ul>

<li>
<details>
<summary>Updated default versions of Tyk components</summary>
Tyk Charts 2.1 will install the following Tyk component versions by default.
- Tyk Gateway v5.3.6
- Tyk Dashboard v5.3.6
- Tyk Pump v1.11.0
- Tyk MDCB v2.7.1
- Tyk Developer Portal v1.10.0
- Tyk Operator v1.0.0
</details>
</li>

</ul>

<!-- ##### Security Fixes
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

## 2.0 Release Notes
### 2.0.0 Release Notes

#### Release Date 26 September 2024

#### Breaking Changes

##### 1. URL Path Matching Configuration Changes

Tyk Charts v2.0 introduces a **breaking change** related to URL path matching behavior in the Tyk Gateway. If you are using Tyk Gateway versions 5.0.14 (2023 LTS), 5.3.5 (2024 LTS), or 5.5.1 (latest feature branch) or above, two new configuration options have been added to the Gateway:

- `http_server_options.enable_path_prefix_matching`
- `http_server_options.enable_path_suffix_matching`

These options allow more restrictive URL path matching by controlling whether the request path matches the start or end of the specified pattern. If both are set to `true`, Tyk enforces "exact" path matching. By default, these options are set to `false` in the Gateway to avoid breaking existing configurations.

However, starting with **Tyk Charts v2.0**, these options will be set to `true` by default, enforcing stricter security by requiring precise path matches. This change applies to new installations or upgrades via Tyk Charts v2.0 and above.

From this version of Tyk Charts we also set the following configuration option to `true` by default as part of the stricter path matching:

- `http_server_options.enable_strict_routes`

**Impact on existing users:**

- The change is **backward-compatible** for users upgrading their Tyk Gateway directly (i.e. not via Helm Chart), because by default, these features will not be active. This ensures that existing configurations are not affected if you update the Gateway manually.
- However, **if you install or upgrade via Tyk Charts v2.0**, these options will be set to `true` by default. This means stricter URL path matching will be enforced automatically, which could impact your existing routes or configurations if you're not prepared for it. Please ensure you understand and test these new configurations before upgrading your production environment.

**Action required:**

- Familiarize yourself with URL matching in Tyk [here]({{<ref "getting-started/key-concepts/url-matching">}}).
- For production setup guidance, see [this guide]({{<ref "tyk-self-managed#ensure-you-are-matching-only-the-url-paths-that-you-want-to-match">}}).
- Configure the new options via the Helm chart, and test the changes in a non-production environment before upgrading.

##### 2. Default Tyk Component Versions

This release changes the default component versions in Tyk Charts v2.0 to **Long-Term Support (LTS)** versions for greater stability in production environments. The new defaults are:

|Tyk Component|Default Version|Customization Parameter|
|---|---|---|
|Tyk Gateway|5.3.5 LTS|`--set tyk-gateway.gateway.image.tag=<desired-version>`|
|Tyk Dashboard|5.3.5 LTS|`--set tyk-dashboard.dashboard.image.tag=<desired-version>`|
|Tyk Pump|1.11.0|`--set tyk-pump.pump.image.tag=<desired-version>`|
|Tyk MDCB|2.7.0|`--set tyk-mdcb.mdcb.image.tag=<desired-version>`|
|Tyk Developer Portal|1.10.0|`--set tyk-dev-portal.image.tag=<desired-version>`|
|Tyk Operator|0.18.0|`--set tyk-operator.image.tag=<desired-version>`|

If you need to use a different version for any component, adjust the Helm chart parameters during installation or upgrade.

<!-- The following "Changed error log messages" section is Optional!
Instructions: We should mention in the changelog section ALL changes in our application log messages. In case we made such changes, this section should also be added, to make sure the users don't miss this notice among other changelog lines. -->
<!-- ##### Changed error log messages
Important for users who monitor Tyk components using the application logs (i.e. Tyk Gateway log, Tyk Dashboard log etc.).
We try to avoid making changes to our log messages, especially at error and critical levels. However, sometimes it's necessary. Please find the list of changes made to the application log in this release: -->

<!-- The following "|Planned Breaking Changes" section is optional!
Announce future scheduled breaking changes, e.g. Go version updates, DB driver updates etc.
##### Planned Breaking Changes
 -->

<!--
##### Dependencies
Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools 
-->

<!-- 
###### Compatibility Matrix For Tyk Components
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
| [Kubernetes](https://kubernetes.io)                        | 1.26.x, 1.27.x, 1.28.x, 1.29.x, 1.30.x | 1.19+          |          | 
| [Helm](https://helm.sh)                                    | 3.14.x                 | 3.x                    |          | 
| [Redis](https://redis.io)                                  | 6.2.x, 7.x    | 6.2.x, 7.x    | Used by Tyk Gateway and Dashboard | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x | 5.0.x, 6.0.x, 7.0.x | Used by Tyk Dashboard, Pump, and MDCB | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 12.x - 16.x        | 12.x - 16.x            | Used by Tyk Dashboard, Pump, and MDCB | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecation in this release.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens
###### Future deprecations. -->

#### Upgrade instructions
<!-- Required. For patches release (Z>0) use this: -->
For users currently on v1.x.x, we strongly recommend promptly upgrading to the latest release. 
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

##### Support Gateway configuration for URL path matching
The default Gateway configuration in the Helm chart will set Tyk's URL path matching to **exact** mode. This ensures that the request URL must exactly match the listen path and endpoint patterns configured in the API definition. 

##### Updated default Tyk versions
Tyk Charts 2.0 will install the following Tyk component versions by default.
- Tyk Gateway v5.3.5
- Tyk Dashboard v5.3.5
- Tyk Pump v1.11.0
- Tyk MDCB v2.7.0
- Tyk Developer Portal v1.10.0
- Tyk Operator v0.18.0

#### Downloads
- [Source code](https://github.com/TykTechnologies/tyk-charts/archive/refs/tags/v2.0.0.tar.gz)
- [ArtifactHub - tyk-stack](https://artifacthub.io/packages/helm/tyk-helm/tyk-stack/2.0.0)
- [ArtifactHub - tyk-control-plane](https://artifacthub.io/packages/helm/tyk-helm/tyk-control-plane/2.0.0)
- [ArtifactHub - tyk-data-plane](https://artifacthub.io/packages/helm/tyk-helm/tyk-data-plane/2.0.0)
- [ArtifactHub - tyk-oss](https://artifacthub.io/packages/helm/tyk-helm/tyk-oss/2.0.0)

#### Changelog {#Changelog-v2.0.0}
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
<summary>Support for New Path Matching Configuration Options</summary>

Tyk Charts v2.0 introduces support for the newly added Tyk Gateway configuration options: `enable_path_prefix_matching` and `enable_path_suffix_matching`. These settings allow more secure and explicit URL matching by restricting path pattern matching to the start or end of the request path. This enhancement benefits customers who need more precise route matching to ensure that only intended paths are matched in production environments, reducing the risk of unintentional routing.

URL path matching mode is configurable using these `tyk-gateway` chart parameters:

- `gateway.enablePathPrefixMatching` (default to `true`)
- `gateway.enablePathSuffixMatching` (default to `true`)
- `gateway.enableStrictRoutes` (default to `true`)

Learn more about the settings in the [URL Path Matching]({{<ref "getting-started/key-concepts/url-matching">}}) documentation.

</details>
</li>

<li>
<details>
<summary>Configuration for Extra Volume Mounts in Tyk-Bootstrap</summary>
This release adds support for `extraVolumes` and `extraVolumeMounts` parameters in the `tyk-bootstrap` charts, enabling users to mount additional volumes. This is especially useful for users with custom storage or configuration needs in their deployments, offering more flexibility in managing their Tyk installation.

The options are configurable using these `tyk-bootstrap` chart's parameters:

- `bootstrap.extraVolumes` (default to empty list)
- `bootstrap.extraVolumeMounts` (default to empty list)

</details>
</li>

</ul>

<!-- 
###### Changed
<!-- This should be a bullet-point list of updated features. Explain:

- Why was the update necessary?
- How does the update benefit users?
- Link to documentation of the updated feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->

##### Changed

<ul>

<li>
<details>
<summary>Default to Long-Term Support (LTS) Versions for Components</summary>
Tyk Charts v2.0 now defaults to Long-Term Support (LTS) versions for Tyk Gateway and Tyk Dashboard. This change ensures greater stability and long-term support for customers deploying Tyk in production environments, reducing the risk of issues due to feature branch releases. Users can still override these versions if needed, but the default will provide a more predictable upgrade path for most use cases.
</details>
</li>

</ul>

<!-- ##### Security Fixes
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

## 1.6 Release Notes
### 1.6.0 Release Notes

#### Release Date 14 August 2024

#### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
This release has no breaking changes.

<!-- The following "Changed error log messages" section is Optional!
Instructions: We should mention in the changelog section ALL changes in our application log messages. In case we made such changes, this section should also be added, to make sure the users don't miss this notice among other changelog lines. -->
<!-- ##### Changed error log messages
Important for users who monitor Tyk components using the application logs (i.e. Tyk Gateway log, Tyk Dashboard log etc.).
We try to avoid making changes to our log messages, especially at error and critical levels. However, sometimes it's necessary. Please find the list of changes made to the application log in this release: -->

<!-- The following "|Planned Breaking Changes" section is optional!
Announce future scheduled breaking changes, e.g. Go version updates, DB driver updates etc.
##### Planned Breaking Changes
 -->

<!--
##### Dependencies
Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools 
-->

<!-- 
###### Compatibility Matrix For Tyk Components
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
| [Kubernetes](https://kubernetes.io)                        | 1.26.x, 1.27.x, 1.28.x, 1.29.x, 1.30.x | 1.19+          |          | 
| [Helm](https://helm.sh)                                    | 3.14.x                 | 3.x                    |          | 
| [Redis](https://redis.io)                                  | 6.2.x, 7.x    | 6.2.x, 7.x    | Used by Tyk Gateway and Dashboard | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x | 5.0.x, 6.0.x, 7.0.x | Used by Tyk Dashboard, Pump, and MDCB | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 12.x - 16.x        | 12.x - 16.x            | Used by Tyk Dashboard, Pump, and MDCB | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecation in this release.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens
###### Future deprecations. -->

#### Upgrade instructions
<!-- Required. For patches release (Z>0) use this: -->
For users currently on v1.4.x, we strongly recommend promptly upgrading to the latest release. 
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

##### Updated MDCB Health check probes
MDCB v2.7.0 release introduces `/liveness` and `/readiness` probes which give more accurate and detail health check information. MDCB deployment has been updated to use the new endpoints. See [MDCB Health Check]({{<ref "tyk-multi-data-centre/setup-controller-data-centre#health-check">}}) section for information about the new probes.

##### Updated default Tyk versions
Tyk Charts 1.6 will install the following Tyk component versions by default.
- Tyk Gateway v5.5.0
- Tyk Dashboard v5.5.0
- Tyk Pump v1.11.0
- Tyk MDCB v2.7.0
- Tyk Developer Portal v1.10.0
- Tyk Operator v0.18.0

#### Downloads
- [Source code](https://github.com/TykTechnologies/tyk-charts/archive/refs/tags/v1.6.0.tar.gz)
- [ArtifactHub - tyk-stack](https://artifacthub.io/packages/helm/tyk-helm/tyk-stack/1.6.0)
- [ArtifactHub - tyk-control-plane](https://artifacthub.io/packages/helm/tyk-helm/tyk-control-plane/1.6.0)
- [ArtifactHub - tyk-data-plane](https://artifacthub.io/packages/helm/tyk-helm/tyk-data-plane/1.6.0)
- [ArtifactHub - tyk-oss](https://artifacthub.io/packages/helm/tyk-helm/tyk-oss/1.6.0)

#### Changelog {#Changelog-v1.6.0}
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
<summary>MDCB: Added option to configure healthcheck cache renewal period</summary>

Added `mdcb.healthcheck.cache_renewal_period` which configures the time interval (in seconds) at which the healthchecker refreshes its cached health status information (Redis and DB). Default to 10 (seconds).
</details>
</li>

<li>
<details>
<summary>MDCB: Added Ingress to HTTP services</summary>

Added Ingress resource for MDCB HTTP service at port `http_port`.

```yaml
tyk-mdcb:
  mdcb:
   # New HTTP ingress for port 8181
   http_ingress:
     enabled: false
     # className specifies your ingress controller class name below
     className: ""
     # annotations specifies annotations to be added on Ingress resource.
     annotations: { }
       # kubernetes.io/ingress.class: nginx
       # kubernetes.io/tls-acme: "true"
     # hosts corresponds to the rules to be added on Ingress rules.
     hosts:
       - host: mdcb-http.example.com
         paths:
           - path: /
             pathType: ImplementationSpecific
     # tls corresponds to the tls configuration if Ingress rules use TLS
     tls: []
     #  - secretName: chart-example-tls
     #    hosts:
     #      - chart-example.local
```
</details>
</li>

</ul>

<!-- 
###### Changed
<!-- This should be a bullet-point list of updated features. Explain:

- Why was the update necessary?
- How does the update benefit users?
- Link to documentation of the updated feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->

<ul>

<li>
<details>
<summary>MDCB: Updated liveness and readiness probes</summary>

Updated MDCB liveness and readiness probes to `/liveness` and `/readiness` respectively. These endpoints are available from MDCB v2.7.0. If you are deploying an earlier version of MDCB, please update the paths to `/health` in values.yaml file.
For more details about new endpoints, check [MDCB Health check]({{<ref "tyk-multi-data-centre/setup-controller-data-centre#health-check">}}) section.
</details>
</li>
</ul>

##### Fixed
<ul>

<li>
<details>
<summary>Portal: Ingress resource should not be created if not enabled</summary>

Fixed the issue that when Developer Portal component is enabled, an Ingress resource is being created, although Portal Ingress is not enabled.
</details>
</li>


</ul>


<!-- ##### Security Fixes
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

## 1.5 Release Notes
### 1.5.0 Release Notes

#### Release Date 4 July 2024

#### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
This release has no breaking changes.

<!-- The following "Changed error log messages" section is Optional!
Instructions: We should mention in the changelog section ALL changes in our application log messages. In case we made such changes, this section should also be added, to make sure the users don't miss this notice among other changelog lines. -->
<!-- ##### Changed error log messages
Important for users who monitor Tyk components using the application logs (i.e. Tyk Gateway log, Tyk Dashboard log etc.).
We try to avoid making changes to our log messages, especially at error and critical levels. However, sometimes it's necessary. Please find the list of changes made to the application log in this release: -->

<!-- The following "|Planned Breaking Changes" section is optional!
Announce future scheduled breaking changes, e.g. Go version updates, DB driver updates etc.
##### Planned Breaking Changes
 -->

<!--
##### Dependencies
Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools 
-->

<!-- 
###### Compatibility Matrix For Tyk Components
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

With PostgreSQL v11 has reach [EOL](https://www.postgresql.org/support/versioning/) on November 2023, we can no longer guarantee full compatibility with this version of the database. If you are [using PostgreSQL]({{<ref "tyk-self-managed#postgresql">}}) we recommend that you upgrade to a version that we have tested with, as indicated below.

| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [Kubernetes](https://kubernetes.io)                        | 1.26.x, 1.27.x, 1.28.x, 1.29.x | 1.19+          |          | 
| [Helm](https://helm.sh)                                    | 3.14.x                 | 3.x                    |          | 
| [Redis](https://redis.io)                                  | 6.2.x, 7.x    | 6.2.x, 7.x    | Used by Tyk Gateway and Dashboard | 
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x | 5.0.x, 6.0.x, 7.0.x | Used by Tyk Dashboard, Pump, and MDCB | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 12.x - 16.x        | 12.x - 16.x            | Used by Tyk Dashboard, Pump, and MDCB | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
###### MDCB: Deprecated healthcheck_port and replaced with http_port

Starting with MDCB v2.6.0, the configuration parameter `http_port` has been introduced to replace the original `healthcheck_port`. This new HTTP port is designed to expose various endpoints for monitoring and debugging MDCB. For consistency and future compatibility, it is recommended to use `mdcb.httpPort`.

####### Backward compatibility:

The `mdcb.httpPort` parameter is backward compatible, meaning it will function correctly with all existing MDCB versions, ensuring a smooth transition.

####### Recommendations for users:

- **Helm Chart Adjustments**: Update your Helm chart configurations to use `mdcb.httpPort` instead of `mdcb.probes.healthcheckPort` to define the HTTP port.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens
###### Future deprecations. -->

#### Upgrade instructions
<!-- Required. For patches release (Z>0) use this: -->
For users currently on v1.4.x, we strongly recommend promptly upgrading to the latest release. 
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

###### Updated default Tyk versions
Tyk Charts 1.5 will install the following Tyk component versions by default.
- Tyk Gateway v5.4.0
- Tyk Dashboard v5.4.0
- Tyk Pump v1.10.0
- Tyk MDCB v2.6.0
- Tyk Developer Portal v1.9.0
- Tyk Operator v0.18.0

###### Tyk Operator is covered under the same umbrella
Tyk Operator can now be installed as an optional component alongside any of the following Tyk umbrella charts:
- tyk-oss
- tyk-stack
- tyk-control-plane

With bootstrapping, the `tyk-operator-conf` secret will be automatically configured during the bootstrapping process. This means that the Tyk Operator will be ready for use with just one command, simplifying the deployment and configuration process.

For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v1.5.0">}}) below.

#### Downloads
- [Source code](https://github.com/TykTechnologies/tyk-charts/archive/refs/tags/v1.5.0.tar.gz)
- [ArtifactHub - tyk-stack](https://artifacthub.io/packages/helm/tyk-helm/tyk-stack/1.5.0)
- [ArtifactHub - tyk-control-plane](https://artifacthub.io/packages/helm/tyk-helm/tyk-control-plane/1.5.0)
- [ArtifactHub - tyk-data-plane](https://artifacthub.io/packages/helm/tyk-helm/tyk-data-plane/1.5.0)
- [ArtifactHub - tyk-oss](https://artifacthub.io/packages/helm/tyk-helm/tyk-oss/1.5.0)

#### Changelog {#Changelog-v1.5.0}
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
<summary>Gateway: Add option to enable fixed window rate limiter</summary>

New field `gateway.enableFixedWindowRateLimiter` added to `tyk-gateway` chart.

This feature allows users to enable fixed window rate limiter in the Gateway. The fixed window rate limiter feature permits requests up to the configured rate limit within a specified time window, after which any additional requests are blocked until the next window. This method has minimal impact on Redis and is straightforward to implement. However, it should be noted that it does not protect against traffic spikes as it lacks spike arrest behavior. The default value for this setting is `false`.
</details>
</li>


<li>
<details>
<summary>Dashboard and Gateway: Add init containers resources parameters</summary>

Optional parameters `dashboard.initContainers.initAnalyticsConf.resources` and `gateway.initContainers.setupDirectories.resources` added to set resources for init containers in Dashboard and Gateway charts respectively.

This feature is introduced to allow the definition of resource parameters for init containers, which is particularly useful in environments with namespace quotas that require specific resource definitions. Users can now specify the resources for init containers to comply with namespace resource quotas, ensuring that the init containers operate within the defined resource limits. The resource parameters can be defined at below locations.

Tyk Dashboard chart

```yaml
dashboard:
  initContainers:
    initAnalyticsConf:
      resources: {}
      # If you do want to specify resources, uncomment the following
      # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
      # limits:
      #   cpu: 100m
      #   memory: 128Mi
      # requests:
      #   cpu: 100m
      #   memory: 128Mi
```

Tyk Gateway chart

```yaml
gateway:
  initContainers:
    setupDirectories:
	    resources: {}
      # If you do want to specify resources, uncomment the following
      # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
      # limits:
      #   cpu: 100m
      #   memory: 128Mi
      # requests:
      #   cpu: 100m
      #   memory: 128Mi
```

</details>
</li>

<li>
<details>
<summary>MDCB: Added SSL configurations for MDCB HTTP server </summary>

Added `mdcb.httpServerOptions` for SSL configuration of the MDCB HTTP server.

This feature allows users to enable SSL for the MDCB HTTP server by configuring SSL-specific options. Users can enhance the security of their MDCB HTTP server by enabling SSL. The configuration includes settings such as `useSSL`, `certificateKeyFile`, `certificateCertFile`, and `minVersion`. For other HTTP server options, users can utilize `extraEnvs` to configure additional parameters.

```yaml
mdcb:
  # defines the SSL/TLS settings for the http server where the healthcheck is exposed
  httpServerOptions:
    # if enabled then the endpoints will be served over https
    useSSL: true
    certificateKeyFile: /path-to-cert-keyfile
    certificateCertFile: /path-to-certfile
    
    # For TLS 1.0 use 769, for TLS 1.1 use 770, for TLS 1.2 use 771, for TLS 1.3 use 772
    minVersion: 771
```

</details>
</li>

<li>
<details>
<summary>MDCB: Deprecated Healthcheck Port and added HTTP Port </summary>

`mdcb.httpPort` added to define the port used for accessing MDCB HTTP endpoints.

This change deprecates the previous healthcheck port in favor of using a defined HTTP port for accessing MDCB HTTP endpoints. This update streamlines the configuration by consolidating the HTTP endpoints under a single port setting, making it simpler to manage and configure the MDCB health checks.

```yaml
mdcb:
  # This is the preferred port setting for MDCB >= v2.6.0.
  # Users should use httpPort instead of probes.healthCheckPort for newer versions.
  httpPort: 8181

  probes:
    # This port lets MDCB allow standard health checks.
    # It also defines the path for liveness and readiness probes.
    # It is used to set TYK_MDCB_HEALTHCHECKPORT and TYK_MDCB_HTTPPORT when mdcb >= v2.6.0
    # This field will be deprecated in upcoming release. Use `httpPort` instead.
    # healthCheckPort: 8181
```

</details>
</li>

<li>
<details>
<summary>Add tyk-operator dependency to umbrella charts</summary>

`global.components.operator` added to determine whether the Tyk Operator component should be installed.

This feature adds a dependency on the Tyk Operator to the umbrella charts, facilitating the installation of the Tyk Operator component. Users can now easily install the Tyk Operator component by setting the `global.components.operator` parameter. Note that the Tyk Operator requires `cert-manager` to be installed beforehand. It also expects secret `tyk-operator-conf` is present in the installation namespace. You can enable bootstrapping at `global.components.bootstrap` if you are working on a new installation to have this secret created for you. Refer to the Tyk Operator [installation guide]({{<ref "api-management/automations/operator#install-and-configure-tyk-operator">}}) for detailed information on pre-requisites.

```yaml
global:
  components:
    # operator determines whether Tyk Operator component should be installed or not.
    # Tyk Operator needs cert-manager to be installed beforehand. Make sure that cert-manager is installed.
    # For further details, please refer to https://tyk.io/docs//api-management/automations#install-and-configure-tyk-operator/
    operator: false
```

</details>
</li>

<li>
<details>
<summary>Add annotations to Tyk Stack and component Helm Charts</summary>

Introduced `annotations` values to the Tyk stack and component Helm charts to define annotations for Deployments or StatefulSets.

This enhancement allows users to define custom annotations for the Deployments or StatefulSets of Tyk components. Annotations are useful for supporting automated reloading of the Gateway or other components using tools like reloader. Previously, the Helm charts did not support any annotations at the deployment level.

Users can now add custom annotations to facilitate automation and improve the management of Tyk components. The following annotations have been added:
- Dashboard: `dashboard.annotations` for Tyk Dashboard Deployment/StatefulSet
- Dev Portal: `annotations` for Tyk Developer Portal Deployment/StatefulSet
- Gateway: `gateway.annotations` for Tyk Gateway Deployment/StatefulSet
- MDCB: `mdcb.annotations` for MDCB Deployment/StatefulSet
- Pump: `pump.annotations` for Tyk Pump Deployment

</details>
</li>

</ul>

<!-- 
###### Changed
<!-- This should be a bullet-point list of updated features. Explain:

- Why was the update necessary?
- How does the update benefit users?
- Link to documentation of the updated feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->

##### Fixed

<ul>

<li>
<details>
<summary>Dashboard: Fix misconfiguration preventing detail log display with Mongo Pump</summary>

This fix addresses a misconfiguration in the Dashboard chart that was causing the Log Browser not showing API activity logs for users utilizing Mongo Pump. The default configuration `dashboard.useShardedAnalytics` is now set to `true`, ensuring proper log visibility. Users who use Mongo Pump will now be able to view the API activity log as expected. Additionally, the correct Dashboard environment variable `TYK_DB_USESHARDEDANLAYTICS` is now set using `dashboard.useShardedAnalytics`. This enhancement ensures accurate log visibility and improves the overall user experience with the Dashboard by properly configuring sharded analytics.
</details>
</li>

<li>
<details>
<summary>Gateway: Fix issue with control port and `latest` container image tag</summary>

Resolved an issue in the Gateway chart that prevented the use of a container image with the `latest` tag when `gateway.control.enabled` is set to `true`.

This fix addresses a problem in the Gateway chart where enabling the control port (`gateway.control.enabled`) would cause an error if the container image tag was set to `latest`. The helm chart template previously assumed that all images would use semantic versioning.

Users can now use the `latest` tag for container images even when the control port is enabled. This enhancement removes the restriction and assumption of semantic versioning, providing more flexibility in specifying container image tags.
</details>
</li>

<li>
<details>
<summary>Dev Portal: Fix issue that prevent bootstrap and developer portal to be enabled at the same time</summary>

Resolved an issue in `tyk-stack` and `tyk-control-plane` chart that prevented bootstrap and devPortal components to be enabled at the same time.

When user deploy Developer Portal using `tyk-stack` or `tyk-control-plane` Helm Chart, there was a problem before that bootstrapping and devPortal cannot be enabled at the same time. It was because dev portal was depending on secret `tyk-dev-portal-conf` to start up but the secret can only be created after all pods has been created successfully via the bootstrapping job. This problem arises when user use `--wait` flag in helm install or use ArgoCD for installation.

We have fixed this issue by not passing required org ID and API key as command option during portal startup. The dev portal is configured after Pod creation via Dev Portal API. 
</details>
</li>

</ul>


<!-- ##### Security Fixes
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

## 1.4 Release Notes
### 1.4.0 Release Notes

#### Release Date -- 6 May 2024

#### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
This release has no breaking changes.

<!-- The following "Changed error log messages" section is Optional!
Instructions: We should mention in the changelog section ALL changes in our application log messages. In case we made such changes, this section should also be added, to make sure the users don't miss this notice among other changelog lines. -->
<!-- ##### Changed error log messages
Important for users who monitor Tyk components using the application logs (i.e. Tyk Gateway log, Tyk Dashboard log etc.).
We try to avoid making changes to our log messages, especially at error and critical levels. However, sometimes it's necessary. Please find the list of changes made to the application log in this release: -->

<!-- The following "|Planned Breaking Changes" section is optional!
Announce future scheduled breaking changes, e.g. Go version updates, DB driver updates etc.
##### Planned Breaking Changes
 -->

<!--
##### Dependencies
Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools 
-->

<!-- 
###### Compatibility Matrix For Tyk Components
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
| [MongoDB](https://www.mongodb.com/try/download/community)  | 5.0.x, 6.0.x, 7.0.x | 4.4.x, 5.0.x, 6.0.x, 7.0.x | Used by Tyk Dashboard, Pump, and MDCB | 
| [PostgreSQL](https://www.postgresql.org/download/)         | 11.x - 15.x LTS        | 11.x - 15.x            | Used by Tyk Dashboard, Pump, and MDCB | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
- In the `tyk-dashboard` chart, the `dashboard.hashKeys` field is deprecated and has been replaced with `.global.hashKeys`. This is to ensure Dashboard, Gateway, and MDCB always get the same hashKeys configurations. Setting `dashboard.hashKeys` will no longer take effect. Please only use `.global.hashKeys` field.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens
###### Future deprecations. -->

#### Upgrade instructions
<!-- Required. For patches release (Z>0) use this: -->
For users currently on v1.3.x, we strongly recommend promptly upgrading to the latest release. 
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

##### General availability release of tyk-control-plane chart and tyk-mdcb chart
We're pleased to announce the official release of the Tyk Helm Charts for Tyk Control Plane and MDCB! Following a successful beta phase, these charts are now stable and ready for production use. 

With this release, we aim to provide a straightforward solution for deploying and managing Tyk Control Plane and Multi-Data Center Bridge (MDCB) using Helm Charts. Whether you're looking for our recommended setup configurations or need flexibility to adapt to your architectural requirements, our Helm Charts have you covered.

To leverage this stable release and simplify your Tyk deployments, we invite you to explore our example setup for MDCB Control Plane using Helm Chart. Simply follow our [MDCB Control Plane setup guide]({{<ref "tyk-multi-data-centre/setup-controller-data-centre">}}) to get started.

##### Updated default Tyk versions
Tyk Charts 1.4 will install the following Tyk component versions by default.
- Tyk Gateway v5.3.1
- Tyk Dashboard v5.3.1
- Tyk Pump v1.9.0
- Tyk MDCB v2.5.1
- Tyk Developer Portal v1.8.5

For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v1.4.0">}}) below.

#### Downloads
- [Source code](https://github.com/TykTechnologies/tyk-charts/archive/refs/tags/v1.4.0.tar.gz)
- [ArtifactHub - tyk-stack](https://artifacthub.io/packages/helm/tyk-helm/tyk-stack/1.4.0)
- [ArtifactHub - tyk-control-plane](https://artifacthub.io/packages/helm/tyk-helm/tyk-control-plane/1.4.0)
- [ArtifactHub - tyk-data-plane](https://artifacthub.io/packages/helm/tyk-helm/tyk-data-plane/1.4.0)
- [ArtifactHub - tyk-oss](https://artifacthub.io/packages/helm/tyk-helm/tyk-oss/1.4.0)

#### Changelog {#Changelog-v1.4.0}
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
<summary>OSS: Simplify Tyk Operator setup with Kubernetes Secret creation</summary>

When you set `operatorSecret.enabled` to `true` in the `tyk-oss` chart, a Kubernetes Secret named `tyk-operator-conf` will be automatically created in the same namespace. This secret is essential for connecting Tyk Operator to the Gateway, enabling seamless management of Tyk API resources. To learn more about setting up Tyk Operator, check out [Tyk Operator installation]({{<ref "api-management/automations/operator#install-and-configure-tyk-operator">}}).
</details>
</li>


<li>
<details>
<summary>MDCB: Enhanced analytics configuration options</summary>
We have introduced new configuration options for handling analytics data flow in MDCB deployments. By default, MDCB stores aggregated analytics data from the data plane pump to SQL/Mongo. Additionally, users have the flexibility to enable Pump in the control plane, allowing MDCB to send analytics to Redis instead.

Here are the default configurations:
```yaml 
mdcb:
  # When it is set to true, instead of sending analytics directly to MongoDB / SQL,
  # MDCB can send analytics to Redis. This will allow tyk-pump to pull
  # analytics from Redis and send to your own data sinks.
  # It is used to set TYK_MDCB_FORWARDANALYTICSTOPUMP
  forwardAnalyticsToPump: false

  # This enables saving analytics in multiple keys as oppose to just having one.
  # It is useful when using a Redis cluster.
  # It also only works when TYK_MDCB_FORWARDANALYTICSTOPUMP is set to true.
  enableMultipleAnalyticsKey: true

  # This should be set to true if you choose not to store selective analytics
  dontStoreSelective: false

  # This should be set to true if you choose not to store aggregate analytics
  dontStoreAggregate: false

  # If set to true then it will not store analytics for tags having prefix specified in the list.
  # NB: Prefix “key-” is added in the list by default. This tag is added by gateway for keys.
  ignoreTagPrefixList: []

  # If enabled, it will store analytics for all the endpoints, irrespective of Track Endpoint plugin.
  trackAllPaths: false

  # If enabled, aggregate data will be generated per minute.
  storeAnalyticsPerMinute: false   
```
</details>
</li>

<li>
<details>
<summary>Tyk Control Plane: Added option to enable Dashboard hybrid organization</summary>
We've added a convenient option to enable dashboard hybrid organization during bootstrapping. This eliminates the manual step of calling the Dashboard Admin API post-deployment to enable hybrid organization, which is essential for MDCB deployment.
</details>
</li>

<li>
<details>
<summary>Enhanced security with customizable Pod or Container security context</summary>
To harden security, we have made security context of all Pods and Containers customizable. Also, we have set `runAsNonRoot: true` in all Pod's `securityContext`. This prevents the Pods from running as root users, ensuring compatibility with the [*Restricted* Pod Security Policy](https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted).
</details>
</li>

<li>
<details>
<summary>Gateway: Allow Gateway to be updated if secret value is updated</summary>
We've introduced an annotation with a checksum of the secret as a value, triggering a deployment change when the secret is updated. This ensures that pods are replaced promptly, immediately utilizing the new values from the secret. This logic applies if `global.secrets.useSecretName` is not set, as the secret is then not part of the chart.
</details>
</li>

<li>
<details>
<summary>Customizable Pod Labels Across All Components</summary>
Now, you have the flexibility to customize Pod labels in all component charts. Simply populate the `podLabels` field with your desired content, and it will be added as pod labels.
</details>
</li>

<li>
<details>
<summary>Portal: Customizable Pod annotations in tyk-dev-portal</summary>
We've added a `podAnnotations` field to the `tyk-dev-portal` chart, allowing you to customize pod annotations. Fill in the `podAnnotations` field with your specific content, and it will be added as pod annotations.
</details>
</li>

</ul>

###### Changed
<!-- This should be a bullet-point list of updated features. Explain:

- Why was the update necessary?
- How does the update benefit users?
- Link to documentation of the updated feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->
<ul>

<li>
<details>
<summary>Gateway/Pump: Removed the command in Gateway and Pump pod templates</summary>
We've removed unnecessary commands from the Gateway and Pump pod templates, allowing for the utilization of entrypoint scripts.
</details>
</li>

<li>
<details>
<summary>Dashboard: Allow arbitary image tags in tyk-dashboard</summary>
Now, you can use arbitrary image tags, including non-Semantic Versioning tags like `latest` for Dashboard. We've bypassed version checking in the Dashboard Deployment template to accommodate this flexibility.
</details>
</li>


<li>
<details>
<summary>Dashboard: Classic portal bootstrapping disabled by default</summary>
To avoid confusion with the latest Developer Portal, Classic Portal bootstrapping is now disabled by default in the Dashboard. If you wish to utilize the Classic Portal, simply enable it by setting `tyk-bootstrap.bootstrap.portal` to `true` in either the Tyk Stack or Tyk Control Plane chart.
</details>
</li>

<li>
<details>
<summary>Dashboard: Deprecation of `hashKeys` field</summary>
The `dashboard.hashKeys` field is now deprecated. Instead, users should utilize the `global.hashKeys` field to set key hashing. This ensures configuration alignment across Gateway, Dashboard, and MDCB components.
</details>
</li>

</ul>

##### Fixed

<ul>
<li>
<details>
<summary>Global: Redis TLS version specification</summary>
We've corrected a typo in the values.yaml file within the "global.redis" section. The fields `sslMinVersion` and `sslMaxVersion` have been updated to `tlsMinVersion` and `tlsMaxVersion`, respectively. This ensures accurate specification of the Redis TLS version for enhanced security.
</details>
</li>

</ul>


<!-- ##### Security Fixes
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

## 1.3. Release Notes
### 1.3.0 Release Notes

#### Release Date 05 Apr 2024

#### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
For MongoDB users: Tyk Charts 1.3.0 uses `mongo-go` as the default driver to connect to MongoDB. `mongo-go` driver is compatible with MongoDB 4.4.x and above. For MongoDB versions prior to 4.4, please set `global.mongo.driver` to `mgo`. We recommend reading [Choose a MongoDB driver]({{<ref "/tyk-self-managed#choose-a-mongodb-driver">}}) when you need to change driver setting.

<!-- The following "Changed error log messages" section is Optional!
Instructions: We should mention in the changelog section ALL changes in our application log messages. In case we made such changes, this section should also be added, to make sure the users don't miss this notice among other changelog lines. -->
<!-- ##### Changed error log messages
Important for users who monitor Tyk components using the application logs (i.e. Tyk Gateway log, Tyk Dashboard log etc.).
We try to avoid making changes to our log messages, especially at error and critical levels. However, sometimes it's necessary. Please find the list of changes made to the application log in this release: -->

<!-- The following "|Planned Breaking Changes" section is optional!
Announce future scheduled breaking changes, e.g. Go version updates, DB driver updates etc.
##### Planned Breaking Changes
 -->

<!--
##### Dependencies
Required. Use this section to announce the following types of dependencies compatible with the release:

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools 
-->

<!-- 
###### Compatibility Matrix For Tyk Components
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

When enabled at `gateway.control.ingress.enabled`, an Ingress resource will be created to allow external access to gateway's [control service]({{<ref "tyk-self-managed#change-your-control-port">}}).
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
<summary>Gateway: Customize ServiceAccount to be used</summary>

Allow users to customize `serviceAccountName` for gateway, the name of the [Service Account](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) that is going to be used by the Pods.
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
<summary>Dashboard: Customize ServiceAccount to be used</summary>

Allow users to customize `serviceAccountName` for dashboard, the name of the [Service Account](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) that is going to be used by the Pods.
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
<summary>Pump: Customize ServiceAccount to be used</summary>

Allow users to customize `serviceAccountName` for pump, the name of the [Service Account](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) that is going to be used by the Pods.
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
<summary>Portal: Customize ServiceAccount to be used</summary>

Allow users to customize `serviceAccountName` for portal, the name of the [Service Account](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) that is going to be used by the Pods.
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

Tyk Charts 1.3.0 uses `mongo-go` as the default driver to connect to MongoDB. `mongo-go` driver is compatible with MongoDB 4.4.x and above. For MongoDB versions prior to 4.4, please change `global.mongo.driver` to `mgo`. We recommend reading [Choose a MongoDB driver]({{<ref "tyk-self-managed#choose-a-mongodb-driver">}}) when you need to change driver setting.
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
Please refer to the [upgrading Tyk]({{< ref "developer-support/upgrading" >}}) page for further guidance on the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "developer-support/community" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
