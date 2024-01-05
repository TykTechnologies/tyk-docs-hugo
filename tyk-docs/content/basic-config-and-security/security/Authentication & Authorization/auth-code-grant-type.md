---
date: 2017-03-23T16:06:42Z
title: Authorization Code Grant Type
tags: ["Grant Types", "Authorization"]
description: "Using an Authorization grant type with OAuth 2.0"
menu:
  main:
    parent: "OAuth 2.0"
weight: 1
url: "/basic-config-and-security/security/authentication-&-authorization/oauth2-0/auth-code-grant"
aliases:
  - /basic-config-and-security/security/authentication-authorization/oauth2-0/auth-code-grant/
---

This process requires three steps:

- Redirect to a login page
- Request an authorization code
- Exchange code for a token

## Redirect to a login page

```.copyWrapper
curl -X POST \
  https://tyk.cloud.tyk.io/oauth-api/oauth/authorize/ \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'response_type=code&client_id=ed59158fa2344e94b3e6278e8ab85142&redirect_uri=http%3A%2F%2Fexample.com%2Fclient-redirect-uri'
```

| Request | Value                                                                                                                                                 |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Method  | `POST`                                                                                                                                                |
| URL     | Uses the special OAuth endpoint `/oauth/authorize` appended to the API URI e.g. `https://<your-gateway-host>/<your-api-listen-path>/oauth/authorize`. |

| Header         | Value                               |
| -------------- | ----------------------------------- |
| `Content-Type` | `application/x-www-form-urlencoded` |

| Data            | Value                                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `response_type` | `code`                                                                                                                                                              |
| `client_id`     | The OAuth client id, in this case `ed59158fa2344e94b3e6278e8ab85142`.                                                                                               |
| `redirect_uri`  | The OAuth client redirect URI, in this case `http://example.com/client-redirect-uri` and must be URL encoded e.g. `http%3A%2F%2Fexample.com%2Fclient-redirect-uri`. |

#### Response

Response generates a 307 Temporary Redirect to the Oauth client redirect URI. It is expected that this location will be capable of authenticating the user then using the data forwarded to it as part of the redirect to request an authorization code.

## Request an authorization code

This request should be made from the 3rd party authentication server.

```.copWrapper
curl -X POST \
  https://admin.cloud.tyk.io/api/apis/oauth/25b854d3fdc84703679f49ea33981aa9/authorize-client/ \
  -H 'Authorization: 70c3d834d46a4d6076e1585b0ef2e93e' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'response_type=code&client_id=ed59158fa2344e94b3e6278e8ab85142&redirect_uri=http%3A%2F%2Fexample.com%2Fclient-redirect-uri'
```

{{< note success >}}
**Note**  

Because this example uses Tyk Cloud it uses the API id in the URL. For all other scenarios (e.g. On-Premises) you should use the API listen path instead e.g. https:/<your-tyk-dashboard-host>/api/apis/oauth/<your-api-listen-path>/authorize-client/. For the API used in this example it would be https://admin.cloud.tyk.io/api/apis/oauth/oauth-api/authorize-client/.
{{< /note >}}

{{< note success >}}
**Note**  

The Tyk Gateway also exposes an equivalent Gateway API authorization endpoint (`/tyk/oauth/authorize-client/`). In some scenarios, for example where access to the Dashboard API from the authentication server may be restricted, the Gateway API can be used instead.
{{< /note >}}


| Request | Value                                                                                                                                                                                                                          |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Method  | `POST`                                                                                                                                                                                                                         |
| URL     | Uses the Dashboard API client authorization endpoint `/authorize-client/`. |

| Header          | Value                                                                            |
| --------------- | -------------------------------------------------------------------------------- |
| `Authorization` | The Dashboard user credentials, in this case `70c3d834d46a4d6076e1585b0ef2e93e`. |
| `Content-Type`  | `application/x-www-form-urlencoded`                                              |

| Data            | Value                                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `response_type` | `code`                                                                                                                                                              |
| `client_id`     | The OAuth client id, in this case `ed59158fa2344e94b3e6278e8ab85142`.                                                                                               |
| `redirect_uri`  | The OAuth client redirect URI, in this case `http://example.com/client-redirect-uri` and must be URL encoded e.g. `http%3A%2F%2Fexample.com%2Fclient-redirect-uri`. |

