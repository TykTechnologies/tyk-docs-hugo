---
date: 2017-03-22T11:31:15Z
title: With Tyk Cloud
menu: 
  main:
    parent: "Get started"
weight: 1
url: "/get-started/with-tyk-cloud"
---

### What is Tyk Cloud?
The Tyk Cloud API Management Platform is a simple, scalable way for developers, startups and large companies to get started with the Tyk platform, offering an easy, hosted way to add an API management layer to your services.

#### How it works
Tyk Cloud acts as a reverse proxy (or "Gateway") to your upstream services. These services need to be accessible by Tyk, and so need to be exposed to the internet.

You set up Tyk to send traffic from your dedicated service endpoint (`your_organisation.cloud.tyk.io/{api-slug}`) to your underlying service URL. You can then modify the request any way you please, for example, by injecting a Tyk-specific access header so only Tyk Cloud can access your service.

You can then start issuing tokens, either manually or via the developer portal, that give developers access to your Tyk proxy, which then meters, manages and secures your upstream service.

#### Getting Started
To get started with Tyk Cloud, follow our [tutorial][1] to create an account.

[1]: /docs/get-started/with-tyk-cloud/create-an-account/
