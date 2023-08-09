---
date: 2020-03-17T19:13:22Z
title: Getting Started with Tyk Cloud
tags: ["Tyk Stack", "Tyk Cloud", "SaaS", "Getting Started"]
description: "Getting started with the Tyk Cloud SaaS solution for API management"
weight: 2
menu:
  main:
    parent: "Tyk Cloud"
---

## Introduction


This page walks you through how to start using Tyk Cloud, creating organisation, environment and users before creating an API. If you are in a hurry, try the [Quick Start guide]({{< ref "../deployment-and-operations/tyk-cloud-platform/quick-start.md" >}}) for a 5 min version of this tutorial. 

* Creating your Tyk Cloud account
* Your first Organisation
* Creating your first Team and Environment
* Configuring and deploying your Control Plane and creating your Cloud Data Plane
* Adding and testing your first API

At the end of this process you will have a simple API set up via a Tyk Dashboard and you'll see analytics for this API on the Tyk Activity Dashboard.

Depending on your initial requirements in terms of Environments, Teams and Users, the setup process should take between 15 to 30 minutes.

### Hierarchy

This diagram shows how _Organisation, Teams, Environments, Control Planes and Cloud Data Planes_ fit in with each other and which object contains which:

{{< img src="/img/cloud/Onboarding_Diagram_2-1_Ara.png" alt="Hierarchy of Organisation, Teams, Environments, Control Planes and Cloud Data Planes" >}}

## Prerequisites

The following information would be useful so you can set up Tyk Cloud as quickly as possible:

* Team member information including their email address and the role you plan to assign to them.
* We have some specific terminology used within Tyk Cloud. It would be useful to checkout our [Glossary]({{< ref "tyk-cloud/troubleshooting-&-support/glossary.md" >}}) so you understand what we are referring to.