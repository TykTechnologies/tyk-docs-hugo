---
date: 2017-03-24T09:58:52Z
title: Tyk Dashboard v2.4
tags: ["Tyk", "Release notes", "Dashboard", "v2.4", "2.4"]
aliases:
    - /product-stack/tyk-dashboard/release-notes/old-releases/version-2.4/
---
 
## New in this release:

This release touch all our products and brings you numerous long awaited features and fixes. 
Here are the packages and their versions we are releasing today: Tyk Gateway v2.4.0, Tyk Dashboard v1.4.0, Tyk Pump v0.4.2, MDCB v1.4.0, TIB v0.2.

## <a name="major-highlights"></a>Major highlights

### Mutual TLS

A major feature of this release is the implementation of Mutual TLS. Now you can protect your APIs by allow listing certificates, idenitfy users based on them, and increase security between Tyk and upstream API. For details, see [Mutual TLS]({{< ref "basic-config-and-security/security/mutual-tls" >}}).


### Extended use of Multiple Policies

We have extended support for partitioned policies, and you can now mix them up when creating a key. Each policy should have own partition, and will not intersect, to avoid conflicts while merging their rules. 

Using this approach could be useful when you have lot of APIs and multiple subscription options. Before, you had to create a separate policy per API and subscription option. 

Using multiple partitioned policies you can create basic building blocks separately for accessing rules, rate limits and policies, and then mix them for the key, to creating unique combination that fit your needs. 

We have added a new `apply_policies` field to the Key definition, which is an string array of Policy IDs. 
> **NOTE**: The old key apply_policy_id is supported, but is now deprecated.

We have updated the Dashboard **Apply Policies** section of the **Add Key** section.

{{< img src="/img/release-notes/apply_policy.png" alt="apply-policy" >}}

For this release multiple policies are only supported only via the Add Key section and via the API. Support for OIDC, oAuth, and Portal API Catalogs are planned for subsequent releases.

[Docs]({{< ref "basic-config-and-security/security/security-policies/partitioned-policies" >}})

### <a name="global-api"></a>Global API Rate Limits

We have added a new API definition field `global_rate_limit` which specifies a global API rate limit in the following format: `{"rate": 10, "per": 1}`, similar to policies or keys. 

The API rate limit is an aggregate value across all users, which works in parallel with user rate limits, but has higher priority.

Extended Dashboard API designer Rate Limiting and Quotas section in Core settings:

{{< img src="/img/release-notes/rate_limits.png" alt="rate-limits" >}}

[Docs]({{< ref "basic-config-and-security/security/security-policies/partitioned-policies" >}})

### Specify custom analytics tags using HTTP headers

We have added a new API definition field `tag_headers` which specifies a string array of HTTP headers which can be extracted and turned to tags. 

For example if you include `X-Request-ID` header to tag_headers, for each incoming request it will include a `x-request-id-<header_value>` tag to request an analytic record.

This functionality can be useful if you need to pass additional information from the request to the analytics, without enabling detailed logging, which records the full request and response objects.

We have added a new **Tag headers** section to the Dashboard **API Designer Advanced** tab.

{{< img src="/img/release-notes/tag_headers.png" alt="tag_headers" >}}

[Docs]({{< ref "tyk-stack/tyk-manager/analytics/log-browser" >}})

### <a name="sso"></a>Single-Sign-On (SSO) improvements

More SSO functionality is something that a lot of our customers have been asking for. In this release we've significantly improved our support for SSO, and you can now:

* Enable Tyk Identity Broker to apply LDAP filters to user search [Docs]({{< ref "advanced-configuration/integrate/3rd-party-identity-providers/ldap" >}})
* Set permissions for your users, logged via SSO, via `sso_permission_defaults` in Dashboard config file. [Docs]({{< ref "advanced-configuration/integrate/3rd-party-identity-providers" >}})
* Setup a login page redirect, using `sso_custom_login_url` and `sso_custom_portal_login_url` Dashboard config options to enable users login using a custom SSO login page. [Docs]({{< ref "advanced-configuration/integrate/3rd-party-identity-providers" >}})
* For those who love to build everything in-house, we have added new API for custom dashboard authentication integrations. [Docs]({{< ref "advanced-configuration/integrate/3rd-party-identity-providers/custom" >}})

