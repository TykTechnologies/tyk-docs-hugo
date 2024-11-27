---
title: Tyk Charts 2.1 Release Notes
description: "Release notes documenting updates, enhancements and changes for Tyk Charts versions within the 2.1 series."
tags: ["Tyk Charts", "Release notes", "changelog", "v2.1" ]
---

****Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**


**This page contains all release notes for version 2.1.X displayed in a reverse chronological order**

## Support Lifetime
<!-- Required. replace X.Y with this release and set the correct quarter of the year -->
Our minor releases are supported until our next minor comes out. 

---

## 2.1.0 Release Notes

### Release Date 10 Oct 2024

### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release: -->

Added the ability to specify a static IP for Kubernetes LoadBalancer services, giving users more control over network configurations for the Tyk Gateway and Dashboard. Added an option to configure the Dashboard container port, addressing issues with restricted port permissions. Updated the default versions of Tyk components.

For a comprehensive list of changes, please refer to the detailed [changelog](#Changelog-v2.1.0) below.

### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
This release has no breaking changes.

However, if you are upgrading to [Tyk Operator v1.0]({{<ref "product-stack/tyk-operator/release-notes/operator-1.0.md">}}) using the Helm Chart, please read the [license requirement]({{<ref "product-stack/tyk-operator/release-notes/operator-1.0.md#breaking-changes">}}) and Tyk Operator [installation and upgrade instructions]({{<ref "/api-management/automations#install-and-configure-tyk-operator">}}) carefully.

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

### Dependencies {#dependencies-2.1}

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

### Downloads
- [Source code](https://github.com/TykTechnologies/tyk-charts/archive/refs/tags/v2.1.0.tar.gz)
- [ArtifactHub - tyk-stack](https://artifacthub.io/packages/helm/tyk-helm/tyk-stack/2.1.0)
- [ArtifactHub - tyk-control-plane](https://artifacthub.io/packages/helm/tyk-helm/tyk-control-plane/2.1.0)
- [ArtifactHub - tyk-data-plane](https://artifacthub.io/packages/helm/tyk-helm/tyk-data-plane/2.1.0)
- [ArtifactHub - tyk-oss](https://artifacthub.io/packages/helm/tyk-helm/tyk-oss/2.1.0)

### Changelog {#Changelog-v2.1.0}

#### Added

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

#### Changed

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
