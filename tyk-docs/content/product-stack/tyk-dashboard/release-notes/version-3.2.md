---
title: Tyk Dashboard v3.2
description: "Tyk Dashboard 3.2 release notes"
tags: ["release notes", "Tyk Dashboard", "v3.2", "3.2"]
---

## Release Notes

#### Bring your own Identity Provider - Dynamic Client Registration now available!

DCR is a protocol of the Internet Engineering Task Force put in place to set standards in the dynamic registration of clients with authorization servers. This feature is a way for you to integrate your Tyk Developer Portal with an external identity provider such as Keycloak, Gluu, Auth0 or Okta. 
The portal developer won't notice a difference. However, when they create the app via Tyk Developer portal, Tyk will dynamically register that client on your authorization server. This means that it is the Authorization Server that will issue the Client ID and Client Secret for the app.

Check our DCR docs [here]({{< ref "/tyk-developer-portal/tyk-portal-classic/dynamic-client-registration" >}})

We also took this opportunity to give a refresh to the portal settings UI so let us know if you like it! 

#### GraphQL and UDG improvements

We've updated the GraphQL functionality of our [Universal Data Graph]({{< ref "universal-data-graph" >}}). You’re now able to deeply nest GraphQL & REST APIs and stitch them together in any possible way.

Queries are now possible via WebSockets and Subscriptions are coming in the next Release (3.3.0).

You're also able to configure [upstream Headers dynamically]({{< ref "universal-data-graph/udg-getting-started/header-forwarding" >}}), that is, you’re able to inject Headers from the client request into UDG upstream requests. For example, it can be used to acccess protected upstreams. 

We've added an easy to use URL-Builder to make it easier for you to inject object fields into REST API URLs when stitching REST APIs within UDG.

Query-depth limits can now be configured on a per-field level.

If you’re using GraphQL upstream services with UDG, you’re now able to forward upstream error objects through UDG so that they can be exposed to the client.


#### Extendable Tyk Dashboard permissions system

The Tyk Dashboard permission system can now be extended by writing custom rules using an Open Policy Agent (OPA). The rule engine works on top of the Tyk Dashboard API, which means you can control not only access rules, but also the behavior of all Dashboard APIs (except your public developer portal). You can find more details about OPA [here]({{< ref "/content/tyk-dashboard/open-policy-agent.md" >}}).

In addition, you can now create your own custom permissions using the Additional Permissions API or by updating `security.additional_permissions` map in the Tyk Dashboard config, and writing Opa rule containing logic for the new permission.

## Changelog

In addition to the above, version 3.2 includes all the fixes that are part of 3.0.5
https://github.com/TykTechnologies/tyk/releases/tag/v3.0.5

## Updated Versions
Tyk Dashboard 3.2

## Upgrade process
If you already have GraphQL or UDG APIs you need to follow this upgrade guide https://tyk.io/docs/graphql/migration-guide/
