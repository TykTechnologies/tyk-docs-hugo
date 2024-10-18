---
title: Upgrading Tyk
tags: ["upgrade", "upgrading", "Tyk upgrade", "Upgrade guides" ]
description: This guide provides essential instructions and considerations for upgrading Tyk and its components across all product models and installation types offered.
---

This section provides detailed guides and recommendations for upgrading your Tyk installation.

When upgrading Tyk, consider the following:</br>
**Deployment model**: SaaS, Self-Managed, Hybrid, or OSS.</br>
**Installation type**: Docker, Helm, K8S, or various Linux distributions.</br>
**Components**: Depending on your model, upgrade relevant components such as Gateway, Pump, Dashboard, or Go Plugins.

These considerations are reflected in our structured upgrade guides, ensuring you have all necessary information in one place.

---

## Standards and recommendations
Our upgrade process adheres to the following standards:

- **Breaking changes:** Breaking changes are rare and will be explicitly stated in the release notes.
- **Configuration files:** Upgrades do not overwrite your configuration files. However, it’s good practice to routinely back up these files (using git or another tool) before upgrading, so any customizations are saved.
- **Migration scripts:** Migration scripts for your APIs, policies, or other assets are generally not required unless specified in the release notes.
- **Long Term Support:** Refer to our [versioning and long-term support policies]({{< ref "developer-support/special-releases-and-features/long-term-support-releases" >}}) for details on major and minor releases, patches, and support dates.
- **Preparations:** Review the [preparation guidelines]({{< ref "developer-support/upgrading-tyk/preparations/upgrade-guidelines" >}}) before starting the upgrade.
- **Release notes:** Always check the "Upgrade Instructions" section in the relevant release notes.
- **Backups:** Follow our [comprehensive backup guide]({{< ref "frequently-asked-questions/how-to-backup-tyk" >}}) before starting the upgrade.
- Docker: Upgrading with Docker is straightforward—pull the new images from public repositories. Refer to the following links for our releases:

- **Docker:** Upgrading with Docker is straightforward - pull the new images from public repositories. Refer to the following links for our releases:
    - Docker & Kubernetes - Docker Hub - https://hub.docker.com/u/tykio
    - Helm install - Artifact Hub - https://artifacthub.io/packages/search?repo=tyk-helm
    - Linux - Packagecloud - https://packagecloud.io/tyk

   The above repositories will be updated when new versions are released
- If you experience issues with the new version you pulled, contact Tyk Support or visit [Tyk community forum](https://community.tyk.io/).

---

## Upgrade Guides ToC
Use the table below to find the appropriate upgrade guide for your platform:

| Platform             | Guide            | Description |
|----------------------| ---------------- | ----------- |
| **Tyk Cloud**        | [Cloud SaaS]({{< ref "developer-support/upgrading-tyk/deployment-model/cloud/upgrade-cloud-saas" >}}) | Guide to Tyk Cloud SaaS |
|                      | [Hybrid]({{< ref "developer-support/upgrading-tyk/deployment-model/cloud/upgrade-hybrid" >}}) | Guide for Hybrid environments with Gateway Data Plane(s) deployed locally or with a third-party cloud provider |
|                      | [Go plugin]({{< ref "developer-support/upgrading-tyk/deployment-model/cloud/upgrade-go-plugin" >}}) | Guide for upgrading Go plugin on the Tyk Cloud |
| **Tyk Self Managed** | [RHEL and CentOS]({{< ref "developer-support/upgrading-tyk/deployment-model/self-managed/linux-distributions/self-managed-rpm" >}}) | Guide for RPM-based Linux distributions |
|                      | [Debian and Ubuntu]({{< ref "developer-support/upgrading-tyk/deployment-model/self-managed/linux-distributions/self-managed-deb" >}}) | Guide for DEB-based Linux distributions |
|                      | [Docker]({{< ref "developer-support/upgrading-tyk/deployment-model/self-managed/docker" >}}) | Guide for upgrading Docker images |
|                      | [Helm]({{< ref "developer-support/upgrading-tyk/deployment-model/self-managed/helm" >}}) | Guide for upgrading Helm Charts |
|                      | [Kubernetes]({{< ref "developer-support/upgrading-tyk/deployment-model/self-managed/kubernetes" >}}) | Guide for upgrading Kubernetes environment |
| **Tyk MDCB Self Managed** | [MDCB]({{< ref "/developer-support/upgrading-tyk/deployment-model/self-managed/overview#upgrade-mdcb" >}}) | Guide for upgrading Mutli Data Center Bridge (MDCB) |
| **Tyk Open Source**  | [Tyk Gateway]({{< ref "developer-support/upgrading-tyk/deployment-model/open-source" >}}) | Guide for upgrading Tyk open source environment |

---

## Supporting Tools
Tyk offers supporting tools for database migration and backing up APIs and policies.

#### Migrating from MongoDB to SQL

Use our [migration tool]({{< ref "planning-for-production/database-settings/postgresql.md#migrating-from-an-existing-mongodb-instance" >}}) to manage the switch from MongoDB to SQL.

#### Backup APIs Script

Utilize our bash [backup script]({{< ref "developer-support/backups/backup-apis-and-policies" >}}) to export and restore all Tyk API Definitions and Policies.

---

## Don't Have Tyk Yet?

[Get started now](https://tyk.io/pricing/compare-api-management-platforms/#get-started) for free, or
[contact us](https://tyk.io/about/contact/) with any questions.

---
