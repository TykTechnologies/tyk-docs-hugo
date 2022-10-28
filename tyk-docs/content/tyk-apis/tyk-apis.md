---
title: Tyk APIs
weight: 190
menu: none
url: "/tyk-apis"
---

Tyk's own APIs allow you to access to the following

## [Tyk Gateway API](/docs/tyk-gateway-api/)

This API is very small, and has no granular permissions system. It is used purely for internal automation and integration. It offers the following endpoints:

* Managing session objects (key generation)
* Managing and listing API Definitions (only when not using the Dashboard)
* Hot reloads / reloading a cluster configuration
* OAuth client creation (only when not using the Dashboard)

Our Gateway API is available as a [Postman Collection](#tyk-postman-collections) that you can use to test our Gateway endpoints.

## [Tyk Dashboard API](/docs/tyk-dashboard-api/)

The Tyk Dashboard API allows much more fine-grained, secure and multi-user access to your Tyk cluster, and should be used to manage a database-backed Tyk node. The Tyk Dashboard API works seamlessly with the Tyk Dashboard (the two come bundled together).

Our Dashboard API is available as a [Postman Collection](#tyk-postman-collections) that you can use to test our Dashboard endpoints.

## [Tyk Dashboard Admin API](/docs/dashboard-admin-api/)

The Dashboard Admin API is a special bootstrapping API that can be used to set up and provision a Tyk Dashboard instance without the command line and is used by the bootstrap scripts that come with a Tyk On-Premises installation.

## [Tyk Portal API](/docs/tyk-portal-api/)

The Tyk Portal API covers all available endpoints for your developer portal.

## Tyk Postman Collections

We have a Postman public workspace where you can view, fork and test our Gateway and Dashboard APIs.


{{< button_left href="https://www.postman.com/tyk-technologies/workspace/379673ec-4cc5-4b8e-bef5-8a6a988071cb/overview" target="_blank" color="green" content="Tyk Postman Collections">}}