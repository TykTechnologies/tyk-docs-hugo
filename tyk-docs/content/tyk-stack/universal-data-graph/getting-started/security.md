---
title: "4. Security"
date: 2020-09-14
menu:
  main:
    parent: "UDG Getting Started"
weight: 0
url: /universal-data-graph/udg-getting-started/security/
aliases:
    - /universal-data-graph/udg-getting-started/security/
---

{{< youtube lRLLFLv2rN4 >}} 

Due to the nature of graphql, clients can craft complex or large queries which can cause your upstream APIs to go down or have performance issues.

Some of the common strategies to mitigate these risks include 

- Rate limiting
- Throttling
- Query depth limiting


For this tutorial we'll mitigate these risks using `Query Depth Limit` but you can also use common strategies like rate limiting and throttling, which you can read more about [here](../../../getting-started/key-concepts/rate-limiting/)


### 1. Set authentication mode

In you Api designer core settings tab scroll down to Authentication section and set the authentication mode `Authentication Token` and update the API.

Our API is not open and keyless anymore and would need appropriate Authentication token to execute queries.


### 2. Applying to query depth

Currently if users want they could run queries with unlimited depth as follows 

```gql
query getUser {
  user(id: "1") {
    reviews {
      user {
        reviews {
          user {
            reviews {
              user {
                reviews {
                  user {
                    id
                  }
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

To avoid these kind of scenarios we will set query depth limit on the keys created to access this API.

Although we can directly create keys by selecting this API but we'll use policy as it will make it easier to update keys for this API in future. You can read more about policies [here](../../../getting-started/key-concepts/what-is-a-security-policy/)

  ##### Create Policy
    - Navigate to policies page
    - Click Add Policy
    - Select our API from Access Rights table
    - Expand `Global Limits and Quota` section
    - Unselect `Unlimited Query Depth` and set limit to `5`
    - Switch to configuration tab
    - Set policy name (eg. user-reviews-policy)
    - Set expiration date for the keys that would be created using this policy
    - Click on create policy

  ##### Create a key using above policy
    - Navigate to keys page
    - Click Add Key
    - Select our newly created policy
    - Click create key
    - Copy the key ID

Now if you try to query our UDG API using the  key you should see an error as follows

```json
{
  "error": "depth limit exceeded"
}
```

{{< note success >}}
**Note**

Watch the video above to see how you can use these policies to publish your UDG APIs on your portal with documentation and playground.

{{< /note >}}
