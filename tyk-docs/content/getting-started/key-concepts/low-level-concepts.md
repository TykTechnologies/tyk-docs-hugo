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

Tyk and the OpenAPI Specification (OAS) talk about a number of topics in different ways and without a decoder ring this can be confusing. This page aims to be that ring.

- [Servers]({{< ref "/content/getting-started/key-concepts/servers.md" >}})
- **Authentication** - [copied in the specific low level concepts page]
- **Mock responses** - <more details to be added>
- **Validation** - OAS lets you define validation in a very flexible way. It fundamentally boils down to having a json schema that defines what the body of a request or response should look like. However, the cleve part is that in the schema for a particular validation you can reference another schema defined elsewhere in the API Definition, or even externally via a URL. This lets your write complex validation very efficiently since you don’t need to re-define the validation for a particular object every time you wish to refer to it.

{{< note success >}}
**Note**  

Tyk at this time only supports local references to schema within the same API Definition
{{< /note >}}

- Paths