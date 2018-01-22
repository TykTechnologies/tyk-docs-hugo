---
date: 2017-03-23T17:36:15Z
title: URL Rewriting
menu:
  main:
    parent: "Transform Traffic"
weight: 5 
---

## <a name="overview"></a>Overview

URL rewriting is a very useful feature when translating an outbound API interface to the internal structure of your services.

To rewrite a URL with Tyk, you must specify the components of the URL to capture, and then the order in which to re-assemble the captured components.

Unlike other web servers, Tyk uses a wide match to capture the URL and then a fixed regex to handle the restructuring. So as with other middleware components you must set a path to match on.

## <a name="url-rewrite-with-api"></a> Rewrite a URL with the API Definition

To rewrite a URL with the API Definition, you must add a new object to the `extended_paths` section of an API definition:

```{.copyWrapper}
"url_rewrites": [{
    "path": "match/me",
    "method": "GET",
    "match_pattern": "(w+)/(w+)",
    "rewrite_to": "my/service?value1=$1&value2=$2"
}],
```

*   `path`: The path to match, this can contain wildcards, so to match all sub-resources under `match/`, you could use `match/{id}`. The wildcard `{id}` is transformed into a wide regex (`(.*)`) to ensure that everything possible is captured. This is then discarded. The name of the group is irrelevant, it is only for your reference.

*   `method`: The method to match.

*   `match_pattern`: This is the actual capture group to generate. This is a pure regex, in this case we are capturing two word groups.

*   `rewrite_to`: Each capture group you specify is designated with an index, and then made available in the `rewrite_to` template. Here `$n` will map against each value found in the capture group, so in the above example, the rewrite will be:

```{.copyWrapper}
my/service?value1=match&value2=me
```

This can also include a new hostname, but you *must* specify the transport, e.g.

```{.copyWrapper}
https://my-new-target-host.com/my/service?value1=match&value2=me
```

## <a name="url-rewrite-with-endpoint-designer"></a>Rewrite a URL with the Endpoint Designer

To rewrite a URL using the Dashboard, you can use the same values are defined in the API Definition options, just set them in the Endpoint Designer instead for your path.

### Step 1: Add an Endpoint for the Path

Browse to the endpoint designer in your API and add an endpoint that matches the path you want to rewrite.

![Endpoint designer][1]

### Step 2: Configure the URL Rewrite

Add the regex capture groups and the new URL to the relevant sections.

![URL rewrite configuration][2]

#### Create Advanced Trigger

**New Function**

### Step 3: Save the API

Use the *save* or *create* buttons to save the changes and make the URL rewrite active.

## <a name="url-rewrite-context-variables"></a>Context Variables

### Context Variables

As of version 2.2 Tyk allows context variables to be injected into the regex using the `$tyk_context.` namespace instead of the numeric index.

For more details see [Context Variables][3]

### Meta Data

As of v2.3 it is possible to inject meta data from a Tyk Session Object linked to a token into your URL Rewrite commands. In a similar way to the context variables, the values are in a reserved namespace: `$tyk_meta.FIELDNAME`. This can be especially useful if you wish to incorporate custom query string parameters into a URL structure.

[1]: /docs/img/dashboard/system-management/url_rewrite_endpoint_2.5.png
[2]: /docs/img/dashboard/system-management/config_url_rewrite_2.5.png
[3]: /docs/concepts/context-variables/










