---
title: "Telemetry"
date: 2020-04-28
weight: 1
tags: ["Tyk Cloud", "Configuration", "Telemetry"]
description: "Telemetry"
---

## Introduction

Telemetry in Tyk Cloud helps you monitor and understand how your APIs are performing. Think of it as a health monitoring system for your APIs - it collects data about response times, error rates, and other vital metrics that help you ensure everything is running smoothly.

We support Telemetry for `Cloud Data Plane` deployments. You can enable it while creating or updating after setting up telemetry.

## Available Telemetry Providers

Tyk Cloud integrates with these monitoring platforms:

- [Datadog]({{< ref "tyk-cloud/telemetry/enable-telemetry.md#datadog" >}})
- [Dynatrace]({{< ref "tyk-cloud/telemetry/enable-telemetry.md#dynatrace" >}})
- [New Relic]({{< ref "tyk-cloud/telemetry/enable-telemetry.md#new-relic" >}})
- [Elastic]({{< ref "tyk-cloud/telemetry/enable-telemetry.md#elastic" >}})
- [Custom]({{< ref "tyk-cloud/telemetry/enable-telemetry.md#custom" >}})