---
date: 2017-03-23T17:29:19Z
title: Response Headers
menu:
  main:
    parent: "Transform Traffic"
weight: 2 
---

Tyk enables you to modify header information when a response is proxied back to the client. This can be very useful in cases where you have an upstream API that potentially exposes sensitive headers that you need to remove.

The response transform middleware works in the same way as the request transform middleware except that the settings are applied to the response section of the API Definition or Endpoint Designer, please see the request header injection documentation for details on what can be achieved.

### Editing the API Definition

Using Tyk, you would set up your API Definition with these additions to the extended_paths.transform_response_headers field:

```
    "extended_paths": {
        "ignored": [],
        "white_list": [],
        "black_list": [],
        "cache": ["get"],
        "transform": [],
        "transform_response_headers": [
                {
                    "delete_headers": ["x-server-secret"],
                    "add_headers": {"x-server-id": "this-is-important"},
                    "path": "widgets{rest}",
                    "method": "GET"
                }
            ]
    }
```

### Required for response middleware

Response middleware must be *registered*, so one last step is required when editing the API Definition, and that is to add the response middleware to the processor like so:

```
    "response_processors":[{"name": "header_injector"}]
```

The dashboard will do this for you if you are editing the API using the endpoint designer.
