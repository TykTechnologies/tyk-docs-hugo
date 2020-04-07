---
date: 2017-03-27T12:39:31+01:00
title: Tyk Dashboard Admin API
menu:
  main:
    parent: "Tyk APIs"
weight: 3
url: "/dashboard-admin-api"
---

For Tyk On-Premises installations only, the Dashboard Admin API has two endpoints and is used to set up and provision a Tyk Dashboard instance without the command line.

> **Warning**: In a production environment, you will need to change the default `admin_Secret` value that is called by the `admin-auth` header in your `tyk_analytics.conf` file. This is located in `/opt/tyk-dashboard`.

### Organisations Endpoint

The organisations API endpoint allows an admin to perform the following:

* Create, edit and delete [organisations](/docs/tyk-apis/tyk-dashboard-admin-api/organisations/).
* List Organisations
* [Import](/docs/tyk-apis/tyk-dashboard-admin-api/import/) and [Export](/docs/tyk-apis/tyk-dashboard-admin-api/export/) Organisation configuration objects. This allows an admin to backup and redeploy a Tyk On-Premises installation.

The organisation API endpoint uses a fixed header for auth (`admin-auth`). This is so regular Dashboard users cannot create new organisations using their API keys.

### Users Endpoint

The admin user API endpoint behaves the same way as the regular user's endpoint. However it allows the admin to define an Organisation ID for the end user, whereas the regular endpoint will force Organisation ownership based on the current key's session. See [Users](/docs/tyk-apis/tyk-dashboard-admin-api/users/) for more details.

### Single Sign On (SSO) Endpoint

The Dashboard Admin SSO API endpoint allows you to implement custom authentication schemes for the Dashboard and Portal. Our Tyk Identity Broker (TIB) internally also uses this API. See [Single Sign On](/docs/tyk-apis/tyk-dashboard-admin-api/sso/) for more details.
