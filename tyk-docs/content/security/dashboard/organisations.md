---
date: 2017-03-23T14:40:22Z
title: Organisations
menu:
  main:
    parent: "Dashboard"
weight: 1 
---

## Concept: Dashboard Organisations

The Tyk Dashboard is by default multi-tenant. When bootstrapping a dashboard, the first thing the bootstrap script does is to create a new Organisation.

Organisations can only be created using the Dashboard Admin REST API.

An Organisation is a completely isolated unit, and has it’s own:

* API Definitions
* API Tokens
* Users
* Portal
* Developers
* Domain

The concept of an organisation does not exist with the gateway itself, and gateways only proxy and validate the rules imposed on them by the definitions and tokens that are being processed, however at their core there are some security checks within the gateway that ensure organisational ownership of objects.

This means that all actions in a Pro (dashboard-based) installation of Tyk must use a base Organisation, and all actions should stem from a User owned by that organisation.

> Note: A user that does not belong to an Organisation is sometimes referred to as an unbounded user, these users have visibility across all organisations, but should not be used for anything except READ access.
