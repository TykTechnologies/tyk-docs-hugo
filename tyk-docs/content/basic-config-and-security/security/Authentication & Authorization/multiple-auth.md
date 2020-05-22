---
date: 2017-03-23T15:58:42Z
title: Multiple Auth
menu:
  main:
    parent: "Authentication & Authorization"
weight: 5 
---

## <a name="multi-chained-authentication"></a> Multiple (Chained) Authentication

As of Tyk v2.3 it is possible to have multiple authentication middleware chained together, so for example, it would be possible to use an Access Token in combination with Basic Auth, or with a JSON Web Token.

## <a name="enable-multi-chanied-authentication-with-dashboard"></a> Enable Multi (Chained) Authentication with the Dashboard

To enable multi chained auth in your GUI, first browse to the Endpoint Designer and view the "Core Settings" tab.

#### 1\. Browse to the "Authentication" Section.

In this section you can chose the various authentication methods, each selection provides a different settings window, in this case, we will want to configure many auth providers, so it works slightly differently.

#### 2\. Select the Multiple Auth Mechanisms Option

Select the **Use Multiple Auth Mechanisms** from the drop-down list. This will open up a window that provides check-boxes for each supported auth type to be chained.

It is not possible to set the order of chained auth methods.

![Select Multiple Auth](/docs/img/dashboard/system-management/multi_auth_2.5.png)

#### 3\. Select your Preferred Auth methods and Select the Base Identity Provider

The baseline provider will be the one that provides the current request context with the session object to use that defines the "true" access control list, rate limit and quota to apply to the user.

![Select Auth Methods](/docs/img/dashboard/system-management/auth_methods_2.5.png)

Once these have been set up, you will see the traditional configuration screens for each one of the auth methods that were selected in the check boxes. Configure them as you would regular authentication modes.

## <a name="enable-multi-chanied-authentication-in-your-api-definition"></a> Enable Multi (Chained) Authentication in your API Definition

To enable this mode you must set the `base_identity_provided_by` field in your API Definitions to one of the supported chained enums below:

*   `AuthToken`
*   `HMACKey` 
*   `BasicAuthUser` 
*   `JWTClaim` 
*   `OIDCUser` 
*   `OAuthKey` 
*   `UnsetAuth`

The provider set here will then be the one that provides the session object that determines rate limits, ACL rules and quotas.

Tyk will chain the auth mechanisms as they appear in the code and will default to auth token if none are specified. You can explicitly set auth token support by setting `use_standard_auth` to true.