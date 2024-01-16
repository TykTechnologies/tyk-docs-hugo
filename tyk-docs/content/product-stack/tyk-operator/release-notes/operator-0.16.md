---
title: Tyk Operator 0.16 Release Notes
tag: ["Tyk Operator", "Release notes", "v0.16", "changelog" ]
description: "Release notes documenting updates, enhancements, fixes and changes for Tyk Operator versions within the 0.16.x series."
---
**Open Source ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))**

**This page contains all release notes for version 0.16 displayed in reverse chronological order**

## Support Lifetime
Our minor releases are supported until our next minor comes out. 

## 0.16.0 Release Notes

##### Release date 12 Jan 2024

#### Breaking Changes
This release has no breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade Instructions
While upgrading Tyk Operator release via Helm, please make sure that the latest CRDs are also applied on the cluster, as follows:
```bash
kubectl apply -f https://raw.githubusercontent.com/TykTechnologies/tyk-operator/v0.16.0/helm/crds/crds.yaml
```

#### Release Highlights
This release added support for analytics plugin, UDG global header, and detailed tracing setting in ApiDefinition as detailed in the [changelog]({{< ref "#Changelog-v0.16.0">}}) below.

#### Downloads
- [Docker image to pull](https://hub.docker.com/layers/tykio/tyk-operator/v0.16.0/images/sha256-7c5b526af96ef772e8e53b8817538f41585c4ad641388609b349368219bb3d7d?context=explore)
- [Source code](https://github.com/TykTechnologies/tyk-operator/releases/tag/v0.16.0)

#### Changelog {#Changelog-v0.16.0}

##### Added

<ul>
<li>
<details>
<summary>Added imagePullSecrets configuration for ServiceAccount in Tyk Operator Helm chart </summary>

  Added [imagePullSecrets](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/) configuration for ServiceAccount in Tyk Operator Helm chart. It allows user to pull image from a private registry.
</details>
</li>
</ul>

<ul>
<li>
<details>
<summary>Added tyk to categories field of CRDs </summary>

Added tyk to categories field of CRDs. So, from now on, all CRs related to Tyk Operator is grouped into tyk category and can be displayed via kubectl get tyk.
</details>
</li>
</ul>

<ul>
<li>
<details>
<summary>Added support of analytics plugin in ApiDefinition CRD </summary>

Added to ApiDefinition CRD: support of analytics plugin at [spec.analytics_plugin](https://doc.crds.dev/github.com/TykTechnologies/tyk-operator/tyk.tyk.io/ApiDefinition/v1alpha1@v0.16.0#spec-analytics_plugin). See [Example CRD with Analytics Plugin](https://github.com/TykTechnologies/tyk-operator/tree/master/config/samples/analytics_plugin.yaml) for details.
</details>
</li>
</ul>

<ul>
<li>
<details>
<summary>Added support of UDG Global Header in ApiDefinition CRD </summary>

Added to ApiDefinition CRD: support for UDG Global Header at [spec.graphql.engine.global_headers](https://doc.crds.dev/github.com/TykTechnologies/tyk-operator/tyk.tyk.io/ApiDefinition/v1alpha1@v0.16.0#spec-graphql-engine-global_headers) object in ApiDefinition CRD. This feature is compatible with Tyk 5.2 or above.
</details>
</li>
</ul>

<ul>
<li>
<details>
<summary>Added support of detail tracing in ApiDefinition CRD </summary>

Added to ApiDefinition CRD: support for detail tracing configuration at [spec.detailed_tracing](https://doc.crds.dev/github.com/TykTechnologies/tyk-operator/tyk.tyk.io/ApiDefinition/v1alpha1@v0.16.0#spec-detailed_tracing) field in ApiDefinition CRD. Enable it for the API if you want to get detail span for each middleware involved in request processing.
</details>
</li>
</ul>


##### Updated


<ul>
<li>
<details>
<summary>Updated Go version to 1.21 </summary>

Updated Go version to 1.21
</details>
</li>
</ul>

##### Fixed

<ul>
<li>
<details>
<summary>Fixed CVE-2023-39325 (NVD) </summary>

Fixed [CVE-2023-39325 (NVD)](https://nvd.nist.gov/vuln/detail/CVE-2023-39325)
</details>
</li>
</ul>

<ul>
<li>
<details>
<summary>Fixed security policy handling in OSS mode </summary>

Fixed a bug that prevents Tyk Operator to work with SecurityPolicy in OSS Mode. Now, SecurityPolicy controller will not modify spec.MID (_id) field in SecurityPolicy
</details>
</li>
</ul>


## Further Information

### Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

### FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.

## Earlier Versions Release Notes
Release Notes for Tyk Operator v0.15 and earlier can we found in [Tyk Operator GitHub](https://github.com/TykTechnologies/tyk-operator/releases)
