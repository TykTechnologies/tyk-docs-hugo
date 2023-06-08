---
date: 2020-03-17T19:13:22Z
Title: Task 2 - Set up Your Organisation
tags: ["Tyk Stack", "Tyk Cloud", "SaaS", "Organisation"]
description: "Setting up your organisation for Tyk Cloud"
menu:
  main:
    parent: "Getting Started with Tyk Cloud"
weight: 2
aliases:
    - /tyk-cloud/setup-org/
---


## Introduction

Now that you have created the new Tyk Cloud account with your basic details, it is time to set up your organisation. This page will tell you how to set up your organisation and also about the two ways of setting it up.

## What is an organisation?

* An organisation is the main entity for all your data (Environments, APIs, Users, etc)
* An Organisation is connected to a single region and once connected, cannot be changed.
  
## Steps to set up your organisation  

* **Step 1 - Name your Organisation:** Give your organisation a name. This is up to you, but most users use their company name.

* **Step 2 - Select a Home Region:** Select a region from the drop-down list where your [Control Plane]({{< ref "tyk-cloud/troubleshooting-&-support/glossary.md#control-plane" >}}) will be deployed and your data stored. The number of regions available will depend on your licence. Further regions can be added as an upgrade option.

{{< note success >}}
**Note**
  
Tyk Cloud can currently be deployed across 2 AWS regions in the USA plus UK, Germany and Singapore. If you have any concerns about Brexit impacting the way you store data you should read [AWS regularly updated Brexit statement](https://aws.amazon.com/compliance/gdpr-center/brexit/).
{{< /note >}}

## Types of Setups

You can now select how to configure your deployment.

### Option 1: Demo Setup

Our demo setup will quickly configure your first deployment setup automatically, creating your first team, control plane and cloud data plane.

### Option 2: Manual Setup

This setup option gives you full control on creating the following:

* Teams
* Environments
* Configuration and deployment of Control Planes and Cloud Data Planes

For a manual setup you'll get started by [setting up your first team]({{< ref "/tyk-cloud/getting-started-tyk-cloud/setup-team.md" >}}).
