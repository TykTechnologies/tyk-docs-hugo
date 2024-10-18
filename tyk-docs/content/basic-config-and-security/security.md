---
date: 2017-03-23T14:29:56Z
title: How to secure your APIs in Tyk
tags: ["Security", "Configuration", "SSL", "Certificates", "Authentication", "Authorization", "API security", "API Gateway Security"]
description: "Security in Tyk. Securing your APIs is one of the primary uses of Tyk. Out of the box the Gateway offers functionality for securing your APIs & the Gateway itself."
weight: 1
menu: 
  main:
    parent: "Basic Configuration and Security"
aliases:
  - /security/
---

## Introduction

Securing your APIs is one of the primary uses of Tyk API management solution. Out of the box, the Gateway offers a lot of functionality for securing your APIs and the Gateway itself.

This section outlines all of the security configurations and components that are available to you when securing your Tyk stack.

## Concepts

This section outlines some of the key security concepts that Tyk uses and that you should be familiar with before setting up and using a Tyk stack to secure your API.

### Key Hashing

See [Key Hashing]({{< ref "basic-config-and-security/security/key-hashing" >}}) for details on how Tyk obfuscates keys in Redis.

### TLS and SSL

Tyk supports TLS connections and Mutual TLS. All TLS connections also support HTTP/2. Tyk also supports Let's Encrypt. See [TLS and SSL]({{< ref "basic-config-and-security/security/tls-and-ssl" >}}) for more details.

### Trusted Certificates

As part of using Mutual TLS, you can create a list of [trusted certificates]({{< ref "basic-config-and-security/security/mutual-tls/concepts#certificates" >}}).

### Certificate Pinning

Introduced in Tyk Gateway 2.6.0, [certificate pinning]({{< ref "security/certificate-pinning" >}}) is a feature which allows you to allow only specified public keys used to generate certificates, so you will be protected in case an upstream certificate is compromised.

### API Security

Tyk supports various ways to secure your APIs, including:

* Bearer Tokens
* HMAC
* JSON Web Tokens (JWT)
* Multi Chained Authentication
* OAuth 2.0
* OpenID Connect

See [Authentication and Authorization]({{< ref "basic-config-and-security/security/authentication-&-authorization" >}}) for more details.

### Security Policies

A Tyk security policy incorporates several security options that can be applied to an API key. These include [Partioned Policies]({{< ref "basic-config-and-security/security/security-policies/partitioned-policies.md" >}}) and securing by [Method and Path]({{< ref "security/security-policies/secure-apis-method-path" >}}).

See [Security Policies]({{< ref "basic-config-and-security/security/security-policies" >}}) for more details.
