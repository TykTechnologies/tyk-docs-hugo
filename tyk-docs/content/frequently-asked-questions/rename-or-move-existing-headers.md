---
date: 2017-03-27T16:34:33+01:00
title: How to rename or move existing headers in a request
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

To rename a header, or to move a value from one header to another (for example, moving an authentication token to a secondary place, or copying a value that gets replaced upstream) is easy with [context variables]({{< ref "getting-started/key-concepts/context-variables/" >}}). Here is an example where we move the value of `X-Custom-Header` to a new header called `X-New-Custom-Header` in all requests.

We do this by setting the following in our API Definition Version section:
```{.copyWrapper}
"global_headers": {
    "X-New-Custom-Header": "$tyk_context.headers_X_Custom_Header"
},
"global_headers_remove": ["X-Custom-Header"],
```

You can test the header with the following command. This assumes your API Authentication mode is set to open(keyless):

```{.copyWrapper}
curl -X GET \
  https://DOMAIN/LISTEN_PATH/get \
  -H 'content-type: application/json' \
  -H 'x-custom-header: Foo' \
```


You can also do this via the Dashboard from the Endpoint Designer tab within the API Designer:

![rename header]({{< ref "img/dashboard/system-management/rename_headers.png" >}})