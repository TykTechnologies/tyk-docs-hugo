---
title: "Manage Apps and Credentials"
date: 2022-02-10
tags: [""]
description: ""
menu:
  main:
    parent: "API Access"
weight: 1
---

{{< note success >}}
**Tyk Enterprise Developer Portal**

If you are interested in getting access contact us at [support@tyk.io](<mailto:support@tyk.io?subject=Tyk Enterprise Portal Beta>)

{{< /note >}}

## Prerequisites

- A Tyk Enterprise portal installation
- A portal admin app login
- A login to the already created app by an external API consumer

## To view existing apps

1. In the portal admin app, go to **Apps**. If there are some apps already created by external API-consumers, you’ll see them in the overview list.

**Screenshot needed**

2. Click on an app from the overview page.
3. On the right hand slideout, you will see the information about the created app.

## Revoke app credentials

1. In the portal admin app, go to **Apps** and open the app.
2. Click **credentials**. This means the developer will no longer be able to access the API Product via the selected plan. These actions will have an immediate effect.
