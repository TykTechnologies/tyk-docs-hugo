---
title: "Managing Organisations"
date: 2020-04-15
tags: ["Tyk Cloud", "Management"]
description: "How to manage your Tyk Cloud Organisations"
menu:
  main:
    parent: "Environments & Deployments"
weight: 1
aliases:
  - /tyk-cloud/environments-&-deployments/managing-organisations
---

## Introduction

Your Organisation is your "container" for all your Environments, Control Planes and Cloud Data Planes. When you setup your Organisation when [creating your account]({{< ref "tyk-cloud/getting-started-tyk-cloud/create-account" >}}), you assign it to a Home Region where all your data is stored. You cannot change this home region after creating your organisation.

## Organisation Overview Screen

If you are an Organisation Admin, when you log in you will see the Overview screen for the Organisation you are connected to. If you are a team admin or team member you will see the Team Overview Screen. The Organisation Overview screen displays the following info:

* Quick Stats
* All Teams
* All Deployments
* All Environments


### Quick Stats

{{< img src="/img/admin/tyk-cloud-org-overview.png" alt="Quick Stats" >}}

This section gives you an "at a glance" overview of your organisation. This section is designed to show what your plan entitles your organisation to and how much of your entitlement is currently used in relation to Teams, Control Planes, Cloud Data Plane Deployments and the distribution of those deployments across the available entitlement regions.

### Teams

{{< img src="/img/admin/tyk-cloud-org-teams.png" alt="Teams" >}}

This section shows the number of teams created within the organisation, the number of environments the team is assigned to, and the Control Plane and Deployed Cloud Data Planes within those environments.

### Deployments

The default view for this section is Group by Control Plane and shows all deployments across all teams.

{{< img src="/img/admin/tyk-cloud-org-deployments.png" alt="Deployments Grouped by Control Plane" >}}

### Environments

The Environments section shows the environments created within your organisation, the team they belong to and active deployments within each environment.

{{< img src="/img/admin/org_admin_environments.png" alt="Environments" >}}
