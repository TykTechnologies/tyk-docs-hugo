---
title: Tyk Gateway v2.7
menu:
  main:
    parent: "Release Notes"
weight: 10
---

# <a name="new"></a>New in this Release:

## <a name="gateway"></a>Tyk Gateway v2.7.0

### Performance improvements


> **TLDR**
> To get benefit or performance improvements ensure that you have `close_connections` set to `false` and set `max_idle_connections_per_host` according to our [production perfomance guide]({{< ref "planning-for-production" >}})

We have thoroughly analysed every part of our Gateway, and the results are astounding, up to 160% improvement, compared to our 2.6 release.

Such a performance boost comes from various factors, such as optimising our default configs, better HTTP connection re-use, optimisation of the analytics processing pipeline, regexp caching, doing fewer queries to the database, and numerous small changes in each of the  middleware we have.

Our performance testing plan was focused on replicating our customer's setup, and try not to optimise for “benchmarks”: so no supercomputers and no sub-millisecond inner DC latency. Instead, we were testing on average performance 2 CPU Linode machine, with 50ms latency between Tyk and upstream. For testing, we used the Tyk Gateway in Hybrid mode, with a default config, except for a single 2.7 change where `max_idle_connections_per_host ` is set to 500, as apposed to 100 in 2.6. Test runner was using [Locust](https://locust.io/) framework and [Boomer](https://github.com/myzhan/boomer) for load generation.

For a keyless API we were able to achieve 3.7K RPS (requests per second) for 2.7, while 2.6 showed about 2.5K RPS, which is a 47% improvement.

For protected APIs, when Tyk needs to track both rate limits and quotas, 2.7 shows around 3.1K RPS, while 2.6 shows around 1.2K RPS, which is 160% improvement!

In 2.7 we optimised the connection pool between Tyk and upstream, and previously `max_idle_connections_per_host` option was capped to 100. In 2.7 you can set it to any value. `max_idle_connections_per_host` by itself controls an amount of keep-alive connections between clients and Tyk. If you set this value too low, then Tyk will not re-use connections and will have to open a lot of new connections to your upstream. If you set this value too big, you may encounter issues with slow clients occupying your connection and you may reach OS limits. You can calculate the correct value using a straightforward formula: if latency between Tyk and Upstream is around 50ms, then a single connection can handle 1s / 50s = 20 requests. So if you plan to handle 2000 requests per second using Tyk, the size of your connection pool should be at least 2000 / 20 = 100. For example, on low-latency environments (like 5ms), a connection pool of 100 connections will be enough for 20k RPS.

To get the benefit of optimised connection pooling, ensure that `close_connections` is set to `false`, which enables keep-alive between Tyk and Upstream.

### Custom key hashing algorithms

Key hashing is a security technique introduced inside Tyk a long time ago, which allows you to prevent storing your API tokens in database, and instead, only store their hashes. Only API consumers have access to their API tokens, and API owners have access to the hashes, which gives them access to usage and analytics in a secure manner. Time goes on, algorithms age, and to keep up with the latest security trends, we introduce a way to change algorithms used for key hashing.

This new feature is in public beta, and turned off by default, keeping old behavior when Tyk uses `murmur32` algorithm. To set the custom algorithm, you need to set `hash_key_function` to one of the following options:
- `murmur32`
- `murmur64`
- `murmur128`
- `sha256`

MurMur non-cryptographic hash functions is considered as industry fastest and conflict-prone algorithms up to date, which gives a nice balance between security and performance. With this change you now you may choose the different hash length, depending on your organization security policies. As well, we have introduced a new `sha256` **cryptographic** key hashing algorithm, for cases when you are willing to sacrifice performance with additional security.

Performance wise, setting new key hashing algorithms can increase key hash length, as well as key length itself, so expect that your analytics data size to grow (but not that much, up to 10%). Additionally, if you set the `sha256` algorithm, it will significantly slowdown Tyk, because `cryptographic` functions are slow by design but very secure.

Technically wise, it is implemented by new key generation algorithms, which now embed additional metadata to the key itself, and if you are curious about the actual implementation details, feel free to check the following [pull request](https://github.com/TykTechnologies/tyk/pull/1753).

Changing hashing algorithm is entirely backward compatible. All your existing keys will continue working with the old `murmur32` hashing algorithm, and your new keys will use algorithm specified in Tyk config. Moreover, changing algorithms is also backward compatible, and Tyk will maintain keys multiple hashing algorithms without any issues.


## Tyk Dashboard v1.7.0

### User Groups

Instead of setting permissions per user, you can now [create a user group]({{< ref "basic-config-and-security/security/dashboard/create-user-groups" >}}), and assign it to multiple users. It works for Single Sign-On too, just specify group ID during [SSO API]({{< ref "tyk-apis/tyk-dashboard-admin-api/sso" >}}) flow.

> This feature is available to all our Cloud and Hybrid users. For Self-Managed installations, this feature is available for customers with an "Unlimited" license.

To manage user groups, ensure that you have either admin or “user groups” permission for your user, which can be enabled by your admin.

From an API standpoint, user groups can be managed by [new Dashboard API]({{< ref "tyk-apis/tyk-dashboard-api/user-groups" >}}). The User object now has a new `group_id` field, and if it is specified, all permissions will be inherited from the specified group. [SSO API]({{< ref "tyk-apis/tyk-dashboard-admin-api/sso" >}}) has been updated to include `group_id` field as well.

### Added SMTP support
Now you can configure the Dashboard to send transactional emails using your SMTP provider. See [Outbound Email Configuration]({{< ref "configure/outbound-email-configuration" >}}) for details.

## <a name="upgrade"></a>Upgrading all new Components

For details on upgrading all Tyk versions, see [Upgrading Tyk]({{< ref "upgrading-tyk" >}}).

## <a name="new"></a>Don't Have Tyk Yet?

Get started now, for free, or contact us with any questions.

* [Get Started](https://tyk.io/pricing/compare-api-management-platforms/#get-started)
* [Contact Us](https://tyk.io/about/contact/)


