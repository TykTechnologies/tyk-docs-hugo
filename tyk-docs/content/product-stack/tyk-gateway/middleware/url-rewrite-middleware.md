---
title: URL Rewrite middleware
date: 2024-01-16
description: "Detail of the URL Rewrite middleware"
tags: ["URL rewrite", "middleware", "per-endpoint", "rewrite trigger", "rewrite rule"]
---

Tyk's [URL rewrite]({{< ref "/transform-traffic/url-rewriting" >}}) middleware uses the concepts of [triggers](#url-rewrite-triggers) and [rules](#url-rewrite-rules) to determine if the request (target) URL should be modified. These can be combined in flexible ways to create sophisticated logic to direct requests made to a single endpoint to various upstream services (or other APIs internally exposed within Tyk Gateway through [looping]({{< ref "/advanced-configuration/transform-traffic/looping" >}})).

## URL rewrite rules

The URL rewrite middleware compares a [key](#key) with a [pattern](#pattern) to determine if there is a match; the rules define the location of the key and the structure of the pattern.

#### Key

The key value is the content of a field in some element of the request; as such each key has a location (which element of the request) and a name (the name of the field within that element). For example, to obtain the key value `book` from the request `GET /asset?type=book` the key location would be `query parameter` and the key name would be `type`.

Keys can be located in the following elements of the request:
- request path / path parameter (i.e. components of the path itself)
- request header
- query parameter
- request body (payload)
- session metadata
- request context (for example to match by IP address or JWT scope)

{{< note success >}}
**Note**  

Note that there is no key name when using the request body location, as the entire body (payload) of the request is used as the key value.
{{< /note >}}

When using the request header location, the key name is the normalised form of the header name: with capitalisation and use of `-` as separator. For example, the header name`customer_identifier` would be identified in a rule via the key name `Customer-Identifier`.

When using the request path location, you can use wildcards in the key name (which is the URL path) - for example `/asset/{type}/author/`. The URL rewrite middleware will treat the wildcard as a `(.*)` regex so that any value matches. The wildcard value itself will be ignored, is not extracted from the key, and is not available for use in constructing the [rewrite path](#creating-the-rewrite-path).

#### Pattern

The pattern takes the form of a regular expression (regex) against which the key value will be compared.

This pattern can be a static regex or can contain dynamic variables:
- [context variables]({{< ref "/context-variables" >}}), extracted from the request at the start of the middleware chain, can be injected into the pattern regex using the `$tyk_context.` namespace
- [session metadata]({{< ref "/getting-started/key-concepts/session-meta-data" >}}), from the Tyk Session Object linked to the request, can be injected into the pattern regex using the `$tyk_meta.METADATA_KEY` namespace 

Percent-encoded (URL-encoded) characters can be used in the pattern regex when the key is the request path or path parameter
- if the middleware is called with percent-encoded characters in the key, matching will first be attempted using the raw URL as provided
- if there is no match, the percent-encoded characters will be replaced with their non-encoded form (e.g. `%2D` -> `-`) and checked again
 
{{< note success >}}
**Note** 

Tyk does not check all combinations of encoded and decoded characters in the same string (so `my-test%2Durl` will only be checked as `my-test%2Durl` and `my-test-url`, it will not be checked against `my%2Dtest%2Durl` or `my%2Dtest-url`).
{{< /note >}}

## URL rewrite triggers

There are two types of trigger in the URL rewriter: basic and advanced.

#### Basic trigger

The basic trigger has a single rule for which the key location is always the request path. For the simplest case of URL rewriting, you can simply configure the `pattern` regex and `rewriteTo` target URL for this basic trigger.

#### Advanced triggers

One or more advanced triggers can be configured alongside the basic trigger. These are processed in the order that they are defined in the API Definition. When using the API Designer in Tyk Dashboard, advanced triggers are automatically numbered in the order they are created and will be processed in numberical order.

Advanced triggers can have multiple rules that can be combined using a logical AND or OR operation, such that either `all` the rules must pass or `any` rule must pass for the trigger to fire.

Within advanced triggers, but not the basic trigger, each rule can be negated such that the rule is considered to have passed if the pattern does not match the key value.

Once an advanced trigger has fired, the middleware will apply its `rewriteTo` target and stop processing any more triggers. 

{{< note success >}}
**Note** 

The basic trigger acts as a control switch for any advanced triggers that are defined for the middleware: if the basic trigger is not fired then no rewriting will take place even if an advanced trigger would have fired based on the request.
{{< /note >}}

## Creating the rewrite path

Each trigger (basic or advanced) defines a `rewriteTo` target.
- if just the basic trigger is fired, then the request path (target URL) will be rewritten with the `rewriteTo` value defined in that trigger.
- if both an advanced trigger and the basic trigger are fired, then the request path will be written with the `rewriteTo` value defined for the advanced trigger.
- if the basic trigger does not fire then no rewriting will take place.

#### Dynamic data in the rewrite path

The `rewriteTo` values can be simple URLs or they can be dynamically created using data available to the middleware:
- context variables, which can be referenced using the `$tyk_context.` namespace
- values from the successful [pattern match](#using-data-from-the-key-in-the-rewrite-path)
- values from [key-value (KV) storage](#using-data-from-kv-storage-in-the-rewrite-path)

{{< note success >}}
**Note** 

You can redirect to a new hostname but to do so you must provide the full URL, for example:
```
https://my-new-target-host.com/library/service?value1=books&value2=author
```
{{< /note >}}

#### Using data from the key in the rewrite path

For the basic trigger, each capture group you specify in the pattern regex is designated with an index (`n`), and can then be referenced in the `rewriteTo` target using the format `$n`.
- for example, if the `pattern` to be matched is `"(\w+)/(\w+)"` then the regex will attempt to capture two word groups. The first of these will be given index 1 and the second will be index 2. You can reference these in the `rewriteTo` target using `$1` and `$2` such as: `"my/service?value1=$1&value2=$2"`

With advanced triggers, the key values used in the pattern matches for each rule are stored as context variables which can then be referenced in the `rewriteTo` target as for other context variables.

The format for these advanced trigger context variables is: `$tyk_context.trigger-{n}-{name}-{i}` where `n` is the trigger index, `name` is the key name and `i` is the index of that match (since query strings and headers can be arrays of values).
- for example, if the first trigger fires based on a rule where the key is the query parameter "type", a context variable with the name `trigger-0-type-0` will be created and can be referenced in the `rewriteTo` target

#### Using data from KV storage in the rewrite path

You can retrieve a value from KV storage by including a reference in the [appropriate notation]({{< ref "tyk-configuration-reference/kv-store#transformation-middleware" >}}) for the KV location where the key-value pair is stored.

If you use a value retrieved from [Consul]({{< ref "deployment-and-operations/tyk-self-managed/deployment-lifecycle/deployment-to-production/key-value-storage/consul">}}) or [Vault]({{< ref "deployment-and-operations/tyk-self-managed/deployment-lifecycle/deployment-to-production/key-value-storage/vault">}}), this must be the <b>last</b> part in the `rewriteTo` URL.

For example, say you have a key named `userName` with value `jo` in my Consul KV store:
- if you configure `rewriteTo` as `/my-api/users/$secret_consul.userName` this will redirect calls to `/my-api/users/jo`
- if, however, you configure my `rewriteTo` as `/my-api/users/$secret_consul.userName/contract` this will not redirect to `my-api/jo/contract` but instead the KV lookup will fail, as Tyk will check for a key named `userName/contract` in Consul (returning null), so the URL rewrite middleware will redirect to `/my-api/users`


This limitation does not apply to KV accessed from the other [supported KV stores]({{< ref "tyk-configuration-reference/kv-store#supported-storage-options" >}}) (environment variable or Gateway `secrets`).
