---
date: 2017-03-27T11:51:34+01:00
title: OAuth Key Management API
menu:
  main:
    parent: "Tyk Rest API"
weight: 7 
---

### Create new OAuth Client

Any OAuth keys must be generated with the help of a client ID, these need to be pre-registered with Tyk before they can be used (in a similar vein to how you would register your app with Twitter before attempting to ask user permissions using their API).

| **Property** | **Description**             |
| ------------ | --------------------------- |
| Resource URL | `/tyk/oauth/clients/create` |
| Method       | POST                        |
| Type         | JSON                        |
| Body         | Client Object               |

#### Sample request

```
    POST /tyk/oauth/clients/create HTTP/1.1
    Host: localhost:5000
    x-tyk-authorization: 352d20ee67be67f6340b4c0605b044b7
    Cache-Control: no-cache
    
    {
        "api_id": "25348e8cf157409b52e39357fd9578f1",
        "redirect_uri": "http://client-app.com/oauth-redirect/"
    }
```

#### Sample Response

```
    {
        "client_id": "061ba634e6644b40633fa9456b138f4b",
        "secret": "MjA3OGEyNzctZTlmZC00YzYzLTZkMDItNDJlYzJkZTg2Mjcy",
        "redirect_uri": "http://client-app.com/oauth-redirect/"
    }
```

### Delete Oauth Client

You can delete an OAuth client using a simple DELETE method. Please note that tokens issued with the client ID will still be valid until they expire.

| **Property** | **Description**                               |
| ------------ | --------------------------------------------- |
| Resource URL | `/tyk/oauth/clients/{{api-id}}/{{client-id}}` |
| Method       | DELETE                                        |
| Type         |                                               |
| Body         | NONE                                          |

#### Sample request

```
    DELETE /tyk/oauth/clients/25348e8cf157409b52e39357fd9578f1/061ba634e6644b40633fa9456b138f4b HTTP/1.1
    Host: localhost:5000
    x-tyk-authorization: 352d20ee67be67f6340b4c0605b044b7
    Cache-Control: no-cache
```

#### Sample response

```
    {
        "key": "061ba634e6644b40633fa9456b138f4b",
        "status": "ok",
        "action": "deleted"
    }
```

### List Oauth Clients

Oauth Clients are organised by API ID, and therefore are queried as such.

| **Property** | **Description**                  |
| ------------ | -------------------------------- |
| Resource URL | `/tyk/oauth/clients/{{api-id}}/` |
| Method       | GET                              |
| Type         |                                  |
| Body         | NONE                             |

#### Sample request

```
    GET /tyk/oauth/clients/25348e8cf157409b52e39357fd9578f1/ HTTP/1.1
    Host: localhost:5000
    x-tyk-authorization: 352d20ee67be67f6340b4c0605b044b7
    Cache-Control: no-cache
```

#### Sample response

```
    [
        {
            "client_id": "03ae189a18f941024e6a870d4dfa7ae0",
            "secret": "ZDY4NWY5NzctMDU0MS00MWQ1LTQwODYtNGUxZjdhMDg1ODY4",
            "redirect_uri": "http://client-app.com/oauth-redirect/"
        },
        {
            "client_id": "061ba634e6644b40633fa9456b138f4b",
            "secret": "MjA3OGEyNzctZTlmZC00YzYzLTZkMDItNDJlYzJkZTg2Mjcy",
            "redirect_uri": "http://client-app2.com/oauth-redirect/"
        }
    ]
```

### OAuth Authorisation Flow

With the OAuth flow you will need to create authorisation or access tokens for your clients, in order to do this, Tyk provides a private API endpoint for your application to generate these codes and redirect the end-user back to the API Client.

| **Property** | **Description**                |
| ------------ | ------------------------------ |
| Resource URL | `/tyk/oauth/authorize-client/` |
| Method       | POST                           |
| Type         | Form-Encoded                   |
| Body         | Fields (see below)             |

* `response_type`: Should be provided by requesting client as part of authorisation request, this should be either `code` or `token` depending on the methods you have specified for the API.
* `client_id`: Should be provided by requesting client as part of authorisation request. The Client ID that is making the request.
* `redirect_uri`: Should be provided by requesting client as part of authorisation request. Must match with the record stored with Tyk.
* `key_rules`: A string representation of a Session Object (form-encoded). *This should be provided by your application in order to apply any quotas or rules to the key*.

#### Sample request

```
    POST /528a67c1ac9940964f9a41ae79235fcc/tyk/oauth/authorize-client/ HTTP/1.1
    Host: localhost:5000
    X-Tyk-Authorization: 352d20ee67be67f6340b4c0605b044b7
    Cache-Control: no-cache
    Content-Type: application/x-www-form-urlencoded
    
    response_type=code&client_id=21e2baf424674f6461faca6d45285bbb&redirect_uri=http%3A%2F%2Foauth.com%2Fredirect&key_rules=%7B+++++%22allowance%22%3A+999%2C+++++%22rate%22%3A+1000%2C+++++%22per%22%3A+60%2C+++++%22expires%22%3A+0%2C+++++%22quota_max%22%3A+-1%2C+++++%22quota_renews%22%3A+1406121006%2C+++++%22quota_remaining%22%3A+0%2C+++++%22quota_renewal_rate%22%3A+60%2C+++++%22access_rights%22%3A+%7B+++++++++%22528a67c1ac9940964f9a41ae79235fcc%22%3A+%7B+++++++++++++%22api_name%22%3A+%22OAuth+Test+API%22%2C+++++++++++++%22api_id%22%3A+%22528a67c1ac9940964f9a41ae79235fcc%22%2C+++++++++++++%22versions%22%3A+%5B+++++++++++++++++%22Default%22+++++++++++++%5D+++++++++%7D+++++%7D%2C+++++%22org_id%22%3A+%2253ac07777cbb8c2d53000002%22+%7D
```

#### Sample response (code request)

```
    {
        "code": "MWY0ZDRkMzktOTYwNi00NDRiLTk2YmQtOWQxOGQ3Mjc5Yzdk",
        "redirect_to": "http://client-app.com/oauth-redirect/?code=MWY0ZDRkMzktOTYwNi00NDRiLTk2YmQtOWQxOGQ3Mjc5Yzdk"
    }
```

#### Sample response (token request)

```
    {
        "access_token": "53ac07777cbb8c2d530000022b778ed6ef204a44794ed2bc9d120237",
        "expires_in": 3600,
        "redirect_to": "http://client-app.com/oauth-redirect/#access_token=53ac07777cbb8c2d530000022b778ed6ef204a44794ed2bc9d120237&expires_in=3600&token_type=bearer",
        "token_type": "bearer"
    }
```

### Invalidate Refresh Token

It is possible to invalidate refresh tokens in order to manage OAuth client access more robustly:

| **Property** | **Description**                            |
| ------------ | ------------------------------------------ |
| Resource URL | `/tyk/oauth/refresh/{key}?api_id={api_id}` |
| Method       | DELETE                                     |
| Type         |                                            |
| Body         | NONE                                       |

#### Sample request
```
    DELETE /tyk/oauth/refresh/25348e8cf157409b52e39357fd9578f1/061ba634e6644b40633fa9456b138f4b HTTP/1.1
    Host: localhost:5000
    x-tyk-authorization: 352d20ee67be67f6340b4c0605b044b7
    Cache-Control: no-cache
```

#### Sample response
```
    {
        "key": "061ba634e6644b40633fa9456b138f4b",
        "status": "ok",
        "action": "deleted"
    }
```
