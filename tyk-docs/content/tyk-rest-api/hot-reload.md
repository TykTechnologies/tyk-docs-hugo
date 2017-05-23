---
date: 2017-03-27T11:48:50+01:00
title: Hot Reload
menu:
  main:
    parent: "Tyk Rest API"
weight: 6 
---

### Hot-reload a Tyk group

To reload a whole group of Tyk nodes (without using the Dashboard or host manager), you can send an API request to a single node, this node will then send a notification through the pub/sub infrastructure to all other listening nodes (including the host manager if it is being used to manage NginX) which will then trigger a global reload.

| **Property** | **Description**     |
| ------------ | ------------------- |
| Resource URL | `/tyk/reload/group` |
| Method       | GET                 |
| Type         | None                |
| Body         | none                |

#### Sample request

```
    GET /tyk/reload/group HTTP/1.1
    Host: localhost:5000
    X-Tyk-Authorization: 352d20ee67be67f6340b4c0605b044b7
    Cache-Control: no-cache
```

#### Sample Response

```
    {
        "status": "ok",
        "error": ""
    }
```

### Hot-reload a single node

Tyk is capable of reloading configurations without having to stop serving requests, this means that API configurations can be added at runtime, or even modified at runtime and those rules applied immediately without any downtime.

| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/tyk/reload/`  |
| Method       | GET             |
| Type         | None            |
| Body         | none            |

#### Sample request

```
    GET /tyk/reload/ HTTP/1.1
    Host: localhost:5000
    X-Tyk-Authorization: 352d20ee67be67f6340b4c0605b044b7
    Cache-Control: no-cache
```

#### Sample Response

```
    {
        "status": "ok",
        "error": ""
    }
```