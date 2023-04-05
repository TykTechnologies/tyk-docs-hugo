---
title: "GraphQL playground"
date: 2020-06-03
menu:
  main:
    parent: "GraphQL"
weight: 6
aliases:
    - /graphql/graphql-playground/
---

When you are creating or editing your GraphQL API, any change you make can be tested using Tyk Dashboard built-in GraphiQL Playground.

{{< img src="/img/dashboard/graphql/gql-playground-new.png" alt="Playground" >}}

At the top of the Playground itself, you can switch between Dark and Light theme using the `Set theme` dropdown.

There's also a built in `Explorer` to help with query building and a `Prettify` button that helps to make the typed out operation easier to read.

The GraphiQL try-out playground comes with a series of features by default, which can be very useful while configuring the API:
  1.  Syntax highlighting.
  2.  Intelligent type ahead of fields, arguments, types, and more.
  3.  Real-time error highlighting and reporting for queries and variables.
  4.  Automatic query and variables completion.
  5.  Automatically adds required fields to queries.
  6.  Documentation explorer, search, with markdown support.
  7.  Query History using local storage
  8.  Run and inspect query results using any promise that resolves JSON results. 9.  HTTPS or WSS not required.
  10. Supports full GraphQL Language Specification: Queries, Mutations, Subscriptions, Fragments, Unions, directives, multiple operations per query, etc

## GraphQL Playgrounds in Tyk

Tyk offers you two types of Playgrounds, depending on who should be authorized to use them.

* **Playground** tab in `API Designer`, that's only accessible via Tyk Dashboard and is always enabled. You need to log into the Tyk Dashboard to be able to use it.
* **Public Playground** that you can enable for any GraphQL API and that is accessible for any consumer interacting with your GQL API. This playground will follow all security rules you set for your GQL API - authentication, authorization, etc.

### Enabling Public GraphQL Playground

{{< tabs_start >}}
{{< tab_start “Tyk Dashboard” >}}

To enable a Public GraphQL Playground for one of your GQL APIs follow these few simple steps:

1. Navigate to `Core Settings` tab in `API designer`
2. Change the setting in `Enable API Playground` section.
3. Provide `Playground path`. By default, this path is set to `/playground` but you can change it.

{{< img src="/img/dashboard/graphql/enable-playground.png" alt="Headers" >}}

Your `Public Playground` will be available at `http://{API-URL}/playground`.

{{< tab_end >}}
{{< tab_start “Tyk API definition” >}}

To enable Public GraphQL Playground using just Tyk API definition, you need to set the following:

```bash
...
"graphql": {
    "playground": {
      "enabled": true,
      "path": "/playground"
    }
  }
...
```

You can choose yourself the `path` name.

Your `Public Playground` will be available at `http://{API-URL}/playground`.

{{< tab_end >}}
{{< tabs_end >}}

### Query variables

You can pass query variables in two different ways, both are fully supported in Tyk Dashboard.

#### Using inline arguments in GraphiQL Playground

A query or mutation string in this case, would be written like in the example below and there would be no other requirements for executing an operation like this:

```graphql
mutation createUser {
  createUser(input: {
      username: "test", 
      email: "test@test.cz", 
      phone: "479332973", 
      firstName: "David", 
      lastName: "Test"
      }) {
    user {
        id
        username
        email
        phone
        firstName
        lastName
    }
  }
}
```

#### Using query variables in GraphiQL Playground

For complex sets of variables, you might want to split the above example into two parts: GQL operation and variables. 

The operation itself would change to:

```graphql
mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    user {
      id
      username
      email
      phone
      firstName
      lastName
    }
  }
}
```

The values for variables would need be provided in the `Query variables` section of the Playground like this:

```graphql
{
  "input": {
    "username": "test",
    "email": "test@test.cz",
    "phone": "479332973",
    "firstName": "David",
    "lastName": "Test"
  }
}
```

### Headers

Debugging a GraphQL API might require additional headers to be passed to the requests while playing with the GraphiQL interface (i.e. `Authorization` header in case of Authentication Token protection over the API). This can be done using the dedicated headers tab in the Graphiql IDE.

{{< img src="/img/dashboard/udg/getting-started/headers.png" alt="Headers" >}}

You can also [forward headers]({{< ref "graphql/gql-headers.md" >}}) from your client request to the upstream data sources.


### Logs

{{< note >}}
**Note**  
GraphQL request logs described below are **only available in Tyk Dashboard**.
{{< /note >}}

Besides the results displayed in the GraphiQL playground, Tyk also provides you with a full list of logs of the triggered request, which can help a lot when debugging the API functionality.

{{< img src="/img/dashboard/udg/getting-started/logs.png" alt="Logs" >}}
  
The Request Logs can be seen under the playground itself. When no logs are present, there will be no option to expand the logs, and the filter buttons (top right) will be disabled:

{{< img src="/img/dashboard/udg/getting-started/logs_bar.png" alt="Logs Bar" >}}

After creating and sending a query, the logs will automatically expand, and the filter buttons will display the number of logs for its respective level (category).

{{< img src="/img/dashboard/udg/getting-started/logs_table.png" alt="Logs table" >}}

#### Contents of the logs

There are four levels (categories) of logs: `Info`, `Debug`, `Warning`, and `Error`, and each log belongs to one of these levels. 

The first column of the table displays the colour-coded `“level”` property of the log. A log should never be absent of a level. The second column displays the log `“msg”` (message) property, if any. The third column displays the `“mw” `(middleware) property, if any.

#### Expansion/collapse of Request Logs

The Request Logs can be expanded or collapsed, using the chevron on the left side to toggle these states.

#### Filter buttons and states

Filter buttons have two states: active and inactive; the default of which is active. A solid background colour of the button indicates that a filter is active. 

In the below picture, the `info` and `error` filters buttons are both active. If there are no logs for a particular level of log, the button will appear as a grey and disabled, as shown by the `Warning` filter button.

{{< img src="/img/dashboard/udg/getting-started/logs_navigation.png" alt="Logs navigation" >}}

Here's an example where there is at least one log, but all the filter buttons are in the inactive state. If the cursor (not shown) hovers over an inactive filter button, the button background will change to solid, and the tooltip will display `“Show”`. 

If all filter buttons are inactive, a message asking whether the user would like to reset all filters will display. Clicking this text will activate all available filters.

{{< img src="/img/dashboard/udg/getting-started/logs_empty.png" alt="Logs empty" >}}
