---
title: "Manage API Consumers"
date: 2022-02-09
tags: [""]
description: ""
menu:
  main:
    parent: "Managing Access"
weight: 2
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Introduction

External developers are referred to as API Consumers. In the Tyk Developer portal, you can manage external API Consumers via the admin dashboard.

## Glossary

**API Consumers** - Refers to the whole section within the admin dashboard that manages individual external users, teams, and organisations.

**Organisations** - An organisation can represent larger business units of a company. It works as a container for various teams and users. An organisation can be used which can include multiple teams.

**Teams** - Teams are used to bundle multiple users, a team always needs to be part of an organisation.

**Users** - External developers / portal users. A user can belong to multiple teams but can only belong to one organisation.

{{< img src="/img/dashboard/portal-management/enterprise-portal/api-consumers-menu.png" alt="Portal API Consumers menu" >}}

## How does the API Consumer section work?

When installing the Tyk Portal, by default the API Consumers section will already have a default organisation with a default team added. This means, if your specific use case doesn't require multiple organisations and teams, you can get started straight away and invite a new external user to the developer portal, adding them to the default organisation and default team.

If your use case requires adding a new organisation, see [step by step guide]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-api-consumer-organisations.md" >}}). When an organisation is created, a default team tied to that organisation is automatically generated too. Teams and organisations can have different visibility when it comes to API Products and plans. This can be managed within the [catalogue section]({{< ref "/content/tyk-stack/tyk-developer-portal/enterprise-developer-portal/managing-access/manage-catalogues.md" >}}).
