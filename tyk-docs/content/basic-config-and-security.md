---
title: Basic Configuration and Security
tags: ["Gateway", "Security"]
description: "Methods for securing the Tyk Gateway"
menu:
    main:
        parent: Tyk Gateway
weight: 40
---


This section covers methods for configuring and applying security methods to Tyk. the following subjects are covered:

- [Security]({{< ref "api-management/security-best-practices#securing-apis-with-tyk" >}}). This section includes how to apply security to your Tyk components, your APIs, and security policies.
- [Control and limit traffic]({{< ref "basic-config-and-security/control-limit-traffic" >}}). This section shows you how to apply quotas, rate limits (throttling) and size limits to your APIs.
- [Reduce latency]({{< ref "basic-config-and-security/reduce-latency" >}}). This section describes methods for reducing latency in your Tyk installation.
- [Log traffic]({{< ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/logging-api-traffic" >}}). This section describes how to control the capture of traffic logs for the transactions (API requests and responses) handled by your Tyk Gateways.
- [Gateway events]({{< ref "basic-config-and-security/report-monitor-trigger-events" >}}). This section describes the different types of asynchronous events that Tyk Gateway can generate and how you can register webhooks and other methods to handle them.
