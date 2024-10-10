---
title: Tyk Operator 1.0 Release Notes
tag: ["Tyk Operator", "Release notes", "v1.0", "changelog" ]
description: "Release notes documenting updates, enhancements, fixes and changes for Tyk Operator versions within the 1.0.x series."
---
**Licensed Protected Product**

**This page contains all release notes for version 1.0.X displayed in a reverse chronological order**

## Support Lifetime
<!-- Required. replace X.Y with this release and set the correct quarter of the year -->
Our minor releases are supported until our next minor comes out.

---

## 1.0.0 Release Notes

We are excited to announce the release of **Tyk Operator v1.0**, marking a significant milestone with new features, enhancements, and critical changes. This release introduces support for Tyk OAS APIs, extended capabilities for managing Classic APIs and security policies, and includes **license changes** that you must be aware of before upgrading.

### Release Date 10 Oct 2024

### Release Highlights
<!-- Required. Use similar ToV to previous release notes. For example for a patch release:
This release primarily focuses on bug fixes.
For a comprehensive list of changes, please refer to the detailed [changelog]({{< ref "#Changelog-vX.Y.0">}}) below.
-->
##### Support for Tyk OAS API
The Tyk Operator v1.0 release introduces powerful new features designed to enhance how you manage APIs in Kubernetes environments. One of the key highlights is the full support for Tyk OAS APIs, allowing you to define and manage APIs through the new **`TykOasApiDefinition`** custom resource. This integration extends GitOps API Management to Tyk OAS, allowing you to have declarative, versioned, and fully automated control to your APIs in Kubernetes environments.

Key features:

- **Define and Manage Tyk OAS APIs** using the TykOasApiDefinition custom resource.
- **Manage API Definitions in ConfigMaps**: Any changes are automatically tracked and synced to Tyk.
- **Configure Tyk OAS in a Kubernetes-native way**: You can organize APIs by categories or manage multiple API versions easily with the new CRD.
- **Simplify certificate management** by referencing Kubernetes secrets.
- **Use the Tyk Ingress controller** to create Tyk OAS APIs from Ingress specs.

With this release, users benefit from seamless GitOps workflows, ensuring a Kubernetes-native operation workflow. Security is also made simpler with automated certificate synchronization, removing the hassle of manual certificate management.

##### Enhanced Classic API and Security Policy Features
Enhanced support for Tyk Classic APIs continues, with improvements to security policies and new capabilities for setting API and endpoint-specific rate limits, making it easier than ever to customize API usage policies.

This release represents a significant upgrade for both API management and security, offering a more efficient, scalable, and Kubernetes-native way to operate Tyk. Whether you're leveraging Tyk OAS APIs or continuing with Tyk Classic, this version brings the tools and features you need to streamline your workflows and enhance operational efficiency.

For details please refer to the [changelog]({{< ref "#Changelog-v1.0.0">}}) below.


### Breaking Changes
<!-- Required. Use the following statement if there are no breaking changes, or explain if there are -->
<!-- This release has no breaking changes. -->
**License Requirement:** Tyk Operator is now a closed-source product and requires a valid license key to operate. Please follow our [Installation and Upgrade Guide]({{<ref "tyk-stack/tyk-operator/installing-tyk-operator">}}) to set your license key before installation or upgrade.

If the license is missing, invalid, or expired, Tyk Operator will exit with an error message. Ensure that you carefully review the setup steps to avoid any issues during the upgrade or installation process.

<!-- The following "Changed error log messages" section is Optional!
Instructions: We should mention ALL changes in our application log messages in the changelog section. In case we made such changes, this section should also be added, to make sure the users don't miss this notice among other changelog lines. -->
<!-- #### Changed error log messages
Important for users who monitor Tyk components using the application logs (i.e. Tyk Gateway log, Tyk Dashboard log, etc.).
We try to avoid making changes to our log messages, especially at error and critical levels. However, sometimes it's necessary. Please find the list of changes made to the application log in this release: -->

<!-- The following "|Planned Breaking Changes" section is optional!
Announce future scheduled breaking changes, e.g. Go version updates, DB driver updates, etc. -->
<!-- #### Planned Breaking Changes -->

<!-- Required. Use this section to announce the following types of dependencies compatible with the release:
#### Dependencies

Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.

3rd party dependencies and tools -->

<!-- Required. Version compatibility with other components in the Tyk stack. This takes the form of a compatibility matrix and is only required for Gateway and Portal.
##### Compatibility Matrix For Tyk Components
An illustrative example is shown below. -->
<!-- TBP - to be published. Helm chart, MDCB, operator and sync versions are the new versions and as such will be published only a few hours after the main release of 
the dashboard and gateway. We must clarify this at the time of publishing this RN and remove TBP later, once the Helm charts are released 

