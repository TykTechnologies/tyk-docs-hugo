---
title: Tyk Charts 2.0 Release Notes
description: "Release notes documenting updates, enhancements and changes for Tyk Charts versions within the 2.0 series."
tags: ["Tyk Charts", "Release notes", "changelog", "v2.0" ]
---

****Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**


**This page contains all release notes for version 2.0.X displayed in a reverse chronological order**

### Support Lifetime
<!-- Required. replace X.Y with this release and set the correct quarter of the year -->
Our minor releases are supported until our next minor comes out. 

---

## 2.0.0 Release Notes

##### Release Date 26 September 2024

#### Breaking Changes

#### 1. URL Path Matching Configuration Changes

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
- For production setup guidance, see [this guide]({{<ref "planning-for-production#ensure-you-are-matching-only-the-url-paths-that-you-want-to-match">}}).
- Configure the new options via the Helm chart, and test the changes in a non-production environment before upgrading.

#### 2. Default Tyk Component Versions

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
##### Future deprecations. -->

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
##### Changed
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
