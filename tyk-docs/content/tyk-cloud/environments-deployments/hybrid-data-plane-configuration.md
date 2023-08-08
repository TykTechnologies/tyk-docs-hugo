---
title: "Hybrid Data Plane configuration"
date: 2022-03-14
tags: ["Tyk Cloud", "Hybrid", "Gateways", "data plane", "Kubernetes", "docker"]
description: "How to deploy Hybrid Gateways on Kubernetes and Docker"
menu:
  main:
    parent: "Environments & Deployments"
weight: 5
---

[Tyk Cloud](https://tyk.io/cloud/) hosts and manages the control planes for you. You can deploy the data planes across multiple locations:
* as [Cloud Gateways]({{< ref "tyk-cloud/environments-&-deployments/managing-gateways.md" >}}): deployed and managed in Tyk Cloud, in any of 5 regions available. No need to care about deployment and operational concerns.
* as Hybrid Gateways: deployed locally and managed by you: in your own data centre, public or private cloud or even on your own machine

This page describes the deployment of hybrid data planes and how to connect them to Tyk Cloud, in both Kubernetes and Docker environments.

## Pre-requisites

* Tyk Cloud Account, register here if you don't have one yet: {{< button_left href="https://tyk.io/sign-up/#cloud" color="green" content="free trial" >}}
* A Redis instance for each data plane, used as temporay storage for distributed rate limiting, token storage and analytics. You will find instructions for a simple Redis installation in the steps below.
* No incoming firewalls rules are needed, as the connection between Hybrid Gateways and Tyk Cloud is always initiated from the Gateways, not from Tyk Cloud.

## Setup your hybrid data plane configuration
Login to you Tyk Cloud account deployments section and click on `ADD HYBRID DATA PLANE`

  {{< img src="/img/hybrid-gateway/tyk-cloud-hybrid-configuration-home.png" alt="Tyk Cloud hybrid configuration home" >}}

Fill in the details and then click `SAVE DATA PLANE CONFIG`

  {{< img src="/img/hybrid-gateway/tyk-cloud-save-hybrid-configuration.png" alt="Save Tyk Cloud hybrid configuration home" >}}

Click on `OPEN DETAILS` 

  {{< img src="/img/hybrid-gateway/tyk-cloud-hybrid-open-details.png" alt="Tyk Cloud hybrid open for details" >}}

This will reveal instructions that you can use to connect your hybrid data plane to TyK Cloud.

  {{< img src="/img/hybrid-gateway/tyk-cloud-hybrid-revelead-instructions.png" alt="Tyk Cloud hybrid detailed instructions" >}}


For production grade deployment and flexibility, see detailed instructions in our documentation for [Deploy Hybrid Gateways]({{< ref "tyk-cloud/environments-deployments/hybrid-gateways" >}})