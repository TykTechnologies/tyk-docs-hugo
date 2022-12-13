---
title: "Managing Environments"
date: 2020-04-21
tags: ["Tyk Cloud", "Management"]
description: "How to manage your Tyk Cloud Environments"
menu:
  main:
    parent: "Environments & Deployments"
weight: 2
url: /tyk-cloud/environments-&-deployments/managing-environments
---

## Introduction

Environments are used to group your [Control Plane]({{< ref "/content/tyk-cloud/troubleshooting-&-support/glossary.md#control-plane" >}}) and [Edge Gateways]({{< ref "/content/tyk-cloud/troubleshooting-&-support/glossary.md#edge" >}}) into logical groups. For example you may want to create environments that reflect different departments of your organisation. 

{{< note success >}}
**Note**
  
The number of Environments you can create is determined by your [plan]({{< ref "tyk-cloud/account-billing/plans/" >}})
{{< /note >}}

## Prerequisites

The following [user roles]({{< ref "tyk-cloud/reference-docs/user-roles/" >}}) can perform Environment Admin tasks:

* Org Admin
* Team Admin

You should also have created a team to assign to any new environment.

## Adding a New Environment

1. From the Environments screen, click **Add Environment**
2. Select the team you want to assign to the Environment
3. Give your new Environment a name
4. Click **Create**


## Editing an Existing Environment

An Org Admin can perform the following:

* Rename an Environment
* Delete an Environment

1. Click the environment Name from your list

![Edit Environment Name](img/admin/tyk-cloud-edit-env.png)

2. Click Edit

![Env Edit Screen](img/admin/tyk-cloud-env-screen.png)

3. You can now rename the environment, or delete it from your organisation

![Delete or Rename Env](img/admin/tyk-cloud-rename-delete.png)

{{< warning success >}}
**Warning**
  
Deleting an environment will also delete all the Control Planes and Edge Gateways associated with it
{{< /warning >}}