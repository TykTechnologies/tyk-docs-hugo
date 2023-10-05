---
title: Configuration Options and Environment Variables
description: This page provides links to configuration references for the various Tyk components, including the Gateway, Dashboard, Pump, MDCB, Developer Portal and Identity Broker. 
tags: ["environment variables", "Configuration reference", "config field", "Reference documentation"]
menu:
  main:
    parent: "Key Concepts"
weight: 12 
aliases:
  - /tyk-configuration-reference/environment-variables/
  - /configure/environment-variables/
---

Please find the following links to all the configuration reference pages per product (Gateway, Dashboard, Pump, MDCB, Enterprise Developer Portal and Identity Broker)
Each page includes a list of all the config fields that can be used in the config file to set and tune the product.
Every item in the lists includes the config name in JSON notation, the format as an environment variable, the field type and a short description.

Environment variables allow you to override settings in the product's configuration file or modify default configurations. These variables are created based on the dot notation versions of JSON objects within the configuration files. Please note that there may be exceptions to this rule. For detailed information about environment variables and their usage, refer to our comprehensive docs in the following links:
* [Tyk Gateway]({{< ref "tyk-oss-gateway/configuration" >}})
* [Tyk Dashboard]({{< ref "tyk-dashboard/configuration" >}})
* [Tyk Pump]({{< ref "tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables" >}})
* [Tyk Multi Data Center Bridge]({{< ref "tyk-multi-data-centre/mdcb-configuration-options" >}})
* [Enterprise Developer Portal]({{<ref "tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration" >}})
* [Tyk Identity Broker]({{< ref "tyk-configuration-reference/tyk-identity-broker-configuration" >}})
