---
title: "Field Based Permissions"
date: 2020-06-03
menu:
  main:
    parent: "GraphQL"
weight: 2
aliases:
    - /graphql/field-based-permissions/
---

You may want to allow different consumers access to your GraphQL API without exposing all data to them. So for example this could be a schema for a GraphQL API:
```
type Query {
  accounts: [Account!]
}

type Account {
  owner: String!
  number: ID!
  balance: Float!
}
```

For one type of consumers it will be fine to query all data the schema exposes while for another type of consumer it should not be allowed to retrieve the `balance` for example.

Field access can be restricted by setting up *field based permissions* in a policy or directly on a key.

When a field is restricted and used in a GraphQL operation, the consumer will receive an error response (*400 Bad Request*):
```
{
    "errors": [
        {
            "message": "field: balance is restricted on type: Account"
        }
    ]
}
```


## Setup field based permissions in Dashboard
1. *Optional:* Configure a Policy from **System Management > Policies > Add Policy**.
2. From **System Management > Keys > Add Key** select a policy or configure directly for the key.
3. Select your GraphQL API (marked as *GraphQL*).
4. Enable **Field-Based Permissions** for the selected API.
5. By default all *Types* and *Fields* will be checked. By unchecking a *Type* or *Field* you will disallow to use it for any GraphQL operation associated with the key.

![field-based-permissions](/img/dashboard/system-management/field_based_permissions.png)