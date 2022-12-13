---
date: 2017-03-27T12:13:12+01:00
title: Open Policy Agent API
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 5 
url: /tyk-dashboard-api/org/opa
aliases: /tyk-apis/tyk-dashboard-api/org/opa
---
{{< note success >}}
**Note**  

The Open Policy Agent API helps you to manage (CRUD) the OPA (Open Policy Agent) rules that are being applied to the Tyk Dashboard. You can also change the OPA settings, such as to enable/disable it or enable/disable the debug mode.

Only Admin role Dashboard users are authorised to use it.
{{< /note >}}

For more information on how to configure OPA see [Open Policy Agent]({{< ref "tyk-dashboard/open-policy-agent/" >}}).
### List OPA rules and settings

This endpoint returns by defaul the initial set of OPA rules defined in your Tyk Dashboard, which are located in [schema/dashboard.rego]({{< ref "tyk-dashboard/opa-rules/" >}}) (accessible in Self-Managed installations).

Once you update the rules via the API, the OPA rules will be stored at the organisation level.

| **Property** | **Description**       |
| ------------ | --------------------- |
| Resource URL | `/api/org/opa        `|
| Method       | GET                   |
| Type         | None                  |
| Body         | None                  |
| Param        | None                  |

#### Sample Request

```{.copyWrapper}
GET /api/org/opa HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "open_policy": {
    "enabled": true,
    "rules": "default hello = false\r\n\r\nhello {\r\n    m := input.message\r\n    m == \"world\"\r\n}"
  }
}
```
### Update OPA rules and settings

{{< note success >}}
**Note**  

Whenever you want to update OPA rules or its settings, send the updated value of the OPA rules or changed values for the settings (`enabled`) via a PUT request to the `permissions` endpoint.

{{< /note >}}


| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/org/permission`    |
| Method       | PUT                      |
| Type         | None                     |
| Body         | Permissions Object       |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
PUT /api/org/opa HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

```
{
  "open_policy": {
    "enabled": false,
    "rules": "default hello = false\r\n\r\nhello {\r\n    m := input.message\r\n    m == \"world\"\r\n}"
  }
}
```

#### Sample Response

```
{
    "Status": "OK",
    "Message": "OPA rules has been updated on org level",
    "Meta": null
}
```
