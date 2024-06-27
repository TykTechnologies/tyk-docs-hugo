---
title: Tyk Dashboard v2.8
tags: ["Tyk", "Release notes", "Dashboard", "v2.8", "2.8"]
aliases:
  - /product-stack/tyk-dashboard/release-notes/old-releases/version-2.8/
---

## Debugger

You can now safely test all API changes without publishing them, and visually see the whole request flow, including which plugins are running and even their individual logs.

We have added a new `Debugging` tab in the API designer which provides a "Postman" like HTTP client interface to simulate queries for the current API definition being edited.

You can even debug your virtual endpoints by dynamically modifying the code, sending the request via `Debugger` and watching the virtual endpoint plugin logs.

See [Debugging Tab]({{< ref "advanced-configuration/transform-traffic/endpoint-designer#debugging" >}}) for more information.

---

## Developer portal oAuth support

The Developer portal now fully supports exposing oAuth2 APIs:

*  Developers can register their oAuth clients and see analytics
*  Administrators can see list of oAuth clients from a developer screen

---

## Multi-organisation users

NOTE: Currently only available with >2 node Dashboard license.

You can now create users with the same email address in different organisations. Users will then be able to select an organisation 
when logging in, and can easily switch between organisations via the navigation menu. To enable set 
`"enable_multi_org_users": true`.

---

## Developer management improvements

* You can now manually create developer subscriptions from the developer screen.
* We've added a quick way to change a subscription policy and reset a quota
* All actions on the developer screen now only require developer permissions 

## Dashboard Audit Log improvements

There is a [new section]({{< ref "product-stack/tyk-dashboard/advanced-configurations/analytics/audit-log" >}}) in the Tyk Dashboard config file where you can specify parameters for the audit log (containing audit records for all requests made to all endpoints under the `/api` route).

---


## Detailed changelog

- Added API Debugger tab to the API Designer.
- Extended the Portal templating functionality.
- Similar to the Gateway, you now can specify a list of acceptable TLS ciphers using the  
  `http_server_options.cipher_suites` array option.
- Audit log improvements
- Exposing oAuth2 APIs to developer portal
- Allow for the retrieval of an API via it's external API
- Allow updating keys by hash
- Added support for `SMTP` noauth.
