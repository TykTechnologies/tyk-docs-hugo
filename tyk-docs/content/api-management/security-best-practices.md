---
title: Security Best Practices new
description: "Guide on API management and security best practices, including authentication, authorization, resource protection, governance, and OWASP threat mitigation with Tyk."
tags: ["OWASP", "Security", "Top Ten", "API Management best practice", "API Security", "Authentication", "Security", "Configuration", "SSL", "Certificates", "Authentication", "Authorization", "API security", "API Gateway Security"]
aliases:
  - /advanced-configuration/integrate/api-auth-mode/json-web-tokens
  - /security/
  - /apim-best-practice/overview
  - /apim-best-practice/api-security-best-practice/overview
  - /apim-best-practice/api-security-best-practice/authentication
  - /apim-best-practice/api-security-best-practice/authorisation
  - /apim-best-practice/api-security-best-practice/authorisation-levels
  - /apim-best-practice/api-security-best-practice/resource-consumption
  - /apim-best-practice/api-security-best-practice/configuration
  - /apim-best-practice/api-security-best-practice/governance
  - /basic-config-and-security/security
  - /basic-config-and-security/security/owasp-top-ten
---

## Overview

This section serves as a detailed resource for understanding key concepts and tools related to API security. It provides explanations of critical practices such as authentication, authorization, and governance, offering insights into how these concepts work and why they matter. Whether you're looking to mitigate threats identified by the [OWASP API Security Top 10](https://owasp.org/API-Security/editions/2023/en/0x00-header/) or to configure your APIs for better resilience, this page breaks down the essentials.

Two of the most prevalent topics are [authentication]({{< ref "#authentication" >}}) and [authorization]({{< ref "#authorization" >}}), which occupy four of the top five positions. These are critical elements of API security, which verify the identity of API clients and control what they’re able to do. Alongside these are a number of other beneficial topics that are also within the remit of API management, all of which will be covered in this section. These include:

- [Governance]({{< ref "#governing-apis-effectively" >}})
- [Configuration]({{< ref "#configuration-best-practices" >}})
- [Resource Consumption]({{< ref "#managing-api-resources" >}})

## Mitigating The Top 10 OWASP Threats 

