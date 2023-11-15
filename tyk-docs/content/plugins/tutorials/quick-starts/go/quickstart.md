---
date: 2017-03-24T15:45:13Z
description: Explains purpose and prerequisites for running quickstart Go plugin
title: An Example Go Plugin To Quickly Get You Started
tags: ["custom", "plugin", "plugins", "go", "goplugins",  "go plugin", "tyk go plugin", "golang plugin"]
aliases:
  - /plugins/get-started-selfmanaged/deploy
  - /plugins/get-started-selfmanaged/get-started
  - /plugins/get-started-selfmanaged/run
  - /plugins/get-started-selfmanaged/test
  - /plugins/get-started-plugins
weight: 10
---

This section takes you through the process of running and building the example Go plugin, included within Tyk's [getting started](https://github.com/TykTechnologies/custom-go-plugin) repository. Go plugins are the recommended plugin type and suitable for most use cases.

**Estimated time**: 10-15 minutes

## Expected outcome

At the end of this process you should have a Tyk Gateway or Tyk Self-Managed environment running locally, with a simple Go plugin executing on each API request. For each reponse to an API request the example plugin will inject a *Foo* header, with a value of *Bar*.

## Prerequisites

* docker & docker-compose
* [Tyk license](https://tyk.io/sign-up/#self) (if using Self-Managed Tyk, which will make the process easier via UI)
* Make
* OSX (Intel) -> Not a prerequisite, though these steps are tested on OSX Intel/ARM

## Before you begin

Please clone the [getting started](https://github.com/TykTechnologies/custom-go-plugin) respository.

```bash
git clone https://github.com/TykTechnologies/custom-go-plugin
cd custom-go-plugin
```

## Choose your environment

{{< grid >}}
{{< badge read="15 mins" imageStyle="object-fit:contain" href="plugins/tutorials/quick-starts/go/dashboard" image="/img/logos/tyk-logo-selfmanaged.svg" alt="Dashboard">}}
Dashboard Tutorial
{{< /badge >}}

{{< badge read="15 mins" imageStyle="object-fit:contain" href="plugins/tutorials/quick-starts/go/open-source" image="/img/logos/tyk-logo-selfmanaged.svg" alt="Tyk OSS Gateway">}}
Tyk OSS Gateway Tutorial
{{< /badge >}}
{{< /grid >}}

## Next Steps

Try our advanced Go Plugin [tutorials]({{< ref "plugins/supported-languages/golang.md" >}}).
