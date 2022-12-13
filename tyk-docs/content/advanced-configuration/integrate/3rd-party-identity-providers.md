---
date: 2017-03-24T16:56:58Z
title: 3rd Party Identity Providers
menu:
  main:
    parent: "Integration Options"
weight: 0
url: "/advanced-configuration/integrate/3rd-party-identity-providers"
aliases:
  - /integrate/3rd-party-identity-providers/
---

## Dashboard SSO API
The Dashboard exposes a special API to implement custom authentications for the Dashboard and Portal. See the [Dashboard Admin API]({{< ref "tyk-apis/tyk-dashboard-admin-api/sso/" >}}) for more details.

You can use the `sso_permission_defaults` dashboard configuration option to configure the permissions of users created via SSO API. See the SSO API docs above.

In addition you can set custom login pages for the dashboard and portal using `sso_custom_login_url` and `sso_custom_portal_login_url` dashboard configuration options.

## Tyk Identity Broker (TIB) Overview 

### What is the Tyk Identity Broker?

The Tyk Identity Broker (TIB) provides a service-level component that enables delegated identities to be authorised and provide authenticated access to various Tyk components such as the Tyk Dashboard, the Tyk Developer Portal and Tyk Gateway API flows such as OAuth access tokens and regular API tokens.

Internally the TIB uses the Dashboard SSO API mentioned above.

Starting from Tyk v3.0 the Tyk Identity Broker has been added as a built-in feature of the Tyk Dashboard. Users will no longer need to set up a separated instance of the service to make it work with Dashboard. However this is not mandatory and users still can set the configs to connect to an external TIB. The built-in TIB doesn't require any configuration and is quite easy to make it available. The internal identity broker is exposed on the same port as the Tyk Dashboard and does not require a separate port to work as intended.

Additionally dashboard adds user interface to manage the profiles. 
![Identity Broker User Interface](https://user-images.githubusercontent.com/35005482/82677001-f20fb600-9c64-11ea-8ed3-2973b1d51463.gif)

### How it works

Tyk Identity Broker provides a simple API, which traffic can be sent through to the API and the API will match the request to a profile which then exposes two things:

*   An Identity Provider - the thing that will authorize a user and validate their identity
*   An Identity Handler - the thing that will authenticate a user with a delegated service (in this case, Tyk)

##### Identity Providers

Identity providers can be anything, so long as they implement the `tap.TAProvider` interface. Bundled with TIB at the moment you have four providers:

1.  Social - Provides OAuth handlers for many popular social logins (such as Google, Github and Bitbucket)
2.  LDAP - A simple LDAP protocol binder that can validate a username and password against an LDAP server (tested against OpenLDAP)
3.  SAML - Provides SAML login flows with any IDP i.e. Azure AD, Auth0, Okta, Ping or Keycloak
3.  Proxy - A generic proxy handler that will forward a request to a third party and provides multiple "validators" to identify whether a response is successful or not (e.g. status code, content match and regex)

#### Identity Handlers

An identity handler will perform a predefined set of actions once a provider has validated an identity, these actions are defined as a set of action types:

*   Pass-through or redirect user-based actions
    
    *   `GenerateOrLoginDeveloperProfile`: Creates or logs in a user to the Tyk Developer Portal.
    *   `GenerateOrLoginUserProfile`: Logs a user into the Dashboard (this does not create a user, only drops a temporary session for the user to have access).
    *   `GenerateOAuthTokenForClient`: Acts as a client ID delegate and grant a Tyk-provided OAuth token for a user using a fragment in the redirect URL (standard flow).

*   Direct or redirect:
    
    *   `GenerateTemporaryAuthToken`: Generates a Tyk standard access token for the user, can be delivered as a redirect fragment OR as a direct API response (JSON).

These are actions are all handled by the `tap.providers.TykIdentityHandler` module which wraps the Tyk Gateway, Dashboard and Admin APIs to grant access to a stack.

Handlers are not limited to Tyk, a handler can be added quite easily by implementing the `tap.IdentityHandler` so long as it implements this pattern and is registered it can handle any of the above actions for its own target.

### Requirements and dependencies

{{< note success >}}
**Note**  

The Tyk Identity Broker must be run locally to support SSO with Tyk Cloud Classic. 
{{< /note >}}

Starting from Tyk Dashboard v3.0, TIB is built-in to the dashboard. 
You don't have to do anything, only ensure that in the dashboard's config file the config `identity_broker` is not pointing to an external service, and `identity_broker.enabled` set to `true`. Example:

```
"identity_broker": {
    "enabled": true,
    "host": {
        "connection_string": "",
        "secret": ""
    }
},
```

The settings will behave as next:

* If `enabled` = false then neither external or internal TIB will be loaded
* If `enabled` = true and tib host is set, then external TIB will be loaded
* If `enabled` = true and tib host is not present the internal TIB will be loaded

If you want install it as a separate component see [installing TIB]({{< ref "tyk-identity-broker/getting-started#installation" >}}).
