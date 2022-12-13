---
date: 2017-03-24T15:45:13Z
title: Response Plugins
menu:
  main:
    parent: "Custom Plugins"
weight: 20
---

Since Tyk 3.0 we have incorporated response hooks, this type of hook allows you to modify the response object returned by the upstream. The flow is follows:

- Tyk receives the request.
- Tyk runs the full middleware chain, including any other plugins hooks like Pre, Post, Custom Authentication, etc.
- Tyk sends the request to your upstream API.
- The request is received by Tyk and the response hook is triggered.
- Your plugin modifies the response and sends it back to Tyk.
- Tyk takes the modified response and is received by the client.

This snippet illustrates the hook function signature:

```
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

### Go response plugins

Go response plugins are available from Tyk 3.2. See [Using a Go Response Plugin]({{< ref "plugins/supported-languages/golang/#using-a-go-response-plugin" >}})

### Supported Response Plugin Languages

See [Supported Plugins]({{< ref "plugins/supported-languages/#plugin-support" >}}) for details on which languages the response plugin is supported in.
