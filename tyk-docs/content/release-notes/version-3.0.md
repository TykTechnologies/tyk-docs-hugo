---
title: Tyk v3.0
menu:
  main:
    parent: "Release Notes"
weight: 1
---

### Version change and LTS releases

We have bumped our major gateway version from 2 to 3, a long overdue change as we’ve been on version 2 for 3 years. We have also changed our Tyk Dashboard major version from 1 to 3, and from now on it will always be aligned with the Tyk Gateway major and minor releases.

Such big change does not mean that we going to break backward compatibility. More-over are changing our internal release strategy to guarantee more stability and to allow us to deliver our product at a faster pace. We aim to bring more clarity to our users on the stability criteria they can expect, based on the version number.
Additionally we are introducing Long Term Releases (also known as LTS).

Read more about this changes in our blogpost: https://tyk.io/introducing-long-term-support-some-changes-to-our-release-process-product-versioning/

### New Look and Feel

We have a brand new look to our dashboard. About half a year ago, we made some changes to our visual branding to better express our love for creativity and UX. Those changes started with our website and now we are also incorporating these visual changes into the UI of our products. We do this to keep our brand consistent across the whole Tyk experience and to enhance your experience using our products. 

See our updated [Tutorias](/docs/try-out-tyk/tutorials/tutorials/) section.

### Universal Data Graph and GraphQL

Now Tyk supports GraphQL **natively**. This means Tyk doesn’t have to use any external service or process for any GraphQL middleware. You can securely expose existing GraphQL APIs using our GraphQL core functionality.

In addition to this you can also use Tyk’s integrated GraphQL engine to build a Universal Data Graph. The Universal Data Graph (UDG) lets you expose existing services as one single combined GraphQL API.

It’s important to note that you don’t even have to build your own GraphQL server. If you have existing REST APIs all you have to do is configure the UDG.

With the Universal Data Graph Tyk becomes your central integration point for all your internal as well as external APIs. In addition to this, the UDG benefits from all existing solutions that already come with your tyk installation. That is, your Data Graph will be secure from the start and there’s a large array of middlewares you can build on to power your Graph.

Read more about the [GraphQL](/docs/graphql/) and [Universal Data Graph](/docs/universal-data-graph/)


### Policies and Keys UX changes 

We have a lot to update you on with our UX & UI revamp, but one thing we want to highlight here is the update to policies and keys. We know there was confusion in the way we set policies and keys up in the Tyk dashboard, so we redesigned the UI to make it less error-prone, simpler and more intuitive when you create, view and edit Security Policies and Keys.

Creating keys and policies was not streamlined so we redesigned the workflow to make it easier and more intuitive for the user to create, view and edit policies and keys. 

When a customer goes to create,view or edit a key the steps are in a more logical order. We’ve removed the long form that needed to be filled out and replaced it with tabs so you can find and enter information easily. We’ve also grouped all information within each API so you know the exact set up of each of your access rights without any confusion. The new workflow should allow tasks to be completed faster and more efficiently.

See updated tutorials on how to [create a policy](/docs/try-out-tyk/tutorials/create-security-policy) and [key](/docs/try-out-tyk/tutorials/create-api-key/)


### Identity broker built-in to the Dashboard

Previously you had to run a separate process to setup SSO (single sign on). Now this functionality is built-in to the dashboard and got UI revamp. So now you can just start the dashboard, and via UI, create a SSO flow, without installing 3-rd party components. 

<!-- TODO: Link -->


### Using external secret management services

Want to reference secrets from a KV store in your API definitions? We now have native Vault & Consul integration. You can even pull from a tyk.conf dictionary or environment variable file.

[Read more](/docs/tyk-configuration-reference/kv-store/)


### Co-Process Response Plugins

We added a neww middleware hook allowing middleware to modify the response from the upstream.
Using response middleware you can transform, inspect or obfuscate parts of the response body or response headers, or fire an event or webhook based on information received by the upstream service.

At the moment Response hook is supported for [Python and gRPC plugins](/docs/plugins/rich-plugins/rich-plugins-work/#overriding-response).


### Enhanced Gateway health check API

Now standard Health Check API response include information about health of the dashboard, redis and mdcb connections.
You can configure notifications or load balancer rules, based on new data. For example, notify if gateway can’t connect to the dashboard (even if it is working correctly on the last known configuration).

[Read More](/docs/planning-for-production/ensure-high-availability/health-check/)

### Enhanced Detailed logging
Detailed logging in a lot of the cases used for debugging the issues. Now instead of enabling it globally (which can cause a huge overhead with lots of traffic), you can enable it for a single key, or specific API. 

New detailed logging changes available only to our on-premise customers.

[Read More](/docs/analytics-and-reporting/useful-debug-modes/#enabling-detailed-logging)

### Better Redis failover
Now, if Redis is not available, Tyk will more efficiently handle this scenario, and instead of giving the timeouts, will dynamically disable functionality which depends on redis, like rate limits or quotas, and will re-enable it back once Redis is available. Gateway now can even start without Redis, which makes possible scenarios, when gateway proxy Redis though itself, like Redis Sentinel setup.
<!-- TODO: Add a link -->

### Weight-Based Load Balancing

Dashboard now allows you to control weighting of the upstreams, when using load balancing functionality. For example now you can configure Tyk to send 20% of traffic to one upstream, with 80% to another upstream service.

This enables Tyk Customers to perform Canary or A/B tests of their APIs and services. Similarly, if caches require warming, then we can send a low % of traffic to these services, and when confident that they can handle the load, start incrementally sending a higher % of traffic to these services.

[Read More](/docs/planning-for-production/ensure-high-availability/load-balancing/#configure-load-balancing-and-weighting-via-the-dashboard)

### Ability to shard analytics to different data-sinks

In a multi-org deployment, each organisation or team, or environment might have their preferred analytics tooling. At present, when sending analytics to Pump, we do not discriminate analytics by org - meaning that we have to send all analytics to the same database - e.g. MongoDB. Now Tyk Pump can be configured to send analytics for different organisations to different places. E.g. Org A can send their analytics to MongoDB + DataDog. But Org B can send their analytics to DataDog + expose Prometheus metrics endpoint.

It also becomes possible to put a blacklist in-place, meaning that some data-sinks can receive information for all orgs, whereas other data-sinks will not receive OrgA’s analytics if blacklisted.

[Read More](/docs/tyk-configuration-reference/tyk-pump-configuration/tyk-pump-configuration/#sharding-analytics-to-different-data-sinks)

### 404 Error logging - unmatched paths

Concerned that client’s are getting a 404 response? Could it be that the API definition or URL rewrites have been misconfigured? Telling Tyk to track 404 logs, will cause Tyk Gateway to spit some errors showing that a particular resource has not been found. 



### Updated Versions

- Tyk Gateway 3.0
- Tyk Dashboard 3.0
- Tyk Pump 1.0

### Upgrading From Version 2.9

No specific actions required.
If you are upgrading from version 2.8, pls read this guide: <!-- link to 2.8 release notes pages, similar section -->
