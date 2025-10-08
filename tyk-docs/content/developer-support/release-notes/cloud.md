---
title: Tyk Cloud Release Notes
date: 2025-02-10
description: "Release notes documenting updates, enhancements, and changes for Tyk Cloud"
tags: ["Tyk Cloud", "Release notes", "v1.23", "1.23.0", "v1.24", "1.24.0", "v1.25", "1.25.0", "v1.26", "1.26.0", "1.27.0", "1.28.0", "1.28.1", "1.29.0", "1.30.0", "changelog"]

---

## 1.30.0 Release Notes

### Release Date 1st September 2025


### Release Highlights

This release expands observability and upgrade management capabilities in Tyk Cloud. Teams can now export application logs to external log vendors, giving full flexibility in integrating with their preferred OpenTelemetry-compatible provider. Additionally, we’ve enhanced the auto-upgrade experience by providing detailed email notifications when the process begins.

For a complete list of changes, see the detailed [changelog]({{< ref "#Changelog-v1.30.0" >}}) below.

### Breaking Changes

There are no breaking changes in this release.

### Downloads
- [latest version of Mserv](https://github.com/TykTechnologies/mserv/releases/latest)

### Deprecations

There are no deprecations in this release.

### Changelog {#Changelog-v1.30.0}

#### Added

<ul>

<li>
<details>
<summary>Export Application Logs to Observability Providers</summary>

Cloud users can now export Tyk application logs to observability providers using OpenTelemetry (such as Datadog, New Relic, Elastic, and Dynatrace). This feature can be enabled or disabled per deployment, and logs are streamed in real time to the chosen provider, enabling better monitoring and faster troubleshooting.

</details>
</li> 

<li>
<details>
<summary>Email Notifications for Auto-Upgrades</summary>

Introduced automated email notifications to inform organisations and team admins when a Control Plane [auto-upgrade]({{< ref "tyk-cloud/environments-deployments/managing-control-planes#auto-upgrade" >}}) begins. Notifications include key details such as deployment name and version changes, helping teams track upgrade activity more effectively.


</details>
</li>

</ul>

## 1.29.0 Release Notes

### Release Date 15 July 2025

### Release Highlights

This release introduces Auto-Upgrades for Control Plane deployments, allowing teams to stay up to date with the latest features on a configurable schedule, with related Data Planes upgraded automatically. We’ve also improved SSO access control by assigning a default 'View Only' role to newly provisioned SSO users, thereby enhancing security and auditability.


For a complete list of changes, see the detailed [changelog]({{< ref "#Changelog-v1.29.0" >}}) below.

### Breaking Changes

There are no breaking changes in this release.

### Downloads
- [latest version of Mserv](https://github.com/TykTechnologies/mserv/releases/latest)

### Deprecations

There are no deprecations in this release.

### Changelog {#Changelog-v1.29.0}

#### Added

<ul>
<li>
<details>
<summary>New Role to Restrict Local Login for SSO Users</summary>

Introduced a new “View Only” role to enhance access control for organizations using SSO. Now, SSO users are granted this read-only role by default. This improves auditability and reduces the risk of unauthorized actions when SSO is the preferred authentication method.

</details>
</li> 

<li>
<details>
<summary>Auto-Upgrade for Control Plane Deployments</summary>

Users can now opt into automatic upgrades for Control Plane deployments and configure a weekly schedule to match their maintenance windows. This would also automatically upgrade the corresponding data planes related to this control plane to the latest available version in the channel.

</details>
</li> 

</ul>

## 1.28.1 Release Notes

### Release Date 03 June 2025

### Release Highlights

This release improves Tyk Cloud’s security, scalability, and reliability. We’ve hardened the signup and login flows, improved sensitive data handling in API responses, and enhanced Redis scalability in Control Plane deployments to support larger workloads.

For a full list of changes, see the detailed [changelog]({{< ref "#Changelog-v1.28.1" >}}) below.

### Breaking Changes

There are no breaking changes in this release.

### Downloads
- [latest version of Mserv](https://github.com/TykTechnologies/mserv/releases/latest)

### Deprecations

There are no deprecations in this release.

### Changelog {#Changelog-v1.28.1}

#### Added

<ul>
<li>
<details>
<summary>Improved scalability for Redis in Control Plane Deployments</summary>

The change brings more flexible Redis scaling capabilities in the Control Plane deployments. Control Planes are now able to handle more/larger API keys in storage without causing stability issues. Tyk Cloud will expand this storage using this capability when needed, but a permanent arrangement is subject to commercial terms.

</details>
</li> 
</ul>

#### Fixed

<ul>
<li>
<details>
<summary>Hardened Signup Flow Validation</summary>

Improved the signup logic to prevent unintended automation and ensure tighter control over account creation, enhancing platform security and reliability.

</details>
</li> 
</ul>

<ul>
<li>
<details>
<summary>Consistent Login Response Behavior</summary>

Standardized response status codes in the login process to prevent discrepancies that could lead to information exposure through http status code.

</details>
</li> 
</ul>

<ul>
<li>
<details>
<summary>Sanitized Sensitive Data in API Responses</summary>

Resolved an issue where certain sensitive fields could be inadvertently included in API responses. The platform now enforces stricter data handling and output sanitization.

</details>
</li> 
</ul>

## 1.28.0 Release Notes

### Release Date 26 May 2025

### Release Highlights

This release focuses on further enhancing Tyk Cloud’s stability, security, and overall user experience. We've resolved several UI issues, improved input validation, standardized security defaults across versions, and strengthened core platform behavior. Additionally, we’ve introduced new 2025 pricing plans!

For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v1.28.0" >}}) below.

### Breaking Changes

There are no breaking changes in this release.

### Downloads
- [latest version of Mserv](https://github.com/TykTechnologies/mserv/releases/latest)

### Deprecations

There are no deprecations in this release.

### Changelog {#Changelog-v1.28.0}

#### Added

<ul>
<li>
<details>
<summary>2025 Tyk Cloud Pricing Plans Introduced</summary>

Tyk Cloud has introduced the 2025 base pricing plans, featuring new Core, Professional, and Enterprise tiers. These changes provide clearer value differentiation across plans while maintaining flexibility for both SaaS and Hybrid deployments. The "Account" section is now hidden for new customers, though existing customers remain unaffected. Usage and quota are still available in the "System Usage" and "Monitoring" sections. For more information, please check the [Pricing & Plans](https://tyk.io/pricing/)

</details>
</li> 
</ul>

#### Fixed

<ul>
  
<li>
<details>
<summary>Improved Validation for Hybrid Data Plane Names</summary>

We’ve fixed an issue where pasting invalid characters, such as tabs and spaces, into the hybrid data plane name field would break the registration flow in Ara. The system now includes input validation on both the frontend and backend, ensuring only valid characters are accepted. This prevents configuration issues and improves the reliability of the hybrid data plane creation process.

</details>
</li>

<li>
<details>
<summary>Improved Login Handling in Tyk Cloud</summary>

We’ve made backend improvements to the Tyk Cloud login functionality to enhance its security and resilience against automated attacks. These changes help ensure a more consistent and secure authentication experience.

</details>
</li>

<li>
<details>
<summary>Secure Defaults Aligned Across Dashboard Versions</summary>

We’ve fixed an issue where secure configuration defaults for the Tyk Dashboard admin view were not properly applied in older versions (v5.3). These settings now default to true in v5.8+ as intended, while remaining false in v5.3 to preserve backward compatibility. This ensures consistent and expected security behavior across versions.

**Note:** Changes in deployment configurations are applied during a redeployment, triggered by the user or system. In addition, defaults can be changed individually by creating a support ticket.

</details>
</li>

</ul>

## 1.27.0 Release Notes

### Release Date 23 April 2025


### Release Highlights

This release focuses on improving Tyk Cloud's stability, security, and reliability. We’ve addressed several bugs, enhanced UI behavior, resolved performance bottlenecks, and implemented secure defaults to strengthen the platform’s security posture. 

For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v1.27.0" >}}) below.

### Breaking Changes

There are no breaking changes in this release.

### Downloads
- [latest version of Mserv](https://github.com/TykTechnologies/mserv/releases/latest)

### Deprecations

There are no deprecations in this release.

### Changelog {#Changelog-v1.27.0}

#### Added

<ul>
<li>
<details>
<summary>Clear Error Message Shown When Control Plane Deployment Fails</summary>

Tyk Cloud now displays an informative error message when a Control Plane fails to deploy. Previously, users received no feedback, causing confusion. The new message lets users know the issue is being addressed and guides what to do next, improving transparency and user experience during deployment failures.

</details>
</li>  

<li>
<details>
<summary>UI Support for Enabling Audit Logging on Control Planes</summary>

Audit logging can now be enabled or disabled directly from the UI for Control Plane deployments if it is included in your plan.

</details>
</li>

<li>
<details>
<summary>Secure Defaults Now Applied for Admin Token Visibility</summary>

As announced in the previous release, Tyk Cloud now defaults to secure settings that restrict admin users from viewing or resetting other users' API tokens in the Dashboard.

</details>
</li>

<li>
<details>
<summary>Improved Performance of Hybrid Visibility Functionality</summary>

We’ve made backend improvements to enhance the performance and stability of hybrid node visibility features in Tyk Cloud. These changes help support larger datasets more efficiently, ensuring smoother operations and better scalability behind the scenes.

</details>
</li>
  
</ul>

#### Fixed

<ul>
<li>
<details>
<summary>Telemetry Optional Fields Now Persist After Saving</summary>

Fixed an issue where optional fields in the ‘Edit New Relic Connection’ section of the Telemetry UI would disappear after saving. With this fix, all optional configuration fields now persist correctly, ensuring that user-defined telemetry settings are saved and visible for further updates.

</details>
</li>

<li>
<details>
<summary>Telemetry Export Now Applies Correctly on Existing Deployments</summary>

Fixed an issue where enabling telemetry export on an existing deployment did not apply the expected network policy changes. This fix ensures that configuration changes are consistently applied, so telemetry features work as intended without requiring manual intervention.

</details>
</li>    

<li>
<details>
<summary>Team Dropdown No Longer Locks When Switching Deployment Types</summary>

We’ve resolved a UI issue where the team dropdown became unresponsive when switching between Control Plane and Hybrid Data Plane types during deployment creation. This fix ensures that users can seamlessly switch deployment types.

</details>
</li> 

<li>
<details>
<summary>Reduced Data in Telemetry Configuration Responses</summary>

We’ve removed unnecessary data from telemetry export configuration API responses to ensure cleaner and more secure payloads.

</details>
</li> 

</ul>


## 1.26.0 Release Notes

### Release Date 17 of March 2025

### Release Highlights

Tyk Cloud now provides greater compliance controls, allowing customers to manage audit logging and storage more effectively. With new audit log storage and the ability to enable or disable audit logging per Control Plane deployment, users can optimize costs while maintaining security and compliance. These improvements give organizations more flexibility in handling audit data based on their specific regulatory and operational needs. To enable this feature, please contact your account manager.

For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-v1.26.0" >}}) below.

#### Admin Behavior Update in Control Planes v5.8.0
In the next Tyk Cloud release, starting with the Control Planes version 5.8.0, we will be  restricting Tyk Dashboard admin users' ability to view and reset other users' API tokens. This change will automatically apply to all Control Plane deployments that are either newly created with or upgraded to version 5.8.0 or later.

This security improvement helps protect sensitive access credentials and provides better isolation between user accounts. If your organization requires the previous behavior for specific operational needs, you can revert this change by submitting a request to Tyk Support.

We remain committed to continuously improving the security of our platform while maintaining the flexibility needed for diverse environments.

### Breaking Changes

There are no breaking changes in this release.

### Downloads
- [latest version of Mserv](https://github.com/TykTechnologies/mserv/releases/latest)

### Deprecations

There are no deprecations in this release.

### Changelog {#Changelog-v1.26.0}

#### Added

<ul>
<li>
<details>
<summary>Enable/Disable Audit Logging for Control Plane Deployments</summary>

Tyk Cloud allows users to enable or disable audit logging for their [Control Plane]({{< ref "api-management/mdcb#data-plane" >}}) (CP) deployments, providing greater flexibility in managing compliance and storage costs. To enable this feature, please contact your account manager.

Tyk Cloud now also enforces audit log storage quotas based on contractual terms (a storage quota limit assigned to organizations based on their subscription), allowing customers to manage costs effectively. Similar to analytics storage, a size cap is applied to audit logs, dropping the oldest logs to fit the new ones within the quota.

For more information, please check the [Tyk Dashboard documentation on the feature](https://tyk.io/docs/api-management/dashboard-configuration/#retrieving-audit-logs-via-api)

</details>
</li>  

<li>
<details>
<summary>Enhanced Onboarding Experience for Trial Users</summary>

Tyk Cloud now enables the onboarding wizard by default for trial users, providing a guided Quick Start experience in Tyk 5.8.0.

</details>
</li>

<li>
<details>
<summary>Stability Improvements When Deploying Control Planes</summary>

Tyk Cloud now features enhanced stability for Control Plane deployments, even in cases of license server issues.

</details>
</li>
  
</ul>

#### Fixed

<ul>
<li>
<details>
<summary>Protecting Go Plugin Functionality by Isolating MServ API Definitions</summary>

Tyk Cloud now moves MServ API definitions to a separate organization, preventing users from accidentally modifying or deleting them. Previously, these definitions were stored within the customer’s Tyk Dashboard deployment, posing the risk of breaking Go plugin functionality. With this update, Go plugins remain fully operational while deployments become more secure and error-proof. This change applies to new deployments only; existing deployments with plugins enabled will be gradually migrated in the future to avoid unexpected service disruption.

</details>
</li>

<li>
<details>
<summary>Provision First and Last Name for Cloud SSO Users</summary>

Tyk Cloud now correctly populates first and last names when provisioning new users via SSO (Google SSO, KeyCloak). Previously, only the first name was set, causing validation errors when updating roles due to a missing last name. This fix ensures that SSO-provisioned users have complete profiles, preventing onboarding issues and improving role management for organizations

</details>
</li>    

<li>
<details>
<summary>Enforce 'Only Registered Users' Flag for SSO in Tyk Cloud</summary>

Tyk Cloud now correctly enforces the 'Only Registered Users' flag for SSO (Google SSO, KeyCloak), preventing the creation of unregistered users via just-in-time provisioning. Previously, users without a corresponding local entry could still be created even when this setting was enabled.

</details>
</li>    

<li>
<details>
<summary>Incorrect Display of Custom Domain Field in EDP</summary>

Tyk Cloud now correctly hides the custom domain field in the Enterprise Developer Portal (EDP) edit page when the custom domain entitlement is not enabled. Previously, the field was visible even for organizations without access to this feature, causing confusion.

</details>
</li> 

<li>
<details>
<summary>Improved Probes for Control Plane Deployments with SSO</summary>

Tyk Cloud now ensures more reliable health checks for Control Plane deployments when SSO is configured.

</details>
</li> 

<li>
<details>
<summary>Accurate Subscription Limits in Monitoring Charts</summary>

The monitoring chart in Tyk Cloud now correctly displays the subscription limit based on the organization’s entitlement.

</details>
</li> 

<li>
<details>
<summary>Improved Analytics Performance in Tyk Cloud</summary>

Changing the analytics storage quota in Tyk Cloud no longer removes critical database indices, which previously led to performance degradation. This fix ensures that indices are preserved, maintaining fast query performance and data integrity. Customers should now experience improved analytics performance, especially when adjusting storage quotas.

</details>
</li> 

</ul>

---

## 1.25.0 Release Notes

### Release Date 10 of February 2025

### Release Highlights
This Tyk Cloud update enhances Gateway version management, ensuring a more streamlined, secure, and user-friendly experience. With the new UI versioning updates, users have clearer visibility into supported versions, direct upgrade recommendations, and the ability to automate version upgrades for effortless maintenance.
These changes empower teams to stay on supported, secure, and high-performing versions.
For more details, check out the [documentation on Gateway versioning and auto-upgrades]({{< ref "developer-support/release-types/long-term-support" >}})

### Breaking Changes

There are no breaking changes in this release.

### Downloads
- [latest version of Mserv](https://github.com/TykTechnologies/mserv/releases/latest)

### Deprecations

There are no deprecations in this release.

### Changelog

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

For more details, check out the [documentation on setting up Telemetry export]({{< ref "tyk-cloud/telemetry" >}}).

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

This Tyk Cloud update introduces features that improve both flexibility in plugin management and user onboarding. Now, [Mserv]({{< ref "tyk-cloud/using-plugins#uploading-your-bundle" >}}),  supports **multiple plugin bundles**, allowing greater customization and easier deployment of plugin configurations. Additionally, we added an **embedded product tour** to enhance the deployment experience, offering a guided walkthrough of Tyk Dashboard’s features, ideal for users familiarizing themselves with the platform during onboarding.

For a comprehensive list of improvements and fixes, please check the detailed [changelog]({{< ref "#Changelog-v1.23.0" >}}) below.

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



