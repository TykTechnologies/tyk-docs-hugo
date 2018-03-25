---
date: 2017-03-24T16:56:58Z
title: 3rd Party Identity Providers
menu:
  main:
    parent: "Integration Options"
weight: 0
url: "/integrate/3rd-party-identity-providers"
---

## <a name="dashboard-sso"></a>Dashboard SSO API
The Dashboard exposes a special API to implement custom authentications for the Dashboard and Portal. See the [Docs](/docs/dashboard-admin-api/sso).

You can use the `sso_permission_defaults` dashboard configuration option to configure the permissions of users created via SSO API. See the SSO API docs above.

In addition you can set custom login pages for the dashboard and portal using `sso_custom_login_url` and `sso_custom_portal_login_url` dashboard configuration options.

## <a name="tib"></a>Tyk Identity Broker (TIB) Overview 

### What is the Tyk Identity Broker?

The Tyk Identity Broker (TIB) provides a service-level component that enables delegated identities to be authorized and provide authenticated access to various Tyk-powered components such as the Tyk Dashboard, the Tyk Developer Portal and Tyk Gateway API flows such as OAuth access tokens, and regular API tokens.

Internally the TIB uses the  Dashboard SSO API mentioned above.

### How it works

Tyk Identity Broker provides a simple API, which traffic can be sent *through*to the API and the API will match the request to a *profile* which then exposes two things:

*   An Identity Provider - the thing that will authorize a user and validate their identity
*   An Identity Handler - the thing that will authenticate a user with a delegated service (in this case, Tyk)

##### Identity Providers

Identity providers can be anything, so long as they implement the `tap.TAProvider` interface. Bundled with TIB at the moment you have three providers:

1.  Social - Provides OAuth handlers for many popular social logins (such as Google, Github and Bitbucket)
2.  LDAP - A simple LDAP protocol binder that can validate a username and password against an LDAP server (tested against OpenLDAP)
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

TIB requires:

*   Tyk Gateway v1.9.1+
*   Tyk Dashboard v0.9.7.1+
*   Redis

### Installation

Extract the tarball and run the binary:

`tar -xvzf tib-linux-amd64-v0.1.tar.gz
cd tib-v0.1
./tib`

### Usage

No command line arguments are needed, but if you are running TIB from another directory or during startup, you will need to set the absolute paths to the profile and config files:

```{.copyWrapper}
    Usage of ./tyk-auth-proxy:
      -c=string
            Path to the config file (default "tib.conf")
      -p=string
            Path to the profiles file (default "profiles.json")
```



