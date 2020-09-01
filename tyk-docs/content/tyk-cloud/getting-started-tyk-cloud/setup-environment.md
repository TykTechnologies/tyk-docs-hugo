---
date: 2020-03-17T19:13:22Z
Title: Task 4 - Set Up Environment and Configure Deployments
menu:
  main:
    parent: "Getting Started with Tyk Cloud"
weight: 4
aliases:
    - /tyk-cloud/create-environment/
---

## Introduction

An Environment allows you to group deployments together. In this step we will create an Environment and configure our first Control Plane and Edge Gateway deployments.

Watch our video on how to set up your Tyk Cloud Environment.

{{< youtube DxoLm0vgsP8 >}}

## Step One - Name your Environment

Give your [Environment](/docs/tyk-cloud/troubleshooting-support/glossary/#environment) a name. You may find it useful to reflect the names used within your organisation such as Development, Production etc.

## Step Two - Name your Control Plane

Give your [Control Plane](/docs/tyk-cloud/troubleshooting-support/glossary/#control-plane) a name. Again, this is up to you and you may already have an infrastructure you want to re-create in Tyk Cloud.

## Step Three - Configure your first Edge Gateway

{{< note success >}}
**Note**
  
You need to have at least one Edge Gateway with a **Deployed** status connected to your Control Plane.
{{< /note >}}

1. Select the region you want to locate your [Edge Gateway](/docs/tyk-cloud/troubleshooting-support/glossary/#edge) in from the drop-down list. Your Edge Gateway is not confined to the same region as your Organisation and Control Plane but the amount of regions you have to choose from can be limited depending on your subscription plan.
2. Give your Edge Gateway a name. 

## Step Five

Click [Deploy Control Plane and Create an Edge Gateway](/docs/tyk-cloud/troubleshooting-support/glossary/#deploy). You can watch your Control Plane being deployed and your Edge Gateway being created. You will then be taken to the Control Plane overview screen within the Tyk Cloud dashboard.

Next you'll deploy your Edge Gateway and set up your first API from the Tyk Dashboard.
