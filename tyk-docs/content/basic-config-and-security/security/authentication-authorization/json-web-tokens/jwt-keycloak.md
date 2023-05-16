---
date: 2023-05-15
title: JWT and Keycloak with Tyk
tags: ["JWT", "JSON Web Token", "Security", "Keycloak"]
description: "How to secure your APIs with JWT and Keycloak"
menu:
  main:
    parent: "JSON Web Tokens"
weight: 2
---

## Overview
This guide will walk you through securing your APIs with JWTs via Keycloak.

## Prerequisites

 A [Keycloak](https://www.keycloak.org/) installation
* A Tyk Self-Managed or Cloud installation

## Create an application in Keycloak

1. Access to your Keycloak admin dashboard.
2. Navigate to the Administration console.

{{< img src="/img/keycloak-jwt/navigate-to-admin-console.png" alt="Navigate to Keycloak Administration console" width="800px" height="400" >}}

3. Create a Keycloak realm from the top left-hand side dropdown. 

{{< img src="/img/keycloak-jwt/create-jwt-realm.png" alt="Create Keycloak Realm" width="800px" height="400" >}}

4. Create a Keycloak client.
   
{{< img src="/img/keycloak-jwt/create-client.png" alt="Create Client" width="800px" height="400" >}}

   - Enter the necessary client details.

{{< img src="/img/keycloak-jwt/create-client-step-1.png" alt="Add client details" width="800px" height="400" >}}

   - Enable client authentication and Service account roles under Authentication flow

{{< img src="/img/keycloak-jwt/create-client-step-2.png" alt="Update client permissions" width="800px" height="400" >}}

   - Set the redirection URL rules.

{{< img src="/img/keycloak-jwt/create-client-step-3.png" alt="Add redirection URL rules" width="800px" height="400" >}}
   
   - Save.
   
{{< img src="/img/keycloak-jwt/client.png" alt="Example client" width="800px" height="400" >}}

5. Retrieve client secret from the Credentials tab under the client you just created.

{{< img src="/img/keycloak-jwt/client-secret.png" alt="Retrieve client secret" width="800px" height="400" >}}

6. Generate your JWTs using curl and store them. These are keys you will use to access your services through the Tyk Gateway.

    - Password Grant Type
    ```.curl
    curl -L --insecure -s -X POST 'https://KEYCLOAK_URL/realms/KEYCLOAK_REALM/protocol/openid-connect/token' \
        -H 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'client_id=KEYCLOAK_CLIENT_ID' \
        --data-urlencode 'grant_type=password' \
        --data-urlencode 'client_secret=KEYCLOAK_SECRET' \
        --data-urlencode 'scope=openid' \
        --data-urlencode 'username=KEYCLOAK_USERNAME' \
        --data-urlencode 'password=KEYCLOAK_PASSWORD'
    ```
   
    - Client Credentials Grant Type

    ```.curl
    curl -L --insecure -s -X POST 'https://KEYCLOAK_URL/realms/KEYCLOAK_REALM/protocol/openid-connect/token' \
        -H 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'client_id=KEYCLOAK_CLIENT_ID' \
        --data-urlencode 'grant_type=client_credentials' \
        --data-urlencode 'client_secret=KEYCLOAK_SECRET'
    ```
   
    A typical response will look something like the following:
    
    ```.bash
   {
       "access_token" : "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ6MXp6bWw0SmNFd3FBdnBWdEFmV1dGS01hMWppYjR1MlFEM3lzaU81VVJrIn0.eyJleHAiOjE2ODQxNzIxNTUsImlhdCI6MTY4NDE3MTg1NSwianRpIjoiNTkzYzQ4NDUtNDZkZC00MDczLWIxYjktM2Y4NjkxNWE5MmFiIiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzAwMS9yZWFsbXMvand0Iiwic3ViIjoiOTcxNWQ5NzQtMTE1Yi00OWRmLWEyMzUtYzA5MjM2OTVhNDcyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoia2V5Y2xvYWstand0Iiwic2Vzc2lvbl9zdGF0ZSI6IjRhYWM5M2ZlLTZmNWItNDMyNS05MjlhLTE5MDM5NjY3ZjQ3YiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInNpZCI6IjRhYWM5M2ZlLTZmNWItNDMyNS05MjlhLTE5MDM5NjY3ZjQ3YiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiSm9obiBEb2UiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkZWZhdWx0QGV4YW1wbGUuY29tIiwiZ2l2ZW5fbmFtZSI6IkpvaG4iLCJmYW1pbHlfbmFtZSI6IkRvZSIsImVtYWlsIjoiZGVmYXVsdEBleGFtcGxlLmNvbSJ9.bLEmcjNwU50wQkCiwmU66mCigifn6Qi_9siiTVnNTY9Ju2UiilAFH5c_uZsiQNKkdZ3eOFKjMxP1eeRmPooWIXZa9jMEVra6Aja_2nAm8zzxQhRXtu21bfwMGwkFIjey7i2oQg__CKzNnCby0XarkAlyFZoAxGxIvKyKUvi2geSUDly7tjl0-B5Pc6OChcDYG1bOw963bX3p516xH9DTj8YXh6rvbCqSbIrWi5zuQTXpKlaJnp4Ub5c-VrKQuU2xnqV0BmPwd80i83U0qolXxy8y8uBVlaH69cXgZs_Ak050P0SdLqC-GfWm9c0JCKhj_qw0rSfHDiZA1S2UgrwVYg","expires_in":300,"refresh_expires_in":1800,"refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwNTIxMmU4My1jODE3LTQxZmUtYWIxNi0zMTMyMGEyZDY4ODcifQ.eyJleHAiOjE2ODQxNzM2NTUsImlhdCI6MTY4NDE3MTg1NSwianRpIjoiYWY4NTNjZWQtZTExYy00YzlhLWEwMWUtNDliODRhYzFkYWUwIiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzAwMS9yZWFsbXMvand0IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzAwMS9yZWFsbXMvand0Iiwic3ViIjoiOTcxNWQ5NzQtMTE1Yi00OWRmLWEyMzUtYzA5MjM2OTVhNDcyIiwidHlwIjoiUmVmcmVzaCIsImF6cCI6ImtleWNsb2FrLWp3dCIsInNlc3Npb25fc3RhdGUiOiI0YWFjOTNmZS02ZjViLTQzMjUtOTI5YS0xOTAzOTY2N2Y0N2IiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiNGFhYzkzZmUtNmY1Yi00MzI1LTkyOWEtMTkwMzk2NjdmNDdiIn0.xxpghrnDPG6cXZdc1dDd7jFCoNABuXMqshY6PVkA_io","token_type":"Bearer","id_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ6MXp6bWw0SmNFd3FBdnBWdEFmV1dGS01hMWppYjR1MlFEM3lzaU81VVJrIn0.eyJleHAiOjE2ODQxNzIxNTUsImlhdCI6MTY4NDE3MTg1NSwiYXV0aF90aW1lIjowLCJqdGkiOiIzNGI4NGM2ZS0yZWZmLTRjOWEtOTJkYi02YTkyZDY4YWJlNGEiLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDAxL3JlYWxtcy9qd3QiLCJhdWQiOiJrZXljbG9hay1qd3QiLCJzdWIiOiI5NzE1ZDk3NC0xMTViLTQ5ZGYtYTIzNS1jMDkyMzY5NWE0NzIiLCJ0eXAiOiJJRCIsImF6cCI6ImtleWNsb2FrLWp3dCIsInNlc3Npb25fc3RhdGUiOiI0YWFjOTNmZS02ZjViLTQzMjUtOTI5YS0xOTAzOTY2N2Y0N2IiLCJhdF9oYXNoIjoibUVRMGFfMFNkdklkNDNJejI2NGlsdyIsImFjciI6IjEiLCJzaWQiOiI0YWFjOTNmZS02ZjViLTQzMjUtOTI5YS0xOTAzOTY2N2Y0N2IiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkpvaG4gRG9lIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGVmYXVsdEBleGFtcGxlLmNvbSIsImdpdmVuX25hbWUiOiJKb2huIiwiZmFtaWx5X25hbWUiOiJEb2UiLCJlbWFpbCI6ImRlZmF1bHRAZXhhbXBsZS5jb20ifQ.kPb0NADSHVXei34wQkxnxEapbVwGrFyK_fvLdnVoXCwXx54BzDDXkClneoKXfQBXeamEDA2JoMZxmEEQN9qRyBws6GuCI4zEUYGwTgwr71WPp0BundZpOAoGnyFmEc3-tPkKq--lk9lAV8AVj9ukDXRpaV4wN3N0yu6FQtx2je0pAbQN17WDT8Nkl9woGYVUCiZtD2nYUdVzxFuMFpFjefh5JmQj0KayfX-Q4fEx_hR31_t-tjsN_827OPROnzsBZDN8-mbgMoGg-iwy2r7KD3TVa0auJ2D9CjWjzfNTeMDsomgPxYs9GSGkWpI0o_-xGGaakk4or4PGXJBK2FWzwA",
       "not-before-policy": 0,
       "session_state": "4aac93fe-6f5b-4325-929a-19039667f47b",
       "scope": "openid profile email"
   }
   ```

## Create your API in Tyk

1. Log in to your Tyk Dashboard.
2. Create a new HTTP API (the default http://httpbin.org upstream URL is fine.)

{{< img src="/img/keycloak-jwt/create-api-step-1.png" alt="Create a new HTTP API" width="800px" height="400" >}}

   - Select JWT in the Authentication mode section. 
   - Select RSA public Key as JWT Signing method. 
   - Add your JSON Web Key Sets (JWKS) URL in the `Public Key` box. This can be found through the well-known config endpoint or is typically `https://KEYCLOAK_URL/realms/KEYCLOAK_REALM/protocol/openid-connect/certs`.
   - Add an Identity Source and Policy Field Name. The defaults of `sub` and `pol` are fine. 
   - Click on the update button to save API

{{< img src="/img/keycloak-jwt/create-api-step-2.png" alt="Create API" width="800px" height="400" >}}

3. Create a policy to manage access to your API.

{{< img src="/img/keycloak-jwt/create-api-step-3.png" alt="Create API Security Policy" width="800px" height="400" >}}

4. Add default policy to API

{{< img src="/img/keycloak-jwt/create-api-step-4.png" alt="Add default policy to API" width="800px" height="400" >}}

5. Test access to API using curl

   - Retrieve API URL
   
{{< img src="/img/keycloak-jwt/create-api-step-5.png" alt="Add default Policy to API" width="800px" height="400" >}}
   
   - Test with curl 
   ```.curl
 	curl 'http://localhost:8080/keycloak-jwt/get' \
		-H "Authorization: Bearer TOKEN"
   ```

### Running in k8s
If you are looking to POC this functionality in k8s you can run a fully worked-out example using our tyk-k8s-demo library. You can read more [here]({{< ref "getting-started/quick-start/tyk-k8s-demo" >}}).
