---
date: 2017-03-27T12:35:04+01:00
title: OAuth Key Management
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 11
---


### Create a new OAuth2.0 Client

Any OAuth keys must be generated under an API in the Dashboard. Any POST requests made should contain the API's ID in the URL.

| **Property** | **Description**              |
| ------------ | ---------------------------- |
| Resource URL | `/api/apis/oauth/{{api-id}}` |
| Method       | POST                         |
| Type         | JSON                         |
| Body         | Client Object                |


#### Sample Request

```{.copyWrapper}
  curl -vX POST -H "Authorization: {{API Access Credentials}}" \
    -H "Content-Type: application/json" \
    -d '{"redirect_uri": "", "policy_id": "{{policy_id}}"}' http://{{dasboard-hostname}}/api/apis/oauth/{{api-id}}
```

#### Sample Response

```
{
  "client_id": "72083e90e9b044c57e2667d49effff78",
  "secret": "YWUxZTM2ODItOTJjYS00MmIyLTQxZGEtZTE0M2MzNmYwMDI2",
  "redirect_uri": "",
  "policy_id": "57f7b07647e0800001aa2320"
}
```

### List OAuth Clients

| **Property** | **Description**              |
| ------------ | ---------------------------- |
| Resource URL | `/api/apis/oauth/{{api-id}}` |
| Method       | GET                          |
| Type         | JSON                         |
| Body         | NONE                         |


#### Sample Request

```{.copyWrapper}
curl -vX GET -H "Authorization: {{API Access Credentials}}" \
  -H "Content-Type: application/json" \
  http://{{dashboard-hostname}}/api/apis/oauth/{{api-id}}
```

#### Sample Response

```
{
  "apps": [
    {
     "client_id": "7dce7fc297424fd65596b51c214666a4",
     "secret":"Yzg0ZDRjZTctMzUxNy00YmQ5LTRkM2UtMDdmODQ3MTNjNWM5",
     "redirect_uri": "/cats",
     "policy_id": "57f7b07647e0800001aa2320"
   },
   {
     "client_id": "72083e90e9b044c57e2667d49effff78",
     "secret": "YWUxZTM2ODItOTJjYS00MmIyLTQxZGEtZTE0M2MzNmYwMDI2",
     "redirect_uri": "",
     "policy_id": "57f7b07647e0800001aa2320"
    }
  ],
  "pages":0
}
```

### Get an OAuth2.0 Client

| **Property** | **Description**                            |
| ------------ | ------------------------------------------ |
| Resource URL | `/api/apis/oauth/{{api-id}}/{{client_id}}` |
| Method       | GET                                        |
| Type         | JSON                                       |
| Body         | NONE                                       |


#### Sample Request

```{.copyWrapper}
curl -vX GET -H "Authorization: {{API Access Credentials}}" \
  -H "Content-Type: application/json" \
  http://localhost:3000/api/apis/oauth/{{api-id}}/{{client_id}}
```

#### Sample Response

```
{
  "client_id": "7dce7fc297424fd65596b51c214666a4",
  "secret": "Yzg0ZDRjZTctMzUxNy00YmQ5LTRkM2UtMDdmODQ3MTNjNWM5",
  "redirect_uri": "/cats",
  "policy_id": "57f7b07647e0800001aa2320"
}
```

### Delete OAuth Client

You can delete an OAuth client using a simple DELETE method. Please note that tokens issued with the client ID will still be valid until they expire.

| **Property** | **Description**                            |
| ------------ | ------------------------------------------ |
| Resource URL | `/api/apis/oauth/{{api-id}}/{{client_id}}` |
| Method       | DELETE                                     |
| Type         | JSON                                       |
| Body         | NONE                                       |


#### Sample Request

```{.copyWrapper}
curl -vX DELETE -H "Authorization: {{API Access Credentials}}" \
  -H "Content-Type: application/json" \
  http://{{dashboard-hostname}}/api/apis/oauth/{{api-id}}/{{client_id}}
```

#### Sample Response

```
{
  "Status": "OK",
  "Message": "OAuth Client deleted successfully",
  "Meta":null
}
```

### OAuth2.0 Authorization Token

| **Property** | **Description**                                |
| ------------ | ---------------------------------------------- |
| Resource URL | `/api/apis/oauth/{{api_id}}/authorize-client/` |
| Method       | POST                                           |
| Type         | Form-Encoded                                   |
| Body         | Fields (see below)                             |

* `api_id`: Unlike the other requests on this page, this must be the `api_id` value and **NOT** the API's `id` value. 
* `response_type`: Should be provided by requesting client as part of authorisation request, this should be either `code` or `token` depending on the methods you have specified for the API.
* `client_id`: Should be provided by requesting client as part of authorisation request. The Client ID that is making the request.
* `redirect_uri`: Should be provided by requesting client as part of authorisation request. Must match with the record stored with Tyk.
* `key_rules`: A string representation of a Session Object (form-encoded). *This should be provided by your application in order to apply any quotas or rules to the key.*

Note that in the following example, the `policy_id` isn't included in the request as these are optional. OAuth2.0 Flow also supports callbacks which can be added to the `key_rules` in the payload in requests that don't include the `policy_id`.


#### Sample Request

