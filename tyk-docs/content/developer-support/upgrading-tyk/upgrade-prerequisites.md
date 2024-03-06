---
title: "Upgrade Pre-Requisites"
date: 2024-02-26
tags: ["Upgrade Go Plugins", "Tyk plugins", "DEB", "Self Managed"]
description: "Explains the pre-requesites to consider prior to upgrading"
---

When considering upgrading your current configuration to a new Tyk release, our team recommends you consider the following:

- **Which upgrade strategy do you intend to use: [Rolling]({{< ref "developer-support/upgrading-tyk/upgrade-strategy#rolling-upgrade" >}}) or [Blue-Green]({{< ref "developer-support/upgrading-tyk/upgrade-strategy#blue-green" >}})**
    - If following the Blue-Green upgrade strategy, has the green environment been configured and verified as production-ready?
    - If pursuing the Rolling upgrade strategy, do all Tyk components have a second instance?
- **What operating system is currently in use?**
    - Was Tyk deployed via a repository or a local package file .rpm (CentOS or RHEL) or .deb (Debian or Ubuntu)?
    - Is the targeted version available on [packagecloud.io/tyk](https://packagecloud.io/tyk) or the intended version?
- **Have backups been performed?**
    - Have databases been properly backed up?
    - Are the configuration files safely backed up?
    - Have you tested your backups?
- **Are there any custom plugins?**
    - Do they need to be recompiled using the guide listed in the [table](#next-steps) below appropriate for your platform?

## Next Steps {#next-steps}

Consult our [upgrade strategy]({{< ref "developer-support/upgrading-tyk/upgrade-strategy" >}}) guidelines to help you decide between a [Rolling]({{< ref "developer-support/upgrading-tyk/upgrade-strategy#rolling-upgrade" >}}) or [Blue-Green]({{< ref "developer-support/upgrading-tyk/upgrade-strategy#blue-green" >}}) upgrade.

Use the table below to follow the upgrade guide appropriate for your platform:

| Platform         | Guide             | Description |
| ---------------- | ---------------- | ----------- |
| Tyk Cloud        | [Cloud SaaS]({{< ref "developer-support/upgrading-tyk/cloud-saas" >}}) | Guide for Tyk Cloud SaaS (Software As A Service) |
| | [Hybrid]({{< ref "developer-support/upgrading-tyk/self-managed/self-managed-hybrid" >}}) | Guide for Hybrid environments with Gateway Data Plane(s) deployed on a local server or within a third party cloud provider |
| Tyk Self Managed | [RHEL or CENTOS]({{< ref "developer-support/upgrading-tyk/self-managed/linux-distributions/self-managed-rpm" >}}) | Guide for RPM based Linux distributions |
| | [Debian or Ubuntu]({{< ref "developer-support/upgrading-tyk/self-managed/linux-distributions/self-managed-deb" >}}) | Guide for DEB based Linux distributions |

