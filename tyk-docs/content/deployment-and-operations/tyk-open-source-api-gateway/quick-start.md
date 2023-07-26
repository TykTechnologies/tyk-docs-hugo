---
title: "Quick Start"
date: 2023-07-25
weight: 1
tags: ["Deployment and Operations", "Open Source", "API Gateway", "Tyk OSS"]
description: "Quick start guide for the Tyk Open Source API Gateway"
---

We’ll install Tyk, add auth, analytics, quotas and rate limiting to your API in under 5 minutes.

We recommend “Tyk Gateway Docker” as the quickest way to get started now. Later, you can move to one of our other supported distributions if you prefer.

**Step 1 - Clone the docker-compose repository**
```bash
git clone https://github.com/TykTechnologies/tyk-gateway-docker
```

**Step 2 - Change to the new directory**
```bash
cd tyk-gateway-docker
```

**Step 3 - Deploy Tyk Gateway and Redis**
```bash
docker-compose up
```

You can also run this in detached mode using the _-d_ flag:

```bash
docker-compose up -d
```


Congratulations, you’re done!

We also offer a [Killercoda scenario](https://killercoda.com/tyk-tutorials/scenario/Tyk-install-OSS-docker-compose) that walks through installing our Open Source Gateway using Docker Compose.

<br>

{{< note success >}}
**Note**  

You will need a free [Killercoda](https://killercoda.com/) account to access the scenario.
{{< /note >}}


## Test Installation

Your Tyk Gateway is now configured and ready to use. Confirm this by checking against the ‘hello’ endpoint:

```bash
curl localhost:8080/hello
```

Output should be similar to that shown below:
```json
{"status": "pass", "version": "v5.1", "description": "Tyk GW"}
```

## Next Steps

Next, [add your first API to Tyk ]({{< ref "getting-started/create-api" >}}) and follow the *Open Source* instructions.