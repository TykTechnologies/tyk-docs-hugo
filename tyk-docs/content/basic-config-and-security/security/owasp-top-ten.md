---
date: 2017-03-23T16:58:50Z
title: Tyk and OWASP Top Ten Threats
tags: ["OWASP", "Security", "Top Ten"]
description: "How Tyk guards agains the OWASP top ten threats"
menu:
  main:
    parent: "Security"
weight: 9
---

The Open Web Application Security Project (OWASP) provides a top ten threat awareness document compiled by security experts. For more details on the OWASP project visit [https://www.owasp.org](https://www.owasp.org). Below are the top ten threats and how Tyk guards against them. For further details please visit our [blog](https://tyk.io/blog/res-owasp-api-security-10-insufficient-logging-monitoring/)

## 1 - Broken Object Level Authorization (BOLA)

Broken Object Level Authorization (BOLA) can occur due to a lack of access control to API resources. This vulnerability allows attackers to manipulate or bypass authorization mechanisms, typically by tampering with resource identifiers to gain unauthorized access to specific resources or data. BOLA is a critical security concern as it can lead to data breaches and unauthorized actions within a system.

It is the responsibility of the API to handle this form of attack since it can access and understand the data needed to make authorisation decisions on individual objects within the application database.

## 2 - Broken User Authentication

Ensuring user authentication is a vital aspect of API security. Failure to do so, as noted by OWASP, leads to *Broken User Authentication* posing a significant risk to both API providers and user data.

Tyk provides the following features and authentication mechanisms:
-  Prioritize secure methods, like [mutual TLS]({{< ref "basic-config-and-security/security/mutual-tls" >}}), over [basic authentication]({{< ref "basic-config-and-security/security/authentication-authorization/basic-auth#what-is-basic-authentication" >}}) wherever feasible.
- API owners can integrate external Identity Providers (IdPs) supporting methods like [OpenID Connect]({{< ref "basic-config-and-security/security/authentication-authorization/openid-connect" >}}), [OAuth 2.0]({{< ref "basic-config-and-security/security/authentication-&-authorization/oauth2-0/auth-code-grant#exchange-code-for-a-token" >}}) or [JSON Web Tokens]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}).
- [Single Sign-On]({{< ref "advanced-configuration/integrate/sso" >}}) can be used for a centralized and trusted authentication source. API operators can choose from common authentication methods such as OAuth 2.0, LDAP, and SAML.
- [Dynamic Client Registration]({{< ref "tyk-developer-portal/tyk-portal-classic/dynamic-client-registration#oauth-20-dynamic-client-registration-protocol-dcr" >}}), enables third-party authorization servers to issue client credentials via the Tyk Developer Portal. This streamlines Identity Management, eliminating the need to manage credentials across multiple systems.
- Tyk's default authentication setup disallows credentials in URLs, reducing the risk of inadvertent exposure through backend logs.
- Tyk Gateway can be configured to enforce a [minimum TLS version]({{< ref "basic-config-and-security/security/tls-and-ssl#values-for-tls-versions" >}}), enhancing security by blocking outdated and insecure TLS versions.

## 3 - Broken Object Property Level Authorisation (BOPLA)

Rest APIs provide endpoints that return all properties of an object in the reponse, some of which could contain sensitive data. Conversely, GraphQL APIs requests allow the clients to specificy which properties of an object should be retrieved. Subsequently, these require greater effort from the attacker to discover.

From a REST API perspespective, it is the responsibility of the API to ensure that the correct data is retrieved. The Gateway can provide additional security measures as follows:
- [Body transformation plugins]({{< ref "advanced-configuration/transform-traffic/request-method-transform" >}}) can be used to remove sensitive data from the response if the API is unable to do so itself.
- [JSON Schema validation]({{< ref "advanced-configuration/transform-traffic/validate-json" >}}) to validate that an incoming data payload meets a defined schema. Payloads that do not adhere to the schema are rejected.

For GraphQL APIs, the gateway can be used to define the GraphQL schemas, limiting which properties of an object are queryable. Furthermore, access can be controlled to specific properties by configuring [field-based permissions]({{< ref "graphql/field-based-permissions" >}}). Subsequently, the visiblity of a schema's properties can be controlled for different consumers of the GraphQL API.


## 4 - Lack of resources & rate limiting

APIs can become overwhelmed if the resources upon which they rely are fully consumed. In such situations, an API can no longer operate, and will no longer be able to service requests, or potentially even be unable to complete those currently in progress.

As an APIM product, Tyk Gateway can be configured to use the following out-of-the-box functionality when handling API traffic for legitimate users:

