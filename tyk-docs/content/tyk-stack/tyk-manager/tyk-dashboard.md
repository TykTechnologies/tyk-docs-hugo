---
date: 2017-03-23T13:16:05Z
title: Tyk Dashboard
menu:
  main:
    parent: "Tyk Stack"
identifier: dashboard-component
weight: 8 
url: "tyk-dashboard"
aliases:
  - /getting-started/tyk-components/dashboard/
---

## What is the Tyk Dashboard?

The Tyk Dashboard is the visual GUI and analytics platform for Tyk. It provides an easy-to-use management interface for managing a Tyk installation as well as clear and granular analytics.

The Dashboard also provides the API Developer Portal, a customisable developer portal for your API documentation, developer auto-enrolment and usage tracking.

The Dashboard also exposes the Developer Portal as a separate component of the the application. This means it can either be deployed as an internet-facing application or as a purely admin application depending on how it is being used:

{{< img src="/img/diagrams/diagram_docs_self-managed.png" alt="Tyk Dashboard diagram" >}}

The Dashboard is actually a large, granular REST API with a thin-client web front-end, and if it is being deployed as part of a Tyk install, serves as the main integration point instead of the gateway REST API.

The Dashboard API is a superset of the Gateway API, providing the same functionality, with additional features (anything that can be done in the dashboard has an API endpoint), and offers some additional advantages:

*   The Dashboard API has a granular structure, you can create separate clients easily
*   The API features read/write permissions on a per-endpoint level to have extra control over integrations
*   The API enforces a schema (that can be modified and hardened depending on your usage requirements)

