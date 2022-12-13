---
date: 2017-03-27T12:47:13+01:00
title: Dashboard Admin API Single Sign On
menu:
  main:
    parent: "Tyk Dashboard Admin API"
weight: 5
---

The Dashboard Admin SSO API endpoint allows you to implement custom authentication schemes for the Dashboard and Portal. Our Tyk Identity Broker (TIB) internally also uses this API. See [Single Sign On](/tyk-apis/tyk-dashboard-admin-api/sso/) for more details.

{{< warning success >}}
**Warning**  

In a production environment, you will need to change the default `admin_Secret` value that is called by the `admin-auth` header in your `tyk_analytics.conf` file. This is located in `/opt/tyk-dashboard`.
{{< /warning >}}

### Generate authentication token

The Dashboard exposes the `/admin/sso` Admin API which allows you to generate a temporary authentication token, valid for 60 seconds. 

You should provide JSON payload with the following data:

* `ForSection` - scope with possible values of `"dashboard"` or `"portal"` 
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

See [Single Sign On](/advanced-configuration/integrate/sso/) documentation for how to use this token and more details.