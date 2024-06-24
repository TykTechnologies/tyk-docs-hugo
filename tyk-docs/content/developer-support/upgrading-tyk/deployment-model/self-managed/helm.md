---
title: "Upgrade Tyk on Helm"
date: 2024-05-13
tags: ["Upgrade Helm Charts", "Helm Charts", "upgrade", "upgrading"]
description: "Explains how to upgrade Tyk on helm"
---

After reviewing guidelines for [preparing for upgrade]({{< ref "developer-support/upgrading-tyk/preparations/upgrade-guidelines" >}}),
follow the instructions below to upgrade your Tyk components and plugins.

**Upgrade order:**
Please note that upgrade order is as explained in the upgrade [overview]({{< ref "developer-support/upgrading-tyk/deployment-model/self-managed/overview" >}})

</br>

{{< note success >}}
**Upgrade instructions for *Tyk Dashboard*, *Tyk Pump* and *MDCB***

The instruction below refer to upgrading *Tyk Gateway*. You can follow the same steps for *Tyk Dashboard*, *Tyk Pump*
and *MDCB*.

{{< /note >}}


## Upgrade Tyk Gateway
1. Backup your gateway config file (`tyk.conf` or the name you chose for it), `.env` and `values.yaml`. Even if
you’re using the environment variables from the `values.yaml` to define your configuration, there still might be a config
file used and loaded with field values you relay on.
2. Backup your `.env` and `values.yaml`
3. Update the image version in your values.yaml
   <br>
   For example, in this [values.yaml](https://github.com/TykTechnologies/tyk-charts/blob/83de0a184014cd027ec6294b77d034d6dcaa2a10/components/tyk-gateway/values.yaml#L142)
   change the version of the tag `tag: v5.3` to the version you want.
4. Run `Helm upgrade` with your relevant `values.yaml` file/s.
   <br>
   Check the [helm upgrade docs](https://helm.sh/docs/helm/helm_upgrade/) for more details on the `upgrade` command.
