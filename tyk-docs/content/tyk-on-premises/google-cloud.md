---
title: Google Cloud
tags: ["Tyk Stack", "Self-Managed", "Installation", "Google Cloud"]
description: "How to install the Tyk Stack on Google Cloud"
menu:
  main:
    parent: "Self-Managed Installation"
weight: 6
aliases:
  - /getting-started/installation/with-tyk-on-premises/install-tyk-google-cloud/
---

## Introduction
[GCP](https://cloud.google.com/) is Google's cloud services platform. It supports both the running of [Ubuntu Servers](https://console.cloud.google.com/marketplace/browse?q=ubuntu%2020.04), as well as [Docker](https://cloud.google.com/build/docs/cloud-builders).

For more details, see the [Google Cloud Documentation](https://cloud.google.com/docs).

## Tyk Installation Options for Google CLoud 

Google Cloud allows you to install Tyk in the following ways:

### On-Premises

1. Via our [Ubuntu Setup]({{< ref "tyk-on-premises/debian-ubuntu" >}}) on an installed Ubuntu Server on Google Cloud.
2. Via our [Docker Installation]({{< ref "tyk-on-premises/docker" >}}) using Google Cloud's Docker support.

### Pump on GCP

When running Pump in GCP using Cloud Run,  configured to be running 24/7 but as its serverless you also need to select "CPU always allocated" otherwise there is a lag between Pump starting up/having CPU allocated and how long the analytics are kept.

1. Update cloud run service to have the CPU always allocated, otherwise pump needs to warm up (which takes about 1 min) by this time the stats are removed from redis

2. Update the gateway configuration to keep the stats for 3 mins to allow pump to process them.
