---
date: 2017-03-27T12:47:13+01:00
title: Dashboard Admin API Import
menu:
  main:
    parent: "Tyk Dashboard Admin API"
weight: 4 
---

The import API enables you to add *Organizations*, *APIs* and *Policies* back into a Tyk installation while retaining their base IDs so that they work together.

{{< note success >}}
**Note**  

To enable this feature, the minimum required versions for the Gateway and Dashboard are v2.3 and v1.3.1.2, respectively.
{{< /note >}}


{{< warning success >}}
**Warning**  

In a production environment, you will need to change the default `admin_secret` value that is called by the `admin-auth` header in your `tyk_analytics.conf` file. This is located in `/opt/tyk-dashboard`.
{{< /warning >}}

#### Import Organization

The [Organization object]({{<ref "basic-config-and-security/security/dashboard/organisations" >}}) is the most fundamental object in a Tyk setup, all other ownership properties hang off the relationship between an Organization and its APIs, Policies and API Tokens.

| **Property** | **Description**              |
| ------------ | ---------------------------- |
| Resource URL | `admin/organisations/import` |
| Method       | POST                         |
| Type         | None                         |
| Body         | None                         |
| Param        | None                         |

#### Sample Request

```{.copyWrapper}
POST /admin/organisations/import HTTP/1.1
Host: localhost:3000
admin-auth: 12345

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

### Import APIs

The import APIs operates on *lists* of APIs.

| **Property** | **Description**     |
| ------------ | ------------------- |
| Resource URL | `admin/apis/import` |
| Method       | POST                |
| Type         | None                |
| Body         | None                |
| Param        | None                |

#### Sample Request

```{.copyWrapper}
POST /admin/apis/import HTTP/1.1
Host: localhost:3000
admin-auth: 12345

{
  "apis": [{
    "api_model": {},
    "api_definition": {...},
    "hook_references": [],
    "is_site": false,
    "sort_by": 0
}, {
    "api_model": {},
    "api_definition": {...},
    "hook_references": [],
    "is_site": false,
    "sort_by": 0
}]
}
```

### Import Policies

The import Policies operates on *lists* of Policies.

| **Property** | **Description**         |
| ------------ | ----------------------- |
| Resource URL | `admin/policies/import` |
| Method       | POST                    |
| Type         | None                    |
| Body         | None                    |
| Param        | None                    |

#### Sample Request

```{.copyWrapper}
POST /admin/policies/import HTTP/1.1
Host: localhost:3000
admin-auth: 12345

{
  "Data": [{
    "_id": "57ed12fc30c55e6b890d37d8",
    "access_rights": {
      "5fa2db834e07444f760b7ceb314209fb": {
        "allowed_urls": [],
        "api_id": "5fa2db834e07444f760b7ceb314209fb",
        "api_name": "New API 1",
        "versions": ["Default"]
      },
      "7a6ddeca9244448a4233866938a0d6e2": {
        "allowed_urls": [],
        "api_id": "7a6ddeca9244448a4233866938a0d6e2",
        "api_name": "API1",
        "versions": ["Default"]
      }
    },
      "active": true,
      "date_created": "0001-01-01T00:00:00Z",
      "hmac_enabled": false,
      "is_inactive": false,
      "key_expires_in": 0,
      "last_updated": "1478791603",
      "name": "Default",
      "org_id": "53ac07777cbb8c2d53000002",
      "partitions": {
        "acl": false,
        "quota": false,
        "rate_limit": false
      },
      "per": 60,
      "quota_max": -1,
      "quota_renewal_rate": 3600,
      "rate": 1000,
      "tags": []
  }, {
    "_id": "5824343b30c55e52d5e6cfde",
    "access_rights": {
      "7a6ddeca9244448a4233866938a0d6e2": {
        "allowed_urls": [],
        "api_id": "7a6ddeca9244448a4233866938a0d6e2",
        "api_name": "API 1",
        "versions": ["Default"]
      }
    },
      "active": true,
      "date_created": "0001-01-01T00:00:00Z",
      "hmac_enabled": false,
      "is_inactive": false,
      "key_expires_in": 0,
      "last_updated": "1478791761",
      "name": "Test Policy",
      "org_id": "53ac07777cbb8c2d53000002",
      "partitions": {
        "acl": false,
        "quota": false,
        "rate_limit": false
      },
      "per": 1,
      "quota_max": 100,
      "quota_renewal_rate": 90000,
      "rate": 10,
      "tags": []
  }, {
    "_id": "58172a2330c55e22afcd59af",
    "access_rights": {
      "109eacaa50b24b64651a1d4dce8ec385": {
        "allowed_urls": [],
        "api_id": "109eacaa50b24b64651a1d4dce8ec385",
        "api_name": "API 3",
        "versions": ["Default"]
      },
      "5fa2db834e07444f760b7ceb314209fb": {
        "allowed_urls": [],
        "api_id": "5fa2db834e07444f760b7ceb314209fb",
        "api_name": "API 2",
        "versions": ["Default"]
      },
      "7a6ddeca9244448a4233866938a0d6e2": {
        "allowed_urls": [],
        "api_id": "7a6ddeca9244448a4233866938a0d6e2",
        "api_name": "API 1",
        "versions": ["Default"]
      },
      "d023576f836a4e407153009e8d95cf73": {
        "allowed_urls": [],
        "api_id": "d023576f836a4e407153009e8d95cf73",
        "api_name": "Test API",
        "versions": ["Default"]
      }
  },
    "active": true,
    "date_created": "0001-01-01T00:00:00Z",
    "hmac_enabled": false,
    "is_inactive": false,
    "key_expires_in": 2592000,
    "last_updated": "1477913123",
    "name": "Big Policy",
    "org_id": "53ac07777cbb8c2d53000002",
    "partitions": {
      "acl": false,
      "quota": false,
      "rate_limit": false
  },
  "per": 1,
  "quota_max": 6000,
  "quota_renewal_rate": 3600,
  "rate": 10,
  "tags": ["TEST-1", "TEST-2"]
}],
  "Pages": 0
}
```
