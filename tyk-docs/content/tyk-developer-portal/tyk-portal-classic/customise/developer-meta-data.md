---
date: 2017-03-24T17:29:30Z
title: Customize the Developer Signup Form
linktitle: Developer Signup Form
menu:
  main:
    parent: "Customize"
weight: 4 
aliases:
  - /tyk-developer-portal/customise/developer-meta-data/
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

When a developer signs up to your developer Portal, you might wish to capture more information about the developer than is supplied by the default form. To enable new fields in this form (they are automatically added to the form as you add them), go to the **Portal Management > Settings** screen, and edit the **Sign up form customization** section:

{{< img src="/img/dashboard/portal-management/dev_cusomise_2.5.png" alt="Tyk developer portal sign up form customization" >}}

### Developer metadata and keys

All developer metadata is automatically added to the key metadata when a token is generated, this can be useful if you need to add more information to your upstream requests.

A developer username will also automatically be made the alias for an API token so that it is easy to identify in the analytics.
