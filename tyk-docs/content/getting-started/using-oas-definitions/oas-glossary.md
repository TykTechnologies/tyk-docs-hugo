---
title: "OAS Glossary"
date: 2022-07-13
tags: ["Tyk Tutorials", "Getting Started", "First API", "Tyk Cloud", "Tyk Self-Managed", "Tyk Open Source", "OAS Glossary"]
description: "OAS glossary of terms"
menu:
  main:
    parent: "Using OAS API Definitions"
weight: 7
---

### Tyk classic API definition

An API definition written in Tyk’s proprietary API Specification format.

### Tyk OAS API definition

An API definition written in OAS and including the Tyk vendor fields to cover details of how the API should be configured when running on Tyk.

### OAS API Definition

An API definition written following the [OAS specification](https://swagger.io/specification/#:~:text=The%20OpenAPI%20Specification%20(OAS)%20defines,or%20through%20network%20traffic%20inspection.) which does not include any Tyk specific configuration, i.e. it does not have an `x-tyk-api-gateway` section. Typically you would ‘import’ this into Tyk to turn it into a Tyk OAS API definition. You could also add the appropriate fields manually in your editor of choice. There is an option to export a Tyk OAS API Definition from Tyk as an OAS API Definition. This provides all the information a developer needs to use the API, without the Tyk configuration fields they don’t need to know about.