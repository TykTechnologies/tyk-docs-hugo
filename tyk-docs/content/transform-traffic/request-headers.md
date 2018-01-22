---
date: 2017-03-23T17:46:28Z
title: Request Headers
menu:
  main:
    parent: "Transform Traffic"
weight: 1 
---

## <a name="with-api"></a> Transform Request Headers with the API Definition

Tyk enables you to modify header information before it leaves the proxy and is passed to your upstream API or when a response is proxied back to the client. This can be very useful in cases where you have an upstream API that has a single authentication key, and you want to add multi-user access to it without modifying it or adding clunky authentication methods to it to support new users.

### Example Scenario

You have an API called WidgetsAPI, that takes an x-widgets-secret header to allow access, this is an internal API used by your teams but you want to expose it to your customers and charge them for access.

You could either modify the API and add a whole user, key and access management system, or you could use Tyk to inject this header for you.

### Update the API Definition Object

Using Tyk, you would set up your API Definition with these additions to the `extended_paths.transform_headers` field:

```{.copyWrapper}
"extended_paths": {
    "ignored": [],
    "white_list": [],
    "black_list": [],
    "cache": ["get"],
    "transform": [],
    "transform_headers": [
        {
            "delete_headers": ["authorization"],
            "add_headers": {"x-widgets-secret": "the-secret-widget-key-is-secret"},
            "path": "widgets{rest}",
            "method": "GET"
        }
    ]
}
```

Now Tyk keys that you create with an Access Definition rule that is set to this API and version, can have quotas, throttling and access checks applied without needing to add any new code or functionality to your existing API.

## <a name="with-dashboard"></a> Transform Request Headers with the Dashboard

To inject new headers into a request using the GUI, you must make the edits in the Endpoint Designer section of your API Definition.

### Step 1: Add an Endpoint and select the Modify Headers option

You must also set a method and a request pattern to match against. These patterns can contain wildcards in the form of any string bracketed by curly braces. These wildcards are so they are human readable and do not translate to variable names. Under the hood, a wildcard translates to the "match everything" regex of: `(.*)`.

![Endpoint designer][1]

#### Step 2: Select the "Request" tab

This ensures that this will only be applied to inbound requests.

![Request tab][2]

#### Step 3: Setup header transforms

Select set the headers to delete and insert using the provided fields.

> **Important**: Remember to press the "+" button to ensure they are added to the list.

![Header transforms][3]

#### Step 4: Save the API

Once the API is saved, if a request path and method matches your pattern, then the relevant modifications will be made to the request that hits your endpoint.

 

## <a name="global-edits"></a> Modifying Request Headers Globally

### Injecting and Removing Headers Globally

In some cases you may wish to add a secure header to all outbound requests (e.g. to verify that traffic is coming from the gateway), to do so, add this to your version block in your API Definition:

```{.copyWrapper}
"version_data": {
    "versions": {
        "Default": {
        ...
        "global_headers": {
            "X-Static": "foo",
            "X-Request-ID":"$tyk_context.request_id",
            "X-Path": "$tyk_context.path",
            "X-Remote-Addr": "$tyk_context.remote_addr"
        },
        "global_headers_remove": [
            "auth_id"
        ]
        ...
        }
    }
},
```

Using the `global_headers_remove` field it is possible to remove headers from all inbound requests before they are passed to your service.

### Adding Global Injections via the Dashboard

You can also achieve this with the Dashboard, via your API Endpoint Designer, by selecting the **Global Version Settings** drawer:

![GLobal version settings drawer][4]

## <a name="meta-data"></a> Injecting Custom Dynamic Data into Headers

It is possible to inject information that is carried within the user session object into the header space as well. Each token or key has an attached session object which contains a `meta_data` field, this is a key/value map that allows for dynamic middleware and other components to intelligently act on identity information from the inbound request without exposing it.

To use this data in your header transform simply access the special `$tyk_meta` namespace, here is a working example.

Say in your session object you have included the following metadata:

```
"meta_data": {
    "uid": 12345,
    "username": "norman_bates"
}
```

To use this in your header transform, your API definition path would be:

```{.copyWrapper}
"transform_headers": [
    {
        "delete_headers": [],
        "add_headers": {"user-id": "$tyk_meta.uid", "user-name": "$tyk_meta.username"},
        "path": "widgets/{id}",
        "method": "GET"
    },
]
```

### Meta Data in the Dashboard

The variable names (`$tyk_meta`) are also available in the Dashboard fields and will work the same way.

## <a name="context-variables"></a> Injecting Context Variables into Headers

As of version 2.2 Tyk allows context variables to be injected into headers using the `$tyk_context.` namespace.

To enable context variables, you must first enable them in your API Definition.

The context variables that are available are:

*   `request_data`: If the inbound request contained any query data or form data, it will be available in this object, for the header injector, Tyk will format this data as `key:value1,value2,valueN;key:value1,value2` etc.
*   `path_parts`: The components of the path, split on `/`, these values are made available in the format of a comma delimited list.
*   `token`: The inbound raw token (if bearer tokens are being used) of this user.
*   `path`: The path that is being requested.
*   `remote_addr`: The IP address of the connecting client.
*   `jwt_claims_CLAIMNAME` - If JWT tokens are being used, then each claim in the JWT is available in this format to the context processor.
*   `request_id` Allows the injection of request correlation ID (for example X-Request-ID)

> **Note**: `request_id` is available from v1.3.6

As headers are already exposed to context data, you can also access any header from context variables by using:

```{.copyWrapper}
$tyk_context.headers_HEADERNAME
```

Or (for body transforms):

```{.copyWrapper}
{{._tyk_context.headers_HEADERNAME}}
```

For more information, see [Context Variables][5].

### Example `global_headers` section
```{.copyWrapper}
"version_data": {
    "not_versioned": true,
    "versions": {
        "v1": {
            "name": "v1",
            "expires": "2100-01-02 15:04",
            "use_extended_paths": true,
            "paths": {
                "ignored": [],
                "white_list": [],
                "black_list": []
            },
            "global_headers":{
                "X-Static": "foo",
                "X-Request-ID":"$tyk_context.request_id",
                "X-Path": "$tyk_context.path",
                "X-Remote-Addr": "$tyk_context.remote_addr"
            }
        }
    }
}
```



[1]: /docs/img/dashboard/system-management/headers_endpoint_2.5.png
[2]: /docs/img/dashboard/system-management/header_request_tab_2.5.png
[3]: /docs/img/dashboard/system-management/set_headers_2.5.png
[4]: /docs/img/dashboard/system-management/global_headers_2.5.png
[5]: /docs/concepts/context-variables/


