---
title: Upgrading Tyk
tags: ["upgrade", "upgrading", "Tyk upgrade", "Upgrade guides" ]
description: This guide provides essential instructions and considerations for upgrading Tyk and its components across all product models and installation types offered.
---

This section provides guides and guidance for upgrading your Tyk installation.

+When upgrading Tyk, consider the following:
- **Deployment model**: SaaS, Self Managed, Hybrid, or OSS.
- **Installation type**: Take into account the installation style you've implemented, such as Docker, Helm, K8S, or various Linux distributions.
- **Components**: Depending on your model, upgrade relevant components such as Gateway, Pump, Dashboard, or Go Plugins.

Following these considerations, we have structured this section of upgrade guides in the same way so you get all the information you need in one place.

---

## Standards and recommendations
All our components adhere to a few common standards:

- **Breaking changes:** We do not introduce breaking changes unless specifically stated in the release notes (and it rarely happens).
- **Overwrite:** Upgrades do not overwrite your configuration files. However, it is a good practice to back up these files routinely
(using git or another tool). We strongly recommend backing up before upgrading Tyk. The upgrade will deploy new copies of startup scripts, so any customisations should be saved in advance.
- **BMigration scripts:** You do not need to migrate or run migration scripts for your APIs, policies or other assets created in Tyk unless
specifically stated in the release (and it rarely happens).
- **Long Term Support:** Check our [versioning and long-term-support policies]({{< ref "developer-support/special-releases-and-features/long-term-support-releases" >}})
for more details on the way we release major and minor features, patches and the support dates for each release.
- **Preparations:** Make sure you have consulted the [preparation guidelines]({{< ref "developer-support/upgrading-tyk/preparations/upgrade-guidelines" >}}) before starting the upgrade.
 
before starting the upgrade.
- **Release notes:** All release notes have an "Upgrade Instructions" section. Please make sure to check it in the
relevant release notes.
- **Backups:** Make sure you follow our [comprehensive guide for backing up Tyk]({{< ref "frequently-asked-questions/how-to-backup-tyk" >}})
before starting the upgrade.
- **Docker:** Upgrading is trivial and similar to any other product upgrade done in Linux, Docker, Kubernetes or Helm.
It essentially means pulling the new images from public directories. You can find the list of all our releases in the
following links:

    - Docker & Kubernetes - Docker Hub - https://hub.docker.com/u/tykio
    - Helm install - Artifact Hub - https://artifacthub.io/packages/search?repo=tyk-helm
    - Linux - Packagecloud - https://packagecloud.io/tyk

   The above repositories will be updated when new versions are released
- If you experience any issues with the new version you pulled, please contact Tyk Support or [Tyk community forum](https://community.tyk.io/).

---

## Upgrade Guides ToC

Use the table below to follow the upgrade guide appropriate for your platform:

| Platform             | Guide            | Description |
|----------------------| ---------------- | ----------- |
| **Tyk Cloud**        | [Cloud SaaS]({{< ref "developer-support/upgrading-tyk/deployment-model/cloud/upgrade-cloud-saas" >}}) | Guide for Tyk Cloud SaaS (Software As A Service) |
|                      | [Hybrid]({{< ref "developer-support/upgrading-tyk/deployment-model/cloud/upgrade-hybrid" >}}) | Guide for Hybrid environments with Gateway Data Plane(s) deployed on a local server or within a third party cloud provider |
|                      | [Go plugin]({{< ref "developer-support/upgrading-tyk/deployment-model/cloud/upgrade-go-plugin" >}}) | Guide for upgrading Go plugin on the Tyk Cloud |
| **Tyk Self Managed** | [RHEL and CentOS]({{< ref "developer-support/upgrading-tyk/deployment-model/self-managed/linux-distributions/self-managed-rpm" >}}) | Guide for RPM based Linux distributions |
|                      | [Debian and Ubuntu]({{< ref "developer-support/upgrading-tyk/deployment-model/self-managed/linux-distributions/self-managed-deb" >}}) | Guide for DEB based Linux distributions |
|                      | [Docker]({{< ref "developer-support/upgrading-tyk/deployment-model/self-managed/docker" >}}) | Guide for Docker |
|                      | [Helm]({{< ref "developer-support/upgrading-tyk/deployment-model/self-managed/helm" >}}) | Guide for upgrading Helm Charts |
|                      | [Kubernetes]({{< ref "developer-support/upgrading-tyk/deployment-model/self-managed/kubernetes" >}}) | Guide for Kubernetes environment |
| **Tyk Open Source**  | [Tyk Gateway]({{< ref "developer-support/upgrading-tyk/deployment-model/open-source" >}}) | Guide for upgrading Tyk open source environment |

---

## Supporting Tools

Tyk offer support supporting tools to migrate database platform and backup APIs and policies.

#### Migrating from MongoDB to SQL

We have a [migration tool]({{< ref "planning-for-production/database-settings/postgresql.md#migrating-from-an-existing-mongodb-instance" >}}) to help you manage the switch from MongoDB to SQL.

#### Backup APIs Script

We provide a bash [backup script]({{< ref "developer-support/backups/backup-apis-and-policies" >}}) that you can use to export and restore all Tyk API Definitions and Policies.

---

## Don't Have Tyk Yet?

[Get Started now](https://tyk.io/pricing/compare-api-management-platforms/#get-started), for free, or
[contact us](https://tyk.io/about/contact/) with any questions.

---
