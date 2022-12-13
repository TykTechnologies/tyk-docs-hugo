---
date: 2017-03-24T12:31:55Z
title: Report, Monitor and Trigger Events
tags: ["Event Handlers"]
description: "The built in event handlers for Tyk"
weight: 5
menu: 
  main:
    parent: "Basic Configuration and Security"
url: "/basic-config-and-security/report-monitor-trigger-events"
aliases:
  - /report-monitor-trigger-events/
---

Tyk has the ability to configure APIs with event handlers to perform specific actions when an event occurs.

There are currently two built-in event handlers: `eh_log_handler` (Log handler – mainly for debugging) and `eh_web_hook_handler` (Web Hook Handler).

The event subsystem has been designed to be easily extensible, so the community can provide additional event handlers (and add events) to the Tyk codebase or they can be compiled into the version branch very easily for custom builds.
