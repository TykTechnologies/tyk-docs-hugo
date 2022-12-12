---
title: "1. Creating schema"
date: 2020-09-14
menu:
  main:
    parent: "UDG Getting Started"
weight: 0
aliases:
    - /universal-data-graph/udg-getting-started/creating-schema/
---

{{< youtube ocdY0IKwX_I >}} 

1. Create API

To start with a Universal Data Graph from scratch head over to the dashboard and click on “APIs” in the left menu. Then click the `“Add New API”` and `UDG`. You might want to give your Universal Data Graph an individual name (i.e. `User-Reviews-Demo`)


2. Set Authentication

To get started easily we'll set the API to `Keyless(Open)`. To do this, scroll down to the Authentication section.

{{< note success >}}
**Note**

The API authentication is set to Keyless for demo purposes, it’s not recommended to use this setting in production, we’ll explore how to secure the UDG later in this guide.
{{< /note >}}

3. Configure Schema

Switch to schema tab in your designer and you should already see a default schema. We will edit the schema as follows to connect with our datasources later.

```gql
type Mutation {
  default: String
}

type Query {
  user(id: String): User
}

type Review {
  id: String
  text: String
  userId: String
  user: User
}

type User {
  id: String
  username: String
  reviews: [Review]
}

```

You can also import an existing schema using the import feature, file types supported :  `gql` , `graphql` and `graphqls`.

4. Save

Click on save button and that should create our first UDG API

<hr/>

Now if we try to query our UDG API it should error at this moment as we do not have any data-source attached to it, let's see how we can do that in next section.

