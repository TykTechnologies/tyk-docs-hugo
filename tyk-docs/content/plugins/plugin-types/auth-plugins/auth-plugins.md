---
date: 2017-03-24T15:45:13Z
title: Authentication Plugins
tags: ["Custom Auth Plugins", "Custom Auth", "Auth Plugins", "Authentication Plugins"]
menu:
  main:
    parent: "Plugin Types"
weight: 11
aliases: 
  - "/plugins/auth-plugins"

---

If you have unique authentication requirements, you can write a custom authentication plugin.

## Session Authentication and Authorization

A very important thing to understand when using custom authentication plugins is that Tyk will continue to perform session authentication and authorization using the information returned by your plugin. Tyk will cache this Session information. **This is necessary in order to do things like rate limiting, access control, quotas, throttling, etc.**

Tyk will try to be clever about what to cache, but we need to help it. There are two ways to do that, with and without the `ID Extractor`.

### The ID Extractor 

The ID Extractor is a caching mechanism that's used in combination with Tyk Plugins. It can be used specifically with plugins that implement custom authentication mechanisms. The ID Extractor works for all rich plugins: gRPC-based plugins, Python and Lua.

See [ID Extractor]({{< ref "plugins/plugin-types/auth-plugins/id-extractor" >}}) for more details.

### Token Metadata

Tyk creates an in-memory object to track the rate limit, quotas, and more for each session. 

This is why we set the `token` metadata when using custom authentication middleware, in order to give Tyk a unique ID with which to track each session.

For backwards compatibility, even when using an ID Extractor, we need to continue to set the `token` metadata.  For example, when building a session object in GoLang custom middleware:

```{.copyWrapper}
object.Session = &coprocess.SessionState{
        LastUpdated: time.Now().String(),
        Rate: 5,
        Per:  10,
        QuotaMax:            int64(0),
        QuotaRenews:         time.Now().Unix(),
        IdExtractorDeadline: extractorDeadline,
        Metadata: map[string]string{
            "token": "my-unique-token",
        },
        ApplyPolicies: ["5d8929d8f56e1a138f628269"],
    }
```
[source](https://github.com/TykTechnologies/tyk-grpc-go-basicauth-jwt/blob/master/main.go#L102)

### Without ID Extractor

When not using ID Extractor, Tyk will continue to cache authenticated sessions returned by custom auth plugins. We must set a unique `token` field in the Metadata (see above) that Tyk will use to cache.

## Supported Languages 

The following languages are supported for custom authentication plugins:

- All Rich Plugins (gRPC, Python, Lua)
- GoLang

See the [supported languages]({{< ref "plugins/supported-languages" >}}) section for custom authentication plugin examples in a language of your choosing. There's also a [blog that walks you through setting up gRPC custom auth in Java](https://tyk.io/how-to-setup-custom-authentication-middleware-using-grpc-and-java/).

## Tyk Operator

Please consult the Tyk Operator supporting documentation for examples of how to configure a Tyk Operator API to use:

- [Go custom authentication plugin]({{< ref "/api-management/automations#custom-plugin-auth-go" >}})
- [gRPC custom authentication plugin]({{< ref "/api-management/automations#custom-plugin-auth-grpc" >}})

