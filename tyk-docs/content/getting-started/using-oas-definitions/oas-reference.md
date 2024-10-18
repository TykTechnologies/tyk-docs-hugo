---
title: "Tyk OAS API Feature Status"
date: 2022-07-13
tags: ["Tyk Tutorials", "Getting Started", "First API", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source", "OAS Reference"]
description: "Tyk OAS API feature status"
menu:
  main:
    parent: "Using OAS API Definitions"
weight: 8
---

Tyk Gateway is extremely flexible with a great many features that you can use to configure and optimize the handling of requests to your APIs. During the [Early Access]({{< ref "developer-support/special-releases-and-features/early-access-features" >}}) phase, we gradually rolled out support for the configuration that is available through Tyk Classic API definitions into the new Tyk OAS API Definition format.

From Tyk Gateway and Dashboard v5.3.0 we have reached feature maturity, however there are still a few features to be added before we reach and surpass feature parity with Tyk Classic API.

In the tables below, *Implemented* means that the feature is available for use with Tyk OAS APIs while using the Tyk Gateway API or Tyk Dashboard API; the *API Designer* column shows the features that can be configured using the Tyk Dashboard UI.

If there's a feature you're looking to use that isn't yet implemented, let us know via our [community forum](https://community.tyk.io/t/oas-has-landed/5605) or your Tyk representative and help us to help you get started with Tyk OAS.


### Management of APIs

| Feature                               | Implemented      | API Designer  |
|---------------------------------------|------------------|---------------|
| API name                              | ✅               | ✅            |
| Status (draft/active)                 | ✅               | ✅            |
| API categories                        | ✅               | ✅            |
| API ID/API URL(s)                     | ✅               | ✅            |
| API ownership                         | ✅               | ✅            |
| API versioning                        | ✅               | ✅            |
| API segment tags                      | ✅               | ✅            |

### Traffic Routing

| Feature                               | Implemented      | Api Designer  |
|---------------------------------------|------------------|---------------|
| Listen path                           | ✅               | ✅            |
| Target URL                            | ✅               | ✅            |
| Upstream load balancing               | ❌️               | ❌️            |
| Uptime tests                          | ❌️               | ❌️            |

### Client to Gateway Authentication and Authorization

| Feature                               | Implemented      | API Designer  |
|---------------------------------------|------------------|---------------|
| Keyless                               | ✅               | ✅            |
| Auth Token                            | ✅               | ✅            |
| JWT                                   | ✅               | ✅            |
| OpenID Connect                        | ✅               | ✅            |
| OAuth 2                               | ✅               | ✅            |
| mTLS                                  | ✅               | ✅            |
| HMAC                                  | ✅               | ✅            |
| Basic authentication                  | ✅               | ✅            |
| Custom authentication plugin          | ✅               | ✅            |
| Multiple authentication               | ✅               | ✅            |
| IP access control                     | ❌️               | ❌️            |
| Client-GW request signing             | ❌️               | ❌️            |
| Access token expiration               | ❌️               | ❌️            |

### Gateway to Upstream Authentication

| Feature                               | Implemented      | API Designer  |
|---------------------------------------|------------------|---------------|
| Upstream certificates (mTLS)          | ✅               | ✅            |
| Public Key certificate pinning        | ✅               | ✅            |
| GW-Upstream request signing           | ❌️               | ❌️            |

### API-level (Global) Features

| Feature                               | Implemented      | API Designer  |
|---------------------------------------|------------------|---------------|
| Custom config data                    | ✅               | ✅            |
| Context variables                     | ✅               | ✅            |
| CORS                                  | ✅               | ✅            |
| Service discovery                     | ✅               | ✅            |
| Internal API (not exposed by Gateway) | ✅               | ✅            |
| Header Transform (API-level)          | ✅               | ✅            |
| API-level Rate Limit                  | ✅               | ✅            |
| Plugin Bundles                        | ✅               | ✅            |
| Custom request plugins (pre/preAuth/post) | ✅               | ✅            |
| Custom response plugin                    | ✅               | ✅            |
| Batch requests                        | ❌️               | ❌️            |
| Request size limit (API-level)        | ❌️               | ❌️            |
| Event handling: webhooks              | ✅               | ✅            |
| Event handling: custom handlers       | ❌️               | ❌️            |
| Preserve host header                  | ❌️               | ❌️            |

### Traffic Logs

| Feature                               | Implemented      | API Designer  |
|---------------------------------------|------------------|---------------|
| Detailed recording (in Log Browser)   | ✅               | ✅            |
| Traffic log custom tags               | ❌️               | ❌️            |
| Set traffic log expiry                | ❌️               | ❌️            |
| Do not track (API-level)              | ✅               | ✅            |
| Custom Analytics Plugin               | ❌️               | ❌️            |


### Endpoint-level Features

| Feature                               | Implemented      | API Designer  |
|---------------------------------------|------------------|---------------|
| Allow                                 | ✅               | ✅            |
| Block                                 | ✅               | ✅            |
| Cache                                 | ✅               | ✅            |
| Circuit breaker                       | ✅               | ✅            |
| Track endpoint                        | ✅               | ✅            |
| Do not track                          | ✅               | ✅            |
| Enforced timeout                      | ✅               | ✅            |
| Ignore authentication                 | ✅               | ✅            |
| Internal endpoint (not exposed by Gateway) | ✅               | ✅            |
| URL rewrite                           | ✅               | ✅            |
| Validate request                      | ✅               | ✅            |
| Request size limit                    | ✅               | ✅            |
| Request method transform              | ✅               | ✅            |
| Request header transform              | ✅               | ✅            |
| Request body transform                | ✅               | ✅            |
| Response header transform             | ✅               | ✅            |
| Response body transform               | ✅               | ✅            |
| Mock response                         | ✅               | ✅            |
| Virtual endpoint                      | ✅               | ✅            |
