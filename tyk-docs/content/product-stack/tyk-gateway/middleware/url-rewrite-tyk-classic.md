---
title: Using the URL Rewrite middleware with Tyk Classic APIs
date: 2024-01-17
description: "Using the URL Rewrite middleware with Tyk Classic APIs"
tags: ["URL rewrite", "middleware", "per-endpoint", "Tyk Classic"]
---

Tyk's [URL rewriter]({{< ref "/transform-traffic/url-rewriting" >}}) uses the concepts of triggers and rules to determine if the request (target) URL should be modified. These can be combined in flexible ways to create sophisticated logic to direct requests made to a single endpoint to various upstream services (or other APIs internally exposed within Tyk).

URL rewrite triggers and rules are explained in detail [here]({{< ref "/product-stack/tyk-gateway/middleware/url-rewrite-middleware" >}}).

When working with Tyk Classic APIs the rules and triggers are configured in the Tyk Classic API Definition; this can be done manually within the `.json` file or from the API Designer in the Tyk Dashboard.

If you want to use dynamic data from context variables, you must [enable]({{< ref "context-variables#enabling-context-variables-for-use-with-tyk-classic-apis" >}}) context variables for the API to be able to access them from the request header transform middleware.

If you're using the newer Tyk OAS APIs, then check out [this]({{< ref "/product-stack/tyk-gateway/middleware/url-rewrite-tyk-oas" >}}) page.

If you're using Tyk Operator then check out the [configuring the URL rewriter in Tyk Operator](#tyk-operator) section below.

## Configuring the URL rewriter in the Tyk Classic API Definition {#tyk-classic}

To configure the URL rewriter you must add a new `url_rewrites` object to the `extended_paths` section of your API definition, for example:

```json
{
    "url_rewrites": [
        {
            "path": "books/author",
            "method": "GET",
            "match_pattern": "(\w+)/(\w+)",
            "rewrite_to": "library/service?value1=$1&value2=$2"
        }
    ]
}
```

In this example the basic trigger has been configured to match the path for a request to the `GET /books/author` endpoint against the pure regex `(\w+)/(\w+)`. This is looking for two word groups in the path which, if found, will store the first string (`books`) in context variable `$1` and the second (`author`) in `$2`. The request (target) URL will then be rewritten to `library/service?value1=books&value2=author` ready for processing by the next middleware in the chain.

You can add advanced triggers to your URL rewriter configuration by adding the `triggers` element within the `url_rewrites` object.

The `triggers` element is an array, with one entry per advanced trigger. For each of those triggers you configure:
- `on` to set the logical condition to be applied to the rules (`any` or `all`)
- `options` a list of rules for the trigger
- `rewrite_to` the address to which the (target) URL should be rewritten if the trigger fires

The rules are defined using this format:
```yaml
{
    key_location: {
        key_name: {
            "match_rx": pattern
            "reverse": true/false (set to true to trigger if pattern does not match)
        }
    }
}

Key locations are encoded as follows:
- `header_matches` - request header parameter
- `query_val_matches` - query parameter
- `path_part_matches` - path parameter (i.e. components of the path itself)
- `session_meta_matches` - session metadata
- `payload_matches`- request body
- `request_context_matches`- request context

For example:

```json
{
    "url_rewrites": [
        {
            "path": "books/author",
            "method": "GET",
            "match_pattern": "(\w+)/(\w+)",
            "rewrite_to": "library/service?value1=$1&value2=$2",
            "triggers": [
                {
                    "on": "any",
                    "options": {
                        "query_val_matches": {
                            "genre": {
                                "match_rx": "fiction",
                                "reverse": false
                            }
                        }
                    },
                    "rewrite_to": "library/service/author?genre=$tyk_context.trigger-0-genre-0"
                },
                {
                    "on": "all",
                    "options": {
                        "header_matches": {
                            "X-Enable-Beta": {
                                "match_rx": "true",
                                "reverse": false
                            }
                        },
                        "session_meta_matches": {
                            "beta_enabled": {
                                "match_rx": "true",
                                "reverse": false
                            }
                        }
                    },
                    "rewrite_to": "https://beta.library.com/books/author"
                }
            ]
        }
    ]
}
```

In this example, the basic trigger is configured as before, but two advanced triggers have been added.

The first advanced trigger has this configuration:
- key location is query parameter
- key name is genre
- pattern is fiction

So if a `GET` request is made to `/books/author?genre=fiction` the advanced trigger will fire and the URL will be rewritten to `library/service/author?genre=fiction`.

The second advanced trigger has this configuration:
- rule condition: ALL
- rule 1
    - key location is header parameter
    - key name is `X-Enable-Beta`
    - pattern is `true``
