---
date: 2017-03-23T14:29:56Z
title: Security
weight: 30
menu: "main"
url: "/security"
---

## <a name="introduction"></a>Introduction

Securing your APIs is one of the primary uses of Tyk. Out of the box the Gateway offers a lot of functionality for securing your APIs and the Gateway itself.

This section outlines all of the security configurations and components that are available to you when securing your Tyk stack.

## <a name="concepts"></a>Concepts

This section outlines some of the key security concepts that Tyk uses and that you should be familiar with before setting up and using a Tyk stack to secure your API.

### <a name="key-hashing"></a>Key Hashing

Tyk stores all API Tokens and their equivalent Session Objects in a Redis DB. Because of this, Tyk will, by default, obfuscate the tokens in Redis using a key hash.

To find a balance between performance and security, the current algorithm used by Tyk to do the hashing is `murmur3`, and serves more to obfuscate than to cryptographically secure the tokens.

It is possible to disable key hashing in Tyk using `hash_keys` set to `false` in the `tyk.conf` file and the `tyk_analytics.conf` file.

See the [Gateway Configuration Options](/docs/configure/tyk-gateway-configuration-options/) for more details.

A hashed installation imposes some constraints on how Tyk is used:

*   Listing tokens is not possible
*   Tokens appear in Analytics in their hashed form

> **Warning**: Switching from a hashed installation to non-hashed means all existing tokens cannot be used (they will not be correctly validated).

#### New Features for Gateway v2.6.0

- endpoints `POST /keys/create`, `POST /keys` and `POST /keys/{keyName}` also return field `"key_hash"` for future use
- endpoint `GET /keys` get all (or per API) key hashes. You can disable this endpoint by using the new `tyk.conf` setting `enable_hashed_keys_listing` (set to false by default)
- endpoint `GET /keys/{keyName}` was modified to be able to get a key by hash. You just need provide the key hash as a `keyName` 
and call it with the new optional query parameter `hashed=true`. So the new format is `GET /keys/{keyName}?hashed=true"`
- also, we already have the same optional parameter for endpoint `DELETE /keys/{keyName}?hashed=true`

### <a name="tls-and-ssl"></a>TLS and SSL

Tyk supports TLS connections and Mutual TLS. All TLS connections also support HTTP/2. Tyk also supports Let's Encrypt. See [TLS and SSL](/docs/security/tls-and-ssl/) for more details.

### <a name="whitelisting"></a>Whitelisting

As part of using Mutual TLS, you can create a whitelist of trusted certificates. See [Authorisation](/docs/security/tls-and-ssl/mutual-tls/#authorisation) for more details.

### <a name="cert-pinning"></a>Certificate Pinning

Introduced in Tyk Gateway 2.6.0, certificate pinning is a feature which allows you to whitelist public keys used to generate certificates, so you will be protected in case an upstream certificate is compromised.

### <a name="api-security"></a> API Security

Tyk supports various ways to secure your APIs, including:

* Bearer Tokens
* HMAC
* JSON Web Tokens (JWT)
* Multi Chained Authentication
* OAuth 2.0
* OpenID Connect

See [Your APIs](/docs/security/your-apis/) for more details.

### <a name="security-policies"></a>Security Policies

A Tyk security policy incorporates several security options that can be applied to an API key. These include [Partioned Policies](/docs/security/security-policies/partitioned-policies/) and securing by [Method and Path](/docs/security/security-policies/secure-apis-method-path/).

See [Security Policies](/docs/security/security-policies/) for more details.

