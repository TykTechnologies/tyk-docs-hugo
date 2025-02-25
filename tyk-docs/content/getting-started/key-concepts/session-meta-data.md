---
date: 2017-03-23T12:58:24Z
title: Session Metadata
tags: ["session metadata", "session", "dynamic data", "metadata"]
description: "Overview of session metadata"
---

As described in [What is a Session Object?]({{< ref "getting-started/key-concepts/what-is-a-session-object" >}}), all Tyk tokens can contain a metadata field. This field is a string key/value map that can store any kind of information about the underlying identity of a session.

The metadata field is important, because it can be used in various ways:

- to inform an admin of the provenance of a token
- values can be injected into headers for upstream services to consume (e.g. a user ID or an email address provided at the time of creation)
- values can be used in dynamic [JavaScript]({{< ref "api-management/plugins/javascript#accessing-external-and-dynamic-data" >}}) middleware and Virtual Endpoints for further validation or request modification

Metadata is also injected by other Tyk Components when keys are created using "generative" methods, such as JSON Web Token and OIDC session creation and via the Developer Portal, to include information about the underlying identity of the token when it comes from a third-party such as an OAuth IDP (e.g. OIDC).

### Middleware that can use metadata

Metadata is exposed in several middleware for use in the middleware configuration:

- [URL Rewrite]({{< ref "api-management/traffic-transformation#pattern" >}})
- [Request Header Transformation]({{< ref "api-management/traffic-transformation#injecting-dynamic-data-into-headers" >}})
- [Response Header Transformation]({{< ref "api-management/traffic-transformation#injecting-dynamic-data-into-headers" >}})
- [Request Body Transformation]({{< ref "api-management/traffic-transformation#data-accessible-to-the-middleware" >}})
- [Response Body Transformation]({{< ref "api-management/traffic-transformation#data-accessible-to-the-middleware" >}})
- [Virtual Endpoints]({{< ref "api-management/traffic-transformation#virtual-endpoints-overview" >}})

You can also access and update metadata from your [custom plugins]({{< ref "api-management/plugins/overview#" >}}).  For an example of this, take a look at this [gRPC enabled GO Server](https://github.com/TykTechnologies/tyk-grpc-go-basicauth-jwt).  It's a PoC middleware that injects a JWT value into metadata and then accesses it later in the stream.
