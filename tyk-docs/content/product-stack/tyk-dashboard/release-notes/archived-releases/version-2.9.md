---
title: Tyk Dashboard v2.9
tags: ["Tyk", "Release notes", "Dashboard", "v2.9", "2.9"]
aliases:
  - /product-stack/tyk-dashboard/release-notes/old-releases/version-2.9/
---

### TCP Proxying

Tyk now can be used as a reverse proxy for your TCP services. It means that you can put Tyk not only on top of your APIs, but on top of **any** network application, like databases, services using custom protocols and etc.

The main benefit of using Tyk as your TCP proxy is that functionality you used to managed your APIs now can be used for your TCP services as well. Features like load balancing, service discovery, Mutual TLS (both authorization and communication with upstream), certificate pinning: all work exactly the same way as for your HTTP APIs.

See our [TCP Proxy Docs]({{< ref "key-concepts/tcp-proxy" >}}) for more details.

### APIs as Products

With this release we have removed all the barriers on how you can mix and match policies together, providing you with ultimate flexibility for configuring your access rules.

Now a key can have multiple policies, each containing rules for different APIs. In this case each distinct policy will have its own rate limit and quota counters. For example if the first policy gives access to `API1` and second policy to `API2` and `API3`, if you create a key with both policies, your user will have access to all three APIs, where `API1` will have quotas and rate limits defined inside the first policy, and `API2`, `API3` will have shared quotas and rate limits defined inside the second policy.

Additionally you can now mix policies defined for the same API but having different path and methods access rules. For example you can have one policy which allows only access to `/users` and a second policy giving user access to a `/companies` path. If you create a key with both policies, their access rules will be merged, and user will get access to both paths. See [Multiple APIs for single Key Requests]({{< ref "tyk-developer-portal/tyk-portal-classic/portal-concepts#multiple-apis-for-a-single-key-request" >}}).

#### Developer Portal Updates

Developers now can have multiple API keys, and subscribe to multiple catalogs with a single key. Go to the Portal settings and set `Enable subscribing to multiple APIs with single key` option to enable this new flow. When enabled, developers will see the new API generation user interface, which allows users to request access to multiple Catalogs of the **same type** with a single key.

From an implementation point of view, Developer objects now have a `Keys` attribute, which is the map where the key is a `key` and the value is an array of policy IDs. The `Subscriptions` field can be considered as deprecated, with retained backwards compatibility. We have added new set of Developer APIs to manage the keys, similar to the deprecated subscriptions APIs.

Other changes:

- Added two new Portal templates, which are used by a new key request flow `portal/templates/request_multi_key.html`, `portal/templates/request_multi_key_success.html`
- The Portal Catalog list page has been updated to show the Catalog authentication mode
- The API dashboard screen now show keys instead of subscriptions, and if subscribed to multiple policies, it will show the allowance rules for all catalogs.
- The Key request API has been updated to accept an `apply_policies` array instead of `for_plan`

### JWT and OpenID scope support

Now you can set granular permissions on per user basis, by injecting permissions to the "scope" claim of a JSON Web Token. To make it work you need to provide mapping between the scope and policy ID, and thanks to enchanced policy merging capabilities mentioned above, Tyk will read the scope value from the JWT and will generate dynamic access rules. Your JWT scopes can look like `"users:read companies:write"` or similar, it is up to your imagination. OpenID supports it as well, but at the moment only if your OIDC provider can generate ID tokens in JWT format (which is very common this days).

See our [JWT Scope docs]({{< ref "/api-management/authentication-authorization#use-json-web-tokens-jwt" >}}) for more details.

### Go plugins

