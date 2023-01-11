---
date: 2017-03-27T12:13:12+01:00
title: Analytics Endpoints
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 1
---

{{< note success >}}
**Note**  
Below APIs returns data only if you have Pump 1.7.0
{{< /note >}}

### Analytics of API Key
| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/activity/keys/endpoint/{keyHash}/{startDay}/{startMonth}/{startYear}/{EndDay}/{EndMonth}/{EndYear}`    |
| Method       | GET             |
| Type         | None            |
| Body         | None            |
| Param        | None            |

It returns analytics of the endpoints of all APIs called using KEY between start and end date.

#### Sample Request
To get analytics of all endpoints called using the key `7f3c3ca87376cabe` between October 13th 2020 and October 14th 2020, make the following call:

```{.copyWrapper}
GET api/activity/keys/endpoint/7f3c3ca87376cabe/13/10/2020/14/10/2020 HTTP/1.1
Host: localhost:3000
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response
```
{
    "data": [
        {
            "id": {
                "day": 0,
                "month": 0,
                "year": 0,
                "hour": 0,
                "code": 0,
                "path": "/anything",
                "key": "",
                "alias": "",
                "url": "",
                "iso_country": "",
                "api_id": "41351a6a94094da05f75146a695a16f6",
                "api_name": ""
            },
            "hits": 1,
            "success": 1,
            "error": 0,
            "last_hit": "2020-10-13T13:22:49.667+05:30",
            "request_time": 0,
            "latency": 217,
            "upstream_latency": 217,
            "max_upstream_latency": 217,
            "min_upstream_latency": 217,
            "max_latency": 217,
            "min_latency": 217
        },
        {
            "id": {
                "day": 0,
                "month": 0,
                "year": 0,
                "hour": 0,
                "code": 0,
                "path": "/anything",
                "key": "",
                "alias": "",
                "url": "",
                "iso_country": "",
                "api_id": "1793db2cbb724ad54da582ce3191d383",
                "api_name": ""
            },
            "hits": 1,
            "success": 1,
            "error": 0,
            "last_hit": "2020-10-13T13:22:20.534+05:30",
            "request_time": 568,
            "latency": 568,
            "upstream_latency": 568,
            "max_upstream_latency": 568,
            "min_upstream_latency": 568,
            "max_latency": 568,
            "min_latency": 568
        },
    ],
    "pages": 1
}
```

### Analytics of OAuth Client
| **Property** | **Description** |
| ------------ | --------------- |
| Resource URL | `/api/activity/oauthid/endpoint/{OAuthClientID}/{startDay}/{startMonth}/{startYear}/{EndDay}/{EndMonth}/{EndYear}`    |
| Method       | GET             |
| Type         | None            |
| Body         | None            |
| Param        | None            |

It returns analytics of the all endpoints called using the given OAuth Client ID.

#### Sample Request
To get activity of all endpoints which used OAuth client `27b35a9ed46e429eb2361e440cc4005c` between October 13th 2020 and October 14th 2020, make the following call:

```{.copyWrapper}
GET /api/activity/oauthid/endpoint/27b35a9ed46e429eb2361e440cc4005c/13/10/2020/14/10/2020 HTTP/1.1
Host: localhost:3000
authorization: 7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response
```
{
    "data": [
        {
            "id": {
                "day": 0,
                "month": 0,
                "year": 0,
                "hour": 0,
                "code": 0,
                "path": "/get",
                "key": "",
                "alias": "",
                "url": "",
                "iso_country": "",
                "api_id": "79fc7cb80df940cc5089772200bd4926",
                "api_name": ""
            },
            "hits": 2,
            "success": 1,
            "error": 1,
            "last_hit": "2020-10-13T14:48:51.582+05:30",
            "request_time": 498,
            "latency": 498,
            "upstream_latency": 497.5,
            "max_upstream_latency": 747,
            "min_upstream_latency": 248,
            "max_latency": 748,
            "min_latency": 248
        },
        {
            "id": {
                "day": 0,
                "month": 0,
                "year": 0,
                "hour": 0,
                "code": 0,
                "path": "/post",
                "key": "",
                "alias": "",
                "url": "",
                "iso_country": "",
                "api_id": "79fc7cb80df940cc5089772200bd4926",
                "api_name": ""
            },
            "hits": 1,
            "success": 1,
            "error": 0,
            "last_hit": "2020-10-13T14:49:31.541+05:30",
            "request_time": 0,
            "latency": 241,
            "upstream_latency": 239,
            "max_upstream_latency": 239,
            "min_upstream_latency": 239,
            "max_latency": 241,
            "min_latency": 241
        }
    ],
    "pages": 1
}
```

