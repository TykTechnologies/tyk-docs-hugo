---
date: 2017-03-27T12:45:14+01:00
title: Dashboard Admin API Export
menu:
  main:
    parent: "Tyk Dashboard Admin API"
weight: 3 
---

To make Tyk installations more portable, the Export API enables you to export key configuration objects required to back-up and re-deploy a basic Tyk Pro installation.

{{< note success >}}
**Note**  

To enable this feature, the minimum required versions for the Gateway and Dashboard are v2.3 and v1.3.1.2, respectively.
{{< /note >}}


{{< warning success >}}
**Warning**  

In a production environment, you will need to change the default `admin_Secret` value that is called by the `admin-auth` header in your `tyk_analytics.conf` file. This is located in `/opt/tyk-dashboard`.
{{< /warning >}}


#### Export Organisations

The organisation object is the most fundamental object in a Tyk setup, all other ownership properties hang off the relationship between an organisation and its APIs, Policies and API Tokens.

| **Property** | **Description**                 |
| ------------ | ------------------------------- |
| Resource URL | `/admin/organisations/{ORG-ID}` |
| Method       | GET                             |
| Type         | None                            |
| Body         | None                            |
| Param        | None                            |

#### Sample Request

```{.copyWrapper}
GET /admin/organisations/54bd0ad9ff4329b88985aafb HTTP/1.1
Host: localhost:3000
admin-auth: 12345
```

#### Sample Response

```
{
  "id": "53ac07777cbb8c2d53000002",
  "owner_name": "Test",
  "owner_slug": "test",
  "cname_enabled": true,
  "cname": "my.domain.com",
  "apis": [{
    "api_human_name": "API 2",
    "api_id": "5fa2db834e07444f760b7ceb314209fb"
  }, {
    "api_human_name": "API 1",
    "api_id": "7a6ddeca9244448a4233866938a0d6e2"
  }, {
    "api_human_name": "API 3",
    "api_id": "109eacaa50b24b64651a1d4dce8ec385"
  }],
  "developer_quota": 123,
  "developer_count": 21,
  "event_options": {
    "key_event": {
      "webhook": "",
      "email": "",
      "redis": true
    },
    "key_request_event": {
      "webhook": "",
      "email": "",
      "redis": false
    }
  },
  "hybrid_enabled": false,
  "ui": {
    "languages": {},
    "hide_help": false,
    "default_lang": "",
    "login_page": {},
    "nav": {},
    "uptime": {},
    "portal_section": {},
    "designer": {},
    "dont_show_admin_sockets": false,
    "dont_allow_license_management": false,
    "dont_allow_license_management_view": false
  }
}
```

### Export APIs and Policies

To export APIs and Policies you should use the standard `GET APIS` endpoint and `GET POLICIES` list endpoints. The output from these endpoints can be used by the [Import API]({{ ref "tyk-apis/tyk-dashboard-admin-api/import" >}}).