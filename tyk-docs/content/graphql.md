---
title: "GraphQL"
date: 2020-06-03
weight: 200
menu:
    main:
        parent: Tyk Gateway
---

Tyk supports GraphQL **natively**. This means Tyk doesn't have to use any external service or process for any GraphQL middleware.

Tyk always supports all capabilities described in the latest release of GraphQL specification listed by GraphQL Foundation on their [webpage]({{<> ref https://spec.graphql.org/ >}})

This means support for the following operations:
- queries
- mutations
- subscriptions

## What can you do with GraphQL and Tyk?

You can securely expose existing GraphQL APIs using our [GraphQL core functionality]({{< ref "/content/graphql/creating-gql-api.md" >}}).

In addition to this, you can also use Tyk's integrated GraphQL engine to build a [Universal Data Graph]({{< ref "/content/universal-data-graph.md" >}}). The Universal Data Graph (UDG) lets you expose existing services as one single combined GraphQL API.

See our video on getting started with GraphQL.

{{< youtube 6yAqgnzzH10 >}}

## What is GraphQL?

> GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

source: [https://graphql.org/](https://graphql.org/)

## Why would you want to use GraphQL?

Since this is the documentation section, we won't get into a debate about GraphQL vs REST. The main benefits of using GraphQL are:
* **Reduced network traffic**: One of the biggest benefits of GraphQL is that it allows clients to specify exactly what data they need. This means that you can avoid sending unnecessary data over the network, which can help reduce the amount of traffic and improve the performance of your application.
* **Flexibility**: GraphQL is very flexible and can be used with many different programming languages and frameworks. It can also be used to retrieve data from multiple sources, such as databases, APIs, and even third-party services.
* **Simplified data fetching**: With GraphQL, you can fetch all the data you need with a single request. This is because GraphQL allows you to specify exactly what data you need and how it should be structured, which can simplify the process of fetching data and reduce the amount of code you need to write.
* **Easy maintenance**: Because GraphQL allows you to define a schema for your data, it can be easier to maintain and evolve your API over time. This is because changes to the schema can be made without breaking existing clients, as long as the changes are backwards compatible.
* **Strong typing**: GraphQL has a strong type system that allows you to define the shape of your data and ensure that the data you receive is of the correct type. This can help catch errors early on and make your code more reliable.
* **Better developer experience for certain use cases**: Examples of those use cases mostly mentioned by developers are: APIs with multiple consumers that have very different requirements, public APIs with large group of unknown users (like Shopify of Github), rapidly evolving APIs, backends for mobile applications, aggregating data from multiple microservices and development of data-driven products.

Our team has also published some blog posts that go deeper into this discussions. You can check some of them here:
* [How Airbnb, Shopify, GitHub and more are winning with GraphQL]({{<ref https://tyk.io/blog/how-airbnb-shopify-github-and-more-are-winning-with-graphql-and-why-you-may-need-it-too/>}})
* [Who's Tyk's GraphQL functionality for]({{< ref https://tyk.io/blog/using-tyks-new-graphql-functionality-whos-it-for-and-what-does-it-do/>}})
* [GraphQL: Performance is no longer a trade-off]({{< ref https://tyk.io/blog/graphql-performance-is-no-longer-a-trade-off/>}})