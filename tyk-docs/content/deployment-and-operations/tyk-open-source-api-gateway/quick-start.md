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

<br>

{{< note success >}}
**note**

You can run this in detach mode using the _-d_ flag: _docker-compose up -d_
{{< /note >}}

Congratulations, you’re done!


## Test Installation

Your Tyk Gateway is now configured and ready to use. Confirm this by checking against the ‘hello’ endpoint:

```bash
curl localhost:8080/hello
```

Output should be similar to that shown below:
`{"status":"pass", "version": "v3.2.1", "description": "Tyk GW"}`


## Next Steps

Next, visit [adding]({{< ref "getting-started/create-api" >}}) your first API to Tyk and follow the Open Source instructions.