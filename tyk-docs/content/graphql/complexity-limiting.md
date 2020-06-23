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

1. *Optional:* Configure a Policy from **System Management > Policies > Add Policy**.
2. From **System Management > Keys > Add Key** select a policy or configure directly for the key.
3. Select your GraphQL API (marked as *GraphQL*).
4. Change the value for **Query depth** by unchecking the *Unlimited query depth* checkmark and insert the maximum allowed query depth. This can be done on global or per API level.

![query-depth-limit](/docs/img/dashboard/system-management/query_depth_limit.png)
