---
title: Open (No Authentication)
description: ""
tags: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Mutual TLS", "mTLS", "Client mTLS"]
keywords: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Mutual TLS", "mTLS", "Client mTLS"]
aliases:
---

Open or keyless authentication allows access to APIs without any authentication. This method is suitable for public APIs where access control is not required.

Tyk OAS APIs are inherently "open" unless authentication is configured, however the older Tyk Classic API applies [auth token]({{< ref "api-management/authentication/bearer-token" >}}) protection by default.

You can disable authentication for a Tyk Classic API by setting the `use_keyless` flag in the API definition.


