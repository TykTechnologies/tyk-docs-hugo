---
title: Tyk Dashboard 5.2 Release Notes
date: 2023-09-27T15:49:11Z
description: "Release notes documenting updates, enhancements, and changes for Tyk Dashboard versions within the 5.2.X series."
tags: ["Tyk Dashboard", "Release notes", "v5.2", "5.2.0", "5.2", "changelog", "5.2.1", "5.2.2", "5.2.3", "5.2.4"]
---

**Licensed Protected Product**

**This page contains all release notes for version 5.2.X displayed in reverse chronological order**

## Support Lifetime
Minor releases are supported until our next minor comes out. There is no 5.3 scheduled in Q4. Subsequently, 5.2 will remain in support until our next LTS version comes out in March 2024.

---

## 5.2.5 Release Notes 

**Release Date 19 Dec 2023**

### Breaking Changes

**Attention**: Please read carefully this section. We have two topics to report:

### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/special-releases-and-features/early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

### Deprecations
There are no deprecations in this release.

### Upgrade Instructions
If you are using a 5.2.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.

### Release Highlights
Dashboard 5.2.5 was version bumped only, to align with Gateway 5.2.5. Subsequently, no changes were encountered in release 5.2.5. Gateway 5.2.5 was a critical patch release. For further information please see the release notes for Gateway [v5.2.5]({{< ref "product-stack/tyk-gateway/release-notes/version-5.2.md" >}}) 

### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v5.2.5/images/sha256-c09cb03dd491e18bb84a0d9d4e71177eb1396cd5debef694f1c86962dbee10c6?context=explore)

### Changelog {#Changelog-v5.2.5}
Since this release was version bumped only to align with Gateway v5.2.5, no changes were encountered in this release.

---



---

## 5.2.4 Release Notes 

**Release Date 7 Dec 2023**

### Breaking Changes

**Attention**: Please read carefully this section. We have two topics to report:

### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/special-releases-and-features/early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

### Deprecations
There are no deprecations in this release.

### Upgrade Instructions
If you are using a 5.2.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.

### Release Highlights
This release primarily focuses on bug fixes. 
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.4">}}) below.

### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.2.4/images/sha256-8862e98c6ffd67d47b496275b228f4f8faae4359b9c8e42bcd8bd8a47d0c45e4?context=explore)

### Changelog {#Changelog-v5.2.4}

#### Fixed

<ul>
 <li>
 <details>
 <summary>Poor experience when using the Open Policy Agent (OPA) editor</summary>

 Fixed two UI issues with the [OPA editor]({{< ref "tyk-dashboard/open-policy-agent#using-the-open-policy-agent-in-the-dashboard" >}}) in the Tyk Dashboard to improve experience when using this feature. Scrolling beyond the end of the OPA window does not now start to scroll the API Designer window, and minimizing then re-expanding the OPA editor no longer limits the text to one line.
 </details>
 </li>
 <li>
 <details>
 <summary>Annoying bugs when setting Dashboard user access controls</summary>

 Fixed minor issues in the Dashboard UI when configuring the user access controls for the Identity Management (TIB) and Real Time Notifications permissions.
 </details>
 </li>
 <li>
 <details>
 <summary>Unable to select Mutual TLS version 1.3 from the API Designer dropdown</summary>

 Fixed an issue where TLS 1.3 was not offered as an option in the "Minimum TLS version" dropdown in the API Designer. Also we gave better (human readable) names to the options, like TLS 1.0, TLS 1.1 etc. instead of their corresponding numbers 769, 770 etc.
 </details>
 </li>
 <li>
 <details>
 <summary>Tyk Dashboard panic when using mongo-go driver</summary>

 Fixed a situation where Tyk Dashboard could panic when using the mongo-go driver.
 </details>
 </li>
 <li>
 <details>
 <summary>Confusing error message if user tries to modify Tyk OAS API using a Tyk Classic API endpoint/summary>

 Improved the error message that is returned when user tries to update a Tyk OAS API using a Tyk Classic API endpoint when `allow_unsafe_oas` is not enabled.
 </details>
 </li>
