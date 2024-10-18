---
date: 2017-03-27T12:40:59+01:00
title: Dashboard Admin API Organizations
menu:
  main:
    parent: "Tyk Dashboard Admin API"
weight: 1 
aliases:
    - /tyk-apis/tyk-dashboard-admin-api/organisations/
---

{{< note success >}}

**Important Note on Spelling:**

While our documentation now uses American English ((en-us)[https://www.andiamo.co.uk/resources/iso-language-codes/]), the product itself, including all user interfaces, configuration 
fields, environment variables, and APIs, continues to use British English spellings. When interacting with the product, 
please continue using the British English (en-gb) spellings as appear in the interface and API.  This change does not affect 
how you use the product; all functionality remains the same. 

</br>
**Example:** The API endpoint `/organisation` as shown throughout this page uses British spelling (with an 's' not 'z').
In all other instances, such as when describing or referring to this object in the documentation, we will use the
American spelling “organization” with a 'z'.

{{< /note >}}

{{< warning success >}}
**Warning**  

In a production environment, you will need to change the default `admin_Secret` value that is called by the `admin-auth`
 header in your `tyk_analytics.conf` file. This is located in `/opt/tyk-dashboard`.
</br>
{{< /warning >}}

### Retrieve a single Organization

| **Property** | **Description**                 |
| ------------ | ------------------------------- |
| Resource URL | `/admin/organisation/{org-id}`  |
| Method       | GET                             |
| Type         | None                            |
| Body         | Organization Object             |
| Param        | None                            |

#### Sample Request

```http
GET /admin/organisations/{ORG_ID} HTTP/1.1
Host: localhost:3000
admin-auth: 12345
```

#### Sample Response

```json
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


### Retrieve all Organizations

| **Property** | **Description**                 |
| ------------ | ------------------------------- |
| Resource URL | `/admin/organisation/'          |
| Method       | GET                             |
| Type         | None                            |
| Body         | Organization Object             |
| Param        | None                            |

#### Sample Request

```http
GET /admin/organisations/ HTTP/1.1
Host: localhost:3000
admin-auth: 12345
```

#### Sample Response

```json
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

### Create an Organization

| **Property** | **Description**         |
| ------------ | ----------------------- |
| Resource URL | `/admin/organisation/`  |
| Method       | POST                    |
| Type         | None                    |
| Body         | Organization Object     |
| Param        | None                    |

#### Sample Request

```http
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

```json
{
  "Status":"OK",
  "Message":"Org created",
  "Meta":"54b53d3aeba6db5c35000002"
}
```

### Update an Organization

| **Property** | **Description**             |
| ------------ | --------------------------- |
| Resource URL | `/admin/organisation/{id}`  |
| Method       | PUT                         |
| Type         | None                        |
| Body         | Organization Object         |
| Param        | None                        |

#### Sample Request

```http
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

```json
{
  "Status":"OK",
  "Message":"Org updated",
  "Meta":""
}
```

### Delete an Organization

| **Property** | **Description**             |
| ------------ | --------------------------- |
| Resource URL | `/admin/organisation/{id}`  |
| Method       | DELETE                      |
| Type         | None                        |
| Body         | None                        |
| Param        | None                        |

#### Sample Request

```http
DELETE /admin/organisation/54b53d3aeba6db5c35000002 HTTP/1.1
Host: localhost:3000
admin-auth: 12345
```

#### Sample Response

```json
{
  "Status":"OK",
  "Message":"Org deleted",
  "Meta":""
}
```
