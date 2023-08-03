---
date: 2017-03-24T15:45:13Z
title: Response Plugins
menu:
  main:
    parent: "Plugin Types"
weight: 20
aliases: 
  - plugins/response-plugins
---

Since Tyk 3.0 we have incorporated response hooks, this type of hook allows you to modify the response object returned by the upstream. The flow is follows:

- Tyk receives the request.
- Tyk runs the full middleware chain, including any other plugins hooks like Pre, Post, Custom Authentication, etc.
- Tyk sends the request to your upstream API.
- The request is received by Tyk and the response hook is triggered.
- Your plugin modifies the response and sends it back to Tyk.
- Tyk takes the modified response and is received by the client.

This snippet illustrates the hook function signature:

```python
@Hook
def ResponseHook(request, response, session, metadata, spec):
    tyk.log("ResponseHook is called", "info")
    # In this hook we have access to the response object, to inspect it, uncomment the following line:
    # print(response)
    tyk.log("ResponseHook: upstream returned {0}".format(response.status_code), "info")
    # Attach a new response header:
    response.headers["injectedkey"] = "injectedvalue"
    return response
```

The API definition should have this:

```
{
    "custom_middleware": {
        "response": [
            {
                "name": "ResponseHook",
                "path": "middleware/middleware.py"
            }
        ],
        "driver": "python"
    }
}
```

Starting from versions 5.0.4 and 5.1.1+ for our Go, Python and Ruby users we have introduced the `multivalue_headers` field to facilitate more flexible and efficient management of headers, particularly for scenarios involving a single header key associated with multiple values.  The `multivalue_headers` field, similar to its predecessor, the `headers` field, is a key-value store. However, it can accommodate an array or list of string values for each key, instead of a single string value. This feature empowers you to represent multiple values for a single header key. Here's an example of how you might use `multivalue_headers`, using the Set-Cookie header which often has multiple values:

```
multivalue_headers = {
    "Set-Cookie": ["sessionToken=abc123; HttpOnly; Secure", "language=en-US; Secure"],
}
```

In this example, Set-Cookie header has two associated values: `"sessionToken=abc123; HttpOnly; Secure"` and `"language=en-US; Secure"`.  To help you understand this further, let's see how `multivalue_headers` can be used in a Tyk response plugin written in Python:

```python
from tyk.decorators import *
from gateway import TykGateway as tyk

@Hook
def Del_ResponseHeader_Middleware(request, response, session, metadata, spec):
    # inject a new header with 2 values
    new_header = response.multivalue_headers.add()
    new_header.key = "Set-Cookie"
    new_header.values.extend("sessionToken=abc123; HttpOnly; Secure")
    new_header.values.extend("language=en-US; Secure")
    
    tyk.log(f"Headers content :\n {response.headers}\n----------", "info")
    tyk.log(f"Multivalue Headers updated :\n {response.multivalue_headers}\n----------", "info")
    
    return response
```

In this script, we add 2 values for the `Set-Cookie` header and then log both: the traditional `headers` and the new `multivalue_headers`. This is a great way to monitor your transition to `multivalue_headers` and ensure that everything is functioning as expected.

Please note, while the `headers` field will continue to be available and maintained for backward compatibility, we highly encourage the adoption of `multivalue_headers` for the added flexibility in handling multiple header values.

### Go response plugins

Go response plugins are available from Tyk 3.2. See [Using a Go Response Plugin]({{< ref "plugins/supported-languages/golang#using-a-go-response-plugin" >}})

### Supported Response Plugin Languages

See [Supported Plugins]({{< ref "plugins/supported-languages#plugin-support" >}}) for details on which languages the response plugin is supported in.
