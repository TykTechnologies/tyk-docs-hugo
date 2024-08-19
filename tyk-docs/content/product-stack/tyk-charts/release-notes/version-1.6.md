---
title: Tyk Charts 1.6 Release Notes
date: 2024-07-31T15:49:10Z
description: "Release notes documenting updates, enhancements and changes for Tyk Charts versions within the 1.6 series."
tags: ["Tyk Charts", "Release notes", "changelog", "v1.6" ]
---

****Open Source** ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**


**This page contains all release notes for version 1.6.X displayed in a reverse chronological order**

### Support Lifetime
<!-- Required. replace X.Y with this release and set the correct quarter of the year -->
Our minor releases are supported until our next minor comes out. 

---

## 1.6.0 Release Notes

##### Release Date 14 August 2024

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
