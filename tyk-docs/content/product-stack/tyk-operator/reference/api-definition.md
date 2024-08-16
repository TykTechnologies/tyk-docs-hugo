---
title: "API Definition"
date: 2024-06-25
tags: ["Tyk Operator", "Kubernetes", "API Definition"]
description: "Support features of APIDefinition CRD"
---

The ApiDefinition custom resource defines configuration of [Tyk Classic API Definition object]({{<ref "tyk-gateway-api/api-definition-objects">}}).

Here are the supported features:

## API Types

| Type                           | Support | Supported From | Comments                     | Sample                                                                                     |
|--------------------------------|---------|----------------|------------------------------|--------------------------------------------------------------------------------------------|
| HTTP                           | ✅      | v0.1           | -                            | [HTTP Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-http#http-proxy">}}) |
| HTTPS                          | ✅      | v0.4           | -                            | [HTTPS Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-http#https-proxy">}}) |
| TCP                            | ✅      | v0.1           | -                            | [TCP Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-tcp">}}) |
| TLS                            | ✅      | v0.1           | -                            |                                                                                            |
| GraphQL - Proxy                | ✅      | v0.1           | -                            | [GraphQL Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-graphql">}}) |
| Universal Data Graph v1        | ✅      | v0.1           | -                            | [UDG v1 Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-udg#udg-v1-tyk-31-or-before">}}) |
| Universal Data Graph v2        | ✅      | v0.12          | -                            | [UDG v2 Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-udg#udg-v2-tyk-32-and-above">}}) |
| GraphQL - Federation           | ✅      | v0.12          | -                            | [GraphQL Federation]({{<ref "product-stack/tyk-operator/advanced-configurations/graphql-federation">}}) |

## Management of APIs

| Type                           | Support | Supported From | Comments                     | Sample |
|--------------------------------|---------|----------------|------------------------------|--------|
| API Name                       | ✅      | v0.1           | - | [API Name]({{<ref "product-stack/tyk-operator/advanced-configurations/management-of-api#api-name">}}) |
| API Status (inactive/active)   | ✅      | v0.2           | - | [API Status]({{<ref "product-stack/tyk-operator/advanced-configurations/management-of-api#api-status-inactiveactive">}}) |
| API Categories                 | ✅      | v0.1           | - | [API Categories]({{<ref "product-stack/tyk-operator/advanced-configurations/management-of-api#api-category">}}) |
| API ID                         | ✅      | v0.1           | - | [API ID]({{<ref "product-stack/tyk-operator/advanced-configurations/management-of-api#api-id">}}) |-                            |                                                                                            |
| API Ownership                  | ✅      | v0.12          | - | [API Ownership]({{<ref "product-stack/tyk-operator/advanced-configurations/management-of-api#api-ownership">}}) |
| API Versioning                 | ✅      | v0.1           | - | [API Versioning]({{<ref "product-stack/tyk-operator/advanced-configurations/api-versioning">}}) |

## Traffic Routing
<!--| API Listen Path                | ✅      | v0.1           | - | [API Listen Path]() |-->

| Type                        | Supported | Supported From | Comments | Sample        |
| --------------------------- | --------- | -------------- | -------- | ------------- |
| Path-Based Proxy            | ✅        | v0.1           | - | [HTTP Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-http#http-proxy">}}) |
| Host-Based Proxy            | ✅        | v0.1           | - | [HTTP Host-based Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-http#http-host-based-proxy">}}) |
| Target URL                  | ✅        | v0.1           | - | [HTTP Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-http#http-proxy">}}) |

## Client to Gateway Authentication and Authorization

| Type                          | Supported | Supported From | Comments | Sample        |
| ----------------------------- | --------- | -------------- | -------- | ------------- |
| Keyless                       | ✅        | v0.1           | -        | [Keyless]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication#keyless-open">}}) |
| Auth Token                    | ✅        | v0.1           | -        | [Auth Token]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication#auth-token-bearer-token">}}) |
| JWT                           | ✅️        | v0.5           | -        | [JWT]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication#jwt">}}) |
| OpenID Connect                | ❌        | -              | JWT is the recommended way configuring OIDC. Please see [OpenID Connect]({{<ref "basic-config-and-security/security/authentication-authorization/openid-connect">}}) documentation for details. | |
| OAuth2                        | ❌        | -              | JWT is the recommended way to configure OAuth2. Please see [OpenID Connect]({{<ref "basic-config-and-security/security/authentication-authorization/openid-connect">}}) documentation for details. | |
| Client mTLS                   | ✅        | v0.11              | Only static client mTLS is supported | [mTLS]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication#mtls">}}) |
| HMAC                          | ❌        | -              | Not implemented | |
| Basic Authentication          | ✅        | v0.12          | Only enabling with default metadata values is supported  | [Basic Auth]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication#basic-authentication">}}) |
| Custom Authentication Plugin (Go)   | ✅        | v0.11          | - | [Custom Auth (go)]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication#custom-plugin-auth-go">}}) |
| Custom Authentication Plugin (gRPC) | ✅        | v0.1           | - | [Custom Auth (gRPC)]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication#custom-plugin-auth-grpc">}}) |
| Multiple Authentication       | ✅        | v0.14          | - | [Multiple Auth]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication#multiple-chained-auth">}}) |
| IP Allowlist                  | ✅        | v0.5           | - | [IP Allowlist]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication#ip-allowlist">}}) |
| IP Blocklist                  | ✅        | v0.5           | - | [IP Blocklist]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication#ip-blocklist">}}) |

## Gateway to Upstream Authentication

| Type                                            | Supported | Supported From | Comments        | Sample        |
|-------------------------------------------------|-----------|----------------|-----------------| ------------- |
| Upstream Certificates mTLS                      | ✅        | v0.9           |                 | [Upstream mTLS]({{<ref "basic-config-and-security/security/mutual-tls/upstream-mtls">}}) |
| Public Key Certificate Pinning                  | ✅        | v0.9           |                 | [Certificate Pinning]({{<ref "security/certificate-pinning">}}) |
| Upstream Request Signing                        | ❌        | -              | Not implemented | |

## API-level (Global) Features

| Feature                              | Supported | Supported From | Comments                                                               | Sample                                                          |
|--------------------------------------|-----------|----------------|------------------------------------------------------------------------|-----------------------------------------------------------------|
| Detailed recording (in Log Browser)  | ✅        | v0.4.0         | -                                                                      |                                                                 |
| Config Data                          | ✅        | v0.8.2         | -                                                                      | [Config Data](.) |
| Context Variables                    | ✅        | v0.1           | -                                                                      |
| Cross Origin Resource Sharing (CORS) | ✅        | v0.2           | - | [CORS]({{<ref "tyk-apis/tyk-gateway-api/api-definition-objects/cors">}})                 |
| Service Discovery                    | ⚠️         | -              | Untested                                                                |                                                                 |
| Segment Tags                         | ✅        | v0.1           | -                                                                      | [Segment Tags]({{<ref "advanced-configuration/manage-multiple-environments/with-tyk-multi-cloud">}})               |
| Internal API (not exposed by Gateway)| ✅        | v0.6.0         | -                                                                      |                                                                |
| Global (API-level) Header Transform  | ✅        | v0.1.0         | -                                                                      | [Global Header Transform]({{<ref "product-stack/tyk-gateway/middleware/request-header-tyk-classic">}})         |
| Global (API-level) Rate Limit        | ✅        | v0.10          | -                                                                      | [Global Rate Limit]({{<ref "basic-config-and-security/control-limit-traffic/rate-limiting">}})    |
| Plugin Bundles                       | ❌        | -              | -                                                                      |                                                                 |
| Custom Plugins - Go                  | ⚠️         | v0.1           | Untested                                                               |
| Custom Plugins - gRPC                | ✅        | v0.1           | -                                                                      | [Custom Plugin gRPC]({{<ref "plugins/supported-languages/rich-plugins/grpc/write-grpc-plugin">}})        |
| Custom Plugins - Javascript          | ✅        | v0.1           | -                                                                      | [Custom Plugin Javascript]({{< ref "product-stack/tyk-operator/advanced-configurations/custom-plugins" >}})                    |
| Custom Plugins - Lua                 | ⚠️         | v0.1           | Untested                                                               |
| Custom Plugins - Python              | ⚠️         | v0.1           | Untested                                                               |
| Custom Plugins - Analytics Plugin    | ✅        | v0.16.0        | - | [Analytics Plugins]({{<ref "plugins/plugin-types/analytics-plugins">}})|
| Batch Requests                       | ❌        | -              | -                                                                      |                                                                 |
| Analytics API Tagging (Tag Headers)  | ✅        | v0.10.0        | Untested                                                               |
| Expire Analytics After               | ❌        | -              | -                                                                      |                                                                 |
| Do not track Analytics (per API)     | ✅        | v0.1.0         | -                                                                      |                                                                 |
| Webhooks                             | ❌        | -              | -   | |
| Looping                              | ⚠️         | v0.6           | Untested                                                               | [Internal Looping]({{< ref "advanced-configuration/transform-traffic/looping" >}})                          |
| Round Robin Load Balancing           | ✅        | -              | -                                                                    | [Load Balancing]({{<ref "planning-for-production/ensure-high-availability/load-balancing">}})                    |

## Endpoint-level Features

| Endpoint Middleware               | Supported | Supported From | Comments                                       | Sample        |
|-----------------------------------|-----------|----------------|------------------------------------------------|---------------|
| Allow list                        | ✅️        | v0.8.2         | -                                              | [Sample]({{<ref "product-stack/tyk-gateway/middleware/allow-list-tyk-classic">}}) |
| Block list                        | ✅️        | v0.8.2         | -                                              | [Sample]({{<ref "product-stack/tyk-gateway/middleware/block-list-tyk-classic">}}) |
| Cache                             | ✅        | v0.1           | -                                              | [Sample]({{<ref "product-stack/tyk-gateway/middleware/endpoint-cache-tyk-classic">}}) |
| Advance Cache                     | ✅        | v0.1           | -                                              | [Sample]({{<ref "product-stack/tyk-gateway/middleware/endpoint-cache-tyk-classic">}}) |
| Circuit Breaker                   | ✅        | v0.5           | -                                              | [Sample]({{<ref "product-stack/tyk-gateway/middleware/circuit-breaker-tyk-classic">}})  |
| Track Endpoint                    | ✅        | v0.1           |                                                | [Sample]({{<ref "product-stack/tyk-gateway/middleware/do-not-track-tyk-classic">}}) |
| Do Not Track Endpoint             | ✅        | v0.1           |                                                | [Sample]({{<ref "product-stack/tyk-gateway/middleware/do-not-track-tyk-classic">}}) |
| Enforced Timeouts                 | ✅        | v0.1           | -                                              | [Sample]({{<ref "product-stack/tyk-gateway/middleware/enforced-timeout-tyk-classic">}}) |
| Ignore Authentication             | ✅        | v0.8.2         | -                                              | [Sample]({{<ref "product-stack/tyk-gateway/middleware/ignore-tyk-classic">}}) |
| Internal Endpoint                 | ✅        | v0.1           | -                                              | [Sample]({{<ref "product-stack/tyk-gateway/middleware/internal-endpoint-tyk-classic">}}) |
| URL Rewrite Basic                 | ✅️        | v0.1           | -                                              | [Sample]({{<ref "product-stack/tyk-gateway/middleware/url-rewrite-tyk-classic">}}) |
| URL Rewrite (Advanced Trigger)    | ❌        | -              | -                                              | |
| Validate Request                  | ✅        | v0.8.2         | -                                              | [Sample]({{<ref "product-stack/tyk-gateway/middleware/validate-request-tyk-classic">}}) |
| Request Size Limit                | ✅️        | v0.1           | -                                              | [Sample]({{<ref "product-stack/tyk-gateway/middleware/request-size-limit-tyk-classic">}}) |
| Request Method Transform          | ✅        | v0.5           | -                                              | [Sample]({{<ref "product-stack/tyk-gateway/middleware/request-method-tyk-classic">}}) |
| Request Header Transform          | ✅        | v0.1           | -                                              | [Sample]({{<ref "product-stack/tyk-gateway/middleware/request-header-tyk-classic">}}) |
| Request Body Transform            | ✅        | v0.1           | -                                              | [Sample]({{<ref "product-stack/tyk-gateway/middleware/request-body-tyk-classic">}}) |
| Request Body JQ Transform         | ⚠️         | v0.1           | Untested - Requires [JQ on Gateway Docker Image]({{<ref "advanced-configuration/transform-traffic/jq-transformations">}}) | |
| Response Header Transform         | ✅        | v0.1           | -                                              | [Sample]({{<ref "product-stack/tyk-gateway/middleware/response-header-tyk-classic">}}) |
| Response Body Transform           | ✅        | v0.1           | -                                              | [Sample]({{<ref "product-stack/tyk-gateway/middleware/response-body-tyk-classic">}}) |
| Response Body JQ Transform        | ⚠️         | v0.1           | Untested - Requires [JQ on Gateway Docker Image]({{<ref "advanced-configuration/transform-traffic/jq-transformations">}}) | |
| Mock Response                     | ✅        | v0.1           | -                                             | [Sample]({{<ref "product-stack/tyk-gateway/middleware/mock-response-tyk-classic">}})|
| Virtual Endpoint                  | ✅        | v0.1           | -                                              | [Sample]({{<ref "product-stack/tyk-gateway/middleware/virtual-endpoint-tyk-classic">}}) |
| Go Plugin                         | ❌        | -              | -                                              |  |
| Persist Graphql                   | ❌        | -              | -                                              |  |