| Gateway Version | Recommended Compatibility | Backwards Compatibility |
| --------------- | ------------------------- | ----------------------- |
| 5.3 LTS         | Helm v2.2 - TBP           | Helm vX - vY            |
|                 | MDCB v2.5 - TBP           | MDCB v1.7 - v2.4        |
|                 | Operator v1.8 - TBP       | Operator vX - vY        |
|                 | Sync v2.4.1 - TBP         | Sync vX - vY            |
|                 |                           | EDP vX - vY             |
|                 |                           | Pump vX - vY            |
|                 |                           | TIB vX - vY             |
      -->

### Dependencies {#dependencies-1.1}
#### 3rd Party Dependencies & Tools
<!-- Required. Third-party dependencies encompass tools (GoLang, Helm etc.), databases (PostgreSQL, MongoDB etc.) and external software libraries. This section should be a table that presents the third-party dependencies and tools compatible with the release. Compatible is used in the sense of those versions tested with the releases. Such information assists customers considering upgrading to a specific release.

Additionally, a disclaimer statement was added below the table, for customers to check that the third-party dependency they decide to install remains in support.

An example is given below for illustrative purposes only. Tested Versions and Compatible Versions information will require discussion with relevant squads and QA. -->

| Third Party Dependency                                     | Tested Versions        | Compatible Versions    | Comments | 
| ---------------------------------------------------------- | ---------------------- | ---------------------- | -------- | 
| [Kubernetes](https://kubernetes.io)                        | 1.26.x to 1.30.x       | 1.19.x to 1.30.x       |          | 

Given the time difference between your upgrade and the release of this version, we recommend customers verify the ongoing support of third-party dependencies they install, as their status may have changed since the release.

### Deprecations
<!-- Required. Use the following statement if there are no deprecations, or explain if there are -->
There are no deprecations in this release.

<!-- Optional section!
Used to share and notify users about our plan to deprecate features, configs etc. 
Once you put an item in this section, we must keep this item listed in all the following releases till the deprecation happens. -->
<!-- ##### Future deprecations
-->

### Upgrade instructions
<!-- Required. For patches release (Z>0) use this:
For users currently on vX.Y.Z, we strongly recommend promptly upgrading to the latest release. If you are working with an older version (lower major), it is advisable to bypass version X.Y.0 and proceed directly to this latest patch release.
<br/>
Go to the [Upgrading Tyk](#upgrading-tyk) section for detailed upgrade Instructions.
-->
Tyk Operator v1.0 introduced new Custom Resource Definitions (CRDs). Before upgrading to Tyk Operator v1.0 with Helm Chart, please run the following commands to install the CRDs:

```bash
$ kubectl apply -f https://raw.githubusercontent.com/TykTechnologies/tyk-charts/refs/heads/main/tyk-operator-crds/crd-v1.0.0.yaml
```


Go to the [Upgrading Tyk Operator]({{<ref "tyk-stack/tyk-operator/installing-tyk-operator#upgrading-tyk-operator">}}) section for detailed upgrade instructions.


### Downloads
- [Docker image v1.0.0](https://hub.docker.com/r/tykio/tyk-operator/tags?page=&page_size=&ordering=&name=v1.0.0)
  - ```bash
    docker pull tykio/tyk-operator:v1.0.0
    ```
- Helm chart - TBP (To Be Published separately after the release) <!-- This is the link to the Helm charts links. Please be mindful that this URL is only available a few hours or day/s after we release the main release, so this link needs to be updated in a separate iteration -->
<!-- source code tarball for oss projects -->

### Changelog {#Changelog-v1.0.0}
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
<summary>TykOasApiDefinition: new Custom Resource for Tyk OAS</summary>

The `TykOasApiDefinition` custom resource allows you to manage Tyk OAS APIs directly within your Kubernetes environment. You can now categorize APIs, manage multiple versions, and simplify SSL certificate management by referencing Kubernetes secrets. This enhancement offers a Kubernetes-native approach to managing Tyk APIs, streamlining operations and reducing the complexity of versioning and certificate handling across different environments.

Learn More: [Create Tyk OAS API]({{<ref "product-stack/tyk-operator/getting-started/create-an-oas-api">}})
</details>
</li>
<li>
<details>
<summary>Ingress Controller: Support Tyk OAS API as an Ingress Template</summary>

With this release, you can use the TykOasApiDefinition resource as a template for automatically creating Tyk OAS APIs based on Kubernetes Ingress specs. This simplifies the process of generating APIs by leveraging Ingress controller annotations, reducing manual intervention, and automating API creation workflows for better scalability and operational efficiency.

Learn More: [Tyk Ingress Controller]({{<ref "product-stack/tyk-operator/tyk-ingress-controller">}})
</details>
</li>
<li>
<details>
<summary>SecurityPolicy: Support for Key-Level Per-API Rate Limits and Quota</summary>

This release introduces the ability to configure specific rate limits, quotas, and throttling rules at the API level using the `access_rights_array` in the security policy. Each API now has the flexibility to inherit global limit settings or apply custom limits, making it easier to control API usage on a per-API basis. This provides enhanced granularity in managing traffic, ensuring optimal resource allocation and improved performance under heavy loads.

Learn More: [Key-Level Per-API Rate Limits and Quota]({{<ref "product-stack/tyk-operator/getting-started/security-policy-example#per-api-limit">}})
</details>
</li>
<li>
<details>
<summary>SecurityPolicy: Support for Key-Level Per-Endpoint Rate Limits</summary>

By configuring key-level per-endpoint limits, you can restrict the request rate for specific API clients to a specific endpoint of an API.

Learn More: [Key-Level Per-Endpoint Rate Limits]({{<ref "product-stack/tyk-operator/getting-started/security-policy-example#per-endpoint-rate-limit">}})
</details>
</li>
<li>
<details>
<summary>SecurityPolicy: Support for TykOasApiDefinition</summary>

This update extends the security policy to include TykOasApiDefinition resources within the `access_rights_array`, allowing you to manage security policies for both Tyk Classic APIs and Tyk OAS APIs. By specifying the API kind, you can now apply rate limits, quotas, and other access controls to Tyk OAS APIs, streamlining security management in mixed environments.

Learn More: [TykOasApiDefinition in Security Policy]({{<ref "tyk-stack/tyk-operator/secure-an-api#security-policy-manifest">}})
</details>
</li>
<li>
<details>
<summary>ApiDefinition: Support for Event Handler</summary>

Tyk Operator now supports event handler integration for ApiDefinition, enabling webhooks to be triggered by specific API events. This allows for real-time, event-driven automation between Tyk and other systems, sending notifications or executing actions as events occur in the API lifecycle. The event_handlers field in the ApiDefinition CRD makes it easy to set up webhook-driven processes for better control and automation across your services.

Learn More: [Event Webhook with Tyk Classic]({{<ref "product-stack/tyk-gateway/basic-config-and-security/report-monitor-and-trigger-events/event-webhook-tyk-classic">}})
</details>
</li>
<li>
<details>
<summary>ApiDefinition: Support timeout Field in Advanced Cache Control</summary>

The advanced cache configuration for ApiDefinition now supports a timeout field, providing greater control over cache behavior. You can define specific cache timeouts for different API paths, allowing for more fine-tuned control over caching strategies. This feature helps optimize API performance, particularly for high-traffic endpoints requiring precise cache management.
```yaml
extended_paths:
  advance_cache_config:
    - path: "/json"    
      method: "GET"
      cache_response_codes: [200, 204]
      timeout: 120
```
</details>
</li>
<li>
<details>
<summary>ApiDefinition: Support new Fields in `VersionDefinition`</summary>

`VersionDefinition` within `ApiDefinition` has been expanded to include additional fields, offering more granular control over API versioning and path management. These new fields allow you to configure version handling more flexibly, enhancing your ability to manage API versions and customize how version data is processed in API paths.
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
<summary>Go Version Updated to 1.22</summary>

The underlying Go runtime for Tyk Operator has been updated to version 1.22. This upgrade brings performance improvements, enhanced security, and compatibility with the latest Go libraries, ensuring Tyk Operator remains efficient and secure in production environments.
</details>
</li>
</ul>

<!-- 
##### Fixed
This section should be a bullet point list that describes the issues fixed in the release. For each fixed issue explain:

- What problem the issue caused
- How was the issue fixed
- Link to (new) documentation created as a result of a fix. For example, a new configuration parameter may have been introduced and documented for the fix
- For OSS - Link to the corresponding issue if possible on GitHub to allow the users to see further info.

Each change log item should be expandable. The first line summarises the changelog entry. It should be then possible to expand this to reveal further details about the changelog item. This is achieved using HTML as shown in the example below. 
<ul>
<li>
<details>
<summary>Changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to a content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise, links will not be rendered.
</details>
</li>
<li>
<details>
<summary>Another changelog item summary</summary>

The actual changelog item text should go here. It should be no more than three or four sentences. It should link to the content page for further explanation where applicable. There should be a blank line between the summary tags and this paragraph, otherwise, links will not be rendered.
</details>
</li>
</ul>-->

<!-- This section should be a bullet point list that should be included when any security fixes have been made in the release, e.g. CVEs. For CVE fixes, consideration needs to be made as follows:
#### Security Fixes
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

<!-- 
### API Documentation
Required. Update the link to the Gateway "tyk-gateway-api" or dashboard "tyk-dashboard-api" and the Postman collection

If there were changes in any of Tyk’s API docs:

- Have API endpoints been documented in the release note summary and changelog?				
- Has a link to the endpoint documentation being included?
- Has the benefit of the new/updated endpoint been explained in the release highlights and changelog?
- [OpenAPI Document]()
- [Postman Collection](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/collection/<collection-id>)

-->

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.

<!-- 
### Miscellaneous (Optional)
For each specific release if there is additional miscellaneous information or announcements that will be helpful to the customer then squads
should add additional sections to their release notes. -->