</ul>

#### Added

<ul>
 <li>
 <details>
 <summary>Implemented a `tyk version` command that provides more details about the Tyk Dashboard build</summary>

 This prints the release version, git commit, Go version used, architecture and other build details.
 </details>
 </li>
</ul>

---

## 5.2.3 Release Notes 

**Release Date 21 Nov 2023**

### Breaking Changes

**Attention**: Please read carefully this section. We have two topics to report:

### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/special-releases-and-features/early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

### Deprecations
There are no deprecations in this release.

### Upgrade Instructions
If you are using a 5.2.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.

### Release Highlights
This release primarily focuses on bug fixes. 
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.3">}}) below.

### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.2.3/images/sha256-7d61ed3ee3f03ff0e2f91be71a9113b90ef6637b1cef1f30d4c3e04ead09fa6a?context=explore)

### Changelog {#Changelog-v5.2.3}

#### Fixed

<ul>
<li>
<details>
<summary>Unable to resize OPA editor in Tyk Dashboard</summary>

Fixed an issue where the [OPA editor]({{< ref "tyk-dashboard/open-policy-agent#using-the-open-policy-agent-in-the-dashboard" >}}) was not resizable. The fix ensures the floating OPA editor is now resizable and the resizing operation is smooth, improving user experience.
</details>
</li>
<li>
<details>
<summary>User Search not working unless you enter the full email address</summary>

Fixed an issue where the [User Search]({{< ref "basic-config-and-security/security/dashboard/search-users" >}}) was not working unless the full email address was entered. The fix restores the functionality of showing suggestions for names as they are typed in, improving user experience and search efficiency.
</details>
</li>
<li>
<details>
<summary>Dashboard 4.1.0+ cannot retrieve certificates from downrev gateways</summary>

Fixed an issue where Dashboard 4.1.0+ was unable to retrieve certificates from a Tyk Gateway with a version lower than 4.1.0. This was due to a change made in the 4.1 versions relating to the way certificate details are retrieved in the dashboard; in the newer versions, we can view more details of the certificates. Now you can use Tyk Dashboard with any version of the Tyk Gateway and still retrieve and view certificate details; the fix ensures smooth staged upgrades and prevents potential issues for customers who have weeks or months between upgrading components.
</details>
</li>
<li>
<details>
<summary>Authentication Mode changes after changing API Protocol in API Designer</summary>

Fixed an issue in the Tyk Classic API Designer where if you changed the protocol for an API (for example from HTTP to HTTPS) then the authentication mechanism would be automatically set to Authentication Token.
</details>
</li>
<li>
<details>
<summary>Unable to configure external OAuth flow using Raw API editor</summary>

Fixed an issue in the Classic API Designer where the 'use_standard_auth' value was constantly reverting to 'true' when editing an API with an [external OAuth flow]({{< ref "/api-management/authentication-authorization#integrate-external-oauth-middleware" >}}). This fix ensures the 'use_standard_auth' value remains consistent, enabling the use of external OAuth via the Raw API editor.
</details>
</li>
<li>
<details>
<summary>If the GraphQL subscription upstream disconnects, the UI is unaware of the reconnection event</summary> 

Fixed an issue with failed GraphQL subscriptions between the upstream and the Dashboard. When an upstream subscription was disconnected and later reconnected, the UI did not update to reflect the reconnection, preventing the seamless consumption of messages. Now the Dashboard can continue consuming messages after upstream reconnects.
</details>
</li>
</ul>

---

## 5.2.2 Release Notes 

**Release Date 31 Oct 2023**

### Breaking Changes

**Attention**: Please read carefully this section. We have two topics to report:

### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/special-releases-and-features/early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

### Deprecations
There are no deprecations in this release.

### Upgrade Instructions
If you are using a 5.2.x version, we advise you to upgrade ASAP to this latest release. If you are on an older version, you should skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.

### Release Highlights
This release primarily focuses on bug fixes. 
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.2">}}) below.

### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.2.2/images/sha256-c6e701e270ebb2fed815483723375c454d0479ae41b5be2e1a6198b8d1e1a154?context=explore)

### Changelog {#Changelog-v5.2.2}

#### Added

<ul>
<li>
<details>
<summary>Added new Dashboard configuration option `allow_unsafe_oas`</summary>

Added a new Dashboard configuration option `allow_unsafe_oas`. This permits the modification of Tyk OAS APIs via the Tyk Classic API endpoints. This is not a recommended action due to the risk of inconsistent behavior and potential for breaking changes while Tyk OAS is in [Early Access]({{< ref "developer-support/special-releases-and-features/early-access-features" >}}). This is provided for early adopters and will be deprecated later, once Tyk OAS reaches full maturity.
</summary>
</details>
</li>
</ul>

#### Fixed
<ul>
<li>
<details>
<summary>Fixed security policy grant permissions issue encountered with MongoDB</summary>

Fixed an issue when using MongoDB and [Tyk Security Policies]({{< ref "getting-started/key-concepts/what-is-a-security-policy" >}}) where Tyk could incorrectly grant access to an API after that API had been deleted from the associated policy. This was due to the policy cleaning operation that is triggered when an API is deleted from a policy in a MongoDB installation. With this fix, the policy cleaning operation will not remove the final (deleted) API from the policy; Tyk recognizes that the API record is invalid and denies granting access rights to the key.
</details>
</li>
<li>
<details>
<summary>User might not correctly inherit all permissions from their user group</summary>

Fixed an issue in the Tyk Dashboard where a user might not correctly inherit all permissions from their user group, and could incorrectly be granted visibility of Identity Management.
</details>
<li>
<details>
<summary>Tyk would not store Policy ID in the API Definition for a policy that did not exist</summary>

Fixed an issue where Tyk would not store the *Policy Id* in the *API Definition* for a policy that did not exist. When using *JWT Authentication*, the *JWT Default Policy Id* is stored in the *API Definition*. If this policy had not been created in Tyk at the time the *API Definition* was created, Tyk Dashboard would invalidate the field in the *API Definition*. When the policy was later created, there would be no reference to it from the *API Definition*. This was a particular issue when using *Tyk Operator* to manage the creation of assets on Tyk.
</details>
</li>
<li>
<details>
<summary>Service Uptime page did not report the number of success hits correctly</summary>

Fixed an issue in the Dashboard *Service Uptime* page where the number of success hits was being incorrectly reported as the total number of hits, inclusive of failures. After this fix, the *Success Column* displays only the number of success hits.
</details>
</li>
<li>
<details>
<summary>High priority CVEs fixed</summary>

Fixed the following high priority CVEs identified in the Tyk Dashboard, providing increased protection against security vulnerabilities:

