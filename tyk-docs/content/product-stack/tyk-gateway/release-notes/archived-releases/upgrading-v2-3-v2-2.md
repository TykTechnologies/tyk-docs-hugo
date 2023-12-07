---
date: 2017-03-28T12:47:56+01:00
title: Upgrading to v2.3 from v2.2
# notoc: true
# weight: 221
aliases:
    - /upgrading-v2-3-v2-2/
---

Tyk v2.3 is backwards-compatible with v2.2 in terms of the configuration file and the original `tyk.conf` can be used with the new version. If you would like to keep your v2.2 settings, please remember to <u>**backup your `tyk.conf` file before upgrading as it will be overwritten during the upgrade process.**</u>

*However*, there are behavioural differences in a v2.3 cluster when hooked up to a Dashboard that can cause some odd behaviour if the upgrade is not conducted in the right order.

Tyk v2.3 Gateways continuously talk to each other sharing load data, they also share information with the Dashboard regarding their current configuration. This chatter, if exposed to a v2.2 Gateway, can cause it go into a reload loop, which isn't ideal. Because of this, the recommended upgrade procedure for a Tyk v2.2 system is:

1.  Upgrade all the Tyk Gateways to v2.3
2.  Upgrade the Dashboard to v1.3
3.  Update the Tyk Pump to v0.4

If upgraded in this order, then the reload loop can be avoided on a production system.

If the reload loop does occur it is not disastrous, Tyk will just keep proxying traffic even though it is constantly pulling new configurations. It's just not particularly efficient.

> **Note for MDCB**: If you are using MDCB and want to upgrade your Gateways to v2.3, you will also need to upgrade your MDCB to v1.2.0.2.

#### Retaining rate limiter functionality

Tyk v2.3 introduces a new in-memory leaky-bucket *distributed* rate limiter, this is much more performant than the older rate limiter which hard-synchronised via Redis, and puts far less strain on a Redis instance or cluster than the old rate limiter. By default, Tyk v2.3 will switch to this rate limiter, however it is possible to retain the old behaviour by enabling it explicitly in the `tyk.conf` file:

```
    "enable_redis_rolling_limiter": true
```

This might be useful if you do not wish to switch over immediately and wish to test the new rate limiter first.

#### Public and Private keys

Tyk v2.3 introduces public/private key message authentication for messages that are sent from the management interface to the Gateways, and for code that is being deployed as a plugin to a Gateway via the bundle downloader.

By default, Tyk's new config file has this feature *disabled*, however since it is new, an existing `tyk.conf` will assume a secure installation as the feature must be explicitly disabled. This means, prior to starting your new Gateways, either disable the security feature, or add a public/private key pair to your `tyk.conf` and `tyk_analytics.conf` files:

##### Disable secure messages

<u>**If you are upgrading from v2.2 then you must either generate a public/private keypair or disable the option to validate inbound payloads against a key. You can do this by setting the following key in your `tyk.conf`:**</u>

```
    "allow_insecure_configs": true
```

##### Add a public key and private key pair

First, generate the key pair:

```
    # private key
    openssl genrsa -out privkey.pem 2048
    
    # public key
    openssl rsa -in privkey.pem -pubout -out pubkey.pem
```

**`tyk.conf`:**

```
    "public_key_path": "/path/to/public/key.pem"
```

**`tyk_analytics.conf`:**

```
    "private_key_path": "/path/to/private/key.pem"
```

#### Conclusion

The above are the key changes in v2.3 that could affect your setup and configuration during an upgrade. All other settings should be backwards compatible and not introduce breaking changes.
