---
title: Tyk Operator 0.17 Release Notes
tag: ["Tyk Operator", "Release notes", "v0.17", "changelog" ]
description: "Release notes documenting updates, enhancements, fixes and changes for Tyk Operator versions within the 0.17.x series."
---
**Open Source ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**

**This page contains all release notes for version 0.17 displayed in reverse chronological order**

## Support Lifetime
Our minor releases are supported until our next minor comes out. 

## 0.17.1 Release Notes

##### Release date XX May 2024

#### Breaking Changes
This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
Go to the [Upgrading Tyk Operator]({{<ref "tyk-stack/tyk-operator/installing-tyk-operator#upgrading-tyk-operator">}}) section for detailed upgrade Instructions.

#### Release Highlights
This release is focused on bug fixes. For details please refer to the [changelog]({{< ref "#Changelog-v0.17.1">}}) below.

#### Downloads
- [Docker image v0.17](https://hub.docker.com/r/tykio/tyk-operator/tags?page=&page_size=&ordering=&name=v0.17.1)
  - ```bash
    docker pull tykio/tyk-operator:v0.17.1
    ```
- Source code tarball - [Tyk Operator Repo](https://github.com/TykTechnologies/tyk-operator/releases/tag/v0.17.1)

#### Changelog {#Changelog-v0.17.1}

##### Fixed

<ul>
<li>
<details>
<summary>Fixed Operator doesn't prefix a certificate with the orgid when retrieving certificates to use with an ingress </summary>

</details>
</li>

<li>
<details>
<summary>Reference helm values in webhook and controller manager services </summary>

</details>
</li>

<li>
<details>
<summary>Fixed CVE-2023-45288 and CVE-2024-24786 </summary>

</details>
</li>
</ul>


## 0.17.0 Release Notes

##### Release date 05 Apr 2024

#### Breaking Changes
This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
Go to the [Upgrading Tyk Operator]({{<ref "tyk-stack/tyk-operator/installing-tyk-operator#upgrading-tyk-operator">}}) section for detailed upgrade Instructions.

#### Release Highlights
This release added support for `GraphQLIntrospectionConfig` in API definition and fixed an issue where the Tyk Operator creates duplicate APIs on Tyk.

For details please refer to the [changelog]({{< ref "#Changelog-v0.17.0">}}) below.

#### Downloads
- [Docker image v0.17](https://hub.docker.com/r/tykio/tyk-operator/tags?page=&page_size=&ordering=&name=v0.17.0)
  - ```bash
    docker pull tykio/tyk-operator:v0.17.0
    ```
- Source code tarball - [Tyk Operator Repo](https://github.com/TykTechnologies/tyk-operator/releases/tag/v0.17.0)

#### Changelog {#Changelog-v0.17.0}

##### Fixed

<ul>
<li>
<details>
<summary>Fixed creating duplicated API definitions on Tyk </summary>

Fix creating duplicated API definitions on Tyk in case of cluster failures. If network errors happen while updating the API definition, the Tyk Operator retries the reconciliation based on the underlying error type.
</details>
</li>
</ul>

##### Added

<ul>
<li>
<details>
<summary>Added support of GraphQLIntrospectionConfig in API definition CRD </summary>

Added to ApiDefinition CRD: support of `GraphQLIntrospectionConfig` field at `graphql.introspection.disabled`. This feature will be enabled in future Tyk releases.
</details>
</li>
</ul>



## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
