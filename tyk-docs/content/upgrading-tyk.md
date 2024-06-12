---
title: Upgrading Tyk
description: Guide for upgrading Tyk components
weight: 251
menu:
    main:
        parent: "FAQ"
---

This page provides guidance for upgrading your Tyk installation. When upgrading Tyk, you need to consider each component (e.g. Gateway, Pump, Dashboard) separately, taking into account the deployment style you've implemented. We have structured this guide by deployment type (e.g. Cloud, Self-Managed, etc.) to keep all the information you need in one place.

## Upgrade standards and recommendations
All our components adhere to a few common standards:

- We do not introduce breaking changes unless specifically stated in the release notes (and it rarely happens).
- Check our [versioning and long-term-support policies]({{< ref "developer-support/long-term-support-releases" >}}) for more details on the way we release major and minor features, patches and the support dates for each release.
- Make sure you have planned an [upgrade strategy]({{< ref "developer-support/upgrading-tyk/upgrade-strategy" >}}).
- Make sure you have consulted the [upgrade prerequisites]({{< ref "developer-support/upgrading-tyk/upgrade-prerequisites" >}}) before starting the upgrade.
- Make sure you follow our [comprehensive guide for backing up Tyk]({{< ref "frequently-asked-questions/how-to-backup-tyk" >}}) before starting the upgrade.
- If you experience any issues with the new version you pulled, please contact Tyk Support or [Tyk community forum](https://community.tyk.io/).


## Upgrade Guides

Tyk provide upgrade guides for a variety of platforms.

### Tyk Cloud 

Tyk Cloud users manage Tyk deployments via the Tyk Cloud Console. You can upgrade Tyk Dashboard and the Gateways in the Cloud Data Planes using this console. Please consult our upgrade guides for [Cloud SaaS]({{< ref "developer-support/upgrading-tyk/cloud/cloud-saas/" >}}) and [Hybrid SaaS]({{< ref "developer-support/upgrading-tyk/cloud/hybrid/" >}}) to learn more!

### Self Managed

Please consult our guides for upgrading Tyk Gateway in a self managed environment for [RHEL (CentOS)]({{< ref "developer-support/upgrading-tyk/self-managed/linux-distributions/self-managed-rpm" >}}) and [Debian]({{< ref "developer-support/upgrading-tyk/self-managed/linux-distributions/self-managed-deb" >}}) Linux distributions.

### Other

We also offer upgrade guides for:
- [Docker]({{< ref "developer-support/upgrading-tyk/other-upgrade-options/docker" >}})
- [Helm]({{< ref "developer-support/upgrading-tyk/other-upgrade-options/helm" >}})
- [Kubernetes]({{< ref "developer-support/upgrading-tyk/other-upgrade-options/kubernetes" >}})

---

## Upgrade Tools

Tyk offer support upgrading tools to migrate database platform and backup APIs and policies.

#### Migrating from MongoDB to SQL

We have a [migration tool]({{< ref "planning-for-production/database-settings/postgresql.md#migrating-from-an-existing-mongodb-instance" >}}) to help you manage the switch from MongoDB to SQL.

#### Backup Script

We provide a bash [backup script]({{< ref "developer-support/backups/backup-apis-and-policies" >}}) that you can use to export and restore all Tyk API Definitions and Policies.

---

## Don't Have Tyk Yet?

Get started now, for free, or contact us with any questions.

* [Get Started](https://tyk.io/pricing/compare-api-management-platforms/#get-started)
* [Contact Us](https://tyk.io/about/contact/)
