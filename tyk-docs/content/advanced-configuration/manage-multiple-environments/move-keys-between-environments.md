---
date: 2017-03-24T12:29:23Z
title: Move Keys Between Environments
menu:
  main:
    parent: "Manage Multiple Environments"
weight: 5 
---

Tyk currently does not have a facility to export a group of keys from one environment and reissue them in another and still be able to manage those keys from within the Dashboard.

However, it is possible to temporarily allow access to existing keys in a new environment, but it should be noted that these keys should eventually be expired and re-generated within the new environment.

### Moving Keys Between Environments / Creating Custom Keys

In order to use a legacy key in a new environment, simply extract the key from the old environment using the Tyk REST APIs and then create them in the new environment using the custom key creation API.

To create a key with a custom identifier, ie Token, simply use the [Gateway (OSS)](/tyk-gateway-api/) or [Dashboard's (Pro)](/tyk-apis/tyk-dashboard-api/api-keys/#create-a-custom-key) REST APIs to import a custom key.
