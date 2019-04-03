---
date: 2017-03-23T17:18:54Z
title: Request Size Limits
menu:
  main:
    parent: "Control & Limit Traffic"
weight: 4 
---

## <a name="maximum-request-sizes"></a> Maximum Request Sizes

Tyk supports forcing request size limits on a global and on a per-endpoint level. Tyk will reject any request that is too big. Size limits can be set on a global or per-path basis.

> **Note for Tyk Cloud Users**: Tyk Cloud enforces a strict request size limit of 1MB an all inbound requests via our cloud architecture. This does not affect Multi-Cloud users.

## <a name="max-request-size-with-dashboard"></a> Max Request Size with the Dashboard

To enforce a request size on your API, from your **Endpoint Designer**:

![Endpoint designer tab location][1]

1.  Click **ADD ENDPOINT**.

2.  Fill in the endpoint pattern with the details of the request (e.g. `GET widgets/{wildcard}`).

3.  Select **Request Size Limit** from the "Plugins" drop down.
    
    ![Plugins drop down][3]

4.  Set the size limit in bytes.
    
    ![Size limit form][4]

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

### Global size limiting

To add a global check for size limits, simply add:
```
"global_size_limit": 500 
```


To the version element of your API Definition, the global size limit will be checked before the specific path-based one.

[1]: /docs/img/dashboard/system-management/endpoint_designer_2.5.png
[2]: /docs/img/dashboard/system-management/addEndpoint.png
[3]: /docs/img/dashboard/system-management/request_size_plugin_2.5.png
[4]: /docs/img/dashboard/system-management/set_size_limit_2.5.png

