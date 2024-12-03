---
date: 2017-03-24T09:58:52Z
title: Tyk Dashboard v2.5
tags: ["Tyk", "Release notes", "Dashboard", "v2.5", "2.5"]
aliases:
  - /product-stack/tyk-dashboard/release-notes/old-releases/version-2.5/
---

## <a name="new"></a>New in this Release:

This release touches all our products and brings you numerous features and fixes. Here are the packages and their versions we are releasing today: Tyk Gateway v2.5.0, Tyk Dashboard v1.5.0, Tyk Pump v0.6.0, MDCB v1.5.0, TIB v0.3.


## <a name="major-highlights"></a>Major Highlights

### <a name="dashboard"></a>New Dashboard Look and Feel

Our Dashboard has had a UI overhaul, with the following improvements:

* A more modern, fun look and feel
* Consistent layouts and action buttons across each section
* Better feedback on errors and updates
* Various UX improvements

### <a name="sso"></a>SSO with OpenId Identity Providers

With TIB v0.3 we have made it possible to integrate any OpenID supported Identity provider with Tyk so you can configure Single Sign On (SSO), if the provider supports those.

### <a name="search"></a>Searching API and Policies List

This long awaited feature has been added on the Dashboard UI.

### <a name="versioning"></a>Default API Versioning

You can now specify a default API version when using a versioning strategy.

### <a name="pump"></a>Tyk Pump with MDCB

We've added MDCB support in this release of Tyk Pump

## Moar!
This release is packed with way more more cool stuff. Here are detailed release notes for each product:

### <a name="gateway"></a>Tyk Gateway v2.5.0

#### New Relic Instrumentation Support

We have added support for New Relic Instrumentation using:

`"newrelic": {"app_name": "<app-id>", "license_key": "<key>"}`

[Docs]({{< ref "basic-config-and-security/report-monitor-trigger-events/instrumentation" >}})

#### Default API Versioning

You can now specify a default API version, and it will be used if a version is not set via headers, or URL parameters. Use the new option:

`spec.version_data.default_version`

[Docs]({{< ref "getting-started/key-concepts/versioning" >}})

#### Disable URL Encoding

You can disable URL encoding using a new boolean `http_server_options` setting:
 
`skip_target_path_escaping`

[Docs]({{< ref "tyk-oss-gateway/configuration#http_server_options" >}})

#### Enable Key Logging

By default all key ids in logs are hidden. You can now turn it on if you want to see them for debugging reasons using the `enable_key_logging` option.

[Docs]({{< ref "tyk-oss-gateway/configuration#enable_key_logging" >}})


#### Specify TLS Cipher Suites

We have added support for specifying allowed  SSL ciphers using the following option:

`http_server_options - ssl_ciphers`

[Docs]({{< ref "basic-config-and-security/security/tls-and-ssl" >}})

### <a name="plugins"></a>Plugins Updates

* Coprocess plugins now have access to `config_data`
* The JSVM `spec` object now has access to `APIID` and `OriginID` to reflect similar functionality of Coprocess plugins.
* Plugins now have access to Host HTTP Header.

[JSVM Docs]({{< ref "plugins/supported-languages/javascript-middleware/middleware-scripting-guide" >}})
[Plugin Data Structure Docs]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-data-structures" >}})


### <a name="dashboard"></a>Tyk Dashboard v1.5.0

#### A Fresh Look and Feel

With this release we have refreshed the entire Dashboard UI with a new look-and-feel, bringing with it such improvements as:

* A more modern, fun look and feel
* Consistent layouts and action buttons across each section
* Better feedback on errors and updates
* UX improvements

#### Search on API and Policy List Pages

We have added API and Policy search functionality, which should help those with long lists.

* [API Docs]({{< ref "tyk-apis/tyk-dashboard-api/api-definitions" >}})
* [Policy Docs]({{< ref "tyk-apis/tyk-dashboard-api/portal-policies" >}})

#### A New, Interactive Getting Started Walkthrough

We have swapped out the old Getting started tutorial and added a new interactive one, which should make it easier for new users to get started with the Dashboard UI.

#### Advanced URL Rewrites

We have extended the URL Rewrite plugin functionality by enabling users to create more advanced rewrite rules based on Header matches, Query string variable/value matches, Path part matches, (i.e. components of the path itself), Session metadata values, and Payload matches.

[Docs]({{< ref "transform-traffic/url-rewriting" >}})

#### Portal Session Lifetime

You can now control the portal session lifetime using the `portal_session_lifetime` config variable.

[Docs](https://tyk.io/docs/configure/tyk-dashboard-configuration-options/)

#### Configure Port for WebSockets

We have added `notifications_listen_port` option to configure the port used by WebSockets for real-time notifications.

[Docs]({{< ref "tyk-oss-gateway/configuration" >}})

#### Slug

Once set, the API slug will no longer be overridden when the API title is changed.

#### Custom Domain

We have fixed the API URL if a custom domain is set.


### <a name="pump"></a> Tyk Pump v0.5.0

#### Splunk Support

We added support for forwarding analytics data to Splunk. A sample configuration is:

```
"pumps": {
  "splunk": {
    "name": "splunk",
    "meta": {
      "collector_token": "<secret>",
      "collector_url": "https://<your-id>.cloud.splunk.com:
                    8088",
        "ssl_insecure_skip_verify": true
    }
  }
},
```

#### <a name="analytics"></a>Analytics Collection Capping

Detailed analytics collection capping is now enabled by default and configurable via the `collection_cap_enable` and `collection_cap_max_size_bytes` options.



### <a name="mdcb"></a> MDCB v1.5.0

We've introduced long awaited support for using Tyk Pump in conjunction with MDCB to use any of services supported by Tyk Pump, like ElasticSearch, Splunk and etc. This works by setting `forward_analytics_to_pump` to true, which disables analytics processing by MDCB itself, and enables the forwarding of all data to Tyk Pump running inside your management environment.


### <a name="tib"></a>TIB v0.3
  
With this release, you now can use any OpenID Connect compatible provider with TIB. This means that you can use almost any Identity management solution, supporting OpenID, like Okta, Ping or Keycloak.
 
Use `SocialProvider` with the following options:

```
"UseProviders": [{
  "Name": "openid-connect",
  "Key": "CLIENT-KEY",
  "Secret": "CLIENT-SECRET",
  "DiscoverURL": "https://<oidc-domain>/.well-known/openidconfiguration"
}]
```

### Packaging changes across all products

New deb and rpm packages add the "tyk" user and group so that package files and directories would be owned by it and the process run with its effective uid and gid. In addition to this gateway PID now has to reside in its own sub-rundir due to this change, so that's created (and additionally managed by systemd where it's available), default pidfile location changed appropriately so that upgrade wouldn't require any config changes by the users. The gateway config file is now only readable and writable by the "tyk" user and group. This change is applied across all our products except Gateway: its changes scheduled to 2.6. 

The "default" init system files are not removed on upgrade/remove anymore so that it's now a way for users to run the respective process with custom environment variables.

The bug with removal of init system files on upgrade in rpm-based systems is now fixed.


### <a name="upgrade"></a>Upgrading all new Components

For details on upgrading all Tyk versions, see [Upgrading Tyk](https://tyk.io/docs/upgrading-tyk/).

### <a name="new"></a>Don't Have Tyk Yet?

Get started now, for free, or contact us with any questions.

* [Get Started](https://tyk.io/pricing/compare-api-management-platforms/#get-started)
* [Contact Us](https://tyk.io/about/contact/)