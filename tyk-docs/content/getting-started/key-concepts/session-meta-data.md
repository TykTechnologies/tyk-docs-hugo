---
date: 2017-03-23T12:58:24Z
title: Session Metadata
menu:
  main:
    parent: "Key Concepts"
weight: 85 
---

As described in [What is a Session Object?](/getting-started/key-concepts/what-is-a-session-object/), all Tyk tokens can contain a metadata field. This field is a string key/value map that can store any kind of information about the underlying identity of a session.

The metadata field is important, because it can be used in various ways:

* To inform an admin of the provenance of a token
* Values can be injected into headers for upstream services to consume (e.g. a user ID or an email address provided at the time of creation)
* Values can be used in dynamic JavaScript middleware and Virtual Endpoints for further validation or request modification

Metadata is also injected by other Tyk Components when keys are created using "generative" methods, such as JSON Web Token and OIDC session creation and via the Developer Portal, to include information about the underlying identity of the token when it comes from a third-party such as an OAuth IDP (e.g. OIDC).

### Plugins that can use meta data:
Metadata is exposed in three plugin middleware but are accessed differently depending on the caller as follows:

1.   [URL Rewriter](/advanced-configuration/transform-traffic/url-rewriting/#meta-data) - Syntax is `$tyk_meta.METADATA_KEY`
2.   [Modify Headers](/advanced-configuration/transform-traffic/request-headers/#a-name-meta-data-a-injecting-custom-dynamic-data-into-headers) - Syntax is `$tyk_meta.METADATA_KEY`
3.   [Body Transforms](/advanced-configuration/transform-traffic/request-body/#a-name-meta-data-a-meta-data) - Syntax is `{{ ._tyk_meta.METADATA_KEY }}`

You can also access and update metadata in custom middleware.  For an example of this, take a look at this [gRPC enabled GO Server](https://github.com/TykTechnologies/tyk-grpc-go-basicauth-jwt).  It's a PoC middleware that injects a JWT value into metadata and then accesses it later in the stream.

### Enable Meta Data
Metadata is automatically enabled except with body transformation plugin. 
To enable metadata for body transformations, set `"enable_session` to true in the API definition:

```{.copyWrapper}
{
  ...
  "template_data": {
    "input_type": "json",
    "template_mode": "blob",
    "enable_session": true,
    "template_source": "e3sgLl90eWtfbWV0YS5qd3QgfX0=",
    "input": "",
    "output": ""
  }
},
```

`template_data` exists under both "transform" and "transform_response".  This is for the request body transform and the response body transform, respectively.

A more complete API definition where metadata is activated in both request and response body transformations looks like this:

```{.copyWrapper}
{
  ...
  "extended_paths": {
    "transform": [
      {
        "template_data": {
          "input_type": "json",
          "template_mode": "blob",
          "enable_session": true,
          "template_source": "Ymxvb3A=",
          "input": "",
          "output": ""
        },
        "path": "/get",
        "method": "GET",
        "fromDashboard": true
      }
    ],
    "transform_response": [
      {
        "template_data": {
          "input_type": "json",
          "template_mode": "blob",
          "enable_session": true,
          "template_source": "e3sgLl90eWtfbWV0YS5qd3QgfX0=",
          "input": "",
          "output": ""
        },
        "path": "/get",
        "method": "GET",
        "fromDashboard": true
      }
    ]
  }
}
```