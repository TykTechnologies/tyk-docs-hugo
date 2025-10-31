---
title: "Custom Authentication with Proxy Identify Provider"
date: 2025-01-10
tags: ["Tyk Identity Broker", "TIB", "Identity Provider", "Identity Handler", "SSO", "Custom Authentication", "Custom Proxy Provder"]
description: "Learn how to integrate external services with Tyk API Gateway. Discover how to use middleware plugins, webhooks, and service discovery to extend your API functionality and connect with third-party systems."
keywords: ["Tyk Identity Broker", "TIB", "Identity Provider", "Identity Handler", "SSO", "Custom Authentication", "Custom Proxy Provder"]
---

The proxy identity provider is a generic solution to more legacy problems, as well as a way to handle flows such as basic auth access with third party providers or OAuth password grants where the request can just be passed through to the providing endpoint to return a direct response.

The proxy provider will take a request, proxy it to an upstream host, capture the response, and analyze it for triggers of "success", if the triggers come out as true, then the provider will treat the request as authenticated and hand over to the Identity Handler to perform whatever action is required with the user data.

Success can be triggered using three methods:

1.  Response code: e.g. if this is an API request, a simple `200` response would suffice to act as a successful authentication.
2.  Response body exact match: You can have a base64 encoded body that you would expect as a successful match, if the two bodies are the same, then the request will be deemed successful.
3.  Regex: Most likely, the response might be dynamic (and return a response code, timestamp or other often changing parameter), in which case you may want to just match the response to a regex.

These can be used in conjunction as gates, e.g. a response must be `200 OK` and match the regex in order to be marked as successful.

## JSON Data and User names

The Proxy provider can do some clever things, such as extract JSON data from the response and decode it, as well as pull username data from the Basic Auth header (for example, if your identity provider supports dynamic basic auth).

## Log into the Dashboard with the Proxy Provider

The configuration below will proxy a request to `http://{TARGET-HOSTNAME}:{PORT}/` and evaluate the response status code, if the status code returned is `200` then TIB will assume the response is JSON (`"ResponseIsJson": true`) to extract an access token (e.g. if this is an OAuth pass-through request) and try and find an identity to bind the Dashboard user to in the `user_name` JSON field of the response object (`"UsernameField": "user_name"`):

```{.copyWrapper}
{
  "ActionType": "GenerateOrLoginUserProfile",
  "ID": "7",
  "OrgID": "{YOUR-ORG-ID}",
  "ProviderConfig": {
    "AccessTokenField": "access_token",
    "ExtractUserNameFromBasicAuthHeader": false,
    "OKCode": 200,
    "OKRegex": "",
    "OKResponse": "",
    "ResponseIsJson": true,
    "TargetHost": "http://{TARGET-HOSTNAME}:{PORT}/",
    "UsernameField": "user_name"
  },
  "ProviderName": "ProxyProvider",
  "ReturnURL": "http://{DASH-DOMAIN}:{DASH-PORT}/tap",
  "Type": "redirect"
}
```

