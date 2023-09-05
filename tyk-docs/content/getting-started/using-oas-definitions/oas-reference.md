---
title: "OAS Reference"
date: 2022-07-13
tags: ["Tyk Tutorials", "Getting Started", "First API", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source", "OAS Reference"]
description: "OAS glossary of terms"
menu:
  main:
    parent: "Using OAS API Definitions"
weight: 8
---

### Introduction

The tables below list the status of the Tyk Gateway API features, that will be available in the early access phase of the new Tyk OAS API Definition format.

In the table below, OAS implemented means that the feature is available while using the Tyk Gateway or Dashboard API, and the API Designer column shows the features that are available in the Dashboard UI.

| Feature Name      | OAS Implemented | API Designer |
|-------------------|-----------------|--------------|
| API Name          | ✅               | ✅            |
| API Internal      | ✅               | ✅            |
| API Status        | ✅               | ✅            |
| API Categories    | ❌️               | ❌️            |
| API ID/API URL(s) | ✅               | ✅            |
| API Type          | ❌️               | ❌️            |

### Routing

| Feature Name      | OAS Implemented | Api Designer |
|-------------------|-----------------|--------------|
| Listen Path/ Slug | ✅               | ✅            |
| Target URL        | ✅               | ✅            |
| API Versioning    | ✅               | ❌️            |

### Client to Gateway Authentication

| Feature Name                        | OAS Implemented | API Designer |
|-------------------------------------|-----------------|--------------|
| Keyless                             | ✅               | ✅            |
| Auth Token                          | ✅               | ✅            |
| JWT                                 | ✅               | ✅            |
| OpenID Connect                      | ✅               | ✅            |
| OAuth 2                             | ✅               | ✅            |
| mTLS                                | ✅               | ✅            |
| HMAC                                | ✅               | ✅            |
| Basic Authentication                | ✅               | ✅            |
| Plugin Auth - GO                    | ❌️               | ❌️            |
| Custom Auth                         | ❌️               | ❌️            |
| Multiple Authentication Mecanism    | ✅               | ✅            |
| IP Whitelisting                     | ❌️               | ❌️            |
| IP Blacklisting                     | ❌️               | ❌️            |
| GW Request Signing                  | ❌️               | ❌️            |
| Token expiration (session_lifetime) | ❌️               | ❌️            |

### Gateway to Upstream Authentication

| Feature Name                   | OAS Implemented | API Designer |
|--------------------------------|-----------------|--------------|
| Public Key Certificate Pinning | ✅               | ❌️            |
| Upstream Certificates mTLS     | ✅               | ✅            |
| Upstream Request Signing       | ❌️               | ❌️            |

### Features

| Feature Name                                                | OAS Implemented | API Designer |
|-------------------------------------------------------------|-----------------|--------------|
| Analytics API Tagging (tag_headers)                         | ❌️               | ❌️            |
| expire_analytics_after                                      | ❌️               | ❌️            |
| Do not track Analytics (per API) (do_not_track)             | ❌️               |              |
| Detailed recording (Log browser) enable_detailed_recording  | ❌️               |              |
| Config Data                                                 | ❌️               | ❌️            |
| Context Variables                                           | ❌️               | ❌️            |
| CORS                                                        | ✅               | ✅            |
| Cache                                                       | ✅               | ✅            |
| Service Discovery                                           | ✅               | ✅            |
| Plugin Bundle (custom_middleware, custom_middleware_bundle) | ❌️               | ❌️            |
| Batch Requests                                              | ❌️               | ❌️            |
| Segment Tags                                                | ✅               | ✅            |
| Global Rate Limit                                           | ❌️               | ❌️            |
| Webhooks                                                    | ❌️               | ❌️            |
| Looping                                                     | ❌️               | ❌️            |
| Preserve Host Header                                        | ❌️               | ❌️            |
| Transport (proxy.transport)                                 | ❌️               | ❌️            |

### Endpoint Designer

| Feature Name                | OAS Implemented | API Designer |
|-----------------------------|-----------------|--------------|
| Global Headers              | ❌️               | ❌️            |
| Endpoint CRUD operations    | ✅               | ✅            |
| Middleware CRUD  operations | ✅               | ✅            |
| Transform Request Body      | ❌️               | ❌️            |
| Transform Response Body     | ❌️               | ❌️            |
| Block                       | ✅               | ✅            |
| Cache                       | ✅               | ✅            |
| Circuit Breaker             | ❌️               | ❌️            |
| Do not track                | ❌️               | ❌️            |
| Enforced timeout            | ✅               | ❌️            |
| Ignore                      | ✅               | ✅            |
| Internal                    | ❌️               | ❌️            |
| Transform Request Method    | ✅               | ❌️            |
| Mock Response               | ✅               | ❌️            |
| Transform Request Headers   | ❌️               | ❌️            |
| Transform Response Headers  | ❌️               | ❌️            |
| Request size limit          | ❌️               | ❌️            |
| Track endpoint              | ❌️               | ❌️            |
| URL Rewrite                 | ❌️               | ❌️            |
| Validate Request            | ✅               | ✅            |
| Virtual Endpoint            | ❌️               | ❌️            |
| Allow                       | ✅               | ✅            |

### API Export

| Feature Name | OAS Implemented | API Designer |
|--------------|-----------------|--------------|
| API Export   | ✅               | ✅            |

### API Export Raw OAS Editor

| Feature Name       | OAS Implemented | API Designer |
|--------------------|-----------------|--------------|
| API Raw OAS Editor | ✅               | ✅            |



