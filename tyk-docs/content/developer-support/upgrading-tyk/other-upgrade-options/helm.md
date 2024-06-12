---
title: "Upgrade Helm"
date: 2024-05-13
tags: ["Upgrade Helm Charts", "Helm Charts"]
description: "Explains how to upgrade helm charts"
---

Instructions for upgrading Tyk gateway. You should follow the same flow for Tyk Dashboard, Tyk Pump and MDCB.

1. Backup your gateway config file (`tyk.conf` or the name you chose for it).  Note this step may not be    relevant if you’re exclusively using the environment variables from the values.yaml to define your configuration.
2. Update the image version in your values.yaml
   <br>
   For example, in this [values.yaml](https://github.com/TykTechnologies/tyk-charts/blob/83de0a184014cd027ec6294b77d034d6dcaa2a10/components/tyk-gateway/values.yaml#L142) change the version of the tag `tag: v5.1` to the version you want.
3. Run `Helm upgrade` with your relevant `values.yaml` file/s. 
   <br>
   Check the [helm upgrade docs](https://helm.sh/docs/helm/helm_upgrade/) for more details on the `upgrade` command.
