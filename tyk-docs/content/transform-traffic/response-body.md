---
date: 2017-03-23T17:30:44Z
title: Response Body
menu:
  main:
    parent: "Transform Traffic"
weight: 4 
---

## Response Body Transformation

Setting up response transforms in your API definition is very similar to setting up request transforms, we simply use the `transform_response` section of the API Definition instead:

```
    "extended_paths": {
        "ignored": [],
        "white_list": [],
        "black_list": [],
        "cache": ["get"],
        "transform": [],
        "transform_response": [
            {
                "path": "widgets/{id}",
                "method": "POST",
                "template_data": {
                    "template_mode": "file",
                    "template_source": "./templates/transform_test.tmpl"
                }
            }
        ],
        "transform_headers": []
    }
```

Tyk will load and evaluate the template on start, if you modify the template, you will need to restart Tyk in order for the changes to take effect.

The field representations are:

*   `path`: The path to match.
*   `method` : The method to match.
*   `template_data.input_type`: either `xml` or `json`, this represents the type of data for the parser to expect.
*   `template_source`: Either a file path, or a `base64` encoded representation of your template.
*   `template_mode`: Set to `blob` for a base64 template and `file` for a file path in the template source.

### Fixing response headers that leak upstream server data

A middleware called `header_transform`, added in v2.1, ensures headers such as `Location` and `Link` reflect the outward facade of your API Gateway and also align with the expected response location to be terminated at the gateway, not the hidden upstream proxy:

```
    "response_processors": [
        {
            "name": "header_transform",
            "options": {
                "rev_proxy_header_cleanup": {
                    "headers": ["Link", "Location"],
                    "target_host": "http://TykHost:TykPort"
                }
            }
        }
    ]
```

In this configuration, you set the `headers` to target and the `target host` to replace the values with. In the above example, the `Link` and `Location` headers will be modified from the server-generated response, with the protocol, domain and port of the value set in `target_host`.

(This is not supported in the dashboard UI yet.)

### A note on response modifying middleware

In order for responses to be processed by Tyk as they return via the proxy, the response middleware must be loaded for the API definition. Unlike inbound middleware, these processors are loaded only as required and must therefore be registered in advance. To do so is very simple, just add them to your API definition as follows:

```
    "response_processors": [
        {
          "name": "response_body_transform",
          "options": {}
        }
    ] 
```

For the header injector response middleware, it is possible to set *global* response injection headers, this means that they do not need to be set on a version-level. Any headers set up in the `options` section of the response headers object will be applied to all replies.


