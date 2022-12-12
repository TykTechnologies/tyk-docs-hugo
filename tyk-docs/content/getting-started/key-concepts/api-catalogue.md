---
date: 2017-03-23T13:02:38Z
title: Portal API Catalogue
menu:
  main:
    parent: "Key Concepts"
weight: 90
aliases:
  - /docs/concepts/api-catalogue/
---

The API Catalogue is part of the API Developer Portal of the Dashboard. It is the central place for you to manage which APIs your registered developers have access to.

The API catalogue is completely separate from the regular API list section of the dashboard, as you may only wish to expose some of those APIs managed by Tyk to end users.

API Catalogue entries are not actual directly tied to APIs in any way, they are connected to policies.

The reason for this is that policies can give access to a bundle of underlying APIs and therefore can represent a facade of services exposed as a single interface.

The concept of the API Catalogue is that you publish what you wish your external APIs to appear as. So, for example, if you have a widgets API that is composed of 4 microservices (i.e. `/comments`, `/pricing`, `/details`, and `/SKU`), which are managed as four separate APIs in your Dashboard, but combined under a single Security Policy (so one token can access all four APIs), then you may not wish to have your users know these are microservices, they are just endpoints in your widgets API.

This approach allows you to separate "management" from "consumption" using a simple CMS-based bundling approach.
