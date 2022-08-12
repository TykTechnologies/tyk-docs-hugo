---
date: 2020-08-18T10:17:54+01:00
title: CORS issues on developer portal
menu:
  main:
    parent: "Tyk Dashboard Troubleshooting"
weight: 6 
---

### Description

You get following errors in the browser console:
```
Access to fetch at 'https://<Your Gateway URL>/<Your API>/' from origin 'https://<Your Dashboard URL>' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```
```
POST https://<Your Gateway URL>/<Your API>/ net::ERR_FAILED
```

### Cause

The CORS middleware in the Gateway is blocking this request. This can happen when the CORS settings of the API are not enabled or misconfigured for the developer portal.

### Solution

Make sure that your CORS in the `Advanced Options` of the API is enabled and the settings are correct. This means:
 - `Allowed Origins` should allow the developer portal domain
 - `Allowed Methods` should allow all methods needed for API documentation (at least `GET` and `POST`)
 - `Allowed Headers` should allow at least `Origin`, `Content-Type` and for authenticated requests the authorization header (e.g. `Authorization`)

 > **Note:** When creating a new API with Dashboard v3.1 and higher the CORS settings will be prefilled with some default values (but **disabled** by default).

 You can learn more about CORS on this pages:
 - [CORS in API Definition](/docs/tyk-apis/tyk-gateway-api/api-definition-objects/cors/)
 - [How to setup CORS](/docs/frequently-asked-questions/how-to-setup-cors/) 
