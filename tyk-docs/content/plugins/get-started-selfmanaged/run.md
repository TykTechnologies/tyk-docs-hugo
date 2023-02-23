---
date: 2017-03-24T15:45:13Z
title: Task 1 - Set up your environment
menu:
  main:
    parent: "Get Started with Custom Plugins"
weight: 10
---

We'll be using Tyk's getting started repo to set up your development environment.

{{< tabs_start >}}
{{< tab_start "Self-Managed" >}}

### 1.  Clone the getting started repo

Please clone the [getting started repo][0].

```bash
git clone https://github.com/TykTechnologies/custom-go-plugin

```

### 2. Add your Tyk License


Create and edit the file `.env` with your Tyk-Dashboard license key

```shell
# Make a copy of the example .env file for the Tyk-Dashboard 
cp .env.example .env
```

### 3. Run the Stack

run the `make` command:

```bash
make
```

{{< tab_end >}}
{{< tab_start "Open Source" >}}

```bash
git clone https://github.com/TykTechnologies/custom-go-plugin
git checkout opensource
```

{{< tab_end >}}
{{< tabs_end >}}

This will take a few minutes to run as it compiles the plugin for the first time and downloads all the necessary Docker images.

### What have we done?

1. We've run a local Tyk stack.
2. We compiled the sample Go plugin and loaded it onto the Gateway's file system.

Next, let's create an API definition and test our Go plugin in the next task.


[0]: https://github.com/TykTechnologies/custom-go-plugin