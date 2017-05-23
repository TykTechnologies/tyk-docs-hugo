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

### Example scenario

You have an API called WidgetsAPI, that takes an x-widgets-secret header to allow access, this is an internal API used by your teams but you want to expose it to your customers and charge them for access.

You could either modify the API and add a whole user, key and access management system, or you could use Tyk to inject this header for you.

### Update the API Definition Object

Using Tyk, you would set up your API Definition with these additions to the `extended_paths.transform_headers` field:

```
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

### Injecting and removing headers globally

In some cases you may wish to add a secure header to all outbound requests (e.g. to verify that traffic is coming from the gateway), to do so, add this to your version block in your API Definition:

```
    "version_data": {
        "versions": {
          "Default": {
            ...
            "global_headers": {
                "x-header-name": "x-header-value"
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

### Adding global injections via the GUI

You can also achieve this with the GUI, in your Endpoint Designer, by selecting the **Global Version Settings** drawer:

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

```
    "transform_headers": [
        {
            "delete_headers": [],
            "add_headers": {"user-id": "$tyk_meta.uid", "user-name": "$tyk_meta.username"},
            "path": "widgets/{id}",
            "method": "GET"
        },
    ]
```

### Meta data in the dashboard

The variable names (`$tyk_meta`) are also available in the Dashboard fields and will work the same way.

## <a name="context-variables"></a> Injecting Context Data into Headers

As of version 2.2 Tyk allows context variables to be injected into headers using the `$tyk_context.` namespace.

To enable context variables, you must first enable them in your API Definition.

The context variables that are available are:

*   `request_data`: If the inbound request contained any query data or form data, it will be available in this object, for the header injector, Tyk will format this data as `key:value1,value2,valueN;key:value1,value2` etc.
*   `path_parts`: The components of the path, split on `/`, these values are made available in the format of a comma delimited list.
*   `token`: The inbound raw token (if bearer tokens are being used) of this user.
*   `path`: The path that is being requested.
*   `remote_addr`: The IP address of the connecting client.
*   `$jwt_claims_CLAIMNAME` - If JWT tokens are being used (not OIDC Middleware), then each claim in the JWT is available in this format to the context processor.

[1]: /docs/img/dashboard/system-management/headersEndpointDesigner.png
[2]: /docs/img/dashboard/system-management/headersRequestTab.png
[3]: /docs/img/dashboard/system-management/setHeaders.png
[4]: /docs/img/dashboard/system-management/globalHeaders.png


