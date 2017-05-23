---
date: 2017-03-23T17:36:15Z
title: URL Rewriting
menu:
  main:
    parent: "Transform Traffic"
weight: 5 
---

## <a name="url-rewrite-overview"></a>URL rewrite overview

URL rewriting is a very useful feature when translating an outbound API interface to the internal structure of your services.

To rewrite a URL with Tyk, you must specify the components of the URL to capture, and then the order in which to re-assemble the captured components.

Unlike other web servers, Tyk uses a wide match to capture the URL and then a fixed regex to handle the restructuring, so as with other middleware components you must set a path to match on.

## <a name="url-rewrite-with-api"></a> Rewrite a URL with the API Definition

To rewrite a URL with the API Definition, you must add a new object to the `extended_paths` section of an API definition:

```
    "url_rewrites": [{
        "path": "match/me",
        "method": "GET",
        "match_pattern": "(w+)/(w+)",
        "rewrite_to": "my/service?value1=$1&value2=$2"
    }],
```

*   `path`: The path to match, this can contain wildcards, so to match all sub-resources under `match/`, you could use `match/{id}`. The wildcard `{id}` is transformed into a wide regex (`(.*)`) to ensure that everything possible is captured. This is then discarded. The name of the group is irrelevant, it is only for your reference.

*   `method`: The method to match.

*   `match_pattern`: This is the actual capture group to generate, this is a pure regex, in this case we are capturing two word groups.

*   `rewrite_to`: Each capture group you specify is designated with an index, and then made available in the `rewrite_to` template, here `$n` will map against each value found in the capture group, so in the above example, the rewrite will be:

```
    my/service?value1=match&value2=me
```

This can also include a new hostname, but you *must* specify the transport, e.g.

```
    https://my-new-target-host.com/my/service?value1=match&value2=me
```

## <a name="url-rewrite-with-endpoint-designer"></a>Rewrite a URL with the Endpoint Designer

To rewrite a URL using the Dashboard, you can use the same values are defined in the API Definition options, just set them in the endpoint designer instead for your path.

### Step 1: Add an endpoint for the path

Browse to the endpoint designer in your API and add an endpoint that matches the path you want to rewrite.

![Endpoint designer][1]

### Step 2: Configure the URL rewrite

Add the regex capture groups and the new URL to the relevant sections.

![URL rewrite configuration][2]

### Step 3: Save the API

Press the *save* or *create* buttons to save the changes and make the URL rewrite active.

## URL Rewriteter: Context Variables

### <a name="url-rewrite-context-variables"></a>Context Data

As of version 2.2 Tyk allows context variables to be injected into the regex using the `$tyk_context.` namespace instead of the numeric index.

The context variables that are available are:

*   `request_data`: If the inbound request contained any query data or form data, it will be available in this object, for the URL Rewrite, Tyk will format this data as `key:value1,value2,valueN;key:value1,value2` etc.
*   `path_parts`: The components of the path, split on `/`, these values are made available in the format of a comma delimited list.
*   `token`: The inbound raw token (if bearer tokens are being used) of this user.
*   `path`: The path that is being requested.
*   `remote_addr`: The IP address of the connecting client.
*   `$jwt_claims_CLAIMNAME` - If JWT tokens are being used (not OIDC Middleware), then each claim in the JWT is available in this format to the context processor.

> **Note:** You must have context variables enabled in your API Definition for this to work.

### Meta Data

As of v2.3 it is possible to inject meta data from a Tyk Session Object linked to a token into your URL Rewrite commands. In a similar way to the context variables, the values are in a reserved namespace: `$tyk_meta.FIELDNAME`. This can be especially useful if you wish to incorporate custom query string parameters into a URL structure.

[1]: /docs/img/dashboard/system-management/rewriteEndpointDesigner.png
[2]: /docs/img/dashboard/system-management/configureRewrite.png










