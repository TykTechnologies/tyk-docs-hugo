---
title: Tyk Operator 0.18 Release Notes
tag: ["Tyk Operator", "Release notes", "v0.18", "changelog" ]
description: "Release notes documenting updates, enhancements, fixes and changes for Tyk Operator versions within the 0.18.x series."
---
**Open Source ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**

**This page contains all release notes for version 0.18 displayed in reverse chronological order**

## Support Lifetime
Our minor releases are supported until our next minor comes out.

## 0.18.0 Release Notes

##### Release date 4 Jul 2024

#### Breaking Changes
This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
Go to the [Upgrading Tyk Operator]({{<ref "/api-management/automations#upgrading-tyk-operator">}}) section for detailed upgrade instructions.

#### Release Highlights
This release added support for Tyk 5.4 API definition.

For details please refer to the [changelog]({{< ref "#Changelog-v0.18.0">}}) below.

#### Downloads
- [Docker image v0.18.0](https://hub.docker.com/r/tykio/tyk-operator/tags?page=&page_size=&ordering=&name=v0.18.0)
  - ```bash
    docker pull tykio/tyk-operator:v0.18.0
    ```
- Source code tarball - [Tyk Operator Repo](https://github.com/TykTechnologies/tyk-operator/releases/tag/v0.18.0)

#### Changelog {#Changelog-v0.18.0}

##### Added

<ul>
<li>
<details>
<summary>Added support of Tyk 5.4 API definition CRD </summary>

Added to ApiDefinition [Custom Resource Definition (CRD)](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/): 

- [introspection]({{<ref "graphql/introspection#turning-off-introspection">}}) option to enable/disable GraphQL introspection
- [graphql.proxy.auth_headers]({{<ref "graphql-proxy-only#creating-a-graphql-api-via-the-dashboard-ui">}})
- [graphql.proxy.subscription_type]({{<ref "getting-started/key-concepts/graphql-subscriptions">}})
- [graphql.proxy.request_headers]({{<ref "graphql/gql-headers#request-headers">}})
- graphql.proxy.use_response_extensions
- graphql.proxy.request_headers_rewrite
- graphql.proxy.features

</details>
</li>
</ul>



## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
