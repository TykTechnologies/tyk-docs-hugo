--- 
date: 2021-18-01T15:00:00+13:00
title: Tyk Identity Broker
menu:
  main:
    parent: "Tyk Stack"
weight: 3
url: "/tyk-identity-broker/"
aliases:
  - /concepts/tyk-components/identity-broker/rel=/
  - /getting-started/tyk-components/identity-broker
  - /getting-started/key-concepts/tyk-components/identity-broker/
  - /concepts/tyk-components/identity-broker/
---

## What is Tyk Identity Broker (TIB)?

Tyk Identity Broker (TIB) is a component providing a bridge between various Identity Management Systems such as LDAP, Social OAuth (e.g. GPlus, Twitter, GitHub) or Basic Authentication providers, to your Tyk installation.

TIB can act as a bridge between the API Gateway, Tyk Portal or even the Tyk Dashboard, and makes it easy to integrate custom IDMs to your system.

Starting from Tyk v3.0 TIB has been added as a built-in feature of the Tyk Dashboard. You no longer have to setup a separated instance of the service to make it work with the Dashboard. You now have two options: 
1. Internal TIB: Embedded in dashboard. Easy configuration and set up. Share the same port as the dashboard
2. External TIB: Installation of TIB as a different component for advanced use cases. Requires changes to the config files and separate port.  


## What can you do with the Tyk Identity Broker (TIB)?

By using the identity broker in conjunction with an IDP you have the ability to perform actions such as:

- Enabling easy access via social logins to the developer portal (e.g. GitHub login)
- Enabling internal access to the dashboard (e.g. via LDAP/ActiveDirectory)
- Enabling easy token generation from a third party for things such as mobile apps and webapps without complex configuration

### How it Works

TIB provides a simple API through which traffic can be sent. The API will match the request to a profile which then exposes two things:

1. An **Identity Provider** that will authorise a user and validate their identity
2. An **Identity Handler** that will authenticate a user with a delegated service (in this case, Tyk)

#### Identity Providers

Identity providers can be anything, as long as they implement the `tap.TAProvider` interface. Bundled with TIB at the moment you have four provider types:

1. **Social** - this provides OAuth handlers for many popular social logins (such as Google, Github and Bitbucket)
2. **LDAP** - a simple LDAP protocol binder that can validate a username and password against an LDAP server (tested against OpenLDAP)
3. **Proxy** - a generic proxy handler that will forward a request to a third party and provides multiple "validators" to identify whether a response is successful or not (e.g. status code, content match and regex)
4. **SAML** - provides a way to authenticate against a SAML IDP.

#### Identity Handlers

An identity handler will perform a predefined set of actions once a provider has validated an identity. These actions are defined as a set of action types:

1. `GenerateOrLoginUserProfile` - this will log a user into the Tyk Dashboard (this does not create a user, it only creates a temporary session for the user to have access). This flow is defined as next:

![Generate Or Login User Profile flow](/img/diagrams/generate-or-login-user-profile.png)

2. `GenerateOrLoginDeveloperProfile` - this will create or login a user to the Tyk Developer Portal. The flow is similar to _GenerateOrLoginUserProfile_ but in this case if the developer doesn't exist then it will be created.

3. `GenerateOAuthTokenForClient` - this will act as a client ID delegate and grant an Tyk provided OAuth token for a user using a fragment in the redirect URL (standard flow). The flow is defined as:

![Generate Oauth token for client](/img/diagrams/generate-oauth-token-for-client.png)
