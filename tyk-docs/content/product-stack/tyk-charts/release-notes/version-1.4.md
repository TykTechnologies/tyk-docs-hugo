---
title: Tyk Charts 1.4 Release Notes
date: 2024-02-05T15:49:11Z
description: "Release notes documenting updates, enhancements and changes for Tyk Charts versions within the 1.4 series."
tags: ["Tyk Charts", "Release notes", "changelog", "v1.4" ]
---

****Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**


**This page contains all release notes for version 1.4.X displayed in a reverse chronological order**

### Support Lifetime
<!-- Required. replace X.Y with this release and set the correct quarter of the year -->
Our minor releases are supported until our next minor comes out. 

---

## 1.4.0 Release Notes

##### Release Date -- 6 May 2024

#### Breaking Changes
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
##### Future deprecations. -->

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

When you set `operatorSecret.enabled` to `true` in the `tyk-oss` chart, a Kubernetes Secret named `tyk-operator-conf` will be automatically created in the same namespace. This secret is essential for connecting Tyk Operator to the Gateway, enabling seamless management of Tyk API resources. To learn more about setting up Tyk Operator, check out [Tyk Operator installation]({{<ref "tyk-stack/tyk-operator/installing-tyk-operator">}}).
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
<summary>Tyk Control Plane: Added option to enable Dashboard hybrid organisation</summary>
We've added a convenient option to enable dashboard hybrid organization during bootstrapping. This eliminates the manual step of calling the Dashboard Admin API post-deployment to enable hybrid organization, which is essential for MDCB deployment.
</details>
</li>

<li>
<details>
<summary>Enhanced security with customisable Pod or Container security context</summary>
To harden security, we have made security context of all Pods and Containers customisable. Also, we have set `runAsNonRoot: true` in all Pod's `securityContext`. This prevents the Pods from running as root users, ensuring compatibility with the [*Restricted* Pod Security Policy](https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted).
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
