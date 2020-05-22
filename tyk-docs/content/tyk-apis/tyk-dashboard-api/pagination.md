---
date: 2019-10-15T12:13:12+01:00
title: Pagination
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 4
---

Some Dashboard APIs are paginated.  You can define what page of the results to return by adding a parameter `p` which starts at 0, indicating which page you'd like to retrieve.

Alternatively, passing `-1` as a parameter will return all items.

The default page size is 10. You can overwrite the default page size in your tyk_analytics.conf using the `page_size` key. It's suggested you do not modify it as it will affect the performance of the Dashboard.

#### Sample Request:

```{.copyWrapper}
GET /api/apis/?p=1 HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response:

```
{
  "apis": [
    { ... },
    { ... },
    { ... }
  ],
  "pages": 1
}
```
