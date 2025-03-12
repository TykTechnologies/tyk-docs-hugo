---
date: 2017-03-27T19:26:54+01:00
title: Receive a CSRF error in the Developer Portal
menu:
  main:
    parent: "Tyk Dashboard Troubleshooting"
weight: 5
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

### Description

When the user attempts to log into the Developer Portal a CSRF error (or some variant of this error such as `Forbidden - CSRF token invalid`) is displayed on the page.

### Cause

Most probably the portal has yet to be activated. Common reasons for this are:

1.  The `CNAME` was not set in the dashboard. Without a `CNAME`, the system won't react to a new domain name.
2.  There were no active APIs set up under the account which means that the account was not active for a portal either and essentially incapable of proxying traffic.

The use of an incorrect signup form can also cause this issue.

### Solution

Users must make sure that they add a `CNAME` and an active API to the Dashboard. If the form will require TLS, the user will need to set this up for their custom load balancer. To add this to a cloud instance, a copy of the TLS certificate and the private key file will need to be sent to Tyk Support.