---
title: URL Rewriting
date: 2024-01-16
description: "Overview of the URL Rewriting feature"
tags: ["URL rewrite", "middleware", "per-endpoint"]
aliases:
  - /advanced-configuration/transform-traffic/url-rewriting
---

## Overview of URL Rewriting

URL rewriting in Tyk is a powerful feature that enables the modification of incoming API request paths to match the expected endpoint format of your backend services. This process is accomplished by using regular expressions (regexes) to identify and capture specific segments of the request URL, which can then be rearranged or augmented to construct the desired endpoint URL.

The flexibility of Tyk's URL rewriting mechanism allows for conditional rewrites based on the presence of certain parameters within the request, ensuring that the rewrite logic is applied only when appropriate. This allows for granular redirection of requests, for example to direct certain users to a beta service while others are sent to the production version.

By employing URL rewriting, Tyk facilitates seamless communication between client applications and backend services, ensuring that API requests are efficiently routed and processed. This feature is instrumental in maintaining a clean and organized API architecture, while also providing the adaptability required to handle evolving backend systems.

## When to use URL Rewriting

#### Internal Looping

API requests can be redirected to other endpoints or APIs deployed on Tyk using the URL rewrite functionality. This allows requests to be redirected to internal APIs that are not directly exposed on the Gateway (for example to reduce complexity of the external interface or to perform additional processing or security checks before reaching sensitive upstream APIs). We refer to this practice as [looping]({{< ref "advanced-configuration/transform-traffic/looping" >}}). By performing the looping internally using the URL rewrite middleware, latency is reduced because the redirection is handled entirely within Tyk with no unnecessary external network calls.

#### Improved Performance Optimization

You can use URL rewriting to route traffic intelligently to particular API endpoints, distributing the processing burden evenly across your system and minimizing load on your backend resources. This reduces the chances of overwhelming individual nodes and ensures consistent performance levels throughout the entire infrastructure.

#### Enhanced Scalability

As your API portfolio scales, you may find yourself dealing with an ever-increasing array of unique URLs. Instead of creating separate endpoints for every permutation, URL rewriting allows you to consolidate those disparate routes into a centralised location. This simplification makes it easier to monitor and manage the overall system, ultimately enhancing its resilience and stability.

#### Better User Experiences

With URL rewriting, you can design cleaner, more straightforward navigation structures for your APIs, making it simpler for consumers to locate and interact with the information they require.

## How URL Rewriting works

Tyk's URL rewrite middleware uses the concepts of [triggers]({{< ref "product-stack/tyk-gateway/middleware/url-rewrite-middleware#url-rewrite-triggers" >}}) and [rules]({{< ref "product-stack/tyk-gateway/middleware/url-rewrite-middleware#url-rewrite-rules" >}}). These can be combined in flexible ways to create sophisticated logic to direct requests made to a single endpoint to various upstream services (or other APIs internally exposed within Tyk).

A rule is a simple pattern match - you identify the location of a `key` and define a regex (called the `pattern`). Tyk will examine the API request and compare the `key` with the `pattern`. If there is a match, the rule will pass.

A trigger combines one or more rules with a target (or `rewriteTo`) URL. If the logical combination of the rules results in a pass outcome, then the trigger is considered to have been fired and the target URL for the request will be rewritten.

More detail on URL Rewrite triggers and rules can be found [here]({{< ref "product-stack/tyk-gateway/middleware/url-rewrite-middleware" >}}).

If you're using Tyk OAS APIs, then you can find details and examples of how to configure the URL rewrite middleware [here]({{< ref "product-stack/tyk-gateway/middleware/url-rewrite-tyk-oas" >}}).

If you're using Tyk Classic APIs, then you can find details and examples of how to configure the URL rewrite middleware [here]({{< ref "product-stack/tyk-gateway/middleware/url-rewrite-tyk-classic" >}}).

<!-- proposed "summary box" to be shown graphically on each middleware page

## URL Rewrite middleware summary
 - The URL Rewrite middleware is an optional stage in Tyk's API Request processing chain, sitting between the [Request Header Transform]({{< ref "transform-traffic/request-headers" >}}) and [Response Caching]({{< ref "api-management/gateway-optimizations#" >}}) middleware.
 - URL Rewrite is configured at the per-endpoint level within the API Definition and is supported by the API Designer within the Tyk Dashboard.
 - URL Rewrite can access both [session metadata]({{< ref "getting-started/key-concepts/session-meta-data" >}}) and [request context variables]({{< ref "context-variables" >}}).
 
-->