#### Response

Response provides the authorization code as `code` and the redirect URL as `redirect_to`. It is expected the the 3rd party authentication server will redirect the user to the redirect URL.

```{.copyWrapper}
{
  "code": "EaG1MK7LS8GbbwCAUwDo6Q",
  "redirect_to": "http://example.com/client-redirect-uri?code=EaG1MK7LS8GbbwCAUwDo6Q"
}
```

## Exchange code for a token

The client application uses this request to exchange the authorization code for an API token. Note that codes are single use only, so cannot be reused.

```{.copyWrapper}
curl -X POST \
  https://tyk.cloud.tyk.io/oauth-api/oauth/token/ \
  -H 'Authorization: Basic ZWQ1OTE1OGZhMjM0NGU5NGIzZTYyNzhlOGFiODUxNDI6TUdRM056RTJNR1F0WVRVeVpDMDBaVFZsTFdKak1USXRNakUyTVRNMU1tRTNOMk0x' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=authorization_code&client_id=ed59158fa2344e94b3e6278e8ab85142&code=EaG1MK7LS8GbbwCAUwDo6Q&redirect_uri=http%3A%2F%2Fexample.com%2Fclient-redirect-uri'
```

| Request | Value                                                                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Method  | `POST`                                                                                                                                        |
| URL     | Uses the special OAuth endpoint `/oauth/token` appended to the API URI e.g. `https://<your-gateway-host>/<your-api-listen-path>/oauth/token`. |

| Header          | Value                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Authorization` | `Basic` authorization, using the `client id` and `client secret` of the OAuth client base64 encoded with colon separator. E.g. `<oauth-client-id>:<oauth-client-secret>`, in this case `ed59158fa2344e94b3e6278e8ab85142:MGQ3NzE2MGQtYTUyZC00ZTVlLWJjMTItMjE2MTM1MmE3N2M1`, which base64 encoded is `ZWQ1OTE1OGZhMjM0NGU5NGIzZTYyNzhlOGFiODUxNDI6TUdRM056RTJNR1F0WVRVeVpDMDBaVFZsTFdKak1USXRNakUyTVRNMU1tRTNOMk0x`. |
| `Content-Type`  | `application/x-www-form-urlencoded`                                                                                                                                                                                                                                                                                                                                                                                 |

| Data           | Value                                                                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `grant_type`   | `authorization_code`                                                                                                                                                |
| `client_id`    | The OAuth client id, in this case `ed59158fa2344e94b3e6278e8ab85142`.                                                                                               |
| `code`         | The authorization code (`code`) provided in the response to the previous request, in this case `EaG1MK7LS8GbbwCAUwDo6Q`.                                            |
| `redirect_uri` | The OAuth client redirect URI, in this case `http://example.com/client-redirect-uri` and must be URL encoded e.g. `http%3A%2F%2Fexample.com%2Fclient-redirect-uri`. |

#### Response

Response provides the token as `access_token` in the returned JSON which can then be used to access the API:

```{.copyWrapper}
{
  "access_token": "580defdbe1d21e0001c67e5c2a0a6c98ba8b4a059dc5825388501573",
  "expires_in": 3600,
  "refresh_token": "NWQzNGVhMTItMDE4Ny00MDFkLTljOWItNGE4NzI1ZGI1NGU2",
  "token_type": "bearer"
}
```

#### Notification

This grant will generate a notification, sent from the Gateway to the _OAuth Notifications URL_, which contains the _OAuth Notifications Shared Secret_ as a header for verification purposes.

```{.copyWrapper}
{
  "auth_code": "EaG1MK7LS8GbbwCAUwDo6Q",
  "new_oauth_token": "580defdbe1d21e0001c67e5c2a0a6c98ba8b4a059dc5825388501573",
  "refresh_token": "NWQzNGVhMTItMDE4Ny00MDFkLTljOWItNGE4NzI1ZGI1NGU2",
  "old_refresh_token": "",
  "notification_type": "new"
}
```

### Sequence Diagram

{{< img src="/img/diagrams/diagram_docs_authorization-code-grant-type@2x.png" alt="Authorization grant type flow" >}}
