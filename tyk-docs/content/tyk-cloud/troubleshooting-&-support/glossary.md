---
date: 2018-03-09T11:20:34Z
Title: Glossary
weight: 10
menu:
  main:
    parent: "Troubleshooting & Support"
aliases:
  - /tyk-cloud/troubleshooting-support/glossary/
  - /tyk-cloud/glossary/
  - /tyk-cloud/troubleshooting-&-support/glossary
---

## Introduction

This page explains the terms that we use across the Tyk Cloud documentation, so that you can always be sure what we mean.

## Account Terms

### Account

The highest level container for one or more Organisations.

### Organisation

The main entity for all your data (Environments, APIs, Users, etc). An Organisation is connected to a single region and once connected, cannot be changed.

### Team 

A sub-grouping within an Organisation.

### User

A person who is a member of a Team with a set of permissions.

### Role

A set of data and access permissions that can be applied to a user or team of users. See [User Roles]({{< ref "tyk-cloud/teams-&-users/user-roles.md" >}}) for more details.

### Profile

The place that holds personal information for a user.

### Subscription

A set of allowances assigned to an Organisation (made up of plan+addons+settings).

### Plan

A portion of allowances (without add-ons) that feed into the main subscription.

### Operations

The place to manage all deployments for an Organisation or Team. 

### Environment

A grouping of 'deployments' that can have multiple Control Planes and Cloud Data Planes.

### Stack

The high level name for the set of configurations making up different types of deployments.

### Control Plane

A deployment type: A single management layer for data in one region (where all the data lives).

### Cloud Data Plane

A deployment type: Additional workers with varying functionality that are linked to the main control plane and can be deployed in a different region from the Control Plane.

### Instance

Used to control traffic and scale in a Tyk Gateway.

### Dashboard

The Tyk Analytics Dashboard to manage APIs and services.

### Retirement

Where an Organisation has expired due to either a subscription failure or cancellation and is now within a "retirement" period of 30 days, during which an [Billing Admin]({{< ref "tyk-cloud/teams-&-users/user-roles#user-roles-within-tyk-cloud" >}}) can reinstate full functionality by updating or creating a new subscription.

## Action Terms

### Deploy

Deploy a not yet deployed state (a first time deployment).

### Undeploy

Temporarily remove a deployed status but keep all data and configuration.

### Redeploy

Redeploy from a deployed state. Used for troubleshooting.

### Destroy

Permenantly remove a deployment and all associated data and configurations.

### Create

Date and time of time a deployment was initially created.

### Add

Add a new 'user' or 'team' etc.

### Remove

Remove things that have been added e.g. users and teams.

### Update

Saving a change to a configuration.

### Edit

Changing configuration or information on any of the deployments or other resources such as users or teams.

## State Terms

### Deployed

A deployment that is currently deployed.

### Undeployed

A deployment that was deployed but has been undeployed.

### Not Deployed

A deployment that has never been deployed.

### Destroyed

A deployment that has been permenantly deleted and will not be visible in the operations console.

### Unsuccessful

When there has been an error in the deployment process.

### Deploying

When a deployment is being deployed.

### Undeploying

When a deployment is being undeployed.

## Roles and Permissions

See [User Roles]({{< ref "tyk-cloud/teams-&-users/user-roles.md" >}}) for more details

### Super Administrator

Can do everything across all organisations

### Organisation Admin

Can do everything within the scope of the one organisation they have access to.

### Team Admin

Can do everything within the scope of the one team they have access to.

### Team Member

Can only view and manage the overview, environments and deployments.
