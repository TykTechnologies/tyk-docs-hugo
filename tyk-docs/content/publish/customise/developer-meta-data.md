---
date: 2017-03-24T17:29:30Z
title: Developer meta-data
menu:
  main:
    parent: "Customise"
weight: 0 
---

When a developer signs up to your developer Portal, you might wish to capture more information about the developer than is supplied by the default form. The way to enable new fields in this form (they are automatically added to the form as you add them), go to the "Portal Management" -> "Settings" screen, and edit the "Sign up form customisation" section:

![Tyk developer portal sign up form customisation][1]

### Developer meta data and keys

All developer metadata is automatically added to the key metadata when a token is generated, this can be useful if you need to add more information to your upstream requests.

A developer username will also automatically be made the alias for an API token so that it is easy to identify in the analytics.

[1]: /docs/img/dashboard/portal-management/dev_cusomise_2.5.png