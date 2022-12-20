---
date: 2017-03-24T17:29:30Z
title: Customise the Developer Signup Form
linktitle: Developer Signup Form
menu:
  main:
    parent: "Customise"
weight: 4 
aliases:
  - /tyk-developer-portal/customise/developer-meta-data/
---

When a developer signs up to your developer Portal, you might wish to capture more information about the developer than is supplied by the default form. To enable new fields in this form (they are automatically added to the form as you add them), go to the **Portal Management > Settings** screen, and edit the **Sign up form customisation** section:

{{< img src="/img/dashboard/portal-management/dev_cusomise_2.5.png" alt="Tyk developer portal sign up form customisation" >}}

### Developer metadata and keys

All developer metadata is automatically added to the key metadata when a token is generated, this can be useful if you need to add more information to your upstream requests.

A developer username will also automatically be made the alias for an API token so that it is easy to identify in the analytics.
