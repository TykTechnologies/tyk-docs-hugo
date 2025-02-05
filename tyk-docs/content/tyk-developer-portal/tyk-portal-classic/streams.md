---
date: 2024-11-19T10:10:33Z
title: "Streams"
tags: [ "streaming", "events", "event-driven architecture", "event-driven architectures", "kafka" ]
description: "How to publish Tyk Streams APIs to your Tyk Developer Portal"
menu:
  main:
    parent: "Tyk Portal Classic"
weight: 12
aliases:
  - /tyk-developer-portal/streams
---

As of Tyk v5.7.0, you can now publish Tyk Streams APIs to the Tyk Developer Portal.

## How To Set Up

Simply create a [Tyk Streams API]({{< ref "product-stack/tyk-streaming/streams-configuration-using-ui#create-a-streams-api" >}}), create a [Policy]({{< ref "getting-started/create-security-policy#create-a-security-policy-with-the-dashboard" >}}) which protects it, and then [publish it to the Developer Portal Catalog]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/getting-started-with-enterprise-portal/publish-api-products-and-plans#part-1---publish-an-api-product" >}}).