The Open Web Application Security Project (OWASP) provides a top ten threat awareness document compiled by security experts. For more details on the OWASP project visit [https://www.owasp.org](https://www.owasp.org). Below are the top ten threats and how Tyk guards against them. For further details please visit our [blog](https://tyk.io/blog/res-owasp-api-security-intro/)

##### 1 - Broken Object Level Authorization (BOLA)

Broken Object Level Authorization (BOLA) can occur due to a lack of access control to API resources. This vulnerability allows attackers to manipulate or bypass authorization mechanisms, typically by tampering with resource identifiers to gain unauthorized access to specific resources or data. BOLA is a critical security concern as it can lead to data breaches and unauthorized actions within a system.

It is the responsibility of the API to handle this form of attack since it can access and understand the data needed to make authorization decisions on individual objects within the application database.

##### 2 - Broken Authentication

Authentication is a vital aspect of API security. Failure to do so, as noted by OWASP, leads to *Broken Authentication* posing a significant risk to both API providers and data.

Tyk provides the following features and authentication mechanisms:
-  Prioritize secure methods, like [mutual TLS]({{< ref "/api-management/client-authentication#use-mutual-tls" >}}), over [basic authentication]({{< ref "/api-management/client-authentication#use-basic-authentication" >}}) wherever feasible.
- API owners can integrate external Identity Providers (IdPs) supporting methods like [OpenID Connect]({{< ref "/api-management/client-authentication#integrate-with-openid-connect-deprecated" >}}), [OAuth 2.0]({{< ref "/api-management/client-authentication#using-the-authorization-code-grant" >}}) or [JSON Web Tokens]({{< ref "/api-management/client-authentication#use-json-web-tokens-jwt" >}}).
- [Single Sign-On]({{< ref "advanced-configuration/integrate/sso" >}}) can be used for a centralized and trusted authentication source. API operators can choose from common authentication methods such as OAuth 2.0, LDAP, and SAML.
- [Dynamic Client Registration]({{< ref "tyk-developer-portal/tyk-portal-classic/dynamic-client-registration#oauth-20-dynamic-client-registration-protocol-dcr" >}}), enables third-party authorization servers to issue client credentials via the Tyk Developer Portal. This streamlines Identity Management, eliminating the need to manage credentials across multiple systems.
- Tyk's default authentication setup disallows credentials in URLs, reducing the risk of inadvertent exposure through backend logs.
- Tyk Gateway can be configured to enforce a [minimum TLS version]({{< ref "api-management/certificates#supported-tls-versions" >}}), enhancing security by blocking outdated and insecure TLS versions.

##### 3 - Broken Object Property Level Authorization (BOPLA)

REST APIs provide endpoints that return all properties of an object in the reponse, some of which could contain sensitive data. Conversely, GraphQL API requests allow the clients to specify which properties of an object should be retrieved.

From a REST API perspespective, it is the responsibility of the API to ensure that the correct data is retrieved. The Gateway can provide additional security measures as follows:
- [Body transformation plugins]({{< ref "advanced-configuration/transform-traffic/request-method-transform" >}}) can be used to remove sensitive data from the response if the API is unable to do so itself.
- [JSON Schema validation]({{< ref "product-stack/tyk-gateway/middleware/validate-request-tyk-classic" >}}) to validate that an incoming data payload meets a defined schema. Payloads that do not adhere to the schema are rejected.

For GraphQL APIs, the gateway can be used to define the GraphQL schemas, limiting which properties of an object are queryable. Furthermore, access can be controlled to specific properties by configuring [field-based permissions]({{< ref "graphql/field-based-permissions" >}}). Subsequently, the visiblity of a schema's properties can be controlled for different consumers of the GraphQL API.


##### 4 - Unrestricted Resource Consumption

APIs can become overwhelmed if the resources upon which they rely are fully consumed. In such situations, an API can no longer operate, and will no longer be able to service requests, or potentially even be unable to complete those currently in progress.

As an APIM product, Tyk Gateway can be configured to use the following out-of-the-box functionality when handling API traffic for legitimate users:

- [Circuit breaker]({{< ref "tyk-self-managed#circuit-breakers" >}})
- [Payload size limiter]({{< ref "basic-config-and-security/control-limit-traffic/request-size-limits" >}})
- [Rate limiter / throttling]({{< ref "api-management/rate-limit#introduction" >}})
- [Caching]({{< ref "basic-config-and-security/reduce-latency/caching" >}})
- [Enforced timeout]({{< ref "tyk-self-managed#enforced-timeouts" >}})
- [IP restriction]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-blacklisting#ip-blocklist-middleware" >}})
- [GraphQL query complexity limiting]({{< ref "graphql/complexity-limiting" >}})

For Denial of Service (DoS) attacks it is recommended to use specialist 3rd party services to prevent DoS attacks from reaching your infrastructure.

##### 5 - Broken Function Level Authorization (BFLA)

To prevent Broken Functional Level Authorization (BFLA), requests to REST API endpoints must be authorized correctly. This involves validating client permissions against the requested resources. Requests from clients with insufficient permissions must be rejected.

Tyk offers several measures to assist with protection from BFLA threats:

- *Establish path-based access rights*: [Policies]({{< ref "api-management/policies#what-is-a-security-policy" >}}) are predefined sets of rules which grant access to particular APIs. These can include [path-based permissions]({{< ref "api-management/policies#secure-your-apis-by-method-and-path" >}}), which restrict access to particular paths and methods within an API. Clients can be assigned one or more policies which the Gateway will validate when it receives a request.
- *Access Control*: Tyk has plugins that control access to API endpoints. They are known as [allowlist]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-oas#configuring-the-allow-list-in-the-tyk-oas-api-definition" >}}) and [blocklist]({{< ref "product-stack/tyk-gateway/middleware/block-list-tyk-oas#configuring-the-block-list-in-the-api-designer" >}}) and can be configured via the Endpoint Designer of an API Definition. Both plugins grant and deny access to API paths and methods, but do so in different ways, which makes them mutually exclusive. When the allowlist plugin is used, only the marked paths and methods are allowed, all other paths and methods are blocked. This can be perceived as *deny by default* since it provides the least privileges. The reverse is true for the blocklist plugin, only the paths and methods marked as blocklist are blocked, all other paths and methods are allowed. It is recommended to use the *allowlist* approach, since it is the most restrictive, only allowing marked endpoint paths and paths.
- *CORS*: This [functionality]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/cors" >}}) allows the Tyk Gateway to limit API access to particular browser-based consumers.

##### 6 - Unrestricted Access To Sensitive Business Flows

This involves attackers understanding an API's business model, identifying sensitive business processes and automating unauthorized access to these processes. This can disrupt business operations by preventing legitimate users from making purchases for example. Attackers manually locate target resources and work to bypass any existing mitigation measures.

These business flows are application specific, being unique to the API's backend systems. Subsequently, the API owner is responsible for addressing the security issues posed by this threat. Furthermore, to discover points of exploitation and test IT security breaches, pentesting is recommended.

The APIM can be used to protect sensitive endpoints using authentication and authorization. Tyk recommends considering splitting Admin APIs from client facing APIs. This allows authentication and authorization checks to be defined and managed by different governance models, thus establishing clear role models.

Furthermore, the APIM can validate authentication and authorization by scope to ensure that the client has the correct credentials before the upstream API processes the request.

##### 7 - Server Side Request Forgery (SSRF)

Server Side Request Forgery (SSRF) is a security vulnerability in web applications where an attacker can manipulate a server to make unauthorized requests to internal or external resources, potentially leading to data leaks or remote code execution. This can allow an attacker to probe or attack other parts of the application's infrastructure, potentially compromising sensitive information and systems.

This is application specific and is largely the responsibility of the API. However, Tyk Gateway can assist with this form of attack through [JSON schema validation]({{< ref "product-stack/tyk-gateway/middleware/validate-request-tyk-classic" >}}) for incoming payloads. For example, a schema could contain a regular expression to reject localhost URLs. These URLs could be used by an attacker to perform port scanning for example.

##### 8 - Security Misconfiguration

Tyk offers several mechanisms to help protect an API from Security Misconfiguration exploits:

- Use [response header manipulation]({{< ref "advanced-configuration/transform-traffic/response-headers" >}}) to remove or modify API sensitive information.
- Use [response body manipulation]({{< ref "advanced-configuration/transform-traffic/response-body" >}}) to remove or modify parts containing sensitive information.
- [TLS]({{< ref "api-management/certificates" >}}) to ensure that clients use the right service and encrypt traffic.
- [Mutual TLS]({{< ref "/api-management/client-authentication#use-mutual-tls" >}}) with both the clients and API to ensure that callers with explicitly allowed client certificates can connect to the endpoints.
- [Error Templates]({{< ref "advanced-configuration/error-templates" >}}) can be used to return a response body based on status code and content type. This can help minimize the implementation details returned to the client.
- [CORS functionality]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/cors" >}}) allows the Tyk Gateway to limit API access to particular browser-based consumers.
- [Policy Path-Based Permissions]({{< ref "api-management/policies#secure-your-apis-by-method-and-path" >}}) and the [allowlist]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-oas#configuring-the-allow-list-in-the-tyk-oas-api-definition" >}}) plugin can be used to prevent clients from accessing API endpoints using non-authorized HTTP methods. For example, blocking the use of the DELETE method on an endpoint which should only accept GET requests.
- [Environment variables]({{< ref "tyk-environment-variables" >}}) can help standardize configuration across containerised deployments.
- For GraphQL APIs:
- [Schema Introspection]({{< ref "graphql/introspection" >}}) ensures that the Tyk Dashboard automatically uses the schema of the upstream GraphQL API and can keep it synchronised if it changes.
- [GraphQL Schema Validation]({{< ref "graphql/validation#schema-validation" >}}) prevents invalid schemas from being saved. This catches errors such as duplicate type names and usage of unknown types.
- Third-party [Secret Storage]({{< ref "tyk-self-managed#manage-multi-environment-and-distributed-setups" >}}) to centralise configuration of sensitive data such as passwords. This data can then be dynamically referenced by Tyk configuration files, rather than being hard coded.
- Users can can write their own [custom plugins]({{< ref "plugins" >}}) in a variety of languages, either directly or through gRPC calls, to implement their requirements.

The Ops team should also take reponsibility for monitoring the APIs for errors and patching accordingly. Regular [Penetration Tests](https://en.wikipedia.org/wiki/Penetration_test) should be scheduled to ensure the security of published services. Tyk, through our Professional Services or Partners, can assist in the process.

##### 9 - Improper Inventory Management

Tyk offers the following features to support improper inventory management:

- [Versioning]({{< ref "api-management/api-versioning#tyk-classic-api-versioning-1" >}}) allows newer versions of APIs to coexist with the older versions, facilitating deprecation and sunsetting.
- [Sunsetting]({{< ref "api-management/api-versioning#sunsetting-api-versions" >}}) allows versions to be configured with an Expiry Time, ensuring that a version is not accessible after the expiry date.
- [Key expiry]({{< ref "api-management/policies#access-key-expiry" >}}) ensures that access to an API is short lived, with a per key configurable Time to Live (TTL) for which a token remains valid before it expires. The implementation of key expiry, with a configurable Time To Live (TTL), mitigates the impact of compromised tokens by narrowing the window of vulnerability. Setting a TTL reduces the time frame during which a compromised token could be exploited, enhancing overall security.
- Tyk Developer Portal catalogs APIs and facilitates granting access to them.  Integrated with a CMDB it can help keep documentation updated.
- [Tyk Analytics]({{< ref "tyk-dashboard-analytics" >}}) can help identify the stagnant APIs and used stale APIs.
- [Tyk Pump]({{< ref "tyk-pump" >}}) can ship metrics needed for analytics into Tyk Dashboard and other systems.
- Third-party [Secret Storage]({{< ref "tyk-self-managed#manage-multi-environment-and-distributed-setups" >}}) can be used to centralise and protect sensitive configuration data such as passwords, rather than exposing them as plain text in Tyk configuration files.

In addition, it is best practice to consider any definition of done to include corresponding documentation updates.

##### 10 - Unsafe Consumption Of APIs

Attackers may identify and target the third party APIs/services used by an API. This can lead to leaked sensitive information, denial of service, injection attacks etc.

It is the responsibility of the API to provide protection against these attacks. However, if the organization uses the Gateway as a forwarding proxy to third party APIs, then the following features could be used:

- [JSON Schema validation]({{< ref "product-stack/tyk-gateway/middleware/validate-request-tyk-classic" >}}) to validate that an incoming data payload meets a defined schema. Payloads that do not adhere to the schema are rejected.
- [Versioning]({{< ref "api-management/api-versioning#tyk-classic-api-versioning-1" >}}) allows newer versions of third party APIs to coexist with the older versions, facilitating deprecation and sunsetting.
- [TLS]({{< ref "api-management/certificates" >}}) to ensure that clients use the right service and encrypt traffic.


## Managing Authentication and Authorization

### Authentication

Authentication is the process of identifying API clients. It’s a broad topic, with many approaches to choose from. Choosing the right approach is important, as it forms a fundamental part of the overall security strategy. The decision depends on many risk factors; users, functionality, data, accessibility and compliance, to name just a few. While there isn’t necessarily a single, correct choice, it’s usually safe to assume that some form of authentication is needed, as it’s a crucial prerequisite in performing subsequent identity-based authorization checks.

**Implement Appropriate Authentication**

Choose a suitable authentication approach based on the risk profile of the API. Is it publicly accessible or internal? Does it require user interaction or is it machine to machine? How sensitive is the data and functionality provided by the API? Simplistic approaches, such as [Bearer Tokens]({{< ref "/api-management/client-authentication#use-auth-tokens" >}}), can work for low risk, basic APIs, but for higher risk or more sophisticated APIs, it may be more appropriate to use a standards-based approach such as [OAuth 2.0]({{< ref "/api-management/client-authentication#use-tyk-as-an-oauth-20-authorization-server" >}}) or [OpenID Connect]({{< ref "/api-management/client-authentication#integrate-with-openid-connect-deprecated" >}}). Furthermore, using an [external identity provider]({{< ref "/api-management/client-authentication#integrate-with-external-authorization-server-deprecated" >}}) can deliver additional benefits, such as [single sign-on]({{< ref "advanced-configuration/integrate/sso" >}}), as well as multi-factor authentication approaches such as [biometric verification](https://www.okta.com/identity-101/biometrics-secure-authentication).

**Handle Data Securely**

Don’t undermine the authentication process by leaking sensitive authentication data. Use [transport layer security]({{< ref "api-management/certificates" >}}) and hashing to prevent credentials from being intercepted and stolen through insecure transmission and storage. These principles also apply to upstream requests made by the gateway and upstream API to other APIs and services.

**Enforce Good Practices**


Establish rules that reduce risk and enhance overall system security. Use [password policies]({{< ref "basic-config-and-security/security/password-policy" >}}) to prevent the use of weak passwords, and [TLS policies]({{< ref "api-management/certificates#supported-tls-versions" >}}) to prevent the use of older TLS versions that are now deprecated and considered vulnerable.

**Protect Sensitive Endpoints**

Reduce susceptibility of sensitive endpoints to brute force dictionary or password stuffing attacks. The typical target for this type of attack are endpoints that use credentials, such as login and password recovery. Unfortunately, anonymous access is required for these endpoints, so authentication cannot be used to protect them, so the best approach is to hinder access by using techniques such as [rate limiting]({{< ref "api-management/rate-limit#rate-limiting-layers" >}}), [captcha](https://en.wikipedia.org/wiki/CAPTCHA) and one-time URLs.


### Authorization 
Authorization is the process of validating API client requests against the access rights they have been granted, ensuring that the requests comply with any imposed limitations. It’s the most prevalent topic on the OWASP list, with three entries covering different levels of authorization.

Almost any part of a request can be scrutinised as part of authorization, but choosing the best approach depends on the type of API. For example, with REST APIs, the requested method and path are good candidates, but they aren’t relevant for GraphQL APIs, which should focus on the GraphQL query instead.

Authorization can be a complex process that occurs at multiple locations throughout the request lifecycle. For example, a gateway can use access control policies to determine whether a required path is acceptable. But for decisions based on object data, such as when a client requests a particular record from the database, it’s the API that’s best positioned, as only it has access to the necessary data. For more information about the authorization process, see Authorization Levels in the appendix.

#### Split Authorization

Implement authorization in the best locations across the stack. For an overview of the different authorization levels across the stack please visit this [page]({{< ref "#managing-authorization-levels" >}}). Use the gateway to handle general API authorization related to hosts, methods, paths and properties. This leaves the API to handle the finer details of object-level authorization. In terms of OWASPs authorization categories, it can be split as follows:

##### Object Level Authorization

Handle with the API. It can access and understand the data needed to make authorization decisions on individual objects within its database.

##### Object Property Level Authorization

Handle with both the API and the gateway. The approach depends on the type of API:

For REST APIs, it’s the API that’s primarily responsible for returning the correct data. To complement this, the gateway can use [body transforms]({{< ref "advanced-configuration/transform-traffic/response-body" >}}) to remove sensitive data from responses if the API is unable to do so itself. The gateway can also enforce object property-level restrictions using [JSON validation]({{< ref "product-stack/tyk-gateway/middleware/validate-request-tyk-classic" >}}), for scenarios where the client is sending data to the API.

For GraphQL APIs, use the gateway to define [GraphQL schemas]({{< ref "graphql-proxy-only#managing-gql-schema" >}}) to limit which properties are queryable, then optionally use [field-based permissions]({{< ref "graphql-proxy-only#field-based-permission" >}}) to also specify access rights to those properties. 

##### Function Level Authorization

Handle with the gateway. Use [security policies]({{< ref "api-management/policies" >}}), [path-based permissions]({{< ref "api-management/policies#secure-your-apis-by-method-and-path" >}}), [allow lists]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-oas#configuring-the-allow-list-in-the-tyk-oas-api-definition" >}}) and [block lists]({{< ref "product-stack/tyk-gateway/middleware/block-list-tyk-oas#configuring-the-block-list-in-the-api-designer" >}}) to manage authorization of hosts and paths.

#### Assign Least Privileges

Design [security policies]({{< ref "api-management/policies#what-is-a-security-policy" >}}) that contain the least privileges necessary for users to achieve the workflows supported by the API. By favoring specific, granular access over broad access, this enables user groups and use cases to be addressed directly, as opposed to broad policies that cover multiple use cases and expose functionality unnecessarily.

##### Deny by Default

Favor use of [allow lists]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-oas#configuring-the-allow-list-in-the-tyk-oas-api-definition" >}}) to explicitly allow endpoints access, rather than [block lists]({{< ref "product-stack/tyk-gateway/middleware/block-list-tyk-oas#configuring-the-block-list-in-the-api-designer" >}}) to explicitly deny. This approach prevents new API endpoints from being accessible by default, as the presence of other, allowed endpoints means that access to them is implicitly denied.

##### Validate and Control All User Input

Protect APIs from erroneous or malicious data by validating all input before it’s processed by the API. Bad data, whether malicious or not, can cause many problems for APIs, from basic errors and bad user experience, to data leaks and downtime. The standard mitigation approach is to validate all user input, for which there are various solutions depending on the type of API:

For REST APIs, use [schema validation]({{< ref "graphql/validation#schema-validation" >}}) to control acceptable input data values.

For GraphQL APIs, use [GraphQL schema]({{< ref "graphql-proxy-only#managing-gql-schema" >}}) definitions to limit what data can be queried and mutated. Additionally, [complexity limiting]({{< ref "graphql/complexity-limiting" >}}) can be used to block resource-intensive queries.

#### Track Anomalies

Use [log aggregation]({{< ref "log-data#integration-with-3rd-party-aggregated-log-and-error-tools" >}}) and [event triggers]({{< ref "basic-config-and-security/report-monitor-trigger-events" >}}) to push data generated by application logs and events into centralised monitoring and reporting systems. This real-time data stream can be used to highlight application issues and security-related events, such as authentication and authorization failures.

##### Understand System State

Perform application performance monitoring by capturing gateway [instrumentation data]({{< ref "basic-config-and-security/report-monitor-trigger-events/instrumentation" >}}). This enables the current system state, such as requests per second and response time, to be monitored and alerted upon.

##### Manage Cross-Origin Resource Sharing

Use [CORS filtering]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/cors" >}}) to control the resources accessible by browser-based clients. This is a necessity for APIs that expect to be consumed by external websites.


### Managing Authorization Levels

This section provides basic examples of where different authorization levels occur in the API management stack. The accompanying diagrams use color-coding to show links between request element and the associated authorization locations and methods.

This is how OWASP describe the attack vectors for the three authorization levels:

**Object Level Authorization**: “Attackers can exploit API endpoints that are vulnerable to broken object-level authorization by manipulating the ID of an object that is sent within the request. Object IDs can be anything from sequential integers, UUIDs, or generic strings. Regardless of the data type, they are easy to identify in the request target (path or query string parameters), request headers, or even as part of the request payload.” (source: [OWASP Github](https://github.com/OWASP/API-Security/blob/9c9a808215fcbebda9f657c12f3e572371697eb2/editions/2023/en/0xa1-broken-object-level-authorization.md))

**Object Property Level Authorization**: “APIs tend to expose endpoints that return all object’s properties. This is particularly valid for REST APIs. For other protocols such as GraphQL, it may require crafted requests to specify which properties should be returned. Identifying these additional properties that can be manipulated requires more effort, but there are a few automated tools available to assist in this task.” (source: [OWASP Github](https://github.com/OWASP/API-Security/blob/9c9a808215fcbebda9f657c12f3e572371697eb2/editions/2023/en/0xa3-broken-object-property-level-authorization.md))

**Function Level Authorization**: “Exploitation requires the attacker to send legitimate API calls to an API endpoint that they should not have access to as anonymous users or regular, non-privileged users. Exposed endpoints will be easily exploited.” (source: [OWASP Github](https://github.com/OWASP/API-Security/blob/9c9a808215fcbebda9f657c12f3e572371697eb2/editions/2023/en/0xa3-broken-object-property-level-authorization.md))


#### REST API - Reading Data

{{< img src="/img/api-management/security/rest-api-read-data.jpeg" alt="Rest API - Read Data" width="150px" >}}

The client sends a `GET` request using the path `/profile/1`. This path has two parts:

1. `/profile/`: The resource type, which is static for all requests related to profile objects. This requires function level authorization.

2. `1`: The resource reference, which is dynamic and depends on the profile is being requested. This requires object level authorization.

Next, the gateway handles function level authorization by checking that the static part of the path, in this case `/profile/`, is authorized for access. It does this by cross referencing the security policies connected to the API key provided in the `authorization` header.

The gateway ignores the dynamic part of the part of the path, in this case `1`, as it doesn't have access to the necessary object-level data to make an authorization decision for this.

Lastly, the API handles object level authorization by using custom logic. This typically involves using the value of the `authorization` header in combination with the ownership and authorization model specific to the API to determine if the client is authorized to read is requested record.

#### REST API - Writing Data

{{< img src="/img/api-management/security/rest-api-write-data.jpeg" alt="Rest API - Write Data" width="150px" >}}

The client sends a `POST` request using the path `/profile` and body data containing the object to write. The path `/profile` is static and requires function level authorization. The body data contains a JSON object that has two fields:

1. `name`: A standard object field. This requires object property authorization.

2. `id`: An object identifier field that refers to the identity of an object, so needs to be treated differently. As such, it requires both object property authorization, like name, and also object authorization.

Next, the gateway handles function level authorization, by checking that the path, in the case `/profile`, is authorized for access. It does this by cross referencing the security policies connected to the API key provided in the `authorization` header.

The gateway can also perform object property level authorization, by validating that the values of the body data fields, `name` and `id`, conform to a schema.

Lastly, the API handles object level authorization by using custom logic. This typically involves using the value of the `authorization` header in combination with the ownership and authorization model specific to the API to determine if the client is authorized to write the requested data.

#### GraphQL API - Querying Data

{{< img src="/img/api-management/security/graphql-query-data.jpeg" alt="Rest API - Write Data" width="150px" >}}

The client sends a `POST` request using the path `/graphql` and body data containing a GraphQL query. The path `/graphql` is static and requires function level authorization. The GraphQL query contains several elements:

- `profile`: An object type, referring to the type of object being requested. This requires object property authorization.
- `id`: An object identifier field that refers to the identity of an object, so needs to be treated differently. As such, it requires both object property authorization, like name, and also object authorization.
- `name`: A standard object field, referring to a property of the profile object type. This requires object property authorization.

Next, the Gateway handles function level authorization, by checking that the path, in the case `/graphql`, is authorized for access. It does this by cross referencing the security policies connected to the API key provided in the `authorization` header. Due to the nature of GraphQL using just a single endpoint, there is no need for additional path-based authorization features, only a basic security policy is required.

Another difference between this and the REST examples is in the way that the body data is authorized:

- All object types and fields contained in the query are checked against the API’s GraphQL schema, to ensure they are valid. In this case, the object type is `profile`, and the fields are `id` and `name`. The schema defined in the gateway configuration can differ from that in the upstream API, which enables fields to be restricted by default.
- Field-based permissions can also be used, to authorize client access of individual fields available in the schema. In this case, `id` and `name`.

Lastly, the API handles object level authorization by using custom logic. This typically involves using the value of the `authorization` header in combination with the ownership and authorization model specific to the API to determine if the client is authorized to access the requested data. This can be more complicated for GraphQL APIs, as the data presented by the schema may actually come from several different data sources.

## Managing API Resources

Excessive resource consumption poses a risk to APIs. As the number of concurrent requests handled by a server increases, so too does its consumption of CPU, RAM and storage resources. Should any of these become depleted, then the quality of service offered by applications running on the server will rapidly decline, and may even lead to their complete failure.

This issue can be caused by both legitimate consumers and malicious attackers, but they are different situations that require different solutions. For legitimate consumers, solutions should be focused on controlling API utilization through the gateway, to keep usage within agreed or desired limits. But malicious attackers require a different approach, as denial of service attacks must be blocked as far as possible from the core API infrastructure.

**Restrict Request Flows**: Use [rate limits]({{< ref "api-management/rate-limit#rate-limiting-layers" >}}) and [quotas]({{< ref "api-management/rate-limit#request-quotas" >}}) to prevent excessive API usage. Rate limits are best used for short term control, in the range of seconds. Whereas quotas are more suited to longer terms, in the range of days, weeks or beyond. [Throttling]({{< ref "api-management/rate-limit#request-throttling" >}}) can also be used as a type of enhanced rate limiter that queues and retries requests on the clients behalf, rather than immediately rejecting them.

**Block Excessively Large Requests**: Place reasonable [limitations on payload sizes]({{< ref "basic-config-and-security/control-limit-traffic/request-size-limits" >}}) to prevent oversized requests from reaching upstream servers, thereby avoiding the unnecessary consumption of resources.

**Avoid Unnecessary Resource Usage**: Appropriate use of [caching]({{< ref "basic-config-and-security/reduce-latency/caching" >}}) can reduce server resource consumption by simply returning cached responses instead of generating new ones. The extent to which caching can be used depends on the purpose of the endpoint, as it’s generally unsuitable for requests that modify data or responses that frequently change. Caching can be applied to [particular requests]({{< ref "basic-config-and-security/reduce-latency/caching/advanced-cache" >}}) or enabled for an [entire API]({{< ref "basic-config-and-security/reduce-latency/caching/global-cache" >}}), and can also be [controlled by the upstream API]({{< ref "basic-config-and-security/reduce-latency/caching/upstream-controlled-cache" >}}) or [invalidated programmatically]({{< ref "frequently-asked-questions/clear-api-cache" >}}).

**Limit Complex Long-Running Tasks**: Use [GraphQL complexity limiting]({{< ref "graphql/complexity-limiting" >}}) to prevent convoluted queries from being processed. Alternatively, [timeouts]({{< ref "tyk-self-managed#enforced-timeouts" >}}) can be used to terminate long-running requests that exceed a given time limit.

**Protect Failing Services**: Defend struggling endpoints by using a [circuit breaker]({{< ref "tyk-self-managed#circuit-breakers" >}}). This feature protects endpoints by detecting error responses, then blocking requests for a short duration to allow them to recover. The same principle can be applied in a wider sense by using [uptime tests]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/uptime-tests" >}}), though this works on a host level instead, by removing failed hosts from the gateway load balancer.

**Enforce Network-Level Security**: Problematic clients can be prevented from accessing the API by [blocking their address]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-blacklisting" >}}). Conversely, for APIs with a known set of clients, [allow lists]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/ip-whitelisting" >}}) can be used to create a list of allowed addresses, thereby implicitly blocking every other address from the API.

**Mitigate DoS Attacks**: Increase the chance of maintaining API availability during a denial of service attack by using [specialist mitigation services](https://www.cloudflare.com). These have the infrastructure capacity needed to handle [large scale distributed attacks](https://www.cloudflare.com/en-gb/learning/ddos/what-is-a-ddos-attack), with the purpose of preventing attacks from reaching the API infrastructure, thereby enabling the API to continue operating normally.


## Configuration Best Practices

Modern APIs are often backed by large technology stacks composed of numerous components and libraries. Each of these is a potential weak link in the security chain, so efforts must be made to ensure that security measures are implemented throughout. The API gateway plays a critical part in an overall security strategy, by utilizing its ability to process requests in a secure manner.

**Secure Connections**


Use [transport layer security]({{< ref "api-management/certificates" >}}) where possible. Most importantly, on inbound connections to the gateway and outbound connection from the gateway to the upstream API and other services. TLS can also be used as a form of authentication, using [Mutual TLS]({{< ref "/api-management/client-authentication#use-mutual-tls" >}}).

**Limit Functionality**


Use [security policies]({{< ref "api-management/policies#what-is-a-security-policy" >}}) to specify which paths, methods and schemas are accessible, whilst blocking all others.

**Mitigate Server-Side Request Forgery**


Restrict any URL-based input data to specific schemas, hosts and paths by using [schema validation]({{< ref "graphql/validation#schema-validation" >}}). When data is fetched server-side, it should be validated and not returned to the client in raw format.

**Protect Secrets**


Prevent sensitive data, such as usernames, passwords, license keys and other secrets, from being stored as plain text in application configuration files. Use [key value secret storage]({{< ref "tyk-self-managed#manage-multi-environment-and-distributed-setups" >}}) to dynamically load sensitive data from a secure secret manager.

**Sanitise Responses**


Modify or remove sensitive data from responses by using [transforms]({{< ref "advanced-configuration/transform-traffic" >}}) to alter the [response headers]({{< ref "advanced-configuration/transform-traffic/response-headers" >}}) and [body]({{< ref "advanced-configuration/transform-traffic/response-body" >}}).

<br>

## Governing APIs Effectively

APIs need to be managed and governed just like any other resource, otherwise organizations risk losing track of their API estate and becoming unaware of potentially vulnerable APIs running within their infrastructure. This risk is magnified as the number of teams, environments and APIs increases. Use API management as part of overarching business processes to control how APIs are accessed, managed and deployed.

**Restrict Version Availability**: Enforce the expiry of [API versions]({{< ref "api-management/api-versioning#tyk-classic-api-versioning-1" >}}) that are planned for deprecation, by setting a sunset date, beyond which they will not be accessible.

**Enforce Key Expiry**: In many situations it’s best to issue API keys that have a short, finite lifetime, especially when serving anonymous, external consumers. Set [expiry dates]({{< ref "api-management/policies#access-key-expiry" >}}) for API keys, or use ephemeral credentials with complementary authentication techniques that support key renewal, such as [OAuth 2.0 refresh tokens]({{< ref "/api-management/client-authentication#using-refresh-tokens" >}}) and [dynamic client registration]({{< ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/api-access/dynamic-client-registration" >}}). Then, should an API key fall into the wrong hands, there’s a chance that it has already expired.

**Use Standardized Specifications**: Use the [OpenAPI Specification](https://en.wikipedia.org/wiki/OpenAPI_Specification) standard to design APIs. These specification documents act as a source of truth that can generate [API configuration]({{< ref "getting-started/using-oas-definitions/import-an-oas-api" >}}) and [portal documentation]({{< ref "tyk-apis/tyk-portal-api/portal-documentation#create-documentation" >}}).

**Understand API Usage**: Use [API analytics]({{< ref "tyk-dashboard-analytics" >}}) to report on usage. This captured data generates useful, actionable insights across a variety of metrics, such as API popularity, performance and trends.

**Control API Distribution**: Use [sharding]({{< ref "advanced-configuration/manage-multiple-environments#api-sharding" >}}) to control availability of APIs across multi-gateway, multi-environment deployments. This ensures that specific APIs are only available through specific gateways, which helps to prevent undesirable situations, such as internal APIs being published to externally accessible gateways, or test API configurations reaching the production environment.
<br>

## Securing APIs with Tyk

Securing your APIs is one of the primary uses of Tyk API management solution. Out of the box, the Gateway offers a lot of functionality for securing your APIs and the Gateway itself.

This section outlines all of the security configurations and components that are available to you when securing your Tyk stack.

This section outlines some of the key security concepts that Tyk uses and that you should be familiar with before setting up and using a Tyk stack to secure your API.

**Key Hashing**


See [Key Hashing]({{< ref "api-management/policies#access-key-hashing" >}}) for details on how Tyk obfuscates keys in Redis.

**TLS and SSL**


Tyk supports TLS connections and Mutual TLS. All TLS connections also support HTTP/2. Tyk also supports Let's Encrypt. See [TLS and SSL]({{< ref "api-management/certificates" >}}) for more details.

**Trusted Certificates**


As part of using Mutual TLS, you can create a list of [trusted certificates]({{< ref "/api-management/client-authentication#how-does-mutual-tls-work" >}}).

**Certificate Pinning**


Introduced in Tyk Gateway 2.6.0, [certificate pinning]({{< ref "api-management/certificates#certificate-pinning" >}}) is a feature which allows you to allow only specified public keys used to generate certificates, so you will be protected in case an upstream certificate is compromised.

**API Security**

Tyk supports various ways to secure your APIs, including:

* Bearer Tokens
* HMAC
* JSON Web Tokens (JWT)
* Multi Chained Authentication
* OAuth 2.0
* OpenID Connect

See [Authentication and Authorization]({{< ref "/api-management/client-authentication" >}}) for more details.

**Security Policies**


A Tyk security policy incorporates several security options that can be applied to an API key. These include [Partioned Policies]({{< ref "api-management/policies#partitioned-policies" >}}) and securing by [Method and Path]({{< ref "api-management/policies#secure-your-apis-by-method-and-path" >}}).

See [Security Policies]({{< ref "api-management/policies" >}}) for more details.
