---
date: 2017-03-23T16:06:42Z
title: Client Credentials Grant Type
tags: ["Grant Types", "Client Credentials"]
description: "Using a Client Credentials grant type with OAuth 2.0"
menu:
  main:
    parent: "OAuth 2.0"
weight: 5
url: "/basic-config-and-security/security/authentication-&-authorization/oauth2-0/client-credentials-grant"
---

The Client Credentials grant type uses the OAuth client credentials to generate a token.

### Token Request

This request provides the client credentials in exchange for an API token.

```shell
curl -X POST \
  https://tyk.cloud.tyk.io/oauth-api/oauth/token/ \
  -H 'Authorization: Basic ZWQ1OTE1OGZhMjM0NGU5NGIzZTYyNzhlOGFiODUxNDI6TUdRM056RTJNR1F0WVRVeVpDMDBaVFZsTFdKak1USXRNakUyTVRNMU1tRTNOMk0x' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=client_credentials&client_id=ed59158fa2344e94b3e6278e8ab85142&client_secret=MGQ3NzE2MGQtYTUyZC00ZTVlLWJjMTItMjE2MTM1MmE3N2M1'
```

| Request | Value                                                                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Method  | `POST`                                                                                                                                        |
| URL     | Uses the special OAuth endpoint `/oauth/token` appended to the API URI e.g. `https://<your-gateway-host>/<your-api-listen-path>/oauth/token`. |

| Header          | Value                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Authorization` | `Basic` authorization, using the `client id` and `client secret` of the OAuth client base64 encoded with colon separator. E.g. `<oauth-client-id>:<oauth-client-secret>`, in this case `ed59158fa2344e94b3e6278e8ab85142:MGQ3NzE2MGQtYTUyZC00ZTVlLWJjMTItMjE2MTM1MmE3N2M1`, which base64 encoded is `ZWQ1OTE1OGZhMjM0NGU5NGIzZTYyNzhlOGFiODUxNDI6TUdRM056RTJNR1F0WVRVeVpDMDBaVFZsTFdKak1USXRNakUyTVRNMU1tRTNOMk0x`. |
| `Content-Type`  | `application/x-www-form-urlencoded`                                                                                                                                                                                                                                                                                                                                                                                 |

| Data            | Value                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------- |
| `grant_type`    | `client_credentials`                                                                      |
| `client_id`     | The OAuth client id, in this case `ed59158fa2344e94b3e6278e8ab85142`.                     |
| `client_secret` | The OAuth client secret, in this case `MGQ3NzE2MGQtYTUyZC00ZTVlLWJjMTItMjE2MTM1MmE3N2M1`. |

#### Response

Response provides the token as `access_token` in the returned JSON which can then be used to access the API:

```json
{
  "access_token": "580defdbe1d21e0001c67e5c40e93eac3d23494697470b90d7c81593",
  "expires_in": 3600,
  "token_type": "bearer"
}
```
{{< note success >}}
**Note**  

It does not provide a refresh token.
{{< /note >}}



### Sequence Diagram

{{< img src="/img/diagrams/diagram_docs_client-credentials-grant-type@2x.png" alt="Client credentials grant type flow" >}}
