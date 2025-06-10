
---
date: 2024-01-01T00:00:00Z
title: Tyk Middleware Chain
tags: ["Tyk Gateway", "Middleware", "Architecture", "Request Flow"]
description: "Visual diagram showing the complete Tyk middleware chain flow for request and response processing"
weight: 10
---

Tyk middleware flow diagram:

```mermaid
graph TD
    A[Client Request] --> B[API Gateway]
    B --> C[Request Middleware Chain]
    
    subgraph "Request Middleware Chain"
        C1[VersionCheck] --> C2[Pre-Auth Custom Middleware]
        C2 --> C3[RateCheckMW]
        C3 --> C4[IPWhiteListMiddleware]
        C4 --> C5[IPBlackListMiddleware]
        C5 --> C6[CertificateCheckMW]
        C6 --> C7[OrganizationMonitor]
        C7 --> C8[RequestSizeLimitMiddleware]
        C8 --> C9[MiddlewareContextVars]
        C9 --> C10[TrackEndpointMiddleware]
        
        subgraph "Authentication Middleware (if not keyless)"
            C10 --> C11a[Oauth2KeyExists]
            C11a --> C11b[ExternalOAuthMiddleware]
            C11b --> C11c[BasicAuthKeyIsValid]
            C11c --> C11d[HTTPSignatureValidation]
            C11d --> C11e[JWTMiddleware]
            C11e --> C11f[OpenIDMW]
            C11f --> C11g[Custom Auth Plugin]
            C11g --> C11h[AuthKey - Standard Auth]
        end
        
        C11h --> C12[Post-Auth Custom Middleware]
        C12 --> C13[StripAuth]
        C13 --> C14[KeyExpired]
        C14 --> C15[AccessRightsCheck]
        C15 --> C16[GranularAccessMiddleware]
        C16 --> C17[RateLimitAndQuotaCheck]
        C17 --> C18[RateLimitForAPI]
        C18 --> C19[GraphQLMiddleware]
        C19 --> C20[StreamingMiddleware]
        
        subgraph "GraphQL Middleware (if not keyless)"
            C20 --> C21a[GraphQLComplexityMiddleware]
            C21a --> C21b[GraphQLGranularAccessMiddleware]
        end
        
        C21b --> C22[UpstreamBasicAuthMw]
        C22 --> C23[UpstreamOAuthMw]
        C23 --> C24[ValidateJSON]
        C24 --> C25[ValidateRequest]
        C25 --> C26[PersistGraphQLOperationMiddleware]
        C26 --> C27[TransformMiddleware]
        C27 --> C28[TransformJQMiddleware]
        C28 --> C29[TransformHeaders]
        C29 --> C30[URLRewriteMiddleware]
        C30 --> C31[TransformMethod]
        C31 --> C32[RedisCacheMiddleware]
        C32 --> C33[VirtualEndpoint]
        C33 --> C34[RequestSigning]
        C34 --> C35[GoPluginMiddleware]
        C35 --> C36[Post Custom Middleware]
    end
    
    C36 --> D[Proxy to Upstream]
    D --> E[Upstream Service]
    E --> F[Response]
    
    F --> G[Response Middleware Chain]
    
    subgraph "Response Middleware Chain"
        G1[ResponseTransformMiddleware] --> G2[HeaderInjector]
        G2 --> G3[Custom Response Processors]
        G3 --> G4[Custom Response Hooks]
        G4 --> G5[ResponseCacheMiddleware]
    end
    
    G --> H[Response to Client]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style E fill:#bbf,stroke:#333,stroke-width:2px
    style H fill:#f9f,stroke:#333,stroke-width:2px
```
