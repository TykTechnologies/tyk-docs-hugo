---
title: Tyk Cloud Release Notes
date: xx
description: "Release notes documenting updates, enhancements, and changes for Tyk Cloud"
tags: ["Tyk Cloud", "Release notes", "v1.23", "1.23.0", "changelog"]
---

## 1.23.0 Release Notes

### Release Date 14 of November 2024

### Release Highlights

This Tyk Cloud update introduces features that improve both flexibility in plugin management and user onboarding. Now, [Mserv]({{< ref "tyk-cloud/configuration-options/using-plugins/uploading-bundle" >}}),  supports **multiple plugin bundles**, allowing greater customization and easier deployment of plugin configurations. Additionally, we added an **embedded product tour** to enhance the deployment experience, offering a guided walkthrough of Tyk Dashboard’s features, ideal for users familiarizing themselves with the platform during onboarding.

For a comprehensive list of improvements and fixes, please check the detailed [changelog]({{< ref "#Changelog-v1.23.0">}}) below.

### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->

There are no breaking changes in this release

### Downloads

- [latest version of Mserv](https://github.com/TykTechnologies/mserv/releases/latest)

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
        Contact form for POC requests on trial expiration
      </summary>
      A HubSpot contact form has been added in both Tyk Cloud and Dashboard to facilitate contacting Tyk for a Proof of Concept (PoC) when a trial expires. This new form makes it easier to connect with our team and explore further options once   
      the trial period ends.
    </details>
  </li>

  <li>
    <details>
      <summary>
        Support for bundles with multiple plugins
      </summary>
      Tyk Cloud now supports multiple plugins in a bundle, allowing users to manage and deploy various binaries for the same plugin bundle. This enhancement provides greater flexibility in plugin configuration and deployment using `mservctl`.
      within MServ.
    </details>
  </li>

  <li>
    <details>
      <summary>
        Embedded product tour during deployment wait time
      </summary>
      An embedded interactive product tour has been added within the deployment screen to guide users through the Tyk Dashboard while they wait for their free trial on-boarding to complete. This tour provides an overview of key features, helping users explore what they can do on Tyk Cloud during their trial.
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
        UX Improvement: Redirect to activity by API section from the monitoring page
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
        "Add Portal Deployment" widget hidden for team members
      </summary>
      The "Add Portal Deployment" widget on the Environment page is now hidden for team members, providing a cleaner and more tailored UI experience by limiting portal management options to authorized roles 
      only.
    </details>
  </li>

  <li>
    <details>
      <summary>
        "Delete User" button hidden for org admin on Org+Billing admin profiles
      </summary>
      The "Delete User" button for Org Admins has been hidden when viewing Org+Billing Admin profiles on the Teams page. Previously, Org Admins could see this button but would encounter an error message, "operation on this class is not permitted," when attempting deletion.
    </details>
  </li>

  <li>
    <details>
      <summary>
        Standardized behavior for "Upgrade" and "Account & Billing" buttons
      </summary>
 The behavior for accessing the billing app through the 'Upgrade' and 'Account & Billing' buttons has been standardized. Previously, clicking the 'Upgrade' button opened the billing app in a new tab, while 'Account & Billing' opened it in the same tab. Now, both buttons open the billing app consistently in the same tab.
    </details>
  </li>


  <li>
    <details>
      <summary>
        Direct access to "/password-reset" page now accessible without redirect
      </summary>
Fixed an issue where accessing the /password-reset page directly redirected users to the login page. Now, users can navigate directly to the /password-reset page without being redirected, providing a consistent experience for password-reset requests regardless of how the page is accessed.
    </details>
  </li>

  <li>
    <details>
      <summary>
        Billing sidebar display corrected when no subscriptions are present
      </summary>
We have resolved a display issue in the billing sidebar that occurred when no subscriptions were active. Now, the sidebar menu displays correctly regardless of subscription status, providing a consistent and clear UI for all users.
    </details>
  </li>

  <li>
    <details>
      <summary>
        Fix for hybrid codes visibility logic to manage node data retention
      </summary>
This update addresses a critical bug in the Hybrid nodes visibility logic, which previously retained all connected node data for the Hybrid Data Planes indefinitely. The fix ensures that we only contains records from the last 7 days. This enhancement improves system performance at all stages within the Tyk Cloud UI for organizations with Hybrid Data Planes, especially those with multiple connected gateways.

    </details>
  </li>

  <li>
    <details>
      <summary>
        Improve stability for paid customers
      </summary>
We have enhanced separation between free-trial and paid deployments to improve resilience and stability.
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
        Bumped dependencies in Tyk Cloud components
      </summary>
Dependencies across all Tyk Cloud components have been updated to address reported security issues. This update ensures compliance with security standards, aligning the project with best practices for secure dependency management.
    </details>
  </li>
</ul>


### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
