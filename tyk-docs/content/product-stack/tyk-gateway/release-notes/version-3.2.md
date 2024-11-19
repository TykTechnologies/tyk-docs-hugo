---
title: Tyk Gateway v3.2
description: "Tyk Gateway 3.2 release notes"
tags: ["release notes", "Tyk Gateway", "v3.2", "3.2"]
aliases:
    - /release-notes/version-3.2/
---

## Release Highlights

#### GraphQL and UDG improvements

We've updated the GraphQL functionality of our [Universal Data Graph]({{< ref "universal-data-graph" >}}). You’re now able to deeply nest GraphQL & REST APIs and stitch them together in any possible way.

Queries are now possible via WebSockets and Subscriptions are coming in the next Release (3.3.0).

You're also able to configure [upstream Headers dynamically]({{< ref "universal-data-graph/udg-getting-started/header-forwarding" >}}), that is, you’re able to inject Headers from the client request into UDG upstream requests. For example, it can be used to acccess protected upstreams. 

We've added an easy to use URL-Builder to make it easier for you to inject object fields into REST API URLs when stitching REST APIs within UDG.

Query-depth limits can now be configured on a per-field level.

If you’re using GraphQL upstream services with UDG, you’re now able to forward upstream error objects through UDG so that they can be exposed to the client.

#### Go response plugins

With Go response plugins you are now able to modify and create a full request round trip made through the Tyk Gateway. 
Find out more about [plugins]({{< ref "plugins" >}}) and how to write [Go response plugins]({{< ref "/product-stack/tyk-gateway/advanced-configurations/plugins/golang/writing-go-plugins#creating-a-custom-response-plugin" >}}).

## Changelog

In addition to the above, version 3.2 includes all the fixes that are part of 3.0.5
https://github.com/TykTechnologies/tyk/releases/tag/v3.0.5

## Updated Versions
Tyk Gateway 3.2

## Upgrade process
If you already have GraphQL or UDG APIs you need to follow this upgrade guide https://tyk.io/docs/graphql/migration-guide/
