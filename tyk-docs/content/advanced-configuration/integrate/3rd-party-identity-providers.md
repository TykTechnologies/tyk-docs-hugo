---
date: 2017-03-24T16:56:58Z
title: 3rd Party Identity Providers
menu:
  main:
    parent: "Integration Options"
weight: 0
aliases:
  - /integrate/3rd-party-identity-providers/
---

## Dashboard SSO API
The Dashboard exposes a special API to implement custom authentications for the Dashboard and Portal. See the [Dashboard Admin API]({{< ref "tyk-apis/tyk-dashboard-admin-api/sso" >}}) for more details.

You can use the `sso_permission_defaults` dashboard configuration option to configure the permissions of users created via SSO API. See the SSO API docs above.

In addition you can set custom login pages for the dashboard and portal using `sso_custom_login_url` and `sso_custom_portal_login_url` dashboard configuration options.

## Tyk Identity Broker (TIB) Overview 

### What is the Tyk Identity Broker?

The Tyk Identity Broker (TIB) provides a service-level component that enables delegated identities to be authorised and provide authenticated access to various Tyk components such as the Tyk Dashboard, the Tyk Developer Portal and Tyk Gateway API flows such as OAuth access tokens and regular API tokens.

Internally the TIB uses the Dashboard SSO API mentioned above.

Starting from Tyk v3.0 the Tyk Identity Broker has been added as a built-in feature of the Tyk Dashboard. Users will no longer need to set up a separated instance of the service to make it work with Dashboard. However this is not mandatory and users still can set the configs to connect to an external TIB. 

For more information on using TIB internally or configuring it externally, see the documentation for [Tyk Identity Broker (TIB)]({{< ref "tyk-identity-broker" >}}).
