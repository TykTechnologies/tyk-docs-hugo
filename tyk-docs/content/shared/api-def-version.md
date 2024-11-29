---
---

Tyk lets you version your API and apply access policies to versions, for example, if you have an API v1 that has a `/widgets` endpoint that is deprecated in v2, you can block that endpoint so that requests to it are stopped before they hit your system.

In the same vein, you can allow the endpoint and ignore paths completely.

## API Version Definition

Version data can be transferred as either a header key or as a query parameter in all HTTP methods.

* `definition`: This section handles information related to where to look for the version key.
* `definition.location`: Can either be: `header`, `url-param` or `url`. Tyk will then look for the version information in the appropriate location.
* `definition.key`: The name of the key to check for versioning information.

### Versioning in the Header

In the following example, Tyk will look in the header for the `x-tyk-version` key, and use it's value to establish which version of the api is being requested.

```{.copyWrapper}
{
  "definition": {
    "location": "header",
    "key": "x-tyk-version"
  }
}
```

example request: `curl "https://company.cloud.tyk.io/my-api/my-path" -H "x-tyk-version: v1"`

### Versioning in the URL Query String Param

In the following example, Tyk will look in the URL Query String Param for the `foo` parameter, and use it's value to establish which version of the api is being requested.

```{.copyWrapper}
{
  "definition": {
    "location": "url-param",
    "key": "foo"
  }
}
```
example request: `curl "https://company.cloud.tyk.io/my-api/my-path?foo=v1"`

### Versioning in the URL Path

Tyk will look in the First part of the URL Path for the version information. For example, `company.cloud.tyk.io/myapi/{version}`. The key field will be ignored in this scenario.

```{.copyWrapper}
{
  "definition": {
    "location": "url"
  }
}
 
* `version_data`: Information relating to your actual version are stored here, if you do not wish to use versioning, use the `not_versioned` option and set up an entry called `Default` (see below).

* `version_data.not_versioned`: If set to `true` Tyk will skip version checking, you can still block or allow information to your API by specifying a `Default` version within the `versions` map.

* `version_data.versions`: This is a keyed JSON object, in the form of:

```{.copyWrapper}
{
  "Default": {
    "name": "Default",
    "expires": "",
    "use_extended_paths": true,
    "extended_paths": {
      "ignored": [],
      "white_list": [],
      "black_list": []
    }
  }
}
```

Each version of your API should be defined here with a unique name. This name is what will be matched by `definition.key`. Once Tyk has identified the API to load, and has allowed the access key through, it will check the access token's session data for access permissions. If it finds none, it will let the token through. However, if there are permissions and versions defined, it will be strict in **only** allowing access to that version. For more information about handling access control, see the [Security - Authentication and Authorization]({{< ref "/api-management/authentication-authorization" >}}) section.

* `version_data.{version-name}.expires`: The expires header, if set, will deprecate access to the API after the time specified. The entry here takes the form of: `"YYYY-MM-DD HH:MM"`. If this is not set the version will never expire.
* `version_data.{version-name}.override_target`: Setting this value will override the target of the API for this version, overriding the target will invalidate (and is not compatible with) Round Robin Load balancing and Service Discovery.
* `version_data.{version-name}.use_extended_paths`: Set this value to `true` to use the new extended-paths feature. This will eventually become the default mode of operation.

Extended paths allow you to control which upstream paths are to be handled in a specific way (ignored, as part of an allow list or block list) by both path and method. The extended metadata set also allows you to provide forced reply data to override or trap inbound requests for specific versions. This is very useful for mocking or slowly exposing a development API to a live upstream back end.
    
Each entry in the ignored, blocklist and allowlist have the same specification. The path specification has the following format:

```json
{
  "path": "SOME_PATH",
  "method_actions": {
    "METHOD": {
      "action": "ACTION_CODE",
      "code": "RESPONSE_CODE",
      "data": "BODY",
      "headers": {
        "KEY": "VALUE"
      }
    }
  }
}
```
    
You can set up the path to handle, and the action type. By default this should be set to `no_action` which means that Tyk will treat the path and method as-is without interference (i.e. if `no_action` is set, then `code`, `data`, `headers` and `body` are *not* used).
    
If you set `action` to `reply` Tyk will override the path and reply with settings defined in the remaining fields. This configuration can be used across all of the different path lists, and can be very useful when used in conjunction with the `white_list` access control list as if it is used exclusively it can be used to mock out an entire API.
    
{{< note success >}}
**Note**  

Any data that is placed in the 'data' section must be a string, not a JSON object (this could be a JSON string, for example).
{{< /note >}}


* `global_headers`: Set global headers to inject using a `key:value` map:

```{.copyWrapper}
"version_data": {
  "versions": {
    "Default": {
      ...
      "global_headers": {
          "x-header-name": "x-header-value"
      }
      ...
    }
  }
},
```

* `global_headers_remove`: Remove headers from all requests:

```{.copyWrapper}
"version_data": {
  "versions": {
    "Default": {
      ...
      "global_headers_remove": [
          "auth_id"
      ]
       ...
    }
  }
},
```

* `global_size_limit`: Set a global request size limit in bytes.

* `version_data.{version-name}.extended_paths.ignored`: This section will define methods and paths that will be ignored and will bypass the quota and rate limiting machinery of Tyk.

An example entry:

```{.copyWrapper}
...
"ignored": [
  {
    "path": "/v1/ignored/literal",
    "method_actions": {
      "GET": {
        "action": "no_action",
        "code": 200,
        "data": "",
        "headers": {}
      }
    }
  },
  {
    "path": "/v1/ignored/with_id/{id}",
    "method_actions": {
      "GET": {
        "action": "reply",
        "code": 200,
        "data": "Hello World",
        "headers": {
          "x-tyk-override": "tyk-override",
        }
      }
    }
  }
],
    ...
