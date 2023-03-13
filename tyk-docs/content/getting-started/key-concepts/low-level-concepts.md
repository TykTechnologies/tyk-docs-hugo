---
title: "OpenAPI Low Level Concepts"
date: 2022-07-06
tags: ["API", "OAS", "OpenAPI Specification"]
description: "The low level concepts around OpenAPI Specification support in Tyk"
menu:
  main:
    parent: "OpenAPI Specification"
weight: 2
---

### Introduction

Tyk and the OpenAPI Specification (OAS) talk about a number of topics in different ways and without a decoder ring this can be confusing.

This page aims to be that ring.

- [Servers]({{< ref "/getting-started/key-concepts/servers.md" >}}) - find out how Tyk integrates neatly between your clients and upstream services, automatically configuring where it will proxy requests
- [Authentication]({{< ref "/getting-started/key-concepts/authentication.md" >}}) - with Tyk's OpenAPI implementation you have to option of delegating authentication to the upstream service, or handling it on the Tyk Gateway 
- [Mock Responses]({{< ref "/getting-started/using-oas-definitions/mock-response.md" >}}) - Tyk can automatically configure mock response middleware using the configuration included in your OAS document; this allows you to test your APIs without connecting to the upstream services
- [Request Validation]({{< ref "/getting-started/key-concepts/request-validation.md" >}})  - Tyk can protect your APIs by automatically validating the request parameters and payload against a schema that defines what it *should* look like
- [Paths]({{< ref "/getting-started/key-concepts/paths.md" >}}) - this is a section within the OAS definition that instructs Tyk which API paths (also referred to as endpoints) should be configured; Tyk uses this information to determine which middleware should be enabled for each
