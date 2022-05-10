---
title: "5. Field Based Permissions"
date: 2020-09-14
menu:
  main:
    parent: "UDG Getting Started"
weight: 0
url: /universal-data-graph/udg-getting-started/field-based-permission/
aliases:
    - /universal-data-graph/udg-getting-started/field-based-permission/
---

{{< youtube EBza1BFegrk >}} 

It is also possible to restrict user's based on fields using policies. For example you can create two policies 

1. For read-only access for users to only execute queries.

2. For read and write access to run mutations and queries both. 

### Creating keys with read-only access

  - ##### Create Policy
    - Navigate to policies page
    - Click Add Policy
    - Select our API from Access Rights table
    - Expand Api panel under global section
    - Toggle Field-Based Permissions and check Mutation
    - Switch to configuration tab
    - Set policy name (eg. user-reviews-policy-read-only)
    - Set expiration date for the keys that would be created using this policy
    - Click on create policy

Now keys created using these policies cannot be used for mutations.