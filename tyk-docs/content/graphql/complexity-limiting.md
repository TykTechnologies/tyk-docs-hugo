---
title: "Complexity Limiting"
date: 2020-06-03
menu:
  main:
    parent: "GraphQL"
weight: 8
---

Depending on the GraphQL schema an operation can cause heavy loads on the upstream by using deeply nested or resource-expensive operations. Tyk offers a solution to this issue by allowing you to control query depth and define its max value in a policy or directly on a key.

### Deeply nested query

Even if you have a simple GraphQL schema, that looks like this:

```graphql
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

There is a potential risk, that a consumer will try to send a deeply nested query, that will put a lot of load on your upstream service. An example of such query could be:

```graphql
query {
  continents {
    countries {
      continent {
        countries {
          continent {
            countries {
              contient {
                countries {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
}
```

## Query depth limit
Deeply nested queries can be limited by setting a query depth limitation. The depth of a query is defined by the highest amount of nested selection sets in a query.

Example for a query depth of `2`:
```json
{
  continents {
    name
  }
}
```

Example for a query depth of `3`:
```json
{
  continents {
    countries {
      name
    }
  }
}
```

When a GraphQL operation exceeds the query depth limit the consumer will receive an error response (*403 Forbidden*):
```json
{
    "error": "depth limit exceeded"
}
```

### Enable depth limits from the Dashboard

Query depth limitation can be applied on three different levels:

* **Key/Policy global limits and quota section. (`Global Limits and Quota`)** The query depth value will be applied on all APIs attached on a Key/Policy.
  1. *Optional:* Configure a Policy from **System Management > Policies > Add Policy**.
  2. From **System Management > Keys > Add Key** select a policy or configure directly for the key.
  3. Select your GraphQL API (marked as *GraphQL*). <em>(if Policy is not applied on Key)</em>
  4. Change the value for **Query depth**, from `Global Limits and Quota` by unchecking the *Unlimited query depth* checkmark and insert the maximum allowed query depth.

{{< img src="img/dashboard/system-management/global_limits_query_depth.png" alt="query-depth-limit" >}}

* **API limits and quota. (`Set per API Limits and Quota`)** This value will overwrite any value registered for query depth limitation on global Key/Policy level, and will be applied on all fields for Query and Mutation types defined within the API schema.
  1. *Optional:* Configure a Policy from **System Management > Policies > Add Policy**.
  2. From **System Management > Keys > Add Key** select a policy or configure directly for the key.
  3. Select your GraphQL API (marked as *GraphQL*). <em>(if Policy is not applied on Key)</em>
  4. Enable `Set per API Limits and Quota` section.
  5. Change the value for **Query depth**, from API level, by unchecking the *Unlimited query depth* checkmark and insert the maximum allowed query depth

{{< img src="img/dashboard/system-management/api_limits_query_depth.png" alt="query-depth-limit" >}}

* **API per query depth limit. (`Set per query depth limits`)** By setting a query depth limit value on a specific Query/Mutation type field, will take highest priority and all values set on first 2 steps will be overwritten.
  1. *Optional:* Configure a Policy from **System Management > Policies > Add Policy**.
  2. From **System Management > Keys > Add Key** select a policy or configure directly for the key.
  3. Select your GraphQL API (marked as *GraphQL*). <em>(if Policy is not applied on Key)</em>
  4. Enable `Set per query depth limits` section.
  5. Add as many queries you want to apply depth limitation on.

{{< img src="img/dashboard/system-management/query_limits_query_depth.png" alt="query-depth-limit" >}}


### Enable depth limits using Tyk APIs

You can set the same query depth limits using the Tyk Gateway API (for open-source users) or Tyk Dashboard API. To make it easier we have [Postman collections](https://www.postman.com/tyk-technologies/workspace/tyk-public-workspace/overview) you can use.

**Global query depth limit for Key/Policy**

In the key/policy json you need to make sure this section has your desired `max_query_depth` set:

```yaml
{...
   "rate": 1000,
    "per": 60,
    "max_query_depth": 5
...}
```

**Per API depth limits**

In the key/policy json you need to make sure that this section is set correctly:

```yaml
{
  ...
  "access_rights_array": [
    {
      "api_name": "trevorblades",
      "api_id": "68496692ef5a4cb35a2eac907ec1c1d5",
      "versions": [
        "Default"
      ],
      "allowed_urls": [],
      "restricted_types": [],
      "allowed_types": [],
      "disable_introspection": false,
      "limit": {
        "rate": 1000,
        "per": 60,
        "throttle_interval": -1,
        "throttle_retry_limit": -1,
        "max_query_depth": 3,
        "quota_max": -1,
        "quota_renews": 0,
        "quota_remaining": 0,
        "quota_renewal_rate": -1,
        "set_by_policy": false
      },
      "field_access_rights": [],
      "allowance_scope": ""
    }
  ]
  ...
}
```

**API per query depth limits**

If you have more than one query in your schema and you want to set different depth limits for each of those, Tyk also allows you to do that. In this case you need to make sure, that `field_access_rights` per API are set correctly:

```yaml
{
  ...
  "access_rights_array":[
    {
        "api_name":"trevorblades",
        "api_id":"68496692ef5a4cb35a2eac907ec1c1d5",
        "versions":[
          "Default"
        ],
        "allowed_urls":[],
        "restricted_types":[],
        "allowed_types":[],
        "disable_introspection":false,
        "limit":null,
        "field_access_rights":[
          {
              "type_name":"Query",
              "field_name":"continents",
              "limits":{
                "max_query_depth":3
              }
          },
          {
              "type_name":"Query",
              "field_name":"countries",
              "limits":{
                "max_query_depth":5
              }
          }
        ],
        "allowance_scope":""
    }
  ]
  ...
}
```

{{< note >}}
**Note**  
Setting the depth limit to `-1` in any of the above examples will allow *Unlimited* query depth for your consumers.
{{< /note >}}
