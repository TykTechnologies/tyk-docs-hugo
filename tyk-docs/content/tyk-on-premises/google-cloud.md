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

[GCP](https://cloud.google.com/) is Google's Cloud services platform. It supports both the running of [Ubuntu Servers](https://console.cloud.google.com/marketplace/browse?q=ubuntu%2020.04) and [Docker](https://cloud.google.com/build/docs/cloud-builders).

For more details, see the [Google Cloud Documentation](https://cloud.google.com/docs).

## Tyk Installation Options for Google CLoud 

Google Cloud allows you to install Tyk in the following ways:

### On-Premises

1. Via our [Ubuntu Setup]({{< ref "tyk-on-premises/debian-ubuntu" >}}) on an installed Ubuntu Server within Google Cloud.
2. Via our [Docker Installation]({{< ref "tyk-on-premises/docker" >}}) using Google Cloud's Docker support.

### Tyk Pump on GCP

When running Tyk Pump in GCP using [Cloud Run](https://cloud.google.com/run/docs/overview/what-is-cloud-run) it is available 24/7. However, since it is serverless you also need to ensure that the _CPU always allocated_ option is configured to ensure availability of the analytics. Otherwise, for each request there will be a lag between the Tyk Pump container starting up and having the CPU allocated. Subsequently, the analytics would only be available during this time.

1. Configure Cloud Run to have the [CPU always allocated](https://cloud.google.com/run/docs/configuring/cpu-allocation#setting) option enabled. Otherwise, the Tyk Pump container needs to warm up, which takes approximately 1 min. Subsequently, by this time the stats are removed from Redis.

2. Update the Tyk Gateway [configuration]({{< ref "tyk-oss-gateway/configuration#analytics_configstorage_expiration_time" >}}) to keep the stats for 3 mins to allow Tyk Pump to process them. This value should be greater than the Pump [purge delay]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables#purge_delay" >}}) to ensure the analytics data exists long enough in Redis to be processed by the Pump. 
