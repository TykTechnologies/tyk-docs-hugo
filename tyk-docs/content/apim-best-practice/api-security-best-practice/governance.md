---
title: "Governance"
date: 2023-09-04
tags: ["API Security", "governance"]
description: "Management and governance of APIs"
---

APIs need to be managed and governed just like any other resource, otherwise organizations risk losing track of their API estate and becoming unaware of potentially vulnerable APIs running within their infrastructure. This risk is magnified as the number of teams, environments and APIs increases. Use API management as part of overarching business processes to control how APIs are accessed, managed and deployed.

**Restrict Version Availability**: Enforce the expiry of [API versions]({{< ref "getting-started/key-concepts/versioning" >}}) that are planned for deprecation, by setting a sunset date, beyond which they will not be accessible.

**Enforce Key Expiry**: In many situations it’s best to issue API keys that have a short, finite lifetime, especially when serving anonymous, external consumers. Set [expiry dates]({{< ref "basic-config-and-security/control-limit-traffic/key-expiry" >}}) for API keys, or use ephemeral credentials with complementary authentication techniques that support key renewal, such as [OAuth 2.0 refresh tokens]({{< ref "/api-management/authentication-authorization#use-refresh-token-grant" >}}) and [dynamic client registration]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/dynamic-client-registration" >}}). Then, should an API key fall into the wrong hands, there’s a chance that it has already expired.

**Use Standardized Specifications**: Use the [OpenAPI Specification](https://en.wikipedia.org/wiki/OpenAPI_Specification) standard to design APIs. These specification documents act as a source of truth that can generate [API configuration]({{< ref "getting-started/using-oas-definitions/import-an-oas-api" >}}) and [portal documentation]({{< ref "tyk-apis/tyk-portal-api/portal-documentation#create-documentation" >}}).

**Understand API Usage**: Use [API analytics]({{< ref "tyk-dashboard-analytics" >}}) to report on usage. This captured data generates useful, actionable insights across a variety of metrics, such as API popularity, performance and trends.

**Control API Distribution**: Use [sharding]({{< ref "advanced-configuration/manage-multiple-environments#api-sharding" >}}) to control availability of APIs across multi-gateway, multi-environment deployments. This ensures that specific APIs are only available through specific gateways, which helps to prevent undesirable situations, such as internal APIs being published to externally accessible gateways, or test API configurations reaching the production environment.