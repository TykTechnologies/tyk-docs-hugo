---
title: "Complexity Limiting"
date: 2020-06-03
menu:
  main:
    parent: "GraphQL"
weight: 3
aliases:
    - /graphql/complexity-limiting/
---

Depending on the GraphQL schema an operation can cause heavy loads on the upstream by using deeply nested or expensive operations. Tyk offers solutions for this cases which can be applied
in a policy or directly on a key.

Here is an example for a deeply nested query:
```
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

The schema for the example could look like this:
```
type Query {
  continents: [Continent!]!
}

type Continent {
  name: String!
  countries: [Country!]!
}

type Country {
  name: String!
  continent: Continent!
}
```

## Query depth limit
Deeply nested queries can be limited by setting a query depth limitation. The depth of a query is defined by the highest amount of nested selection sets in a query.

Example for a query depth of `2`:
```
{
  continents {
    name
  }
}
```

Example for a query depth of `3`:
```
{
  continents {
    countries {
      name
    }
  }
}
```

When a GraphQL operation exceeds the query depth limit the consumer will receive an error response (*403 Forbidden*):
```
{
    "error": "depth limit exceeded"
}
```

### Enable from the Dashboard

Query depth limitation can be applied on three different levels:

* **Key/Policy global limits and quota section. (`Global Limits and Quota`)** The query depth value will be applied on all APIs attached on a Key/Policy.
  1. *Optional:* Configure a Policy from **System Management > Policies > Add Policy**.
  2. From **System Management > Keys > Add Key** select a policy or configure directly for the key.
  3. Select your GraphQL API (marked as *GraphQL*). <em>(if Policy is not applied on Key)</em>
  4. Change the value for **Query depth**, from `Global Limits and Quota` by unchecking the *Unlimited query depth* checkmark and insert the maximum allowed query depth.

![query-depth-limit]({{< ref "img/dashboard/system-management/global_limits_query_depth.png" >}})

* **API limits and quota. (`Set per API Limits and Quota`)** This value will overwrite any value registered for query depth limitation on global Key/Policy level, and will be applied on all fields for Query and Mutation types defined within the API schema.
  1. *Optional:* Configure a Policy from **System Management > Policies > Add Policy**.
  2. From **System Management > Keys > Add Key** select a policy or configure directly for the key.
  3. Select your GraphQL API (marked as *GraphQL*). <em>(if Policy is not applied on Key)</em>
  4. Enable `Set per API Limits and Quota` section.
  5. Change the value for **Query depth**, from API level, by unchecking the *Unlimited query depth* checkmark and insert the maximum allowed query depth

![query-depth-limit]({{< ref "img/dashboard/system-management/api_limits_query_depth.png" >}})

* **API per query depth limit. (`Set per query depth limits`)** By setting a query depth limit value on a specific Query/Mutation type field, will take highest priority and all values set on first 2 steps will be overwritten.
  1. *Optional:* Configure a Policy from **System Management > Policies > Add Policy**.
  2. From **System Management > Keys > Add Key** select a policy or configure directly for the key.
  3. Select your GraphQL API (marked as *GraphQL*). <em>(if Policy is not applied on Key)</em>
  4. Enable `Set per query depth limits` section.
  5. Add as many queries you want to apply depth limitation on.

![query-depth-limit]({{< ref "img/dashboard/system-management/query_limits_query_depth.png" >}})
