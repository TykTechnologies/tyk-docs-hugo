---
date: 2017-03-24T15:45:13Z
title: Task 1 - Set up your environment
menu:
  main:
    parent: "Get Started with Go Plugins - Tyk Self-Managed"
weight: 10
---


### 1.  Clone the getting started repo

Please clone the [getting started repo][0].

```bash
git clone https://github.com/TykTechnologies/custom-go-plugin
```


### 2. Run the stack

Navigate to the cloned repository 

```shell
# Make a copy of the example .env file for the Tyk-Dashboard 
cp tyk/confs/tyk_analytics.env.example tyk/confs/tyk_analytics.env
```
Edit the file `tyk/confs/tyk_analytics.env` with your Tyk-Dashboard license key.  

Finally, run the `make` command:

```bash
make
```

This will take a few minutes to run as it compiles the plugin for the first time and downloads all the necessary Docker images.

### What have we done?

1. We've run a local Tyk Self-Managed stack.
2. We compiled the sample Go plugin and loaded it onto the Gateway's file system.

Next, let's create an API definition and test our Go plugin in the next task.



[0]: https://github.com/TykTechnologies/custom-go-plugin