---
title: "1. Creating schema"
date: 2020-09-14
menu:
  main:
    parent: "UDG Getting Started"
weight: 0
url: /universal-data-graph/udg-getting-started/creating-schema/
aliases:
    - /universal-data-graph/udg-getting-started/creating-schema/
---

{{< youtube daNXHS5azbk >}} 

1. Create Api

To start with a Universal Data Graph from scratch head over to the dashboard and click on “APIs” in the left menu. Then click the “Add New API” and fill the form according to the following screenshot. You might want to give your Graph an individual name.


2. Set Authentication

To get started easily we'll set the API to Keyless. To do this, scroll down to the Authentication section. But keep in mind that you should not use Keyless for most production environments.

3. Create Schema

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

4. Save

Click on save button and that should create our first UDG API

<hr/>

Now if we try to query our UDG API it should error at this moment as we do not have any data-source attached to it, let's see how we can do that in next section.

