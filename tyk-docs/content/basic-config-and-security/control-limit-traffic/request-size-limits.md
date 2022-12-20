---
date: 2017-03-23T17:18:54Z
title: Request Size Limits
tags: ["Request size limits"]
description: "The key concepts for implementing rate limits and quotas with Tyk"
menu:
  main:
    parent: "Control & Limit Traffic"
weight: 4 
---

## Maximum Request Sizes

Tyk supports forcing request size limits at the API and individual endpoint level. Tyk will reject any request that exceeds the size you set.

{{< note success >}}
**Note**  

Tyk Cloud Classic enforces a strict request size limit of 1MB an all inbound requests via our cloud architecture. This does not affect Multi-Cloud users.
{{< /note >}}


## Max Request Size with the Dashboard

To enforce a request size from your API Endpoint Designer:

1.  Click **ADD ENDPOINT**.

2.  Fill in the endpoint pattern with the details of the request (e.g. `GET widgets/{wildcard}`).

3.  Select **Request Size Limit** from the "Plugins" drop down.
    
    {{< img src="/img/2.10/request_size_limit.png" alt="Plugins drop down" >}}

4.  Set the size limit in bytes.
    
    {{< img src="/img/2.10/request_size_settings.png" alt="Size limit form" >}}

5.  Save the API.


## <a name="max-request-size-with-api"></a> Max Request Size with API Definition

To set up this middleware in your API Definition, simply add a new section to the `extended_paths` block of your API Definition configuration called `size_limits`:

```{.copyWrapper}
"size_limits": [
  {
    "path": "widget/{id}",
    "method": "PUT",
    "size_limit": 25
  }
  ]
```

The size limit must be in in **bytes**.

### Global size limiting for your API

To add an API size limit, simply add:
```
"global_size_limit": 500 
```


To the version element of your API Definition, the global size limit will be checked before the specific path-based one.
