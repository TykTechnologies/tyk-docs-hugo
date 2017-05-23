---
date: 2017-03-27T12:35:04+01:00
title: OAuth Key Management
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 10 
---


### Create a new OAuth Client

Any OAuth keys must be generated under an API in the Dashboard. Any POST requests made should contain the API's ID in the URL.

| **Property** | **Description**              |
| ------------ | ---------------------------- |
| Resource URL | `/api/apis/oauth/{{api-id}}` |
| Method       | POST                         |
| Type         | JSON                         |
| Body         | Client Object                |

```
    curl -vX POST -H "Authorization: {{API Access Credentials}}" -H "Content-Type: application/json" 
      -d '{"redirect_uri": "", "policy_id": "{{policy_id}}"}' http://{{dasboard-hostname}}/api/apis/oauth/{{api-id}}
```

#### Sample Request

```
    curl -vX POST -H "Authorization: 68525fff302641704e1a737bfca088da" 
      -H "Content-Type: application/json" 
      -d '{"redirect_uri": "", "policy_id": "57f7b07647e0800001aa2320"}' http://localhost:3000/api/apis/oauth/582af5e04c9a5f0001ce4c95
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

```
    curl -vX GET -H "Authorization: {{API Access Credentials}}" -H "Content-Type: application/json" 
      http://{{dashboard-hostname}}/api/apis/oauth/{{api-id}}
```

#### Sample Request

```
    curl -vX GET -H "Authorization: 68525fff302641704e1a737bfca088da" 
      -H "Content-Type: application/json" 
      http://localhost:3000/api/apis/oauth/582af5e04c9a5f0001ce4c95
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

### Get an OAuth Client

| **Property** | **Description**                            |
| ------------ | ------------------------------------------ |
| Resource URL | `/api/apis/oauth/{{api-id}}/{{client_id}}` |
| Method       | GET                                        |
| Type         | JSON                                       |
| Body         | NONE                                       |

```
    curl -vX GET -H "Authorization: {{API Access Credentials}}" -H "Content-Type: application/json" 
      http://localhost:3000/api/apis/oauth/{{api-id}}/{{client_id}}
```

#### Sample Request

```
    curl -vX GET -H "Authorization: 68525fff302641704e1a737bfca088da" -H "Content-Type: application/json" 
      http://localhost:3000/api/apis/oauth/582af5e04c9a5f0001ce4c95/7dce7fc297424fd65596b51c214666a4
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

```
    curl -vX DELETE -H "Authorization: {{API Access Credentials}}" -H "Content-Type: application/json" 
      http://{{dashboard-hostname}}/api/apis/oauth/{{api-id}}/{{client_id}}
```

#### Sample Request

```
    curl -vX DELETE -H "Authorization: 68525fff302641704e1a737bfca088da" 
      -H "Content-Type: application/json" 
      http://localhost:3000/api/apis/oauth/582af5e04c9a5f0001ce4c95/d39817b33fb14c335d2a8699705f1c41
```

#### Sample Response

```
    {
      "Status": "OK",
      "Message": "OAuth Client deleted successfully",
      "Meta":null
    }
```

### OAuth Authorization Token

| **Property** | **Description**                                |
| ------------ | ---------------------------------------------- |
| Resource URL | `/api/apis/oauth/{{api_id}}/authorize-client/` |
| Method       | POST                                           |
| Type         | Form-Encoded                                   |
| Body         | Fields (see below)                             |

* `api_id`: Unlike the other requests on this page, this should be the `api_id` value and **NOT** the API's `id` value. 
* `response_type`: Should be provided by requesting client as part of authorisation request, this should be either `code` or `token` depending on the methods you have specified for the API.
* `client_id`: Should be provided by requesting client as part of authorisation request. The Client ID that is making the request.
* `redirect_uri`: Should be provided by requesting client as part of authorisation request. Must match with the record stored with Tyk.
* `key_rules`: A string representation of a Session Object (form-encoded). *This should be provided by your application in order to apply any quotas or rules to the key.*

Note that in the following example, the `policy_id` isn't included in the request as these are optional. OAuth Flow also supports callbacks which can be added to the `key_rules` in the payload in requests that don't include the `policy_id`.

```
    curl -vX POST -H "Authorization: {{API Access Credentials}}" -H "Content-Type: application/x-www-form-urlencoded" 
    -d 'response_type=code&client_id={{client_id}}&redirect_uri=http%3A%2F%2Foauth.com%2Fredirect&key_rules=%7B+++++%22allowance%22%3A+999%2C+++++%22rate%22%3A+1000%2C+++++%22per%22%3A+60%2C+++++%22expires%22%3A+0%2C+++++%22quota_max%22%3A+-1%2C+++++%22quota_renews%22%3A+1406121006%2C+++++%22quota_remaining%22%3A+0%2C+++++%22quota_renewal_rate%22%3A+60%2C+++++%22access_rights%22%3A+%7B+++++++++%22528a67c1ac9940964f9a41ae79235fcc%22%3A+%7B+++++++++++++%22api_name%22%3A+%22{{api_name}}%22%2C+++++++++++++%22api_id%22%3A+%{{api_id}}%22%2C+++++++++++++%22versions%22%3A+%5B+++++++++++++++++%22Default%22+++++++++++++%5D+++++++++%7D+++++%7D%2C+++++%22org_id%22%3A+%22{{org_id}}%22+%7D' 
    http://{{dashboard-hostname}}/api/apis/oauth/{{api_id}}/authorize-client
```

#### Sample Request

```
    curl -vX POST -H "Authorization: 68525fff302641704e1a737bfca088da" 
      -H "Content-Type: application/x-www-form-urlencoded" 
      -d 'response_type=code&client_id=7dce7fc297424fd65596b51c214666a4&redirect_uri=http%3A%2F%2Foauth.com%2Fredirect&key_rules=%7B+++++%22allowance%22%3A+999%2C+++++%22rate%22%3A+1000%2C+++++%22per%22%3A+60%2C+++++%22expires%22%3A+0%2C+++++%22quota_max%22%3A+-1%2C+++++%22quota_renews%22%3A+1406121006%2C+++++%22quota_remaining%22%3A+0%2C+++++%22quota_renewal_rate%22%3A+60%2C+++++%22access_rights%22%3A+%7B+++++++++%22528a67c1ac9940964f9a41ae79235fcc%22%3A+%7B+++++++++++++%22api_name%22%3A+%22test+api%22%2C+++++++++++++%22api_id%22%3A+%582af5e04c9a5f0001ce4c95%22%2C+++++++++++++%22versions%22%3A+%5B+++++++++++++++++%22Default%22+++++++++++++%5D+++++++++%7D+++++%7D%2C+++++%22org_id%22%3A+%2257e9522eba9f0a0001000040%22+%7D' 
    http://localhost:3000/api/apis/oauth/582af5e04c9a5f0001ce4c95/authorize-client/
```

#### Sample Response

```
    {
      "code": "MWY0ZDRkMzktOTYwNi00NDRiLTk2YmQtOWQxOGQ3Mjc5Yzdk",
      "redirect_to": "http://localhost:3000/oauth-redirect/?code=MWY0ZDRkMzktOTYwNi00NDRiLTk2YmQtOWQxOGQ3Mjc5Yzdk"
    }
```