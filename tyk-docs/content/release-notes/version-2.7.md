---
title: Tyk Gateway v2.7 and more
menu:
  main:
    parent: "Release Notes"
weight: 1
---

# <a name="new"></a>New in this Release:

## <a name="gateway"></a>Tyk Gateway v2.7.0

### Performance improvements


> **TLDR**
> To get benefit or performance improvements ensure that you have `close_connections` set to `false` and set `max_idle_connections_per_host` according to our [production perfomance guide][1]

We thoroughly analyzed every piece of our Gateway, and the results we are astounding up to 160% improvement, comparing to our previous 2.6 release.

Such performance boost comes from various factors, such as optimizing default configs, better HTTP connection re-use, optimization of analytics processing pipeline, regexp caching, doing fewer queries to the database, and numerous small changes in each of middleware we have.

Our performance testing plan was focused on replicating setup of our customers, and try not to optimize for “benchmarks”: so no supercomputers and no sub-millisecond inner DC latency. Instead, we were testing on average performance 2 CPU Linode machine, with 50ms latency between Tyk and upstream. For testing, we used Tyk Gateway in Hybrid mode, with default config, except single 2.7 change where `max_idle_connections_per_host ` set to 500, vs. 100 in 2.6. Test runner was using [Locust][2] framework and [Boomer][3] for load generation.

For keyless API we were able to achieve 3.7K RPS (requests per second) for 2.7, while 2.6 showed about 2.5K RPS, which is a 47% improvement.

For protected APIs, when Tyk needs to track both rate limits and quotas, 2.7 shows around 3.1K RPS, while 2.6 shows around 1.2K RPS, which is 160% improvement!

In 2.7 we optimized connection pool between Tyk and Upstream, and if previously `max_idle_connections_per_host` option, was capped by 100, in 2.7 you can set it to any value. `max_idle_connections_per_host` by itself controls an amount of keep-alive connections between Tyk and Upstream. If you set this value too low, then Tyk will not re-use connections and will have to open a lot of new connections to your upstream. If you set this value too big, you may encounter issues when slow clients occupy your connection, you may reach OS limits. You can calculate the right value using a straightforward formula: if latency between Tyk and Upstream is around 50ms, then a single connection can handle 1s / 50s = 20 requests. So if you plan to handle 2000 requests per second using Tyk, size of your connection pool should be at least 2000 / 20 = 100. And for example, on low-latency environments (like 5ms), a connection pool of 100 connections will be enough for 20k RPS.

To get the benefit of optimized connection pooling, ensure that `close_connections` set to false, which enables keep-alive between Tyk and Upstream.

### Custom key hashing algorithms

Key hashing is a security technique introduced inside Tyk long ago, which allows you not to store your API tokens in database, and instead, store only their hashes. Only API consumers have access to their API tokens, and API owners have access to the hashes, which gives them access to usage and analytics in a secure manner. Time goes on, algorithms age, and to keep up with the latest security trends, we introduce a way to change algorithms used for key hashing.

This new feature is in public beta, and turned off by default, keeping old behavior when Tyk uses `murmur32` algorithm. To set the custom algorithm, you need to set `hash_key_function` to one of the following options:
- `murmur32`
- `murmur64`
- `murmur128`
- `sha256`

MurMur non-cryptographic hash functions considered as industry fastest and conflict-prone algorithms up to date, which gives a nice balance between security and performance. With this change you now you may choose the different hash length, depending on your organization security policies. Besides that, we introduce new `sha256` **cryptographic** key hashing algorithm, in cases when you are willing to sacrifice performance with additional security.

Performance wise, setting new key hashing algorithms, can increase key hash length, as well as key length itself, so expect that your analytics data size to grow (but not that much, up to 10%). Additionally, if you set `sha256` algorithm, it will significantly slowdown Tyk, because `cryptographic` functions are slow by design but very secure.

Technical wise, it is implemented by new key generation algorithms, which now embed additional metadata to the key itself, and if you curious about actual implementation details, feel free to check following pull request [4]

Changing hashing algorithm is entirely backward compatible: all your existing keys will continue working with old `murmur32` hashing algorithm, and your new keys will use algorithm specified in Tyk config. Moreover, changing algorithms is also backward compatible, and Tyk will maintain keys multiple hashing algorithms without any issues.


## <a name="dashboard"></a>Tyk Dashboard v1.7.0

### User Groups

Instead of setting permissions per user, you now can [create a user group][5], and assign it to multiple users. It works for Single Sign-On too, just specify group ID during [SSO API][6] flow.

> This feature is available to all our Cloud and Hybrid users. For On-Premise installations, this feature is available only for customers with “Unlimited” license.

To manage user groups, ensure that you have either admin or “user groups” permission for your user, which can be enabled by your admin.

From an API standpoint of view, user groups itself can be managed by [new Dashboard API][7]. User object now has a new `group_id` field, and if it is specified, all permissions will be inherited from the specified group. [SSO API][6] has been updated to include `group_id` field as well.

### Added SMTP support
Now you can configure Dashboard to send transactional emails using your SMTP provider. See [documentation][8] for details.

## <a name="upgrade"></a>Upgrading all new Components

For details on upgrading all Tyk versions, see [Upgrading Tyk](https://tyk.io/docs/upgrading-tyk/).

## <a name="new"></a>Don't Have Tyk Yet?

Get started now, for free, or contact us with any questions.

* [Get Started](https://tyk.io/pricing/compare-api-management-platforms/#get-started)
* [Contact Us](https://tyk.io/about/contact/)

    [1]: /docs/deploy-tyk-premise-production/
    [2]: https://locust.io/
    [3]: https://github.com/myzhan/boomer
    [4]: https://github.com/TykTechnologies/tyk/pull/1753
    [5]: /docs/security/dashboard/create-user-groups/
    [6]: /docs/dashboard-admin-api/sso/
    [7]: /docs/tyk-dashboard-api/user-groups/
    [8]: /docs/configure/outbound-email-configuration/
