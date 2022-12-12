---
title: "GraphQL"
date: 2020-06-03
weight: 200
menu:
    main:
        parent: Tyk Gateway
url: "/graphql"
---

Tyk supports GraphQL **natively**. This means Tyk doesn't have to use any external service or process for any GraphQL middleware. 

You can securely expose existing GraphQL APIs using our GraphQL core functionality.

In addition to this, you can also use Tyk's integrated GraphQL engine to build a [Universal Data Graph]({{< ref "/content/universal-data-graph.md" >}}). The Universal Data Graph (UDG) lets you expose existing services as one single combined GraphQL API.

See our video on getting started with GraphQL.

{{< youtube 6yAqgnzzH10 >}}

## What is GraphQL?

> GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

source: [https://graphql.org/](https://graphql.org/)

## Why would you want to use GraphQL?

When you have many services with different protocols, response types and specifications GraphQL can help expose all of them using a single unified API.

REST APIs "can" have a schema, e.g. Swagger/Open Api Specification. A GraphQL server "must" have a schema.
This schema makes it very easy to communicate across stakeholders how they can use the API.

You can easily find lots of false arguments on the internet in favour of either REST or GraphQL APIs.
The reality is that you can usually achieve the same goals with a well-designed REST API as you can with a GraphQL API.
The difference is that users often report that for some use cases, the developer experience of GraphQL is simply better.

One of those cases is when you have one API with many consumers that have very different requirements.
It's easier to satisfy all use cases with a dynamic API.
The dynamic character of GraphQL gives consumers the possibility to modify a query; whereas with a REST API, they would have asked the API provider to add a resource or modify an existing one.

GraphQL in this case decouples specific use cases from a concrete implementation.
With a REST API, the API provider creates resources for specific use cases.
With GraphQL on the other hand, the API consumer can combine functionality to satisfy use cases that the API provider did not initially cover.

Another good use case is a public API with a large group of unknown users.
Popular examples of this are Shopify and GitHub.
As an API provider, it would be very hard to keep up with all the consumers and satisfy all of their use cases.
GraphQL in this case gives the flexibility to the API consumers to use the API in the way that fits their needs.

There are other use cases where GraphQL isn't really a good fit.

File uploads and downloads for example are not well supported using GraphQL.

Serving static data that is usually cached for a long time also wouldn't benefit from the dynamic character of GraphQL.
In addition to this, GraphQL actually makes it harder to implement caching. It's not impossible to cache GraphQL responses, there are just more challenges.
For example, how to construct a good cache key when GraphQL queries can have arbitrary whitespace in the query document?
GraphQL queries are usually POST requests so your cache would have to parse the body, which caches usually don't to.
These problems are solvable, it's just not as simple as with a REST API.

Other use cases might involve low latency machine-to-machine communication within a data center.
GraphQL's benefits of avoiding over- or under-fetching might not really help in this case.
To add to that, it should be well known that REST APIs can easily use query parameters to avoid over- or under-fetching too.

Then again there's a lot of powerful tooling to use GraphQL in front end development.
GraphiQL and the GraphQL Playground makes it very easy to explore a GraphQL API.
There are very strong integrations, e.g. for the React Framework, which is often reported to help developers being more productive.

All in all, as with every technology, you should always evaluate your specific **use case** and decide based on this if you really benefit from adding a new tool to the stack.

At Tyk, we believe that GraphQL can be a very powerful too for many use cases. That's why we decided to support it **natively** with our API management platform. 
