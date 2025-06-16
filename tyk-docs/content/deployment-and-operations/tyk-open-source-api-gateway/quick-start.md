---
title: "Quick Start Tyk Gateway"
description: "This page serves as a comprehensive guide to migrating workloads to Tyk Open Source"
tags: ["installation", "migration", "open source"]
aliases:
---

## Introduction

New to Tyk Gateway? On this page you'll get started with the basics - install Tyk and test it live in less than 2 minutes.

We recommend [Tyk Gateway docker compose](https://github.com/TykTechnologies/tyk-gateway-docker) as the quickest way to get started. If you want to deploy it in a specific platform check our [installation options]({{< ref "apim/open-source/installation" >}}) page.

**Step 1 - Clone the docker-compose repository**
```
git clone https://github.com/TykTechnologies/tyk-gateway-docker
```

**Step 2 - Change to the new directory**
```
cd tyk-gateway-docker
```

**Step 3 - Deploy Tyk Gateway and Redis**
```
docker-compose up
```

You can also run this in detached mode using the _-d_ flag:

```
docker-compose up -d
```

Congratulations, you’re done!!!

## Test Installation

Your Tyk Gateway is now configured and ready to use. Confirm this by checking against the ‘hello’ endpoint:

```curl
curl localhost:8080/hello
```

The output should be similar to that shown below:
```json
{"status": "pass", "version": "v5.1", "description": "Tyk GW"}
```


