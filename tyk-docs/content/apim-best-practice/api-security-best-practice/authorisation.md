---
title: "Authorization"
date: 2023-09-04
tags: ["API Security", "Authorization"]
description: "Authorization best practices"
---

Authorization is the process of validating API client requests against the access rights they have been granted, ensuring that the requests comply with any imposed limitations. It’s the most prevalent topic on the OWASP list, with three entries covering different levels of authorization.

Almost any part of a request can be scrutinised as part of authorization, but choosing the best approach depends on the type of API. For example, with REST APIs, the requested method and path are good candidates, but they aren’t relevant for GraphQL APIs, which should focus on the GraphQL query instead.

Authorization can be a complex process that occurs at multiple locations throughout the request lifecycle. For example, a gateway can use access control policies to determine whether a required path is acceptable. But for decisions based on object data, such as when a client requests a particular record from the database, it’s the API that’s best positioned, as only it has access to the necessary data. For more information about the authorization process, see Authorization Levels in the appendix.

## Split Authorization

Implement authorization in the best locations across the stack. For an overview of the different authorization levels across the stack please visit this [page]({{< ref "/apim-best-practice/api-security-best-practice/authorisation-levels" >}}). Use the gateway to handle general API authorization related to hosts, methods, paths and properties. This leaves the API to handle the finer details of object-level authorization. In terms of OWASPs authorization categories, it can be split as follows:

### Object Level Authorization

Handle with the API. It can access and understand the data needed to make authorization decisions on individual objects within its database.

### Object Property Level Authorization

Handle with both the API and the gateway. The approach depends on the type of API:

For REST APIs, it’s the API that’s primarily responsible for returning the correct data. To complement this, the gateway can use [body transforms]({{< ref "advanced-configuration/transform-traffic/response-body" >}}) to remove sensitive data from responses if the API is unable to do so itself. The gateway can also enforce object property-level restrictions using [JSON validation]({{< ref "product-stack/tyk-gateway/middleware/validate-request-tyk-classic" >}}), for scenarios where the client is sending data to the API.

For GraphQL APIs, use the gateway to define [GraphQL schemas]({{< ref "graphql-proxy-only#managing-gql-schema" >}}) to limit which properties are queryable, then optionally use [field-based permissions]({{< ref "graphql-proxy-only#field-based-permission" >}}) to also specify access rights to those properties. 

### Function Level Authorization

Handle with the gateway. Use [security policies]({{< ref "basic-config-and-security/security/security-policies" >}}), [path-based permissions]({{< ref "security/security-policies/secure-apis-method-path" >}}), [allow lists]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-oas#configuring-the-allow-list-in-the-tyk-oas-api-definition" >}}) and [block lists]({{< ref "product-stack/tyk-gateway/middleware/block-list-tyk-oas#configuring-the-block-list-in-the-api-designer" >}}) to manage authorization of hosts and paths.

## Assign Least Privileges

Design [security policies]({{< ref "getting-started/key-concepts/what-is-a-security-policy" >}}) that contain the least privileges necessary for users to achieve the workflows supported by the API. By favoring specific, granular access over broad access, this enables user groups and use cases to be addressed directly, as opposed to broad policies that cover multiple use cases and expose functionality unnecessarily.

### Deny by Default

Favor use of [allow lists]({{< ref "product-stack/tyk-gateway/middleware/allow-list-tyk-oas#configuring-the-allow-list-in-the-tyk-oas-api-definition" >}}) to explicitly allow endpoints access, rather than [block lists]({{< ref "product-stack/tyk-gateway/middleware/block-list-tyk-oas#configuring-the-block-list-in-the-api-designer" >}}) to explicitly deny. This approach prevents new API endpoints from being accessible by default, as the presence of other, allowed endpoints means that access to them is implicitly denied.

### Validate and Control All User Input

Protect APIs from erroneous or malicious data by validating all input before it’s processed by the API. Bad data, whether malicious or not, can cause many problems for APIs, from basic errors and bad user experience, to data leaks and downtime. The standard mitigation approach is to validate all user input, for which there are various solutions depending on the type of API:

For REST APIs, use [schema validation]({{< ref "graphql/validation#schema-validation" >}}) to control acceptable input data values.

For GraphQL APIs, use [GraphQL schema]({{< ref "graphql-proxy-only#managing-gql-schema" >}}) definitions to limit what data can be queried and mutated. Additionally, [complexity limiting]({{< ref "graphql/complexity-limiting" >}}) can be used to block resource-intensive queries.

## Track Anomalies

Use [log aggregation]({{< ref "log-data#integration-with-3rd-party-aggregated-log-and-error-tools" >}}) and [event triggers]({{< ref "basic-config-and-security/report-monitor-trigger-events" >}}) to push data generated by application logs and events into centralised monitoring and reporting systems. This real-time data stream can be used to highlight application issues and security-related events, such as authentication and authorization failures.

### Understand System State

Perform application performance monitoring by capturing gateway [instrumentation data]({{< ref "basic-config-and-security/report-monitor-trigger-events/instrumentation" >}}). This enables the current system state, such as requests per second and response time, to be monitored and alerted upon.

### Manage Cross-Origin Resource Sharing

Use [CORS filtering]({{< ref "tyk-apis/tyk-gateway-api/api-definition-objects/cors" >}}) to control the resources accessible by browser-based clients. This is a necessity for APIs that expect to be consumed by external websites.
