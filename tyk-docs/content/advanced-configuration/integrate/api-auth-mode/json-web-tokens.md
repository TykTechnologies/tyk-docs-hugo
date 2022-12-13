---
date: 2017-03-24T16:40:31Z
title: Integrate with JWT
menu:
  main:
    parent: "API Authentication Mode"
weight: 0
---

## Using JWTs with a 3rd Party

JSON Web tokens are an excellent, self-contained way to integrate a Tyk Gateway with a third party Identity Provider without needing any direct integration.

With Tyk, so long as a JSON Web Token provides two simple claims, only one of which is Tyk specific, integration can be easily achieved.

To integrate a JSON Web Token based IDP (Identity Provider) with Tyk, all you will need to do is ensure that your IDP can add a custom claim to the JWT that lists the policy ID to use for the bearer of the token. Tyk will take care of the rest, ensuring that the rate limits and quotas of the underlying identity of the bearer are maintained across JWT token re-issues, so long as the "sub" (or whichever identity claim you chose to use) is available and consistent throughout and the policy that underpins the security clearance of the token exists too.

See [JSON Web Tokens](/basic-config-and-security/security/authentication-authorization/json-web-tokens/) in the **Security** section for more details.