```{.copyWrapper}
curl -vX POST -H "Authorization: {{API Access Credentials}}" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d 'response_type=code&client_id={{client_id}}&redirect_uri=http%3A%2F%2Foauth.com%2Fredirect&key_rules=%7B+++++%22allowance%22%3A+999%2C+++++%22rate%22%3A+1000%2C+++++%22per%22%3A+60%2C+++++%22expires%22%3A+0%2C+++++%22quota_max%22%3A+-1%2C+++++%22quota_renews%22%3A+1406121006%2C+++++%22quota_remaining%22%3A+0%2C+++++%22quota_renewal_rate%22%3A+60%2C+++++%22access_rights%22%3A+%7B+++++++++%22528a67c1ac9940964f9a41ae79235fcc%22%3A+%7B+++++++++++++%22api_name%22%3A+%22{{api_name}}%22%2C+++++++++++++%22api_id%22%3A+%{{api_id}}%22%2C+++++++++++++%22versions%22%3A+%5B+++++++++++++++++%22Default%22+++++++++++++%5D+++++++++%7D+++++%7D%2C+++++%22org_id%22%3A+%22{{org_id}}%22+%7D'
http://{{dashboard-hostname}}/api/apis/oauth/{{api_id}}/authorize-client
```

#### Sample Response

```
{
  "code": "MWY0ZDRkMzktOTYwNi00NDRiLTk2YmQtOWQxOGQ3Mjc5Yzdk",
  "redirect_to": "http://localhost:3000/oauth-redirect/?code=MWY0ZDRkMzktOTYwNi00NDRiLTk2YmQtOWQxOGQ3Mjc5Yzdk"
}
```

### Retrieve All Current Tokens for Specified OAuth2.0 Client

This endpoint allows you to retrieve a list of all current tokens and their expiry date for a provided API ID and OAuth-client ID in the following format. This endpoint will work only for newly created tokens.

{{< note success >}}
**Note**  

This option is available from v2.6.0 onwards.
{{< /note >}}


| **Property** | **Description**                                      |
| ------------ | ---------------------------------------------------- |
| Resource URL | `/api/apis/oauth/{apiID}/{oauthClientId}/tokens` |
| Method       | GET                                                  |
| Type         |                                                      |
| Body         | NONE                                                 |

#### Sample Request
```{.copyWrapper}
GET /api/apis/oauth/528a67c1ac9940964f9a41ae79235fcc/25348e8cf157409b52e39357fd9578f1/tokens HTTP/1.1
Host: localhost:3000
Authorization: {{API Access Credentials}}
Cache-Control: no-cache
```

#### Sample Response
```
[
  {
    "code": "5a7d110be6355b0c071cc339327563cb45174ae387f52f87a80d2496",
    "expires": 1518158407
  },
  {
    "code": "5a7d110be6355b0c071cc33988884222b0cf436eba7979c6c51d6dbd",
    "expires": 1518158594
  },
  {
    "code": "5a7d110be6355b0c071cc33990bac8b5261041c5a7d585bff291fec4",
    "expires": 1518158638
  },
  {
    "code": "5a7d110be6355b0c071cc339a66afe75521f49388065a106ef45af54",
    "expires": 1518159792
  }
]
```

You can control how long you want to store expired tokens in this list using `oauth_token_expired_retain_period` which specifies retain period for expired tokens stored in Redis. By default expired token not get removed. See [here](https://tyk.io/docs/configure/tyk-gateway-configuration-options/#a-name-oauth-token-expired-retain-period-a-oauth-token-expired-retain-period) for more details.

### Revoke a Single OAuth Client Token

| **Property** | **Description**                                |
| ------------ | ---------------------------------------------- |
| Resource URL | `/api/apis/oauth/{oauthClientId}/revoke`       |
| Method       | POST                                           |
| Type         | JSON                                           |
| Body         | Client Object                             |
| Param        | None                                           |


#### Sample Request

```{.json}
POST /api/apis/oauth/411f0800957c4a3e81fe181141dbc22a/revoke
Host: localhost
Authorization 64c8e662f6924c4f55e94a873d75e44d
Body: {
  "token":"eyJvcmciOiI1ZTIwOTFjNGQ0YWVmY2U2MGMwNGZiOTIiLCJpZCI6IjIyODQ1NmFjNmJlMjRiMzI5MTIyOTdlODQ5NTc4NjJhIiwiaCI6Im11cm11cjY0In0=",
  "token_type_hint":"access_token"
}
```
#### Sample Response

```{.json}
{
  "Status": "OK",
  "Message": "token revoked successfully",
  "Meta": null
}
```
### Revoke all OAuth Client Tokens

| **Property** | **Description**                                |
| ------------ | ---------------------------------------------- |
| Resource URL | `/api/apis/oauth/{oauthClientId}/revoke_all`   |
| Method       | POST                                           |
| Type         | JSON                                           |
| Body         | Client Object                                  |
| Param        | None                                           |

#### Sample Request

```{.json}
POST /api/apis/oauth/411f0800957c4a3e81fe181141dbc22a/revoke_all
Host: localhost
Authorization: 64c8e662f6924c4f55e94a873d75e44d
Body: {
  "client_secret":"MzUyNDliNzItMDhlNy00MzM3LTk1NWUtMWQyODMyMjkwZTc0"
}
```

#### Sample Response

```{.json}
{
  "Status": "OK",
  "Message": "tokens revoked successfully",
  "Meta": null
}
```
