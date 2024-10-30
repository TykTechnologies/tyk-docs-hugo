---
title: Tyk Cloud 1.23 Release Notes
date: xx
description: "Release notes documenting updates, enhancements, and changes for Tyk Cloud version 1.23"
tags: ["Tyk Cloud", "Release notes", "v1.23", "1.23.0", "changelog"]
---

## 1.23.0 Release Notes

### Release Date xx

### Release Highlights

We are thrilled to announce new updates and improvements in Tyk Cloud 1.23.0, ... For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-1.23.0">}}) below.

### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->

There are no breaking changes in this release

### Dependencies {#dependencies-1.23.0}

Here you can find the link to [Long-Term Support Releases](https://tyk.io/docs/developer-support/special-releases-and-features/long-term-support-releases/)

### Downloads

Here you can find a link to the [latest version](https://github.com/TykTechnologies/mserv/releases/latest)

### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecations in this release

### Changelog {#Changelog-v1.23.0}
<!-- Required. The change log should include the following ordered set of sections below that briefly summarise the features, updates and fixed issues of the release.
Here it is important to explain the benefit of each changelog item. As mentioned by James in a previous Slack message (https://tyktech.slack.com/archives/C044R3ZTN6L/p1686812207060839?thread_ts=1686762128.651249&cid=C044R3ZTN6L):
"...it is important to document the customer impact for the work delivered, so we can share it with prospects/install base. For example:
"New Chart delivers x and y benefit to a and b customer use cases. The business impact for them will be this and that" -->

#### Added
<!-- This section should be a bullet point list of new features. Explain:
- The purpose of the new feature
- How does the new feature benefit users?
- Link to documentation of the new feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.
Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->

<ul>
  <li>
    <details>
      <summary>
        Contact Form for PoC Requests on Trial Expiration
      </summary>
      We've added a HubSpot contact form to facilitate contacting Tyk for a Proof of Concept (PoC) when a trial expires. This new form makes it easier to connect with our team and explore further options once   
      the trial period ends.
    </details>
  </li>

  <li>
    <details>
      <summary>
        Support for Multiple Plugin Bundles in MServ
      </summary>
      MServ now supports multiple plugin bundles, allowing users to manage and deploy various binaries for different plugins. This enhancement provides greater flexibility in plugin configuration and deployment 
      within MServ.
    </details>
  </li>

  <li>
    <details>
      <summary>
        Trial Expiry Timestamp Configuration in Tyk Dashboard 
      </summary>
This update introduces a new configuration option in the Tyk Dashboard to display the remaining trial time for users. With the trial flow now starting directly on the Tyk Dashboard, users can monitor their trial period effectively
    </details>
  </li>

  <li>
    <details>
      <summary>
        Embedded Product Tour During Deployment Wait Time
      </summary>
      We have added an embedded interactive product tour within the deployment screen to guide users through the Tyk Dashboard while they wait for their deployment to complete. This tour provides an overview of key features, helping users explore what they can do next in the dashboard.
    </details>
  </li>

  <li>
    <details>
      <summary>
        Organisation Telemetry Configuration API
      </summary>
A new API endpoint has been implemented for Tyk Cloud that enables organization admins to manage observability provider configurations. This API allows admins to set up, update, view, and delete configurations for OpenTelemetry integrations, providing flexibility in exporting telemetry data from their Tyk Cloud deployments. This is part of a broader Tyk 
    </details>
  </li>

  <li>
    <details>
      <summary>
        Expanded Cloud Data Plane Tracing Deployment Support
      </summary>
The Cloud Data Plane (CDP) deployer has been updated to allow Tyk Cloud users to enable or disable OpenTelemetry tracing in their Tyk Gateway deployments. This feature is in line with Tyk's initiative to improve API observability for SaaS customers and aid in troubleshooting APIs through integrated OpenTelemetry tracing.
    </details>
  </li>
  

  
</ul>

#### Changed
<!-- This should be a bullet-point list of updated features. Explain:
- Why was the update necessary?
- How does the update benefit users?
- Link to documentation of the updated feature
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.
Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. -->

<ul>
  <li>
    <details>
      <summary>
        UX Improvement: Redirect to Activity by API Section from the Monitoring Page
      </summary>
      Users are now redirected to the "Activity by API" section in the Tyk Dashboard upon clicking on the Control Plane (CP) name within the Cloud Monitoring page. This update provides a more seamless 
      transition for users needing detailed activity insights directly from the monitoring interface.
    </details>
  </li>
  
</ul>

#### Fixed
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
        UI Update: "Add Portal Deployment" Widget Hidden for Team Members
      </summary>
      The "Add Portal Deployment" widget on the Environment page is now hidden for team members, providing a cleaner and more tailored UI experience by limiting portal management options to authorized roles 
      only.
    </details>
  </li>

  <li>
    <details>
      <summary>
        UI Fix: "Delete User" Button Hidden for Org Admin on Org+Billing Admin Profiles
      </summary>
      We have hidden the "Delete User" button for Org Admins when viewing Org+Billing Admin profiles on the Teams page. Previously, Org Admins could see this button but would encounter an error message, "operation on this class is not permitted," when attempting deletion.
    </details>
  </li>

  <li>
    <details>
      <summary>
        UI Consistency Fix: Standardized Behavior for 'Upgrade' and 'Account & Billing' Buttons
      </summary>
We have standardized the behavior for accessing the billing app through the 'Upgrade' and 'Account & Billing' buttons. Previously, clicking the 'Upgrade' button opened the billing app in a new tab, while 'Account & Billing' opened it in the same tab. Now, both buttons open the billing app consistently in the same way
    </details>
  </li>


  <li>
    <details>
      <summary>
        Direct Access to /password-reset Page Now Accessible Without Redirect
      </summary>
Fixed an issue where accessing the /password-reset page directly redirected users to the login page. Now, users can navigate directly to the /password-reset page without being redirected, providing a consistent experience for password-reset requests regardless of how the page is accessed.
    </details>
  </li>

  <li>
    <details>
      <summary>
        UI Fix: Billing Sidebar Display Corrected When No Subscriptions Are Present
      </summary>
We have resolved a display issue in the billing sidebar that occurred when no subscriptions were active. Now, the sidebar menu displays correctly regardless of subscription status, providing a consistent and clear UI for all users.
    </details>
  </li>

  <li>
    <details>
      <summary>
        Fix for NodesVisibility Logic to Manage Node Data Retention
      </summary>
This update addresses a critical bug in the NodesVisibility logic, which previously retained all connected node data indefinitely. The fix ensures that the NodesData array only contains records from the last 7 days, effectively preventing memory spikes and excessive organization records in production environments. This enhancement improves system performance and resource management across all environments.
    </details>
  </li>
  
  
</ul>

#### Security Fixes
<!-- This section should be a bullet point list that should be included when any security fixes have been made in the release, e.g. CVEs. For CVE fixes, consideration needs to be made as follows:
1. Dependency-tracked CVEs - External-tracked CVEs should be included on the release note.
2. Internal scanned CVEs - Refer to the relevant engineering and delivery policy.
For agreed CVE security fixes, provide a link to the corresponding entry on the NIST website. For example:
- Fixed the following CVEs:
    - [CVE-2022-33082](https://nvd.nist.gov/vuln/detail/CVE-2022-33082)
-->
<ul>
  <li>
    <details>
      <summary>
        Security Update: Bumped Vulnerable Dependencies in ARA Components
      </summary>
We have updated vulnerable dependencies across all ARA components to address reported security issues. This update ensures compliance with security standards and reduces potential exposure to known vulnerabilities, aligning the project with best practices for secure dependency management.
    </details>
  </li>
</ul>


### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
