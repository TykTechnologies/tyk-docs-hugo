---
title: "Single Sign On (SS0) with SAML"
date: 2025-01-10
tags: ["Tyk Identity Broker", "TIB", "Identity Provider", "Identity Handler", "SSO", "Custom Authentication", "Custom Proxy Provder", "SAML", "OIDC", "OpenID Connect", "Profies", "IDPs", "Social Provider" ,"LDAP"]
description: "Learn how to integrate external services with Tyk API Gateway. Discover how to use middleware plugins, webhooks, and service discovery to extend your API functionality and connect with third-party systems."
keywords: ["Tyk Identity Broker", "TIB", "Identity Provider", "Identity Handler", "SSO", "Custom Authentication", "Custom Proxy Provder", "SAML", "OIDC", "OpenID Connect", "Profies", "IDPs", "Social Provider" ,"LDAP"]
---

## SSO with SAML

SAML authentication is a way for a service provider, such as the Tyk Dashboard or Portal, to assert the Identity of a User via a third party.

Tyk Identity Broker can act as the go-between for the Tyk Dashboard and Portal and a third party identity provider. Tyk Identity broker can also interpret and pass along information about the user who is logging in such as Name, Email and group or role metadata for enforcing role based access control in the Tyk Dashboard.

The provider config for SAML has the following values that can be configured in a Profile:

`SAMLBaseURL` - The host of TIB that will be used in the metadata document for the Service Provider. This will form part of the metadata URL used as the Entity ID by the IDP. The redirects configured in the IDP must match the expected Host and URI configured in the metadata document made available by Tyk Identity Broker.

`FailureRedirect` - Where to redirect failed login requests.

`IDPMetaDataURL` - The metadata URL of your IDP which will provide Tyk Identity Broker with information about the IDP such as EntityID, Endpoints (Single Sign On Service Endpoint, Single Logout Service Endpoint), its public X.509 cert, NameId Format, Organization info and Contact info.

This metadata XML can be signed providing a public X.509 cert and the private key.     

`CertLocation`: An X.509 certificate and the private key for signing your requests to the IDP, this should be one single file with the cert and key concatenated. When using internal identity broker, this value should be the id of the certificate uploaded via certificate manager in dashboard, otherwise it should be a path where the certificate is placed.

`ForceAuthentication` - Ignore any session held by the IDP and force re-login every request.

`SAMLEmailClaim` - Key for looking up the email claim in the SAML assertion form the IDP. Defaults to: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`

`SAMLForenameClaim` - Key for looking up the forename claim in the SAML assertion form the IDP. Defaults to: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/forename`

`SAMLSurnameClaim` - Key for looking up the surname claim in the SAML assertion form the IDP. Defaults to: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname`

Example profile configuration:

```
{
    "ActionType": "GenerateOrLoginUserProfile",
    "ID": "saml-sso-login",
    "OrgID": "{YOUR_ORGANIZATION_ID}",
    "CustomEmailField": "",
    "IdentityHandlerConfig": {
        "DashboardCredential": "{DASHBOARD_USER_API_KEY}"
    },
    "ProviderConfig": {
        "SAMLBaseURL": "https://{HOST}",
        "FailureRedirect": "http://{DASHBOARD_HOST}:{PORT}/?fail=true",
        "IDPMetaDataURL": "{IDP_METADATA_URL}",
        "CertLocation":"myservice.cert",
        "ForceAuthentication": false,
        "SAMLEmailClaim": "",
        "SAMLForenameClaim": "",
        "SAMLSurnameClaim": ""
    },
    "ProviderName": "SAMLProvider",
    "ReturnURL": "http://{DASHBOARD_URL}:{PORT}/tap",
    "Type": "redirect"
}
```
### Video Demonstration

We have a video that walks you through getting Tyk Dashboard SSO Access via SAML using Microsoft Azure as IDP and our internal Dashboard TIB.

{{< youtube 4L9aetRrHqI >}}

