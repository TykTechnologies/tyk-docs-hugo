---
date: 2023-03-20T14:36:28Z
title: DAST
tags: ["Security"]
description: "How to secure your Tyk APIs" 
menu:
  main:
    parent: "Security"
weight: 4
---

One of the best way to stop wondering about security for your API is to be able to scan it each time you deploy it into
staging or production environments. As you run your unit tests in your CI/CD pipeline, you can bullet-proof your API
before it even reaches a production environment.

#### Security testing tools for REST

If you use REST APIs, you can use the following tools to test your APIs.
To allow a robot to scan your app, you will need to retrieve the [openapi schema]({{< ref "getting-started/key-concepts/openapi-specification" >}}) of your API.

##### openapi.security

[openapi.security](https://openapi.security/) allow you to scan your OpenAPI specification for security issues.

#### Security testing tools for GraphQL

As GraphQL is a query language, it allows users to use a wider pannel of inputs than traditional REST APIs.

Due to this feature, GraphQL APIs are inherently prone to various security risks, but they can be reduced by taking appropriate precautions.
Neglecting them can expose the API to vulnerabilities like credential leakage or denial of service attacks.

If you are using a graphql API, you may want to use one of the following tools to test your API.

##### graphql.security

[graphql.security](https://graphql.security/) is a free, quick graphql security testing tool, allowing you to quickly assess the most common vulnerabilities in your application.

##### Escape

[Escape](https://escape.tech/) is a GraphQL security SaaS platform running an automated pentest tool.

You can effortlessly incorporate this platform into your current CI/CD pipeline such as Github Actions or Gitlab CIs which makes it convenient to set up.

The security notifications will be automatically communicated to your CI/CD platform, enabling you to promptly attend to them.
