---
title: Tyk Charts 1.5 Release Notes
date: 2024-02-05T15:49:11Z
description: "Release notes documenting updates, enhancements and changes for Tyk Charts versions within the 1.5 series."
tags: ["Tyk Charts", "Release notes", "changelog", "v1.5" ]
---

****Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**


**This page contains all release notes for version 1.5.X displayed in a reverse chronological order**

### Support Lifetime
<!-- Required. replace X.Y with this release and set the correct quarter of the year -->
Our minor releases are supported until our next minor comes out. 

---

## 1.5.0 Release Notes

##### Release Date 4 July 2024

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

With PostgreSQL v11 has reach [EOL](https://www.postgresql.org/support/versioning/) on November 2023, we can no longer guarantee full compatibility with this version of the database. If you are [using PostgreSQL]({{<ref "planning-for-production/database-settings/postgresql">}}) we recommend that you upgrade to a version that we have tested with, as indicated below.

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
##### MDCB: Deprecated healthcheck_port and replaced with http_port

Starting with MDCB v2.6.0, the configuration parameter `http_port` has been introduced to replace the original `healthcheck_port`. This new HTTP port is designed to expose various endpoints for monitoring and debugging MDCB. For consistency and future compatibility, it is recommended to use `mdcb.httpPort`.

###### Backward compatibility:

The `mdcb.httpPort` parameter is backward compatible, meaning it will function correctly with all existing MDCB versions, ensuring a smooth transition.

###### Recommendations for users:

- **Helm Chart Adjustments**: Update your Helm chart configurations to use `mdcb.httpPort` instead of `mdcb.probes.healthcheckPort` to define the HTTP port.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens
##### Future deprecations. -->

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

##### Updated default Tyk versions
Tyk Charts 1.5 will install the following Tyk component versions by default.
- Tyk Gateway v5.4.0
- Tyk Dashboard v5.4.0
- Tyk Pump v1.10.0
- Tyk MDCB v2.6.0
- Tyk Developer Portal v1.9.0
- Tyk Operator v0.18.0

##### Tyk Operator is covered under the same umbrella
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

This feature adds a dependency on the Tyk Operator to the umbrella charts, facilitating the installation of the Tyk Operator component. Users can now easily install the Tyk Operator component by setting the `global.components.operator` parameter. Note that the Tyk Operator requires `cert-manager` to be installed beforehand. It also expects secret `tyk-operator-conf` is present in the installation namespace. You can enable bootstrapping at `global.components.bootstrap` if you are working on a new installation to have this secret created for you. Refer to the Tyk Operator [installation guide]({{<ref "/api-management/automations#install-and-configure-tyk-operator">}}) for detailed information on pre-requisites.

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
##### Changed
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
