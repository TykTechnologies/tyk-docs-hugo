---
date: 2017-03-24T16:39:31Z
title: Integration Options
weight: 3
menu: 
  main:
    parent: "Advanced Configuration"
---

Tyk has multiple integration options with third parties, and these integrations can occur in a few places:

* For plugins - Within the Gateway itself using Dynamic JS Middleware (Multi-Cloud or Tyk Self-Managed only)
* For API Auth mode and Tyk's platform login - Externally to the gateway using a broker (The Tyk Identity Broker) (Tyk Self-Managed only)
* For API Auth mode - Built-in federation support via JSON Web Tokens or Open ID Connect (Cloud, Multi-Cloud and On-Premises)

All three of the above have different and unique use cases and can be deployed differently depending on your platform and integration requirements.
