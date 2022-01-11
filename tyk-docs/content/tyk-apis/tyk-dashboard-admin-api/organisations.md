---
date: 2017-03-27T12:40:59+01:00
title: Dashboard Admin API Organisations
menu:
  main:
    parent: "Tyk Dashboard Admin API"
weight: 1 
url: /dashboard-admin-api/organisations/
aliases:
    - /tyk-apis/tyk-dashboard-admin-api/organisations/
---

{{< warning success >}}
**Warning**  

In a production environment, you will need to change the default `admin_Secret` value that is called by the `admin-auth` header in your `tyk_analytics.conf` file. This is located in `/opt/tyk-dashboard`.
{{< /warning >}}

### Retrieve a single Organisation

| **Property** | **Description**                 |
| ------------ | ------------------------------- |
| Resource URL | `/admin/organisations/{org-id}` |
| Method       | GET                             |
| Type         | None                            |
| Body         | Organisation Object             |
| Param        | None                            |

#### Sample Request

```{.copyWrapper}
GET /admin/organisations/{ORG_ID}
Host: localhost:3000
admin-auth: 12345
```

#### Sample Response

```
{
    "id": "5cc03283d07e7f00019404b3",
    "owner_name": "TestOrg5 Ltd.",
    "owner_slug": "testorg",
    "cname_enabled": true,
    "cname": "www.tyk-portal-test.com",
    "apis": [
        {
            "api_human_name": "First API #Test",
            "api_id": "5508bd9429434d5768c423a04db259ea"
        }
    ],
    "developer_quota": 0,
    "developer_count": 0,
    "event_options": {},
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
        "dont_allow_license_management_view": false,
        "cloud": false
    },
    "org_options_meta": {}
}
```


### Retrieve all Organisations

| **Property** | **Description**                 |
| ------------ | ------------------------------- |
| Resource URL | `/admin/organisations/
| Method       | GET                             |
| Type         | None                            |
| Body         | Organisation Object             |
| Param        | None                            |

#### Sample Request

```{.copyWrapper}
GET /admin/organisations/
Host: localhost:3000
admin-auth: 12345
```

#### Sample Response

```
{
    "organisations": [
        {
            "id": "5cc03283d07e7f00019404b3",
            "owner_name": "TestOrg5 Ltd.",
            "owner_slug": "testorg",
            "cname_enabled": true,
            "cname": "www.tyk-portal-test.com",
            "apis": [
                {
                    "api_human_name": "First API #Test",
                    "api_id": "5508bd9429434d5768c423a04db259ea"
                }
            ],
            "developer_quota": 0,
            "developer_count": 0,
            "event_options": {},
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
                "dont_allow_license_management_view": false,
                "cloud": false
            },
            "org_options_meta": {}
        },
        {
            "id": "5ccae84aa402ce00018b5435",
            "owner_name": "Jively",
            "owner_slug": "",
            "cname_enabled": true,
            "cname": "jive.ly",
            "apis": [],
            "developer_quota": 0,
            "developer_count": 0,
            "event_options": {},
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
                "dont_allow_license_management_view": false,
                "cloud": false
            },
            "org_options_meta": {}
        }
    ],
    "pages": 0
}
```

### Create an Organisation

| **Property** | **Description**         |
| ------------ | ----------------------- |
| Resource URL | `/admin/organisations/` |
| Method       | POST                    |
| Type         | None                    |
| Body         | Organisation Object     |
| Param        | None                    |

#### Sample Request

```{.copyWrapper}
POST /admin/organisations/ HTTP/1.1
Host: localhost:3000
admin-auth: 12345

{
  "owner_name": "Jively",
  "cname": "jive.ly",
  "cname_enabled": true
}
```

#### Sample response

```
{
  "Status":"OK",
  "Message":"Org created",
  "Meta":"54b53d3aeba6db5c35000002"
}
```

### Update an Organisation

| **Property** | **Description**             |
| ------------ | --------------------------- |
| Resource URL | `/admin/organisations/{id}` |
| Method       | PUT                         |
| Type         | None                        |
| Body         | Organisation Object         |
| Param        | None                        |

#### Sample Request

```{.copyWrapper}
PUT /admin/organisations/54b53d3aeba6db5c35000002 HTTP/1.1
Host: localhost:3000
admin-auth: 12345

{
  "owner_name": "Jively",
  "cname": "jive.ly",
  "cname_enabled": true
}
```

#### Sample Response

```
{
  "Status":"OK",
  "Message":"Org updated",
  "Meta":""
}
```

### Delete an Organisation

| **Property** | **Description**             |
| ------------ | --------------------------- |
| Resource URL | `/admin/organisations/{id}` |
| Method       | DELETE                      |
| Type         | None                        |
| Body         | None                        |
| Param        | None                        |

#### Sample Request

```{.copyWrapper}
DELETE /admin/organisations/54b53d3aeba6db5c35000002 HTTP/1.1
Host: localhost:3000
admin-auth: 12345
```

#### Sample Response

```
{
  "Status":"OK",
  "Message":"Org deleted",
  "Meta":""
}
```