---
title: Open (No Authentication)
description: "How to configure open or keyless authentication in Tyk."
tags: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Open Authentication", "Keyless Authentication"]
keywords: ["Authentication", "Authorization", "Tyk Authentication", "Tyk Authorization", "Open Authentication", "Keyless Authentication"]
aliases:
---

Open or keyless authentication allows access to APIs without any authentication. This method is suitable for public APIs where access control is not required.

Tyk OAS APIs are inherently "open" unless authentication is configured, however the older Tyk Classic API applies [auth token]({{< ref "api-management/authentication/bearer-token" >}}) protection by default.

You can disable authentication for a Tyk Classic API by setting the `use_keyless` flag in the API definition.


