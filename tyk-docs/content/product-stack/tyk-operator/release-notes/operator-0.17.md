---
title: Tyk Operator 0.17 Release Notes
tag: ["Tyk Operator", "Release notes", "v0.17", "changelog" ]
description: "Release notes documenting updates, enhancements, fixes and changes for Tyk Operator versions within the 0.17.x series."
---
**Open Source ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**

**This page contains all release notes for version 0.17 displayed in reverse chronological order**

## Support Lifetime
Our minor releases are supported until our next minor comes out. 

## 0.17.0 Release Notes

##### Release date xxxxxxx

#### Breaking Changes
This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
Go to the [Upgrading Tyk Operator]({{<ref "tyk-stack/tyk-operator/installing-tyk-operator#upgrading-tyk-operator">}}) section for detailed upgrade Instructions.

#### Release Highlights
This release added support for GraphQLIntrospectionConfig in ApiDefinition as detailed in the [changelog]({{< ref "#Changelog-v0.17.0">}}) below.

#### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-operator/v0.17.0/images/xxxxxxx?context=explore)
- [Source code](https://github.com/TykTechnologies/tyk-operator/releases/tag/v0.17.0)

#### Changelog {#Changelog-v0.17.0}

##### Added

<ul>
<li>
<details>
<summary>Added support of GraphQLIntrospectionConfig in ApiDefinition CRD </summary>

Added to ApiDefinition CRD: support of GraphQLIntrospectionConfig at [TBD](https://doc.crds.dev/github.com/TykTechnologies/tyk-operator/tyk.tyk.io/ApiDefinition/v1alpha1@v0.16.0#spec-analytics_plugin). See [GraphQL docs](TBD) for details.
</details>
</li>
</ul>

## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
