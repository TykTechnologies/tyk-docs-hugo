---
title: Tyk Charts 2.2 Release Notes
description: "Release notes documenting updates, enhancements and changes for Tyk Charts versions within the 2.2 series."
tags: ["Tyk Charts", "Release notes", "changelog", "Helm Chart", "v2.2" ]
---

****Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**


**This page contains all release notes for version 2.2.X displayed in a reverse chronological order**

## Support Lifetime
<!-- Required. replace X.Y with this release and set the correct quarter of the year -->
Our minor releases are supported until our next minor comes out. 

---

## 2.2.0 Release Notes

### Release Date 09 December 2024

### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release: -->

The Tyk Helm Charts v2.2.0 release brings exciting new features, improvements, and crucial fixes to enhance deployment flexibility, customization, and reliability. Here are the highlights:
* Sidecar containers support
* Dashboard enhancements: Configurable audit log storage, Open Policy Agent (OPA) settings
* Gateway enhancements: Custom liveness and readiness probes, enhanced logging configuration, customizable HPA behavior
* Operator updates: Custom deployment annotations, 

For a comprehensive list of changes, please refer to the detailed [changelog](#Changelog-v2.2.0) below.

### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
This release has no breaking changes.

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

### Dependencies {#dependencies-2.2}

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

### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecation in this release.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens
##### Future deprecations. -->

### Upgrade instructions
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

### Downloads
- [Source code](https://github.com/TykTechnologies/tyk-charts/archive/refs/tags/v2.2.0.tar.gz)
- [ArtifactHub - tyk-stack](https://artifacthub.io/packages/helm/tyk-helm/tyk-stack/2.2.0)
- [ArtifactHub - tyk-control-plane](https://artifacthub.io/packages/helm/tyk-helm/tyk-control-plane/2.2.0)
- [ArtifactHub - tyk-data-plane](https://artifacthub.io/packages/helm/tyk-helm/tyk-data-plane/2.2.0)
- [ArtifactHub - tyk-oss](https://artifacthub.io/packages/helm/tyk-helm/tyk-oss/2.2.0)

### Changelog {#Changelog-v2.2.0}

#### Added

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

#### Changed

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

#### Fixed

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
