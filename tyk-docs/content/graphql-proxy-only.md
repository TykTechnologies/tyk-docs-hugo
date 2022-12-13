---
title: Graphql Proxy Only
tags: ["GraphQL", "Playground", "CORS", "Tyk"]
date: 2021-11-19T13:01:30Z
menu:
    main:
        parent: "Key Concepts"
weight: 100
aliases:
- /concepts/graphql-proxy-only/
- /getting-started/key-concepts/graphql-proxy-only/
---

{{< toc >}}

### What is GraphQL Proxy Only

GraphQL Proxy Only is just a GraphQL API with a single datasource and read-only schema.
Schema will be loaded automatically from GraphQL upstream supporting introspection queries.
GraphQL API, like other APIs, support policies but with more advanced settings.
If you want a more detailed explanation about GraphQL in Tyk, checkout [this section](https://tyk.io/docs/graphql/)

### Creating a GraphQL API via the Dashboard UI

1. Log in to the Dashboard and go to APIs > Add New API > GraphQL.

{{< img src="/img/dashboard/graphql/create_graphql.png" alt="Creating GraphQL Proxy Only API" >}}

2. Choose a name for your API and provide an upstream URL

{{< note success >}}

**Note**

In case your upstream URL is protected, select **Upstream Protected** and provide authorisation details (either Header or Certificate information).

{{< /note >}}

3. In this case, the upstream is protected with Basic Authentication, so we add Authorization header.

{{< note success >}}

**Note**

**Persist headers for future use** checkbox is selected. That way, you will not need to provide the auth headers anymore as they will be persisted in the API definition.

{{< /note >}}

{{< img src="/img/dashboard/graphql/gql_upstream_header.png" alt="Adding Auth Header for GraphQL Proxy Only API" >}}


4. Once done, click **Configure API** and the Dashboard API designer will show up.

5. Configure your API and click **save**, Your API will now be saved.

### Managing GQL Schema

There can be a need to update/sync the schema on your GraphQL API, say when the schema on the upstream is updated.
The Dashboard UI can show the last time your API schema was synced with the upstream schema.

{{< img src="/img/dashboard/graphql/schema_sync.png" alt="schema last updated screenshot" >}}

If you click the **Get latest version**, the gateway will make an introspection query to your upstream to fetch the schema.
You need to click **Update** on the top right button, to update your API.

{{< note success >}}

**Note**

If you upstream is protected, you will need to provide Authorization Header. in the Dashboard go to your API > Advanced Options > Upstream Auth headers
and fill in your credentials

{{< /note >}}

### Policies, Keys and Developer Portal

#### Field based permission

You may want to allow different consumers access to your GraphQL API without exposing all data to them. So for example this could be a schema for a GraphQL API:
```graphql
type Query {
  accounts: [Account!]
}

type Account {
  owner: String!
  number: ID!
  balance: Float!
}
```

and you don't want some associate with a certain key to access `balance` field on type `Account`, the gateway will respond with:
```json
{
    "errors": [
        {
            "message": "field: balance is restricted on type: Account"
        }
    ]
}
```

Checkout [this link](https://tyk.io/docs/graphql/field-based-permissions/#setup-field-based-permissions-in-dashboard), to find more on how you can configure field based permission.

#### Complexity Limiting

The complexity of a GraphQL query is about its depth. checkout this query:
```graphql
{
  continents {
    countries {
      continent {
        countries {
          continent {
            countries {
              name
            }
          }
        }
      }
    }
  }
}
```

The above query has a depth of seven, since the nested queries are seven.

Tyk offer solution to limit the depth of a query.
Checkout [this link](https://tyk.io/docs/graphql/complexity-limiting/#enable-from-the-dashboard) on how to set query depth.

#### Developer Portal

As of Tyk v3.0.0, you can now publish GraphQL APIs to the Tyk Developer Portal.
[This section](https://tyk.io/docs/tyk-developer-portal/graphql/) will show how you can expose a GraphQL API to the developer portal.
