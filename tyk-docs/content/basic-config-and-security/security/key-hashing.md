---
title: "Key Hashing"
date: 2021-09-01
tags: ["Keys", "Hashing", "MurMur", "Security"]
description: "How to configure key hashing in Tyk"
menu:
  main:
    parent: "Security"
weight: 8 
---

## Introduction

Tyk stores all API Tokens and their equivalent Session Objects in a Redis DB. Because of this, Tyk will, by default, obfuscate the tokens in Redis using a key hash.

### Default Key Hash Algorithm

To find a balance between performance and security, the default algorithm used by Tyk to do the hashing is `murmur3`, and serves more to obfuscate than to cryptographically secure the tokens.

It is possible to disable key hashing in Tyk using `hash_keys` set to `false` in your `tyk.conf` and `tyk_analytics.conf`.

See the [Gateway Configuration Options](/tyk-configuration-reference/tyk-gateway-configuration-options/) for more details.

### Custom Key Hash Algorithms

To set a custom algorithm, you need to set `hash_key_function` in your `tyk.conf` to one of the following options:

* `murmur32`
* `murmur64`
* `murmur128`
* `sha256`

MurMur non-cryptographic hash functions are considered as the industry fastest and conflict-prone algorithms up to date, which gives a nice balance between security and performance. With this change you now you can choose the different hash length, depending on your organisation security policies. We have also introduced a new `sha256` cryptographic key hashing algorithm, for cases when you are willing to sacrifice some performance for additional security.

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


### Using Hashed Keys Endpoints

- endpoints `POST /keys/create`, `POST /keys` and `POST /keys/{keyName}` also return the field `"key_hash"` for future use
- endpoint `GET /keys` get all (or per API) key hashes. You can disable this endpoint by using the new `tyk.conf` setting `enable_hashed_keys_listing` (set to `false` by default)
- endpoint `GET /keys/{keyName}` was modified to be able to get a key by hash. You just need provide the key hash as a `keyName` 
and call it with the new optional query parameter `hashed=true`. So the new format is `GET /keys/{keyName}?hashed=true"`
- we also have the same optional parameter for endpoint `DELETE /keys/{keyName}?hashed=true` and call it with the optional query parameter `hashed=true`. So the format is `GET /keys/{keyName}?hashed=true"`
- The same optional parameter is available for the `DELETE /keys/{keyName}?hashed=true` endpoint

See the Keys section of [Tyk Gateway API Swagger page](/tyk-gateway-api/) for more details.