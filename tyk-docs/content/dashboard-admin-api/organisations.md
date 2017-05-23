---
date: 2017-03-27T12:40:59+01:00
title: Admin API Organisations
menu:
  main:
    parent: "Tyk Dashboard Admin API"
weight: 1 
---

The organisations API is part of the super-admin context, it therefore has a separate endpoint prefix (`/admin`) and uses a fixed header for auth, using the header `admin-auth`, this is so that regular Dashboard users cannot create new organisations using their API keys.

The only other admin endpoint is `/admin/users` which behaves the same way as the regular user's endpoint, however it allows the admin to define an Organisation ID for the end user, whereas the regular endpoint will force Organisation ownership based on the current accessing key's session.

### Retrieve a single organisation

| **Property** | **Description**                 |
| ------------ | ------------------------------- |
| Resource URL | `/admin/organisations/{org-id}` |
| Method       | GET                             |
| Type         | None                            |
| Body         | Organisation Object             |
| Param        | None                            |

#### Sample Request

```
    POST /admin/organisations/ HTTP/1.1
    Host: localhost:3000
    admin-auth: 12345
```

#### Sample response

```
    {
        "id": "54b53d3aeba6db5c35000002",
        "owner_name": "Jively",
        "cname": "jive.ly",
        "cname_enabled": true,
        "apis": [
            {
                "api_human_name": "Nitrous Test",
                "api_id": "39d2c98be05c424371c600bd8b3e2242"
            },
            {
                "api_human_name": "TEST",
                "api_id": "f4e4f4d8568a48464b7d4088b16a2b1f"
            },
            {
                "api_human_name": "Test",
                "api_id": "bc2f8cfb7ab241504d9f3574fe407499"
            }
        ]
    }
```

### Create an organisation

| **Property** | **Description**         |
| ------------ | ----------------------- |
| Resource URL | `/admin/organisations/` |
| Method       | POST                    |
| Type         | None                    |
| Body         | Organisation Object     |
| Param        | None                    |

#### Sample Request

```
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

### Update an organisation

| **Property** | **Description**             |
| ------------ | --------------------------- |
| Resource URL | `/admin/organisations/{id}` |
| Method       | PUT                         |
| Type         | None                        |
| Body         | Organisation Object         |
| Param        | None                        |

#### Sample Request

```
    PUT /admin/organisations/54b53d3aeba6db5c35000002 HTTP/1.1
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
        "Message":"Org updated",
        "Meta":""
    }
```

### Delete an organisation

| **Property** | **Description**             |
| ------------ | --------------------------- |
| Resource URL | `/admin/organisations/{id}` |
| Method       | DELETE                      |
| Type         | None                        |
| Body         | None                        |
| Param        | None                        |

#### Sample Request

```
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