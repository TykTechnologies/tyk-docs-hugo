---
date: 2023-06-21T11:02:59Z
title: Synchroniser feature with MDCB
tags: ["High Availability", "Synchroniser"]
description: "Synchroniser feature with MDCB"
menu:
  main:
    parent: "Ensure High Availability"
weight: 7
---

## Overview

In order to process API requests the worker Gateways need resources such as API keys, certificates, and OAuth clients. To ensure high availability these resources need to be synchronised in worker Gateways.

Prior to Tyk Gateway v4.1, the API keys, certificates and OAuth clients required by worker Gateways were synchronised from the controller Gateway on-demand. With Gateway v4.1 and MDCB v2.0.3 we introduced a new configurable option that user may choose to have proactive synchronisation of these resources to the worker Gateways when they start up.

This change improves resilience in case the MDCB link or controller Gateway is unavailable, because the worker Gateways can continue to operate independently using the resources stored locally. There is also a performance improvement, with the worker Gateways not having to retrieve resources from the controller Gateway when an API is first called.

Changes to keys, certificates and OAuth clients are still synchronised to the worker Gateways from the controller when there are changes and following any failure in the MDCB link.

### How does worker Gateways get resources from MDCB control plane?

**Without Synchroniser**

If [Synchroniser]({{< ref "/tyk-multi-data-centre/mdcb-configuration-options#sync_worker_configenabled" >}}) is disabled, the resources were pulled by the worker Gateways on-demand and not in advance. It means that first it checks if the resource lives in the local Redis and if it doesn’t exist then it tries to pull it from the control plane to store it locally.

Every time that a key is updated or removed the control plane emits a signal to all the cluster gateways to update the key accordingly.

Considerations:
This introduces a single point of failure. When the MDCB or controller Gateway in the control plane fails then the worker Gateways are also affected.

{{< img src="/img/mdcb/synchroniser-before.gif" alt="Without Synchroniser" width="1000" >}}

**With Synchroniser**

If [Synchroniser]({{< ref "/tyk-multi-data-centre/mdcb-configuration-options#sync_worker_configenabled" >}}) is enabled, API keys, certificates and OAuth clients are synchronised and stored in the local redis server in advance. When one of those resources is created, modified or deleted, a signal will be emitted which allows the worker Gateways to respond accordingly. The transmitted information includes type of resource, action (create, update, delete), if hashed (in the case of keys), and resource ID so the changes are applied in the worker Gateways accordingly.

Considerations: 
- Size of local Redis storage: If there are a lot of keys / resources to be synchronised this will increase the size of local Redis storage. The data stored in Redis, including keys, OAuth clients, and certificates, is passed to the Redis instance of each data plane. This is a characteristic of the synchronisation mechanism and occurs regardless of whether these elements are being actively used on a given data plane. Keep in mind that even if certain resources are not being utilized in a specific data plane, they are still stored and maintained in sync by the Multi Data Center Bridge (MDCB). Therefore, if your system has a large volume of keys, OAuth clients, and certificates, this could increase the storage requirements and network traffic between your data planes. It's essential to consider these factors when designing and scaling your system.
- Data residency: The synchronization of resources does not support the application of this feature to specific groups. Instead, all keys, oauth-clients, etc. will be propagated to all Redis instances in the worker Gateways, without any differentiation based on groups. This should be considered for those customers who have a single control plane but multiple clusters of worker Gateways connected. In this scenario, all Redis instances in the Worker Gateways will receive all the keys. This aspect should be taken into account if you have specific data residency requirements.

{{< img src="/img/mdcb/synchroniser-after.gif" alt="With Synchroniser" width="1000" >}}

### Configuring the Synchroniser for Tyk Self Managed

{{< note success >}}**Note**

The synchroniser feature is disabled by default. To enable it, please configure both the worker Gateways and MDCB control plane accordingly.
{{< /note >}}

**1. Worker Gateway configuration**

First, configure the worker Gateway to enable synchroniser:

`"slave_options":{ "synchroniser_enabled":true }`

Please see [Gateway configuration options]({{< ref "/tyk-oss-gateway/configuration#slave_optionssynchroniser_enabled" >}}) for reference.

To configure how often the worker Gateways read signals from MDCB control plane:

`"slave_options":{ "key_space_sync_interval": 10 }`

It configures the interval (in seconds) that the worker Gateway will take to check if there are any changes. If this value is not set then it will default to 10 seconds.

Please see [Gateway configuration options]({{< ref "/tyk-oss-gateway/configuration#slave_optionskey_space_sync_interval" >}}) for reference.

If you are running a cluster of Gateways, you must have a _GroupID_ configured for synchronisation to work properly and propagate keys.

`"slave_options":{ "group_id": "FOOBAR" }`


Please see [Gateway configuration options]({{< ref "/tyk-oss-gateway/configuration#slave_optionsgroup_id" >}}) for reference

**2. Control Plane configuration**

Secondly, configure the control plane. The most simple configuration to enable this feature in the MDCB config file is:

- MDCB:

`"sync_worker_config":{ "enabled":true }`

Please see [MDCB configuration options]({{< ref "/tyk-multi-data-centre/mdcb-configuration-options#sync_worker_config" >}}) for reference.

If API keys were used and hash key is disabled, please also set these additional configurations for the following components:

- MDCB:

`"sync_worker_config":{ "enabled":true, "hash_keys": false }, "hash_keys": false` 

- Dashboard:

`"hash_keys": false` 

- Controller Gateway:

`"hash_keys": false` 

If certificates were used, please also set these additional configurations:

- MDCB

Set `"security.private_certificate_encoding_secret"` with the certificate encoding secret. This is required because MDCB would decode the certificate first before propagating it to worker gateways. The worker Gateways could encode the certificate with their own secret.

Please see [MDCB configuration options](https://tyk.io/docs/tyk-multi-data-centre/mdcb-configuration-options/#securityprivate_certificate_encoding_secret) for reference

### Configuring the Synchroniser for Tyk Cloud

Please [submit a support ticket](https://support.tyk.io/hc/en-gb) to us if you want to enable Synchroniser for your Tyk Cloud deployment.

### Troubleshooting

**Q: How do I know when synchronisation happened?**

A: You could check the MDCB log message to know about when synchronisation started and finished:

```
  Starting oauth clients sync worker for orgID...
  Starting keys sync worker for orgID...
  Starting keys sync worker for orgID...
 
  Sync APIKeys worker for orgID:...
  Sync Certs worker for orgID:...
  Sync oauth worker for orgID:...
```

**Q: Can I trigger a re-synchronisation?**

A: Synchronisation will be triggered once the Time To Live (TTL) of a worker Gateway has expired. The default expiry duration is 3 minutes. The Time To Live (TTL) value can be set via [sync_worker_config.group_key_ttl]({{< ref "/tyk-multi-data-centre/mdcb-configuration-options#sync_worker_configgroup_key_ttl" >}})
