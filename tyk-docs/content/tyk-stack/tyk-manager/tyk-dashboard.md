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
  - /docs/concepts/tyk-components/dashboard/
  - /getting-started/tyk-components/dashboard/
---

## What is the Tyk Dashboard?

The Tyk Dashboard is the GUI and analytics platform for Tyk. It provides an easy-to-use management interface for managing a Tyk installation as well as clear and granular analytics.

The Dashboard also provides the [API Developer Portal]({{< ref "/content/tyk-stack/tyk-developer-portal/tyk-developer-portal.md" >}}), a customisable developer portal for your API documentation, developer auto-enrolment and usage tracking.

The Dashboard also exposes the Developer Portal as a separate component of the the application. This means it can either be deployed as an internet-facing application or as a purely admin application depending on how it is being used:

{{< img src="/img/diagrams/diagram_docs_self-managed.png" alt="Tyk Dashboard diagram" >}}

The Dashboard is a large, granular REST API with a thin-client web front-end, and if being deployed as part of a Tyk install, serves as the main integration point instead of the Gateway API.

The [Dashboard API]({{< ref "/content/tyk-apis/tyk-dashboard-api/tyk-dashboard-api.md" >}}) is a superset of the Gateway API, providing the same functionality, with additional features (anything that can be done in the Dashboard has an API endpoint), and offers some additional advantages:

*   The Dashboard API has a granular structure, you can create separate clients easily
*   The API features read/write permissions on a per-endpoint level to have extra control over integrations
*   The API enforces a schema that can be modified and hardened depending on your usage requirements
