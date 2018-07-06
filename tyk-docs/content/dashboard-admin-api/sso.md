---
date: 2017-03-27T12:47:13+01:00
title: Admin API Single Sign On
menu:
  main:
    parent: "Tyk Dashboard Admin API"
weight: 5
---

Our SSO API allows you to implement custom authentication schemes for the Dashboard and Portal. 
Our Tyk Identity Broker (TIB) internally also uses this API. 

### Generate authentication token

The Dashboard exposes the `/admin/sso` Admin API which allows you to generate a temporary authentication token, valid for 60 seconds. 

You should provide JSON payload with the following data:
* `ForSection` - scope with possible values of `"dashboard"` or `"portal"`. 
* `OrgID` - with your organisation id.
* `GroupID` - the group id
* `EmailAddress` - user email


| **Property** | **Description**              |
| ------------ | ---------------------------- |
| Resource URL | `/admin/sso` |
| Method       | POST                         |
| Body         | `{"ForSection":"<scope>", "OrgID": "<org-id>", "GroupID": "<group-id>"}`  |

#### Sample Request

```{.copyWrapper}
POST /admin/sso HTTP/1.1
Host: localhost:3000
admin-auth: 12345
    
{
    "ForSection": "dashboard",
    "OrgID": "588b4f0bb275ff0001cc7471",
    "EmailAddress": "name@somewhere.com",
    "GroupID": ""
}
```

#### Sample Response:
```{.copyWrapper}
{"Status":"OK","Message":"SSO Nonce created","Meta":"YTNiOGUzZjctYWZkYi00OTNhLTYwODItZTAzMDI3MjM0OTEw"}
```

### Using the Token

Once you have issued a token you can login to the dashboard using the `/tap` url, or to the portal using the `<portal-url>/sso` URL, and provide an authentication token via the `nonce` query param.
If `nonce` is valid, Tyk will create a temporary user and log them in. 

#### Set up default permissions for the dashboard
If you use the token with `dashboard` scope, and would like to avoid login in as admin user (which is the default permissions), you can add the `sso_permission_defaults` configuration option to the Dashboard config file (`tyk_analytics.conf`) to specify SSO user permissions in the following format:

```
"sso_permission_defaults": {
  "analytics": "read",
  "apis": "write",
  "hooks": "write",
  "idm": "write",
  "keys": "write",
  "policy": "write",
  "portal": "write",
  "system": "write",
  "users": "write",
  "user_groups": "write"
}
```

#### Sample Login Request

```{.copyWrapper}
GET /tap?nonce=YTNiOGUzZjctYWZkYi00OTNhLTYwODItZTAzMDI3MjM0OTEw HTTP/1.1
Host: localhost:3000    
```

