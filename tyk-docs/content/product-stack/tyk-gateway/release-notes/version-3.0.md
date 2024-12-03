---
title: Tyk Gateway v3.0
description: "Tyk Gateway 3.0 release notes"
tags: ["release notes", "Tyk Gateway", "v3.0", "3.0"]
aliases:
    - /release-notes/version-3.0/
---

## Release Highlights

#### Version changes and LTS releases

We have bumped our major Tyk Gateway version from 2 to 3, a long overdue change as we’ve been on version 2 for 3 years. We have also changed our Tyk Dashboard major version from 1 to 3, and from now on it will always be aligned with the Tyk Gateway for major and minor releases. The Tyk Pump has also now updated to 1.0, so we can better indicate major changes in future. 

Importantly, such a big change in versions does not mean that we going to break backward compatibility. More-over we are restructuring our internal release strategy to guarantee more stability and to allow us to deliver all Tyk products at a faster pace. We aim to bring more clarity to our users on the stability criteria they can expect, based on the version number.
Additionally we are introducing Long Term Releases (also known as LTS).

Read more about this changes in our blogpost: https://tyk.io/introducing-long-term-support-some-changes-to-our-release-process-product-versioning/


#### Universal Data Graph and GraphQL

Tyk now supports GraphQL **natively**. This means Tyk doesn’t have to use any external services or process for any GraphQL middleware. You can securely expose existing GraphQL APIs using our GraphQL core functionality.

In addition to this you can also use Tyk’s integrated GraphQL engine to build a Universal Data Graph. The Universal Data Graph (UDG) lets you expose existing services as one single combined GraphQL API.

All this without even have to build your own GraphQL server. If you have existing REST APIs all you have to do is configure the UDG and Tyk has done the work for you.

With the Universal Data Graph Tyk becomes your central integration point for all your internal as well as external APIs. In addition to this, the UDG benefits from all existing solutions that already come with your Tyk installation. That is, your Data Graph will be secure from the start and there’s a large array of out of the box middlewares you can build on to power your Graph.

Read more about the [GraphQL]({{< ref "graphql" >}}) and [Universal Data Graph]({{< ref "universal-data-graph" >}})

#### Using external secret management services

Want to reference secrets from a KV store in your API definitions? We now have native Vault & Consul integration. You can even pull from a tyk.conf dictionary or environment variable file.

[Read more]({{< ref "tyk-configuration-reference/kv-store" >}})

#### Co-Process Response Plugins

We added a new middleware hook allowing middleware to modify the response from the upstream. Using response middleware you can transform, inspect or obfuscate parts of the response body or response headers, or fire an event or webhook based on information received by the upstream service.

At the moment the Response hook is supported for [Python and gRPC plugins]({{< ref "plugins/supported-languages/rich-plugins/rich-plugins-work#coprocess-dispatcher---hooks" >}}).


#### Enhanced Gateway health check API

Now the standard Health Check API response include information about health of the dashboard, redis and mdcb connections.
You can configure notifications or load balancer rules, based on new data. For example, you can be notified if your Tyk Gateway can’t connect to the Dashboard (or even if it was working correctly with the last known configuration).

[Read More]({{< ref "planning-for-production/ensure-high-availability/health-check" >}})

#### Enhanced Detailed logging
Detailed logging is used in a lot of the cases for debugging issues. Now as well as enabling detailed logging globally (which can cause a huge overhead with lots of traffic), you can enable it for a single key, or specific APIs. 

New detailed logging changes are available only to our Self-Managed customers currently.

[Read More]({{< ref "tyk-stack/tyk-pump/useful-debug-modes" >}})

#### Better Redis failover

Now, if Redis is not available, Tyk will be more gracefully handle this scenario, and instead of simply timing out the Redis connection, will dynamically disable functionality which depends on redis, like rate limits or quotas, and will re-enable it back once Redis is available. The Tyk Gateway can even be started without Redis, which makes possible scenarios, such as when the Gateway proxies Redis though itself, like in a Redis Sentinel setup.

#### Ability to shard analytics to different data-sinks

In a multi-org deployment, each organization, team, or environment might have their preferred analytics tooling. At present, when sending analytics to the Tyk Pump, we do not discriminate analytics by org - meaning that we have to send all analytics to the same database - e.g. MongoDB. Now the Tyk Pump can be configured to send analytics for different organizations to different places. E.g. Org A can send their analytics to MongoDB + DataDog. But Org B can send their analytics to DataDog + expose the Prometheus metrics endpoint.

It also becomes possible to put a {{<fn>}}blocklist{{</fn>}} in-place, meaning that some data sinks can receive information for all orgs, whereas others will not receive OrgA’s analytics if blocked.

This change requires updating to new Tyk Pump 1.0

[Read More]({{< ref "tyk-pump/configuration" >}})

#### 404 Error logging - unmatched paths

Concerned that client’s are getting a 404 response? Could it be that the API definition or URL rewrites have been misconfigured? Telling Tyk to track 404 logs, will cause the Tyk Gateway to produce error logs showing that a particular resource has not been found. 

The feature can be enabled by setting the config `track_404_logs` to `true` in the gateway's config file.

## Changelog

#### Fixes

- Fixed the bug when tokens created with non empty quota, and quota expiration set to `Never`, were treated as having unlimited quota. Now such tokens will stop working, once initial quota is reached. 

## Updated Versions

- Tyk Gateway 3.0
- Tyk Pump 1.0

## Upgrading From Version 2.9

No specific actions required.
If you are upgrading from version 2.8, pls [read this guide]({{< ref "product-stack/tyk-gateway/release-notes/archived-releases/version-2.9.md" >}})
