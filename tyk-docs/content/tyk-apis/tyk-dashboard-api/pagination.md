---
date: 2019-10-15T12:13:12+01:00
title: Pagination
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 4
---

Selected Dashboard APIs can be paginated.

You can select the number of result pages to return by adding a parameter `p` which starts at `1`. At the default page size, this returns items 1-10. Setting `p` to `2` returns items 11-20 and so on. Alternatively, passing `0` or lower as a parameter will return all items.

The default page size is 10. You can overwrite the default page size in your `tyk_analytics.conf` using the `page_size` key. It's suggested you do not modify it as it will affect the performance of the Dashboard.

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