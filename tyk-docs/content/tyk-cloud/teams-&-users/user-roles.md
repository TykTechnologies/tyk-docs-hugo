---
title: "Tyk Cloud User Roles"
date: 2020-04-06
menu:
  main:
    parent: "Teams & Users"
weight: 3
aliases:
  - /tyk-cloud/reference-docs/user-roles/
  - /tyk-cloud/teams-&-users/user-roles
  - /tyk-cloud/teams-users/user-roles/
---

## Introduction

This page defines the different user roles within Tyk Cloud, so that you can see at a glance what each role does and manage your account accordingly.

## User Roles within Tyk Cloud

We have the following user roles defined in Tyk Cloud for your team members

* Billing Admin
* Organization Admin
* Team Admin
* Team Member

Billing Admins are responsible for the billing management of the Tyk Cloud account. Organization Admins, Team Admins and Team Members are responsible for managing the Tyk Cloud organization hierarchy and deploying/managing stacks, as well as having access to the Tyk Dashboard to manage APIs. Users of Tyk Cloud are usually DevOps, Architects and sometimes Engineers or Managers.

You can [add users to the Tyk Dashboard]({{< ref "basic-config-and-security/security/dashboard/create-users" >}}) itself instead of inviting them as Tyk Cloud users. These users would likely be your API Developers and Engineers who manage the APIs.   

## Use Case Matrix

The following table shows the scope for each user role.


| Use Case                                          | Billing Admin | Org Admin | Team Admin | Team Members |
|---------------------------------------------------|---------------|-----------|------------|--------------|
| Create a new account                              | X             |           |            |              |
| Create a new organization                         | X             |           |            |              |
| Managing a new account                            | X             |           |            |              |
| Managing an organization entitlement              | X             |           |            |              |
| Ability to create other billing admins            | X             |           |            |              |
| Editing organization name                         | X             | X         |            |              |
| Create team / delete                              |               | X         |            |              |
| Future - Edit team entitlements                   |               | X         |            |              |
| Invite, delete, edit org admins and team admins   |               | X         |            |              |
| Invite, delete, edit team members                 |               | X         | X          |              |
| Create new environments                           |               | X         | X          |              |
| Delete / change environments                      |               | X         | X          |              |
| View environments                                 |               | X         | X          | X            |
| Create and delete cloud data planes               |               | X         | X          |              |
| Create and delete control planes                  |               | X         | X          |              |
| View deployments                                  |               | X         | X          | X            |
| Deploy, undeploy, redeploy, restart a deployment. |               | X         | X          | X            |
| Create and manage basic SSO                       |               | X         | X          |              |
| Upload plugins to the File Server                 |               | X         | X          | X            |
| Delete plugins from File Server                   |               | X         | X          | X            |
| Viewing Analytics                                 |               | X         | X          | X            |

## Initial Tyk Cloud Account Roles

The user who signs up for the initial Tyk Cloud account is uniquely assigned to two roles:

1. Org admin of the organization
2. Billing admin of the account

This is the only occasion where a user can be assigned to 2 roles. So, for example, if you invite a user to be a Team Admin, that is the only role (and team) they can belong to. For a user to be invited as a Billing admin, they can't have an existing Tyk Cloud account.

{{< note success >}}
**Note**
  
This functionality may change in subsequent releases.
{{< /note >}}

## Tyk System Integration User (do not delete)

When you click your Control Plane Dashboard link from your Tyk Cloud Deployments Overview screen, you are automatically logged in to your Dashboard. This is due to a default Tyk Integration user that is created as part of the Control Plane deployment process. This user has a first name of `Tyk System Integration` and a last name of `User (do not delete)`. As the last name infers, you should not delete this user or your access to the Dashboard will be broken from your Tyk Cloud Installation.
