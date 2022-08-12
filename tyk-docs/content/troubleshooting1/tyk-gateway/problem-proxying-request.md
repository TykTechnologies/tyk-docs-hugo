---
date: 2017-03-27T17:30:49+01:00
title: “There was a problem proxying the request“
menu:
  main:
    parent: "Tyk Gateway Troubleshooting"
weight: 5 
---

### Description

Users receive the aforementioned response when making API calls.

### Cause

The upstream server may have returned an empty response or cut the response off early so it was unable to complete the proxying process. A proxy error means actual connectivity issues between Tyk and the target host (i.e., a connection-level issue with the downstream server misbehaving for some reason).

Expired TLS certificates may also cause issues.

### Solution

Users are advised to upgrade to the latest versions of any Tyk packages at their earliest convenience as a patch was released to resolve this issue. Packages are available to download from [Packagecloud.io][1]. See [Upgrading Tyk](https://tyk.io/docs/upgrading-tyk/) for details on upgrading to the latest version. It may also be worth checking if any TLS certificates associated with the domain have expired.

 [1]: https://packagecloud.io/tyk
