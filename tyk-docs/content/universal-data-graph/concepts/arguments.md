---
title: "Concepts - Arguments"
date: 2020-06-03
menu:
  main:
    parent: "UDG Concepts"
weight: 0
url: /universal-data-graph/concepts/arguments/
aliases:
    - /universal-data-graph/data-sources/graphql
---

Looking back at the example from the "Field Mappings", you might wonder how to use the "id" argument from the GraphQL query to make the correct REST API call to the user service.

Here's the schema again:

```graphql
type Query {
    user(id: Int!): User
}

type User {
    id: Int!
    name: String
}
```

We assume you already have your DataSource attached and now want to configure it so that the path argument gets propagated accordingly.
You need to tell the GraphQL engine that when it comes to resolving the field "user", take the argument with the name "id" and use it in the URL to make the request to the REST API.
You do this by using templating syntax to inject it into the URL.
This is done from the "Configure data source" tab, which will show after clicking a schema argument or object field.
Typing an opening curly brace ( { ) will produce a dropdown that contains all available fields and arguments.

```html
https://example.com/user/{{ .arguments.id }}
``` 

![Create New API]({{< ref "img/dashboard/udg/concepts/parameter_dropdown.png" >}})