- [Circuit breaker]({{< ref "advanced-configuration/transform-traffic/endpoint-designer#circuit-breaker" >}})
- [Payload size limiter]({{< ref "advanced-configuration/transform-traffic/endpoint-designer#request-size-limit" >}})
- [Rate limiter / throttling]({{< ref "getting-started/key-concepts/rate-limiting" >}})
- [Caching]({{< ref "basic-config-and-security/reduce-latency/caching" >}})
- [Enforced timeout]({{< ref "planning-for-production/ensure-high-availability/enforced-timeouts" >}})
- [IP restriction]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-blacklisting#ip-blacklisting-middleware" >}})
- [GraphQL query complexity limiting]({{< ref "graphql/complexity-limiting" >}})

For Denial of Service (DoS) attacks it’s recommended to use 3rd party services which are built to handle such threats.

## 5 - Broken Function Level Authorisation (BFLA)

To prevent Broken Functional Level Authorization (BFLA), requests to REST API endpoints must be authorised correctly. This involves validating client permissions against the requested resources. Requests from clients with insufficient permissions must be rejected.

Tyk offers several measures to assist with protection from BFLA threats:

- *Establish path-based access rights*: [Policies]({{< ref "getting-started/key-concepts/what-is-a-security-policy" >}}) are predefined sets of rules which grant access to particular APIs. These can include [path-based permissions]({{< ref "security/security-policies/secure-apis-method-path" >}}), which restrict access to particular paths and methods within an API. Clients can be assigned one or more policies which the Gateway will validate when it receives a request.
- *Access Control*: Tyk has plugins that control access to API endpoints. They are known as [whitelist]({{< ref "advanced-configuration/transform-traffic/endpoint-designer#whitelist" >}}) and [blacklist]({{< ref "advanced-configuration/transform-traffic/endpoint-designer#blacklist" >}}) and can be configured via the Endpoint Designer of an API Definition. Both plugins grant and deny access to API paths and methods, but do so in different ways, which makes them mutually exclusive. When the whitelist plugin is used, only the paths and methods marked as whitelist are allowed, all other paths and methods are blocked. This can be perceived as *deny by default* since it provides the least privileges. The reverse is true for the blacklist plugin, only the paths and methods marked as blacklist are blocked, all other paths and methods are allowed. It is recommended to use the *whitelist* approach, since it is the most restrictive, only endpoint paths and paths marked as whitelist are allowed. 
- *CORS*: This [functionality]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/cors" >}}) allows the Tyk Gateway to limit API access to particular browser-based consumers.

## 6 - Mass Assignment

The Mass Assignment vulnerability occurs when there is a lack of data input validation that allows an attacker to modify data or elevate privileges by manipulating payload data. 

With Tyk this can be achieved through validating:
- payload
- authentication and authorisation

Payload validation can be implemented in various ways with the Tyk APIM.

1. [JSON Schema validation]({{< ref "advanced-configuration/transform-traffic/validate-json" >}}) to ensure the payload meets the defined schema and rejects payloads that do not.
2. [Body Transformation]({{< ref "transform-traffic/request-body" >}}) allows using [string template](https://pkg.go.dev/text/template) syntax, which is a powerful tool for generating the desired output from the input.
3. [Custom Plugins]({{< ref "plugins/" >}}) for more complex cases or logic not satisfied by the first 2, users can write custom plugins in a variety of languages, either directly or through *gRPC* calls, to implement their requirements.
4. [Request Method Transformation]({{< ref "advanced-configuration/transform-traffic/request-method-transform" >}}) while not directly a Mass Assignment prevention, can help ensure that APIs are called with the correct methods.

With respect to validation authentication and authorisation, Tyk also recommends considering splitting Admin APIs from client facing APIs. This allows payload validation methods, authentication and authorisation checks to be defined and managed by different governance models, thus establishing clear role models.

Additionally an APIM can validate authentication and authorisation by scope.  This ensures that the client has the correct credentials before the API processes the request.

## 7 - Server Side Request Forgery (SSRF)

Server Side Request Forgery (SSRF) is a security vulnerability in web applications where an attacker can manipulate a server to make unauthorized requests to internal or external resources, potentially leading to data leaks or remote code execution. This can allow an attacker to probe or attack other parts of the application's infrastructure, potentially compromising sensitive information and systems.

This is application specific and is largely the responsibility of the API. However, Tyk Gateway can assist with this form of attack through [JSON schema validation]({{< ref "advanced-configuration/transform-traffic/validate-json" >}})) for incoming payloads. For example, a schema could contain a regular expression to reject localhost URLs. These URLs could be used by an attacker to perform port scanning for example.

## 8 - Security Misconfiguration

Tyk offers several mechanisms to help protect an API from Security Misconfiguration exploits:

