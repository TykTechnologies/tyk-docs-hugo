---
date: 2017-03-23T16:06:42Z
title: Username and Password Grant Type
tags: ["Grant Types", "Username and Password"]
description: "Using a Username and Password grant type with OAuth 2.0"
menu:
  main:
    parent: "OAuth 2.0"
weight: 4
url: "/basic-config-and-security/security/authentication-&-authorization/oauth2-0/username-password-grant"
---

The Username and Password grant type uses a _basic authentication_ key to generate a token. When you create the _basic authentication_ key in the Dashboard, this stores the `username` and `password` used in the API token request.

### Token Request

This request provides the client id and basic user credentials in exchange for an API token.

```shell
curl -X POST \
  https://tyk.cloud.tyk.io/oauth-api/oauth/token/ \
  -H 'Authorization: Basic ZWQ1OTE1OGZhMjM0NGU5NGIzZTYyNzhlOGFiODUxNDI6TUdRM056RTJNR1F0WVRVeVpDMDBaVFZsTFdKak1USXRNakUyTVRNMU1tRTNOMk0x' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=password&client_id=ed59158fa2344e94b3e6278e8ab85142&username=oauthapiusername&password=oauthapipassword'
```

| Request | Value                                                                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Method  | `POST`                                                                                                                                        |
| URL     | Uses the special OAuth endpoint `/oauth/token` appended to the API URI e.g. `https://<your-gateway-host>/<your-api-listen-path>/oauth/token`. |

| Header          | Value                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Authorization` | `Basic` authorization, using the `client id` and `client secret` of the OAuth client base64 encoded with colon separator. E.g. `<oauth-client-id>:<oauth-client-secret>`, in this case `ed59158fa2344e94b3e6278e8ab85142:MGQ3NzE2MGQtYTUyZC00ZTVlLWJjMTItMjE2MTM1MmE3N2M1`, which base64 encoded is `ZWQ1OTE1OGZhMjM0NGU5NGIzZTYyNzhlOGFiODUxNDI6TUdRM056RTJNR1F0WVRVeVpDMDBaVFZsTFdKak1USXRNakUyTVRNMU1tRTNOMk0x`. |
| `Content-Type`  | `application/x-www-form-urlencoded`                                                                                                                                                                                                                                                                                                                                                                                 |

| Data         | Value                                                                 |
| ------------ | --------------------------------------------------------------------- |
| `grant_type` | `password`                                                            |
| `client_id`  | The OAuth client id, in this case `ed59158fa2344e94b3e6278e8ab85142`. |
| `username`   | The basic username, in this case `oauthapiusername`.                  |
| `password`   | The basic password, in this case `oauthapipassword`.                  |

#### Response

Response provides the token as `access_token` in the returned JSON which can then be used to access the API:

```json
{
  "access_token": "580defdbe1d21e0001c67e5ce3ea17db02be4c62ba15089bbcfd1f80",
  "expires_in": 3600,
  "refresh_token": "YjdhOWFmZTAtNmExZi00ZTVlLWIwZTUtOGFhNmIwMWI3MzJj",
  "token_type": "bearer"
}
```

### Sequence Diagram

{{< img src="/img/diagrams/diagram_docs_username-_-password-grant-type@2x.png" alt="Username and password grant sequence" >}}
