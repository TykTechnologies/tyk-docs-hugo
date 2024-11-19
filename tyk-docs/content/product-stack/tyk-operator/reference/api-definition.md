---
title: "API Definition"
date: 2024-06-25
tags: ["Tyk Operator", "Kubernetes", "API Definition"]
description: "Support features of APIDefinition CRD"
---

The ApiDefinition custom resource defines configuration of [Tyk Classic API
Definition object]({{<ref "tyk-gateway-api/api-definition-objects">}}).

Here are the supported features:

## API Types

| Type                    | Support | Supported From | Comments | Sample                                                                                                         |
| ----------------------- | ------- | -------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| HTTP                    | ✅      | v0.1           | -        | [HTTP Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-http#http-proxy">}})               |
| HTTPS                   | ✅      | v0.4           | -        | [HTTPS Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-http#https-proxy">}})             |
| TCP                     | ✅      | v0.1           | -        | [TCP Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-tcp">}})                            |
| TLS                     | ✅      | v0.1           | -        |                                                                                                                |
| GraphQL - Proxy         | ✅      | v0.1           | -        | [GraphQL Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-graphql">}})                    |
| Universal Data Graph v1 | ✅      | v0.1           | -        | [UDG v1 Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-udg#udg-v1-tyk-31-or-before">}}) |
| Universal Data Graph v2 | ✅      | v0.12          | -        | [UDG v2 Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-udg#udg-v2-tyk-32-and-above">}}) |
| GraphQL - Federation    | ✅      | v0.12          | -        | [GraphQL Federation]({{<ref "product-stack/tyk-operator/advanced-configurations/graphql-federation">}})        |

## Management of APIs

| Type                         | Support | Supported From | Comments | Sample                                                                                                                  |
| ---------------------------- | ------- | -------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- | --- | --- |
| API Name                     | ✅      | v0.1           | -        | [API Name]({{<ref "product-stack/tyk-operator/advanced-configurations/management-of-api#api-name">}})                   |
| API Status (inactive/active) | ✅      | v0.2           | -        | [API Active Status]({{<ref "product-stack/tyk-operator/advanced-configurations/management-of-api#api-active-status">}}) |
| API Categories               | ✅      | v0.1           | -        | [API Categories]({{<ref "product-stack/tyk-operator/advanced-configurations/api-categories">}})                         |
| API ID                       | ✅      | v0.1           | -        | [API ID]({{<ref "product-stack/tyk-operator/advanced-configurations/management-of-api#api-id">}})                       | -   |     |
| API Ownership                | ✅      | v0.12          | -        | [API Ownership]({{<ref "product-stack/tyk-operator/advanced-configurations/management-of-api#api-ownership">}})         |
| API Versioning               | ✅      | v0.1           | -        | [API Versioning]({{<ref "getting-started/key-concepts/versioning#tyk-operator">}})        |

## Traffic Routing

<!--| API Listen Path                | ✅      | v0.1           | - | [API Listen Path]() |-->

| Type             | Supported | Supported From | Comments | Sample                                                                                                                 |
| ---------------- | --------- | -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| Path-Based Proxy | ✅        | v0.1           | -        | [HTTP Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-http#http-proxy">}})                       |
| Host-Based Proxy | ✅        | v0.1           | -        | [HTTP Host-based Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-http#http-host-based-proxy">}}) |
| Target URL       | ✅        | v0.1           | -        | [HTTP Proxy]({{<ref "product-stack/tyk-operator/getting-started/quick-start-http#http-proxy">}})                       |

## Client to Gateway Authentication and Authorization

| Type                                | Supported | Supported From | Comments                                                                                                                                                                                           | Sample                                                                                                                             |
| ----------------------------------- | --------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Keyless                             | ✅        | v0.1           | -                                                                                                                                                                                                  | [Keyless]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication#keyless-open">}})                       |
| Auth Token                          | ✅        | v0.1           | -                                                                                                                                                                                                  | [Auth Token]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication#auth-token-bearer-token">}})         |
| JWT                                 | ✅️       | v0.5           | -                                                                                                                                                                                                  | [JWT]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication#jwt">}})                                    |
| OpenID Connect                      | ❌        | -              | JWT is the recommended way configuring OIDC. Please see [OpenID Connect]({{<ref "basic-config-and-security/security/authentication-authorization/openid-connect">}}) documentation for details.    |                                                                                                                                    |
| OAuth2                              | ❌        | -              | JWT is the recommended way to configure OAuth2. Please see [OpenID Connect]({{<ref "basic-config-and-security/security/authentication-authorization/openid-connect">}}) documentation for details. |                                                                                                                                    |
| Client mTLS                         | ✅        | v0.11          | Only static client mTLS is supported                                                                                                                                                               | [Client mTLS]({{<ref "basic-config-and-security/security/mutual-tls/client-mtls#tyk-operator-classic">}})                          |
| HMAC                                | ❌        | -              | Not implemented                                                                                                                                                                                    |                                                                                                                                    |
| Basic Authentication                | ✅        | v0.12          | Only enabling with default metadata values is supported                                                                                                                                            | [Basic Auth]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication#basic-authentication">}})            |
| Custom Authentication Plugin (Go)   | ✅        | v0.11          | -                                                                                                                                                                                                  | [Custom Auth (go)]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication#custom-plugin-auth-go">}})     |
| Custom Authentication Plugin (gRPC) | ✅        | v0.1           | -                                                                                                                                                                                                  | [Custom Auth (gRPC)]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication#custom-plugin-auth-grpc">}}) |
| Multiple Authentication             | ✅        | v0.14          | -                                                                                                                                                                                                  | [Multiple Auth]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication#multiple-chained-auth">}})        |
| IP Allowlist                        | ✅        | v0.5           | -                                                                                                                                                                                                  | [IP Allowlist]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication#ip-allowlist">}})                  |
| IP Blocklist                        | ✅        | v0.5           | -                                                                                                                                                                                                  | [IP Blocklist]({{<ref "product-stack/tyk-operator/advanced-configurations/client-authentication#ip-blocklist">}})                  |

## Gateway to Upstream Authentication

| Type                           | Supported | Supported From | Comments        | Sample                                                                                   |
| ------------------------------ | --------- | -------------- | --------------- | ---------------------------------------------------------------------------------------- |
| Upstream Certificates mTLS     | ✅        | v0.9           |                 | [Upstream mTLS]({{<ref "basic-config-and-security/security/mutual-tls/upstream-mtls">}}) |
| Public Key Certificate Pinning | ✅        | v0.9           |                 | [Certificate Pinning]({{<ref "security/certificate-pinning">}})                          |
| Upstream Request Signing       | ❌        | -              | Not implemented |                                                                                          |

## API-level (Global) Features

| Feature                               | Supported | Supported From | Comments | Sample                                                                                                                                                            |
| ------------------------------------- | --------- | -------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | --- |
| Detailed recording (in Log Browser)   | ✅        | v0.4.0         | -        | [Detailed recording]({{<ref "product-stack/tyk-gateway/basic-config-and-security/logging-api-traffic/detailed-recording#detailed-recording-with-tyk-operator">}}) |
| Config Data                           | ✅        | v0.8.2         | -        | [Config Data]({{<ref "product-stack/tyk-gateway/middleware/virtual-endpoint-tyk-classic#tyk-operator">}})                                                         |
| Context Variables                     | ✅        | v0.1           | -        | [Context Variables]({{<ref "context-variables#enabling-context-variables-for-use-with-tyk-classic-apis">}})                                                       |
| Cross Origin Resource Sharing (CORS)  | ✅        | v0.2           | -        | [CORS]({{<ref "tyk-apis/tyk-gateway-api/api-definition-objects/cors">}})                                                                                          |
| Service Discovery                     | ⚠️        | -              | Untested |                                                                                                                                                                   |
| Segment Tags                          | ✅        | v0.1           | -        | [Segment Tags]({{<ref "advanced-configuration/manage-multiple-environments/with-tyk-multi-cloud">}})                                                              |
| Internal API (not exposed by Gateway) | ✅        | v0.6.0         | -        | [API Accessibility]({{< ref "product-stack/tyk-operator/advanced-configurations/management-of-api#api-accessibility" >}})                                         |
| Global (API-level) Header Transform   | ✅        | v0.1.0         | -        | [Global Header Transform]({{<ref "product-stack/tyk-gateway/middleware/request-header-tyk-classic">}})                                                            |
| Global (API-level) Rate Limit         | ✅        | v0.10          | -        | [Global Rate Limit]({{<ref "basic-config-and-security/control-limit-traffic/rate-limiting">}})                                                                    |
| Custom Plugins                        | ✅        | v0.1           | -        | [Custom Plugins]({{< ref "product-stack/tyk-operator/advanced-configurations/custom-plugins" >}})                                                                 |
| Analytics Plugin                      | ✅        | v0.16.0        | -        | [Analytics Plugins]({{<ref "plugins/plugin-types/analytics-plugins">}})                                                                                           |
| Batch Requests                        | ❌        | -              | -        |                                                                                                                                                                   |
| Custom Analytics Tags (Tag Headers)   | ✅        | v0.10.0        | -        | [Custom Analytics Tags (Tag Headers)]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/custom-analytics#tyk-operator" >}})                                |
| Expire Analytics After                | ❌        | -              | -        |                                                                                                                                                                   |
| Do not track Analytics (per API)      | ✅        | v0.1.0         | -        | [Do Not Track]({{< ref "product-stack/tyk-gateway/middleware/do-not-track-tyk-classic" >}})                                                                       | -   |     |
| Webhook Event Handler                 | ✅        | v1.0           | -        | [Webhook Event Handler]({{<ref "product-stack/tyk-gateway/basic-config-and-security/report-monitor-and-trigger-events/event-webhook-tyk-classic">}})              |
| Looping                               | ✅        | v0.6           | -        | [Internal Looping]({{< ref "product-stack/tyk-operator/advanced-configurations/internal-looping" >}})                                                             |
| Round Robin Load Balancing            | ✅        | -              | -        | [Load Balancing]({{<ref "planning-for-production/ensure-high-availability/load-balancing">}})                                                                     |

## Endpoint-level Features

| Endpoint Middleware        | Supported | Supported From | Comments                                                                                                       | Sample                                                                                                    |
| -------------------------- | --------- | -------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Allow list                 | ✅️       | v0.8.2         | -                                                                                                              | [Allow list]({{<ref "product-stack/tyk-gateway/middleware/allow-list-tyk-classic">}})                     |
| Block list                 | ✅️       | v0.8.2         | -                                                                                                              | [Block list]({{<ref "product-stack/tyk-gateway/middleware/block-list-tyk-classic">}})                     |
| Cache                      | ✅        | v0.1           | -                                                                                                              | [Cache]({{<ref "product-stack/tyk-gateway/middleware/endpoint-cache-tyk-classic">}})                      |
| Advance Cache              | ✅        | v0.1           | -                                                                                                              | [Advanced Cache]({{<ref "product-stack/tyk-gateway/middleware/endpoint-cache-tyk-classic">}})             |
| Circuit Breaker            | ✅        | v0.5           | -                                                                                                              | [Circuit Breaker]({{<ref "product-stack/tyk-gateway/middleware/circuit-breaker-tyk-classic">}})           |
| Track Endpoint             | ✅        | v0.1           |                                                                                                                | [Track Endpoint]({{<ref "product-stack/tyk-gateway/middleware/do-not-track-tyk-classic">}})               |
| Do Not Track Endpoint      | ✅        | v0.1           |                                                                                                                | [Do Not Track Endpoint]({{<ref "product-stack/tyk-gateway/middleware/do-not-track-tyk-classic">}})        |
| Enforced Timeouts          | ✅        | v0.1           | -                                                                                                              | [Enforced Timeouts]({{<ref "product-stack/tyk-gateway/middleware/enforced-timeout-tyk-classic">}})        |
| Ignore Authentication      | ✅        | v0.8.2         | -                                                                                                              | [Ignore Authentication]({{<ref "product-stack/tyk-gateway/middleware/ignore-tyk-classic">}})              |
| Internal Endpoint          | ✅        | v0.1           | -                                                                                                              | [Internal Endpoint]({{<ref "product-stack/tyk-gateway/middleware/internal-endpoint-tyk-classic">}})       |
| URL Rewrite                | ✅️       | v0.1           | -                                                                                                              | [URL Rewrite]({{<ref "product-stack/tyk-gateway/middleware/url-rewrite-tyk-classic">}})                   |
| Validate Request           | ✅        | v0.8.2         | -                                                                                                              | [Validate Request]({{<ref "product-stack/tyk-gateway/middleware/validate-request-tyk-classic">}})         |
| Rate Limit                 | ❌        | -              | -                                                                                                              |                                                                                                           |
| Request Size Limit         | ✅️       | v0.1           | -                                                                                                              | [Request Size Limit]({{<ref "product-stack/tyk-gateway/middleware/request-size-limit-tyk-classic">}})     |
| Request Method Transform   | ✅        | v0.5           | -                                                                                                              | [Request Method Transform]({{<ref "product-stack/tyk-gateway/middleware/request-method-tyk-classic">}})   |
| Request Header Transform   | ✅        | v0.1           | -                                                                                                              | [Request Header Transform]({{<ref "product-stack/tyk-gateway/middleware/request-header-tyk-classic">}})   |
| Request Body Transform     | ✅        | v0.1           | -                                                                                                              | [Request Body Transform]({{<ref "product-stack/tyk-gateway/middleware/request-body-tyk-classic">}})       |
| Request Body JQ Transform  | ⚠️        | v0.1           | Requires [JQ on Gateway Docker Image]({{<ref "advanced-configuration/transform-traffic/jq-transformations">}}) |                                                                                                           |
| Response Header Transform  | ✅        | v0.1           | -                                                                                                              | [Response Header Transform]({{<ref "product-stack/tyk-gateway/middleware/response-header-tyk-classic">}}) |
| Response Body Transform    | ✅        | v0.1           | -                                                                                                              | [Response Body Transform]({{<ref "product-stack/tyk-gateway/middleware/response-body-tyk-classic">}})     |
| Response Body JQ Transform | ⚠️        | v0.1           | Requires [JQ on Gateway Docker Image]({{<ref "advanced-configuration/transform-traffic/jq-transformations">}}) |                                                                                                           |
| Mock Response              | ✅        | v0.1           | -                                                                                                              | [Mock Response]({{<ref "product-stack/tyk-gateway/middleware/mock-response-tyk-classic">}})               |
| Virtual Endpoint           | ✅        | v0.1           | -                                                                                                              | [Virtual Endpoint]({{<ref "product-stack/tyk-gateway/middleware/virtual-endpoint-tyk-classic">}})         |
| Per-Endpoint Plugin        | ❌        | -              | -                                                                                                              |                                                                                                           |
| Persist Graphql            | ❌        | -              | -                                                                                                              |                                                                                                           |
