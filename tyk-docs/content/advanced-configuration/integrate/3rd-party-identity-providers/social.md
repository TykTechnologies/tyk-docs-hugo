---
date: 2017-03-24T16:58:32Z
title: Social Provider
menu:
  main:
    parent: "3rd Party Identity Providers"
weight: 0
url: "/advanced-configuration/integrate/3rd-party-identity-providers/social"
---


## <a name="integration-tutorials-social"></a>Integration Tutorials: Social Overview
The social provider for the Tyk Identity Broker is a thin wrapper around the excellent `goth` social auth library, modified slightly to work with a multi-tenant structure. The social provider should provide seamless integration with:

*   Bitbucket
*   Digital Ocean
*   Dropbox
*   GitHub
*   Google+
*   Linkedin
*   Twitter
*   Salesforce

The social provider is ideal for SSO-style logins for the Dashboard or for the Portal. For certain providers (mainly Google+), where email addresses are returned as part of the user data, a constraint can be added to validate the users domain. This is useful for Google For Business Apps users that want to grant access to their domain users for the Dashboard.

For more social provider examples see the Tyk Identity Broker (TIB) v0.2 Repo [Readme](https://github.com/TykTechnologies/tyk-identity-broker/blob/master/README.md#social).
