---
date: 2017-03-23T13:16:05Z
title: Dashboard Component
menu:
  main:
    parent: "Tyk Components"
weight: 2 
---

## What is Tyk Dashboard ?

The Dashboard is the visual GUI and analytics platform for Tyk, it provides an easy-to-use management interface for managing a Tyk installation as well as clear and granular analytics.

The dashboard component also provides the API Developer Portal – a customisable developer portal for your API documentation, developer auto-enrolment and usage tracking.

The Tyk Dashboard also exposes the Developer Portal as a separate aspect of the the application. This means it can either be deployed as an internet-facing application or as a purely admin application depending on how it is being used:

![Tyk API Analytics Dashboard][1]

The dashboard is actually a large, granular REST API with a thin-client web front-end, and if it is being deployed as part of a Tyk install, serves as the main integration point instead of the gateway REST API.

The Dashboard API is a superset of the Gateway API, providing the same functionality, with additional features (anything that can be done in the dashboard has an API endpoint), and offers some additional advantages:

*   The Dashboard API has a granular structure, you can create separate clients easily
*   The API features read/write permissions on a per-endpoint level to have extra control over integrations
*   The API enforces a schema (that can be modified and hardened depending on your usage requirements)

 [1]: /docs/img/diagrams/dashboard.png