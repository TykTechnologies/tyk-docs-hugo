---
title: "Introspection"
date: 2020-06-03
menu:
  main:
    parent: "GraphQL"
weight: 1
aliases:
    - /graphql/introspection/
---

A GraphQL server can provide information about its schema. This functionality is called *introspection* and is achievable by sending
an *introspection query* to the GraphQL server.

You may have seen *GraphiQL* or *GraphQL Playgrounds* providing a schema documentation and autocompletion. This is possible because those tools
send a introspection query to the GraphQL server and use the response for providing those features.

When **creating a GraphQL proxy** in the Tyk Dashboard an introspection query is used to fetch the schema from the GraphQL upstream and display it in the schema tab.

In cases where upstream is protected and requires authorization to execute introspection query **Introspection headers** can be used to provide all necessary information. More information about Introspection headers can be found [on this page]({{< ref "/graphql/gql-headers">}})

{{< note success >}}
**Note**  

When using a GraphQL proxy the introspection query is always sent to the GraphQL upstream. This means that changes in the Tyk schema won't be reflected
 in the introspection response. You should keep the schemas synchronised to avoid confusion.
{{< /note >}}


Introspection also works for the **[Universal Data Graph]({{< ref "universal-data-graph" >}})**.

## Turning off introspection

The introspection feature should primarily be used as a discovery and diagnostic tool for development purposes.

Problems with introspection in production:

* It may reveal sensitive information about the GraphQL API and its implementation details. 
* An attacker can discover potentially malicious operations.

GraphQL introspection is enabled in Tyk by default. You can disable the introspection per key or security policy. 

You should note that if the *Authentication Mode* is *Open(Keyless)*, GraphQL introspection is enabled.

First, you need to learn [how to create a security policy with the API]({{< ref "getting-started/create-security-policy" >}}) or [how to create an API Key with the API]({{< ref "getting-started/create-security-policy" >}}).

Once you learn how to utilize the API to create a security policy or key, you can use the following snippet: 

```
{
    "access_rights": {
        "{API-ID}": {
            "api_id": "{API-ID}",
            "api_name": "{API-NAME}",
            "disable_introspection": true,
            "allowed_types": [],
            "restricted_types": []
        }
    }
}
```

With this configuration, we set `true` to `disable_introspection` field. When you try to run an introspection query on your API, you will receive an error response *(403 Forbidden)*:  

```
{
    "error": "introspection is disabled"
}
```
