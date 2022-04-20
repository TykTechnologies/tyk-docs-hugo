---
date: 2017-03-23T14:29:56Z
title: Security
tags: ["Security", "Configuration"]
description: "How you can configure security in Tyk"
weight: 1
menu: 
  main:
    parent: "Basic Configuration and Security"
url: "/basic-config-and-security/security"
---

## Introduction

Securing your APIs is one of the primary uses of Tyk. Out of the box the Gateway offers a lot of functionality for securing your APIs and the Gateway itself.

This section outlines all of the security configurations and components that are available to you when securing your Tyk stack.

## Concepts

This section outlines some of the key security concepts that Tyk uses and that you should be familiar with before setting up and using a Tyk stack to secure your API.

### Key Hashing

Tyk stores all API Tokens and their equivalent Session Objects in a Redis DB. Because of this, Tyk will, by default, obfuscate the tokens in Redis using a key hash.

#### Default Key Hash Algorithm

To find a balance between performance and security, the default algorithm used by Tyk to do the hashing is `murmur3`, and serves more to obfuscate than to cryptographically secure the tokens.

It is possible to disable key hashing in Tyk using `hash_keys` set to `false` in the `tyk.conf` file and the `tyk_analytics.conf` file.

See the [Gateway Configuration Options](/docs/tyk-configuration-reference/tyk-gateway-configuration-options/) for more details.

#### Custom Key Hash Algorithms

To set a custom algorithm, you need to set `hash_key_function` in your `tyk.conf` to one of the following options:

* `murmur32`
* `murmur64`
* `murmur128`
* `sha256`

MurMur non-cryptographic hash functions are considered as the industry fastest and conflict-prone algorithms up to date, which gives a nice balance between security and performance. With this change you now you can choose the different hash length, depending on your organization security policies. We have also introduced a new `sha256` cryptographic key hashing algorithm, for cases when you are willing to sacrifice some performance for additional security.

Performance wise, setting new key hashing algorithms can increase the key hash length, as well as key length itself, so expect that your analytics data size to grow (but not that much, up to about 10%). Additionally, if you set the `sha256` algorithm, it will significantly slowdown Tyk, because cryptographic functions are slow by design but very secure.

Technically wise, it is implemented by new key generation algorithms, which now embed additional metadata to the key itself, and if you are curious about the actual implementation details, feel free to check the following [pull request](https://github.com/TykTechnologies/tyk/pull/1753).

Changing hashing algorithm is entirely backward compatible. All your existing keys will continue working with the old `murmur32` hashing algorithm, and your new keys will use the algorithm specified in your `tyk.conf`. Moreover, changing algorithms is also backward compatible, and Tyk will maintain keys with multiple hashing algorithms without any issues.

A hashed installation imposes some constraints on how Tyk is used:

*   Listing tokens requires setting `enable_hashed_keys_listing` to `true` in your `tyk.conf` file
*   Tokens appear in Analytics in their hashed form

{{< warning success >}}
**Warning**  

Switching from a hashed installation to non-hashed means all existing tokens cannot be used (they will not be correctly validated).
{{< /warning >}}


#### Using Hashed Keys Endpoints

- endpoints `POST /keys/create`, `POST /keys` and `POST /keys/{keyName}` also return the field `"key_hash"` for future use
- endpoint `GET /keys` get all (or per API) key hashes. You can disable this endpoint by using the new `tyk.conf` setting `enable_hashed_keys_listing` (set to `false` by default)
- endpoint `GET /keys/{keyName}` was modified to be able to get a key by hash. You just need provide the key hash as a `keyName` 
and call it with the new optional query parameter `hashed=true`. So the new format is `GET /keys/{keyName}?hashed=true"`
- we also have the same optional parameter for endpoint `DELETE /keys/{keyName}?hashed=true` and call it with the optional query parameter `hashed=true`. So the format is `GET /keys/{keyName}?hashed=true"`
- The same optional parameter is available for the `DELETE /keys/{keyName}?hashed=true` endpoint

See the Keys section of [Tyk Gateway API Swagger page](/docs/tyk-gateway-api/) for more details.

### TLS and SSL

Tyk supports TLS connections and Mutual TLS. All TLS connections also support HTTP/2. Tyk also supports Let's Encrypt. See [TLS and SSL](/docs/security/tls-and-ssl/) for more details.

### Trusted certficiates

As part of using Mutual TLS, you can create a list of trusted certificates. See [Authorisation](/docs/basic-config-and-security/security/tls-and-ssl/mutual-tls/#authorisation) for more details.

### Certificate Pinning

Introduced in Tyk Gateway 2.6.0, certificate pinning is a feature which allows you to allow only specified public keys used to generate certificates, so you will be protected in case an upstream certificate is compromised.

### API Security

Tyk supports various ways to secure your APIs, including:

* Bearer Tokens
* HMAC
* JSON Web Tokens (JWT)
* Multi Chained Authentication
* OAuth 2.0
* OpenID Connect

See [Authentication and Authorization](/docs/basic-config-and-security/security/authentication-authorization/) for more details.

### Security Policies

A Tyk security policy incorporates several security options that can be applied to an API key. These include [Partioned Policies](/docs/security/security-policies/partitioned-policies/) and securing by [Method and Path](/docs/security/security-policies/secure-apis-method-path/).

See [Security Policies](/docs/security/security-policies/) for more details.