[Go](https://golang.org/) is an open source programming language that makes it easy to build simple, reliable, and efficient software. The whole Tyk stack is written in Go language, and it is one of the reasons of behind our success.

With this release you now can write native Go plugins for Tyk. Which means extreme flexibility and the best performance without any overhead.

Your plugin can be as simple as:

```{.go}
package main
import (
	"net/http"
)
// AddFooBarHeader adds custom "Foo: Bar" header to the request
func AddFooBarHeader(rw http.ResponseWriter, r *http.Request) {
	r.Header.Add("Foo", "Bar")
}
```

See our [Golang plugin documentation]({{< ref "plugins/supported-languages/golang" >}}) for more details.

### Distributed tracing

We have listened to you, and tracing is recently one of your most common requests. Distributed tracing takes your monitoring and profiling experience to the next level, since you can see the whole request flow, even if it has complex route though multiple services. And inside this flow, you can go deep down into the details like individual middleware execution performance.
At the moment we are offering [OpenTracing](https://opentracing.io/) support, with [Zipkin](https://zipkin.io/) and [Jaeger](https://www.jaegertracing.io/) as supported tracers.

See our [Distributed Tracing documentation]({{< ref "product-stack/tyk-gateway/advanced-configurations/distributed-tracing/open-telemetry/open-telemetry-overview" >}}) for more details.

### HMAC request signing

Now Tyk can sign a request with HMAC, before sending to the upsteam target.

This feature is implemented using [Draft 10](https://tools.ietf.org/html/draft-cavage-http-signatures-10) RFC.

`(request-target)` and all the headers of the request will be used for generating signature string.
If the request doesn't contain a `Date` header, middleware will add one as it is required according to above draft.

A new config option `request_signing` can be added in an API Definition to enable/disable the request signing. It has following format:

```{.json}
"request_signing": {
  "is_enabled": true,
  "secret": "xxxx",
  "key_id": "1",
  "algorithm": "hmac-sha256"
}
```

The following algorithms are supported:

1. `hmac-sha1`
2. `hmac-sha256`
3. `hmac-sha384`
4. `hmac-sha512`

### Simplified Dashboard installation experience

We worked a lot with our clients to build a way nicer on-boarding experience for Tyk. Instead of using the command line, you can just run the Dashboard, and complete a form which will configure your Dashboard. However, we did not forget about our experienced users too, and now provide a CLI enchanced tool for bootstrapping Tyk via a command line.

See our updated [Getting Started]({{< ref "tyk-self-managed/install" >}}) section and [new CLI documentation]({{< ref "tyk-on-premises" >}}).

### DNS Caching

Added a global DNS cache in order to reduce the number of request to a Gateway's local DNS server and the appropriate gateway config section. This feature is turned off by default.

```
"dns_cache": {
    "enabled": true, //Turned off by default
    "ttl": 60, //Time in seconds before the record will be removed from cache
    "multiple_ips_handle_strategy": "pick_first" //A strategy, which will be used when dns query will reply with more than 1 ip address per single host.
},
```

### Python Plugin Improvements

We have completed a massive rewrite of our Python scripting engine in order to simplify the installation and usage of Python scripts. From now on, you no longer need to use a separate Tyk binary for Python plugins. Everything is now bundled to the main binary.
This also means that you can combine JSVM, Python and Coprocess plugins inside the same installation.
In addition you can now use any Python 3.x version. Tyk will automatically detect a supported version and will load the required libraries. If you have multiple Python versions available, you can specify the exact version using `python_version`.

### Importing Custom Keys using the Dashboard API

Previously if you wanted migrate to Tyk and keep existing API keys, you had to use our low level Tyk Gateway API, which has lot of constraints, especially regarding complex setups with multiple organizations and data centers.

We have introduced a new Dashboard API for importing custom keys, which is as simple as `POST /api/keys/{custom_key} {key-payload}`. This new API ensures that Keys from multiple orgs will not intersect, and it also works for multi-data center setups, and even Tyk SaaS.

### Single sign on for the Tyk SaaS

Before SSO was possible only for Tyk On-Premise, since it required access to low-level Dashboard Admin APIs. With 2.9 we have added new a new Dashboard SSO API, which you can use without having super admin access, and it works at the organization level. This means that all our Tyk SaaS users can use 3rd party IDPs to manage Dashboard users and Portal developers.

> **NOTE**: This feature is available by request. Please contact our sales team for details.

See our [Dashboard SSO documentation]({{< ref "tyk-apis/tyk-dashboard-api/sso" >}}) for more details.

### Importing WSDL APIs

WSDL now is a first class citizen at Tyk. You can take your WSDL definition and simply import to the Dashboard, creating a nice boilerplate for your service. See [Import APIs]({{< ref "getting-started/import-apis" >}}) for more details.

### Updated Versions

- Tyk Gateway 2.9.0
- Tyk Dashboard 1.9.0
- Tyk Pump 0.8.0
- Tyk MDCB 1.7.0

### Upgrading From Version 2.8

#### Tyk On-Premises

For this release, you should upgrade your Tyk Pump first.

#### Tyk MDCB

For this release, you should upgrade your MDCB component first.
