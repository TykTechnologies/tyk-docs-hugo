---
date: 2017-03-23T15:16:58Z
title: Gateway
tags: ["Gateway", "Security"]
description: "How to secure your Tyk Gateway" 
menu:
  main:
    parent: "Security"
weight: 4
url: "/basic-config-and-security/security/gateway"
---

The Tyk Gateway is the main component that will be internet-facing in your installation since it manages the traffic through to your services. The Gateway has a command and control API that must be secured, using a [shared secret]({{< ref "planning-for-production/#change-all-the-shared-secrets" >}}).

Although the Gateway has an API, it is recommended to integrate with the Dashboard API as this is more secure and more granular.

[What is the Tyk Gateway?]({{< ref "getting-started/tyk-components/gateway/" >}})