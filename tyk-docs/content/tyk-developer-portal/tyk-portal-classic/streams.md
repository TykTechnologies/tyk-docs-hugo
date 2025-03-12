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
robots: "noindex"
algolia:
  importance: 0
---

{{< warning success >}}

**Attention:**

You’ve reached a page related to the *Tyk Classic Portal*. If you were searching for *API documentation of the new Tyk
Developer Portal* please use the latest
[Postman collection]({{< ref "/product-stack/tyk-enterprise-developer-portal/api-documentation/tyk-edp-api" >}}) page.
</br>
</br>
**Future deprecation of Tyk Classic Portal**

This product is no longer actively developed as it
has been superseded by the new [Tyk Developer Portal]({{< ref "portal/overview" >}}).
</br>
Please note that the Tyk Classic Portal now has limited support and maintenance. Please contact us at
[support@tyk.io](<mailto:support@tyk.io?subject=Tyk classic developer portal>)if you have any questions.

{{< /warning >}}

As of Tyk v5.7.0, you can now publish Tyk Streams APIs to the Tyk Developer Portal.

## How To Set Up

Simply create a [Tyk Streams API]({{< ref "api-management/event-driven-apis#create-a-streams-api" >}}), create a [Policy]({{< ref "api-management/gateway-config-managing-classic#create-a-security-policy-with-the-dashboard" >}}) which protects it, and then [publish it to the Developer Portal Catalog]({{< ref "portal/overview#publish-an-api-product" >}}).