```

* `version_data.{version-name}.extended_paths.black_list`: This section defines methods and paths that will be blocked by Tyk.

An example entry:

```{.copyWrapper}
...
"black_list": [
  {
    "path": "v1/disallowed/blocklist/literal",
    "method_actions": {
      "GET": {
        "action": "no_action",
        "code": 200,
        "data": "",
        "headers": {}
      }
    }
  },
  {
    "path": "v1/disallowed/blocklist/{id}",
    "method_actions": {
      "GET": {
        "action": "reply",
        "code": 200,
        "data": "Not allowed buddy",
        "headers": {
          "x-tyk-override-test": "tyk-override"
        }
      }
    }
  }
], 
    ...
```

* `version_data.{version-name}.extended_paths.white_list`: This section defines methods and paths that are exclusively allowed through by Tyk. Use this section to define an entire mock API as well as this will force a specific URL structure (and block all other paths) while replying to all requests, therefore never sending any requests upstream.


An example entry:

```{.copyWrapper}
...
"white_list": [
  {
    "path": "v1/allowed/allowlist/literal",
    "method_actions": {
      "GET": {
        "action": "no_action",
        "code": 200,
        "data": "",
        "headers": {}
      }
    }
  },
  {
    "path": "v1/allowed/allowlist/reply/{id}",
    "method_actions": {
      "GET": {
        "action": "reply",
        "code": 200,
        "data": "flump",
        "headers": {
          "x-tyk-override-test": "tyk-override"
        }
      }
    }
  },
  {
    "path": "v1/allowed/allowlist/{id}",
    "method_actions": {
      "GET": {
        "action": "no_action",
        "code": 200,
        "data": "",
        "headers": {}
      }
    }
  },
  {
    "path": "/tyk/rate-limits/",
    "method_actions": {
      "GET": {
        "action": "no_action",
        "code": 200,
        "data": "",
        "headers": {}
      }
    }
  }
], 
...
```
    
You'll notice we've included the end user rate-limit check URL as an allowed path. If you don't do this, Tyk will block access to this URL.

* `version_data.{version-name}.extended_paths.cache`: If the cache is enabled (see `cache_options`), then these paths will be cached. Caching is applied on all *safe* methods (GET, OPTIONS and HEAD). Caching cannot be controlled on a per-method basis.
    
A sample entry would be:

```{.copyWrapper}
...
"cache": [
  "widgets/{widgetID}",
  "widgets",
  "foobars/{foobarID}",
  "foobars"
], ...
```

* `version_data.{version-name}.extended_paths.transform` and `version_data.{version-name}.extended_paths.transform_response`: This section determines which paths are to have a template applied to them in order to transform the body data in the request or response to another structure. Currently only JSON body data is supported as an input. However, the template can output to any format, as it uses Golang templates so structure of outbound data is highly configurable.

```{.copyWrapper}
...
"transform": [
  {
    "path": "widget/{id}",
    "method": "POST"
    "template_data": {
      "template_mode": "file",
      "template_source": "./templates/transform_test.tmpl"
    }
  }
], 
...
```
    
All the settings that apply to request transforms also apply to response transforms.

* `version_data.{version-name}.extended_paths.transform.path`: This is the path to apply the template to.

* `version_data.{version-name}.extended_paths.transform.method`: This is the method to apply the template to.

* `version_data.{version-name}.extended_paths.transform.template_data.template_mode`: Can be either `file` or `blob`. Setting this to `file` will have Tyk try to load the path and parse the template from a file set in `template_source`. Setting this to `blob` enables the template to be embedded in the definition, e.g. if Tyk is pulling configurations from a database. Embedded templates must be Base64 encoded strings and placed in the `template_source` field.

* `version_data.{version-name}.extended_paths.transform.template_data.template_source`: The file, or base64-encoded blob that will be used as a template to perform the transformation.

* `version_data.{version-name}.extended_paths.transform_headers` and `version_data.{version-name}.extended_paths.transform_response_headers`: Elements specified in this list will have their headers modified according to the rules set out in the path meta settings. These settings are the same for both request and response headers.


Entries look like this:

```{.copyWrapper}
"transform_headers": [
  {
    "delete_headers": ["Content-Type", "authorization"],
    "add_headers": {"x-tyk-test-inject": "new-value"},
    "path": "widgets/{id}",
    "method": "GET"
  }
]
```
        

* `version_data.{version-name}.extended_paths.transform_headers.delete_headers`: Tyk will remove these headers from a request if it is processed.

* `version_data.{version-name}.extended_paths.transform_headers.add_headers`: Tyk will add the headers and values specified in this list. Deletions happen before additions, so modifying headers that already exist is possible by specifying the same key in delete and add.

* `version_data.{version-name}.extended_paths.transform_headers.path`: The path that the header injection will be applied to.

* `version_data.{version-name}.extended_paths.transform_headers.path`: The method for this path that the injection will be applied to.

* `version_data.{version-name}.extended_paths.hard_timeouts`: This section enables you to set hard timeouts on a path-by-path basis. For example, if you have a long-running microservice, but do not want to hold up a dependent client should a query take too long, you can enforce a timeout for that path so the requesting client is not held up forever.

```{.copyWrapper}
...
extended_paths: {
  ...
  hard_timeouts: [
    {
      path: "delay/5",
      method: "GET",
      timeout: 3
    }
  ]
}
...
```
    
The `path` and `method` properties are the same as all the other extended path middleware settings.

* `version_data.{version-name}.extended_paths.hard_timeouts.timeout`: Set this value to the number of seconds that the hard-timeout should respect. Hard timeout can behave strangely, especially with HTTP 1.1 connections where TCP connections stay open, a client will often retry a call if it times out. The way to fix this is to configure the node to use the `close_connections` setting in its configuration file.

* `version_data.{version-name}.extended_paths.circuit_breakers`: This section defines whether a path should act as a circuit breaker against the upstream proxy. Our circuit breaker is threshold-based, so if x% of requests are failing then the circuit is tripped. When the circuit is tripped, then the gateway will stop **all** inbound requests to that service for a pre-defined period of time (a recovery time-period).

The circuit breaker will also emit an event which you can hook into to perform some corrective or logging action.

The `path` and `method` properties are the same as all other `extended_path` middleware actions

```{.copyWrapper}
"circuit_breakers": [
  {
    "path": "get",
    "method": "GET",
    "threshold_percent": 0.5,
    "samples": 5,
    "return_to_service_after": 60
  }
]
```

* `version_data.{version-name}.extended_paths.circuit_breakers.threshold_percent`: The threshold to use for triggering an event, in this case it is between 0 and 1, with 1 being 100% of requests.
* `version_data.{version-name}.extended_paths.circuit_breakers.samples`: The number of samples to apply the threshold to, so `x%` of `y` samples will trip the circuit.
* `version_data.{version-name}.extended_paths.circuit_breakers.return_to_service_after`: The number of seconds to take the path offline. Once this time limit is up, the breaker is reset and the service comes back online.
* `version_data.{version-name}.extended_paths.url_rewrites`: Configuration for the [URL rewrite]({{< ref "/product-stack/tyk-gateway/middleware/url-rewrite-middleware" >}}) middleware.

* `version_data.{version-name}.extended_paths.url_rewrites.match_pattern`: This is the match pattern to use to extract parameters from the URL.

* `version_data.{version-name}.extended_paths.url_rewrites.rewrite_to`: This is the path structure to rewrite to, use `$1`, `$2`, *`$n`* to specify which group to reference in the new URL.

* `version_data.{version-name}.extended_paths.virtual`: This section specifies the paths that should execute a "virtual" path, for example, execute a blob of JavaScript to perform some kind of function in the API. These can be anything from mock responses to aggregates. See [Virtual Endpoints](https://tyk.io/docs/compose-apis/virtual-endpoints/) for more details.
See [Versioning]({{< ref "getting-started/key-concepts/versioning" >}}) for more details on versioning your APIs.