- [Manipulate]({{< ref "advanced-configuration/transform-traffic/response-headers" >}}) response headers to remove or modify API sensitive information..
- [Manipulate]({{< ref "advanced-configuration/transform-traffic/response-body" >}}) the response body to remove or modify parts containing sensitive information.
- [TLS]({{< ref "basic-config-and-security/security/tls-and-ssl" >}}) to ensure that clients use the right service and encrypt traffic.
- [Mutual TLS]({{< ref "basic-config-and-security/security/mutual-tls" >}}) with both the clients and API to ensure that callers with explicitly whitelisted client certificates can connect to the endpoints.
- [Error Templates]({{< ref "advanced-configuration/error-templates" >}}) can be used to return a response body based on status code and content type. This can help minimise the implementation details returned to the client.
- [CORS functionality]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/cors" >}}) allows the Tyk Gateway to limit API access to particular browser-based consumers.
- [Policy Path-Based Permissions]({{< ref "security/security-policies/secure-apis-method-path" >}}) and the [Whitelist]({{< ref "advanced-configuration/transform-traffic/endpoint-designer#whitelist" >}}) plugin can be used to prevent clients from accessing API endpoints using non-authorised HTTP methods. For example, blocking the use of the DELETE method on an endpoint which should only accept GET requests.
- [Environment variables]({{< ref "tyk-environment-variables" >}}) can help standardise configuration across containerised deployments.
- For GraphQL APIs:
  - [Schema Introspection]({{< ref "graphql/introspection" >}}) ensures that the Tyk Dashboard automatically uses the schema of the upstream GraphQL API and can keep it synchronised if it changes.
  - [GraphQL Schema Validation]({{< ref "graphql/validation#schema-validation" >}}) prevents invalid schemas from being saved. This catches errors such as duplicate type names and usage of unknown types.
- Third-party [Secret Storage]({{< ref "tyk-configuration-reference/kv-store" >}}) to centralise configuration of sensitive data such as passwords. This data can then be dynamically referenced by Tyk configuration files, rather than being hard coded.
- Users can can write their own [custom plugins]({{< ref "plugins" >}}) in a variety of languages, either directly or through gRPC calls, to implement their requirements.

The Ops team should also take reponsibility for monitoring the APIs for errors and patching accordingly. Regular [Penetration Tests](https://en.wikipedia.org/wiki/Penetration_test) should be scheduled to ensure the security of published services. Tyk, through our Professional Services or Partners, can assist in the process.


## 9 - Improper Inventory Management

Tyk offers the following features to support improper inventory management:

- [Versioning]({{< ref "getting-started/key-concepts/versioning" >}}) allows newer versions of APIs to coexist with the older versions, facilitating deprecation and sunsetting.
- [Sunsetting]({{< ref "getting-started/key-concepts/versioning#sunsetting-api-versions" >}}) allows versions to be configured with an Expiry Time, ensuring that a version is sunset.
- [Key expiry]({{< ref "basic-config-and-security/control-limit-traffic/key-expiry" >}}) ensures that access to an API is short lived, with a per key configurable Time to Live.
- Tyk Developer Portal catalogues APIs and facilitates granting access to them.  Integrated with a CMDB it can help keep documentation updated.
- [Tyk Analytics]({{< ref "tyk-dashboard-analytics" >}}) can help identify the stagnant APIs and used stale APIs.
- [Tyk Pump]({{< ref "tyk-pump" >}}) can ship metrics needed for analytics into Tyk Dashboard and other systems.
- Third-party [Secret Storage]({{< ref "tyk-configuration-reference/kv-store" >}}) can be used to centralise and protect sensitive configuration data such as passwords, rather than exposing them as plain text in Tyk configuration files.

In addition a good best practice is to consider any definition of done to include corresponding documentation updates.

## 10 - Unsafe Consumption Of APIs 

Attackers may identify and target the third party APIs/services used by an API. This can lead to leaked sensitive information, denial of service, injection attacks etc.

It is the responsibility of the API to provide protection against these attacks. However, if the organisation uses the Gateway as a forwarding proxy to third party APIs, then the following features could be used:

- [JSON Schema validation]({{< ref "advanced-configuration/transform-traffic/validate-json" >}}) to validate that an incoming data payload meets a defined schema. Payloads that do not adhere to the schema are rejected.
- [TLS]({{< ref "basic-config-and-security/security/tls-and-ssl" >}}) to ensure that clients use the right service and encrypt traffic.
- [Versioning]({{< ref "getting-started/key-concepts/versioning" >}}) allows newer versions of third party APIs to coexist with the older versions, facilitating deprecation and sunsetting.
