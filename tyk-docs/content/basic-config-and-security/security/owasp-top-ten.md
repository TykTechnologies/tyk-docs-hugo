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

The Open Web Application Security Project (OWASP) provides a top ten threat awareness document compiled by security experts. For more details on the OWASP project visit [https://www.owasp.org](https://www.owasp.org). Below are the top ten threats and how Tyk guards against them. For further details please refer to this 

## 1 - Broken Object Level Authorization (BOLA)

Broken Object Level Authorization (BOLA) can occur due to a lack of access control to API resources. This vulnerability allows attackers to manipulate or bypass authorization mechanisms, typically by tampering with resource identifiers to gain unauthorized access to specific resources or data. BOLA is a critical security concern as it can lead to data breaches and unauthorized actions within a system.

Tyk supports managing BOLA by implementing object-level authorization through the following mechanisms:
- [Direct integration]({{< ref "plugins/auth-plugins" >}}) and [IdPs]({{< ref "advanced-configuration/integrate/3rd-party-identity-providers" >}}).
- Using [path-based permissions]({{< ref "security/security-policies/secure-apis-method-path" >}}) for fine-grained resource access control.
- Using [field-based permissions]({{< ref "graphql/field-based-permissions" >}}) to restrict access to specific types and fields within GraphQL schemas. 


## 2 - Broken User Authentication

Ensuring user authentication is a vital aspect of API security. Failure to do so, as noted by OWASP, leads to *Broken User Authentication* posing a significant risk to both API providers and user data.

Tyk provides the following features and authentication mechanisms:
-  Prioritize secure methods, like [mutual TLS]({{< ref "basic-config-and-security/security/mutual-tls" >}}), over [basic authentication]({{< ref "basic-config-and-security/security/authentication-authorization/basic-auth#what-is-basic-authentication" >}}) wherever feasible.
- API owners can integrate external Identity Providers (IdPs) supporting methods like [OpenID Connect]({{< ref "basic-config-and-security/security/authentication-authorization/openid-connect" >}}), [OAuth 2.0]({{< ref "basic-config-and-security/security/authentication-authorization/oauth2-0/auth-code-grant" >}}) or [JSON Web Tokens]({{< ref "basic-config-and-security/security/authentication-authorization/json-web-tokens" >}}).
- [Single Sign-On]({{< ref "advanced-configuration/integrate/sso" >}}) can be used for a centralized and trusted authentication source. API operators can choose from common authentication methods such as OAuth 2.0, LDAP, and SAML.
- [Dynamic Client Registration]({{< ref "tyk-developer-portal/tyk-portal-classic/dynamic-client-registration/#oauth-20-dynamic-client-registration-protocol-dcr" >}}), enables third-party authorization servers to issue client credentials via the Tyk Developer Portal. This streamlines Identity Management, eliminating the need to manage credentials across multiple systems.
- Tyk's default authentication setup disallows credentials in URLs, reducing the risk of inadvertent exposure through backend logs.
- Tyk Gateway can be configured to enforce a [minimum TLS version]({{< ref "basic-config-and-security/security/tls-and-ssl/#values-for-tls-versions" >}}), enhancing security by blocking outdated and insecure TLS versions.

## 3 - Excessive data exposure

Tyk has [body transformation plugins]({{< ref "advanced-configuration/transform-traffic/request-method-transform" >}}) which can be used to remove sensitive data from the response. This is compatible with responses which use JSON or XML data formats.

Tyk’s GraphQL engine allows it to act as a GraphQL server. Included in this is the ability to define the schema which clients can use to request data. By removing sensitive data from this schema, Tyk prevents clients from being able to request it by [validating their GraphQL query]({{< ref "graphql/validation" >}}). For a more nuanced approach, it’s also possible to use [field-based permissions]({{< ref "graphql/field-based-permissions" >}}), which provides authorisation at a field level.

Tyk’s [Universal Data Graph]({{< ref "universal-data-graph" >}}) enables REST API endpoints to be added to [GraphQL API schemas]({{< ref "universal-data-graph/datasources/rest" >}}), enabling control over which fields can be queried.

## 4 - Lack of resources & rate limiting

APIs can become overwhelmed if the resources upon which they rely are fully consumed. In such situations, an API can no longer operate, and will no longer be able to service requests, or potentially even be unable to complete those currently in progress.

As an APIM product, Tyk Gateway can be configured to use the following out-of-the-box functionality when handling API traffic for legitimate users:

- [Circuit breaker]({{< ref "advanced-configuration/transform-traffic/endpoint-designer#circuit-breaker" >}})
- [Payload size limiter]({{< ref "advanced-configuration/transform-traffic/endpoint-designer#request-size-limit" >}})
- [Rate limiter / throttling]({{< ref "getting-started/key-concepts/rate-limiting" >}})
- [Caching]({< ref "basic-config-and-security/reduce-latency/caching#overview" >})
- [Enforced timeout]({{< ref "planning-for-production/ensure-high-availability/enforced-timeouts/" >}})
- [IP restriction]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-blacklisting#ip-blacklisting-middleware" >}})
- [GraphQL query complexity limiting]({{< ref "graphql/complexity-limiting/" >}})

For Denial of Service (DoS) attacks it’s recommended to use 3rd party services which are built to handle such threats.

## 5 - Broken Function Level Authorisation (BFLA)

To prevent Broken Functional Level Authorization (BFLA), client requests must be authorised correctly. This involves validating client permissions against the requested resources. Requests from clients with insufficient permissions must be rejected.

Tyk has several areas to assist with protection from BFLA threats:

- *Policies*: [Policies]({{< ref "getting-started/key-concepts/what-is-a-security-policy" >}}) are predefined sets of rules which grant access to particular APIs. These can include [path-based permissions]({{< ref "security/security-policies/secure-apis-method-path" >}}), which restrict access to particular paths and methods within an API. Clients can be assigned one or more policies which the Gateway will validate when it receives a request.
- *Access Control Plugins*: Tyk has plugins that control access to API endpoints. They are known as [whitelist]({{< ref "advanced-configuration/transform-traffic/endpoint-designer#whitelist" >}}) and [blacklist]({{< ref "advanced-configuration/transform-traffic/endpoint-designer#blacklist" >}}), and can be configured via the Endpoint Designer of an API Definition. Both plugins grant and deny access to API paths and methods, but do so in different ways, which makes them mutually exclusive. When the whitelist plugin is used, only the paths and methods marked as whitelist are allowed, all other paths and methods are blocked. The reverse is true for the blacklist plugin, only the paths and methods marked as blacklist are blocked, all other paths and methods are allowed.

## 6 - Mass Assignment

The Mass Assignment vulnerability occurs when there is a lack of data input validation that allows an attacker to modify data or elevate privileges by manipulating payload data. 

With Tyk this can be achieved through validating:
- payload
- authentication and authorisation

Payload validation can be implemented in various ways with the Tyk APIM.

1. [JSON Schema validation]({{< ref "advanced-configuration/transform-traffic/validate-json" >}}) to ensure the payload meets the defined schema and rejects payloads that do not.
2. [Body Transformation]({{< ref "transform-traffic/request-body" >}}) allows using [string template]({{< ref "text/template" >}}) syntax, which is a powerful tool for generating the desired output from the input.
3. [Custom Plugins]({{< ref "plugins/" >}}) for more complex cases or logic not satisfied by the first 2, users can write custom plugins in a variety of languages, either directly or through *gRPC* calls, to implement their requirements.
4. [Request Method Transformation]({{< ref "advanced-configuration/transform-traffic/request-method-transform" >}}) while not directly a Mass Assignment prevention, can help ensure that APIs are called with the correct methods.

With respect to validation authentication and authorisation, Tyk also recommends considering splitting Admin APIs from client facing APIs. This allows payload validation methods, authentication and authorisation checks to be defined and managed by different governance models, thus establishing clear role models.

Additionally an APIM can validate authentication and authorisation by scope.  This ensures that the client has the correct credentials before the API processes the request.

## 7 - Security Misconfiguration

Tyk offers several mechanisms to help protect API from Security Misconfiguration exploits:

- Response Headers can be [manipulated]({{< ref "advanced-configuration/transform-traffic/response-headers" >}}) to remove or modify API response headers containing sensitive information..
- Response Body [manipulation]({{< ref "advanced-configuration/transform-traffic/response-body" >}}) can be implemented to remove or modify parts of the API response body containing sensitive information.
- Use [TLS]({{< ref "basic-config-and-security/security/tls-and-ssl" >}}) to ensure that clients use the right servie and encrypt traffic.
- Use [Mutual TLS]({{< ref "basic-config-and-security/security/mutual-tls" >}}) with both the clients and API to ensure that callers with explicitly whitelisted client certificates can connect to the endpoints.
- [Error Templates]({{< ref "advanced-configuration/error-templates" >}}) can be used to return a response body based on status code and content type. This can help minimise the implementation details returned to the client.
- [CORS functionality]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/cors" >}}) allows the Tyk Gateway to limit API access to particular browser-based consumers.
- [Policy Path-Based Permissions]({{< ref "security/security-policies/secure-apis-method-path" >}}) and the [Whitelist]({{< ref "advanced-configuration/transform-traffic/endpoint-designer#whitelist" >}}) plugin can be used to prevent clients from accessing API endpoints using non-authorised HTTP methods. For example, blocking the use of the DELETE method on an endpoint which should only accept GET requests.
- The use of environment variables({{< ref "tyk-environment-variables" >}}) can help standardise configuration across containerised deployments.
- For GraphQL APIs:
  - [Schema Introspection]({{< ref "graphql/introspection" >}}) ensures that the Tyk Dashboard automatically uses the schema of the upstream GraphQL API and can keep it synchronised if it changes.
  - [GraphQL Schema Validation]({{< ref "graphql/validation#schema-validation" >}}) prevents invalid schemas from being saved. This catches errors such as duplicate type names and usage of unknown types.
- Use third-party [Secret Storage]({{< ref "tyk-configuration-reference/kv-store" >}}) to centralise configuration of sensitive data such as passwords. This data can then be dynamically referenced by Tyk configuration files, rather than hard coded.
- Users can can write their own [custom plugins]({{< ref "plugins" >}}) in a variety of languages, either directly or through gRPC calls, to implement their requirements.

APIM owners should schedule regular [Penetration Tests](https://en.wikipedia.org/wiki/Penetration_test) to ensure the security of their published services.  Tyk, through our Professional Services or Partners, can assist in the process.

## 8 - Injection

Injection vulnerabilities can be difficult to deal with since they are implementation specific. It is best to validate input at all levels before being passed upstream for possible injection attacks. Tyk offers a number of ways in which input can be validated:

- [JSON Schema validation]({{< ref "advanced-configuration/transform-traffic/validate-json" >}}) to ensure the payload meets the defined schema and rejects payloads that do not.
- [Body Transformation]({{< ref "transform-traffic/request-body" >}}) allows using [string template](https://pkg.go.dev/text/template) syntax, which is a powerful tool for generating the desired output from the input.
- [Custom Plugins]({< ref "plugins" >}) for more complex cases or logic not satisfied by the first 2. Users can write custom plugins in a variety of languages, either directly or through gRPC calls, to perform custom validation.

## 9 - Asset Management

Tyk offers the following features to support asset management:

- [Versioning]({{< ref "getting-started/key-concepts/versioning" >}}) allows newer versions of APIs to coexist with the older versions, facilitating deprecation and sunsetting.
- [Sunsetting]({{< ref "getting-started/key-concepts/versioning#sunsetting-api-versions" >}}) allows versions to be configured with an Expiry Time, ensuring that a version is sunset.
- [Key expiry]({{< ref "basic-config-and-security/control-limit-traffic/key-expiry" >}}) ensures that access to an API is short lived, with a per key configurable Time to Live.
- Tyk Developer Portal catalogues APIs and facilitates granting access to them.  Integrated with a CMDB it can help keep documentation updated.
- [Tyk Analytics]({{< ref "tyk-dashboard-analytics" >}}) can help identify the stagnant APIs and used stale APIs.
- [Tyk Pump]({{< ref "tyk-pump" >}}) can ship metrics needed for analytics into Tyk Dashboard and other systems.
- Third-party [Secret Storage]({{< ref "tyk-configuration-reference/kv-store" >}}) can be used to centralise and protect sensitive configuration data such as passwords, rather than exposing them as plain text in Tyk configuration files.

In addition a good best practice is to consider any definition of done to include corresponding documentation updates.


## 10 - Logging thingy

Based on the [OWASP logging cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) Tyk provides information and feedback in various ways:
- [Logs of multiple verbosity]({{< ref "advanced-configuration/log-data" >}}), depending on your situation.
- Integration with [3rd party aggregated log and error tools]({{< ref "advanced-configuration/log-data#integration-with-3rd-party-aggregated-log-and-error-tools" >}}). Tyk logger supports multiple back-ends such as Sentry, Graylog and Logstash.
- System level [analytics]({{< ref "basic-config-and-security/report-monitor-trigger-events/instrumentation" >}}) exposed via *StatsD* and various other loggers (instrumentation).
- Request analytics with different ways of [detailed recording]({{< ref "analytics-and-reporting/useful-debug-modes" >}}) on the request level and the key level. Data per data, including its content can be viewed in real-time in Tyk Dashboard. You can also choose to send the data to [external services]({{< ref "tyk-configuration-reference/tyk-pump-configuration/tyk-pump-configuration#supported-backends" >}}) to analyze your logs.
- [OpenTracing]({{< ref "advanced-configuration/opentracing" >}}) to allow services, which have distributed tracing enabled, for instrumentation to work seamless with Tyk gateway.
- Tyk has the ability to configure APIs with [event handlers]({{< ref "basic-config-and-security/report-monitor-trigger-events" >}}) to log data or fire webhooks when an event occurs. [Events]({{< ref "basic-config-and-security/report-monitor-trigger-events/event-types" >}}) could represent an authentication failure, exceeded rate-limit, misuse of api version etc.
- The API Gateway [Event]({{< ref "basic-config-and-security/report-monitor-trigger-events/event-types" >}}) system dynamically triggers handlers in real time when particular events occur. The handler is provided with contextual data about the event, such as authentication failure, which it sends to its defined target. Tyk provides two built-in handlers, a [Webhook]({{< ref "basic-config-and-security/report-monitor-trigger-events/webhooks" >}}) and a File logger. Furthermore, there is also the option to handle events using custom JavaScript code.
- [Audit logs](/docs/release-notes/version-2.8/#dashboard-audit-log-improvements) for the management layer - to record all activity and changed done by the users of the API Management.

**Note:** Tyk usually acts as a centralized service bus, which reduces the insecure deserialization of services.
