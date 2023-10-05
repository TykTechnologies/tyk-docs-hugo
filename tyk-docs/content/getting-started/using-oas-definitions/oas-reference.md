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

### Introduction

Tyk Gateway is extremely flexible with a great many features that you can use to configure and optimise the handling of requests to your APIs. During the Early Access phase, we are gradually rolling out support for all of the configuration that is available through Tyk Classic API definitions into the new Tyk OAS API Definition format. Unfortunately we are not quite there yet, though the most asked for features have been implemented.

In the tables below, *Implemented* means that the feature is available for use with Tyk OAS APIs while using the Tyk Gateway API or Tyk Dashboard API; the *API Designer* column shows the features that can be configured using the Tyk Dashboard UI.

If there's a feature you're looking to use that isn't yet implemented, let us know via our [community forum](https://community.tyk.io/t/oas-has-landed/5605) or your Tyk representative and help us to help you get started with Tyk OAS.


### Management of APIs

| Feature                               | Implemented      | API Designer  |
|---------------------------------------|------------------|---------------|
| API Name                              | ✅               | ✅            |
| Status (draft/active)                 | ✅               | ✅            |
| API Categories                        | ❌️               | ❌️            |
| API ID/API URL(s)                     | ✅               | ✅            |
| API Ownership                         | ❌️               | ❌️            |
| API Versioning                        | ✅               | ✅            |

### Traffic Routing

| Feature                               | Implemented      | Api Designer  |
|---------------------------------------|------------------|---------------|
| Listen Path/ Slug                     | ✅               | ✅            |
| Target URL                            | ✅               | ✅            |

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
| Basic Authentication                  | ✅               | ✅            |
| Plugin Auth (Go)                      | ✅               | ✅            |
| Custom Auth                           | ✅               | ✅            |
| Multiple Authentication               | ✅               | ✅            |
| IP Allowlist                          | ❌️               | ❌️            |
| IP Blocklist                          | ❌️               | ❌️            |
| GW Request Signing                    | ❌️               | ❌️            |
| Token expiration (session_lifetime)   | ❌️               | ❌️            |

### Gateway to Upstream Authentication

| Feature                               | Implemented      | API Designer  |
|---------------------------------------|------------------|---------------|
| Public Key Certificate Pinning        | ✅               | ❌️            |
| Upstream Certificates (mTLS)          | ✅               | ✅            |
| Upstream Request Signing              | ❌️               | ❌️            |

### API-level (Global) Features

| Feature                               | Implemented      | API Designer  |
|---------------------------------------|------------------|---------------|
| Analytics API Tagging (tag_headers)   | ❌️               | ❌️            |
| expire_analytics_after                | ❌️               | ❌️            |
| Do not track Analytics (per API)      | ❌️               | ❌️            |
| Detailed recording (in Log Browser)   | ❌️               | ❌️            |
| Config Data                           | ✅               | ✅            |
| Context Variables                     | ❌️               | ❌️            |
| CORS                                  | ✅               | ✅            |
| Service Discovery                     | ✅               | ✅            |
| Plugin Bundles                        | ✅               | ✅            |
| Batch Requests                        | ❌️               | ❌️            |
| Segment Tags                          | ✅               | ✅            |
| Internal API (not exposed by Gateway) | ✅               | ✅            |
| Global Header Transform               | ❌️               | ❌️            |
| API-level Rate Limit                  | ❌️               | ❌️            |
| Webhooks                              | ❌️               | ❌️            |
| Preserve Host Header                  | ❌️               | ❌️            |
| Transport (proxy.transport)           | ❌️               | ❌️            |

### Endpoint-level Features

| Feature                               | Implemented      | API Designer  |
|---------------------------------------|------------------|---------------|
| Allow                                 | ✅               | ✅            |
| Block                                 | ✅               | ✅            |
| Cache                                 | ✅               | ❌️            |
| Circuit Breaker                       | ❌️               | ❌️            |
| Track Endpoint                        | ❌️               | ❌️            |
| Do Not Track                          | ❌️               | ❌️            |
| Enforced Timeout                      | ✅               | ❌️            |
| Ignore Authentication                 | ✅               | ✅            |
| Internal Endpoint                     | ❌️               | ❌️            |
| URL Rewrite                           | ❌️               | ❌️            |
| Validate Request                      | ✅               | ✅            |
| Request Size Limit                    | ❌️               | ❌️            |
| Request Method Transform              | ✅               | ❌️            |
| Request Header Transform              | ❌️               | ❌️            |
| Request Body Transform                | ✅               | ✅            |
| Response Header Transform             | ❌️               | ❌️            |
| Response Body Transform               | ✅               | ✅            |
| Mock Response                         | ✅               | ✅            |
| Virtual Endpoint                      | ✅               | ✅            |

### Working with Tyk OAS API Definitions

| Feature                               | Implemented      | API Designer  |
|---------------------------------------|------------------|---------------|
| API Export                            | ✅               | ✅            |
| API Raw OAS Editor                    | ✅               | ✅            |
| API Endpoint CRUD Operations          | ✅               | ✅            |
| Middleware CRUD Operations            | ✅               | ✅            |