## Moar!
This release is packed with way more more cool stuff. Here are detailed release notes for each product:

### <a name="gateway"></a>Tyk Gateway v2.4.0

#### Mutual TLS support
[Docs]({{< ref "basic-config-and-security/security/mutual-tls" >}})

#### Global API rate limits
[Docs]({{< ref "basic-config-and-security/control-limit-traffic/rate-limiting" >}})

#### Specify custom analytics tags using HTTP headers
[Docs]({{< ref "tyk-stack/tyk-manager/analytics/log-browser" >}})

#### Attaching Multiple Policies to the Keys
[Docs]({{< ref "basic-config-and-security/security/security-policies/partitioned-policies" >}})

#### Default User Agent set to Tyk/$VERSION
If no user agent is specified in a request, it is now set as `Tyk/$VERSION`.

#### Include `x-tyk-api-expires` date header for versioned APIs
If a request is made for an API which has an expiry date, the response will include the `x-tyk-api-expires` header with expiry date. 

[Docs]({{< ref "getting-started/key-concepts/versioning" >}})

#### Run Admin Control API on a separate port
Using `control_api_port` option in configuration file, you can run the admin control api on a separate port, and hide it behind firewall if needed.

[Docs]({{< ref "tyk-oss-gateway/configuration#control_api_port" >}})

#### Added a Configuration Linter

We have added a new `tyk lint ` command which will validate your `tyk.conf` file and validate it for syntax correctness, misspelled attribute names or format of values. The Syntax can be:

`tyk lint` or `tyk --conf=path lint`

If `--conf` is not used, the first of the following paths to exist is used:

`./tyk.conf`
`/etc/tyk/tyk.conf`

[Docs]({{< ref "tyk-oss-gateway/configuration" >}})

#### Set log_level from tyk.conf

We have added a new `log_level` configuration variable to `tyk.conf` to control logging level.

Possible values are: `debug`, `info`, `warn`, `error`

[Docs]({{< ref "tyk-oss-gateway/configuration#log_level" >}})

#### Added jsonMarshal to body transform templates

We have added the `jsonMarshal` helper to the body transform templates. You can apply jsonMarshal on a string in order to perform JSON style character escaping, and on complex objects to serialise them to a JSON string.

Example: `{{ .myField | jsonMarshal }}`

[Docs]({{< ref "transform-traffic/request-body" >}})

#### Added a blocking reload endpoint

Now you can add a `?block=true` argument to the `/tyk/reload` API endpoint, which will block a response, until the reload is performed. This can be useful in scripting environments like CI/CD workflows.

[Docs]({{< ref "tyk-gateway-api" >}})

#### `tyk_js_path` file now contains only user code

Internal JS API not budled into tyk binary, and `js/tyk.js` file used only for custom user code. It is recommended to delete this file, if you are not using it, or remove Tyk internal code from it. New releases do not ship this file by default.

#### Improved Swagger API import defaults

When importing Swagger based APIs they now generate tracked URLs instead of allow listed ones.

