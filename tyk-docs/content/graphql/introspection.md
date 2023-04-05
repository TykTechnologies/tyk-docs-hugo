---
title: "Introspection"
date: 2020-06-03
menu:
  main:
    parent: "GraphQL"
weight: 2
aliases:
    - /graphql/introspection/
---

A GraphQL server can provide information about its schema. This functionality is called **introspection** and is achievable by sending an **introspection query** to the GraphQL server.

When [creating a GraphQL proxy]({{< ref "/graphql/creating-gql-api">}}) in Tyk Dashboard an introspection query is used to fetch the schema from the GraphQL upstream and display it in the schema tab.

{{< note success >}}
**Note**  

When using a GraphQL proxy the introspection query is always sent to the GraphQL upstream. This means that changes in the Tyk schema won't be reflected in the introspection response. You should keep the schemas synchronised to avoid confusion.
{{< /note >}}

## Introspection for protected upstreams

When you are creating a GQL API using Tyk Dashboard and your target GQL API is protected, you need to provide authorization details, so that Tyk Gateway can obtain your schema.

In the *Create new API* screen you have to tick the **Upstream Protected** option under your Upstream URL.

 {{< img src="/img/dashboard/graphql/introspection-auth.png" alt="Upstream protected" >}}

 - From the **Upstream protected by** section choose the right option for your case: Headers or Certificate.
 - Choosing **Headers** will allow you to add multiple key/value pairs in *Introsopection headers* section. 
 - You can also **Persist headers for future use** by ticking that option. This will save information you provided in case in the future your schema changes and you need to sync it again. To understand better where this information will be saved, go to [GQL Headers]({{< ref "/graphql/gql-headers">}}). To read more about schema syncing go [here]({{< ref "/graphql/syncing-schema">}}).
- Choosing **Certificate** will allow you to provide *Domain* details and either *Select certificate* or *Enter certificate ID*.

## Turning off introspection

The introspection feature should primarily be used as a discovery and diagnostic tool for development purposes.

Problems with introspection in production:

* It may reveal sensitive information about the GraphQL API and its implementation details. 
* An attacker can discover potentially malicious operations.

You should note that if the *Authentication Mode* is *Open(Keyless)*, GraphQL introspection is enabled and it cannot be turned off.

GraphQL introspection is enabled in Tyk by default. You can disable the introspection per key or security policy using:
* Tyk Dashboard
* Tyk Dashboard and Gateway API

{{< tabs_start >}}
{{< tab_start "Tyk Dashboard" >}}

First, check the general information on [how to create a security policy with Tyk]({{< ref "getting-started/create-security-policy" >}})

For GraphQL APIs the *API ACCESS* section will show additional, GQL-specific options that can be enabled. 

{{< img src="/img/dashboard/graphql/disable-introspection.png" alt="Disable introspection" >}}

You can diable introspection by changing the switch position.

Because introspection control in Tyk works on Policy and Key level, it means you can control each of your consumer's access to introspection. You can have keys that allow introspection, while also having keys that disallow it.

{{< tab_end >}}
{{< tab_start "Tyk APIs" >}}

First, you need to learn [how to create a security policy with Tyk API]({{< ref "getting-started/create-security-policy" >}}) or [how to create an API Key with Tyk API]({{< ref "/basic-config-and-security/security/key-level-security" >}}).

Once you learn how to utilize the API to create a security policy or a key, you can use the following snippet: 

```bash
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

```bash
{
    "error": "introspection is disabled"
}
```

{{< tab_end >}}
{{< tabs_end >}}



Introspection also works for the **[Universal Data Graph]({{< ref "universal-data-graph" >}})**.