- [CVE-2022-33082](https://nvd.nist.gov/vuln/detail/CVE-2022-33082)
- [CVE-2022-28946](https://nvd.nist.gov/vuln/detail/CVE-2022-28946)
- [CVE-2021-23409](https://nvd.nist.gov/vuln/detail/CVE-2021-23409)
- [CVE-2021-23351](https://nvd.nist.gov/vuln/detail/CVE-2021-23351)
- [CVE-2023-28119](https://nvd.nist.gov/vuln/detail/CVE-2023-28119)
- [CVE-2022-21698](https://nvd.nist.gov/vuln/detail/CVE-2022-21698)
- [CVE-2020-26160](https://nvd.nist.gov/vuln/detail/CVE-2020-26160)
- [CVE-2019-19794](https://nvd.nist.gov/vuln/detail/CVE-2019-19794)
- [CVE-2010-0928](https://nvd.nist.gov/vuln/detail/CVE-2010-0928)
- [CVE-2007-6755](https://nvd.nist.gov/vuln/detail/CVE-2007-6755)
- [CVE-2018-5709](https://nvd.nist.gov/vuln/detail/CVE-2018-5709)
</details>
</li>
<li>
<details>
<summary>Azure SAML2.0 Identity Provider was preventing users from authenticating</summary>

Fixed an issue encountered with *Azure SAML2.0 Identity Provider* that was preventing users from authenticating.
</details>
</li>
<li>
<details>
<summary>Fields defined in Uptime_Tests.Check_List were not correctly handled in API Designer</summary>

Fixed an issue encountered with the *API Designer* where fields defined in *Uptime_Tests.Check_List* were not correctly handled. Uptime tests can now be configured for *Tyk Classic APIs* using the *Raw API Definition* editor.
</details>
</li>
<li>
<details>
<summary>Tyk Dashboard API security vulnerability</summary>

Fixed a security vulnerability with the Tyk Dashboard API where the `api_version` and `api_id` query parameters were potential targets for SQL injection attack.
</details>
</li>
</ul>

#### Updated

<ul>
<li>
<details>
<summary>Renamed License Limit to License Entitlement on Tyk Dashboard's Licensing Statistics screen</summary>

On Tyk Dashboard's Licensing Statistics screen, we have renamed the License Limit to License Entitlement. We've also improved the experience when there is no limit in the license by hiding the License Entitlement line if no limit is set.
</details>
</li>
</ul>

---

## 5.2.1 Release Notes 

**Release Date 10 Oct 2023**

### Breaking Changes

### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/special-releases-and-features/early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible result in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

### Deprecations
There are no deprecations in this release.

### Upgrade Instructions
If you are on a 5.2.0 we advise you to upgrade ASAP and if you are on an older version skip 5.2.0 and upgrade directly to this release. Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.

### Release Highlights
This release primarily focuses on bug fixes. 
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.0">}}) below.

### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.2.1/images/sha256-2f9d8af0e57f7fe4afb618dcf34772c001104dc0ec62a27541d12dc9ae90d5c8?context=explore)

### Changelog {#Changelog-v5.2.1}

#### Added

<ul>
<li>
<details>
<summary>Support added to Tyk Dashboard API for Tyk Sync to fully support OAS API Definitions</summary>

Added support to Tyk Dashboard API so that Tyk Sync can fully support Tyk OAS API Definitions; this will be enabled from Tyk Sync version 1.4.1.
</details>
</li>
</ul>

#### Fixed

<ul>
<li>
<details>
<summary>Pagination in APIs screen was breaking for API of type GraphQL/UDG</summary>

Fixed a bug in the *Tyk Dashboard* UI where pagination in the APIs screen was breaking for API of type GraphQL/UDG. This resulted in the page failing to load data and displaying a 'No data to display' message.
</details>
</li>

<li>
<details>
<summary>Unable to disable Add Graph Operation checkbox in the GraphQL data source configuration screen</summary>

Fixed an issue where the 'Add GraphQL Operation' checkbox in the GraphQL data source configuration screen couldn't be disabled, even when no operation was added. Now, its state can be adjusted based on the presence of GraphQL operations and variables.
</details>
</li>
</ul>

---

## 5.2.0 Release Notes 

**Release Date 29 Sep 2023**

### Breaking Changes

**Attention**: Please read carefully this section. We have two topics to report:

### Early Access Features:
Please note that the `Tyk OAS APIs` feature, currently marked as *Early Access*, is subject to breaking changes in subsequent releases. Please refer to our [Early Access guide]({{<ref "developer-support/special-releases-and-features/early-access-features">}}) for specific details. Upgrading to a new version may introduce changes that are not backwards-compatible. Downgrading or reverting an upgrade may not be possible resulting in a broken installation.

Users are strongly advised to follow the recommended upgrade instructions provided by Tyk before applying any updates.

### Deprecations
There are no deprecations in this release.

### Release Highlights

We're thrilled to bring you some exciting enhancements and crucial fixes to improve your experience with Tyk Dashboard. For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v5.2.0">}}) below.

Configure Caching Timeouts Per API Endpoint and Enable Advanced Caching Options From Within Dashboard

We’ve added the ability to [configure]({{< ref "product-stack/tyk-gateway/middleware/endpoint-cache-tyk-oas#configuring-the-middleware-in-the-tyk-oas-api-definition" >}}) per-endpoint timeouts for Tyk’s response cache, giving you increased flexibility to tailor your APIs to your upstream services. While doing this, we’ve also fixed a longstanding issue within the *Tyk Dashboard* so that you can configure more of the [advanced caching]({{< ref "product-stack/tyk-gateway/middleware/endpoint-cache-tyk-oas#configuring-the-middleware-in-the-api-designer" >}}) options from within the UI.

#### Added Body Transform Middleware to Tyk OAS API Definition

With this release, we are adding the much requested *Body Transformations* to *Tyk OAS API Definition*. You can now [configure]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#transformbody" >}}) middleware for both [request]({{< ref "transform-traffic/request-body" >}}) and [response]({{< ref "advanced-configuration/transform-traffic/response-body" >}}) *Body Transformations* and - as a *Tyk Dashboard* user - you’ll be able to do so from within our simple and elegant API Designer tool. Visually test and preview *Body Transformations* from within the API Designer.

#### Track Usage Of License APIs, Gateways And Distributed Data Planes Over Time

Within the Dashboard UI, we’ve enhanced the *Licensing* information page, so that you can visualise your usage of licensed APIs, *Gateways* and distributed *Data Planes* over time. This allows the visualisation of deployed and active APIs using a range of different types of interactive charts.


### Downloads

Tyk Dashboard 5.2 - [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.2.0/images/sha256-28ff62e1e1208d02fec44cf84c279a5f780207ccbb7c3bdef23d1bf8fc6af3b8?context=explore)


### API Changes

The following is a list of API changes in this release. Please visit our [Postman collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/overview) for further information on our APIs.

<ul>
<li>
<details>
<summary>Added <em>/system/stats</em> endpoint to provide statistics for total and active APIs deployed</summary>

Added a new [endpoint]({{< ref "/tyk-dashboard-api" >}}), */system/stats*, to provide insight and operational statistics on total and active APIs deployed. The endpoint's flexible date filtering options, equip users to obtain comprehensive insights into usage trends.
</details>
</li>
</ul>


### Changelog {#Changelog-v5.2.0}

#### Added

<ul>
<li>
<details>
<summary>Configure request and response body transformations</summary>

Added support for API developers to easily [configure]({{< ref "tyk-apis/tyk-gateway-api/oas/x-tyk-oas-doc#transformbody" >}}) both request and response *Body Transformations* for more precise data management when working with *Tyk OAS* APIs. Define input data, craft transformation templates and test them against specific inputs for reliable customization.
</details>
</li>
<li>
<details>
<summary>Adding a new data source is simpler when working with UDG</summary>

Adding a new [data source]({{< ref "universal-data-graph/udg-getting-started/connect-datasource#3-configure-datasource-details" >}}) is simpler when working with *UDG*. The default value for the *data source name* is pre-filled, saving time. The *data source name* is pre-filled in the format *fieldName_typeName*, with *typeName* being the name of any GraphQL type.
</details>
</li>
<li>
<details>
<summary>Added <em>/system/stats</em> endpoint to provide statistics for total and active APIs deployed</summary>

Added a new [endpoint]({{< ref "/tyk-dashboard-api" >}}), */system/stats*, to provide insight and operational statistics on total and active APIs deployed. The endpoint's flexible date filtering options, equip users to obtain comprehensive insights into usage trends.
</details>
</li>
</ul>

#### Changed
<ul>
<li>
<details>
<summary>Saving operation is simpler when creating an API within the API Designer</summary>

Improved the flow when creating an API within the *API Designer* so that you remain on the same screen after saving. This means you can continue editing without having to navigate back to the screen to make subsequent changes.
</details>
</li>
<li>
<details>
<summary>Saving a UDG data source is simpler and quicker</summary>

Updated the [screen]({{< ref "/universal-data-graph/udg-getting-started/connect-datasource" >}}) for configuring and saving *UDG* data sources. The *Save* button has been replaced with *Save & Update API* button and users no longer need to click *Update* at the top of the screen to persist changes. Saving a *UDG* data source is now simpler and quicker.
</details>
</li>
<li>
<details>
<summary>Enhanced API usage monitoring added to Dashboard</summary>

Updated the *Dashboard* with enhanced API usage monitoring. Users now benefit from an insightful chart on the *Licensing Statistics* page, detailing: maximum, minimum and average counts of created and active APIs. Flexible date filtering, license limit reference lines and the ability to toggle between line and bar graphs empower users to monitor usage effortlessly, ensuring license adherence.
</details>
</li>
<li>
<details>
<summary>New chart introduced on License Statistics page to show number of deployed Data Planes</summary>

A new chart has been introduced on the *License Statistics* page that presents the number of deployed *Data Planes*. This addition enables users to easily monitor their *Data Plane* usage and nearness to their contract limits.
</details>
</li>
</ul>

#### Fixed

<ul>
<li>
<details>
<summary>Advanced cache config data was absent in the Raw Editor</summary>

Fixed an issue where *advanced_cache_config* data was absent in the *Raw Editor*. This fix now ensures that *advanced_cache_config* can be configured. Furthermore, API modifications in the *Designer* no longer lead to data loss, safeguarding cache configuration consistency. The UI now offers a clear view of advanced cache settings, including the new *Timeout* field and *Cache* response codes fields.
</details>
</li>
<li>
<details>
<summary>403 errors were raised with JWT claim names containing spaces</summary>

Fixed an issue with *JWT claim names* containing spaces. Previously 403 errors were raised when using tokens containing such claims.
</details>
</li>
<li>
<details>
<summary>Popular endpoints were not displayed in Tyk Dashboard when SQL aggregated analytics was enabled</summary>

Fixed an issue where *popular endpoints* data was not displayed in *Tyk Dashboard* with *SQL aggregated analytics* enabled. Users can now view *popular endpoints* when viewing *Traffic Activity* per API or filtering by API with *SQL aggregated analytics* enabled.
</details>
</li>
<li>
<details>
<summary>Fixed security issue with expired certificates</summary>

Fixed a potential security vulnerability where *static* or *dynamic mTLS* requests with expired certificates could be proxied upstream.
</details>
</li>
<li>
<details>
<summary>Users were unable to view request analytics for a specific date in the API Activity dashboard</summary>

Fixed an issue in the *API Activity* dashboard where users were unable to view request analytics for a specific date. Subsequently, users can now make informed decisions based on access to this data. 
</details>
</li>
<li>
<details>
<summary>Enforced timeout configuration parameter for an API endpoint was not validated</summary>

Fixed an issue where the [Enforced Timeout]({{< ref "planning-for-production/ensure-high-availability/enforced-timeouts" >}}) configuration parameter of an API endpoint accepted negative values, without displaying validation errors. With this fix, users receive clear feedback and prevent unintended configurations.
</details>
</li>
<li>
<details>
<summary>Duplicate APIs could be created when click save button multiple times in API Designer</summary>

Fixed an issue in *Tyk Dashboard* where duplicate APIs could be created with the same names and listen paths if you clicked multiple times on the *save* button in the API Designer. Now, this is not possible anymore and there is no risk of creating multiple APIs with the same name.
</li>
</details>
<li>
<details>
<summary>Connection issues were encountered with MongoDB connection strings</summary>

Fixed an issue with *MongoDB* connection strings. To ensure consistent compatibility with both *mgo* and *mongo-go* drivers, users should now utilize URL-encoded values within the *MongoDB* connection string's username and password fields when they contain characters like "?", "@". This resolves the need for different handling across *MongoDB* drivers.
</details>
</li>
</ul>

---

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### API Documentation

- [OpenAPI Document]({{<ref "tyk-dashboard-api">}})
- [Postman Collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/collection/27225007-374cc3d0-f16d-4620-a435-68c53553ca40)

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
