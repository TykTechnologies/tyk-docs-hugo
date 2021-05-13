---
date: 2017-03-24T17:10:33Z
title: Dynamic Client Registration
menu:
  main:
    parent: "Tyk Developer Portal"
weight: 3
---

## OAuth 2.0 Dynamic Client Registration Protocol (DCR)

Available from version 3.2.0 onwards.

## What is Dynamic Client Registration? 

DCR is a protocol of the Internet Engineering Task Force put in place to set standards in the dynamic registration of clients with authorisation servers. 
We will go into the specifics of how it works in the context of Tyk, but if you are interested in reading the full RFC, go to: https://tools.ietf.org/html/rfc7591

## Why should I use it? 

DCR is a way for you to integrate your developer portal with an external identity provider such as Keycloak, Gluu, Auth0, Okta etc... 
The portal developer won't notice a difference. However when they create the app via Tyk Developer portal, Tyk will dynamically register that client on your authorization server. This means that it is the Authorization Server who will issue issue the Client ID and Client Secret for the app.
Some of our users leverage external Identity Providers because they provide a variety of features to support organisations in managing identity in one place across all their stack. 

This feature is optional and you can still have a great level of security only using Tyk as your authorisation server. 

## Enabling Dynamic Client Registration

We provide guides for the following identity providers:

- [Keycloak](/docs/tyk-developer-portal/keycloak-dcr/). Additional notes are found [here](https://github.com/keycloak/keycloak-documentation/blob/master/securing_apps/topics/client-registration.adoc).
- [OKTA](/docs/tyk-developer-portal/okta-dcr/). Official docs are available [here](https://developer.okta.com/docs/reference/api/oauth-clients/).

Support for Gluu has also been tested, you may find the docs [here](https://www.gluu.org/).

In case your provider isn't on the list, use the "Other" provider option in the DCR settings. This mode would keep the interaction with your IDP as standard possible. Note that not all IDPs fully implement the standard.

## Troubleshooting

The DCR functionality abstracts most of the errors to the end user (in this case, the developer). In order to diagnose issues between Tyk and your IDP, please refer to the Tyk Dashboard logs.