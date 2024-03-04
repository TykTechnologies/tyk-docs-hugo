---
title: "Upgrading Pre-Requisites"
date: 2024-02-26
tags: ["Upgrade Go Plugins", "Tyk plugins", "DEB", "Self Managed"]
description: "Explains the pre-requesites to consider prior to upgrading"
---

When considering upgrading your current configuration to a newer version of Tyk, our team recommends you consider the following:

- Which upgrade strategy do you intend to use: Rolling or Blue-Green?
    - If following the Blue-Green upgrade strategy, has the green environment been configured and verified as production-ready?
    - If pursuing the Rolling upgrade strategy, do all Tyk components have a second instance?
- What operating system is currently in use?
- Was Tyk deployed via a repository or .rpm (specifically for CentOS or RHEL)?
- Is the targeted version available on packagecloud.io or the intended version?
- Have backups been performed?
    - Have the databases been properly backed up?
    - Are the configuration files safely backed up?

- Are there any custom plugins, and if so, do they need to be recompiled using the steps outlined in this guide?

Once this checklist has been considered, we recommend you follow our guides for upgrading your components.

<!-- TO DO add links to RMP, SaaS and DEB 
<link to RMP>
<link to SaaS>
<link to DEB>
-->
