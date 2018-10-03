---
title: Setup Slave Data Centres
weight: 2
menu:
    main: 
        parent: "Tyk Multi Data Centre"

---

## <a name="overview"></a>Overview

You may configure an unlimited number of Slave Data Centres (DC) for ultimate High Availablity (HA). We recommend that you deploy your slave data centres as close to your upstream services as possible in order to reduce latency.

It is a requirement that all your Tyk Gateway nodes in the Slave DC share the same Redis DB in order to take advantage of Tyk's DRL and quota features.
Your Slave DC can be in the same physical DC as the master DC with just a logical network separation. If you have many Slave DCs, they can be deployed in a private-cloud, public-cloud, or even on bare-metal.

## <a name="prequisites"></a>Prerequisites

* Redis
* A working headless/open source Tyk Gateway deployed

## <a name="slave dc configuration"></a>Slave DC Configuration

Modify the Tyk Gateway configuration (`tyk.conf`) as follows:

`"optimisations_use_async_session_write": true,`

`"use_db_app_configs": false,`

Next, we need to ensure that the policy loader and analytics pump use the RPC driver:

```{.json}
"policies": {
  "policy_source": "rpc",
  "policy_record_name": "tyk_policies"
},
"analytics_config": {
  "type": "rpc",
  ... // remains the same
},
```

Lastly, we add the sections that enforce the RPC Slave mechanism:

```{.json}
"slave_options": {
  "use_rpc": true,
  "rpc_key": "{ORGID}",
  "api_key": "{APIKEY}",
  "connection_string": "{MDCB_HOSTNAME:9091}",
  "enable_rpc_cache": true,
  "bind_to_slugs": true,
  "group_id": "{ny}",
  "use_ssl": false,
  "ssl_insecure_skip_verify": true
},
"auth_override": {
  "force_auth_provider": true,
  "auth_provider": {
    "name": "",
    "storage_engine": "rpc",
    "meta": {}
  }
}
```

The most important elements here are:

| Field         | Description    |
|---------------|----------------|
|`api_key`      |This the API key of a user used to authenticate and authorise the Gateway's access through MDCB. The user should be a standard Dashboard user with minimal privileges so as to reduce risk if compromised. The suggested security settings are `read` for `Real-time notifications` and the remaining options set to `deny`.|
|`group_id`    |This is the "zone" that this instance inhabits, e.g. the DC it lives in. It must be unique to each slave cluster / DC.|
|`connection_string`     |The MDCB instance or load balancer.|

Once this is complete, you can restart the Tyk Gateway in the Slave DC, and it will connect to the MDCB instance, load its API definitions, and is ready to proxy traffic.

