---
date: 2017-03-27T19:23:24+01:00
title: “Not Found” error in the Developer Portal
menu:
  main:
    parent: "Tyk Dashboard Troubleshooting"
weight: 5 
aliases:
  - /troubleshooting/tyk-dashboard/not-found-error-deve...
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

When you attempt to access the Developer Portal (`https://xxxxxx:3000/portal`), you receive a `Not Found` error message

### Cause

The portal may not have been configured or may have been set up with the wrong domain name.

### Solution

You should make sure that your portal has been configured to use the correct domain name in your `tyk_analytics.conf`. Once this change has been made you may need to restart the Dashboard process so as to avoid having to reconfigure the Gateway as well.

You should also look at the [portal tutorial]({{< ref "getting-started/tutorials/publish-api" >}}) for creating an API and publishing it to your Portal.
