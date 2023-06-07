---
date: 2020-03-17T19:13:22Z
Title: Task 4 - Set Up Environment and Configure Deployments
tags: ["Tyk Stack", "Tyk Cloud", "SaaS", "Environment"]
description: "Setting up your environment for Tyk Cloud"
menu:
  main:
    parent: "Getting Started with Tyk Cloud"
weight: 4
aliases:
    - /tyk-cloud/create-environment/
---

## Introduction

An Environment allows you to group deployments together. In this step we will create an Environment and configure our first Control Plane and Cloud Data Plane deployments.

## What is an environment?

An environment is a grouping of ‘deployments’ that can have multiple Control Planes and Cloud Data Planes.

## Steps to set up your environment

* **Step 1 - Name your Environment:** Give your [Environment]({{< ref "/content/tyk-cloud/troubleshooting-&-support/glossary.md#environment" >}}) a name. You may find it useful to reflect the names used within your organisation such as Development, Production etc.
  
* **Step 2 - Name your Control Plane:** Give your [Control Plane]({{< ref "/content/tyk-cloud/troubleshooting-&-support/glossary.md#control-plane" >}}) a name. Again, this is up to you and you may already have an infrastructure you want to re-create in Tyk Cloud.
  
* **Step 3 - Configure your first Cloud Data Plane:** Select the region you want to locate your [Cloud Data Plane]({{< ref "/content/tyk-cloud/troubleshooting-&-support/glossary.md#cloud-data-plane" >}}) in from the drop-down list. Your Cloud Data Plane is not confined to the same region as your Organisation and Control Plane but the amount of regions you have to choose from can be limited depending on your subscription plan. Give your Cloud Data Plane a name. 

{{< note success >}}
**Note**
  
You need to have at least one Cloud Data Plane with a *Deployed* status connected to your Control Plane.
{{< /note >}}

* **Step 4 - Deployment:**

1. Click [Deploy Control Plane and Create a Cloud Data Plane]({{< ref "/content/tyk-cloud/troubleshooting-&-support/glossary.md#deploy" >}}). You can watch your Control Plane being deployed and your Cloud Data Plane being created. You will then be taken to the Control Plane overview screen within the Tyk Cloud dashboard.
2. From your Control Plane overview you will see the Cloud Data Plane is in a **Not Deployed** state. Click on your Cloud Data Plane to open its overview.
3. In the top right of your Cloud Data Plane overview, click **Not Deployed** and choose **Deploy** from the drop-down.
4. With your Cloud Data Plane successfully deployed, make a note of the tags assigned to your Cloud Data Plane. One tag is "edge" and the other is the location of your Cloud Data Plane. You'll add a tag when creating your API.

Here's a video on how to set up your Tyk Cloud Environment.

{{< youtube DxoLm0vgsP8 >}}

Next you'll [set up your first API]({{< ref "tyk-cloud/getting-started-tyk-cloud/first-api" >}}) from the Tyk Dashboard.
