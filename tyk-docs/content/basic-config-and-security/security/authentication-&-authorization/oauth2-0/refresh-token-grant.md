---
date: 2017-03-23T16:06:42Z
title: Refresh Token Grant Type
tags: ["Grant Types", "Refresh Token"]
description: "Using a Refresh Token grant type with OAuth 2.0"
menu:
  main:
    parent: "OAuth 2.0"
weight: 2
aliases:
  - /basic-config-and-security/security/authentication-authorization/oauth2-0/refresh-token-grant/
  - /basic-config-and-security/security/authentication-&-authorization/oauth2-0/refresh-token-grant
---

The Refresh Token grant type uses the refresh token to generate a new token.

{{< note success >}}
**Note**  

Refresh tokens are single use only so cannot be reused, and when they are used they also invalidate the token they are associated with.
{{< /note >}}

### Request new token

```shell
curl -X POST \
  https://tyk.cloud.tyk.io/oauth-api/oauth/token/ \
  -H 'Authorization: Basic ZWQ1OTE1OGZhMjM0NGU5NGIzZTYyNzhlOGFiODUxNDI6TUdRM056RTJNR1F0WVRVeVpDMDBaVFZsTFdKak1USXRNakUyTVRNMU1tRTNOMk0x' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=refresh_token&client_id=ed59158fa2344e94b3e6278e8ab85142&client_secret=MGQ3NzE2MGQtYTUyZC00ZTVlLWJjMTItMjE2MTM1MmE3N2M1&refresh_token=YjdhOWFmZTAtNmExZi00ZTVlLWIwZTUtOGFhNmIwMWI3MzJj'
```

| Request | Value                                                                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Method  | `POST`                                                                                                                                        |
| URL     | Uses the special OAuth endpoint `/oauth/token` appended to the API URI e.g. `https://<your-gateway-host>/<your-api-listen-path>/oauth/token`. |

| Header          | Value                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Authorization` | `Basic` authorization, using the `client id` and `client secret` of the OAuth client base64 encoded with colon separator. E.g. `<oauth-client-id>:<oauth-client-secret>`, in this case `ed59158fa2344e94b3e6278e8ab85142:MGQ3NzE2MGQtYTUyZC00ZTVlLWJjMTItMjE2MTM1MmE3N2M1`, which base64 encoded is `ZWQ1OTE1OGZhMjM0NGU5NGIzZTYyNzhlOGFiODUxNDI6TUdRM056RTJNR1F0WVRVeVpDMDBaVFZsTFdKak1USXRNakUyTVRNMU1tRTNOMk0x`. |
| `Content-Type`  | `application/x-www-form-urlencoded`                                                                                                                                                                                                                                                                                                                                                                                 |

| Data            | Value                                                                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `grant_type`    | `refresh_token`                                                                                                                                          |
| `client_id`     | The OAuth client id, in this case `ed59158fa2344e94b3e6278e8ab85142`.                                                                                    |
| `client_secret` | The OAuth client secret, in this case `MGQ3NzE2MGQtYTUyZC00ZTVlLWJjMTItMjE2MTM1MmE3N2M1`.                                                                |
| `refresh_token` | The refresh token (`refresh_token`) provided in response to the original token request, in this case `YjdhOWFmZTAtNmExZi00ZTVlLWIwZTUtOGFhNmIwMWI3MzJj`. |

### Response

Response provides a new token as `access_token` and a new refresh token as `refresh_token` in the returned JSON:

```json
{
  "access_token": "580defdbe1d21e0001c67e5c2a0a6c98ba8b4a059dc5825388501573",
  "expires_in": 3600,
  "refresh_token": "NWQzNGVhMTItMDE4Ny00MDFkLTljOWItNGE4NzI1ZGI1NGU2",
  "token_type": "bearer"
}
```

### Sequence Diagram

{{< img src="/img/diagrams/diagram_docs_refresh-token-grant-type@2x.png" alt="Refresh token grant type sequence" >}}
