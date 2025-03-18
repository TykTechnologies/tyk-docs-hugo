---
title: Tyk Cloud Release Notes
date: xx
description: "Release notes documenting updates, enhancements, and changes for Tyk Cloud"
tags: ["Tyk Cloud", "Release notes", "v1.23", "1.23.0", "changelog"]

---

## 1.25.0 Release Notes

### Release Date 10 of February 2025

### Release Highlights
This Tyk Cloud update enhances Gateway version management, ensuring a more streamlined, secure, and user-friendly experience. With the new UI versioning updates, users have clearer visibility into supported versions, direct upgrade recommendations, and the ability to automate version upgrades for effortless maintenance.
These changes empower teams to stay on supported, secure, and high-performing versions.
For more details, check out the [documentation on Gateway versioning and auto-upgrades](https://tyk.io/docs/developer-support/release-notes/special-releases/)

### Breaking Changes

There are no breaking changes in this release.

### Downloads
- [latest version of Mserv](https://github.com/TykTechnologies/mserv/releases/latest)

### Deprecations

There are no deprecations in this release.

### Changelog {#Changelog-v1.25.0}

#### Added

<ul>
<li>
<details>
<summary>Custom Domains for API Manager Dashboard</summary>

Tyk Cloud now supports custom domains for the API Manager Dashboard, allowing organizations to align their domain with their branding and provide a seamless experience for internal and external stakeholders.
</details>
</li>  

<li>
<details>
<summary>Clearer LTS Version Support & Recommendations</summary>

Tyk Cloud now provides improved visibility into supported LTS versions. Every patch version within the current LTS branch is labeled `Supported`, while the latest patch is marked as `Recommended`. This update eliminates confusion around deprecated versions and prevents unexpected `unsupported` status changes, allowing for smoother upgrade planning and system stability.
</details>
</li>
  
</ul>

#### Changed

<ul>
<li>
<details>
<summary>Improved Organization Overview Page</summary>

We have redesigned the Overview page in Tyk Cloud to provide a more streamlined and actionable summary of an organization's key elements.
Users can now toggle between two views:
- **Task View**: Groups control planes and developer portals by high-level jobs to be done, such as managing APIs or publishing products.
- **Environment View**: Displays control planes and developer portals grouped by environment, making it easier to navigate large setups.
Additionally, we have moved organization statistics to a new System Usage page under Deployments.
</details>
</li>
</ul>

#### Fixed

<ul>
<li>
<details>
<summary>Removed "Delete User" Button for Team Admins</summary>

Team admins will no longer see the `Delete User` button when viewing the profiles of other team admins. Previously, this button was incorrectly displayed, leading to an error when clicked. This fix ensures the UI reflects the correct permissions and prevents confusion for administrators managing team members.
</details>
</li>    
</ul>

---

## 1.24.0 Release Notes

### 1.24.2 Release Notes

#### Release Date 13 of January 2025

#### Release Highlights

This Tyk Cloud update resolves an issue related to Telemetry export configurations. Previously, when deploying a Data Plane in a region different from the Control Plane, Telemetry export settings could encounter compatibility issues. With this patch, Telemetry export configuration now works seamlessly across regional deployments, ensuring consistent observability for distributed Tyk Cloud setups.


#### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
There are no breaking changes in this release

#### Downloads
- [latest version of Mserv](https://github.com/TykTechnologies/mserv/releases/latest)

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecations in this release

#### Changelog {#Changelog-v1.23.0}
<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.
Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

##### Fixed
<!-- This section should be a bullet point list that describes the issues fixed in the release. For each fixed issue explain:
- What problem the issue caused
- How was the issue fixed
- Link to (new) documentation created as a result of a fix. For example, a new configuration parameter may have been introduced and documented for the fix
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.
Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->

<ul>
  <li>
    <details>
      <summary>
        Fixed Telemetry export configuration for cross-region deployments
      </summary>
      The Telemetry export configuration now functions as expected when a Data Plane is deployed in a region different from the Control Plane, ensuring compatibility across distributed setups.
    </details>
  </li>
</ul>

### 1.24.1 Release Notes

#### Release Date 16 of December 2024

#### Release Highlights

This Tyk Cloud hotfix addresses a critical issue affecting Control Plane Redis scheduling. In certain scenarios, re-deploying existing CDPs (Control Data Planes) that were created before the 1.24.0 release would fail due to an unintended modification of Redis deployment selectors.

#### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
There are no breaking changes in this release

#### Downloads
- [latest version of Mserv](https://github.com/TykTechnologies/mserv/releases/latest)

#### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecations in this release

#### Changelog {#Changelog-v1.23.0}
<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.
Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

##### Fixed
<!-- This section should be a bullet point list that describes the issues fixed in the release. For each fixed issue explain:
- What problem the issue caused
- How was the issue fixed
- Link to (new) documentation created as a result of a fix. For example, a new configuration parameter may have been introduced and documented for the fix
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.
Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->

<ul>
  <li>
    <details>
      <summary>
        Fixed Redis scheduling issues in Control Plane deployments
      </summary>
      Corrected the Redis deployment selectors to prevent errors during both re-deployments of existing CDPs and deployments of new CDPs.
    </details>
  </li>
</ul>

### 1.24.0 Release Notes

#### Release Date 16 of December 2024

#### Release Highlights

This Tyk Cloud update introduces a groundbreaking feature for enhanced API observability and troubleshooting. With the new native Telemetry export, Tyk Cloud now allows organizations to seamlessly integrate their deployments with a variety of popular observability platforms, including built-in support for Datadog, Dynatrace, Elastic, and New Relic. For other systems, the custom provider option ensures compatibility with any platform that supports the OpenTelemetry Protocol (OTLP).

This feature enables trace export capabilities, providing deep insights into API and plugin performance. It marks the first step in Tyk Cloud’s broader observability journey, empowering users to monitor and troubleshoot their APIs more effectively while leveraging their existing observability tools.

For more details, check out the [documentation on setting up Telemetry export]({{< ref "tyk-cloud#enabling-telemetry-in-tyk-cloud" >}}).

### Breaking Changes

There are no breaking changes in this release

#### Downloads
- [latest version of Mserv](https://github.com/TykTechnologies/mserv/releases/latest)

### Deprecations

There are no deprecations in this release

---

## 1.23 Release Notes

### Release Date 14 of November 2024

### Release Highlights

This Tyk Cloud update introduces features that improve both flexibility in plugin management and user onboarding. Now, [Mserv]({{< ref "tyk-cloud#uploading-your-bundle" >}}),  supports **multiple plugin bundles**, allowing greater customization and easier deployment of plugin configurations. Additionally, we added an **embedded product tour** to enhance the deployment experience, offering a guided walkthrough of Tyk Dashboard’s features, ideal for users familiarizing themselves with the platform during onboarding.

For a comprehensive list of improvements and fixes, please check the detailed [changelog]({{< ref "#Changelog-v1.23.0">}}) below.

### Breaking Changes

There are no breaking changes in this release

### Downloads

- [latest version of Mserv](https://github.com/TykTechnologies/mserv/releases/latest)

### Deprecations

There are no deprecations in this release

### Changelog {#Changelog-v1.23.0}

#### Added

<ul>
<li>
<details>
<summary>Contact form for POC requests on trial expiration</summary>

A HubSpot contact form has been added in both Tyk Cloud and Dashboard to facilitate contacting Tyk for a Proof of Concept (PoC) when a trial expires. This new form makes it easier to connect with our team and explore further options once   
the trial period ends.
</details>
</li>

<li>
<details>
<summary>Support for bundles with multiple plugins</summary>

Tyk Cloud now supports multiple plugins in a bundle, allowing users to manage and deploy various binaries for the same plugin bundle. This enhancement provides greater flexibility in plugin configuration and deployment using `mservctl`.
within MServ.
</details>
</li>

<li>
<details>
<summary>Embedded product tour during deployment wait time</summary>

An embedded interactive product tour has been added within the deployment screen to guide users through the Tyk Dashboard while they wait for their free trial on-boarding to complete. This tour provides an overview of key features, helping users explore what they can do on Tyk Cloud during their trial.
</details>
</li>  
</ul>

#### Changed

<ul>
<li>
<details>
<summary>UX Improvement: Redirect to activity by API section from the monitoring page</summary>

Users are now redirected to the "Activity by API" section in the Tyk Dashboard upon clicking on the Control Plane (CP) name within the Cloud Monitoring page. This update provides a more seamless 
transition for users needing detailed activity insights directly from the monitoring interface.
</details>
</li>  
</ul>

#### Fixed

<ul>
<li>
<details>
<summary>"Add Portal Deployment" widget hidden for team members</summary>

The "Add Portal Deployment" widget on the Environment page is now hidden for team members, providing a cleaner and more tailored UI experience by limiting portal management options to authorized roles 
only.
</details>
</li>

<li>
<details>
<summary>"Delete User" button hidden for org admin on Org+Billing admin profiles</summary>

The "Delete User" button for Org Admins has been hidden when viewing Org+Billing Admin profiles on the Teams page. Previously, Org Admins could see this button but would encounter an error message, "operation on this class is not permitted," when attempting deletion.
</details>
</li>

<li>
<details>
<summary>Standardized behavior for "Upgrade" and "Account & Billing" buttons</summary>

The behavior for accessing the billing app through the 'Upgrade' and 'Account & Billing' buttons has been standardized. Previously, clicking the 'Upgrade' button opened the billing app in a new tab, while 'Account & Billing' opened it in the same tab. Now, both buttons open the billing app consistently in the same tab.
</details>
</li>


<li>
<details>
<summary>Direct access to "/password-reset" page now accessible without redirect</summary>

Fixed an issue where accessing the /password-reset page directly redirected users to the login page. Now, users can navigate directly to the /password-reset page without being redirected, providing a consistent experience for password-reset requests regardless of how the page is accessed.
</details>
</li>

<li>
<details>
<summary>Billing sidebar display corrected when no subscriptions are present</summary>

We have resolved a display issue in the billing sidebar that occurred when no subscriptions were active. Now, the sidebar menu displays correctly regardless of subscription status, providing a consistent and clear UI for all users.
</details>
</li>

<li>
<details>
<summary>Fix for hybrid codes visibility logic to manage node data retention</summary>

This update addresses a critical bug in the Hybrid nodes visibility logic, which previously retained all connected node data for the Hybrid Data Planes indefinitely. The fix ensures that we only contains records from the last 7 days. This enhancement improves system performance at all stages within the Tyk Cloud UI for organizations with Hybrid Data Planes, especially those with multiple connected gateways.

</details>
</li>

<li>
<details>
<summary>Improve stability for paid customers</summary>

We have enhanced separation between free-trial and paid deployments to improve resilience and stability.
</details>
</li>  
</ul>

##### Security Fixes

<ul>
<li>
<details>
<summary>Bumped dependencies in Tyk Cloud components</summary>

Dependencies across all Tyk Cloud components have been updated to address reported security issues. This update ensures compliance with security standards, aligning the project with best practices for secure dependency management.
</details>
</li>
</ul>

## Further Information

### FAQ
Please visit our [Developer Support]({{< ref "developer-support/community" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
