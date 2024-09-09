---
date: 2017-03-24T16:39:31Z
title: Sample TCP Proxy
tags: ["Tyk Operator", "Sample", "Kubernetes"]
description: "Tyk Operator manifest example"
---

This page provides sample manifest for creating TCP proxy APIs. Follow the example to learn how to configure your APIs.

This example creates a API definition that proxies request from TCP port `6380` to `tcp://localhost:6379`.

```yaml {hl_lines=["8-11"],linenos=false}
apiVersion: tyk.tyk.io/v1alpha1
kind: ApiDefinition
metadata:
  name: redis-tcp
spec:
  name: redis-tcp
  active: true
  protocol: tcp
  listen_port: 6380
  proxy:
    target_url: tcp://localhost:6379
```