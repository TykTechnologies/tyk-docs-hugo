---
title: "Authorization Levels"
date: 2023-09-11
tags: ["API Security", "Authorization"]
description: "Authorization levels"
---


This section provides basic examples of where different authorization levels occur in the API management stack. The accompanying diagrams use color-coding to show links between request element and the associated authorization locations and methods.

This is how OWASP describe the attack vectors for the three authorization levels:

**Object Level Authorization**: “Attackers can exploit API endpoints that are vulnerable to broken object-level authorization by manipulating the ID of an object that is sent within the request. Object IDs can be anything from sequential integers, UUIDs, or generic strings. Regardless of the data type, they are easy to identify in the request target (path or query string parameters), request headers, or even as part of the request payload.” (source: [OWASP Github](https://github.com/OWASP/API-Security/blob/9c9a808215fcbebda9f657c12f3e572371697eb2/editions/2023/en/0xa1-broken-object-level-authorization.md))

**Object Property Level Authorization**: “APIs tend to expose endpoints that return all object’s properties. This is particularly valid for REST APIs. For other protocols such as GraphQL, it may require crafted requests to specify which properties should be returned. Identifying these additional properties that can be manipulated requires more effort, but there are a few automated tools available to assist in this task.” (source: [OWASP Github](https://github.com/OWASP/API-Security/blob/9c9a808215fcbebda9f657c12f3e572371697eb2/editions/2023/en/0xa3-broken-object-property-level-authorization.md))

**Function Level Authorization**: “Exploitation requires the attacker to send legitimate API calls to an API endpoint that they should not have access to as anonymous users or regular, non-privileged users. Exposed endpoints will be easily exploited.” (source: [OWASP Github](https://github.com/OWASP/API-Security/blob/9c9a808215fcbebda9f657c12f3e572371697eb2/editions/2023/en/0xa3-broken-object-property-level-authorization.md))


### REST API - Reading Data

{{< img src="/img/api-management/security/rest-api-read-data.jpeg" alt="Rest API - Read Data" width="150px" >}}

The client sends a `GET` request using the path `/profile/1`. This path has two parts:

1. `/profile/`: The resource type, which is static for all requests related to profile objects. This requires function level authorization.

2. `1`: The resource reference, which is dynamic and depends on the profile is being requested. This requires object level authorization.

Next, the gateway handles function level authorization by checking that the static part of the path, in this case `/profile/`, is authorized for access. It does this by cross referencing the security policies connected to the API key provided in the `authorization` header.

The gateway ignores the dynamic part of the part of the path, in this case `1`, as it doesn't have access to the necessary object-level data to make an authorization decision for this.

Lastly, the API handles object level authorization by using custom logic. This typically involves using the value of the `authorization` header in combination with the ownership and authorization model specific to the API to determine if the client is authorized to read is requested record.

### REST API - Writing Data

{{< img src="/img/api-management/security/rest-api-write-data.jpeg" alt="Rest API - Write Data" width="150px" >}}

The client sends a `POST` request using the path `/profile` and body data containing the object to write. The path `/profile` is static and requires function level authorization. The body data contains a JSON object that has two fields:

1. `name`: A standard object field. This requires object property authorization.

2. `id`: An object identifier field that refers to the identity of an object, so needs to be treated differently. As such, it requires both object property authorization, like name, and also object authorization.

Next, the gateway handles function level authorization, by checking that the path, in the case `/profile`, is authorized for access. It does this by cross referencing the security policies connected to the API key provided in the `authorization` header.

The gateway can also perform object property level authorization, by validating that the values of the body data fields, `name` and `id`, conform to a schema.

Lastly, the API handles object level authorization by using custom logic. This typically involves using the value of the `authorization` header in combination with the ownership and authorization model specific to the API to determine if the client is authorized to write the requested data.

### GraphQL API - Querying Data


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