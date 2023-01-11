---
date: 2017-03-23T14:58:20Z
title: Dashboard Admin API
tags: ["Dashboard", "Admin API"]
description: "What the Tyk Dashboard Admin APi is used for" 
menu:
  main:
    parent: "Dashboard"
weight: 7 
---

## What is the Dashboard Admin API?

The Dashboard Admin API provides functions for:

* Creating an Organisation
* Modifying an Organisation
* Creating a User

These functions are designed to bootstrap a new API Dashboard installation with a base organisation and a base User for that organisation.

This API should not be used for anything else except for the above purposes.

The Admin API is secured using a shared secret, this secret is set in the `tyk_analytics.conf` file.

The Admin API requires a header called admin-auth to be included to differentiate the call from a regular API call.