- rule 2
    - key location is session metadata
    - key name is `beta_enabled`
    - pattern is `true`

So if a request is made to `GET /books/author` with a header `"X-Enable-Beta":"true"` and, within the session metadata, `"beta_enabled":"true"` the second advanced trigger will fire and the URL will be written to `https://beta.library.com/books/author` taking the request to a different upstream host entirely.

## Configuring the URL rewriter in the API Designer

You can use the API Designer in the Tyk Designer to configure the URL rewrite middleware for your Tyk Classic API by following these steps.

#### Step 1: Add an endpoint for the path and select the URL rewrite plugin

From the **Endpoint Designer** add an endpoint that matches the path you want to rewrite. Select the **URL Rewrite** plugin.

{{< img src="/img/2.10/url_rewrite.png" alt="Endpoint designer" >}}

#### Step 2: Configure the basic trigger

Add the regex capture groups and the new URL to the relevant sections.

{{< img src="/img/2.10/url_rewrite_settings.png" alt="URL rewrite configuration" >}}

#### Step 3: Configure an advanced trigger

You can optionally configure advanced triggers by using the **Create Advanced Trigger** option from the **URL Rewriter** plugin.

You will see a screen like this:

{{< img src="/img/2.10/url_re-write_advanced.png" alt="URL rewrite add trigger" >}}

When triggers are added, you can edit or remove them inside the **Advanced URL rewrite** section:

{{< img src="/img/2.10/url_rewrite-advanced-edit.png" alt="URL rewrite list trigger" >}}

#### Step 4: Save the API

Use the *save* or *create* buttons to save the changes and activate the middleware.

## Configuring the URL rewriter in Tyk Operator {#tyk-operator}

The process for configuring the URL rewriter in Tyk Operator is similar to that explained in [configuring the URL rewriter in the Tyk Classic API Definition](#tyk-classic). To configure the URL rewriter you must add a new `url_rewrites` object to the `extended_paths` section of your API definition.

The example API Definition provides the corresponding custom resource configuration for the [Tyk Classic API Definition example](#tyk-classic), configuring an API to listen on path `/url-rewrite` and forward requests upstream to http://httpbin.org. The URL rewrites middleware would match the path for a request to the `GET /anything/books/author` endpoint against the pure regex `/anything/(\w+)/(\w+)`. The request (target) URL will then be rewritten to `/anything/library/service?value1=$1&value2=$2`.

```yaml {linenos=true, linenostart=1, hl_lines=["26-31"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: url-rewrite
spec:
  name: URL Rewrite
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /url-rewrite
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          url_rewrites:
            - path: /anything/books/author
              match_pattern: /anything/(\w+)/(\w+)
              method: GET
              rewrite_to: /anything/library/service?value1=$1&value2=$2
              triggers: []
```

URL Rewrite Triggers can be specified in a similar way. The Tyk Operator example below is the equivalent for the advanced triggers example included in the [configuring the URL rewriter in the Tyk Classic API Definition](#tyk-classic) section above.

```yaml {linenos=true, linenostart=1, hl_lines=["26-49"]}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: url-rewrite-advanced
spec:
  name: URL Rewrite Advanced
  use_keyless: true
  protocol: http
  active: true
  proxy:
    target_url: http://httpbin.org
    listen_path: /url-rewrite
    strip_listen_path: true
  version_data:
    default_version: Default
    not_versioned: true
    versions:
      Default:
        name: Default
        use_extended_paths: true
        paths:
          black_list: []
          ignored: []
          white_list: []
        extended_paths:
          url_rewrites:
            - path: /anything/books/author
              match_pattern: /anything/(\w+)/(\w+)
              method: GET
              rewrite_to: /anything/library/service?value1=$1&value2=$2
              triggers: 
                - "on": "any"
                  "rewrite_to": "library/service/author?genre=$tyk_context.trigger-0-genre-0"
                  "options":
                    "query_val_matches": 
                      "genre": 
                          "match_rx": "fiction"
                          "reverse": false
                - "on": "all"
                  "options": 
                    "header_matches": 
                        "X-Enable-Beta": 
                            "match_rx": "true"
                            "reverse": false
                    "session_meta_matches": 
                        "beta_enabled": 
                            "match_rx": "true"
                            "reverse": false
                  "rewrite_to": "https://beta.library.com/books/author"
```

For further examples check out the [internal looping]({{< ref "/api-management/automations#internal-looping-with-tyk-operator" >}}) page.