[More](https://github.com/TykTechnologies/tyk/issues/643)

#### Respond with 503 if all hosts are down.
Previously, the internal load balancer was cycling though hosts even if they were known as down.

#### Request with OPTIONS method should not be cached.
[More](https://github.com/TykTechnologies/tyk/issues/376)

#### Health check API is officially deprecated.
This was very resource consuming and unstable feature. We recommend using load balancers of your choice for this.

#### Fixed custom error templates for authentication errors.
[More](https://github.com/TykTechnologies/tyk/issues/438)


### <a name="dashboard"></a>Tyk Dashboard v1.4.0

#### Mutual TLS support
[Docs]({{< ref "basic-config-and-security/security/mutual-tls" >}})

#### Global API rate limits
[Docs]({{< ref "basic-config-and-security/control-limit-traffic/rate-limiting" >}})

#### Specify custom analytics tags using HTTP headers
[Docs]({{< ref "tyk-stack/tyk-manager/analytics/log-browser" >}})

#### Attaching Multiple Policies to the Keys
[Docs]({{< ref "basic-config-and-security/security/security-policies/partitioned-policies" >}})

#### Set permissions for users logged via SSO (Tyk Identity Broker)
Added new option `sso_permission_defaults` in Dashboard config file. 
Example:

```
"sso_permission_defaults": {
  "analytics": "read",
  "apis": "write",
  "hooks": "write",
  "idm": "write",
  "keys": "write",
  "policy": "write",
  "portal": "write",
  "system": "write",
  "users": "write"
},
```
[Docs]({{< ref "advanced-configuration/integrate/3rd-party-identity-providers" >}})

#### Set custom login pages for portal and dashboard
If you are using 3-rd party authentification like TIB, you maybe want to redirect from standard login pages to your own using following attributes in dashboard config: `sso_custom_login_url`, `sso_custom_portal_login_url`.

[Docs]({{< ref "advanced-configuration/integrate/3rd-party-identity-providers" >}})

#### Added new set of APIs for custom dashboard authentification
Added new `/admin/sso` endpoint for custom integration. In fact, the same API is used by our own Tyk Identity Broker. 

[Docs]({{< ref "advanced-configuration/integrate/3rd-party-identity-providers/custom" >}})


#### Service discovery form improved with most common pre-defined templates

Now you can pre-fill the form with most popular templates like consul or etcd.

#### RPC credentials renamed to Organization ID
Yay!

#### Replaced text areas with a code editors

All multi-line text fields now replaced with a code editors.

#### Replace dropdowns with the live search component

All the dropdown lists now support live search, and work with a large number of elements (especially handy for API or Policiy lists).

#### Display user ID and email on when listing users

The **Users list** now displays the **User ID** and **Email**.

#### Added search for portal developers

We have added search for the users listed in the developer portal.

#### Key request email link to developer details

The email address in a **Key Request** from the **Developer Portal** is now a link to the relevant developer profile.

#### Country code in log browser links to geo report

The country code in the log browser has been changed to a link to the geographic report.

#### Added support for HEAD methods in the Dashboard API Designer.

#### Redirect user to the login page if session is timed out.

#### When creating a portal API catalog, you can now attach documentation without saving the catalog first.

#### Fixed the` proxy.preserve_host_header` field when saved via the UI.
Previously, the field was available in the API definition, but got removed if the API was saved via the UI.

#### Fixed the port removal in service discovery properties.
https://github.com/TykTechnologies/tyk-analytics-ui/issues/12

#### Prevent an admin user revoking their own permissions.
This is a  UI only fix, it is still allowable via the API (which is OK).

#### Other UX Improvements

* Key pieces of data made accessible to quickly copy+paste
* Improved help tips
* Get your API URL without having to save and go back
* Improved pagination
* Improved feedback messaging
* Improved charts
* Improved analytics search

## <a name="pump"></a> Tyk Pump v0.4.2

#### Support added for Mongo SSL connections

See https://tyk.io/docs/configure/tyk-pump-configuration/ for a sample pump.conf file.

### <a name="mdcb"></a> MDCB v1.4.0
Added support for Mutual TLS, mentioned by Gateway and Dashboard above. See [Docs]({{< ref "basic-config-and-security/security/mutual-tls#how-tyk-supports-mutual-tls" >}})
  
Also fixed bug when Mongo connections became growing though the roof if client with wrong credentials tries to connect.


### <a name="tib"></a>TIB v0.2
  
Tyk Identity Broker now fully support LDAP search with complex filters! [Docs]({{< ref "advanced-configuration/integrate/3rd-party-identity-providers/ldap" >}})

### <a name="upgrade"></a>Upgrading all new Components

> **NOTE**: This release is fully compatible with the previous version, except that if you want to use new features, like Mutual TLS, you need to upgrade all the related components.

Cloud users will be automatically upgraded to the new release.

Hybrid users should follow the upgrade instructions [here]({{< ref "upgrading-tyk#upgrade-guides-toc" >}}).

Self-Managed users can download the new release packages from their usual repositories.

[3]: /img/release-notes/tag_headers.png
[4]: /img/release-notes/import_api_definition.png
[5]: /img/release-notes/live_search.png
[6]: /img/release-notes/user_list.png
[7]: /img/release-notes/dev_list.png
[8]: /img/release-notes/key_request_user.png

