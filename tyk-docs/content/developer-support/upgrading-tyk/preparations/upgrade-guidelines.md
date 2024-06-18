---
title: "Upgrade Guidelines"
date: 2024-02-26
tags: ["Upgrade Go Plugins", "Tyk plugins", "DEB", "Self Managed"]
description: "Explains the pre-upgrade considerations"
---

When considering upgrading your current configuration to a new Tyk release, we recommend you consider the following:

- **Upgrade strategy:** Which strategy do you intend to use?
    - If following the [Blue-Green upgrade]({{< ref "developer-support/upgrading-tyk/preparations/upgrade-strategies#blue-green" >}}) strategy, has the green environment been configured and verified as production-ready?
    - If pursuing the [Rolling upgrade]({{< ref "developer-support/upgrading-tyk/preparations/upgrade-strategies#rolling-upgrade" >}}) strategy, do all Tyk components have a second instance?
    - If you'll have downtime, estimate the expected duration of the upgrade process and plan for potential downtime.

- **Backups:** Have backups been performed?**
    - Databases: Have databases been properly backed up?
    - configuration files: Have you safely back up these file (using version control system such as *git*)?
    - Testing: Have you tested the backups to verify they can be successfully restored in a separate environment?
    - Backup guide: Have you checke our [comprehensive guide for backing up Tyk]({{< ref "frequently-asked-questions/how-to-backup-tyk" >}})?

- **Go plugins:** Do you use custom go plugins with your APIs?**
    - Go plugin must be [recompiled]({{< ref "/developer-support/upgrading-tyk/go-plugins" >}}) for the new version.
    - Identify all Go plugins in use with all your API definitions.
    - Allow sufficient time for testing and troubleshooting Go plugins after the upgrade.

- **Linux users:** Which Linux distributions is currently in use?**
    - Was Tyk deployed via a repository or a local package file `.rpm` (used be *CentOS* and *RHEL*) or `.deb` (*Debian*
     and its derivative *Ubuntu*)?
    - Is the targeted version available on [packagecloud.io/tyk](https://packagecloud.io/tyk) or in an intended repository?

- **Communication:** Communicate with stakeholders and users about the upgrade schedule and expected impact on services.

- **Upgrade Checklist:**
  - Choose an upgrade strategy or manage downtime
  - Check Linux distribution and Tyk version availability
  - Perform and test backups
  - Identify and plan for custom Go plugin recompilation and testing
  - Communicate with stakeholders

## Next Steps {#next-steps}

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
